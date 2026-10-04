---
name: scrapewhale
description: Research brands and competitors with live web data from ScrapeWhale - estimated website traffic and sources, the ads a company runs on Meta and Google, Instagram/TikTok/LinkedIn/X/YouTube profiles and posts, Google search, Maps and Trends, TikTok Shop and Shopify catalogs, and any web page as clean markdown. Use for competitor teardowns, brand dossiers, ad research, creator and influencer scouting, local market scans, SEO and traffic comparisons, and reading YouTube transcripts or X threads. Works through the ScrapeWhale MCP server.
license: MIT
compatibility: Requires network access and the ScrapeWhale MCP server (https://scrapewhale.dev/mcp), signed in with a ScrapeWhale account. Calls spend ScrapeWhale credits.
metadata:
  author: ScrapeWhale
  homepage: https://scrapewhale.dev
  version: "1.0.0"
---

# ScrapeWhale research

ScrapeWhale returns public web data about brands as clean markdown (or JSON):
traffic estimates, ads, social profiles, search, maps, trends, store catalogs,
and any web page. This skill is how to pick the right lookup, combine them into
research, and keep credit spend sensible.

## 1. Check access

Look for the ScrapeWhale MCP tools: `brand_dossier`, `domain_intel`, `ads`,
`youtube`, ... (possibly prefixed, e.g. `mcp__scrapewhale__ads` or
`mcp__plugin_scrapewhale_scrapewhale__ads`). Use them directly.

- If a call returns an authentication error, ask the user to sign in (in
  Claude Code: run `/mcp`, pick scrapewhale, Authenticate).
- If the tools are missing, tell the user how to connect, then stop:
  - Claude Code: install this plugin, or run
    `claude mcp add --transport http scrapewhale https://scrapewhale.dev/mcp`,
    then `/mcp` to sign in.
  - Claude.ai / ChatGPT: add `https://scrapewhale.dev/mcp` as a custom
    connector and sign in.
  - Other agents: add `https://scrapewhale.dev/mcp` as a remote (Streamable
    HTTP) MCP server in the agent's MCP settings; setup for Codex, Cursor and
    others is at https://scrapewhale.dev/docs/api.

## 2. Pick the lookup

| The user wants... | MCP tool (action) |
| --- | --- |
| A quick overview of a company | `brand_dossier` |
| How much traffic a site gets, from where | `domain_intel` (`traffic`) |
| Domain authority / organic search / backlinks | `domain_intel` (`authority`, `organic`, `backlinks`) |
| Ads a brand runs on Facebook / Instagram | `ads` (`meta`, with `slug`, `url` or `page_id`) |
| Ads a brand runs on Google | `ads` (`google`, with `domain`) |
| A social profile | `instagram_profile`, `tiktok_profile`, `facebook_page`, `linkedin` (`company`, `person`), `x_twitter` (`profile`), `youtube` (`channel`) |
| Posts, threads, replies | `x_twitter` (`tweets`, `tweet`, `replies`), `youtube` (`channel_videos`, `search`) |
| What a video says | `youtube` (`transcript`) |
| Google results / AI Overview | `google_search` (`web`, `ai_overview`) |
| Local businesses | `google_maps` (`search`, then `place`) |
| Demand and seasonality | `google_trends` (`interest`, `related`, `geo`, `trending`) |
| A store's product mix | `shopify_categories`, `tiktok_shop` |
| Any web page as text | `read_url` |
| The full output of an earlier, truncated result | `get_result` (free) |

Domains can be bare (`nike.com`) or full URLs. Social handles go without `@`.

## 3. Spend credits deliberately

- Most lookups cost 1 credit; ads and AI Overview cost 2; `brand_dossier`
  costs up to 6 (sum of its parts). Failed calls are refunded, and data
  fetched recently by anyone is served from cache for free (`cached`).
- **Before a batch over ~20 credits** (e.g. 15 competitors x 3 lookups), state
  the estimated cost and ask the user to confirm.
- Prefer one `brand_dossier` over five separate domain calls when you need the
  overview; prefer single lookups when you need one fact.
- Don't repeat a lookup in the same task - reuse the result, or `get_result`
  with its `id`.

## 4. Research workflows

Detailed playbooks with tool sequences and output templates are in
[references/workflows.md](references/workflows.md). Pick by goal:

- **Competitor teardown** - dossier per competitor, then ads and social for
  the top ones; compare in one table.
- **Ad research** - what a brand is running, angles, offers, formats, and how
  long ads have run.
- **Creator / influencer shortlist** - find candidates via YouTube search or
  known handles, then score on audience size, cadence and engagement.
- **Local market scan** - Google Maps search per area, then place details for
  the leaders.
- **Demand check** - Google Trends interest, related queries and regions for
  a product or category.
- **Content research** - transcripts of top videos, X threads and replies, and
  competitor pages read as markdown.

## 5. Report findings well

- Say where each number comes from and that traffic, visits and keyword
  figures are **estimates**; give the snapshot date when the result has one.
- Put comparisons in tables (one row per brand), then 3-5 takeaways the user
  can act on.
- Quote ad copy and post text exactly; link to the source URL when the result
  includes one.
- If a lookup fails (`provider_error`, `empty_result`), say so, retry once
  after a pause for `provider_error`, and carry on with the rest.
- Mention when a result was truncated and fetch the remainder with
  `get_result` only if it matters for the task.

## Limits

- Public data only: no logins, private accounts, or posting. Every tool is
  read-only.
- Results over 50,000 characters are truncated (with an `id` to fetch the
  rest via `get_result`).
- Local files can't be converted over MCP; the user can upload them in the
  ScrapeWhale web app instead.
