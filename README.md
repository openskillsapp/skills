# Open Skills — public skills and plugins

Agent skills and Claude Code plugins published by [Open Skills](https://openskills.app).
Every skill follows the [Agent Skills](https://agentskills.io) standard, so it
works in Claude Code, Codex, Cursor, and other agents that read `SKILL.md`.

| Skill / plugin | What it does |
| --- | --- |
| [`scrapewhale`](plugins/scrapewhale) | Brand and competitor research with live web data: estimated traffic, the ads a brand runs on Meta and Google, social profiles, Google search, Maps and Trends, store catalogs, and any web page as markdown. Bundles the [ScrapeWhale](https://scrapewhale.dev) MCP server. |

## Install

**Any agent** (via [skills.sh](https://skills.sh)):

```bash
npx skills add openskillsapp/skills
# or one skill:
npx skills add openskillsapp/skills --skill scrapewhale
```

**Claude Code plugin** (skill + MCP server in one install):

```
/plugin marketplace add openskillsapp/skills
/plugin install scrapewhale@openskills
```

Then run `/mcp`, pick **scrapewhale**, and sign in.

## ScrapeWhale access

The `scrapewhale` skill uses the hosted MCP server `https://scrapewhale.dev/mcp`
(sign in with a ScrapeWhale account; the Claude Code plugin sets it up). For
other agents, add that URL as a remote MCP server; setup guides are at
https://scrapewhale.dev/docs/api.

Calls spend ScrapeWhale credits (new accounts get 10 free; failed calls are
refunded). Disclosure: ScrapeWhale is made by the same team as Open Skills.

## Layout

```
.claude-plugin/marketplace.json      Claude Code marketplace (name: openskills)
plugins/<plugin>/
  .claude-plugin/plugin.json         plugin manifest
  .mcp.json                          bundled MCP server(s), if any
  skills/<skill>/SKILL.md            the skill (name = folder name)
  skills/<skill>/references/         detail loaded on demand
```

Skills contain instructions only, no executable scripts.

## License

MIT — see [LICENSE](LICENSE).
