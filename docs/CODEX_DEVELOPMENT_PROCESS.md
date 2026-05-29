# Codex Development Process Card

English companion for the Chinese canonical guide.

This document exists so the workflow can travel with the repository instead of living only in a personal Codex profile.

Core rule:

- identify the target repo
- classify the layer
- use a small task packet for non-trivial work
- use CodeGraph first for structural code retrieval when the repo has an index
- read the repo-local contract docs
- reuse existing skills and harness checks first
- require rendered evidence for UI work
- keep the final handoff explicit about evidence and gaps

Minimum task packet:

- target repo
- layer
- task mode
- required reading
- implementation scope
- sync expectation
- verification
- stop points

Pantheon default:

- fix shared `platform` and `system/*` behavior in `pantheon-base` first
- keep `pantheon-ops` for `business/*` divergence only
- close code, tests, i18n, menus, permissions, docs, and evidence in the same turn when they are in scope

CodeGraph rule:

- Use `codegraph status`, `codegraph context`, `codegraph query`, `codegraph callers`, `codegraph callees`, and `codegraph impact` to narrow code context before opening files.
- Use `rg` for literal strings, logs, copy, comments, or after CodeGraph has already identified the specific file.

See the Chinese canonical guide for the full workflow:

- [CODEX_DEVELOPMENT_PROCESS.zh.md](./CODEX_DEVELOPMENT_PROCESS.zh.md)
