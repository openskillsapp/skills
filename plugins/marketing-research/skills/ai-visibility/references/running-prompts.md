# Running prompts in AI engines

## Contents
- Before the run
- Per engine
- What to record
- Pacing and blocks

## Before the run

- Use the browser tool's own tab, in the user's Chrome. Tell the user
  which engines you'll open and whether they need to be signed in.
- Decide the run settings once and keep them for every prompt (and every
  later run): market, signed in or not, memory or personalisation off where
  the engine allows, web search on where it is a choice.
- Write the settings into the run's method notes.

## Per engine

URLs with `?q=` open the prompt directly where the engine supports it; if a
URL doesn't run the prompt, type it into the input box instead.

| Engine | Open | Notes |
| --- | --- | --- |
| Google AI Overviews | `https://www.google.com/search?q=<prompt>&hl=<lang>&gl=<country>` | The overview sits above the results. Expand it ("Show more") and open the source list before recording. No overview is a valid result. |
| Google AI Mode | `https://www.google.com/search?q=<prompt>&udm=50&hl=<lang>&gl=<country>` | Conversational; one search per prompt. Sources appear beside or under the answer. |
| ChatGPT | `https://chatgpt.com/` (try `?q=<prompt>`) | Use a temporary chat or a fresh chat with memory off; turn on search if the prompt needs current information, and keep that choice for the whole run. |
| Perplexity | `https://www.perplexity.ai/search?q=<prompt>` | Sources are numbered; record the list. |
| Gemini | `https://gemini.google.com/app` | New chat per prompt; record any source links shown. |
| Claude | `https://claude.ai/new` | New chat per prompt with web search on; record cited links. |

URL-encode the prompt. Wait for the answer to finish before reading it.

## What to record

One JSON file per prompt and engine in `<date>/answers/`:

```json
{
  "prompt_id": "rec-01",
  "engine": "google-ai-overview",
  "date": "2026-11-14",
  "market": { "gl": "us", "hl": "en" },
  "signed_in": true,
  "answer_shown": true,
  "answer_text": "…",
  "brands": [
    { "name": "Rival", "position": 1, "framing": "favourable", "quote": "…" },
    { "name": "Acme", "position": 3, "framing": "hedged", "quote": "…" }
  ],
  "sources": [{ "title": "…", "url": "https://…", "domain": "g2.com" }],
  "notes": ""
}
```

- `brands`: every tracked brand named in the answer text, in order of first
  mention, plus any other brand that appears as a recommendation.
- `framing`: `favourable`, `neutral`, `hedged` or `negative`; quote the
  sentence for hedged and negative.
- `sources`: every cited link the engine shows for the answer, expanded.
- Take a screenshot when an answer is unusual or disputed, and keep it in
  the same folder.

## Pacing and blocks

- Run prompts one at a time, with a short pause between searches. Bursts of
  Google searches trigger CAPTCHAs.
- On a CAPTCHA, a login wall or a usage limit: stop, tell the user, and let
  them clear it. Don't switch accounts or try to bypass it.
- Don't click anything that sends a message, shares a chat or changes
  account settings beyond the run settings agreed with the user.
- If an engine fails for most prompts, report that engine as not measured
  rather than mixing partial data into the scores.
