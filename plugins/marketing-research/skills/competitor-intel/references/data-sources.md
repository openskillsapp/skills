# Data sources for competitor intel

## Contents
- Calls and costs
- What each call returns
- Gaps and caveats

## Calls and costs

Tool names are the MCP names (they may carry a client prefix). Use
`format: json` when you compute comparisons; markdown is fine for reading.

| Data | Call | Credits |
| --- | --- | --- |
| Logo, traffic, authority, Google ads, homepage | `brand_dossier` `domain` (default parts) | up to 6 |
| + organic, backlinks, registration, agent readiness | `brand_dossier` `parts` (opt-in, 1 each) | +1 each |
| Traffic only | `domain_intel` `action: traffic` | 1 |
| Organic totals | `domain_intel` `action: organic` | 1 |
| Domain authority | `domain_intel` `action: authority` | 1 |
| Backlink counts | `domain_intel` `action: backlinks` | 1 |
| Domain age and registrar | `domain_intel` `action: registration` | 1 |
| Meta ads | `ads` `action: meta` (`slug`, `url` or `page_id`) | 2 |
| Facebook page | `facebook_page` | 1 |
| Instagram / TikTok | `instagram_profile` / `tiktok_profile` `username` | 1 |
| YouTube channel | `youtube` `action: channel` | 1 |
| X profile | `x_twitter` `action: profile` | 1 |
| LinkedIn company | `linkedin` `action: company` | 1 |
| A page | `read_url` | 1 |
| Search results | `google_search` `action: web` | 1 |
| Extension reviews | `chrome_web_store` `action: reviews` | 1 |

Per competitor: quick scan about 6 credits (dossier, plus 2 for Meta ads if
needed); deep profile 12 to 15. Cached parts are free (most for 6 to 24
hours) and failed calls are refunded.

## What each call returns

- **Traffic**: `SnapshotDate`, monthly visits, bounce rate, pages per visit,
  visit duration, `EstimatedMonthlyVisits` by month (the trend),
  `TrafficSources` shares (direct, search, referral, social, paid, mail),
  `TopCountryShares`, global, country and category rank, `TopKeywords`
  (name, volume, CPC) and AI chatbot traffic where available.
- **Authority**: domain rating (0-100) and rank. Keep the licence and
  attribution text the result includes.
- **Organic**: totals only: organic keyword count, estimated monthly
  organic visits, traffic cost (what that traffic would cost in ads) and
  organic rank. US database. No keyword list.
- **Backlinks**: counts for the root domain, hostname and exact URL. No list
  of linking sites.
- **Registration**: creation date (company age proxy), registrar, expiry.
- **Google ads (dossier part)**: creative count and IDs; details per
  creative via `ads` `google_creative`.
- **Social profiles**: Instagram followers, posts, bio link, verified and
  business flags; TikTok followers, likes (`heartCount`), videos; YouTube
  subscribers, views, videos, joined date; X followers, posts, joined;
  LinkedIn company followers, size, industry, headquarters, founded.
- **Homepage markdown (dossier part)**: the headline, claims, proof and
  links to social profiles and the pricing page.

## Gaps and caveats

- Traffic for small sites can be missing or rounded; mark it "below
  measurement" rather than zero.
- All traffic, organic and keyword figures are estimates from one panel;
  they are comparable with each other, not with the user's analytics.
- No similar-sites list: find competitors through search results.
- Prices on pricing pages may be behind a toggle (monthly or annual) or
  rendered by script; if `read_url` misses them, say so and check in a
  browser.
- LinkedIn and X data are public profile counts only.
