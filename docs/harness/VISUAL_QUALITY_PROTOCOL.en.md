# Visual Quality Protocol

Chinese version: [VISUAL_QUALITY_PROTOCOL.md](./VISUAL_QUALITY_PROTOCOL.md)

Type: Contract
Layer: platform
Status: Active

This document defines the visual quality gate for Pantheon UI work. It is part of the tool-agnostic Harness protocol.

## 1. Scope

Any task that affects any of the following must run the visual quality gate:

- page layout
- frontend components
- dashboard / admin / workbench surfaces
- tables, forms, charts
- navigation, modals, drawers, toolbars
- interaction states such as loading, empty, error, permission denied
- responsive or mobile viewports
- visual design system, color, typography, spacing, icons, motion

## 2. Default Skill

Preferred visual quality skill:

```text
impeccable
```

Global Codex location:

```text
C:\Users\xiaolong\.codex\skills\impeccable\SKILL.md
```

If the current tool does not support Codex skills, it must still execute under the same protocol:

1. read this document first
2. use `.agents/prompts/implementation.md`, `.agents/prompts/review.md`, `.agents/prompts/qa.md`
3. write visual evidence into `.harness/evidence/<task-id>/`

## 3. Relationship To Other Design Tools

- `impeccable` is the visual quality gate
- `ui-ux-pro-max` may be used for color, typography, layout, accessibility, and design-system refinement
- gstack / browser / Playwright / manual screenshots may be used for visual evidence
- Figma or other design tools may serve as input or evidence, but not as the only source of truth

## 4. UI Task Packet Requirements

UI tasks must add the following to the task packet:

- UI surface type
- target visual feel
- desktop/mobile viewport verification plan
- empty/loading/error/permission state verification plan
- whether screenshots or browser evidence are required

## 5. Review Gate

UI review must check:

- whether `impeccable` or an equivalent visual quality gate was used
- whether rendered evidence was retained, or a reason for not running was recorded
- whether overflow, overlap, misalignment, weak contrast, or missing states exist
- whether the result matches the restrained, clear, high-density-but-scannable Pantheon admin/workbench style
- whether platform-level keyboard focus exists: interactive elements must have `:focus-visible` or an equivalent visible focus treatment; hover-only behavior is not acceptable
- whether `prefers-reduced-motion: reduce` is respected, and whether large decorative motion on backoffice workbench surfaces is avoided
- whether control sizing is stable: buttons, icon buttons, inputs, selects, date pickers, and similar controls must use Pantheon shell tokens for fixed `min-height` / `line-height`, and hover/loading/focus must not cause layout shifts
- whether decorative pollution is avoided in platform/system shells: no radial gradients, wide decorative linear gradients, non-standard font weights such as 620/650, or leaked raw Arco color tokens outside Pantheon semantic tokens
- whether only one page mode exists: platform/system pages must reuse standard components such as `PageHeader`, `GovernanceSummaryBar`, `FilterPanel`, `ListHeaderActions`, `TableBatchActionBar`, `AppTable`, `FormSection`, `SubmitBar`, and `AppModal`; pages must not invent a second hero/overview/metric/toolbar/dialog/table-card style system
- whether governance summary placement is consistent: governance information belongs at the top of the main work area, before table or form cards; it must not sink below tabs or be nested inside table cards
- if shell breadcrumbs, tabs, or governance summary already provide page positioning, the page must not duplicate a `PageHeader` title inside the page body; governance summary should be the first visual module to avoid redundant vertical whitespace
- whether dialogs and drawers follow the standard entry path: new modal/drawer work must use `AppModal` / `AppDrawer` or a base-approved wrapper, and must not mix multiple size/footer/padding/close-behavior systems directly

P0/P1 visual issues cannot be approved.

## 5.1 Mechanical Contract

`pantheon-base/frontend/scripts/check-shell-visual-contract.mjs` is the mechanical entry point for platform/system backoffice visual contract checking. Derived business repositories must inherit and run equivalent checks. Business repositories may extend visual rules only inside `business/*`; they must not weaken base constraints around focus, motion, control stability, or semantic tokens.

That check should cover at least:

- shell/header/tab/breadcrumb text is not clipped
- `FilterPanel`, `ListHeaderActions`, `TableBatchActionBar`, and `AppTable` keep consistent spacing, radius, and control height
- platform/system surfaces do not allow decorative gradients, non-standard font weights, or leaked raw Arco color tokens
- system settings must use `GovernanceSummaryBar` and must not retain the legacy `setting-page__overview*` style
- dictionary management must place the governance summary before the table card and must not render duplicate governance cards at the bottom of tabs
- dictionary management and system settings must not render page-level `PageHeader` titles, to avoid duplication with shell title and governance summary
- system setting/dict and similar system pages must not contain multiple competing hero/overview/table-card visual modes

Recommended commands:

```text
cd pantheon-base/frontend && npm run check:shell-visual-contract
cd pantheon-ops/frontend && npm run check:shell-visual-contract
```

## 6. Evidence

Recommended evidence structure:

```text
.harness/evidence/<task-id>/
  summary.md
  commands.json
  screenshots/
  visual-review.md
```

If screenshots cannot be produced, the task must record:

- the reason screenshots were not produced
- the risk
- the follow-up verification path

“It should probably look fine” is not an acceptable visual verification conclusion.

## 6.1 Blocking Rule

If a UI task packet declares UI scope and strict mode is enabled in CI, missing screenshot evidence or a missing explicit visual gap record is a blocking harness failure.

