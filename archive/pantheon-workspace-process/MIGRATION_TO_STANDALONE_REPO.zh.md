# Migration Plan: Standalone Method Repository

English version: [MIGRATION_TO_STANDALONE_REPO.md](./MIGRATION_TO_STANDALONE_REPO.md)

这份文档定义了如何把可复用的方法栈，从当前工作区迁移到一个专门的独立仓库中。

## 目标

把可发布的方法资产迁移到独立仓库中，同时不破坏：

- method versioning
- repo-shell compatibility
- Pantheon overlay compatibility
- bootstrap 与 smoke verification
- historical traceability

## 目标仓库形态

推荐的新仓库内容：

```text
.github/
agentic-method-kit/
agentic-repo-shell/
pantheon-overlay/
scripts/
archive/
README.md
DISTRIBUTION.md
RELEASE.md
WORKSPACE_MANIFEST.json
```

独立仓库中可选保留：

- `.agents/`，仅当这个 distribution workspace 自身仍然使用共享 adapter docs
- `.codex/`，仅当这个 distribution workspace 自身仍保留 Codex-only helper assets

除非有明确理由，否则不要把以下内容移入独立方法仓库：

- `pantheon-base/`
- `pantheon-ops/`
- 当前工作区根级 `docs/` 中那些只服务 Pantheon 运维的文档
- 当前运行时 `.harness/evidence/` 历史，除非它已被明确纳入 archive 范围

## 必须迁移的内容

必需：

- `agentic-method-kit/`
- `agentic-repo-shell/`
- `pantheon-overlay/`
- `scripts/bootstrap-agentic-repo.ps1`
- `README.md`
- `DISTRIBUTION.md`
- `RELEASE.md`
- `WORKSPACE_MANIFEST.json`
- `archive/`

推荐辅助项：

- `scripts/scaffold-standalone-method-repo.ps1`

只有当独立仓库自身维护流程仍然需要时才迁移：

- 根 `.github/`
- 根 `.agents/`
- 根 `openspec/`
- 根 `docs/harness/`
- 根 `scripts/harness/`
- 根 `SHELL_VERSION.json`

## 应该留在原地的内容

保留在当前 Pantheon 工作区：

- `pantheon-base/`
- `pantheon-ops/`
- `docs/WORKSPACE_INHERITANCE.md`
- `docs/PROJECT_INHERITANCE_TEMPLATE.md`
- `docs/BASE_UPGRADE_WORKFLOW.md`
- 未来所有 Pantheon 工作区运维文档

原因：

这些文件描述的是 Pantheon 作为 consumer ecosystem 的工作方式，而不是通用方法分发本身。

## 推荐终态

迁移完成后：

- 独立仓库成为方法打包与发布的事实源
- Pantheon 工作区变成 consumer workspace + reference implementation host
- Pantheon 专用升级从独立仓库拉取，而不是继续在当前工作区内直接演化方法本身

## 迁移策略

### Option A: Clean History Split

适用场景：

- 你关心包目录本身的文件历史
- 你希望从第一天起就有一条可追踪的独立 git 历史

做法：

1. 创建新仓库。
2. 只复制目标可发布面。
3. 做一个干净的初始导入提交。
4. 如果以后确实需要，再选择性重放或移植历史提交。

除非你强烈要求立刻保留逐文件 ancestry，否则推荐这个选项。

### Option B: History-Preserving Extraction

适用场景：

- `agentic-method-kit/`、`agentic-repo-shell/` 和 `pantheon-overlay/` 的提交 ancestry 比速度更重要

做法：

1. 创建一个专门用于抽取的临时分支。
2. 对目标路径做 filter 或 subtree split。
3. 用筛出的历史重新组装独立仓库。
4. 最后再用一个标准化提交补回共享根文件。

这个方案更重，只有在长期历史考古价值明确时才值得。

## 推荐的实际执行顺序

### Phase 1: 冻结可发布面

迁移前：

1. 停止以下目录的大结构变动：
   - `agentic-method-kit/`
   - `agentic-repo-shell/`
   - `pantheon-overlay/`
2. 确保版本元数据一致。
3. 确保 archive 边界已清理。

退出条件：

- 根级方法检查通过
- shell tests 通过
- overlay tests 通过
- bootstrap smoke 通过

### Phase 2: 创建独立仓库

1. 创建一个新仓库名称，例如：
   - `agentic-method-workspace`
   - `harness-method-workspace`
   - `agentic-method-kit-workspace`
2. 把可发布面复制进去。
3. 仅在描述 overlay 时保留 Pantheon 引用。

实际捷径：

- 运行 `pwsh ./scripts/scaffold-standalone-method-repo.ps1 -TargetPath <path> -Force`

退出条件：

- 新仓库结构符合目标形态
- 没有误带入 `pantheon-base/` 或 `pantheon-ops/`

### Phase 3: 规范化根语义

在新仓库中：

1. 重写任何仍然假设“这里是 Pantheon 工作区”的根级文案。
2. 保留 Pantheon 仅作为：
   - 一个 overlay
   - 一个 reference consumer
3. 把任何仍然带有“项目家族所有权”暗示的根级元数据重命名或改写成“分发所有权”语义。

退出条件：

- 根 README 首先描述的是 distribution workspace
- Pantheon 只作为可选 overlay 或 reference consumer 出现，而不是主身份

### Phase 4: 重接验证链路

在新仓库中：

1. 验证：
   - `node scripts/harness/check-adoption.mjs --strict`
   - `node scripts/harness/check-method-health.mjs --strict`
   - `node --test agentic-repo-shell/scripts/harness/*.test.mjs`
   - `node --test pantheon-overlay/scripts/harness/*.test.mjs`
2. 运行 bootstrap smoke：
   - `pwsh ./scripts/bootstrap-agentic-repo.ps1 -TargetPath .tmp/release-smoke -ApplyPantheonOverlay -Force`
   - `node .tmp/release-smoke/scripts/harness/check-method-health.mjs --strict --root .tmp/release-smoke`
   - `node --test .tmp/release-smoke/scripts/harness/*.test.mjs`

退出条件：

- 所有检查都能在独立仓库中通过
- 且不依赖 `pantheon-base/` 或 `pantheon-ops/`

### Phase 5: 把 Pantheon 工作区切成 Consumer 模式

回到当前工作区：

1. 不再把这里的根方法资产视为主要事实源。
2. 用以下之一替换本地维护流：
   - subtree copy from the standalone repo
   - scripted sync from the standalone repo
   - git submodule reference to the standalone repo
3. 这里只保留 Pantheon consumer 专属文档和集成胶水层。

退出条件：

- 方法演化发生在独立仓库中
- Pantheon 工作区只消费已发布或已同步的方法资产

## Consumer Sync Models

### Model 1: Manual Vendor Copy

简单、明确。

优点：

- 最容易理解
- 不需要特殊 git 模型

缺点：

- drift 可能累积
- 升级是手动的

### Model 2: Git Subtree

优点：

- 文件直接保留在树里
- 对很多团队来说比 submodule 更容易接受

缺点：

- 历史操作更复杂

### Model 3: Git Submodule

优点：

- ownership boundary 很干净
- 版本 pinning 很明确

缺点：

- 运维负担更高
- 很多团队不喜欢 submodule 的使用体验

### Recommendation

对于 Pantheon，优先建议：

1. 独立方法仓库作为事实源
2. Pantheon 工作区通过 subtree 或 scripted sync 消费它

除非“严格 pin 版本”比“可用性”更重要，否则尽量避免 submodule。

## Cutover Checklist

只有当以下都为真时才 cut over：

- 独立仓库已经包含完整的可发布面
- 独立仓库通过 release checks
- bootstrap smoke 在那里通过
- Pantheon 工作区有成文的 consumer-sync 计划
- ownership 已经清晰分界：method repo vs Pantheon consumer workspace

## Post-Cutover Rules

cutover 之后：

- 新的方法开发工作从独立仓库开始
- 属于 overlay 的 Pantheon 专用治理改动也应从那里开始
- Pantheon 工作区只保留 consumer configuration、local adoption 和 reference usage docs

## Minimal Follow-Up Tasks

独立仓库创建完成后，下一步做这些：

1. 增加一份 Pantheon consumption sync policy 文档
2. 为独立仓库增加一条 release smoke CI workflow
3. 增加 changelog / release cadence 规则
4. 增加从独立仓库升级回 Pantheon 工作区的操作流程

