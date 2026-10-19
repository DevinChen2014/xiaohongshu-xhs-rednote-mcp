# SocialDataX 小红书 Xiaohongshu XHS RedNote MCP · LobeHub 接入

通过 LobeHub 发现本服务，请从 [SocialDataX 官网获取 API Key](https://socialdatax.com/ai?from=lobehub)。

## 导入配置

在 LobeHub 的 Settings → Skill Settings → Custom Skills 中选择 Quick Import JSON Configuration，
导入 [lobehub.json](lobehub.json)，并在客户端安全设置中将 `<SOCIALDATAX_API_KEY>` 替换为自己的 API Key。
不要将填写了真实密钥的配置提交到 GitHub 或发送给他人。

```json
{
  "mcpServers": {
    "socialdatax-xhs": {
      "type": "http",
      "url": "https://mcp.socialdatax.com/xhs/mcp",
      "headers": {
        "Authorization": "Bearer <SOCIALDATAX_API_KEY>",
        "x-socialdatax-client": "lobehub",
        "x-socialdatax-source-platform": "lobehub"
      }
    }
  }
}
```

该配置使用托管的 Streamable HTTP 服务。LobeHub 市场自动生成的示例可能缺少认证请求头；
业务调用需要 `Authorization`，仅能发现工具不代表业务调用已经通过认证。

## 来源与验证

- 官网链接的 `from=lobehub` 用于注册来源记录，不代表全部网页浏览量。
- 两个 `x-socialdatax-*` 请求头标记客户端与发现渠道，用于调用来源统计；它们不参与认证或计费。
- 此配置专供 LobeHub 使用。其它客户端请使用仓库通用配置，不要照搬 LobeHub 来源标识。
- 安装后可调用 `socialdatax_get_points_balance` 检查连接与认证。后台调用记录的来源平台应为 `lobehub`。
- 删除来源标识、使用其它配置或已有 API Key 直接连接时，无法保证识别发现渠道。
