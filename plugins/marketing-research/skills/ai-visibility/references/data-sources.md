# Domain checks

The answers come from the browser (see [running-prompts.md](running-prompts.md)).
These checks add what a browser can't measure well: AI chatbot traffic and
agent readiness for every domain, and the content of cited pages.

## ScrapeWhale calls

Tool names are the MCP names (they may carry a client prefix). Use
`format: json` for analysis.

| Step | Call | Credits | Key parameters |
| --- | --- | --- | --- |
| AI referral traffic | `domain_intel`, `action: traffic` | 1 | `domain` |
| Agent readiness | `domain_intel`, `action: agent_ready` | 1 | `domain` |
| A cited page | `read_url` | 1 | `url` |

Budget: 2 credits per domain plus 1 per cited page read. A brand and 3
competitors with 4 gap pages is 12 credits. Cached results are free for 24
hours; failed calls are refunded.

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

## Without ScrapeWhale

- **Agent readiness**: fetch `https://<domain>/llms.txt` and
  `https://<domain>/agents.md`; a 200 with text content counts.
- **Cited pages**: read them in the browser or with a web fetch.
- **AI referral traffic**: the user's own analytics (referrers such as
  chatgpt.com, perplexity.ai, gemini.google.com, claude.ai,
  copilot.microsoft.com). Competitors' figures aren't available this way.

## Caveats to state in the report

- Each engine, market and account state is a separate measurement.
- Google often shows no AI Overview for brand and transactional queries;
  those are measured in classic results.
- The same prompt can get a different answer an hour later. Small samples
  are directional.
- AI traffic figures are third-party estimates.
