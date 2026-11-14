# Data sources for ad research

## Contents
- ScrapeWhale calls, costs and fields
- Edge cases
- Without ScrapeWhale
- Other ad libraries

## ScrapeWhale calls, costs and fields

Tool names are the MCP names (they may carry a client prefix). Every tool
takes `format`: `markdown` (default) or `json`. Use `json` for analysis.

| Step | Call | Credits | Key parameters |
| --- | --- | --- | --- |
| Find the page | `read_url` on the brand homepage | 1 | `url` |
| Check the page | `facebook_page` | 1 | `slug` or `url` |
| Meta ads | `ads`, `action: meta` | 2 | one of `page_id`, `slug`, `url`; `max_pages` 1-10 (30 ads per page, same price) |
| Google ads list | `ads`, `action: google` | 2 | `domain`; `max_pages` 1-20 (40 per page) |
| One Google creative | `ads`, `action: google_creative` | 1 | `advertiser_id`, `creative_id`; `include_advertiser` |
| Google advertiser | `ads`, `action: google_advertiser` | 1 | `advertiser_id` |
| Landing page | `read_url` | 1 | `url` |
| Truncated result | `get_result` | free | `id` from the earlier result |

Budget examples (no cache hits):

| Job | Credits |
| --- | --- |
| Quick check, one brand on Meta | 2-4 |
| One brand, Meta + Google + 5 creatives + 2 landing pages | about 12 |
| Swipe file across 5 brands, Meta only | 10-20 |
| Weekly monitoring of 3 brands, Meta + Google | 12 per run |

Cached results are free for everyone for about 6 hours (ads) and show
`cached: true`. Failed calls are refunded. Ask before a run over 20 credits.

### `facebook_page` fields

`name`, `category`, `follows`, `likes`, `website_url`, `page_id`,
`is_running_ads`, plus contact fields. Use `website_url` and `name` to
confirm it's the right page, and `page_id` for the ads call.

### `ads` `meta` fields (JSON)

Top level: `page_id`, `total_count` (ads in the library for the page),
`fetched_count`, `ads[]`. Per ad (best effort; fields can be missing):

| Field | Meaning |
| --- | --- |
| `ad_archive_id` | Ad ID. Link: `https://www.facebook.com/ads/library/?id=<id>` |
| `is_active` | Running now |
| `start_date`, `end_date` | Unix seconds |
| `publisher_platform` | Facebook, Instagram, Messenger, Audience Network |
| `snapshot.title` | Headline |
| `snapshot.body.text` | Primary text (may be a plain string in `body`) |
| `snapshot.caption` | Display domain under the creative |
| `snapshot.link_url` | Landing URL |
| `snapshot.cta_text` | Button, e.g. "Shop now" |
| `snapshot.display_format` | IMAGE, VIDEO, CAROUSEL, DCO (dynamic) and others |
| `page_name` | Advertiser page name |

Days running = (today or `end_date`) - `start_date`.

### `ads` `google` fields

`domain`, `count`, `items[]`. Each item is a raw record: key `"1"` is the
advertiser ID (`AR…`), key `"2"` the creative ID (`CR…`). There are no
dates or copy in the list. Link:
`https://adstransparency.google.com/advertiser/<AR id>/creative/<CR id>`.

### `ads` `google_creative` fields

`format` (text, image, video), `first_shown`, `last_shown`, `regions[]`
(country, last shown), `landing_url`, `previews[]` (type, url, size),
`advertiser` (name, country, legal name, verified) when
`include_advertiser` is set.

Choosing the sample: the list order is not performance. Take creatives
spread across the list, then keep the ones whose `last_shown` is recent and
whose `first_shown` is oldest: those are the long-running Google ads.
Previews of type `image` can be viewed; others are links. If no text is
visible, report the format, dates, regions and landing page only.

## Edge cases

- **Several pages per brand.** Regional or product pages each have their own
  ads. List the pages you found and ask, or research the main one and say so.
- **Wrong page.** Fan pages and resellers share names. If `website_url`
  doesn't match the brand domain, stop and check.
- **No ads.** `total_count: 0` or `is_running_ads: false` is a finding, not
  an error. Say so, and check Google before concluding they don't advertise.
- **Collated ads.** Meta groups near-identical ads; one row can stand for
  several versions. Treat rows as distinct creatives, not exact ad counts.
- **Dynamic (DCO) ads.** The library shows one combination; the copy you see
  is one of several the platform rotates.
- **Errors.** `provider_error`: retry once after a short pause, then carry
  on with the other platform. `empty_result`: treat as no data.

## Without ScrapeWhale

Both libraries render in JavaScript, so use a browser tool. Plain HTTP
fetches return an empty shell.

**Meta Ad Library**

- Search by name: `https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=ALL&q=<brand>&search_type=keyword_unordered`
- A page's ads: `https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=ALL&view_all_page_id=<page_id>`
- Change `active_status` to `active` for current ads only; set `country` to a
  two-letter code to narrow. Each ad card shows "Started running on <date>",
  the platforms and the copy; "See ad details" opens the variants.
- Scroll to load more; record how many you saw.

**Google Ads Transparency Center**

- `https://adstransparency.google.com/?region=anywhere&domain=<domain>`
- Open a creative for format, first and last shown and regions. Set
  `region` to a country code to narrow.

## Other ad libraries

ScrapeWhale doesn't cover these; open them in a browser when the user needs
them.

- **LinkedIn Ad Library**: `https://www.linkedin.com/ad-library/` (search by
  company). Shows copy and run dates for B2B advertisers.
- **TikTok**: the Commercial Content Library at `https://library.tiktok.com/`
  (ads shown in the EU) and Top Ads in TikTok Creative Center.
