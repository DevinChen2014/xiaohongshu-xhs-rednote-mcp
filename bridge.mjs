#!/usr/bin/env node

import { spawn } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const DEFAULT_UPSTREAM_URL = "https://mcp.socialdatax.com/xhs/mcp";
const apiKey = process.env.SOCIALDATAX_API_KEY?.trim();
const hasApiKey = Boolean(apiKey && apiKey !== "<SOCIALDATAX_API_KEY>");

const remotePackagePath = fileURLToPath(
  import.meta.resolve("mcp-remote/package.json")
);
const remoteEntry = join(
  dirname(remotePackagePath),
  "dist",
  "proxy.js"
);

const upstreamUrl = process.env.SOCIALDATAX_XHS_MCP_URL || DEFAULT_UPSTREAM_URL;
const args = [
  upstreamUrl,
  "--transport",
  "http-only",
  "--silent",
];
const childEnv = { ...process.env };

if (hasApiKey) {
  args.push("--header", 'Authorization: Bearer ${SOCIALDATAX_API_KEY}');
  childEnv.SOCIALDATAX_API_KEY = apiKey;
} else {
  delete childEnv.SOCIALDATAX_API_KEY;
}

const child = spawn(process.execPath, [remoteEntry, ...args], {
  stdio: "inherit",
  env: childEnv,
});

const signalHandlers = new Map();

for (const signal of ["SIGINT", "SIGTERM"]) {
  const handler = () => {
    if (child.exitCode === null && child.signalCode === null) {
      child.kill(signal);
    }
  };
  signalHandlers.set(signal, handler);
  process.once(signal, handler);
}

child.on("error", (error) => {
  console.error(
    `[xhs-mcp-bridge] Failed to start mcp-remote: ${error.message}`
  );
  process.exit(1);
});

child.on("exit", (code, signal) => {
  if (signal) {
    const handler = signalHandlers.get(signal);
    if (handler) {
      process.off(signal, handler);
    }
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code ?? 1);
});
