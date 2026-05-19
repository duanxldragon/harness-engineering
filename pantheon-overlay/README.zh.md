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
