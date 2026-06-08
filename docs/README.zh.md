# 文档总览

English version: [README.md](./README.md)

这个目录用于整理 `harness-engineering` 的文档入口、阅读顺序和双语维护约定。

## 推荐语言策略

建议采用“中英分拆、互相链接”的方式，而不是在同一份文档里混写中英文。

原因：

- 中文用户可以直接进入 `*.zh.md`。
- 英文文档可以保持对外发布和国际协作的稳定链接。
- diff、审阅、自动校验和后续翻译都更容易维护。
- 单文档双语会让目录、锚点、搜索结果和版本比较变得混乱。

具体规则见：[DOCUMENTATION_I18N_POLICY.zh.md](./DOCUMENTATION_I18N_POLICY.zh.md)

## 文档分组

### 1. 根工作区说明

- [../README.zh.md](../README.zh.md)
- [../README.md](../README.md)
- [../DISTRIBUTION.zh.md](../DISTRIBUTION.zh.md)
- [../DISTRIBUTION.md](../DISTRIBUTION.md)
- [../RELEASE.zh.md](../RELEASE.zh.md)
- [../RELEASE.md](../RELEASE.md)
- [./METHOD_RELEASE_1_0.zh.md](./METHOD_RELEASE_1_0.zh.md)
- [./METHOD_RELEASE_1_0.md](./METHOD_RELEASE_1_0.md)

工作区专属历史流程文档已归档到 [`../archive/pantheon-workspace-process/`](../archive/pantheon-workspace-process/)。它们不属于可移植方法核心。

### 2. Harness 合同

目录：[`./harness/`](./harness/)

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

### 3. Method Kit 方法包

目录：[`../agentic-method-kit/`](../agentic-method-kit/)

建议阅读顺序：

1. [../agentic-method-kit/README.zh.md](../agentic-method-kit/README.zh.md)
2. [../agentic-method-kit/HARNESS_CORE_MODEL.zh.md](../agentic-method-kit/HARNESS_CORE_MODEL.zh.md)
3. [../agentic-method-kit/HARNESS_COVERAGE_MODEL.zh.md](../agentic-method-kit/HARNESS_COVERAGE_MODEL.zh.md)
4. [../agentic-method-kit/HARNESS_TEMPLATE_TAXONOMY.zh.md](../agentic-method-kit/HARNESS_TEMPLATE_TAXONOMY.zh.md)
5. [../agentic-method-kit/TOOL_ADAPTER_MATRIX.zh.md](../agentic-method-kit/TOOL_ADAPTER_MATRIX.zh.md)
6. [../agentic-method-kit/METHOD_PLAYBOOK.zh.md](../agentic-method-kit/METHOD_PLAYBOOK.zh.md)
7. [../agentic-method-kit/HUMAN_AGENT_COLLABORATION_PLATFORM_ASSESSMENT.zh.md](../agentic-method-kit/HUMAN_AGENT_COLLABORATION_PLATFORM_ASSESSMENT.zh.md)
8. [../agentic-method-kit/INSTALL.zh.md](../agentic-method-kit/INSTALL.zh.md)
9. [../agentic-method-kit/UPGRADE.zh.md](../agentic-method-kit/UPGRADE.zh.md)
10. [../agentic-method-kit/MIGRATION.md](../agentic-method-kit/MIGRATION.md)
11. [../agentic-method-kit/CONCEPT_MAP.md](../agentic-method-kit/CONCEPT_MAP.md)
12. [../agentic-method-kit/CHANGELOG.md](../agentic-method-kit/CHANGELOG.md)

### 4. Repo Shell 可复制壳层

目录：[`../agentic-repo-shell/`](../agentic-repo-shell/)

- [../agentic-repo-shell/README.zh.md](../agentic-repo-shell/README.zh.md)
- [../agentic-repo-shell/README.md](../agentic-repo-shell/README.md)
- [../agentic-repo-shell/.agents/README.md](../agentic-repo-shell/.agents/README.md)
- [../agentic-repo-shell/docs/harness/tasks/README.md](../agentic-repo-shell/docs/harness/tasks/README.md)
- [../agentic-repo-shell/openspec/README.md](../agentic-repo-shell/openspec/README.md)
- [../agentic-repo-shell/scripts/harness/README.zh.md](../agentic-repo-shell/scripts/harness/README.zh.md)
- [../agentic-repo-shell/scripts/harness/README.md](../agentic-repo-shell/scripts/harness/README.md)

### 5. 示例 Overlay

目录：[`../sample-overlays/`](../sample-overlays/)

- [../sample-overlays/pantheon/README.zh.md](../sample-overlays/pantheon/README.zh.md)
- [../sample-overlays/pantheon/README.md](../sample-overlays/pantheon/README.md)
- [../sample-overlays/pantheon/docs/WORKSPACE_INHERITANCE.zh.md](../sample-overlays/pantheon/docs/WORKSPACE_INHERITANCE.zh.md)
- [../sample-overlays/pantheon/docs/harness/INHERITANCE_HARNESS_PROTOCOL.md](../sample-overlays/pantheon/docs/harness/INHERITANCE_HARNESS_PROTOCOL.md)

示例 overlay 用来展示下游仓库如何打包项目专属控制项，不是可移植方法核心的必需部分。

### 6. Agent 与 Prompt 资产

- [../.agents/README.md](../.agents/README.md)
- [../.agents/adapters/](../.agents/adapters/)
- [../.agents/prompts/](../.agents/prompts/)

## 维护规则

- 方法事实源先改 `agentic-method-kit/`。
- 如果合同会被下游复制，再同步 `agentic-repo-shell/` 副本。
- 项目专属 scanner、业务架构规则和产品质量门禁放在 overlay 或下游仓库，不放入 portable core。
- 工作区专属流程文档应归档，不留在通用 `docs/` 入口中。
