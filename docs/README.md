# Documentation Index

Chinese version: [README.zh.md](./README.zh.md)

This directory provides the documentation entry points, reading order, and bilingual maintenance rules for `harness-engineering`.

## Recommended Language Strategy

Use separate Chinese and English files with cross-links instead of placing Chinese and English in the same document.

Why:

- Chinese-speaking users can read `*.zh.md` directly.
- English files keep stable external links for broader collaboration.
- diffs, reviews, validation, and future translation are easier to maintain.
- mixed-language single files make anchors, search, and version comparisons harder to maintain.

See: [DOCUMENTATION_I18N_POLICY.md](./DOCUMENTATION_I18N_POLICY.md)

## Document Groups

### 1. Pantheon Harness Methodology

Directory: [`./methodology/`](./methodology/)

> 这是 Pantheon Harness 方法论的**唯一 canonical 源**。所有"怎么干活"的文档都在这里。

- [HARNESS_METHODOLOGY.zh.md](./methodology/HARNESS_METHODOLOGY.zh.md) — **入口**：三权分立、工作流全景、质量门禁、文档体系
- [WORKFLOW_ROUTING.md](./methodology/WORKFLOW_ROUTING.md) — 工具路由决策树
- [TASK_DELEGATION_TEMPLATE.md](./methodology/TASK_DELEGATION_TEMPLATE.md) — Claude→Codex 任务委派标准模板
- [ACCEPTANCE_CHECKLIST.zh.md](./methodology/ACCEPTANCE_CHECKLIST.zh.md) — 非程序员验收清单
- [EVOLUTION.md](./methodology/EVOLUTION.md) — 方法论自身的演化机制
- [RETROSPECTIVE_TEMPLATE.md](./methodology/RETROSPECTIVE_TEMPLATE.md) — 月度复盘模板
- [codex-development-process-improvement.md](./methodology/codex-development-process-improvement.md) — 流程增强背景
- [codex-workflow-quick-reference.md](./methodology/codex-workflow-quick-reference.md) — 命令速查

**版本：** `1.0.0`（[CHANGELOG](../CHANGELOG.md)、[VERSION](../VERSION)）

### 2. Workspace Root Guides

- [../README.md](../README.md)
- [../README.zh.md](../README.zh.md)
- [../DISTRIBUTION.md](../DISTRIBUTION.md)
- [../DISTRIBUTION.zh.md](../DISTRIBUTION.zh.md)
- [../RELEASE.md](../RELEASE.md)
- [../RELEASE.zh.md](../RELEASE.zh.md)
- [./METHOD_RELEASE_1_0.md](./METHOD_RELEASE_1_0.md)
- [./METHOD_RELEASE_1_0.zh.md](./METHOD_RELEASE_1_0.zh.md)

Workspace-specific historical process docs are archived under [`../archive/pantheon-workspace-process/`](../archive/pantheon-workspace-process/). They are not part of the portable method core.

### 2. Harness Contracts

Directory: [`./harness/`](./harness/)

- [./harness/HARNESS_ENGINEERING_CONTRACT.md](./harness/HARNESS_ENGINEERING_CONTRACT.md)
- [./harness/HARNESS_METHOD_PLAYBOOK.md](./harness/HARNESS_METHOD_PLAYBOOK.md)
- [./harness/AGENT_INTERFACE_CONTRACT.md](./harness/AGENT_INTERFACE_CONTRACT.md)
- [./harness/TASK_PACKET_SPEC.md](./harness/TASK_PACKET_SPEC.md)
- [./harness/VERIFICATION_EVIDENCE_SPEC.md](./harness/VERIFICATION_EVIDENCE_SPEC.md)
- [./harness/REVIEW_LOOP_SPEC.md](./harness/REVIEW_LOOP_SPEC.md)
- [./harness/DOCUMENT_FRONTMATTER_SPEC.md](./harness/DOCUMENT_FRONTMATTER_SPEC.md)
- [./harness/TOOL_ADAPTERS.md](./harness/TOOL_ADAPTERS.md)
- [./harness/VISUAL_QUALITY_PROTOCOL.md](./harness/VISUAL_QUALITY_PROTOCOL.md)
- [./harness/TRIVIALITY_CLASSIFICATION_POLICY.md](./harness/TRIVIALITY_CLASSIFICATION_POLICY.md)
- [./harness/FAILURE_RATCHET_POLICY.md](./harness/FAILURE_RATCHET_POLICY.md)
- [./harness/FAILURE_REGISTRY_PROMOTION_POLICY.md](./harness/FAILURE_REGISTRY_PROMOTION_POLICY.md)
- [./harness/HARNESS_RETIREMENT_REVIEW.md](./harness/HARNESS_RETIREMENT_REVIEW.md)
- [./harness/HARNESS_OPEN_TASKS.md](./harness/HARNESS_OPEN_TASKS.md)

### 3. Method Kit

Directory: [`../agentic-method-kit/`](../agentic-method-kit/)

Suggested reading order:

1. [../agentic-method-kit/README.md](../agentic-method-kit/README.md)
2. [../agentic-method-kit/HARNESS_CORE_MODEL.md](../agentic-method-kit/HARNESS_CORE_MODEL.md)
3. [../agentic-method-kit/HARNESS_COVERAGE_MODEL.md](../agentic-method-kit/HARNESS_COVERAGE_MODEL.md)
4. [../agentic-method-kit/HARNESS_TEMPLATE_TAXONOMY.md](../agentic-method-kit/HARNESS_TEMPLATE_TAXONOMY.md)
5. [../agentic-method-kit/TOOL_ADAPTER_MATRIX.md](../agentic-method-kit/TOOL_ADAPTER_MATRIX.md)
6. [../agentic-method-kit/METHOD_PLAYBOOK.md](../agentic-method-kit/METHOD_PLAYBOOK.md)
7. [../agentic-method-kit/HUMAN_AGENT_COLLABORATION_PLATFORM_ASSESSMENT.md](../agentic-method-kit/HUMAN_AGENT_COLLABORATION_PLATFORM_ASSESSMENT.md)
8. [../agentic-method-kit/INSTALL.md](../agentic-method-kit/INSTALL.md)
9. [../agentic-method-kit/UPGRADE.md](../agentic-method-kit/UPGRADE.md)
10. [../agentic-method-kit/MIGRATION.md](../agentic-method-kit/MIGRATION.md)
11. [../agentic-method-kit/CONCEPT_MAP.md](../agentic-method-kit/CONCEPT_MAP.md)
12. [../agentic-method-kit/CHANGELOG.md](../agentic-method-kit/CHANGELOG.md)

### 4. Repo Shell

Directory: [`../agentic-repo-shell/`](../agentic-repo-shell/)

- [../agentic-repo-shell/README.md](../agentic-repo-shell/README.md)
- [../agentic-repo-shell/README.zh.md](../agentic-repo-shell/README.zh.md)
- [../agentic-repo-shell/.agents/README.md](../agentic-repo-shell/.agents/README.md)
- [../agentic-repo-shell/docs/harness/tasks/README.md](../agentic-repo-shell/docs/harness/tasks/README.md)
- [../agentic-repo-shell/openspec/README.md](../agentic-repo-shell/openspec/README.md)
- [../agentic-repo-shell/scripts/harness/README.md](../agentic-repo-shell/scripts/harness/README.md)
- [../agentic-repo-shell/scripts/harness/README.zh.md](../agentic-repo-shell/scripts/harness/README.zh.md)

### 5. Example Overlays

Directory: [`../sample-overlays/`](../sample-overlays/)

- [../sample-overlays/pantheon/README.md](../sample-overlays/pantheon/README.md)
- [../sample-overlays/pantheon/README.zh.md](../sample-overlays/pantheon/README.zh.md)
- [../sample-overlays/pantheon/docs/WORKSPACE_INHERITANCE.md](../sample-overlays/pantheon/docs/WORKSPACE_INHERITANCE.md)
- [../sample-overlays/pantheon/docs/harness/INHERITANCE_HARNESS_PROTOCOL.md](../sample-overlays/pantheon/docs/harness/INHERITANCE_HARNESS_PROTOCOL.md)

Example overlays demonstrate how downstream repositories can package project-specific controls. They are not required by the portable method core.

### 6. Agent And Prompt Assets

- [../.agents/README.md](../.agents/README.md)
- [../.agents/adapters/](../.agents/adapters/)
- [../.agents/prompts/](../.agents/prompts/)

## Maintenance Rules

- Keep method source-of-truth changes in `agentic-method-kit/` first.
- Keep repo-shell copies synchronized when a contract is meant to be copied into downstream repositories.
- Keep project-specific scanners, business architecture rules, and product quality gates in overlays or downstream repositories, not in the portable core.
- Archive workspace-specific process docs instead of leaving them in the generic `docs/` entry path.
