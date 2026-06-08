# Distribution Guide

English version: [DISTRIBUTION.md](./DISTRIBUTION.md)

这个工作区以三层结构发布一套可复用的方法栈。

## 主要复制集合

对于一个普通新仓库，复制：

1. `agentic-method-kit/`
2. `agentic-repo-shell/`

只有在需要时再加：

3. `sample-overlays/`

如果你是直接从当前工作区引导新仓库，可使用这个辅助脚本：

4. `scripts/bootstrap-agentic-repo.ps1`

## 每一层的含义

- `agentic-method-kit/`：方法事实源、schemas、templates、playbook、版本元数据
- `agentic-repo-shell/`：仓库本地 shell、adapters、CI 入口、运行时骨架
- `sample-overlays/`：可选示例，用来说明下游仓库如何打包项目专属控制项

## 默认不要复制

不要把整个根工作区整包复制到新的业务仓库。

以下内容不要视为默认复制集合的一部分：

- `archive/`
- 根目录 `docs/`
- 根目录 `.harness/`
- 根目录 `openspec/`
- consumer 产品仓库
- 项目专属 foundation、生成出的应用代码或业务实现

这些路径属于下游消费者或本地维护工作区，不属于可移植方法分发。

## 目标结果

### 通用仓库

使用：

- `agentic-method-kit/`
- `agentic-repo-shell/`

### 带项目 Overlay 的仓库

使用：

- `agentic-method-kit/`
- `agentic-repo-shell/`
- 项目自有 overlay，或仅把 `sample-overlays/pantheon/` 当示例改造

## 复制后的验证

bootstrap 或复制完成后，运行：

```powershell
node scripts/harness/check-adoption.mjs --strict
node scripts/harness/check-method-health.mjs --strict
```

如果应用了某个示例 overlay，还需要运行该下游仓库 CI 所要求的 overlay 自有 tests 和 checks。

历史拆分笔记已归档到：

- [archive/pantheon-workspace-process/MIGRATION_TO_STANDALONE_REPO.zh.md](./archive/pantheon-workspace-process/MIGRATION_TO_STANDALONE_REPO.zh.md)
