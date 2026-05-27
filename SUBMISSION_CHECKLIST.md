# MCP Directory Submission Checklist

Use this checklist before syncing this listing to the public XHS MCP repository, submitting it to MCP directories, or updating the Glama entry.

## Public Repository

- Repository name: `xiaohongshu-xhs-rednote-mcp`
- Repository URL: `https://github.com/DevinChen2014/xiaohongshu-xhs-rednote-mcp`
- Repository description: `小红书 MCP / Xiaohongshu MCP / XHS MCP / RedNote MCP for filtered note search, note details, comments, comment replies, creator profiles, and creator note lists.`
- Current repository topics: `mcp`, `mcp-server`, `xiaohongshu`, `xiaohongshu-mcp`, `xhs`, `xhs-mcp`, `rednote`, `rednote-mcp`
- Optional expansion topics: `social-insights`, `marketing-research`, `comment-analysis`
- Root README title: `小红书 MCP | Xiaohongshu MCP | XHS MCP | RedNote MCP`
- Product: `SocialDataX` / `社媒数据助手`
- Website: `https://socialdatax.com`
- Registry name: `com.52choujiang/xhs-insights`
- Future registry name: `com.socialdatax/xhs-insights`
- Hosted MCP endpoint: `https://mcp.52choujiang.com/xhs/mcp`
- Hosted auth: `Authorization: Bearer <SOCIALDATAX_API_KEY>`
- Default client transport: hosted `streamable-http`
- Command/stdio fallback: `npx -y mcp-remote https://mcp.52choujiang.com/xhs/mcp --header "Authorization: Bearer <SOCIALDATAX_API_KEY>"`
- License: MIT for the public documentation and examples only

## Safety Checks

- No real API keys are present.
- No private backend implementation is included.
- No production configuration is included.
- No internal samples are included.
- No account data or credentials are included.
- No generated build output is included.
- Public text uses neutral product wording.
- Public docs do not expose internal business code.

## Required Files

- `README.md`
- `LICENSE`
- `server-card.json`
- `mcp.json`
- `glama.json`
- `examples/streamable_http_config.json`
- `examples/claude_desktop_config.json`
- `examples/cursor_mcp.json`
- `examples/codex_config.toml`
- `assets/logo.png`

## Glama Checks

- Hosted streamable HTTP clients can connect directly to `https://mcp.52choujiang.com/xhs/mcp` with `Authorization: Bearer <SOCIALDATAX_API_KEY>`.
- With a valid key, hosted MCP `initialize` succeeds.
- With a valid key, hosted MCP `tools/list` returns the current 11 public tools.
- `examples/codex_config.toml` uses remote HTTP URL and `bearer_token_env_var`, not `mcp-remote`.
- `examples/cursor_mcp.json` uses remote HTTP URL and `headers` with `${env:SOCIALDATAX_API_KEY}`, not `mcp-remote`.
- `mcp.json` is explicitly command/stdio fallback and uses `mcp-remote`.
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
- `xiaohongshu data mcp`
- `xiaohongshu note search mcp`
- `XHS`
- `xhs mcp`
- `xhs data mcp`
- `xhs note search mcp`
- `RedNote`
- `rednote mcp`
- `rednote data mcp`
- `小红书`
- `小红书 mcp`
- `小红书 数据 MCP`
- `social insights`
- `社媒数据助手`
