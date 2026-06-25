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

- Hosted MCP endpoint: `https://mcp.52choujiang.com/xhs/mcp`
- Hosted transport: `streamable-http`
- Authentication: `Authorization: Bearer <SOCIALDATAX_API_KEY>`
- Product: `SocialDataX` / `社媒数据助手`
- Website: <https://socialdatax.com>
- Registry name: `com.52choujiang/xhs-insights`
- Future registry name: `com.socialdatax/xhs-insights`
- Current public capability version: `0.1.7`

## Platform MCP

Use the hosted `streamable-http` endpoint directly from clients that support authenticated remote MCP. For clients that only support command/stdio MCP servers, use `mcp-remote` as a local compatibility proxy.

## Workflow Scope

This MCP service is designed for social media content intelligence workflows. It does not provide account login, posting, editing, liking, commenting, or other account actions.

Supported workflows include:

- Search related Xiaohongshu notes by keyword, with optional sort, note type, and publish-time filters.
- Read the Xiaohongshu search hot list with title and heat value.
- Resolve a shared note link, short link, or share text into structured note details.
- Read note details when the caller already has a note ID.
- Fetch paginated first-level comments for comment analysis.
- Fetch paginated replies under a first-level comment.
- Read creator profile data from a profile link, short link, share text, or user ID.
- Fetch paginated creator note lists from a user ID, profile link, short link, or share text for content style and account research.
- Submit a video note speech-to-text transcript task; submit tools 提交完成后最多短等 15 秒, and unfinished jobs can be polled by `job_id`.

## Tools

| Tool | Public purpose |
| --- | --- |
| `xhs_search_notes` | Search Xiaohongshu / 小红书 notes by keyword with optional sort, note type, and publish-time filters. In every use of a returned `note_url`, such as final answers, display, references, storage, output, or forwarding, preserve the full URL exactly, including `xsec_token`; do not rebuild links from `note_id`. |
| `xhs_get_search_hot_list` | Get the Xiaohongshu / 小红书 search hot list with each item's title and heat value. |
| `xhs_get_note_detail_by_note_url` | Resolve a shared XHS link, short link, or share text into structured note details. In every use of a returned `note_url`, such as final answers, display, references, storage, output, or forwarding, preserve the full URL exactly, including `xsec_token`; do not rebuild links from `note_id`. If `note_url` is null, do not synthesize or rebuild a public link from `note_id`. |
| `xhs_get_note_detail_by_note_id` | Fetch structured note details when the caller already has a note ID. If `note_url` is returned, preserve the full URL exactly in every use, such as final answers, display, references, storage, output, or forwarding, including `xsec_token`; do not rebuild links from `note_id`. If `note_url` is null, do not synthesize or rebuild a public link from `note_id`. |
| `xhs_get_note_comments_by_note_id` | Fetch paginated first-level comments when the caller already has a note ID. To continue pagination, pass the full returned `next_page_token` back unchanged as `page_token`; do not truncate, summarize, mask, or replace the middle with ellipses. |
| `xhs_get_note_comments_by_note_url` | Fetch paginated first-level comments directly from a shared note URL, short link, or share text. To continue pagination, pass the full returned `next_page_token` back unchanged as `page_token`; do not truncate, summarize, mask, or replace the middle with ellipses. |
| `xhs_get_note_sub_comments_by_comment_id` | Fetch paginated replies under a first-level comment by note ID and comment ID. To continue pagination, pass the full returned `next_page_token` back unchanged as `page_token`; do not truncate, summarize, mask, or replace the middle with ellipses. |
| `xhs_get_user_info_by_user_id` | Fetch creator profile data when the caller already has a user ID. |
| `xhs_get_user_info_by_profile_url` | Resolve a profile link, short link, or share text into creator profile data. |
| `xhs_get_user_posted_notes_by_user_id` | Fetch a paginated list of notes published by a creator when the caller already has a user ID. To continue pagination, pass the full returned `next_page_token` back unchanged as `page_token`; do not truncate, summarize, mask, or replace the middle with ellipses. |
| `xhs_get_user_posted_notes_by_profile_url` | Fetch a paginated list of notes published by a creator from a profile link, short link, or share text. To continue pagination, pass the full returned `next_page_token` back unchanged as `page_token`; do not truncate, summarize, mask, or replace the middle with ellipses. |
| `xhs_submit_video_speech_text_by_note_url` | Submit a video note speech-to-text transcript task from a note link, short link, or share text. 提交完成后最多短等 15 秒. |
| `xhs_submit_video_speech_text_by_note_id` | Submit a video note speech-to-text transcript task from a `note_id`. 提交完成后最多短等 15 秒. |
| `xhs_get_video_speech_text_job` | Check a video note speech-to-text transcript job by `job_id` without creating a new task. This v1 surface returns transcript only, not summary. |

## Quick Start

For clients that support authenticated `streamable-http`, use the hosted endpoint directly:

```json
{
  "mcpServers": {
    "socialdatax-xhs": {
      "type": "streamable_http",
      "url": "https://mcp.52choujiang.com/xhs/mcp",
      "headers": {
        "Authorization": "Bearer <SOCIALDATAX_API_KEY>"
      }
    }
  }
}
```

A ready-to-copy example is available in [`examples/streamable_http_config.json`](examples/streamable_http_config.json).

For command/stdio-only MCP clients, use `mcp-remote`:

```json
{
  "mcpServers": {
    "socialdatax-xhs": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "https://mcp.52choujiang.com/xhs/mcp",
        "--header",
        "Authorization: Bearer <SOCIALDATAX_API_KEY>"
      ]
    }
  }
}
```

Claude Code can use remote HTTP directly:

```bash
claude mcp add --transport http socialdatax-xhs https://mcp.52choujiang.com/xhs/mcp --header 'Authorization: Bearer ${SOCIALDATAX_API_KEY}'
```

Persist `SOCIALDATAX_API_KEY` in the runtime environment or client Secret before restarting Claude Code.

Claude Desktop should use its remote MCP / Connectors UI when available. If a local configuration file in your version only supports command/stdio servers, use the `mcp-remote` fallback.

## Client Examples

Configuration examples are available in [examples](examples/):

- [Command/stdio fallback config](mcp.json)
- [Claude Desktop fallback config](examples/claude_desktop_config.json)
- [Cursor remote HTTP config](examples/cursor_mcp.json)
- [Codex remote HTTP config](examples/codex_config.toml)
- [Direct streamable HTTP config](examples/streamable_http_config.json)

## API Key

Request or manage API access from the product website:

<https://socialdatax.com>

Use the key as a Bearer token in the `Authorization` request header. Do not commit real API keys to code, docs, issues, or screenshots.

## Directory Metadata

Public metadata files in this repository:

- [server-card.json](server-card.json): directory-oriented metadata for the hosted service. Official MCP Registry publishing uses the private source repo's `registry/xhs/server.json` for the current `com.52choujiang/xhs-insights` entry.
- [mcp.json](mcp.json): generic command/stdio fallback config using `mcp-remote`.
- [glama.json](glama.json): Glama repository ownership metadata.
- [SUBMISSION_CHECKLIST.md](SUBMISSION_CHECKLIST.md): checklist for MCP directory submissions.

## License

The files in this public repository are released under the MIT License. The license covers the public documentation and configuration examples in this repository only. It does not cover the managed service implementation, hosted infrastructure, or any private backend code outside this repository.
