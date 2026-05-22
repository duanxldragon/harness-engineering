# Pantheon Overlay

English version: [README.md](./README.md)

这个目录是给以下仓库使用的可选 overlay：

- `agentic-method-kit/`
- `agentic-repo-shell/`
- `pantheon-base/`

只有当仓库采用 Pantheon 的 base / business 继承模型时，才应该使用这个 overlay。

## 这个 Overlay 增加了什么

- base / business 继承契约
- Pantheon 专用 PR 模板扩展
- Pantheon 专用 CI 工作流扩展
- Pantheon 专用架构与后端契约检查
- inheritance contract checks
- base drift triage checks
- 一个可供 CI 和工作区验证使用的 overlay health 统一入口
- 显式的 base drift backport policy

## 应用顺序

1. 先引导 `agentic-method-kit/`
2. 再引导 `agentic-repo-shell/`
3. 然后应用 `pantheon-overlay/`
4. 如果仓库使用 Pantheon foundation，再加入 `pantheon-base/`

## 推荐阅读顺序

建议按这个顺序阅读：

1. [README.zh.md](./README.zh.md)
2. [docs/WORKSPACE_INHERITANCE.zh.md](./docs/WORKSPACE_INHERITANCE.zh.md)
3. [docs/PROJECT_INHERITANCE_TEMPLATE.zh.md](./docs/PROJECT_INHERITANCE_TEMPLATE.zh.md)
4. [docs/BASE_UPGRADE_WORKFLOW.zh.md](./docs/BASE_UPGRADE_WORKFLOW.zh.md)
5. [docs/harness/BASE_DRIFT_BACKPORT_POLICY.md](./docs/harness/BASE_DRIFT_BACKPORT_POLICY.md)

## 什么时候使用

只有当你的仓库满足以下条件时才使用这个 overlay：

- 有一个 `pantheon-base` foundation
- 需要区分 base-owned 和 business-owned 变更
- 需要 base drift governance

如果你的项目不采用这套继承模型，就不要应用这个 overlay。

## 这个 Overlay 负责哪些文件

这个 overlay 负责 Pantheon 专用治理层，这些内容不应放进通用 shell：

- 继承与 drift 治理
- boundary checks
- backend response / DTO contract checks
- permission contract checks
- audit coverage checks

它还负责 Pantheon 工作区消费者的参考文档：

- `docs/WORKSPACE_INHERITANCE.md`
- `docs/PROJECT_INHERITANCE_TEMPLATE.md`
- `docs/BASE_UPGRADE_WORKFLOW.md`
- `docs/harness/INHERITANCE_HARNESS_PROTOCOL.md`
- `docs/harness/BASE_DRIFT_BACKPORT_POLICY.md`

## 可执行入口

当目标工作区同时包含 `pantheon-base` 和类似 `pantheon-ops` 的派生业务仓库时，应该使用 overlay 自带的 health 入口。

从 `harness-engineering/` 仓库根目录执行：

```powershell
node harness-engineering/pantheon-overlay/scripts/harness/check-overlay-health.mjs --json --root <workspace>
node --test harness-engineering/pantheon-overlay/scripts/harness/*.test.mjs
```

如果目标仓库已经本地 vendoring 了 `pantheon-overlay/`，就在该本地 overlay 路径下执行对应脚本。

## Overlay Health 契约

`check-overlay-health.mjs` 可以视为 Pantheon 专用层对应的 method health gate。它会验证：

- 必需的 overlay 文档和中英文治理文档是否存在
- `OVERLAY_MANIFEST.json` 是否纳入了 health 入口和 drift policy
- 以下 strict overlay checks 是否能从一个统一入口执行：
  - `check-inheritance-contract.mjs`
  - `check-boundaries.mjs`
  - `check-backend-response-contract.mjs`
  - `check-backend-dto-contract.mjs`
  - `check-permission-contract.mjs`
  - `check-audit-coverage.mjs`
