# Report template

```markdown
# <Brand> AI visibility — <YYYY-MM-DD>

Engine: <Google AI Overviews | ChatGPT | ...>. Market: <country, language>.
Prompt set: v<N>, <N> prompts (+2 controls). Source: <ScrapeWhale | browser
runs | answers provided by the user>. One run per prompt; rates are
directional.

## Key findings

1. <Finding with numbers and denominators>
2. ...
(3 to 5)

## Scorecard

| Brand | Citation rate | Mention rate | Recommended | Share of voice | AI referral visits/mo |
| --- | --- | --- | --- | --- | --- |
| <brand> | 22% (4/18) | | | | |
| <competitor> | | | | | |

Overview coverage: <N of M prompts showed an AI answer>, by family: ...

## Per prompt

| Prompt | Family | Overview? | Cited domains | Brands named (order, framing) | <Brand> |
| --- | --- | --- | --- | --- | --- |

## Sources AI cites

| Source type | Domains | Cites <brand> | Cites competitors |
| --- | --- | --- | --- |
| Own sites | | | |
| Review sites | | | |
| Forums | | | |
| Video | | | |
| Media | | | |

## Citation gaps

For each prompt a competitor wins:

### <prompt>
- Cited: <competitor page URL>. <Brand>'s closest page: <URL or none>.
- What the cited page has: <direct answer, table, numbers, date, ...>
- Fix: <specific change>

## Agent readiness

| Domain | llms.txt | agents.md | UCP | MCP endpoint |
| --- | --- | --- | --- | --- |

## Fixes, ranked

1. <Fix> — rung: <cited/mentioned/recommended>; prompts affected: <ids>;
   effort: <low/medium/high>
...

## Method notes

- Controls: <brand prompt mentioned the brand? unrelated prompt clean?>
- Caveats: one market, one run per prompt, estimates for traffic.
- <Anything that failed or was skipped>
```

In monitoring mode, put a "Since <last date>" section first: prompts
gained and lost per brand, rate changes with both denominators, new
sources, and framing changes.
