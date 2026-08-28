# MCP Directory Submission Checklist

Use this checklist before syncing this listing to the public XHS MCP repository, submitting it to MCP directories, or updating the Glama entry. The hosted production `tools/list`, server card, and public GitHub repository are synchronized at `0.1.11` with all 24 tracked tools. The npm stdio bridge is published as `xiaohongshu-xhs-rednote-mcp@0.1.11` and connects to the same hosted surface. Version `0.1.11` renames the public XHS product search/detail shop fields from `seller_*` to `shop_*`; the official Registry latest remains `0.1.10` pending publication.

## Public Repository

- Repository name: `xiaohongshu-xhs-rednote-mcp`
- Repository URL: `https://github.com/DevinChen2014/xiaohongshu-xhs-rednote-mcp`
- Repository description: `小红书 MCP / Xiaohongshu MCP / XHS MCP / RedNote MCP for filtered note search, product search, product details, product reviews, product review replies, PGY enhanced note details, note details, comments, comment replies, creator profiles, and creator note lists. PGY successful calls cost 20 points and failures are not charged.`
- Current repository topics: `mcp`, `mcp-server`, `xiaohongshu`, `xiaohongshu-mcp`, `xhs`, `xhs-mcp`, `rednote`, `rednote-mcp`
- Optional expansion topics: `social-insights`, `marketing-research`, `comment-analysis`
- Root README title: `小红书 MCP | Xiaohongshu MCP | XHS MCP | RedNote MCP`
- Product: `SocialDataX` / `社媒数据助手`
- Website: `https://socialdatax.com`
- Registry name: `com.52choujiang/xhs-insights`
- Future registry name: `com.socialdatax/xhs-insights`
- Hosted MCP endpoint: `https://mcp.socialdatax.com/xhs/mcp`
- Hosted auth: `Authorization: Bearer <SOCIALDATAX_API_KEY>`
- Default client transport: hosted `streamable-http`
- Command/stdio fallback: set `SOCIALDATAX_API_KEY` in the client environment, then use `npx -y mcp-remote https://mcp.socialdatax.com/xhs/mcp --header 'Authorization: Bearer ${SOCIALDATAX_API_KEY}'`
- License: MIT for the public documentation and examples only

## Safety Checks

- No real API Key values are present.
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

- Hosted streamable HTTP clients can connect directly to `https://mcp.socialdatax.com/xhs/mcp` with `Authorization: Bearer <SOCIALDATAX_API_KEY>`.
- With a valid key, hosted MCP `initialize` succeeds.
- With a valid key, hosted MCP `tools/list` returns the current 24 public tools.
- `xhs_search_suggestions` is present in `tools/list` and accepts only the required `keyword` field.
- `xhs_pgy_get_note_detail_by_note_id` and `xhs_pgy_get_note_detail_by_note_url` are present in `tools/list`, the old MCP name is absent, and both descriptions state the 20-point successful-call cost and that failures are not charged.
- `xhs_get_product_reviews` is present in `tools/list`.
- `xhs_get_product_review_replies` is present in `tools/list` and accepts a user-provided first-level `review_id` or one copied from product review items.
- `xhs_submit_video_speech_text_by_note_url`, `xhs_submit_video_speech_text_by_note_id`, and `xhs_get_video_speech_text_job` are present in `tools/list`; if any are missing, deploy the latest service before publishing.
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
