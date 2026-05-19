# Claude Best-Practice 到 Codex 的概念映射

English version: [CONCEPT_MAP.md](./CONCEPT_MAP.md)

这个文档说明：本 kit 借鉴了 Claude Code best-practice 仓库里的核心方法论，并把它翻译成 Codex 可执行的工作模式。

参考来源：

- GitHub 仓库概览：https://github.com/shanraisshan/claude-code-best-practice

## 映射后的核心思想

### 1. Commands 对应工作流入口

Claude best-practice 把 commands 当作稳定的工作流入口。

在 Codex 里，对应的是：

- 稳定的 playbook 章节
- 可复用的 prompt 进入方式
- 标准化 task packet 模板

### 2. Skills 对应方法模块

Claude best-practice 强调 skills 是可复用能力块。

在 Codex 里，可对应为：

- `superpowers`
- `impeccable`
- `openspec-*`
- `gstack-*`

关键不是“依赖一个神奇系统”，而是“把多个专长模块组合成默认方法”。

### 3. Subagents 对应专职执行者

Claude best-practice 强调按职责切分的 subagents。

在 Codex 里，对应的是：

- `spawn_agent`
- worker / explorer 分工
- 并行且边界清晰的子任务

### 4. Hooks 对应机械化关卡

Claude best-practice 很重视 hooks。

在可迁移仓库里，更通用的对应物是：

- 仓库本地检查脚本
- CI gate
- 模板强制关联

这种做法比依赖单一工具的 hook 运行时更可迁移。

### 5. Memory 对应仓库工件

Claude best-practice 使用不同作用域的 memory。

在可迁移方法里，对应为：

- OpenSpec 变更工件
- task packet
- evidence
- 归档后的 plan / spec

这些内容可检查、可复制，也不会因为切换工具而丢失。

### 6. MCP 和外部工具保持可选

Claude best-practice 里会使用 MCP server 和插件。

这里的可迁移规则是：

- 方法本身不应依赖某一个 MCP 才能成立
- 如果工具存在，它们只是接入同一工作流，而不是重新定义方法

## 最重要的翻译结论

最大的可迁移经验是：

- 不要把工具本身当成方法
- 先把方法显式写清楚，再把不同工具映射进来

这也是为什么本 kit 的中心是：

- playbook
- templates
- schemas
- mechanical closure scripts

而不是某一个工具专属配置文件。
