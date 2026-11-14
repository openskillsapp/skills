# Data sources for AI visibility

## ScrapeWhale calls

Tool names are the MCP names (they may carry a client prefix). Use
`format: json` for analysis.

| Step | Call | Credits | Key parameters |
| --- | --- | --- | --- |
| AI Overview | `google_search`, `action: ai_overview` | 2 | `q`, `gl` (default `us`), `hl` |
| Organic results | `google_search`, `action: web` | 1 | `q`, `gl`, `hl`, `num` (1-20) |
| AI referral traffic | `domain_intel`, `action: traffic` | 1 | `domain` |
| Agent readiness | `domain_intel`, `action: agent_ready` | 1 | `domain` |
| A cited page | `read_url` | 1 | `url` |

Budget: prompts x 2 (overviews) + prompts x 1 (optional organic) + domains
x 2 (traffic, agent readiness) + gap pages. 10 prompts and 3 domains
without organic results is 26 credits; 20 prompts with organic results and
4 domains is 68. Failed calls are refunded. Cached results are free:
AI Overviews, traffic and agent readiness for 24 hours, search results
for 1 hour.

### `ai_overview` fields

- `has_overview`: false means Google showed no AI answer for this query and
  market at fetch time.
- `ai_overview.text_blocks[]`: `type` (paragraph, list, ...), `snippet`,
  `reference_indexes[]`, and `list[]` items with their own snippets and
  indexes. Join the snippets for the answer text.
- `ai_overview.references[]`: `index`, `title`, `link`, `source`, `snippet`.
  A block's `reference_indexes` point to these, so you can tell which source
  backs which claim.

### `web` fields

`organic[]` (`position`, `title`, `link`, `snippet`, `date`), `answerBox`,
`knowledgeGraph`, `peopleAlsoAsk[]` (question, snippet, link),
`relatedSearches[]`, `videos[]`.

### `traffic` fields used here

The AI traffic section (`AiTrafficDetails`): total visits from AI chatbots,
the split by chatbot (`Traffic.Distribution.Chatbots[]`, name and value),
and `TopPrompts.Prompts[]` where available. Plus `SnapshotDate`. Missing
for many smaller sites: report it as not available, not as zero.

### `agent_ready` fields

`agent_ready` (true when any signal is present), `llms_txt` and `agents_md`
(present, url, status, bytes, title), `ucp` (the Universal Commerce
Protocol manifest: versions, capabilities, payment handlers) and
`mcp_endpoint`.

## Caveats to state in the report

- AI Overviews cover Google only, for one market per run, at one moment.
- Google often shows no AI Overview for brand and transactional queries;
  those are measured in classic results.
- The same query can show a different answer an hour later. Small samples
  are directional.
- AI traffic figures are third-party estimates.

## Without ScrapeWhale

- **Google AI Overviews**: search in a browser tool set to the market's
  country and language; logged-out and incognito where possible. Record
  whether an overview showed, its text and its source links.
- **ChatGPT, Perplexity, Gemini, Claude**: a fresh chat per prompt, search
  or browsing enabled if the engine has it, memory off. Record the brands
  named in order and the cited links.
- **Agent readiness**: fetch `https://<domain>/llms.txt` and
  `https://<domain>/agents.md`; a 200 with text content counts.
- **AI referral traffic**: the user's own analytics (referrers such as
  chatgpt.com, perplexity.ai, gemini.google.com, copilot.microsoft.com).
  Competitors' figures aren't available this way.
