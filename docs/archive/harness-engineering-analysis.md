# Harness Engineering 方法总结与完善分析

> 审查时间：2026-05-21 | 状态：等待确认后修改

---

## 一、一句话定义

`coding agent = model + runtime + **harness**` —— 这套方法把 "harness" 这一层显式化：用仓库级的 guides、sensors、state、gates、templates 和 review loops，把 AI agent 的产出纳入可验证、可重复、可升级的交付闭环。

---

## 二、整体结构（三层发行）

| 层 | 包 | 定位 | 版本 |
|---|---|---|---|
| 方法事实源 | `agentic-method-kit` | 核心模型、覆盖模型、模板分类、Playbook、Schemas、工具适配矩阵 | v1.0.0 |
| 仓库壳层 | `agentic-repo-shell` | 仓库本地骨架、18+ CI 检查脚本、契约文档、Task/Evidence 目录 | v1.0.0 |
| 专用扩展 | `pantheon-overlay` | Pantheon 专用的继承契约、边界检查、Drift 治理 | 可选 |

---

## 三、五大核心机制

1. **六控制面**：Instruction → Task → Execution → Verification → Review → Governance，每一面有对应 artifact
2. **三类 Sensor**：Computational（确定性）/ Inferential（模型判断）/ Runtime（运行态），按位置左移
3. **Ratchet Loop**：`failure → guide/sensor/gate/template 变更 or no action`，防止规则堆积
4. **机器可读闭环**：task packet + evidence + review artifact 通过显式字段互相引用，而非靠文件名约定
5. **工具无关**：Claude Code、Codex、Cursor、Copilot 等只是 adapter，方法本身不依赖任何单一工具

---

## 四、当前状态评估

### 亮点

- 概念体系完整，核心模型/覆盖模型/模板分类/Playbook 四层清晰
- 中英双语全覆盖，对外发布准备充分
- 18+ 个 check 脚本配备了对应的 `.test.mjs`，可在 CI 中运行
- Pantheon overlay 与通用 shell 分离干净，领域关注点没有污染基础层
- 文档体系完整：README、DISTRIBUTION、RELEASE、CONCEPT_MAP、CHANGELOG 齐全

### 文件清单

| 目录/文件 | 说明 |
|---|---|
| `agentic-method-kit/` | 方法定义核心（7 个核心文档 + templates/schemas/scripts） |
| `agentic-method-kit/HARNESS_CORE_MODEL.zh.md` | 六控制面核心模型 |
| `agentic-method-kit/HARNESS_COVERAGE_MODEL.zh.md` | 三轴覆盖模型 + Ratchet Loop |
| `agentic-method-kit/METHOD_PLAYBOOK.zh.md` | 实操 Playbook |
| `agentic-method-kit/TOOL_ADAPTER_MATRIX.zh.md` | 工具适配矩阵 |
| `agentic-method-kit/HARNESS_TEMPLATE_TAXONOMY.zh.md` | 模板分类与健康检查 |
| `agentic-method-kit/CONCEPT_MAP.zh.md` | 概念地图与外部参考 |
| `agentic-repo-shell/` | 仓库壳层（18+ CI 脚本 + 契约文档） |
| `pantheon-overlay/` | Pantheon 专用扩展 |
| `docs/METHOD_RELEASE_1_0.zh.md` | v1.0 发布说明 |

---

## 五、可以完善的地方

### 🔴 P0 — 1.0 发布说明中已明确的待收口项

| # | 项目 | 当前状态 | 建议 |
|---|---|---|---|
| 1 | **visual evidence strict-mode** | 分阶段推进，未强制 | 补充明确的 promotion 触发条件文档（什么情况下自动升级为强制） |
| 2 | **failure registry landing file** | 只是 warning，还没收为强制 | 制定从 warning → gate 的量化指标（例如：≥2 个下游仓库 adoption 后升级） |

### 🟡 P1 — 方法体系层面

| # | 项目 | 问题 | 建议 |
|---|---|---|---|
| 3 | **Bootstrap 路径不对称** | `bootstrap-agentic-repo.ps1` 存在，但没有对应的"反接入"（offboarding）指引 | 补一个 `OFFBOARDING.md` 或在 MIGRATION 里增加降级路径 |
| 4 | **Trivial vs Non-trivial 判断标准缺文档** | Playbook 里提到了这个判断，但没有给具体判断准则 | 在 Playbook 或 HARNESS_CORE_MODEL 里增加一个判断树（按变更影响面/范围/回滚难度分类） |
| 5 | **Ratchet Loop 缺实操范例** | HARNESS_COVERAGE_MODEL 里描述了 loop，但没有示例 failure → change 案例 | 在 `templates/` 或 `examples/` 里补 1-2 个真实 ratchet 记录 fixture |
| 6 | **Template 健康度检查没有机械化** | HARNESS_TEMPLATE_TAXONOMY 列了检查清单，但没有对应脚本 | 考虑补一个 `check-template-health.mjs` |

### 🟢 P2 — 可选增强

| # | 项目 | 建议 |
|---|---|---|
| 7 | **Tool Adapter Matrix 缺 fallback SLA** | 每个 capability 有 fallback 列表，但没有说什么情况下必须升级 fallback（例如 Playwright 不可用时 human checklist 的完整度要求） |
| 8 | **Concept Map 参考链接未验证** | `CONCEPT_MAP.zh.md` 引用了 martinfowler.com 等外部资源，建议定期核查链接有效性并加上访问日期 |
| 9 | **Standalone repo 拆分演练文档** | `MIGRATION_TO_STANDALONE_REPO.zh.md` 存在，但没有完整的演练 smoke 结果示例 |
| 10 | **覆盖矩阵示例太通用** | HARNESS_COVERAGE_MODEL 里的覆盖矩阵样例是方法示例，建议在 `examples/` 里放一个针对具体项目类型（如 API service）的填充版本 |

---

## 六、路线图建议

```
第 1 批（收口）：
  P0 #1-2：visual evidence strict-mode promotion 条件 + failure registry 升级指标

第 2 批（补全）：
  P1 #3-6：Offboarding 指引 + Trivial 判断标准 + Ratchet 范例 + Template 健康检查脚本

第 3 批（增强）：
  P2 #7-10：fallback SLA + 链接验证 + 演练示例 + 覆盖矩阵实例
```
