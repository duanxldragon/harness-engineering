# Harness Engineering

English version: [README.md](./README.md)

一套可移植、工具无关的 Harness Engineering 方法，用来支撑非 trivial 软件交付中的 coding agent 协作和人工评审。

agent 交付质量不只是 prompt 问题，更是 harness 问题。如果你想要可重复的软件交付，就需要明确契约、受控 task packet、验证证据、review closure 和可升级的检查器。

## 为什么会有这个仓库

很多团队把 coding agent 接进真实开发之后，最后都会撞到同一堵墙：

- prompt 不稳定
- 任务边界漂移
- verification 很随意
- review 留在聊天记录里，而不是可复用 artifact
- 一换工具，整套工作流就要重搭

这个仓库发布的，就是缺失的那一层方法。

## 这个仓库提供什么

- `agentic-method-kit/`，可移植的方法事实源
- `agentic-repo-shell/`，给新项目复制的仓库壳层
- `pantheon-overlay/`，可选的 Pantheon 专用 overlay
- `docs/harness/`，方法契约和参考文档
- `scripts/`，bootstrap 与校验脚本

## 这套方法的核心点

- 工具无关。Codex、Claude Code、Cursor、Copilot、OpenHands，或者人工主导执行，都可以接同一套仓库契约。
- 控制层显式分离。guides、sensors、state、gates、templates、adapters 是故意拆开的。
- 闭环可沉淀。task packet、evidence、review artifact、failure registry update 都属于正式交付物。
- 接入可迁移。你把方法复制进仓库，而不是每个项目重新发明一套流程。

## Quick Start

如果你想先理解方法本身：

1. [agentic-method-kit/README.zh.md](./agentic-method-kit/README.zh.md)
2. [agentic-method-kit/HARNESS_CORE_MODEL.zh.md](./agentic-method-kit/HARNESS_CORE_MODEL.zh.md)
3. [agentic-method-kit/HARNESS_COVERAGE_MODEL.zh.md](./agentic-method-kit/HARNESS_COVERAGE_MODEL.zh.md)
4. [agentic-method-kit/HARNESS_TEMPLATE_TAXONOMY.zh.md](./agentic-method-kit/HARNESS_TEMPLATE_TAXONOMY.zh.md)
5. [agentic-method-kit/TOOL_ADAPTER_MATRIX.zh.md](./agentic-method-kit/TOOL_ADAPTER_MATRIX.zh.md)
6. [agentic-method-kit/METHOD_PLAYBOOK.zh.md](./agentic-method-kit/METHOD_PLAYBOOK.zh.md)

如果你想把它接入一个新仓库：

1. 复制 `agentic-method-kit/`
2. 复制 `agentic-repo-shell/`
3. 按需叠加 `pantheon-overlay/`
4. 运行 harness 检查

## 推荐入口

- 发布说明：[docs/METHOD_RELEASE_1_0.zh.md](./docs/METHOD_RELEASE_1_0.zh.md)
- 对外文案包：[docs/METHOD_RELEASE_1_0_SOCIAL.zh.md](./docs/METHOD_RELEASE_1_0_SOCIAL.zh.md)
- 完整文档导览：[docs/README.zh.md](./docs/README.zh.md)

## 当前状态

当前版本线：

- method kit `1.0.0`
- repo shell `1.0.0`

版本元数据：

- [agentic-method-kit/METHOD_VERSION.json](./agentic-method-kit/METHOD_VERSION.json)
- [SHELL_VERSION.json](./SHELL_VERSION.json)
- [WORKSPACE_MANIFEST.json](./WORKSPACE_MANIFEST.json)

## 校验命令

```powershell
node scripts/harness/check-adoption.mjs --strict
node scripts/harness/check-method-health.mjs --strict
node scripts/harness/check-doc-frontmatter.mjs --report-legacy
node --test agentic-repo-shell/scripts/harness/*.test.mjs
node --test pantheon-overlay/scripts/harness/*.test.mjs
```

## 边界

这个仓库维护和发布的是方法本身。

它不应该继续承载业务应用代码、下游运行时 evidence，或项目私有归档。
