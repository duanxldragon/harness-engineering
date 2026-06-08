# Base Drift Backport Policy

Chinese version: [BASE_DRIFT_BACKPORT_POLICY.md](./BASE_DRIFT_BACKPORT_POLICY.md)

本策略定义：在 Pantheon 派生仓库里发现 drift 时，哪些情况必须先回流 `pantheon-base`，哪些情况可以保留在本地，以及每种决策必须保留哪些证据。

## 1. 适用范围

当仓库使用 Pantheon 继承模型，并且 overlay 自带 drift 检查报告出以下任一类别时，本策略生效：

- `generic drift`
- `pseudo-drift`
- `business mount`
- `business-specific drift`
- `base-only`
- `business-only`

## 2. 默认决策

除非已有更严格的 base contract，否则默认按下表处理：

| Drift category | Default decision |
|---|---|
| `generic drift` | 先回流到 `pantheon-base` |
| `pseudo-drift` | 不要继续本地扩张；在可行时折叠或删除 |
| `business mount` | 只有在它是最窄显式扩展接缝时才保留 |
| `business-specific drift` | 只有具备业务 contract 或 acceptance 证据时才允许本地保留 |
| `base-only` | 复核业务仓库是否漏掉了应继承的 base 文件 |
| `business-only` | 只有在明确属于 `business/*` ownership 时才保留 |

## 3. 必须回流 Base 的情况

只要满足以下任一条件，就必须先在 `pantheon-base` 提案，而不能直接把它当作业务仓库的常态本地差异：

- 修改了 `platform` 或 `system/*` 行为
- 改进了共享 response、DTO、permission、audit、i18n、routing 或 layout 规则
- 修复了同样可能影响其他派生业务仓库的缺陷
- 引入了其他业务模块也可能需要的共享扩展接缝

这类变更如果只留在 `pantheon-ops`，本质上是方法漂移，不是本地优化。

## 4. 可以保留在本地的情况

只有在以下条件全部满足时，变更才可以留在业务仓库：

- 该变更有业务 contract、design、acceptance note 或 audit note 作为锚点
- 变更范围局限在 `business/*` ownership 或显式 mount point
- 没有重定义 base contract 或共享 base 语义
- drift 报告把它归类为 `business-specific drift`、`business-only` 或已接受的 `business mount`

## 5. 必须保留的证据

每一条 triaged drift 决策都必须留下证据，至少包括：

- `triage-base-drift.mjs` 给出的 drift category
- 该变更到底是 base-owned 还是 business-owned
- 支撑该决策的文档或验收锚点
- 决策之后执行过的验证命令集合
- 如需回流，对应的 backport issue、base PR 或显式 waiver

建议把这些证据放在：

- task packet 的决策备注里
- `.harness/evidence/<task-id>/commands.json`
- review artifact 的引用里
- 如果 base version 变化，则同步写入 `docs/PROJECT_INHERITANCE.md`

## 6. Human Gate

以下动作必须经过人工确认：

- 删除 inherited base file 的本地 override
- 决定不回流某个 `generic drift`
- 把 `business mount` 扩大到超过最窄扩展接缝
- 修改 `docs/PROJECT_INHERITANCE.md` 中固定的 base version

## 7. CI 使用方式

建议通过 overlay 的统一健康入口，把这份策略变成可执行检查：

```powershell
node harness-engineering/sample-overlays/pantheon/scripts/harness/check-overlay-health.mjs --json --root <workspace>
node harness-engineering/sample-overlays/pantheon/scripts/harness/triage-base-drift.mjs --json --root <workspace> --business pantheon-ops
```

如果目标仓库已经本地 vendoring 了 overlay，就在目标仓库内运行本地副本。
