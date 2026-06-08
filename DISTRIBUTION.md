# Distribution Guide

Chinese version: [DISTRIBUTION.zh.md](./DISTRIBUTION.zh.md)

This workspace publishes a reusable method stack in three layers.

## Primary Copy Set

For a normal new repository, copy:

1. `agentic-method-kit/`
2. `agentic-repo-shell/`

Add this only when needed:

3. `sample-overlays/`

Use this helper when bootstrapping directly from this workspace:

4. `scripts/bootstrap-agentic-repo.ps1`

## What Each Layer Means

- `agentic-method-kit/`: method source of truth, schemas, templates, playbook, version metadata
- `agentic-repo-shell/`: repo-local shell, adapters, CI entrypoints, runtime skeleton
- `sample-overlays/`: optional examples that demonstrate how a downstream repository can package project-specific controls

## Do Not Copy By Default

Do not copy the root workspace wholesale into a new business repository.

Do not treat these as part of the default copy set:

- `archive/`
- root `docs/`
- root `.harness/`
- root `openspec/`
- consumer product repositories
- project-specific foundations, generated application code, or business implementations

Those paths belong to downstream consumers or local maintenance workspaces, not to the portable method distribution.

## Target Outcomes

### Generic Repository

Use:

- `agentic-method-kit/`
- `agentic-repo-shell/`

### Repository With Project Overlay

Use:

- `agentic-method-kit/`
- `agentic-repo-shell/`
- a project-owned overlay, or `sample-overlays/pantheon/` only as an example to adapt

## Verification After Copy

After bootstrap or copy, run:

```powershell
node scripts/harness/check-adoption.mjs --strict
node scripts/harness/check-method-health.mjs --strict
```

If an example overlay is applied, also run the overlay-owned tests and checks required by that downstream repository's CI.

Historical extraction notes are archived at:

- [archive/pantheon-workspace-process/MIGRATION_TO_STANDALONE_REPO.md](./archive/pantheon-workspace-process/MIGRATION_TO_STANDALONE_REPO.md)
