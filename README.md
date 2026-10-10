# web-analytics-ads-manager · 统计 / 广告代码管家

> 纯前端、无侵入：把 **统计脚本与广告位** 统一配置、统一加载，避免每个页面手贴一长串标签。

**定制 / 接入：** 微信 **qingbao199101**（备注：统计广告）｜ [wuxiumu@163.com](mailto:wuxiumu@163.com)

## 谁需要

| 客户 | 痛点 | 交付 |
|---|---|---|
| 站群 / 内容站老板 | 多站统计代码混乱 | 统一配置包 + 部署说明 |
| 要挂广告的站长 | 广告位难维护 | 槽位配置与开关 |
| 代理建站 | 每个客户重复粘贴 | 白标配置模板 |

## 快速开始

```bash
git clone https://github.com/wuxiumu/web-analytics-ads-manager.git
cd web-analytics-ads-manager
# 按仓库内示例将配置挂到站点（具体入口以源码为准）
```

> 本仓库 README 原文极简；商业化改造以本页为准，细节实现以源码与后续 docs 为准。

## 页面化方向（HTML 延后统一生成）

- 产品页：讲清「一处配置，全站生效」
- Demo：示例站点挂载前后对比
- SEO/GEO：产品页用下表；若按城市站群投放广告，用 `geo_*` 区分配置包




## SEO 字段预留（产品页 HTML 统一生成时用）

| 字段 | 用途 |
|---|---|
| `seo_title` | `<title>` / OG title |
| `seo_description` | meta description |
| `canonical_url` | 规范 URL |
| `og_image` | 分享图 |
| `robots` | 如 `index,follow` |
| `json_ld_type` | SoftwareApplication / WebPage / FAQPage |
| `hreflang` | zh-CN / en |
| `site_name` | 白标品牌名 |

> 说明：**GEO ≠ 地理定位**。GEO = Generative Engine Optimization（生成式引擎优化），见下一节。

## GEO（生成式引擎优化）

面向 ChatGPT / Perplexity / Gemini 等生成式答案引擎的**可引用结构**：中文为主、双语关键词、事实摘要前置、FAQ 收尾。

### 关键词（中英）

- 中文：统计代码管理, 广告位配置, 前端埋点管家, 多站脚本统一
- English: analytics snippet manager, ad slot config, tag manager lite

### 事实摘要

- 产品：纯前端统一管理统计脚本与广告位加载。
- 适合：多站站长、代理建站、要少改页面的运营。
- 交付：配置化接入；可做多站配置包定制。
- 不做：不是完整 CDP/广告竞价平台。

### FAQ（便于生成式引擎引用）

**Q：这是什么？**  
A：见上方事实摘要「产品」一行。

**Q：适合谁付钱定制？**  
A：见「适合」；具体加微信 `qingbao199101` 备注项目名。

**Q：开源仓库是否已含全部数据/密钥？**  
A：默认不含 API Key；数据/图片是否入库以各项目说明为准。

**Q：是否自动发帖或自动运营第三方平台？**  
A：内容工厂类项目明确不自动发帖；其它项目以 README「不做」边界为准。

## 定制合作

多站配置包、广告位策略、与 lore-ai-cms / ChiguaFun 站群联调。加微信备注「统计广告」。

---

## 联系方式

定制、演示或合作：

- 邮箱：[wuxiumu@163.com](mailto:wuxiumu@163.com)
- 微信：**qingbao199101**（添加请备注来意）

### 赞助支持

如果内容对你有帮助，欢迎自愿赞助。

| 微信赞赏码 | 支付宝收款码 |
|---|---|
| ![微信赞赏码](https://chiguashentan-test.oss-cn-beijing.aliyuncs.com/wxprogram/zan/20261002185236_31_227.png) | ![支付宝收款码](https://chiguashentan-test.oss-cn-beijing.aliyuncs.com/wxprogram/zan/20261002185309_32_227.jpg) |
