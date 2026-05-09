# XHS Insights MCP for OpenClaw

This directory contains an OpenClaw native plugin shim for the hosted XHS Insights MCP service.

The plugin registers namespaced OpenClaw tools and forwards each call to a remote, read-only `streamable-http` MCP endpoint:

- Endpoint: `https://mcp.52choujiang.com/xhs/mcp`
- API key environment variable: `SOCIAL_MEDIA_MCP_API_KEY`
- Website: <https://52choujiang.com/assistant>
- Package name: `xhs-insights-openclaw`
- Version: `0.1.6`

## Capabilities

The hosted XHS MCP supports read-only Xiaohongshu / XHS / RedNote workflows:

- Search notes by keyword with optional sort, note type, and publish-time filters.
- Resolve shared note links, short links, share text, or note IDs into structured details.
- Fetch note details, first-level comments, and comment replies.
- Read creator profile information.
- Fetch creator note lists for content style and account research.

The service does not provide account login, posting, editing, liking, commenting, or other account actions.

## Plugin Structure

This package uses the native OpenClaw plugin path:

- `openclaw.plugin.json` declares the native plugin manifest and tool contracts.
- `package.json` declares the OpenClaw extension entry and MCP SDK dependency.
- `index.js` registers thin forwarding tools that call the hosted MCP service.

It intentionally does not include `.codex-plugin/` or `.mcp.json`, because OpenClaw gives `openclaw.plugin.json` native-plugin precedence when both marker types are present.

## API Key

Set the shared API key before using this plugin:

```bash
export SOCIAL_MEDIA_MCP_API_KEY="<SOCIAL_MEDIA_MCP_API_KEY>"
```

The key is sent as:

```text
Authorization: Bearer ${SOCIAL_MEDIA_MCP_API_KEY}
```

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
clawhub package publish public-listings/xhs-insights-openclaw \
  --family code-plugin \
  --name xhs-insights-openclaw \
  --display-name "XHS Insights MCP for OpenClaw" \
  --version 0.1.6 \
  --source-repo <public-owner/public-repo> \
  --source-commit <public-commit-sha> \
  --source-path public-listings/xhs-insights-openclaw \
  --dry-run \
  --json
```

Publish from a public GitHub source or pass explicit public `--source-repo`, `--source-commit`, and `--source-path` values. Do not publish from a private source checkout.
