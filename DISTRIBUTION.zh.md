# Distribution Guide

English version: [DISTRIBUTION.md](./DISTRIBUTION.md)

这个工作区以三层结构发布一套可复用的方法栈。

## 主要复制集合

对于一个普通新仓库，复制：

1. `agentic-method-kit/`
2. `agentic-repo-shell/`

只有在需要时再加：

3. `pantheon-overlay/`

如果你是直接从当前工作区引导新仓库，可使用这个辅助脚本：

4. `scripts/bootstrap-agentic-repo.ps1`

## 每一层的含义

- `agentic-method-kit/`：方法事实源、schemas、templates、playbook、版本元数据
- `agentic-repo-shell/`：仓库本地 shell、adapters、CI 入口、运行时骨架
- `pantheon-overlay/`：Pantheon 专用的 inheritance、drift、architecture 和 backend governance

## 默认不要复制

不要把整个根工作区整包复制到新的业务仓库。

以下内容不要视为默认复制集合的一部分：

- `archive/`
- 根目录 `docs/`
- 根目录 `.harness/`
- 根目录 `openspec/`
- `pantheon-base/`
- `pantheon-ops/`

这些路径存在的目的是维护、参考、历史追踪，或者 Pantheon 专用的工作区运作。

## 目标结果

### 通用仓库

使用：

- `agentic-method-kit/`
- `agentic-repo-shell/`

### Pantheon 派生仓库

使用：

- `agentic-method-kit/`
- `agentic-repo-shell/`
- `pantheon-overlay/`
- 如果仓库依赖该 foundation，可选加入 `pantheon-base/`

## 复制后的验证

bootstrap 或复制完成后，运行：

```powershell
node scripts/harness/check-adoption.mjs --strict
node scripts/harness/check-method-health.mjs --strict
```

如果应用了 `pantheon-overlay/`，还需要运行该仓库 CI 所要求的 overlay 自有 tests 和 checks。

如果你计划把这套方法彻底从当前工作区拆出来，请继续阅读：

- [MIGRATION_TO_STANDALONE_REPO.md](./MIGRATION_TO_STANDALONE_REPO.md)

