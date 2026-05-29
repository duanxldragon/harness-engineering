# Codex 开发流程增强卡

English version: [CODEX_DEVELOPMENT_PROCESS.md](./CODEX_DEVELOPMENT_PROCESS.md)

类型：Guide
归属层：platform
状态：Active

这份文档是 Pantheon 工作区里给 Codex 使用的默认开发流程入口。它不是新的工具，也不是新的 gate，而是把已有的仓库规则、harness 协议、视觉门禁和验证习惯压成一张可携带的流程卡。

## 1. 先读什么

非 trivial 任务开始前，优先按目标仓库读对应入口：

1. `pantheon-base/AGENTS.md`
2. `pantheon-ops/CLAUDE.md`
3. `pantheon-ops/AGENTS.md`
4. `harness-engineering/docs/harness/HARNESS_ENGINEERING_CONTRACT.md`
5. `harness-engineering/docs/harness/AGENT_INTERFACE_CONTRACT.md`
6. `harness-engineering/docs/harness/TASK_PACKET_SPEC.md`
7. `harness-engineering/docs/harness/VERIFICATION_EVIDENCE_SPEC.md`
8. `harness-engineering/docs/harness/REVIEW_LOOP_SPEC.md`
9. `harness-engineering/docs/harness/INHERITANCE_HARNESS_PROTOCOL.md`

## 2. 默认判断顺序

先判这四件事，再动代码：

1. 目标仓库是 `pantheon-base`、`pantheon-ops`，还是 `harness-engineering`。
2. 任务层级是 `platform`、`system/*`，还是 `business/*`。
3. 这次改动属于 `小改`、`标准功能`、`UI 任务`、`继承同步`、`低代码生成`，还是 `高风险操作`。
4. 这次任务已经覆盖到哪些验证和证据。

如果信息不全，先从仓库里推断；推断会带来风险时，再问用户。

## 2.2 最小任务包

如果任务不是 trivial，优先使用一个最小 task packet，而不是自由描述。

推荐字段：

- 目标仓库
- 层级
- 任务模式：`review`、`implement`、`ui`、`inheritance-sync`、`smoke`、`docs`
- 必读文档
- 实现范围
- 同步要求：仅本仓还是 `base -> ops`
- 验证方式
- 是否存在阶段停点

推荐模板：

```text
目标仓库：
层级：
任务模式：
先读：
实现范围：
同步要求：
验证方式：
停点：
```

## 2.1 CodeGraph 检索优先级

如果目标仓库已初始化 CodeGraph，结构性代码探索先走图谱，再读取文件：

- 用 `codegraph status <repo>` 确认索引是否可用。
- 用 `codegraph context -p <repo> "<task>"` 获取任务相关上下文。
- 用 `codegraph query/callers/callees/impact -p <repo> ...` 定位符号、调用和影响面。
- 只有在找字面量、日志、文案、注释，或图谱结果已经给出具体文件后，才转用 `rg` / `Get-Content`。

不要先做大范围 grep + 全文件阅读；目标是用图谱把上下文压到最小可验证范围。

## 3. 已确认的高频重复流程

### 3.1 UI 视觉门禁

适用：

- dashboard、工作台、列表页、表单页、表格、弹窗、抽屉、响应式布局。

默认要求：

- 先读 `DESIGN.md`、`FRONTEND_UI_SPEC`、页面模板或局部视觉规范。
- 实现后必须给出 rendered evidence，或者明确说明为什么无法渲染。
- 页面必须同时考虑 loading、empty、error、forbidden、submitting 状态。

### 3.2 smoke / 验收矩阵

适用：

- 页面改动、路由改动、权限改动、i18n 改动、seed 改动、生成器改动、业务模块闭环。

默认要求：

- 先选最小验证集，再决定是否扩大到 smoke。
- 变更面和测试面要同轮更新，不能把“测试后补”留到回归阶段。

### 3.3 i18n 生命周期治理

适用：

- 新增/删除模块、删除生成物、修改错误 key、菜单标题、导入导出文案、长期占位值清理。

默认要求：

- 新模块要同步 seed、前端资源、后端错误 key、菜单 titleKey。
- 删除模块时要同步清理 generated 资源，并明确 observe / archive / delete。

### 3.4 base -> ops 继承同步

适用：

- `pantheon-base` 更新后同步到 `pantheon-ops`。
- ops 页面布局、系统域、生成器、i18n 与 base 漂移。

默认要求：

- 通用后台能力优先回 base 修。
- ops 只保留 `business/*` 业务差异和继承说明。
- 同步后要分别验证 base 和 ops 的最小启动、build、smoke。

### 3.4.1 默认不用再重复解释的协同规则

以下规则在 Pantheon 工作区内已经足够稳定，后续应视为默认上下文：

- `pantheon-base` 拥有 `platform` 和 `system/*` 的权威实现。
- `pantheon-ops` 只保留 `business/*` 差异，不应静默 override 共享能力。
- 共享分页、共享上传、共享表格、共享后台壳层、共享 i18n、共享 smoke helper 先改 base。
- 代码、测试、i18n、菜单、权限、文档、evidence 只要在本次任务范围内，就按一个收口单元处理。
- 跨仓、高风险或高不确定性任务优先走 stage 边界，不用一口气做完。

### 3.5 低代码生成闭环

适用：

- `system/generator`、`system/dynamicmodule`、模块生成、注册、卸载、回收、菜单/权限/i18n 同步。

默认要求：

- 生成前确认 schema、表名、模块名、父菜单、权限前缀、i18n 前缀。
- 生成后验证 source、registry、menu、permission、i18n、activation。
- 临时模块必须验证 autoRecycle 或 cleanup。

## 4. 什么时候不新建工具

优先级从高到低：

1. 复用现有 skill、harness check、脚本或测试。
2. 直接扩展现有流程卡。
3. 只有在稳定输入、稳定 procedure、清晰 stopping condition 都满足时，才考虑新 skill / subagent / automation。
4. 一次性、敏感、证据不足、或者和现有能力重叠的，直接 skip。

## 5. 输出要求

最后交付时，必须明确写出：

- 做了什么。
- 没做什么。
- 用什么验证。
- 还剩哪些风险或未验证项。
