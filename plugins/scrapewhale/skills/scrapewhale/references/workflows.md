# Research workflows

Tool names are the MCP names; each has a REST equivalent in
[tools.md](tools.md). Credit figures assume no cache hits (cached results are
free). Confirm with the user before running anything over ~20 credits.

## Competitor teardown

Goal: how a set of competitors win traffic and customers.

1. For each competitor domain: `brand_dossier` (up to 6 credits each; default
   parts are logo, traffic, authority, Google ads, homepage). For a lighter
   check, use `domain_intel` with `traffic` (1 credit) only.
2. For the 2-3 strongest: `ads` with `meta` (give the Facebook page `slug` or
   `url`; find it on their homepage or via `facebook_page`), and the profiles
   they invest in (`instagram_profile`, `tiktok_profile`, `linkedin`
   `company`, `youtube` `channel`).
3. Optional depth: `domain_intel` `organic` for search footprint, `read_url`
   on their pricing or landing pages.

Report: one table (brand, monthly visits, top traffic source, top countries,
domain rating, active Meta ads, Google ads, main social channel and followers),
then positioning notes per brand and 3-5 opportunities for the user.

## Ad research

Goal: what a brand is advertising and how.

1. `ads` `meta` with the brand's Facebook `slug`, `url` or `page_id`
   (2 credits; `max_pages` 1-10 pages of 30 ads, default 3, same price). Rows include whether the ad is active, start date, format, CTA,
   and the ad text.
2. `ads` `google` with the `domain` (2 credits; `max_pages` 1-20 pages of 40)
   lists creative IDs with links.
   For the copy and format of a specific creative: `ads` `google_creative`
   with `advertiser_id` and `creative_id` (1 credit each; do this for a few,
   not all).

Report: count of active ads, the oldest still-running ads (long-running ads
usually perform), recurring angles and offers, formats and CTAs, and exact
quotes of the best examples with their start dates.

## Creator / influencer shortlist

Goal: candidates for a campaign in a niche.

1. Find candidates: `youtube` `search` with a niche query (`type` `channel`
   or `video`, `sort` `popularity`), or take handles the user provides.
2. Profile each: `youtube` `channel`, `instagram_profile`, `tiktok_profile`
   or `x_twitter` `profile` (1 credit each).
3. Cadence and reach: `youtube` `channel_videos` with `sort` latest to see
   recent uploads and their views.

Report: table of creator, platform, followers/subscribers, posting cadence,
typical views per post (views divided by followers as a rough engagement
signal), links, and a fit note. Flag accounts with large followings but weak
recent views.

## Local market scan

Goal: who leads a local category.

1. `google_maps` `search` with `q` like "coffee roasters in Austin, TX"
   (1 credit per page of results; `ll` as `@lat,lng,zoom` for a precise
   centre point). Results already include rating, review count, hours,
   website, phone, and whether the listing is claimed (`claimed: false` is a
   lead-gen signal).
2. For the top 3-5: `google_maps` `place` with the `cid` from the search
   results for the owner-written description and canonical Maps URL.
3. Optional: `domain_intel` `traffic` or `read_url` on the leaders' websites.

Report: ranked table (name, rating, review count, address, website), what the
leaders have in common, and gaps (areas or offerings with few strong
options).

## Demand check

Goal: is interest in a product or category growing, and where.

1. `google_trends` `interest` with `q` (up to 5 comma-separated terms to
   compare; `geo` for a country, `time` such as `today 12-m` or `today 5-y`).
2. `google_trends` `related` for rising and top related queries.
3. `google_trends` `geo` for the regions with the most interest.

Report: the trend direction with the peak and latest values, seasonality,
the rising related queries (content and keyword ideas), and the top regions.

## Content research

Goal: understand what is being said about a topic or by a competitor.

- Videos: `youtube` `transcript` (by `video_id` or `url`) and summarise
  claims, structure and calls to action; quote with timestamps.
- X: `x_twitter` `tweet` for a post and its thread, `replies` for the
  audience reaction, `tweets` for an account's recent posts.
- Web pages: `read_url` for articles, pricing pages and docs.
- Search landscape: `google_search` `web` for who ranks, `ai_overview` for
  what Google's AI answer says (2 credits).

Report: key points with quotes and links, recurring themes, and gaps the
user could cover.

## Store and catalog snapshot

- Shopify: `shopify_categories` with the store `domain` for its category mix
  (add `per_product` for every product).
- TikTok Shop: `tiktok_shop` `product`, `product_videos`, `seller`, `store`
  (catalog, 2 credits) and `category`.

Report: category share, price ranges and top sellers where available.
