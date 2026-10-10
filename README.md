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

## SEO / GEO 字段预留

> 产品页 / 落地页统一生成时填入；本阶段只预留字段。

| 字段 | 类型 | 用途 |
|---|---|---|
| `seo_title` | string | `<title>` / OG title |
| `seo_description` | string | meta description |
| `seo_keywords` | string[] | 可选关键词 |
| `canonical_url` | url | 规范链接 |
| `og_image` | url | 分享图 |
| `robots` | string | 如 `index,follow` |
| `json_ld_type` | string | SoftwareApplication / WebPage / FAQPage |
| `geo_region` | string | 地域业务时使用 |
| `geo_placename` | string | 城市/地标 |
| `geo_position` | string | 可选 lat,long |
| `hreflang` | map | zh-CN / en |
| `site_name` | string | 白标品牌名 |


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

