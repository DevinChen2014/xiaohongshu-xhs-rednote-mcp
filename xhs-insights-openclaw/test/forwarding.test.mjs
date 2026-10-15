import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import test from "node:test";

const pluginSource = fileURLToPath(new URL("../index.js", import.meta.url));

async function loadPlugin() {
  const root = await mkdtemp(path.join(os.tmpdir(), "xhs-openclaw-test-"));
  const sdk = path.join(root, "node_modules/@modelcontextprotocol/sdk");
  await mkdir(path.join(sdk, "client"), { recursive: true });
  await writeFile(path.join(root, "package.json"), JSON.stringify({ type: "module" }));
  await writeFile(
    path.join(sdk, "package.json"),
    JSON.stringify({
      type: "module",
      exports: {
        "./client/index.js": "./client/index.js",
        "./client/streamableHttp.js": "./client/streamableHttp.js",
      },
    }),
  );
  await writeFile(
    path.join(sdk, "client/index.js"),
    "export class Client { async connect() {} async callTool() { return globalThis.mockMcpResult; } async close() {} }",
  );
  await writeFile(
    path.join(sdk, "client/streamableHttp.js"),
    "export class StreamableHTTPClientTransport {}",
  );
  const copiedPlugin = path.join(root, "index.js");
  await writeFile(copiedPlugin, await readFile(pluginSource));
  const plugin = (await import(pathToFileURL(copiedPlugin))).default;
  return { root, plugin };
}

test("preserves structured MCP error details for OpenClaw callers", async () => {
  const originalApiKey = process.env.SOCIALDATAX_API_KEY;
  process.env.SOCIALDATAX_API_KEY = "test-api-key";
  globalThis.mockMcpResult = {
    isError: true,
    content: [{ type: "text", text: "Too many requests" }],
    structuredContent: {
      code: "rate_limited",
      message: "Too many requests",
      retry_after_seconds: 17,
    },
  };

  const { root, plugin } = await loadPlugin();
  try {
    const tools = [];
    plugin.register({ registerTool: (factory) => tools.push(factory({})) });
    const searchNotes = tools.find(
      (tool) => tool.name === "xhs-insights__xhs_search_notes",
    );

    await assert.rejects(
      searchNotes.execute("call-1", { keyword: "test" }),
      (error) => {
        assert.match(error.message, /Too many requests/);
        assert.match(error.message, /code: rate_limited/);
        assert.match(error.message, /retry_after_seconds: 17/);
        assert.equal(error.structuredContent.code, "rate_limited");
        assert.equal(error.structuredContent.retry_after_seconds, 17);
        return true;
      },
    );
  } finally {
    if (originalApiKey === undefined) delete process.env.SOCIALDATAX_API_KEY;
    else process.env.SOCIALDATAX_API_KEY = originalApiKey;
    delete globalThis.mockMcpResult;
    await rm(root, { recursive: true, force: true });
  }
});
