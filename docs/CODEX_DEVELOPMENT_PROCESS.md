# Codex Development Process Card

English companion for the Chinese canonical guide.

This document exists so the workflow can travel with the repository instead of living only in a personal Codex profile.

Core rule:

- identify the target repo
- classify the layer
- use CodeGraph first for structural code retrieval when the repo has an index
- read the repo-local contract docs
- reuse existing skills and harness checks first
- require rendered evidence for UI work
- keep the final handoff explicit about evidence and gaps

CodeGraph rule:

- Use `codegraph status`, `codegraph context`, `codegraph query`, `codegraph callers`, `codegraph callees`, and `codegraph impact` to narrow code context before opening files.
- Use `rg` for literal strings, logs, copy, comments, or after CodeGraph has already identified the specific file.

See the Chinese canonical guide for the full workflow:

- [CODEX_DEVELOPMENT_PROCESS.zh.md](./CODEX_DEVELOPMENT_PROCESS.zh.md)
