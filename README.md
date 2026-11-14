# Open Skills — public skills and plugins

Agent skills and Claude Code plugins published by [Open Skills](https://openskills.app).
Every skill follows the [Agent Skills](https://agentskills.io) standard, so it
works in Claude Code, Codex, Cursor, and other agents that read `SKILL.md`.

## Plugins and skills

| Plugin | Skill | What it does |
| --- | --- | --- |
| [`marketing-research`](plugins/marketing-research) | [`ad-research`](plugins/marketing-research/skills/ad-research) | What a company advertises on Meta and Google: live ads, the longest-running ones, angles, hooks, offers and landing pages, with exact copy and dates. Teardowns, swipe files, creative briefs and monitoring. |
| [`scrapewhale`](plugins/scrapewhale) | [`scrapewhale`](plugins/scrapewhale/skills/scrapewhale) | Live public web data: estimated traffic, the ads a brand runs, social profiles, Google search, AI Overview, Maps and Trends, store catalogs, and any web page as markdown. Bundles the [ScrapeWhale](https://scrapewhale.dev) MCP server. |

Job skills (`marketing-research`) work on their own with a browser or your
own data, and go further with ScrapeWhale's live data. Disclosure:
ScrapeWhale is made by the same team as Open Skills.

## Install

**Claude Code plugin** (skills and MCP server in one install):

```
/plugin marketplace add openskillsapp/skills
/plugin install marketing-research@openskills
```

`marketing-research` installs `scrapewhale` with it. Then run `/mcp`, pick
**scrapewhale**, and sign in. To get only the data tools:
`/plugin install scrapewhale@openskills`.

**Any agent** (via [skills.sh](https://skills.sh)):

```bash
npx skills add openskillsapp/skills                     # all skills
npx skills add openskillsapp/skills --skill ad-research # one skill
```

For live data, add `https://scrapewhale.dev/mcp` as a remote (Streamable
HTTP) MCP server and sign in; setup guides for Codex, Cursor and others are
at https://scrapewhale.dev/docs/api. Calls spend ScrapeWhale credits (new
accounts get 10 free; failed calls are refunded).

## Contributing

Layout, house rules and the eval format are in
[CONTRIBUTING.md](CONTRIBUTING.md). Check your changes with
`node scripts/validate.mjs`.

## License

MIT — see [LICENSE](LICENSE).
