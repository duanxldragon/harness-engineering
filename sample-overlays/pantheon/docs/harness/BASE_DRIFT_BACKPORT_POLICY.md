# Base Drift Backport Policy

English version: [BASE_DRIFT_BACKPORT_POLICY.en.md](./BASE_DRIFT_BACKPORT_POLICY.en.md)

This policy defines when drift found in a derived Pantheon repository must be backported to `pantheon-base`, when it may remain local, and what evidence is required before either decision is accepted.

## 1. Scope

This policy applies when a repository uses the Pantheon inheritance model and the overlay-owned drift checks report one or more of:

- `generic drift`
- `pseudo-drift`
- `business mount`
- `business-specific drift`
- `base-only`
- `business-only`

## 2. Default Decision

Use these defaults unless a stricter base contract already exists:

| Drift category | Default decision |
|---|---|
| `generic drift` | backport to `pantheon-base` first |
| `pseudo-drift` | do not expand locally; collapse or delete when possible |
| `business mount` | keep only if it is the narrowest explicit extension seam |
| `business-specific drift` | keep local only with business-domain contract or acceptance evidence |
| `base-only` | review whether the business repository is missing an inherited base file |
| `business-only` | keep only if it is clearly under `business/*` ownership |

## 3. Mandatory Backport Cases

The change must be proposed in `pantheon-base` before it is normalized in a business repository when any of the following is true:

- it changes `platform` or `system/*` behavior
- it improves a shared response, DTO, permission, audit, i18n, routing, or layout rule
- it fixes a defect that would also affect another derived business repository
- it introduces a new shared extension seam that other business modules may need

Keeping such a change only in `pantheon-ops` is method drift, not a local optimization.

## 4. Allowed Local Cases

The change may stay only in the business repository when all of the following are true:

- the change is anchored by a business contract, design, acceptance note, or audit note
- the change stays within `business/*` ownership or an explicit mount point
- the change does not redefine a base contract or shared base semantics
- the drift report classifies it as `business-specific drift`, `business-only`, or an accepted `business mount`

## 5. Required Evidence

Every triaged drift decision must keep evidence for:

- the drift category from `triage-base-drift.mjs`
- whether the change is base-owned or business-owned
- the document or acceptance anchor justifying the decision
- the verification command set run after the decision
- any follow-up backport issue, base PR, or explicit waiver

Recommended storage:

- task packet decision notes
- `.harness/evidence/<task-id>/commands.json`
- review artifact references
- `docs/PROJECT_INHERITANCE.md` when the inherited base version changes

## 6. Human Gates

Human approval is required before:

- deleting a local override of an inherited base file
- deciding not to backport a `generic drift`
- widening a `business mount` beyond a narrow extension seam
- changing the pinned base version in `docs/PROJECT_INHERITANCE.md`

## 7. CI Use

The overlay health entrypoint should be used to keep this policy executable:

```powershell
node harness-engineering/sample-overlays/pantheon/scripts/harness/check-overlay-health.mjs --json --root <workspace>
node harness-engineering/sample-overlays/pantheon/scripts/harness/triage-base-drift.mjs --json --root <workspace> --business pantheon-ops
```

If the target repository vendors the overlay locally, run the local copies instead.
