# Report template

Adapt the headings to the purpose. Keep the order: findings first, evidence
after. Drop sections that have no data rather than filling them with guesses.

```markdown
# <Advertiser> ad research — <YYYY-MM-DD>

Source: <ScrapeWhale ad library data | Meta Ad Library and Google Ads
Transparency Center in a browser | ads provided by the user>.
Covers: <platforms>, <N> Meta ads fetched of <total_count> in the library,
<N> Google creatives listed, <N> sampled. Spend, results and targeting are
not public and are not estimated here.

## Key findings

1. <Finding with its count and the ad IDs behind it>
2. ...
(3 to 5)

## The account at a glance

| | Meta | Google |
| --- | --- | --- |
| Active ads | | |
| Total in library | | |
| Oldest active ad | <date, days running> | |
| Formats | <IMAGE 60%, VIDEO 30%, ...> | |
| Top CTAs | | — |
| Landing pages | <N distinct, top 3> | |
| New ads, last 30 days | | |

## Longest-running active ads

For each of the top 5 to 10:

### <Headline or first line> — <N> days, since <date>
- Platform, format, CTA: ...
- Landing page: <url>
- Link: <ad library link>
- Codes: angle `…`, hook `…`, offer `…`, proof `…`

> <full primary text, exact>

Why it likely works: <inference, one or two sentences>.

## Patterns

- Angles: <share of active ads vs share of survivors>
- Hooks: ...
- Offers: ...
- What they are testing now: <variant groups and the variable that changes>
- Where the budget points: <landing pages or products with the most ads>
- Cadence: <new ads per month; bursts and what they line up with>

## Message match (if landing pages were read)

| Ad promise | Landing page headline | Match? |
| --- | --- | --- |

## For <user's product>

<Purpose-specific ending: gaps and what to watch (teardown) / ads grouped by
angle with how to adapt each (swipe file) / 3 to 5 concepts, each naming the
pattern and ad it comes from (creative brief)>

## Method notes

- Observed: start dates, status, copy, CTAs, formats, landing URLs.
- Inferred: angles, audiences, why ads work.
- Days running is a signal of performance, not proof.
- <Anything that failed or was skipped, e.g. Google copy not available>
```

## Comparing advertisers

Add this table after the key findings, one row per advertiser:

| Advertiser | Active Meta ads | Oldest active | Main angle | Main offer | Main format | Google creatives |
| --- | --- | --- | --- | --- | --- | --- |

Then: what everyone does (table stakes), what only one does, and what no one
does that the user could test.
