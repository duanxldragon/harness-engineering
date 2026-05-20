# Harness Engineering

English version: [README.md](./README.md)

Harness Engineering 是一套可移植、工具无关的方法论，用来把 coding agent 和人工评审纳入同一条可验证的软件交付链路。

它的核心判断很简单：agent 交付质量不只是 prompt 问题，更是 harness 问题。你需要明确的契约、受控的 task packet、验证证据、评审门禁和方法健康检查，这样工作才能在不同仓库里重复、审计和升级。

## 这个仓库提供什么

- `agentic-method-kit/`：可移植的方法事实源
- `agentic-repo-shell/`：给新项目复制的仓库壳层
- `pantheon-overlay/`：可选的 Pantheon 专用 overlay
- `docs/harness/`：方法契约和参考文档
- `scripts/`：bootstrap 与校验脚本

## 这套方法的特点

- 工具无关。Codex、Claude Code、Cursor、Copilot、OpenHands，或者人工主导执行，都可以使用同一套仓库契约。
- 控制层清晰分离：guides、sensors、state、gates、templates、adapters。
- 把 verification 和 review artifact 当作正式交付物，而不是实现后的补充说明。
- 可迁移。你复制方法包和仓库壳层到新仓库，而不是每个项目重新发明流程。

## 从哪里开始

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
4. 运行 harness 校验

更完整的仓库导览见 [docs/README.zh.md](./docs/README.zh.md)。

## 当前发布状态

当前版本线：

- method kit `1.0.0`
- repo shell `1.0.0`

版本元数据：

- [agentic-method-kit/METHOD_VERSION.json](./agentic-method-kit/METHOD_VERSION.json)
- [SHELL_VERSION.json](./SHELL_VERSION.json)
- [WORKSPACE_MANIFEST.json](./WORKSPACE_MANIFEST.json)

对外发布说明：

- [docs/METHOD_RELEASE_1_0.zh.md](./docs/METHOD_RELEASE_1_0.zh.md)

## 校验命令

核心检查：

```powershell
node scripts/harness/check-adoption.mjs --strict
node scripts/harness/check-method-health.mjs --strict
node scripts/harness/check-doc-frontmatter.mjs --report-legacy
node --test agentic-repo-shell/scripts/harness/*.test.mjs
node --test pantheon-overlay/scripts/harness/*.test.mjs
```

## 边界

这个仓库用于维护和发布方法本身。

它不应该继续承载业务应用代码、下游仓库的运行时 evidence，或大量项目私有归档。
