# Data sources for SEO research

## Contents
- ScrapeWhale calls and fields
- Substitutes for missing data
- Budget examples

## ScrapeWhale calls and fields

Tool names are the MCP names (they may carry a client prefix). Use
`format: json` when you compare or score.

**`google_search` `action: web`** (1 credit; cached 1 hour). Params: `q`,
`gl` (country, default `us`), `hl` (language), `num` (1-20, default 10),
`page`. Returns `organic[]` (`position`, `title`, `link`, `snippet`,
`date`), `answerBox`, `knowledgeGraph`, `peopleAlsoAsk[]` (question,
snippet, link), `relatedSearches[]`, `videos[]` (title, channel, date,
duration). No ads, local pack details or shopping results.

**`google_search` `action: ai_overview`** (2 credits; cached 24 hours).
`has_overview`, answer `text_blocks`, `references` (title, link, source).

**`domain_intel` `action: authority`** (1 credit). Domain rating 0-100 and
rank. Keep the licence text from the result in the report.

**`domain_intel` `action: organic`** (1 credit). Totals from the US
database: organic keyword count, estimated monthly organic visits, traffic
cost in USD, organic rank (lower is bigger). No keyword list, no other
countries.

**`domain_intel` `action: traffic`** (1 credit). Estimated visits and trend,
traffic source shares (search share = how much the site depends on SEO),
top countries, and `TopKeywords[]` (`Name`, `Volume`, `Cpc`): the site's
top search terms with monthly volume. This is the one place volume figures
come from; it covers the keywords that send that site traffic, not any
keyword you choose.

**`domain_intel` `action: backlinks`** (1 credit). Backlink counts for the
root domain, hostname and exact URL. No list of linking sites.

**`google_trends`** (1 credit each; cached 6 hours). `interest` (up to 5
comma-separated terms, `geo`, `time` such as `today 12-m` or `today 5-y`):
relative interest 0-100 over time. `related`: top and rising related
queries. `geo`: interest by region. Values are relative to the peak in the
request, so compare terms in the same request.

**`read_url`** (1 credit). A page as markdown, for briefs and checking
what a ranking page covers.

## Substitutes for missing data

| Missing | Substitute |
| --- | --- |
| Volume for a chosen keyword | Competitors' `TopKeywords` volumes when the keyword is there; Google Trends to compare terms against one with a known volume; the user's Search Console impressions; Google Keyword Planner ranges; a keyword tool the user has |
| Keyword difficulty | Authority of the top 10 domains, the page types, and how many weak pages rank (see scoring) |
| Full ranked keyword list | Search Console for the user's own site; for competitors, their `TopKeywords` plus live results for queries you suspect they win |
| Linking sites | Not available; use backlink counts and authority as the strength signal |

## Budget examples

| Job | Credits |
| --- | --- |
| Content brief: 1 results page, 1 AI Overview, 4 pages read | 7 |
| Landscape: 15 queries + authority for ~20 unique domains | 35 |
| Competitor gap: 4 sites x 4 lookups + 10 queries | 26 |
| Rank tracking: 20 keywords, weekly | 20 per run |

Cached results are free; failed calls are refunded. Reuse authority
results across queries: one call per domain, not per appearance.
