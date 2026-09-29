# MCP Directory Submission Checklist

Use this checklist before syncing this listing to the public XHS MCP repository, submitting it to MCP directories, or updating the Glama entry.

- Local capability: `0.1.14` with 34 tracked tools, including creator commercial overview and note performance metrics.
- Hosted production: `0.1.14` with 34 tools, verified on `2026-09-29`; cooperation note performance uses signed relative comparison fields only in `notes[]` `*_benchmark_rate` values.
- Official MCP Registry: `0.1.12` (`active`, `isLatest=true`), verified on `2026-09-25`.
- Public GitHub server card: `0.1.12` with 26 tools, verified on `2026-09-25`.
- npm stdio bridge: `xiaohongshu-xhs-rednote-mcp@0.1.13`, verified on `2026-09-25`; bridge package versions are independent of hosted capability versions.

The current capability includes encrypted user ID resolution, PGY creator profiles, note performance, fans profiles and fans summaries, product review reply-reply lookup, product detail lookup by URL, and the product detail field rename (`images` to `main_images`; `detail_images` remains unchanged).

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
- For each capability update, verify hosted MCP `tools/list` returns the current 34 public tools with a valid key.
- With a valid key, hosted XHS MCP `tools/list` includes `xhs_pgy_get_creator_profile` and `xhs_pgy_get_creator_notes_performance`.
- Before publishing this listing draft, compare the exact tool names and schemas in its `server-card.json` with authenticated production `tools/list`; matching tool counts alone do not establish that the manifests match. This was rechecked on `2026-09-29` after deployment.
- `xhs_get_product_detail_by_url` accepts only the required `url` field; the ID tool remains `xhs_get_product_detail_by_sku_id(sku_id)`. Both return the same product detail fields.
- `xhs_search_suggestions` is present in `tools/list` and accepts only the required `keyword` field.
- `xhs_pgy_get_note_detail_by_note_id` and `xhs_pgy_get_note_detail_by_note_url` are present in `tools/list`, the old MCP name is absent, and both descriptions state the 20-point successful-call cost and that failures are not charged.
- `xhs_pgy_get_creator_profile`, `xhs_pgy_get_creator_notes_performance`, `xhs_pgy_get_creator_fans_profile`, and `xhs_pgy_get_creator_fans_summary` are present in `tools/list`; all require a complete `user_id`, state the 20-point successful-call cost, and state that failures are not charged.
- `xhs_pgy_get_creator_commercial_overview` requires user_id; note_scope is daily by default or cooperation, and is echoed in output. Outbound store metrics are null for daily. Successful calls cost 20 points; failures are not charged.
- `xhs_get_product_reviews` is present in `tools/list`.
- `xhs_get_product_review_replies` is present in `tools/list` and accepts a user-provided first-level `review_id` or one copied from product review items.
- `xhs_get_product_review_reply_replies` is present in `tools/list` and accepts a user-provided reply `review_id` or one copied from product review reply items.
- `xhs_get_user_id_by_encrypted_user_id` is present in `tools/list`, accepts a complete encrypted user ID, and returns a stable `user_id` without exposing protocol details.
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

## PGY enrollment boundary (source update, not yet published)

- Both PGY tools state enrolled-creators-only scope, 20 points on success and no charge on failure.
- Explicit no-commercial-data retains MCP `pgy_commercial_data_unavailable` and HTTP `1009`, with the not-enrolled message; no ID/URL retry.
- Transport, authentication, balance and input errors are not reclassified.
- Refresh tool descriptions and server card together at the next release; current online metadata is not asserted to be updated.

- `xhs_pgy_get_creator_metrics_trend` accepts user_id and optional note_scope (daily/cooperation), echoes the scope, and returns summary/items with medians and estimated costs. Verify daily store fields are null, cooperation preserves zero store medians with positive costs, date gaps remain, and successful calls cost 20 points.
