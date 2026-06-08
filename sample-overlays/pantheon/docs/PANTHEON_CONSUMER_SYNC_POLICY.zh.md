# Pantheon Consumer Sync Policy

English version: [PANTHEON_CONSUMER_SYNC_POLICY.md](./PANTHEON_CONSUMER_SYNC_POLICY.md)

这份文档定义了 cutover 之后，Pantheon 工作区应如何消费独立方法仓库。

## 目标

当独立方法仓库成为事实源之后：

- Pantheon 不再在本地直接演化方法本身
- Pantheon 明确导入已发布或已批准的方法变更
- Pantheon 的本地定制仅限 consumer-only files

## Source Of Truth

cutover 之后：

- 独立方法仓库拥有：
  - `agentic-method-kit/`
  - `agentic-repo-shell/`
  - `sample-overlays/pantheon/`
  - 方法分发相关的根级文档
- Pantheon 工作区拥有：
  - `pantheon-base/`
  - `pantheon-ops/`
  - Pantheon 工作区运维文档
  - consumer-specific integration glue

## 推荐同步模型

优先模型：

1. 独立仓库作为 upstream
2. Pantheon 工作区作为 downstream consumer
3. 通过 subtree 或 scripted copy 同步

避免：

- 在 Pantheon 中先直接修改 upstream-owned method files
- 让 Pantheon drift 反过来变成真实事实源

## Ownership Boundaries

### Pantheon 中由 Upstream 拥有的内容

除非有明确记录的本地 fork，这些内容都应与独立仓库保持一致：

- `agentic-method-kit/`
- `agentic-repo-shell/`
- `sample-overlays/pantheon/`
- `scripts/bootstrap-agentic-repo.ps1`
- 从 upstream 复制下来的根级 distribution docs

### Pantheon 自有内容

这些内容保持为 Pantheon 本地资产：

- `pantheon-base/`
- `pantheon-ops/`
- `docs/WORKSPACE_INHERITANCE.md`
- `docs/PROJECT_INHERITANCE_TEMPLATE.md`
- `docs/BASE_UPGRADE_WORKFLOW.md`
- 其他不属于通用分发面的 Pantheon 运维文档

## 允许的本地修改

Pantheon 本地只应修改：

- 指向独立仓库的 consumer-specific references
- 本地 upgrade notes
- 本地 sync bookkeeping
- Pantheon 业务 / foundation 仓库及其相关文档

如果某个改动影响到了 upstream-owned method assets，它必须先回到 upstream，除非有记录在案的紧急分叉。

## 同步触发条件

在这些场景下，从 upstream 同步：

- 发布了新的方法版本
- Pantheon 需要方法 bugfix
- Pantheon 需要一个本应属于 upstream 的 overlay enhancement
- release smoke 或 adoption checks 暴露出下游 drift

## 同步流程

### Normal Upgrade

1. 选择要消费的 upstream release 或 commit。
2. 创建 Pantheon upgrade branch。
3. 把 upstream-owned paths 同步进工作区。
4. 运行验证：
   - `node scripts/harness/check-adoption.mjs --strict`
   - `node scripts/harness/check-method-health.mjs --strict`
   - `node --test agentic-repo-shell/scripts/harness/*.test.mjs`
   - `node --test sample-overlays/pantheon/scripts/harness/*.test.mjs`
5. 如果 shell 或 overlay 有变化，运行 bootstrap smoke。
6. 审查下游冲突或本地 overrides。
7. 带上明确的 upstream version notes 落地这次升级。

### Emergency Patch

只有在 Pantheon 被阻塞、且 upstream 响应过慢时才使用。

1. 立即记录本地分歧。
2. 只打最小下游补丁。
3. 创建一个 upstream backport task。
4. 在下一次 upstream sync 时移除或收敛这段本地分歧。

## Drift Policy

drift 分类：

- acceptable：本地 consumer bookkeeping
- temporary：等待 upstream 收敛的紧急分叉
- unacceptable：upstream-owned method logic 只在 Pantheon 中演化

不可接受的 drift 必须被视为方法治理 bug。

## 版本记录

每次 Pantheon 同步都应记录：

- upstream repository URL 或标识
- upstream version 或 commit
- 本次同步的路径
- 本地例外项（如有）
- 实际运行过的 verification commands

推荐记录位置：

```text
docs/METHOD_UPGRADE_LOG.md
```

或其他同样明确、由 consumer 自有维护的 upgrade log。

## Review Requirements

每次同步审查都应回答：

- Pantheon 是否本地修改了任何 upstream-owned file
- 如果修改了，这个改动是否应该回到 upstream
- 这次同步是否留下了未记录的分歧
- bootstrap 和方法检查是否仍然通过

## 默认规则

当你不确定时：

- upstream first
- Pantheon second

consumer workspace 不应该变成这套方法的隐藏事实源。
