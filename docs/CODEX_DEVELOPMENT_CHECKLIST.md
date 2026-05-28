# Codex Development Checklist

English companion for the shortest workshop-friendly entry.

This checklist is not the full workflow. It is the fast preflight gate for new projects and short-lived task briefs.

## Before starting

- [ ] I identified the target repo: `pantheon-base`, `pantheon-ops`, or `harness-engineering`
- [ ] I classified the task layer: `platform`, `system/*`, or `business/*`
- [ ] I read the repo-local `AGENTS.md` / `CLAUDE.md`
- [ ] I read the relevant design / contract / acceptance docs

## During the task

- [ ] I reused existing skills, harness checks, scripts, or tests first
- [ ] If this is a UI task, I applied `impeccable`
- [ ] If this crosses layers, I stated the boundary and dependencies
- [ ] If this is generation, deletion, inheritance sync, or another high-risk task, I confirmed the verification matrix

## Before finishing

- [ ] I ran verification that matches the change surface
- [ ] I recorded evidence, known gaps, and unverified items
- [ ] If menus, permissions, i18n, schema, routing, docs, or inheritance changed, I synced the related docs

## When to escalate

- For non-trivial tasks, switch to the full workflow card:
  - [Codex Development Process Card](./CODEX_DEVELOPMENT_PROCESS.md)

