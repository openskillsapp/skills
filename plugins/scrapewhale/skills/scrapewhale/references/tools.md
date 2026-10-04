# ScrapeWhale tool reference

Every MCP tool, its actions, and the matching REST endpoint. Parameters marked
`*` are required; `†` marks alternatives of which exactly one is required.
Use `action` for multi-action tools and `format` (`markdown` default, or
`json`). The REST endpoint column is for reference: the same lookups are
available as an HTTP API for developers (https://scrapewhale.dev/docs/api).

Full parameter descriptions and examples: https://scrapewhale.dev/llms.txt
(machine-readable: https://scrapewhale.dev/openapi.json).

## `read_url` — Read a web page as markdown

| Action | REST endpoint | Credits | Parameters |
| --- | --- | --- | --- |
| — | `GET /api/v1/markdown/url` | 1 | `url`* |

## `google_search` — Google search

| Action | REST endpoint | Credits | Parameters |
| --- | --- | --- | --- |
| `web` | `GET /api/v1/search` | 1 | `q`*, `gl`, `hl`, `num`, `page` |
| `ai_overview` | `GET /api/v1/search/ai-overview` | 2 | `q`*, `gl`, `hl` |

## `google_maps` — Google Maps

| Action | REST endpoint | Credits | Parameters |
| --- | --- | --- | --- |
| `search` | `GET /api/v1/maps` | 1 | `q`*, `ll`, `gl`, `hl`, `page` |
| `place` | `GET /api/v1/maps/place` | 1 | `cid`†, `fid`†, `gl`, `hl` |

## `google_trends` — Google Trends

| Action | REST endpoint | Credits | Parameters |
| --- | --- | --- | --- |
| `interest` | `GET /api/v1/trends/interest` | 1 | `q`*, `geo`, `time`, `cat`, `gprop` |
| `related` | `GET /api/v1/trends/related` | 1 | `q`*, `geo`, `time`, `cat`, `gprop` |
| `geo` | `GET /api/v1/trends/geo` | 1 | `q`*, `geo`, `resolution`, `time`, `cat`, `gprop` |
| `trending` | `GET /api/v1/trends/trending` | 1 | `geo` |

## `domain_intel` — Domain traffic, SEO, and facts

| Action | REST endpoint | Credits | Parameters |
| --- | --- | --- | --- |
| `traffic` | `GET /api/v1/traffic` | 1 | `domain`* |
| `authority` | `GET /api/v1/seo/authority` | 1 | `domain`* |
| `organic` | `GET /api/v1/seo/organic` | 1 | `domain`* |
| `backlinks` | `GET /api/v1/seo/backlinks` | 1 | `domain`* |
| `registration` | `GET /api/v1/domain/registration` | 1 | `domain`* |
| `agent_ready` | `GET /api/v1/agent-ready` | 1 | `domain`* |

## `brand_dossier` — Brand dossier

| Action | REST endpoint | Credits | Parameters |
| --- | --- | --- | --- |
| — | `GET /api/v1/brand` | ≤ 6 | `domain`*, `parts` |

## `brand_logo` — Brand logo

| Action | REST endpoint | Credits | Parameters |
| --- | --- | --- | --- |
| — | `GET /api/v1/brand/logo` | 1 | `domain`*, `size` |

## `ads` — Ad libraries

| Action | REST endpoint | Credits | Parameters |
| --- | --- | --- | --- |
| `meta` | `GET /api/v1/ads/meta` | 2 | `page_id`†, `slug`†, `url`†, `max_pages` |
| `google` | `GET /api/v1/ads/google` | 2 | `domain`*, `max_pages` |
| `google_creative` | `GET /api/v1/ads/google/creative` | 1 | `advertiser_id`*, `creative_id`*, `include_advertiser` |
| `google_advertiser` | `GET /api/v1/ads/google/advertiser` | 1 | `advertiser_id`* |

## `facebook_page` — Facebook page

| Action | REST endpoint | Credits | Parameters |
| --- | --- | --- | --- |
| — | `GET /api/v1/social/facebook/page` | 1 | `slug`†, `url`† |

## `instagram_profile` — Instagram profile

| Action | REST endpoint | Credits | Parameters |
| --- | --- | --- | --- |
| — | `GET /api/v1/social/instagram/profile` | 1 | `username`* |

## `tiktok_profile` — TikTok profile

| Action | REST endpoint | Credits | Parameters |
| --- | --- | --- | --- |
| — | `GET /api/v1/social/tiktok/profile` | 1 | `username`* |

## `linkedin` — LinkedIn

| Action | REST endpoint | Credits | Parameters |
| --- | --- | --- | --- |
| `company` | `GET /api/v1/social/linkedin/company` | 1 | `slug`†, `url`† |
| `person` | `GET /api/v1/social/linkedin/person` | 1 | `handle`†, `url`† |

## `youtube` — YouTube

| Action | REST endpoint | Credits | Parameters |
| --- | --- | --- | --- |
| `video` | `GET /api/v1/social/youtube/video` | 1 | `video_id`†, `url`† |
| `channel` | `GET /api/v1/social/youtube/channel` | 1 | `handle`†, `channel_id`†, `url`† |
| `transcript` | `GET /api/v1/social/youtube/transcript` | 1 | `video_id`†, `url`†, `lang` |
| `channel_videos` | `GET /api/v1/social/youtube/channel/videos` | 1 | `handle`†, `channel_id`†, `url`†, `sort`, `max_pages` |
| `search` | `GET /api/v1/social/youtube/search` | 1 | `q`*, `sort`, `type`, `upload_date`, `duration`, `max_pages` |

## `x_twitter` — X (Twitter)

| Action | REST endpoint | Credits | Parameters |
| --- | --- | --- | --- |
| `profile` | `GET /api/v1/social/x/profile` | 1 | `handle`†, `url`† |
| `tweets` | `GET /api/v1/social/x/tweets` | 1 | `handle`†, `url`†, `cursor`, `with_replies` |
| `tweet` | `GET /api/v1/social/x/tweet` | 1 | `id`†, `url`† |
| `replies` | `GET /api/v1/social/x/replies` | 1 | `id`†, `url`†, `cursor`, `ranking` |

## `tiktok_shop` — TikTok Shop

| Action | REST endpoint | Credits | Parameters |
| --- | --- | --- | --- |
| `product` | `GET /api/v1/tiktok/shop/product` | 1 | `product_id`* |
| `product_videos` | `GET /api/v1/tiktok/shop/product/videos` | 1 | `product_id`* |
| `seller` | `GET /api/v1/tiktok/shop/seller` | 1 | `seller_id`* |
| `store` | `GET /api/v1/tiktok/shop/store` | 2 | `seller_id`*, `max_pages` |
| `category` | `GET /api/v1/tiktok/shop/category` | 1 | `category_id`* |

## `shopify_categories` — Shopify catalogue

| Action | REST endpoint | Credits | Parameters |
| --- | --- | --- | --- |
| — | `GET /api/v1/shopify/categories` | 1 | `domain`*, `max_pages`, `per_product` |

## `chrome_web_store` — Chrome Web Store

| Action | REST endpoint | Credits | Parameters |
| --- | --- | --- | --- |
| `extension` | `GET /api/v1/chrome-store/extension` | 1 | `id`†, `url`† |
| `reviews` | `GET /api/v1/chrome-store/reviews` | 1 | `id`†, `url`†, `max_pages` |

## `get_result` — Fetch a past result

| Action | REST endpoint | Credits | Parameters |
| --- | --- | --- | --- |
| — | `GET /api/v1/conversions/{id}` | free | `id`* |

