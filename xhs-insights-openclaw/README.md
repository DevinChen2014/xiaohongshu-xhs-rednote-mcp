# 社媒数据助手 小红书 MCP | Xiaohongshu XHS RedNote MCP

This directory contains an OpenClaw native plugin shim for the hosted 小红书 MCP service by SocialDataX.

The plugin registers namespaced OpenClaw tools and forwards each call to a remote, read-only `streamable-http` MCP endpoint:

- Endpoint: `https://mcp.52choujiang.com/xhs/mcp`
- API key environment variable: `SOCIALDATAX_API_KEY`
- Product: `SocialDataX` / `社媒数据助手`
- Website: <https://socialdatax.52choujiang.com>
- Package name: `xhs-insights-openclaw-plugin`
- Version: `0.1.17`
- Search terms: Xiaohongshu, XHS, RedNote, 小红书, 小红书搜索热榜, search hot list, social media research, marketing research, comments, creator profiles

## Capabilities

The hosted XHS MCP supports read-only Xiaohongshu / XHS / RedNote workflows:

- Search notes by keyword with optional sort, note type, and publish-time filters.
- Fetch the Xiaohongshu / XHS / RedNote search hot list with title and heat value.
- Resolve shared note links, short links, or share text into structured details.
- Fetch note details directly when a note ID is already known.
- Fetch note details, first-level comments, and comment replies.
- Read creator profile information.
- Fetch creator note lists for content style and account research.

For XHS outputs with a returned `note_url` field: When `note_url` is non-null, preserve the full URL exactly, including `xsec_token`, such as in final answers or display; do not rebuild links from `note_id`. If `note_url` is null, do not synthesize a public link from `note_id`.

The service does not provide account login, posting, editing, liking, commenting, or other account actions.

## Plugin Structure

This package uses the native OpenClaw plugin path:

- `openclaw.plugin.json` declares the native plugin manifest and tool contracts.
- `package.json` declares the OpenClaw extension entry and MCP SDK dependency.
- `index.js` registers thin forwarding tools that call the hosted MCP service.
- Runtime metadata declares the required `node` binary, `SOCIALDATAX_API_KEY`, and the hosted MCP service domain.

It intentionally does not include `.codex-plugin/` or `.mcp.json`, because OpenClaw gives `openclaw.plugin.json` native-plugin precedence when both marker types are present.

## API Key

Set the shared API key before using this plugin:

```bash
export SOCIALDATAX_API_KEY="<SOCIALDATAX_API_KEY>"
```

The key is sent as:

```text
Authorization: Bearer ${SOCIALDATAX_API_KEY}
```

The plugin sends the key only to the fixed endpoint `https://mcp.52choujiang.com/xhs/mcp`. It does not support overriding the endpoint URL.

Do not commit real API keys to code, docs, issues, or screenshots.

## Tool Names

The native plugin registers namespaced tool names that match the earlier MCP server prefix convention. For example, the remote MCP tool `xhs_search_notes` is exposed as:

```text
xhs-insights__xhs_search_notes
```

## Publishing Check

Use ClawHub dry-run before publishing:

```bash
source ~/.nvm/nvm.sh
nvm use 24.13.0
clawhub package publish <public-checkout>/xhs-insights-openclaw \
  --family code-plugin \
  --name xhs-insights-openclaw-plugin \
  --display-name "社媒数据助手 小红书 MCP | Xiaohongshu XHS RedNote MCP" \
  --version 0.1.17 \
  --source-repo <public-owner/public-repo> \
  --source-commit <public-commit-sha> \
  --source-path xhs-insights-openclaw \
  --dry-run \
  --json
```

Publish from a public GitHub source or pass explicit public `--source-repo`, `--source-commit`, and `--source-path` values. Do not publish from a private source checkout.
