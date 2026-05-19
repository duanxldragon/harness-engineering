# Verification Evidence Spec

Chinese version: [VERIFICATION_EVIDENCE_SPEC.md](./VERIFICATION_EVIDENCE_SPEC.md)

Type: Contract
Layer: platform
Status: Active

This document defines the format for Pantheon task verification evidence. The evidence format must be tool-agnostic.

## 1. Evidence Directory

Default directory:

```text
.harness/evidence/<task-id>/
  summary.md
  commands.json
  screenshots/
  smoke-results/
  logs/
  review.md
```

Whether `.harness/evidence/` is committed can be chosen by project policy. CI artifacts may use the same structure.

## 2. `summary.md`

```md
# Verification Summary: <task-id>

## Scope

- Primary layer:
- Changed files:

## Commands

| Command | CWD | Result | Notes |
|---|---|---|---|
| `go test ./...` | `pantheon-base` | passed |  |

## Browser Evidence

- none

## Known Gaps

- none

## Completion Status

complete | blocked | partial
```

## 3. `commands.json`

```json
{
  "taskId": "YYYY-MM-DD-task-name",
  "repo": "pantheon-platform",
  "agent": {
    "tool": "codex",
    "adapter": ".agents/adapters/codex.md"
  },
  "commands": [
    {
      "command": "go test ./backend/...",
      "cwd": "pantheon-base",
      "status": "passed",
      "durationMs": 0,
      "notes": ""
    }
  ],
  "browserEvidence": [],
  "linkage": {
    "taskPacket": "docs/harness/tasks/YYYY-MM-DD-task-name.task.md",
    "evidenceDir": ".harness/evidence/YYYY-MM-DD-task-name/",
    "reviewFile": ".harness/evidence/YYYY-MM-DD-task-name/review.md",
    "changeRef": "openspec/changes/<name>/",
    "planRefs": ["docs/superpowers/plans/<file>.md"]
  },
  "knownGaps": [],
  "completedAt": "YYYY-MM-DDTHH:mm:ssZ"
}
```

`agent.tool` may be:

- `codex`
- `claude-code`
- `cursor`
- `github-copilot`
- `openhands`
- `aider`
- `human`
- `other`

When a task includes browser verification for UI, routes, or permission states, `browserEvidence` should include at least:

```json
{
  "viewport": "desktop",
  "url": "/system/user",
  "screenshot": "screenshots/user-desktop.png",
  "consoleErrors": [],
  "checkedStates": ["loading", "empty", "error", "permission"]
}
```

If the current environment cannot produce screenshots, a single record may use `visualGap` instead of `screenshot`, or the global reason may be added to `knownGaps`.

## 4.2 Artifact Linkage

`commands.json` should record artifact linkage explicitly:

- `linkage.taskPacket`
- `linkage.evidenceDir`
- `linkage.reviewFile`
- `linkage.changeRef`
- `linkage.planRefs`

Rules:

- `taskId` must match the `linkage.taskPacket` filename and the `linkage.evidenceDir` directory name
- if `reviewFile` exists, it should live under the matching evidence directory
- if there is no OpenSpec change, `changeRef` must be `none`
- if there is no superpowers plan, `planRefs` may be an empty array

## 4. UI Evidence

When UI, routes, permission states, i18n, or browser interaction are affected, the task must save or reference:

- final URL
- console errors
- screenshot
- smoke result
- viewport information

Local workflows may use gstack browse, Playwright, browser extensions, or manual screenshots, but the evidence landing structure must remain consistent.

## 4.1 Minimum UI Evidence Fields

For UI-affecting tasks, evidence must include:

- viewport label (`desktop`, `mobile`, or equivalent)
- screenshot path or explicit visual gap record
- final URL or route
- console error result
- checked states: `loading`, `empty`, `error`, `permission`, if relevant

## 5. Verification Not Run

If verification was not run, the reason must be recorded:

```md
## Not Run

| Command | Reason | Risk |
|---|---|---|
| `npm run build` | dependencies not installed | frontend build regressions not ruled out |
```

“Not enough time” or “should be fine” are not valid verification exemptions.

