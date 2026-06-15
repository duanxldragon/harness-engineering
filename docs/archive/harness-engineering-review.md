# Harness Engineering 方法总结与完善清单

> 审查日期：2026-05-21 | 版本：v1.0.0

---

## 一、这是什么

一个**工具无关的、可移植的 AI 编码代理交付方法**（v1.0.0，2026-05-18 发布）。它不是应用代码，而是一套方法论分发工作区，解决"用 Coding Agent 做非平凡软件交付时，如何保证质量可控"的问题。

## 二、三层架构

| 层 | 目录 | 职责 |
|---|---|---|
| **方法核心** | `agentic-method-kit/` | 可移植的方法定义：核心模型、覆盖模型、模板分类、适配器矩阵、Playbook、Schema、4 个便携检查脚本 |
| **仓库脚手架** | `agentic-repo-shell/` | 可复制到新项目的壳：Agent 适配器、Prompt 模板、CI 工作流、13 个检查脚本（全部有测试） |
| **领域覆盖层** | `pantheon-overlay/` | Pantheon 专属：base/business 继承治理、边界检查、DTO/响应契约、权限契约、审计覆盖、漂移分类 |

## 三、核心概念

- **5 个核心对象**：Guides（前馈）、Sensors（反馈）、State（持久记忆）、Gates（决策门）、Templates（预设配置）
- **6 个控制平面**：Instruction → Task → Execution → Verification → Review → Governance
- **10 个生命周期事件**：从 TaskIntake 到 HarnessUpdated
- **5 个覆盖维度**：Behaviour、Maintainability、Architecture fitness、Runtime quality、Method health
- **Ratchet Rule**：每次重复失败必须分类为需要 guide/sensor/gate/template 更新，防止退化
- **7 类漂移分类**（Pantheon overlay）：generic / pseudo / business-mount / business-specific / business-only / base-only / noise

## 四、关键资产

- **5 个 JSON Schema**（draft 2020-12）：task-packet、verification-evidence、review-artifact、failure-registry、doc-frontmatter
- **14 个检查脚本**：全部有 `.test.mjs` 测试覆盖，全部支持 `--strict` / `--json` / `--root` 模式
- **6 个 Agent 适配器**：Claude Code、Codex、Cursor、GitHub Copilot、OpenHands、Human
- **完整双语文档**：中英文各一份
- **CI 工作流**：语法检查 + 测试 + 14 个 JSON 报告生成

---

## 五、可完善的问题清单

### P0 — 结构性问题

**1. `agentic-method-kit/scripts/` 只有 4 个脚本，而 workspace `scripts/harness/` 有 14 个**

kit 自称"可移植的方法真相源"，但消费者复制 kit 后只能拿到 4 个检查脚本（task-packet、evidence、adoption、review）。其余 10 个关键检查（method-health、failure-registry、visual-evidence、doc-frontmatter、boundaries、backend-response-contract、backend-dto-contract、permission-contract、audit-coverage、inheritance-contract、triage-base-drift）都在 workspace 层的 `scripts/harness/` 里。复制 kit 的人拿不到完整检查能力。

**2. kit 脚本没有测试文件**

`agentic-method-kit/scripts/` 下 4 个 `.mjs` 都没有配套 `.test.mjs`，而 workspace 层 `scripts/harness/` 下 14 个全部有。如果 kit 是真相源，测试也应该在 kit 里。

**3. `check-review.mjs` 只存在于 kit，workspace `scripts/harness/` 里没有，也没有测试**

`scripts/harness/README.md` 列出了 13 个脚本但不包含 `check-review`。这个脚本孤立在 kit 里，没有测试覆盖，也没有被 CI 调用。

### P1 — 文档/一致性问题

**4. 文档双重维护风险**

`docs/harness/` 有 16 份"参考合约"，`agentic-method-kit/` 有自己的一套核心文档。例如 `HARNESS_CORE_MODEL.md` 在两个地方都存在。当方法演进时，两边需要同步更新，目前没有自动化检查来防止漂移。

**5. `check-doc-frontmatter.mjs` 在 README 脚本清单中缺失**

脚本存在于 `scripts/harness/check-doc-frontmatter.mjs` 且有测试，但 `scripts/harness/README.md` 的脚本列表表格没有列出它。README 声称 13 个脚本，实际有 14 个（含 check-doc-frontmatter）。

**6. 文档链接完整性没有检查器**

failure-registry 的 FR-002 审查笔记明确写了："link existence is not yet covered by a dedicated docs-link checker." 随着文档增长，死链风险增加。

### P2 — 功能缺口

**7. HOT-001 和 HOT-002 仍为 open 状态**

- **HOT-001**：visual-evidence 仍为观察模式（CI 用 `continue-on-error: true`）。v1.0.0 已发布，晋升条件模糊（"after two consecutive UI-related tasks..."）。
- **HOT-002**：failure-registry 缺失只报 warning 不阻断。下游仓库已播种后应升级为必选项。

**8. Bootstrap 脚本只有 PowerShell 版本**

`scripts/bootstrap-agentic-repo.ps1` 和 `scaffold-standalone-method-repo.ps1` 只有 pwsh 版本，没有 bash/sh 等价物。Linux/macOS 用户无法使用。

**9. 缺少性能/运行时传感器**

覆盖模型定义了 Runtime quality 维度（logs、metrics、traces、performance），但没有对应的检查脚本。方法层没有性能回归检测能力。

**10. 独立仓库迁移计划写了但未执行**

`MIGRATION_TO_STANDALONE_REPO.md` 和 `STANDALONE_REPO_BOOTSTRAP_CHECKLIST.md` 详细描述了如何将方法提取到独立仓库，但当前仍嵌入在 workspace 中。当前"workspace 容器"的身份与"方法分发"的意图有张力。

### P3 — 小改进

**11. `agentic-method-kit/scripts/` 缺少 README**

workspace 层 `scripts/harness/README.md` 很完善（每个脚本的用法、参数、退出码都写了），但 kit 的 `scripts/` 目录没有 README。

**12. `.agents/` 在 workspace 根和 repo-shell 各有一份**

不清楚哪个是 canonical。可能出现一边改了另一边没改的情况。

**13. 没有 CODEOWNERS 或 MAINTAINERS 文件**

作为一个方法分发项目，缺少明确的维护者指定。

**14. `CONCEPT_MAP.md` 没有对应的校验检查**

`agentic-method-kit/CONCEPT_MAP.md` 将 Agent 最佳实践映射到 Harness 概念，但没有自动化检查确保映射保持最新。

---

## 六、问题优先级汇总

| 优先级 | 数量 | 关键主题 |
|---|---|---|
| P0 | 3 | kit 脚本不完整、kit 脚本缺测试、check-review 孤立 |
| P1 | 3 | 文档双重维护、README 遗漏脚本、缺死链检查 |
| P2 | 4 | HOT 未关闭、缺 bash bootstrap、缺性能传感器、迁移未执行 |
| P3 | 4 | kit 缺 README、.agents 重复、缺 CODEOWNERS、CONCEPT_MAP 无校验 |
