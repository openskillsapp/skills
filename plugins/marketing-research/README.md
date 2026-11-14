# Marketing Research

Marketing research skills from [Open Skills](https://openskills.app), built
on live public web data. Each skill is one job, done the way a strategist
would do it: what to collect, how to read it, and a report you can act on.

| Skill | What it does |
| --- | --- |
| [`ad-research`](skills/ad-research) | What a company advertises on Meta and Google: live ads, the longest-running ones, angles, hooks, offers, formats and landing pages, with exact copy and dates. Teardowns, swipe files, creative briefs and weekly monitoring. |
| [`ai-visibility`](skills/ai-visibility) | How visible a brand is in AI answers: buyers' prompts run in Google AI Overviews, ChatGPT, Perplexity, Gemini and Claude, scoring who gets cited, mentioned and recommended against competitors, plus AI chatbot traffic and agent readiness, with ranked fixes. |
| [`competitor-intel`](skills/competitor-intel) | Data-backed competitor snapshots: estimated traffic and channel mix, search footprint, ads, social, positioning and pricing side by side, with strengths, exposures and implications. |
| [`seo-research`](skills/seo-research) | What it takes to rank: who ranks now, the winning page type, how beatable the results are, SERP features and questions, demand trends. Ranked target lists, content briefs, competitor gaps and rank tracking. |

Each skill saves its runs in dated folders, so asking again later ("what
changed since last week?") compares against the previous run.

## Data

The skills work with whatever you have connected:

- **ScrapeWhale** (recommended): structured ad library, traffic, search and
  social data through one MCP server. Installing this plugin in Claude Code
  installs the [`scrapewhale`](../scrapewhale) plugin with it; run `/mcp`,
  pick scrapewhale, and sign in. Calls spend ScrapeWhale credits (new
  accounts get 10 free).
- **A browser tool** (for example Claude in Chrome) to read the public ad
  libraries directly.
- **Your own exports** or pasted ads.

Disclosure: ScrapeWhale is made by the same team as Open Skills.

## Install

```
/plugin marketplace add openskillsapp/skills
/plugin install marketing-research@openskills
```

Any other agent: `npx skills add openskillsapp/skills --skill ad-research`,
then add `https://scrapewhale.dev/mcp` as a remote MCP server if you want
the live data.

## Try

- "What ads is Allbirds running on Meta, and which ones seem to work?"
- "Build a swipe file from Notion, ClickUp and Monday's ads for my agency PM tool."
- "What changed in Gymshark's ads since last week?"
- "How visible are we in Google's AI Overviews compared with Fathom and Matomo?"
- "Do a competitor analysis of Typeform, Tally and Jotform for us."
- "Which of these 12 keywords should we target first?"
- "Write a content brief for 'how to price a SaaS product'."

## Works well with

These skills read `.agents/product-marketing.md` when it exists and hand
off to [Marketing Skills](https://github.com/coreyhaines31/marketingskills)
(`ad-creative`, `ads`, `competitor-profiling`) when those are installed.
