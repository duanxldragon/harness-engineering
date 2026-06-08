# Standalone Repo Bootstrap Checklist

English version: [STANDALONE_REPO_BOOTSTRAP_CHECKLIST.md](./STANDALONE_REPO_BOOTSTRAP_CHECKLIST.md)

这份清单用于“创建独立方法仓库的那一天”。

## 目标

创建一个干净的独立仓库，它可以发布并验证：

- `agentic-method-kit/`
- `agentic-repo-shell/`
- `pantheon-overlay/`

而且不依赖 `pantheon-base/` 或 `pantheon-ops/`。

## Phase 1: 在当前工作区准备

- [ ] `agentic-method-kit/` 处于可发布状态
- [ ] `agentic-repo-shell/` 处于可发布状态
- [ ] `pantheon-overlay/` 处于可发布状态
- [ ] archive 边界已经清理
- [ ] 根 `README.md`、`DISTRIBUTION.md`、`RELEASE.md` 和 `WORKSPACE_MANIFEST.json` 已体现 distribution 语义
- [ ] `MIGRATION_TO_STANDALONE_REPO.md` 中已有迁移预案

验证：

- [ ] `node scripts/harness/check-adoption.mjs --strict`
- [ ] `node scripts/harness/check-method-health.mjs --strict`
- [ ] `node --test agentic-repo-shell/scripts/harness/*.test.mjs`
- [ ] `node --test pantheon-overlay/scripts/harness/*.test.mjs`

## Phase 2: 创建新仓库

- [ ] 创建新的 git 仓库
- [ ] 选定最终仓库名称
- [ ] 只复制预期的可发布面
- [ ] 确认 `pantheon-base/` 不存在
- [ ] 确认 `pantheon-ops/` 不存在
- [ ] 确认根 `docs/` 如果保留，也只包含 distribution-owned material

推荐初始内容：

- [ ] `agentic-method-kit/`
- [ ] `agentic-repo-shell/`
- [ ] `pantheon-overlay/`
- [ ] `scripts/bootstrap-agentic-repo.ps1`
- [ ] `README.md`
- [ ] `DISTRIBUTION.md`
- [ ] `RELEASE.md`
- [ ] `WORKSPACE_MANIFEST.json`
- [ ] `archive/`

## Phase 3: 规范化根目录

- [ ] 根 README 描述的是 distribution workspace，而不是 Pantheon workspace
- [ ] Pantheon 只被描述为 overlay 或 reference consumer
- [ ] 没有根级文档声称正常使用必须依赖 `pantheon-base` 或 `pantheon-ops`
- [ ] 任何残留的根级元数据都已摆脱 project-family 语义

## Phase 4: 重接验证链路

- [ ] 确认根级方法检查在独立仓库中可运行
- [ ] 确认 shell tests 在独立仓库中可运行
- [ ] 确认 overlay tests 在独立仓库中可运行
- [ ] 确认 bootstrap smoke 在独立仓库中可运行

命令：

```powershell
node scripts/harness/check-adoption.mjs --strict
node scripts/harness/check-method-health.mjs --strict
node --test agentic-repo-shell/scripts/harness/*.test.mjs
node --test pantheon-overlay/scripts/harness/*.test.mjs
pwsh ./scripts/bootstrap-agentic-repo.ps1 -TargetPath .tmp/release-smoke -ApplyPantheonOverlay -Force
node .tmp/release-smoke/scripts/harness/check-method-health.mjs --strict --root .tmp/release-smoke
node --test .tmp/release-smoke/scripts/harness/*.test.mjs
```

## Phase 5: 首次提交与发布基线

- [ ] 创建初始导入提交
- [ ] 记录首个发布基线版本
- [ ] 确认 method kit 与 repo shell 之间的兼容性元数据
- [ ] 创建或更新 changelog 条目
- [ ] 创建首个独立发布 tag 或 release note

## Phase 6: Pantheon Consumer Cutover

- [ ] 记录 Pantheon 将如何消费上游
- [ ] 不再把 Pantheon 工作区视为方法资产的事实源
- [ ] 采用 `PANTHEON_CONSUMER_SYNC_POLICY.md`
- [ ] 创建第一份下游同步计划

## Exit Criteria

只有当以下都满足时，bootstrap day 才算完成：

- [ ] 独立仓库通过所有方法检查
- [ ] 独立仓库通过所有 shell 和 overlay tests
- [ ] bootstrap smoke 在那里通过
- [ ] Pantheon 已有成文的 consumer sync policy
- [ ] ownership boundaries 已明确

