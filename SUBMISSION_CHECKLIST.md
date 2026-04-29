# MCP Directory Submission Checklist

Use this checklist before syncing this listing to the public `xiaohongshu-xhs-rednote-mcp` repository, submitting it to MCP directories, or updating the Glama `server` entry.

## Public Repository

- Repository name: `xiaohongshu-xhs-rednote-mcp`
- Repository URL: `https://github.com/DevinChen2014/xiaohongshu-xhs-rednote-mcp`
- Repository description: `小红书 MCP / Xiaohongshu MCP / XHS MCP / RedNote MCP for note search, note details, comments, creator profiles, and creator note lists.`
- Current repository topics: `mcp`, `mcp-server`, `xiaohongshu`, `xiaohongshu-mcp`, `xhs`, `xhs-mcp`, `rednote`, `rednote-mcp`
- Optional expansion topics: `social-insights`, `marketing-research`, `comment-analysis`
- Root README title: `小红书 MCP | Xiaohongshu MCP | XHS MCP | RedNote MCP`
- Website: `https://52choujiang.com/assistant`
- Hosted upstream MCP endpoint: `https://mcp.52choujiang.com/xhs/mcp`
- Hosted upstream auth: `Authorization: Bearer <XHS_MCP_API_KEY>`
- Local bridge startup: `npx -y github:DevinChen2014/xiaohongshu-xhs-rednote-mcp`
- Local bridge runtime env: `XHS_MCP_API_KEY=<XHS_MCP_API_KEY>`
- License: MIT for the public bridge wrapper, documentation, and examples only

## Safety Checks

- No real API keys are present.
- No private backend implementation is included.
- No production configuration is included.
- No internal samples are included.
- No account data or credentials are included.
- No generated build output is included.
- Public text uses neutral product wording.
- Public bridge only forwards MCP traffic and does not expose internal business code.

## Required Files

- `README.md`
- `LICENSE`
- `server-card.json`
- `mcp.json`
- `package.json`
- `package-lock.json`
- `bridge.mjs`
- `Dockerfile`
- `glama.json`
- `examples/streamable_http_config.json`
- `examples/claude_desktop_config.json`
- `examples/cursor_mcp.json`
- `examples/codex_config.toml`
- `assets/logo.png`

## Glama Checks

- `Dockerfile` builds successfully.
- `node bridge.mjs` starts a stdio MCP bridge.
- `initialize` succeeds without a key.
- `tools/list` returns the current 9 public tools.
- `https://glama.ai/mcp/servers/@DevinChen2014/xiaohongshu-xhs-rednote-mcp` is no longer `404`.
- `https://glama.ai/mcp/servers/@DevinChen2014/xiaohongshu-xhs-rednote-mcp/badges/score.svg` is reachable.

## Directory Submission Order

1. Glama server refresh or claim
2. awesome-mcp-servers badge refresh
3. MCP.Directory
4. MCPHubz
5. MCP Market
6. mcpserve.com

## Search Keywords To Verify After Approval

- `Xiaohongshu`
- `xiaohongshu mcp`
- `XHS`
- `xhs mcp`
- `RedNote`
- `rednote mcp`
- `小红书`
- `小红书 mcp`
- `social insights`
- `social media data assistant`
