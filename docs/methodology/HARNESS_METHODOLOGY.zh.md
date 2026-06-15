# Pantheon Harness 方法论

> 最后更新：2026-06-15
> 版本：[v1.0.0](../../VERSION)
> 变更历史：[CHANGELOG.md](../../CHANGELOG.md)
> 演化机制：[EVOLUTION.md](./EVOLUTION.md)
> 作者：人机协作（人定需求+验收，Claude 规划+审查，Codex/OMX 执行）

## 0. 核心原则

```
┌─────────────────────────────────────────────────────────┐
│                    三权分立模型                           │
│                                                         │
│   人（你）              需求定义 + 结果验收               │
│   Claude Code           规划、派任务、审查结果             │
│   Codex / OMX           执行、修 Bug、写代码、跑测试       │
│                                                         │
│   铁律：Claude 绝不直接修改业务代码                         │
│         Codex 绝不自行决定架构和范围                        │
│         人绝不在中间环节反复搬运上下文                        │
└─────────────────────────────────────────────────────────┘
```

### 0.1 边界表

| 层级 | 谁决定 | 谁执行 | 谁验收 |
|---|---|---|---|
| 需求/范围/优先级 | **人** | — | **人** |
| 架构/方案/技术选型 | Claude（规划） | — | 人确认 |
| 代码实现 | — | Codex/OMX | Claude（审查） |
| 测试/构建/SonarQube 修复 | — | Codex/OMX | Claude（审查） |
| UI 视觉质量 | — | Codex + impeccable | Claude + 人 |
| PR 合并 | — | — | Claude 审查 + 人确认 |
| 部署 | — | Codex/OMX | 人验证 |

### 0.2 Claude 能改什么、不能改什么

**Claude 可以改（治理层）：**
- `docs/` 下的所有文档
- `.codex/` 下的 Skill、Prompt、Agent 配置
- `CLAUDE.md`、`AGENTS.md`、`DESIGN.md` 治理文件
- 根配置：`sonar-project.properties`、`.gitignore`、`package.json`（scripts）
- CI/CD 工作流：`.github/workflows/`
- 项目记忆：`memory/`

**Claude 绝对不能改（代码层）：**
- `backend/` 下任何 `.go` 文件
- `frontend/src/` 下任何 `.ts`/`.tsx` 文件
- `database/` 下 SQL 文件
- `scripts/harness/` 下运行时脚本（测试除外）

**灰色地带处理：**
- 单字符 typo、注释修正、import 路径对齐 → Claude 可改，改后记录
- 配置文件（`package.json`、`tsconfig.json`、`vite.config.ts`）→ Claude 可改
- 测试文件 → 首选交给 Codex，仅在阻塞时 Claude 可改

---

## 1. 工作流全景

```
需求进来
  │
  ├─ 需求清晰吗？
  │   └─ 不清晰 → Claude 启动 $deep-interview 澄清
  │
  ├─ 方案确定吗？
  │   └─ 未确定 → Claude 启动 $ralplan 出方案
  │
  ├─ 方案已批准
  │   │
  │   ├─ 是 UI 任务吗？
  │   │   └─ 是 → Codex + impeccable 执行
  │   │
  │   ├─ 需要并行执行吗？
  │   │   └─ 是 → OMX $team 并行
  │   │
  │   ├─ 普通实现任务
  │   │   └─ Codex exec 执行
  │   │
  │   └─ 需要持久跟踪？
  │       └─ OMX $ultragoal
  │
  ├─ Codex 执行完毕
  │   └─ Claude 审查 diff
  │       │
  │       ├─ 通过 → 人验收
  │       └─ 不通过 → Claude 写修复指令 → Codex 再修
  │
  └─ 人验收
      ├─ 对照验收清单逐项检查
      ├─ UI 任务看截图证据
      └─ 通过 → Claude 合并 PR
```

---

## 2. 任务委派标准

每个任务派给 Codex 时，Claude 必须提供完整 Task Packet：

```text
目标仓库：    pantheon-base / pantheon-ops / harness-engineering
任务层级：    platform / system/auth / system/iam / system/org / system/config / business/*
任务模式：    review / implement / ui / inheritance-sync / smoke / docs / sonar-fix
必读文档：    合同/设计/验收文档路径
实现范围：    具体改哪些文件/模块
禁止触碰：    明确不能改的区域
验证方式：    具体命令（go test / npm build / smoke suite / screenshot）
停止条件：    怎样算完成
```

---

## 3. 质量门禁矩阵

| 门禁 | 触发条件 | 执行者 | 通过标准 |
|---|---|---|---|
| Go 测试 | 任何 Go 改动 | Codex → Claude 审查 | 全部通过 |
| TypeScript 类型检查 | 任何前端改动 | Codex | `tsc -b` 干净 |
| Lint | 任何前端改动 | Codex | 0 error |
| Frontend Build | 任何前端改动 | Codex | `vite build` 成功 |
| SonarQube | PR 级别 | CI 自动 | 0 新增问题 |
| Smoke 测试 | 系统模块改动 | CI / Codex | 通过率 ≥ 95% |
| UI 视觉 | 任何 UI 改动 | Codex + impeccable | 渲染证据通过 |
| 安全审计 | 认证/权限/中间件改动 | Codex Security | 无高危/严重 |
| 继承漂移 | 跨仓改动 | Claude 审查 | 漂移可解释 |

---

## 4. SonarQube 质量闭环

### 4.1 扫描时机

| 时机 | 触发 |
|---|---|
| PR 推送 | CI 自动（SonarCloud） |
| 本地预检 | Claude 派 Codex 跑 `sonar-scanner` |

### 4.2 问题分类与处理

| 分类 | 判定标准 | 处理方式 |
|---|---|---|
| 假阳性 | 有防护代码（如 `filepath.IsLocal()`）、业务合理 | 记录原因 → 加排除规则 → 不再反复处理 |
| 低风险 | Code Smell 不影响功能 | 记录 → 低优先级队列 → 批量修复 |
| 必须修 | Bug/Vulnerability，有安全或功能影响 | Codex 立即修复 → Claude 审查 |

### 4.3 修复流程

```
CI SonarQube 扫描
  │
  ├─ 0 新增问题 → 通过 ✅
  │
  └─ 有新增问题
      │
      ├─ Claude 审查报告
      │   ├─ 假阳性 → Claude 更新排除规则 → 记录原因
      │   ├─ 低风险 → Claude 记录到低优先级队列
      │   └─ 必须修 → Claude 写修复指令 → Codex 执行 → Claude 审查 diff
      │
      └─ 修复后重新扫描 → 循环直到 0 新增
```

---

## 5. 文档体系

```
docs/
├── HARNESS_METHODOLOGY.zh.md     ← 本文件（方法总纲）
├── WORKFLOW_ROUTING.md           ← 工具路由决策树
├── WORKSPACE_INHERITANCE.md      ← 仓库角色与继承关系
├── ACCEPTANCE_CHECKLIST.zh.md    ← 非程序员验收清单
├── TASK_DELEGATION_TEMPLATE.md   ← Claude→Codex 任务委派模板
├── codex-development-process-improvement.md  ← 流程增强背景
├── codex-workflow-quick-reference.md         ← 命令速查
├── SONARQUBE_RULES.md            ← SonarQube 规则与排除原因
└── MIGRATION_LOG.md              ← Superpowers→OMX 迁移记录
```

---

## 6. 人机协作章程

### 6.1 人的职责

- 说清楚"要做什么"和"为什么"
- 定义验收标准（对照验收清单）
- 最终确认 PR 合并
- 不介入中间实现细节

### 6.2 Claude 的职责

- 理解需求，分解任务
- 选择正确的工具和执行路径
- 按 Task Packet 模板委派给 Codex
- 审查 Codex 产出的 diff
- 维护治理文档和方法论

### 6.3 Codex 的职责

- 按 Task Packet 执行实现
- 跑完指定的验证命令
- 不自行扩大范围
- 不自行决定架构变更
- 失败时报告具体错误，不等 Claud 来查

---

## 7. 版本演进

| 版本 | 日期 | 变更 |
|---|---|---|
| v1.0 | 2026-06-15 | 初始版本：三权分立模型、Task Packet 模板、SonarQube 闭环、验收清单 |
