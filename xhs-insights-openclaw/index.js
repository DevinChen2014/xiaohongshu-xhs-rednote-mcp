const PLUGIN_ID = "xhs-insights-openclaw-plugin";
const PLUGIN_NAME = "社媒数据助手 小红书 MCP | Xiaohongshu XHS RedNote MCP";
const PLUGIN_VERSION = "0.1.23";
const DEFAULT_ENDPOINT_URL = "https://mcp.socialdatax.com/xhs/mcp";
const DEFAULT_API_KEY_ENV = "SOCIALDATAX_API_KEY";
const LEGACY_API_KEY_ENV = "SOCIAL_MEDIA_MCP_API_KEY";
const API_KEY_ENV_NAMES = [DEFAULT_API_KEY_ENV, LEGACY_API_KEY_ENV];
const DEFAULT_CONNECTION_TIMEOUT_MS = 30000;

const CONFIG_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    connectionTimeoutMs: {
      type: "integer",
      default: DEFAULT_CONNECTION_TIMEOUT_MS,
      minimum: 1000,
      maximum: 120000,
      description: "Timeout in milliseconds for remote MCP HTTP requests.",
    },
  },
};

const NOTE_SEARCH_PAGE_TOKEN_PROPERTY = {
  type: "string",
  default: "",
  description: "Opaque note search pagination token. Leave empty for the first page; pass the complete returned next_page_token back unchanged. Use only with the same note search keyword, sort_type, note_type, publish_time_range, and caller. Do not modify, truncate, redact, mask, omit, normalize, rebuild, generate, or replace the middle with ellipses.",
};

const PRODUCT_SEARCH_PAGE_TOKEN_PROPERTY = {
  type: "string",
  default: "",
  description: "Opaque product search pagination token. Leave empty for the first page; pass the complete returned next_page_token back unchanged. Use only with the same product keyword and caller. Do not modify, truncate, redact, mask, omit, normalize, rebuild, generate, or replace the middle with ellipses.",
};

const PRODUCT_REVIEW_PAGE_TOKEN_PROPERTY = {
  type: "string",
  default: "",
  description: "Opaque product review pagination token. Leave empty for the first page; pass the complete returned next_page_token back unchanged. Use only with the same product SKU, sort_type, image filter, and caller. Do not modify, truncate, redact, mask, omit, normalize, rebuild, generate, or replace the middle with ellipses.",
};

const PRODUCT_REVIEW_REPLY_PAGE_TOKEN_PROPERTY = {
  type: "string",
  default: "",
  description: "Opaque product review replies pagination token. Leave empty for the first page; pass the complete returned next_page_token back unchanged. Use only with the same first-level review_id and caller.",
};

const COMMENT_PAGE_TOKEN_PROPERTY = {
  type: "string",
  default: "",
  description: "Opaque first-level comment pagination token. Leave empty for the first page; pass the complete returned next_page_token back unchanged. Use only with the same note and comment sort_type. Do not modify, truncate, redact, mask, omit, normalize, rebuild, generate, or replace the middle with ellipses.",
};

const SUB_COMMENT_PAGE_TOKEN_PROPERTY = {
  type: "string",
  default: "",
  description: "Opaque comment reply pagination token. Leave empty for the first page; pass the complete returned next_page_token back unchanged. Use only with the same note and first-level comment. Do not modify, truncate, redact, mask, omit, normalize, rebuild, generate, or replace the middle with ellipses.",
};

const USER_POSTED_PAGE_TOKEN_PROPERTY = {
  type: "string",
  default: "",
  description: "Opaque creator note list pagination token. Leave empty for the first page; pass the complete returned next_page_token back unchanged. Use only with the same creator. Do not modify, truncate, redact, mask, omit, normalize, rebuild, generate, or replace the middle with ellipses.",
};

const TOPIC_NOTES_PAGE_TOKEN_PROPERTY = {
  type: "string",
  default: "",
  description: "Opaque tag page note list pagination token. Leave empty for the first page; pass the complete returned next_page_token back unchanged. Use only with the same tag page and sort_type. Do not modify, truncate, redact, mask, omit, normalize, rebuild, generate, or replace the middle with ellipses.",
};

const NOTE_ID_PROPERTY_DESCRIPTION = "XHS note ID. Use a complete note_id supplied by the user, or copy one from note search, note detail, comments, tag page note, or creator note results. Do not truncate, shorten, redact, reformat, rebuild, or pass only a prefix.";
const USER_ID_PROPERTY_DESCRIPTION = "XHS user_id. Use a complete user_id supplied by the user, or copy user_id or author.user_id from note search, product review, note detail, tag page note, creator profile, or creator note results. If only a profile link is available, use the profile URL tool. Do not pass an account number, display name, or profile name.";
const PROFILE_URL_PROPERTY_DESCRIPTION = "XHS profile link, supported XHS short link, or share text containing one. Do not pass a note link.";

const TOOL_DEFINITIONS = [
  {
    name: "xhs-insights__xhs_get_search_hot_list",
    remoteName: "xhs_get_search_hot_list",
    label: "Get XHS Search Hot List",
    description: "Fetch the Xiaohongshu / XHS / RedNote search hot list with title and heat value.",
    parameters: {
      type: "object",
      additionalProperties: false,
      properties: {},
    },
  },
  {
    name: "xhs-insights__xhs_search_suggestions",
    remoteName: "xhs_search_suggestions",
    label: "Get XHS Search Suggestions",
    description: "Fetch Xiaohongshu / XHS / RedNote search suggestions for a keyword or partial phrase.",
    parameters: {
      type: "object",
      additionalProperties: false,
      required: ["keyword"],
      properties: {
        keyword: {
          type: "string",
          description: "Search term or partial phrase. Do not pass a note link, profile link, note_id, user_id, or pagination token.",
        },
      },
    },
  },
  {
    name: "xhs-insights__xhs_search_notes",
    remoteName: "xhs_search_notes",
    label: "Search XHS Notes",
    description: "Search XHS / RedNote notes by keyword with optional sort, note type, and publish-time filters. When using a returned `note_url`, such as in final answers or display, preserve the full URL exactly, including `xsec_token`; do not rebuild links from `note_id`.",
    parameters: {
      type: "object",
      additionalProperties: false,
      required: ["keyword"],
      properties: {
        keyword: {
          type: "string",
          description: "Search term or phrase, such as a brand, topic, person, product, or content need. Do not pass a note link, profile link, note_id, user_id, or page_token.",
        },
        page_token: NOTE_SEARCH_PAGE_TOKEN_PROPERTY,
        sort_type: {
          type: "string",
          enum: [
            "general",
            "time_descending",
            "like_count_descending",
            "comment_count_descending",
            "collect_count_descending",
          ],
          default: "general",
          description: "Sort order: general (default), time_descending (latest published first), like_count_descending (most liked first), comment_count_descending (most commented first), or collect_count_descending (most collected first).",
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
    name: "xhs-insights__xhs_search_products",
    remoteName: "xhs_search_products",
    label: "Search XHS Products",
    description: "Search Xiaohongshu products by product name, brand, category, or product-related query, with page_token continuation. Use this tool for search terms; if a complete sku_id is already available, including one supplied by the user, use the corresponding product detail or product review tool instead. For a product link or share text, use xhs-insights__xhs_get_product_detail_by_url. Do not use product links, sku_id, spu_id, or page_token as the keyword. To continue product search pagination, pass the full returned next_page_token back unchanged as page_token; do not truncate, summarize, mask, or replace the middle with ellipses.",
    parameters: {
      type: "object",
      additionalProperties: false,
      required: ["keyword"],
      properties: {
        keyword: {
          type: "string",
          description: "Search term such as a product name, brand, category, or product-related query. Do not pass a product link, sku_id, spu_id, or page_token.",
        },
        page_token: PRODUCT_SEARCH_PAGE_TOKEN_PROPERTY,
      },
    },
  },
  {
    name: "xhs-insights__xhs_get_product_detail_by_sku_id",
    remoteName: "xhs_get_product_detail_by_sku_id",
    label: "Get XHS Product Detail",
    description: "Fetch Xiaohongshu product details by sku_id. Use a complete sku_id supplied by the user, or copy one from xhs_search_products results. For a product link, short link, or share text, use xhs-insights__xhs_get_product_detail_by_url. This tool does not accept spu_id, product links, or search keywords.",
    parameters: {
      type: "object",
      additionalProperties: false,
      required: ["sku_id"],
      properties: {
        sku_id: {
          type: "string",
          description: "Complete XHS product SKU ID supplied by the user or copied from xhs_search_products results. This tool does not accept spu_id, product links, or search keywords.",
        },
      },
    },
  },
  {
    name: "xhs-insights__xhs_get_product_detail_by_url",
    remoteName: "xhs_get_product_detail_by_url",
    label: "Get XHS Product Detail by URL",
    description: "Fetch Xiaohongshu product details from a product link, short link, or share text without searching first. For a complete sku_id, use xhs-insights__xhs_get_product_detail_by_sku_id. The returned sku_id can be used for product reviews.",
    parameters: {
      type: "object",
      additionalProperties: false,
      required: ["url"],
      properties: {
        url: {
          type: "string",
          description: "XHS product-detail URL, short link, or complete share text containing a product link. Do not pass a note link, creator profile link, bare share code, or search keyword.",
        },
      },
    },
  },
  {
    name: "xhs-insights__xhs_get_product_reviews",
    remoteName: "xhs_get_product_reviews",
    label: "Get XHS Product Reviews",
    description: "Fetch Xiaohongshu product reviews by sku_id. Use a complete sku_id supplied by the user, or copy one from xhs_search_products results. Accepts sort_type: general (comprehensive sort, the default) or time_descending, has_image, and page_token continuation. This tool does not accept spu_id, product links, or search keywords.",
    parameters: {
      type: "object",
      additionalProperties: false,
      required: ["sku_id"],
      properties: {
        sku_id: {
          type: "string",
          description: "Complete XHS product SKU ID supplied by the user or copied from xhs_search_products results. This tool does not accept spu_id, product links, or search keywords.",
        },
        page_token: PRODUCT_REVIEW_PAGE_TOKEN_PROPERTY,
        sort_type: {
          type: "string",
          enum: ["general", "time_descending"],
          default: "general",
          description: "Product review sort order: general (comprehensive sort, the default) or time_descending (latest first).",
        },
        has_image: {
          type: "boolean",
          default: false,
          description: "Whether to return only product reviews with images.",
        },
      },
    },
  },
  {
    name: "xhs-insights__xhs_get_product_review_replies",
    remoteName: "xhs_get_product_review_replies",
    label: "Get XHS Product Review Replies",
    description: "Fetch Xiaohongshu product review replies by first-level review_id. Use a user-provided review_id, or obtain one from xhs_get_product_reviews results. Do not construct or pass root_review_id.",
    parameters: {
      type: "object",
      additionalProperties: false,
      required: ["review_id"],
      properties: {
        review_id: {
          type: "string",
          description: "User-provided first-level product review ID, or copy it unchanged from xhs_get_product_reviews results. Do not pass root_review_id.",
        },
        page_token: PRODUCT_REVIEW_REPLY_PAGE_TOKEN_PROPERTY,
      },
    },
  },
  {
    name: "xhs-insights__xhs_get_note_detail_by_note_url",
    remoteName: "xhs_get_note_detail_by_note_url",
    label: "Get XHS Note Detail By URL",
    description: "Resolve an XHS note link, short link, or share text into structured note details. When using a returned `note_url`, such as in final answers or display, preserve the full URL exactly, including `xsec_token`; do not rebuild links from `note_id`. If `note_url` is null, do not synthesize a public link from `note_id`.",
    parameters: {
      type: "object",
      additionalProperties: false,
      required: ["note_url"],
      properties: {
        note_url: {
          type: "string",
          description: "XHS note URL, supported XHS short link, or share text.",
        },
      },
    },
  },
  {
    name: "xhs-insights__xhs_get_note_detail_by_note_id",
    remoteName: "xhs_get_note_detail_by_note_id",
    label: "Get XHS Note Detail By ID",
    description: "Fetch structured note details when the caller already has a note ID. If a returned `note_url` is available, preserve the full URL exactly, including `xsec_token`; use the returned URL as-is, such as in final answers or display. Do not rebuild links from `note_id`. If `note_url` is null, do not synthesize a public link from `note_id`.",
    parameters: {
      type: "object",
      additionalProperties: false,
      required: ["note_id"],
      properties: {
        note_id: {
          type: "string",
          description: NOTE_ID_PROPERTY_DESCRIPTION,
        },
      },
    },
  },
  {
    name: "xhs-insights__xhs_get_note_comments_by_note_id",
    remoteName: "xhs_get_note_comments_by_note_id",
    label: "Get XHS Note Comments By ID",
    description: "Fetch paginated first-level comments when the caller already has a note ID; accepts optional comment sort_type.",
    parameters: {
      type: "object",
      additionalProperties: false,
      required: ["note_id"],
      properties: {
        note_id: {
          type: "string",
          description: NOTE_ID_PROPERTY_DESCRIPTION,
        },
        page_token: COMMENT_PAGE_TOKEN_PROPERTY,
        sort_type: {
          type: "string",
          enum: ["default", "time_descending", "like_count_descending"],
          default: "default",
          description: "Comment sort order: default (platform default), time_descending (newest first), or like_count_descending (most liked first).",
        },
      },
    },
  },
  {
    name: "xhs-insights__xhs_get_note_comments_by_note_url",
    remoteName: "xhs_get_note_comments_by_note_url",
    label: "Get XHS Note Comments By URL",
    description: "Fetch paginated first-level comments from an XHS note URL, short link, or share text; accepts optional comment sort_type.",
    parameters: {
      type: "object",
      additionalProperties: false,
      required: ["note_url"],
      properties: {
        note_url: {
          type: "string",
          description: "XHS note URL, supported XHS short link, or share text.",
        },
        page_token: COMMENT_PAGE_TOKEN_PROPERTY,
        sort_type: {
          type: "string",
          enum: ["default", "time_descending", "like_count_descending"],
          default: "default",
          description: "Comment sort order: default (platform default), time_descending (newest first), or like_count_descending (most liked first).",
        },
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
          description: NOTE_ID_PROPERTY_DESCRIPTION,
        },
        comment_id: {
          type: "string",
          description: "First-level comment ID.",
        },
        page_token: SUB_COMMENT_PAGE_TOKEN_PROPERTY,
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
          description: USER_ID_PROPERTY_DESCRIPTION,
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
          description: PROFILE_URL_PROPERTY_DESCRIPTION,
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
          description: USER_ID_PROPERTY_DESCRIPTION,
        },
        page_token: USER_POSTED_PAGE_TOKEN_PROPERTY,
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
          description: PROFILE_URL_PROPERTY_DESCRIPTION,
        },
        page_token: USER_POSTED_PAGE_TOKEN_PROPERTY,
      },
    },
  },
  {
    name: "xhs-insights__xhs_get_topic_notes_by_topic_url",
    remoteName: "xhs_get_topic_notes_by_topic_url",
    label: "Get XHS Tag Page Notes By URL",
    description: "Fetch a paginated XHS tag page note list from a topic URL, short link, or share text; accepts sort_type.",
    parameters: {
      type: "object",
      additionalProperties: false,
      required: ["topic_url"],
      properties: {
        topic_url: {
          type: "string",
          description: "XHS topic URL, supported XHS short link, or share text.",
        },
        page_token: TOPIC_NOTES_PAGE_TOKEN_PROPERTY,
        sort_type: {
          type: "string",
          enum: ["hot", "time_descending"],
          default: "hot",
          description: "Tag page note sort order: hot (default) or time_descending (latest first).",
        },
      },
    },
  },
  {
    name: "xhs-insights__xhs_get_topic_notes_by_page_id",
    remoteName: "xhs_get_topic_notes_by_page_id",
    label: "Get XHS Tag Page Notes By Page ID",
    description: "Fetch a paginated XHS tag page note list when the caller already has the tag page page_id; accepts sort_type.",
    parameters: {
      type: "object",
      additionalProperties: false,
      required: ["page_id"],
      properties: {
        page_id: {
          type: "string",
          description: "XHS tag page page_id.",
        },
        page_token: TOPIC_NOTES_PAGE_TOKEN_PROPERTY,
        sort_type: {
          type: "string",
          enum: ["hot", "time_descending"],
          default: "hot",
          description: "Tag page note sort order: hot (default) or time_descending (latest first).",
        },
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
  const apiKey = readFirstEnv(API_KEY_ENV_NAMES);
  if (!apiKey) {
    throw new Error(`Missing API Key. Set ${DEFAULT_API_KEY_ENV} before using ${PLUGIN_NAME}.`);
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
  const transport = new StreamableHTTPClientTransport(new URL(DEFAULT_ENDPOINT_URL), {
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

function readFirstEnv(names) {
  for (const name of names) {
    const value = process.env[name]?.trim();
    if (value) {
      return value;
    }
  }
  return undefined;
}

function resolvePluginConfig(api) {
  const liveConfig = api.runtime?.config?.current?.();
  const configured =
    liveConfig?.plugins?.entries?.[PLUGIN_ID]?.config ??
    api.pluginConfig ??
    {};
  return {
    connectionTimeoutMs: normalizeTimeout(configured.connectionTimeoutMs),
  };
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
  description: "Social media research and marketing research for Xiaohongshu, XHS, RedNote, and 小红书: get search suggestions, read the search hot list, search notes and products, fetch product details, product reviews, and product review replies, analyze comments, read note details, replies, creator profiles, and creator posts through a hosted MCP service.",
  configSchema: CONFIG_SCHEMA,
  register,
};
