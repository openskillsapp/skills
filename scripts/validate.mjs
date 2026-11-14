#!/usr/bin/env node
// Validates the marketplace, plugin manifests and skills in this repo.
// No dependencies: run with `node scripts/validate.mjs` (Node 18+).
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';

const root = resolve(dirname(new URL(import.meta.url).pathname), '..');
const errors = [];
const warnings = [];
const err = (where, msg) => errors.push(`${relative(root, where)}: ${msg}`);
const warn = (where, msg) => warnings.push(`${relative(root, where)}: ${msg}`);

const KEBAB = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const SCRIPT_EXT = /\.(sh|bash|zsh|py|js|mjs|cjs|ts|rb|pl|ps1|exe|bin)$/i;

function readJson(path) {
  try {
    return JSON.parse(readFileSync(path, 'utf8'));
  } catch (e) {
    err(path, `invalid JSON (${e.message})`);
    return null;
  }
}

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    if (entry === '.DS_Store') continue;
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}

// Minimal frontmatter reader: top-level `key: value` pairs, quoted or not.
function frontmatter(text, path) {
  const m = text.match(/^---\n([\s\S]*?)\n---\n/);
  if (!m) {
    err(path, 'missing YAML frontmatter');
    return { fields: {}, body: text };
  }
  const fields = {};
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^([a-z_-]+):\s*(.*)$/);
    if (kv) fields[kv[1]] = kv[2].replace(/^["']|["']$/g, '').trim();
  }
  return { fields, body: text.slice(m[0].length) };
}

function checkLinks(file) {
  const text = readFileSync(file, 'utf8');
  for (const [, target] of text.matchAll(/\]\(([^)\s]+)\)/g)) {
    if (/^(https?:|mailto:|#)/.test(target)) continue;
    const path = target.split('#')[0];
    if (path && !existsSync(resolve(dirname(file), path))) {
      err(file, `broken link: ${target}`);
    }
  }
}

// --- marketplace ---------------------------------------------------------
const marketplacePath = join(root, '.claude-plugin/marketplace.json');
const marketplace = readJson(marketplacePath) ?? { plugins: [] };
const listed = new Map(marketplace.plugins.map((p) => [p.name, p]));
for (const p of marketplace.plugins) {
  if (!existsSync(resolve(root, p.source ?? ''))) {
    err(marketplacePath, `plugin "${p.name}" source not found: ${p.source}`);
  }
}

// --- plugins and skills --------------------------------------------------
const skillNames = new Map();
const pluginsDir = join(root, 'plugins');
for (const plugin of readdirSync(pluginsDir)) {
  const dir = join(pluginsDir, plugin);
  if (!statSync(dir).isDirectory()) continue;

  const manifestPath = join(dir, '.claude-plugin/plugin.json');
  const manifest = existsSync(manifestPath) ? readJson(manifestPath) : null;
  if (!manifest) {
    err(dir, 'missing .claude-plugin/plugin.json');
    continue;
  }
  if (manifest.name !== plugin) {
    err(manifestPath, `name "${manifest.name}" must match folder "${plugin}"`);
  }
  if (!listed.has(plugin)) err(marketplacePath, `plugin "${plugin}" not listed`);
  if (!manifest.version) warn(manifestPath, 'no version');
  if (manifest.icon && !existsSync(resolve(dir, manifest.icon))) {
    err(manifestPath, `icon not found: ${manifest.icon}`);
  }
  for (const dep of manifest.dependencies ?? []) {
    const name = typeof dep === 'string' ? dep.split('@')[0] : dep.name;
    if (!listed.has(name)) err(manifestPath, `dependency "${name}" not in marketplace`);
  }
  if (!existsSync(join(dir, 'README.md'))) err(dir, 'missing README.md');

  const skillsDir = join(dir, 'skills');
  if (!existsSync(skillsDir)) continue;
  for (const skill of readdirSync(skillsDir)) {
    const sdir = join(skillsDir, skill);
    if (!statSync(sdir).isDirectory()) continue;
    const skillPath = join(sdir, 'SKILL.md');
    if (!existsSync(skillPath)) {
      err(sdir, 'missing SKILL.md');
      continue;
    }
    const text = readFileSync(skillPath, 'utf8');
    const { fields, body } = frontmatter(text, skillPath);

    if (fields.name !== skill) err(skillPath, `name "${fields.name}" must match folder "${skill}"`);
    if (!KEBAB.test(skill) || skill.length > 64) err(skillPath, 'name must be kebab-case, 64 chars max');
    if (!fields.description) err(skillPath, 'missing description');
    else if (fields.description.length > 1024) {
      err(skillPath, `description is ${fields.description.length} chars (max 1024)`);
    }
    if (!fields.license) warn(skillPath, 'no license');
    const lines = body.split('\n').length;
    if (lines > 500) err(skillPath, `body is ${lines} lines (keep under 500)`);

    if (skillNames.has(skill)) err(skillPath, `skill name also used in ${skillNames.get(skill)}`);
    skillNames.set(skill, plugin);

    for (const file of walk(sdir)) {
      if (SCRIPT_EXT.test(file)) err(file, 'skills hold instructions only, no scripts');
      if (file.endsWith('.md')) checkLinks(file);
    }

    const evalsPath = join(sdir, 'evals/evals.json');
    if (existsSync(evalsPath)) {
      const evals = readJson(evalsPath);
      if (evals && evals.skill_name !== skill) err(evalsPath, 'skill_name must match the skill');
      if (evals && !(evals.evals?.length > 0)) err(evalsPath, 'no evals');
    } else {
      warn(sdir, 'no evals/evals.json');
    }
  }
}

for (const file of ['README.md', 'CONTRIBUTING.md']) {
  if (existsSync(join(root, file))) checkLinks(join(root, file));
}

for (const w of warnings) console.log(`warn  ${w}`);
for (const e of errors) console.log(`error ${e}`);
console.log(`\n${skillNames.size} skills, ${listed.size} plugins: ${errors.length} errors, ${warnings.length} warnings`);
process.exit(errors.length ? 1 : 0);
