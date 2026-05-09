const PLUGIN_ID = "xhs-insights-openclaw";
const PLUGIN_NAME = "XHS Insights MCP for OpenClaw";
const PLUGIN_VERSION = "0.1.6";
const DEFAULT_ENDPOINT_URL = "https://mcp.52choujiang.com/xhs/mcp";
const DEFAULT_API_KEY_ENV = "SOCIAL_MEDIA_MCP_API_KEY";
const DEFAULT_CONNECTION_TIMEOUT_MS = 30000;

const CONFIG_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    apiKeyEnv: {
      type: "string",
      default: DEFAULT_API_KEY_ENV,
      description: "Environment variable that contains the API Key used as a Bearer token.",
    },
    endpointUrl: {
      type: "string",
      format: "uri",
      default: DEFAULT_ENDPOINT_URL,
      description: "Remote streamable-http MCP endpoint URL.",
    },
    connectionTimeoutMs: {
      type: "integer",
      default: DEFAULT_CONNECTION_TIMEOUT_MS,
      minimum: 1000,
      maximum: 120000,
      description: "Timeout in milliseconds for remote MCP HTTP requests.",
    },
  },
};

const PAGE_TOKEN_PROPERTY = {
  type: "string",
  default: "",
  description: "Pagination token. Leave empty for the first page; pass the previous next_page_token to continue.",
};

const TOOL_DEFINITIONS = [
  {
    name: "xhs-insights__xhs_search_notes",
    remoteName: "xhs_search_notes",
    label: "Search XHS Notes",
    description: "Search XHS / RedNote notes by keyword with optional sort, note type, and publish-time filters.",
    parameters: {
      type: "object",
      additionalProperties: false,
      required: ["keyword"],
      properties: {
        keyword: {
          type: "string",
          description: "XHS search keyword.",
        },
        page: {
          type: "integer",
          minimum: 1,
          default: 1,
          description: "Search result page number, starting from 1.",
        },
        sort_type: {
          type: "string",
          enum: [
            "general",
            "time_descending",
            "popularity_descending",
            "comment_descending",
            "collect_descending",
          ],
          default: "general",
          description: "Sort order: general, latest, most liked, most commented, or most collected.",
        },
        note_type: {
          type: "string",
          enum: ["all", "image", "video"],
          default: "all",
          description: "Note type filter.",
        },
        publish_time_range: {
          type: "string",
          enum: ["all", "day", "week", "half_year"],
          default: "all",
          description: "Publish-time filter.",
        },
      },
    },
  },
  {
    name: "xhs-insights__xhs_get_note_detail_by_note_url",
    remoteName: "xhs_get_note_detail_by_note_url",
    label: "Get XHS Note Detail By URL",
    description: "Resolve an XHS note link, short link, share text, or note ID into structured note details.",
    parameters: {
      type: "object",
      additionalProperties: false,
      required: ["note_url"],
      properties: {
        note_url: {
          type: "string",
          description: "XHS note URL, xhslink.com short link, share text, or note ID.",
        },
      },
    },
  },
  {
    name: "xhs-insights__xhs_get_note_detail_by_note_id",
    remoteName: "xhs_get_note_detail_by_note_id",
    label: "Get XHS Note Detail By ID",
    description: "Fetch structured note details when the caller already has a note ID.",
    parameters: {
      type: "object",
      additionalProperties: false,
      required: ["note_id"],
      properties: {
        note_id: {
          type: "string",
          description: "XHS note ID.",
        },
      },
    },
  },
  {
    name: "xhs-insights__xhs_get_note_comments_by_note_id",
    remoteName: "xhs_get_note_comments_by_note_id",
    label: "Get XHS Note Comments By ID",
    description: "Fetch paginated first-level comments when the caller already has a note ID.",
    parameters: {
      type: "object",
      additionalProperties: false,
      required: ["note_id"],
      properties: {
        note_id: {
          type: "string",
          description: "XHS note ID.",
        },
        page_token: PAGE_TOKEN_PROPERTY,
      },
    },
  },
  {
    name: "xhs-insights__xhs_get_note_comments_by_note_url",
    remoteName: "xhs_get_note_comments_by_note_url",
    label: "Get XHS Note Comments By URL",
    description: "Fetch paginated first-level comments from an XHS note URL, short link, or share text.",
    parameters: {
      type: "object",
      additionalProperties: false,
      required: ["note_url"],
      properties: {
        note_url: {
          type: "string",
          description: "XHS note URL, xhslink.com short link, or share text.",
        },
        page_token: PAGE_TOKEN_PROPERTY,
      },
    },
  },
  {
    name: "xhs-insights__xhs_get_note_sub_comments_by_comment_id",
    remoteName: "xhs_get_note_sub_comments_by_comment_id",
    label: "Get XHS Comment Replies",
    description: "Fetch paginated replies under a first-level comment by note ID and comment ID.",
    parameters: {
      type: "object",
      additionalProperties: false,
      required: ["note_id", "comment_id"],
      properties: {
        note_id: {
          type: "string",
          description: "XHS note ID.",
        },
        comment_id: {
          type: "string",
          description: "First-level comment ID.",
        },
        page_token: PAGE_TOKEN_PROPERTY,
      },
    },
  },
  {
    name: "xhs-insights__xhs_get_user_info_by_user_id",
    remoteName: "xhs_get_user_info_by_user_id",
    label: "Get XHS User Info By ID",
    description: "Fetch creator profile data when the caller already has a user ID.",
    parameters: {
      type: "object",
      additionalProperties: false,
      required: ["user_id"],
      properties: {
        user_id: {
          type: "string",
          description: "XHS user ID.",
        },
      },
    },
  },
  {
    name: "xhs-insights__xhs_get_user_info_by_profile_url",
    remoteName: "xhs_get_user_info_by_profile_url",
    label: "Get XHS User Info By Profile URL",
    description: "Resolve an XHS profile link, short link, or share text into creator profile data.",
    parameters: {
      type: "object",
      additionalProperties: false,
      required: ["profile_url"],
      properties: {
        profile_url: {
          type: "string",
          description: "XHS profile URL, xhslink.com short link, or share text.",
        },
      },
    },
  },
  {
    name: "xhs-insights__xhs_get_user_posted_notes_by_user_id",
    remoteName: "xhs_get_user_posted_notes_by_user_id",
    label: "Get XHS Creator Notes By ID",
    description: "Fetch a paginated list of notes published by a creator when the caller already has a user ID.",
    parameters: {
      type: "object",
      additionalProperties: false,
      required: ["user_id"],
      properties: {
        user_id: {
          type: "string",
          description: "XHS user ID.",
        },
        page_token: PAGE_TOKEN_PROPERTY,
      },
    },
  },
  {
    name: "xhs-insights__xhs_get_user_posted_notes_by_profile_url",
    remoteName: "xhs_get_user_posted_notes_by_profile_url",
    label: "Get XHS Creator Notes By Profile URL",
    description: "Fetch a paginated list of notes published by a creator from a profile link, short link, or share text.",
    parameters: {
      type: "object",
      additionalProperties: false,
      required: ["profile_url"],
      properties: {
        profile_url: {
          type: "string",
          description: "XHS profile URL, xhslink.com short link, or share text.",
        },
        page_token: PAGE_TOKEN_PROPERTY,
      },
    },
  },
];

let mcpSdkModules;

export const id = PLUGIN_ID;

export function register(api = {}) {
  for (const definition of TOOL_DEFINITIONS) {
    api.registerTool(
      (context) => createForwardingTool({ api, context, definition }),
      { name: definition.name },
    );
  }
  api.logger?.debug?.(`[${PLUGIN_ID}] registered ${TOOL_DEFINITIONS.length} remote MCP forwarding tools.`);
}

function createForwardingTool({ api, context, definition }) {
  return {
    name: definition.name,
    label: definition.label,
    description: definition.description,
    parameters: definition.parameters,
    execute: async (_toolCallId, rawParams = {}) => {
      return callRemoteMcpTool({
        api,
        context,
        remoteName: definition.remoteName,
        publicName: definition.name,
        args: rawParams && typeof rawParams === "object" ? rawParams : {},
      });
    },
  };
}

async function callRemoteMcpTool({ api, remoteName, publicName, args }) {
  const config = resolvePluginConfig(api);
  const apiKey = process.env[config.apiKeyEnv];
  if (!apiKey) {
    throw new Error(`Missing API Key. Set ${config.apiKeyEnv} before using ${PLUGIN_NAME}.`);
  }

  const { Client, StreamableHTTPClientTransport } = await loadMcpSdkModules();
  const client = new Client(
    { name: PLUGIN_ID, version: PLUGIN_VERSION },
    { capabilities: {} },
  );
  const requestInit = {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  };
  const signal = createTimeoutSignal(config.connectionTimeoutMs);
  if (signal) {
    requestInit.signal = signal;
  }
  const transport = new StreamableHTTPClientTransport(new URL(config.endpointUrl), {
    requestInit,
  });

  try {
    await client.connect(transport, { timeout: config.connectionTimeoutMs });
    const result = await client.callTool({
      name: remoteName,
      arguments: args,
    }, undefined, { timeout: config.connectionTimeoutMs });
    if (result.isError) {
      throw new Error(extractMcpErrorMessage(result, remoteName));
    }
    return buildOpenClawToolResult(result, publicName);
  } finally {
    await client.close().catch(() => {});
  }
}

async function loadMcpSdkModules() {
  if (!mcpSdkModules) {
    const [{ Client }, { StreamableHTTPClientTransport }] = await Promise.all([
      import("@modelcontextprotocol/sdk/client/index.js"),
      import("@modelcontextprotocol/sdk/client/streamableHttp.js"),
    ]);
    mcpSdkModules = { Client, StreamableHTTPClientTransport };
  }
  return mcpSdkModules;
}

function resolvePluginConfig(api) {
  const liveConfig = api.runtime?.config?.current?.();
  const configured =
    liveConfig?.plugins?.entries?.[PLUGIN_ID]?.config ??
    api.pluginConfig ??
    {};
  return {
    apiKeyEnv: normalizeNonEmptyString(configured.apiKeyEnv, DEFAULT_API_KEY_ENV),
    endpointUrl: normalizeNonEmptyString(configured.endpointUrl, DEFAULT_ENDPOINT_URL),
    connectionTimeoutMs: normalizeTimeout(configured.connectionTimeoutMs),
  };
}

function normalizeNonEmptyString(value, fallback) {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function normalizeTimeout(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) {
    return DEFAULT_CONNECTION_TIMEOUT_MS;
  }
  return Math.min(120000, Math.max(1000, Math.trunc(numeric)));
}

function createTimeoutSignal(timeoutMs) {
  if (typeof AbortSignal !== "undefined" && typeof AbortSignal.timeout === "function") {
    return AbortSignal.timeout(timeoutMs);
  }
  return undefined;
}

function buildOpenClawToolResult(result, publicName) {
  const text = extractTextContent(result.content);
  return {
    content: [
      {
        type: "text",
        text: text || `${publicName} completed.`,
      },
    ],
    details: result.structuredContent ?? {
      content: Array.isArray(result.content) ? result.content : [],
    },
  };
}

function extractMcpErrorMessage(result, remoteName) {
  return (
    result.structuredContent?.message ||
    extractTextContent(result.content) ||
    `Remote MCP tool ${remoteName} returned an error.`
  );
}

function extractTextContent(content) {
  if (!Array.isArray(content)) {
    return "";
  }
  return content
    .filter((item) => item?.type === "text" && typeof item.text === "string")
    .map((item) => item.text)
    .join("\n")
    .trim();
}

export default {
  id: PLUGIN_ID,
  name: PLUGIN_NAME,
  description: "OpenClaw native plugin shim for the hosted read-only XHS Insights MCP service.",
  configSchema: CONFIG_SCHEMA,
  register,
};
