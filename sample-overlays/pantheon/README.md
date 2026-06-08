# Pantheon Overlay

Chinese version: [README.zh.md](./README.zh.md)

This directory is an optional overlay for repositories that use:

- `agentic-method-kit/`
- `agentic-repo-shell/`
- `pantheon-base/`

Use this overlay only when the repository follows the Pantheon base/business inheritance model.

## What This Overlay Adds

- base/business inheritance contract
- Pantheon-specific PR template extensions
- Pantheon-specific CI workflow extensions
- Pantheon-specific architecture and backend contract checks
- inheritance contract checks
- base drift triage checks
- an overlay health entrypoint for CI and workspace verification
- explicit base drift backport policy

## Apply Order

1. bootstrap `agentic-method-kit/`
2. bootstrap `agentic-repo-shell/`
3. apply `sample-overlays/pantheon/` or adapt it into a project-owned overlay
4. include `pantheon-base/` when the repository uses the Pantheon foundation

## Recommended Reading Order

For Chinese-first onboarding, read:

1. [README.zh.md](./README.zh.md)
2. [docs/WORKSPACE_INHERITANCE.zh.md](./docs/WORKSPACE_INHERITANCE.zh.md)
3. [docs/PROJECT_INHERITANCE_TEMPLATE.zh.md](./docs/PROJECT_INHERITANCE_TEMPLATE.zh.md)
4. [docs/BASE_UPGRADE_WORKFLOW.zh.md](./docs/BASE_UPGRADE_WORKFLOW.zh.md)
5. [docs/harness/BASE_DRIFT_BACKPORT_POLICY.md](./docs/harness/BASE_DRIFT_BACKPORT_POLICY.md)

## When To Use

Use this overlay only if your repository:

- has a `pantheon-base` foundation
- distinguishes base-owned vs business-owned changes
- needs base drift governance

If your project does not use that inheritance model, do not apply this overlay.

## Files Owned By This Overlay

This overlay owns the Pantheon-specific governance layer that should not live in the generic shell:

- inheritance and drift governance
- boundary checks
- backend response / DTO contract checks
- permission contract checks
- audit coverage checks

It also owns the Pantheon workspace-consumer reference docs:

- `docs/WORKSPACE_INHERITANCE.md`
- `docs/PROJECT_INHERITANCE_TEMPLATE.md`
- `docs/BASE_UPGRADE_WORKFLOW.md`
- `docs/harness/INHERITANCE_HARNESS_PROTOCOL.md`
- `docs/harness/BASE_DRIFT_BACKPORT_POLICY.md`

## Executable Entry Points

Use the overlay-owned health entrypoint when the target workspace includes `pantheon-base` and a derived business repository such as `pantheon-ops`.

From the `harness-engineering/` repository root:

```powershell
node harness-engineering/sample-overlays/pantheon/scripts/harness/check-overlay-health.mjs --json --root <workspace>
node --test harness-engineering/sample-overlays/pantheon/scripts/harness/*.test.mjs
```

If the target repository vendors or adapts the overlay locally, run the same scripts from that local overlay path instead.

## Overlay Health Contract

`check-overlay-health.mjs` is the Pantheon-specific equivalent of a portable method health gate. It verifies:

- required overlay docs and bilingual governance artifacts exist
- `OVERLAY_MANIFEST.json` includes the health entrypoint and drift policy
- the strict overlay checks can be run from one place:
  - `check-inheritance-contract.mjs`
  - `check-boundaries.mjs`
  - `check-backend-response-contract.mjs`
  - `check-backend-dto-contract.mjs`
  - `check-permission-contract.mjs`
  - `check-audit-coverage.mjs`
