import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const bridgePath = fileURLToPath(new URL("../bridge.mjs", import.meta.url));

async function runBridge(apiKey) {
  const root = await mkdtemp(path.join(os.tmpdir(), "xhs-bridge-test-"));
  try {
    const bridgeDir = path.join(root, "package");
    const remoteDir = path.join(bridgeDir, "node_modules/mcp-remote");
    await mkdir(path.join(remoteDir, "dist"), { recursive: true });
    await writeFile(path.join(bridgeDir, "bridge.mjs"), await readFile(bridgePath));
    await writeFile(
      path.join(remoteDir, "package.json"),
      JSON.stringify({ name: "mcp-remote", version: "0.0.0" }),
    );
    await writeFile(
      path.join(remoteDir, "dist/proxy.js"),
      'process.stdout.write(JSON.stringify({ args: process.argv.slice(2), apiKey: process.env.SOCIALDATAX_API_KEY ?? null }));\n',
    );

    const env = { ...process.env, SOCIALDATAX_XHS_MCP_URL: "https://example.test/xhs/mcp" };
    if (apiKey === undefined) delete env.SOCIALDATAX_API_KEY;
    else env.SOCIALDATAX_API_KEY = apiKey;

    return await new Promise((resolve, reject) => {
      const child = spawn(process.execPath, [path.join(bridgeDir, "bridge.mjs")], {
        cwd: bridgeDir,
        env,
        stdio: ["ignore", "pipe", "pipe"],
      });
      let stdout = "";
      let stderr = "";
      child.stdout.setEncoding("utf8").on("data", (chunk) => (stdout += chunk));
      child.stderr.setEncoding("utf8").on("data", (chunk) => (stderr += chunk));
      child.once("error", reject);
      child.once("close", (code) => resolve({ code, stdout, stderr }));
    });
  } finally {
    await rm(root, { recursive: true, force: true });
  }
}

test("starts without an API Key and leaves authentication to the hosted service", async () => {
  const result = await runBridge(undefined);

  assert.equal(result.code, 0, result.stderr);
  assert.deepEqual(JSON.parse(result.stdout), {
    args: ["https://example.test/xhs/mcp", "--transport", "http-only", "--silent"],
    apiKey: null,
  });
});

test("ignores the public config placeholder instead of forwarding it as a key", async () => {
  const result = await runBridge("<SOCIALDATAX_API_KEY>");

  assert.equal(result.code, 0, result.stderr);
  assert.deepEqual(JSON.parse(result.stdout), {
    args: ["https://example.test/xhs/mcp", "--transport", "http-only", "--silent"],
    apiKey: null,
  });
});

test("forwards a configured API Key through the Authorization header", async () => {
  const result = await runBridge("test-api-key");

  assert.equal(result.code, 0, result.stderr);
  assert.deepEqual(JSON.parse(result.stdout), {
    args: [
      "https://example.test/xhs/mcp",
      "--transport",
      "http-only",
      "--silent",
      "--header",
      "Authorization: Bearer ${SOCIALDATAX_API_KEY}",
    ],
    apiKey: "test-api-key",
  });
});
