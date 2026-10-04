# ScrapeWhale for Claude

Brand and competitor research with live web data. Ask Claude about any
company and it pulls estimated website traffic and sources, the ads the brand
runs on Meta and Google, its Instagram, TikTok, LinkedIn, X and YouTube
presence, Google search, Maps and Trends results, store catalogs, or any web
page as clean markdown.

This plugin bundles:

- the **ScrapeWhale MCP server** (`https://scrapewhale.dev/mcp`): 18 read-only
  tools over public data, and
- the **scrapewhale skill**: which tool answers which question, how to
  combine them into research (competitor teardowns, ad research, creator
  shortlists, local market scans, demand checks), and how to keep credit
  spend sensible.

## Setup

1. Install the plugin, then run `/mcp`, pick **scrapewhale** and sign in with
   your ScrapeWhale account (or create one; new accounts get 10 free credits).
2. Ask, for example:
   - "Build a brand dossier for allbirds.com."
   - "How much traffic does notion.so get, and where does it come from?"
   - "What ads is Nike running on Facebook right now?"
   - "Find the top-rated coffee shops in Austin, TX on Google Maps."

## Pricing and limits

Each tool call uses ScrapeWhale credits (most cost 1, ads and AI Overview 2,
the brand dossier up to 6). Failed calls are refunded and recently fetched
data is free. All tools are read-only: no logins to other sites, no posting.

## Links

- Docs: https://scrapewhale.dev/docs/api
- Privacy: https://scrapewhale.dev/privacy · Terms: https://scrapewhale.dev/terms
- Support: support@scrapewhale.dev · https://scrapewhale.dev/contact
- Disconnect any time under Settings → API keys → Connected apps on
  scrapewhale.dev.
