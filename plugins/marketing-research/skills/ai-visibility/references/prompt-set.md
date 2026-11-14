# Prompt set and scoring

## Contents
- Where prompts come from
- Intent families
- Writing the prompts
- The prompts.json file
- Scoring

## Where prompts come from

Best first:

1. What buyers say they asked an AI (sales calls, "how did you hear about
   us" answers, support tickets).
2. Customer and community language: reviews, forum threads, objections.
3. The brand's search terms, rewritten the way someone asks an assistant.
4. People Also Ask questions from `google_search` `web` results.

## Intent families

| Family | Shape | Buying value |
| --- | --- | --- |
| Recommendation | "Best [category] for [segment or constraint]" | High |
| Comparison | "[Brand] vs [competitor]", "alternatives to [competitor]" | High |
| Category discovery | "What tools do [role] use for [job]?" | High |
| Validation | "Is [brand] good for [use]?", "[brand] reviews", "is [brand] legit" | High |
| Price and fit | "[brand] pricing", "does [brand] work with [tool]" | Medium |
| Problem | "How do I [solve problem]?" | Medium |
| Definition | "What is [term]?" | Low |

A useful default for 20 prompts: 5 recommendation, 4 comparison, 3
discovery, 3 validation, 2 price and fit, 2 problem, 1 definition, plus the
two controls on top.

## Writing the prompts

- Full questions with context: "What CRM should a 5-person agency that
  lives in Gmail use?" not "crm small agency".
- Name the segment or constraint the brand competes on.
- One intent per prompt; skip paraphrases unless you are testing wording.
- Comparison prompts name real competitors, both directions across the set.
- Controls: the brand name alone (should always mention it) and a prompt
  from an unrelated category (should never).

## The prompts.json file

```json
{
  "brand": "Acme",
  "domain": "acme.com",
  "competitors": ["rival.com", "other.io"],
  "market": { "gl": "us", "hl": "en" },
  "version": 1,
  "changes": [{ "version": 1, "date": "2026-11-14", "note": "initial set" }],
  "prompts": [
    { "id": "rec-01", "family": "recommendation", "weight": 3, "q": "Best invoicing software for freelancers in the US" },
    { "id": "ctl-brand", "family": "control", "weight": 0, "q": "Acme invoicing" }
  ]
}
```

Weights: 3 for high buying value, 2 medium, 1 low, 0 for controls. Bump the
version and log a note whenever prompts are added, removed or reweighted.

## Scoring

Per brand, over the non-control prompts:

| Metric | Formula |
| --- | --- |
| Overview coverage | prompts with an AI answer / prompts run |
| Citation rate | prompts where the brand's domain is a reference / prompts with an answer |
| Mention rate | prompts where the brand is named in the text / prompts with an answer |
| Recommendation rate | prompts where it is named as an option to choose, framed favourable or neutral / prompts with an answer |
| Share of voice | the brand's mentions / mentions of all tracked brands |
| Weighted versions | the same, with each prompt counted by its weight |

Framing codes for each mention: `favourable` (recommended, praised),
`neutral` (listed), `hedged` (listed with a caveat), `negative` (advised
against). Quote the sentence for anything hedged or negative.

Count a domain as cited when any reference link is on it or its
subdomains. Count a mention by the brand name or product name in the answer
text, not in a reference title alone.

Always print the denominator: "Citation rate 22% (4 of 18)".
