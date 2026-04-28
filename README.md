# Xiaohongshu XHS RedNote Social Media Data Assistant MCP

Remote read-only MCP access for Xiaohongshu / XHS / RedNote workflows. This listing repository contains public documentation, MCP metadata, and client configuration examples for the managed Social Media Data Assistant XHS MCP service.

The managed service helps AI assistants search Xiaohongshu notes, read structured note details, fetch paginated first-level comments, look up creator profiles, and retrieve creator note lists for competitor research, audience insight, creator profiling, and topic discovery.

## Service

- MCP endpoint: `https://mcp.52choujiang.com/xhs/mcp`
- Transport: `streamable-http`
- Authentication: `Authorization: Bearer <XHS_MCP_API_KEY>`
- Website: <https://52choujiang.com/assistant>
- Registry name: `com.52choujiang/xhs-insights`
- Current public version: `0.1.3`

This repository documents how to connect to the hosted MCP service. It does not include the managed service implementation.

## Read-Only Scope

This MCP service is designed for read-only social media intelligence workflows. It does not provide account login, posting, editing, liking, commenting, or other account actions.

Supported workflows include:

- Search related Xiaohongshu notes by keyword.
- Resolve a shared note link or share text into structured note details.
- Read note details when the caller already has a note ID.
- Fetch paginated first-level comments for comment analysis.
- Read creator profile data from a profile link or user ID.
- Fetch paginated creator note lists for content style and account research.

## Tools

| Tool | Public purpose |
| --- | --- |
| `xhs_search_notes` | Search Xiaohongshu notes by keyword for research and discovery. |
| `xhs_get_note_detail_by_note_url` | Resolve a shared XHS link or share text into structured note details. |
| `xhs_get_note_detail_by_note_id` | Fetch structured note details when the caller already has a note ID. |
| `xhs_get_note_comments_by_note_id` | Fetch paginated first-level comments when the caller already has a note ID. |
| `xhs_get_note_comments_by_note_url` | Fetch paginated first-level comments directly from a shared note URL or share text. |
| `xhs_get_user_info_by_user_id` | Fetch creator profile data when the caller already has a user ID. |
| `xhs_get_user_info_by_profile_url` | Resolve a profile link or share text into creator profile data. |
| `xhs_get_user_posted_notes_by_user_id` | Fetch a paginated list of notes published by a creator when the caller already has a user ID. |
| `xhs_get_user_posted_notes_by_profile_url` | Fetch a paginated list of notes published by a creator from a profile link or share text. |

## Quick Start

Set your API key in an environment variable:

```bash
export XHS_MCP_API_KEY="<your_api_key>"
```

Use the remote MCP endpoint with an Authorization header:

```json
{
  "mcpServers": {
    "social-insights-assistant-xhs-mcp": {
      "type": "streamable_http",
      "url": "https://mcp.52choujiang.com/xhs/mcp",
      "headers": {
        "Authorization": "Bearer <XHS_MCP_API_KEY>"
      }
    }
  }
}
```

Some MCP clients use `streamableHttp` or `http` as the transport key instead of `streamable_http`. Keep the same URL and Authorization header, and adapt only the transport key if your client requires a different spelling.

## Client Examples

Configuration examples are available in [examples](examples/):

- [Streamable HTTP config](examples/streamable_http_config.json)
- [Claude Desktop config](examples/claude_desktop_config.json)
- [Cursor MCP config](examples/cursor_mcp.json)
- [Codex config](examples/codex_config.toml)

## API Key

Request or manage API access from the product website:

<https://52choujiang.com/assistant>

Use the key as a Bearer token in the `Authorization` request header. Do not commit real API keys to code, docs, issues, or screenshots.

## Directory Metadata

Public metadata files in this repository:

- [server-card.json](server-card.json): MCP registry-style server metadata.
- [mcp.json](mcp.json): reusable remote MCP configuration.
- [SUBMISSION_CHECKLIST.md](SUBMISSION_CHECKLIST.md): checklist for MCP directory submissions.

## License

The public documentation and configuration examples in this repository are released under the MIT License. The license does not cover the managed service implementation or hosted infrastructure.
