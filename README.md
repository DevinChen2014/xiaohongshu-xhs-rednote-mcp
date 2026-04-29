# 小红书 MCP | Xiaohongshu MCP | XHS MCP | RedNote MCP

This public repository provides a minimal MCP bridge plus public connection docs for a hosted 小红书 MCP / Xiaohongshu MCP / XHS MCP / RedNote MCP service.

If you are looking for a 小红书 MCP, Xiaohongshu MCP, XHS MCP, or RedNote MCP for social media research workflows, this repository includes:

- a minimal local stdio bridge for MCP clients and Glama inspection
- public MCP metadata and client configuration examples
- the direct hosted `streamable-http` endpoint for clients that already support remote MCP

The business implementation is privately hosted. This repository exposes only the public connection surface for read-only social media intelligence workflows.

## Search Aliases

Common search phrases for this MCP service:

- `小红书 MCP`
- `小红书 XHS MCP`
- `Xiaohongshu MCP`
- `XHS MCP`
- `RedNote MCP`
- `Xiaohongshu note search MCP`

## Service

- Hosted upstream MCP endpoint: `https://mcp.52choujiang.com/xhs/mcp`
- Hosted upstream transport: `streamable-http`
- Authentication: `Authorization: Bearer <XHS_MCP_API_KEY>`
- Website: <https://52choujiang.com/assistant>
- Registry name: `com.52choujiang/xhs-insights`
- Current public capability version: `0.1.3`

## Bridge

This repository also ships a minimal local stdio bridge. It forwards MCP requests to the hosted upstream service and keeps the public repo runnable for Glama `server` inspection and MCP clients that prefer command-based servers.

The bridge does not contain the private service implementation. It only relays MCP traffic to the hosted endpoint.

### Bridge Environment

- `XHS_MCP_API_KEY`
  Required for authenticated tool calls. Discovery methods such as `initialize` and `tools/list` can still be inspected without a key.
- `XHS_MCP_UPSTREAM_URL`
  Optional override for the hosted upstream URL. Default: `https://mcp.52choujiang.com/xhs/mcp`

### Local Run

```bash
npm install
XHS_MCP_API_KEY="<your_api_key>" npm start
```

### Docker Run

```bash
docker build -t xhs-mcp-bridge .
docker run --rm -i -e XHS_MCP_API_KEY="<your_api_key>" xhs-mcp-bridge
```

If Docker Hub is slow from your network, keep the default image unchanged for normal use and override only during local builds:

```bash
docker build --build-arg NODE_IMAGE=mirror.gcr.io/library/node:20-alpine -t xhs-mcp-bridge .
```

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
| `xhs_search_notes` | Search Xiaohongshu / 小红书 notes by keyword for research and discovery. |
| `xhs_get_note_detail_by_note_url` | Resolve a shared XHS link or share text into structured note details. |
| `xhs_get_note_detail_by_note_id` | Fetch structured note details when the caller already has a note ID. |
| `xhs_get_note_comments_by_note_id` | Fetch paginated first-level comments when the caller already has a note ID. |
| `xhs_get_note_comments_by_note_url` | Fetch paginated first-level comments directly from a shared note URL or share text. |
| `xhs_get_user_info_by_user_id` | Fetch creator profile data when the caller already has a user ID. |
| `xhs_get_user_info_by_profile_url` | Resolve a profile link or share text into creator profile data. |
| `xhs_get_user_posted_notes_by_user_id` | Fetch a paginated list of notes published by a creator when the caller already has a user ID. |
| `xhs_get_user_posted_notes_by_profile_url` | Fetch a paginated list of notes published by a creator from a profile link or share text. |

## Quick Start

For command-based MCP clients, use the local bridge published by this repository:

```json
{
  "mcpServers": {
    "xiaohongshu-xhs-rednote-mcp": {
      "command": "npx",
      "args": [
        "-y",
        "github:DevinChen2014/xiaohongshu-xhs-rednote-mcp"
      ],
      "env": {
        "XHS_MCP_API_KEY": "<XHS_MCP_API_KEY>"
      }
    }
  }
}
```

For clients that already support authenticated `streamable-http`, use the hosted upstream endpoint directly. A ready-to-copy example is available in [`examples/streamable_http_config.json`](examples/streamable_http_config.json).

## Client Examples

Configuration examples are available in [examples](examples/):

- [Generic command-based MCP config](mcp.json)
- [Claude Desktop bridge config](examples/claude_desktop_config.json)
- [Cursor bridge config](examples/cursor_mcp.json)
- [Codex bridge config](examples/codex_config.toml)
- [Direct streamable HTTP config](examples/streamable_http_config.json)

## API Key

Request or manage API access from the product website:

<https://52choujiang.com/assistant>

Use the key as a Bearer token in the `Authorization` request header. Do not commit real API keys to code, docs, issues, or screenshots.

## Directory Metadata

Public metadata files in this repository:

- [server-card.json](server-card.json): MCP registry-style metadata for the hosted upstream service.
- [mcp.json](mcp.json): generic command-based config for the local bridge in this repo.
- [glama.json](glama.json): Glama repository ownership metadata.
- [SUBMISSION_CHECKLIST.md](SUBMISSION_CHECKLIST.md): checklist for MCP directory submissions.

## License

The files in this public repository are released under the MIT License. The license covers the public bridge wrapper, documentation, and configuration examples in this repository only. It does not cover the managed service implementation, hosted infrastructure, or any private backend code outside this repository.
