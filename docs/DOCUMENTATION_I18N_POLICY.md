# Documentation Internationalization Policy

中文版本: [DOCUMENTATION_I18N_POLICY.zh.md](./DOCUMENTATION_I18N_POLICY.zh.md)

## Goal

The documentation in this repository should support both of these audiences:

- Chinese-speaking developers who need direct operational clarity
- broader collaborators who rely on English docs, stable links, and publishable documentation surfaces

## Decision

Use separate Chinese and English files with reciprocal links by default.

Recommended naming:

- English primary file: `README.md`
- Chinese companion: `README.zh.md`

Legacy exception:

- if a historical document already exists as a stable Chinese-first `*.md` path with downstream references, keep that Chinese primary file in place
- add the English companion as `*.en.md`

Do not default to a single document with Chinese at the top and English at the bottom, unless the document is very short and only serves as a brief notice.

## Rules

### 1. Entry Documents

Entry documents should provide a Chinese version first.

Typical scope:

- root `README`
- directory-level `README`
- installation, upgrade, migration, release, and operational guides

### 2. Contracts and Specs

If a contract primarily serves a Chinese-speaking team, it can be Chinese-first with an English companion added later.

If a contract is already referenced by external tools, downstream repositories, or published docs:

- keep the current English path stable
- add a `*.zh.md` companion
- add reciprocal language links at the top of both files

### 3. Templates and Examples

Template files should usually remain English-structured to reduce ambiguity for machine consumers and external collaborators.

Chinese support is better added through:

- Chinese guide documents
- field explanations
- separate usage notes

### 4. Prompt, Adapter, and Skill Documents

These documents are often consumed by agents or tools, so they do not need full bilingual duplication by default.

Prefer:

- keeping the English source intact
- adding a Chinese README or Chinese index where human readers need support

## Maintenance Rules

1. Keep existing English paths stable whenever possible
2. Use `.zh.md` consistently for Chinese documents
2.1 Legacy Chinese-primary documents may keep their original `.md` paths, with English companions in `.en.md`
3. Add language-switch links at the top of both files
4. Update the source-of-truth document first, then update the translated companion
5. If the two versions are temporarily out of sync, state which one is authoritative

## Recommended Header Snippets

English document:

```md
Chinese version: [README.zh.md](./README.zh.md)
```

Chinese document:

```md
English version: [README.md](./README.md)
```

## Suggested Rollout

First batch:

- root entry documents
- method entry documents
- installation, upgrade, migration, and release guides

Second batch:

- overlay documents
- repo shell documents
- skills index documents

Third batch:

- template guides
- adapter and prompt guides
- English contract companions that must be maintained for public distribution
