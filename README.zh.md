# Agentic Method Workspace

这是一个独立的、可发布的 agentic 开发方法仓库。

它的职责不是承载某个具体业务项目，而是维护、版本化、验证并发布一套可复用的方法层资产。Pantheon 只是其中一个可选 overlay 场景，不是这个仓库的唯一目标。

## 仓库发布什么

当前仓库按层发布方法能力：

- `agentic-method-kit/`：方法事实源，包含 schema、模板、playbook、版本元数据
- `agentic-repo-shell/`：可复制到业务仓库根目录的壳层，包含适配器、CI 入口、运行时骨架
- `pantheon-overlay/`：可选的 Pantheon 继承治理 overlay
- `docs/harness/`：方法根契约文档
- `scripts/`：bootstrap 与校验脚本
- `.codex/skills/`：项目本地 Codex 技能包，可随仓库一起迁移

下游仓库通常不应该整仓复制当前 repo，而是复制它真正需要的发布面。

## 推荐阅读顺序

如果你要先理解方法本身，建议按下面顺序阅读：

1. [agentic-method-kit/README.md](./agentic-method-kit/README.md)
2. [agentic-method-kit/METHOD_PLAYBOOK.md](./agentic-method-kit/METHOD_PLAYBOOK.md)
3. [docs/harness/HARNESS_ENGINEERING_CONTRACT.md](./docs/harness/HARNESS_ENGINEERING_CONTRACT.md)
4. [docs/harness/AGENT_INTERFACE_CONTRACT.md](./docs/harness/AGENT_INTERFACE_CONTRACT.md)
5. [docs/harness/TASK_PACKET_SPEC.md](./docs/harness/TASK_PACKET_SPEC.md)
6. [docs/harness/VERIFICATION_EVIDENCE_SPEC.md](./docs/harness/VERIFICATION_EVIDENCE_SPEC.md)
7. [docs/harness/REVIEW_LOOP_SPEC.md](./docs/harness/REVIEW_LOOP_SPEC.md)
8. [.agents/README.md](./.agents/README.md)

如果你要做仓库发布或方法迁移，再继续看：

1. [DISTRIBUTION.md](./DISTRIBUTION.md)
2. [RELEASE.md](./RELEASE.md)
3. [MIGRATION_TO_STANDALONE_REPO.md](./MIGRATION_TO_STANDALONE_REPO.md)
4. [STANDALONE_REPO_BOOTSTRAP_CHECKLIST.md](./STANDALONE_REPO_BOOTSTRAP_CHECKLIST.md)
5. [PANTHEON_CONSUMER_SYNC_POLICY.md](./PANTHEON_CONSUMER_SYNC_POLICY.md)
6. [docs/SKILLS.md](./docs/SKILLS.md)

## 新项目怎么用

一个普通新仓库，推荐复制：

1. `agentic-method-kit/`
2. `agentic-repo-shell/`
3. 如需要 Pantheon 继承治理，再加 `pantheon-overlay/`

只有在你要维护方法本身时，才需要直接操作当前根仓库。

## 环境要求

最低要求：

- `git`
- `node` 20+
- PowerShell

建议具备：

- Codex、Claude Code、Cursor 或其他 agent 运行环境

方法本身不强制依赖某个特定 skill 包。skills 是执行层加速器，真正的事实源仍然是仓库中的契约、模板和校验脚本。
如果你希望项目迁移时不再重复安装 skills，建议把项目需要的 skills 保存在 `.codex/skills/`，并通过 `scripts/sync-codex-skills.ps1` 从用户目录刷新。

## 校验与发布

核心发布检查：

```powershell
node scripts/harness/check-adoption.mjs --strict
node scripts/harness/check-method-health.mjs --strict
node --test agentic-repo-shell/scripts/harness/*.test.mjs
node --test pantheon-overlay/scripts/harness/*.test.mjs
```

当前首版元数据为 `1.0.0`，对应：

- [agentic-method-kit/METHOD_VERSION.json](./agentic-method-kit/METHOD_VERSION.json)
- [SHELL_VERSION.json](./SHELL_VERSION.json)
- [WORKSPACE_MANIFEST.json](./WORKSPACE_MANIFEST.json)

## 边界

应该放在这里的：

- 方法契约
- schema 与模板
- tool adapter
- bootstrap 脚本
- release / migration 指南

不应该继续放在这里的：

- 业务应用代码
- 基础产品代码
- 大量项目过程归档
- 下游消费仓库的运行时 evidence
