# Harness 脚本目录

English version: [README.md](./README.md)

这个目录存放仓库本地的 Harness Engineering 检查脚本。

`agentic-method-kit/` 是可迁移的方法事实来源；这里是当前工作区对这些规则的执行层。

这些脚本可被 Codex、Claude Code、Cursor、GitHub Copilot、OpenHands、Aider 或人工流程共同调用，不绑定某一个代理工具。

## 当前脚本

### `check-task-packet.mjs`

按 `docs/harness/TASK_PACKET_SPEC.md` 校验任务包 Markdown 结构。

### `check-boundaries.mjs`

报告 Pantheon base / business 继承模型中的跨层导入风险。

### `check-evidence.mjs`

校验 `.harness/evidence/**/commands.json` 下的验证证据结构。

### `check-review.mjs`

校验 `.harness/evidence/**/review.md` 下的 machine-readable review artifacts。

### `check-template-health.mjs`

检查仓库是否具备最小通用 template-governance 面。

### `check-runtime-evidence.mjs`

报告 runtime-sensitive 任务在 evidence 中缺少 runtime logs / metrics / traces / performance 信号或显式 runtime gap 的情况。

### `check-doc-links.mjs`

检查方法与 harness 文档中的内部 Markdown 链接完整性。

### `check-doc-inventory.mjs`

检查关键文档与脚本清单 README 是否列出了它们声明治理的文件。

### `check-sync-drift.mjs`

检查根脚本与 repo-shell 镜像脚本是否仍保持同步。

### `check-backend-response-contract.mjs`

检查是否绕过共享响应封装，直接输出 Gin JSON 响应。

### `check-failure-registry.mjs`

校验 Harness failure registry Markdown 表格，覆盖必需列、枚举值、必填字段、`FR-001` 编号格式，以及未替换的模板占位行。

### Policy 关联

- trivial / non-trivial 判定：`docs/harness/TRIVIALITY_CLASSIFICATION_POLICY.md`
- visual evidence 晋升规则：`docs/harness/VISUAL_EVIDENCE_PROMOTION_POLICY.md`
- failure registry 晋升规则：`docs/harness/FAILURE_REGISTRY_PROMOTION_POLICY.md`
- 继承关系与同步收口检查：`check-inheritance-contract.mjs`

如需完整命令、参数与退出码语义，请看英文原文 [README.md](./README.md)。
