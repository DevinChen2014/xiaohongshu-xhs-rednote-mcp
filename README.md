# 小红书 MCP | Xiaohongshu MCP | XHS MCP | RedNote MCP

This public repository provides public connection docs and MCP metadata for a hosted 小红书 MCP / Xiaohongshu MCP / XHS MCP / RedNote MCP service.

If you are looking for a 小红书 MCP, Xiaohongshu MCP, XHS MCP, or RedNote MCP for social media research workflows, this repository includes:

- public MCP metadata and client configuration examples
- the hosted `streamable-http` endpoint for clients that support remote MCP
- an `mcp-remote` fallback example for command/stdio-only MCP clients

The business implementation is privately hosted. This repository exposes only the public connection surface for social media content intelligence workflows.

## Search Aliases

Common search phrases for this MCP service:

- `小红书 MCP`
- `小红书 数据 MCP`
- `小红书 搜索 MCP`
- `小红书 XHS MCP`
- `Xiaohongshu MCP`
- `Xiaohongshu data MCP`
- `XHS MCP`
- `XHS data MCP`
- `RedNote MCP`
- `RedNote data MCP`
- `Xiaohongshu note search MCP`

## Service

- Hosted MCP endpoint: `https://mcp.socialdatax.com/xhs/mcp`
- Hosted transport: `streamable-http`
- Authentication: `Authorization: Bearer <SOCIALDATAX_API_KEY>`
- Product: `SocialDataX` / `社媒数据助手`
- Website and API Key access: <https://socialdatax.com/ai?from=github>
- Registry name: `com.52choujiang/xhs-insights`
- Future registry name: `com.socialdatax/xhs-insights`
- Current public capability version: `0.1.11` (repo-tracked, pending deployment and publication). The hosted production `tools/list` and server card expose all 24 tracked tools at `0.1.10`; the official Registry and public GitHub repository remain at `0.1.10`. Version `0.1.11` keeps the same 24 tools and renames the public XHS product search/detail shop fields from `seller_*` to `shop_*`.

## Platform MCP

Use the hosted `streamable-http` endpoint directly from clients that support authenticated remote MCP. For clients that only support command/stdio MCP servers, use `mcp-remote` as a local compatibility proxy.

## npm stdio bridge

Requires Node.js 20.18.1 or later.

Command/stdio-only MCP clients can install and start the bridge directly from npm:

```json
{
  "mcpServers": {
    "socialdatax-xhs": {
      "command": "npx",
      "args": ["-y", "xiaohongshu-xhs-rednote-mcp"],
      "env": {
        "SOCIALDATAX_API_KEY": "<SOCIALDATAX_API_KEY>"
      }
    }
  }
}
```

The package only forwards local stdio MCP messages to the hosted SocialDataX XHS endpoint. It does not contain the private service implementation or store the API Key.

## Workflow Scope

This MCP service is designed for social media content intelligence workflows. It does not provide account login, posting, editing, liking, commenting, or other account actions.

Supported workflows include:

- Query the current API Key account's SocialDataX points balance / 积分余额、剩余积分或点数.
- Search related Xiaohongshu notes by keyword, with optional sort, note type, and publish-time filters.
- Search Xiaohongshu products by keyword with page_token continuation.
- Fetch product details by a complete sku_id supplied by the user or copied from product search results.
- Fetch one PGY / 蒲公英 enhanced note detail from either a complete note_id or a note link, short link, or share text; successful calls cost 20 points and failures are not charged.
- Fetch product reviews by a complete sku_id supplied by the user or copied from product search results.
- Read the Xiaohongshu search hot list with title and heat value.
- Read Xiaohongshu search suggestions for a keyword or partial phrase.
- Resolve a shared note link, short link, or share text into structured note details.
- Read note details when the caller already has a note ID.
- Fetch paginated first-level comments for comment analysis.
- Fetch paginated replies under a first-level comment.
- Read creator profile data from a profile link, short link, share text, or user ID.
- Fetch paginated creator note lists from a user ID, profile link, short link, or share text for content style and account research.
- Fetch paginated tag page note lists from a topic URL, short link, share text, or page ID.
- Submit a video note speech-to-text transcript task; the submit call may wait up to 240 seconds, and unfinished jobs should continue polling the same `job_id` until terminal.

## Tools

| Tool | Public purpose |
| --- | --- |
| `socialdatax_get_points_balance` | Query the current API Key account's SocialDataX points balance / 积分余额、剩余积分或点数. |
| `xhs_search_notes` | Search Xiaohongshu / 小红书 notes by keyword with optional sort, note type, publish-time filters, and `page_token` continuation. Use the corresponding detail tool when the caller already has a note link or `note_id` and needs one note's details; use the corresponding URL/ID tool for comments, replies, or speech-to-text. To continue search pagination, pass the full returned `next_page_token` back unchanged as `page_token`; omit `page_token` on the first request. In every use of a returned `note_url`, such as final answers, display, references, storage, output, or forwarding, preserve the full URL exactly, including `xsec_token`; do not rebuild links from `note_id`. |
| `xhs_search_products` | Search Xiaohongshu products by product name, brand, category, or product-related query, with `page_token` continuation. Use this tool for search terms; if a complete `sku_id` is already available, including one supplied by the user, use `xhs_get_product_detail` or `xhs_get_product_reviews` instead. Do not use product links, `sku_id`, `spu_id`, or `page_token` as the keyword. To continue product search pagination, pass the full returned `next_page_token` back unchanged as `page_token`; do not truncate, summarize, mask, or replace the middle with ellipses. |
| `xhs_get_product_detail` | Fetch Xiaohongshu product details by a complete `sku_id` supplied by the user or copied from `xhs_search_products` results. This tool does not accept `spu_id`, product links, or search keywords. |
| `xhs_pgy_get_note_detail_by_note_id` | Fetch one Xiaohongshu PGY / 蒲公英 enhanced note detail when the caller already has a complete `note_id`, including content, images or a video summary, author, exposure, reads, engagement counts, and image/video pricing. This is PGY commercial data, not ordinary public note detail; successful calls cost 20 points and failures are not charged. |
| `xhs_pgy_get_note_detail_by_note_url` | Fetch one Xiaohongshu PGY / 蒲公英 enhanced note detail from a complete note link, short link, or share text, with the same PGY commercial output. Successful calls cost 20 points and failures are not charged. |
| `xhs_get_product_reviews` | Fetch Xiaohongshu product reviews by a complete `sku_id` supplied by the user or copied from `xhs_search_products` results; accepts `sort_type`: `general` (comprehensive sort, the default) or `time_descending`, `has_image`, and `page_token` continuation. To continue pagination, pass the full returned `next_page_token` back unchanged as `page_token`; do not truncate, summarize, mask, or replace the middle with ellipses. This tool does not accept `spu_id`, product links, or search keywords. |
| `xhs_get_product_review_replies` | Fetch replies under a first-level Xiaohongshu product review. Use a user-provided `review_id`, or obtain one from `xhs_get_product_reviews`; accepts opaque `page_token` continuation. To continue pagination, pass the full returned `next_page_token` back unchanged as `page_token`; do not truncate, summarize, mask, or replace the middle with ellipses. This tool does not accept `root_review_id`. |
| `xhs_get_search_hot_list` | Get the Xiaohongshu / 小红书 search hot list with each item's title and heat value. |
| `xhs_search_suggestions` | Get Xiaohongshu / 小红书 search suggestions for a keyword or partial phrase, including suggestion text, search target, and an optional description. |
| `xhs_get_note_detail_by_note_url` | Resolve a shared XHS link, short link, or share text into structured note details. In every use of a returned `note_url`, such as final answers, display, references, storage, output, or forwarding, preserve the full URL exactly, including `xsec_token`; do not rebuild links from `note_id`. If `note_url` is null, do not synthesize or rebuild a public link from `note_id`. |
| `xhs_get_note_detail_by_note_id` | Fetch structured note details when the caller already has a note ID. If `note_url` is returned, preserve the full URL exactly in every use, such as final answers, display, references, storage, output, or forwarding, including `xsec_token`; do not rebuild links from `note_id`. If `note_url` is null, do not synthesize or rebuild a public link from `note_id`. |
| `xhs_get_note_comments_by_note_id` | Fetch paginated first-level comments when the caller already has a note ID; accepts optional comment `sort_type`: `default`, `time_descending`, or `like_count_descending`. To continue pagination, pass the full returned `next_page_token` back unchanged as `page_token`; do not truncate, summarize, mask, or replace the middle with ellipses. |
| `xhs_get_note_comments_by_note_url` | Fetch paginated first-level comments directly from a shared note URL, short link, or share text; accepts optional comment `sort_type`: `default`, `time_descending`, or `like_count_descending`. To continue pagination, pass the full returned `next_page_token` back unchanged as `page_token`; do not truncate, summarize, mask, or replace the middle with ellipses. |
| `xhs_get_note_sub_comments_by_comment_id` | Fetch paginated replies under a first-level comment by note ID and comment ID. To continue pagination, pass the full returned `next_page_token` back unchanged as `page_token`; do not truncate, summarize, mask, or replace the middle with ellipses. |
| `xhs_get_user_info_by_user_id` | Fetch creator profile data when the caller already has a user ID. |
| `xhs_get_user_info_by_profile_url` | Resolve a profile link, short link, or share text into creator profile data. |
| `xhs_get_user_posted_notes_by_user_id` | Fetch a paginated list of notes published by a creator when the caller already has a user ID. To continue pagination, pass the full returned `next_page_token` back unchanged as `page_token`; do not truncate, summarize, mask, or replace the middle with ellipses. |
| `xhs_get_user_posted_notes_by_profile_url` | Fetch a paginated list of notes published by a creator from a profile link, short link, or share text. To continue pagination, pass the full returned `next_page_token` back unchanged as `page_token`; do not truncate, summarize, mask, or replace the middle with ellipses. |
| `xhs_get_topic_notes_by_topic_url` | Fetch a paginated tag page note list from a topic URL, short link, or share text; accepts `sort_type`: `hot` or `time_descending`. To continue pagination, pass the full returned `next_page_token` back unchanged as `page_token`; do not truncate, summarize, mask, or replace the middle with ellipses. |
| `xhs_get_topic_notes_by_page_id` | Fetch a paginated tag page note list when the caller already has the tag page `page_id`; accepts `sort_type`: `hot` or `time_descending`. To continue pagination, pass the full returned `next_page_token` back unchanged as `page_token`; do not truncate, summarize, mask, or replace the middle with ellipses. |
| `xhs_submit_video_speech_text_by_note_url` | Submit a video note speech-to-text transcript task from a note link, short link, or share text. The submit call may wait up to 240 seconds; if unfinished, continue polling the same `job_id` until terminal. |
| `xhs_submit_video_speech_text_by_note_id` | Submit a video note speech-to-text transcript task from a `note_id`. The submit call may wait up to 240 seconds; if unfinished, continue polling the same `job_id` until terminal. |
| `xhs_get_video_speech_text_job` | Check a video note speech-to-text transcript job using a valid `job_id` supplied by the user, or a `job_id` returned by a submit tool; this tool does not accept `note_id` or note links and does not create a new task. Each call waits up to 240 seconds. If unfinished, continue querying the same `job_id` until terminal. This v1 surface returns transcript plus content context, not summary. |

## Quick Start

For clients that support authenticated `streamable-http`, use the hosted endpoint directly:

```json
{
  "mcpServers": {
    "socialdatax-xhs": {
      "type": "streamable_http",
      "url": "https://mcp.socialdatax.com/xhs/mcp",
      "headers": {
        "Authorization": "Bearer <SOCIALDATAX_API_KEY>"
      }
    }
  }
}
```

A ready-to-copy example is available in [`examples/streamable_http_config.json`](https://github.com/DevinChen2014/xiaohongshu-xhs-rednote-mcp/blob/main/examples/streamable_http_config.json).

For command/stdio-only MCP clients, use `mcp-remote`:

```json
{
  "mcpServers": {
    "socialdatax-xhs": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "https://mcp.socialdatax.com/xhs/mcp",
        "--header",
        "Authorization: Bearer ${SOCIALDATAX_API_KEY}"
      ],
      "env": {
        "SOCIALDATAX_API_KEY": "<SOCIALDATAX_API_KEY>"
      }
    }
  }
}
```

Claude Code can use remote HTTP directly:

```bash
claude mcp add --transport http socialdatax-xhs https://mcp.socialdatax.com/xhs/mcp --header 'Authorization: Bearer ${SOCIALDATAX_API_KEY}'
```

Persist `SOCIALDATAX_API_KEY` in the runtime environment or client Secret before restarting Claude Code.

Claude Desktop should use its remote MCP / Connectors UI when available. If a local configuration file in your version only supports command/stdio servers, use the `mcp-remote` fallback.

## Client Examples

Configuration examples are available in [examples](https://github.com/DevinChen2014/xiaohongshu-xhs-rednote-mcp/tree/main/examples):

- [Command/stdio fallback config](https://github.com/DevinChen2014/xiaohongshu-xhs-rednote-mcp/blob/main/mcp.json)
- [Claude Desktop fallback config](https://github.com/DevinChen2014/xiaohongshu-xhs-rednote-mcp/blob/main/examples/claude_desktop_config.json)
- [Cursor remote HTTP config](https://github.com/DevinChen2014/xiaohongshu-xhs-rednote-mcp/blob/main/examples/cursor_mcp.json)
- [Codex remote HTTP config](https://github.com/DevinChen2014/xiaohongshu-xhs-rednote-mcp/blob/main/examples/codex_config.toml)
- [Direct streamable HTTP config](https://github.com/DevinChen2014/xiaohongshu-xhs-rednote-mcp/blob/main/examples/streamable_http_config.json)

## API Key

Request or manage API access from the product website:

<https://socialdatax.com/ai?from=github>

Use the key as a Bearer token in the `Authorization` request header. Do not commit real API Key values to code, docs, issues, or screenshots.

## Directory Metadata

Public metadata files in this repository:

- [server-card.json](https://github.com/DevinChen2014/xiaohongshu-xhs-rednote-mcp/blob/main/server-card.json): directory-oriented metadata for the hosted service. Official MCP Registry publishing uses the private source repo's `registry/xhs/server.json` for the current `com.52choujiang/xhs-insights` entry.
- [mcp.json](https://github.com/DevinChen2014/xiaohongshu-xhs-rednote-mcp/blob/main/mcp.json): generic command/stdio fallback config using `mcp-remote`.
- [glama.json](https://github.com/DevinChen2014/xiaohongshu-xhs-rednote-mcp/blob/main/glama.json): Glama repository ownership metadata.
- [SUBMISSION_CHECKLIST.md](https://github.com/DevinChen2014/xiaohongshu-xhs-rednote-mcp/blob/main/SUBMISSION_CHECKLIST.md): checklist for MCP directory submissions.

## License

The files in this public repository are released under the MIT License. The license covers the public documentation and configuration examples in this repository only. It does not cover the managed service implementation, hosted infrastructure, or any private backend code outside this repository.
