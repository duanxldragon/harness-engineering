# Claude Code Best Practice PPT 最终讲稿版

原始仓库地址：  
https://github.com/shanraisshan/claude-code-best-practice

参考资料：  
- README: https://github.com/shanraisshan/claude-code-best-practice/blob/main/README.md
- Claude settings: https://github.com/shanraisshan/claude-code-best-practice/blob/main/best-practice/claude-settings.md
- Skills 实践: https://github.com/shanraisshan/claude-code-best-practice/blob/main/tips/claude-thariq-tips-17-mar-26.md

---

## 第 1 页：标题页

标题：  
`Claude Code Best Practice：把 AI 编程变成工程系统`

副标题：  
基于 `shanraisshan/claude-code-best-practice` 的团队落地总结

讲稿要点：

- 今天不讲 prompt 花样，重点讲工程化方法。
- 这个仓库最有价值的地方，是把 Claude Code 从聊天工具变成执行系统。
- 核心问题不是模型够不够强，而是我们有没有把使用方式体系化。

---

## 第 2 页：为什么值得看

标题：  
`问题不在模型能力，而在使用方式`

讲稿要点：

- 只把 AI 当聊天工具，结果通常不稳定。
- 每次都要重新解释项目背景，经验沉淀不下来。
- 很难协作、很难 review、也很难复用。
- 这个仓库的价值，就是把“临时 prompt”升级成“长期工作流”。

---

## 第 3 页：仓库核心定位

标题：  
`从 Vibe Coding 到 Agentic Engineering`

讲稿要点：

- 它不是 prompt 仓库，也不是单一模板仓库。
- 它想解决的是：怎么让 AI 进入完整的软件交付流程。
- 重点不是“会写代码”，而是“会规划、会执行、会验证、会交付”。

---

## 第 4 页：核心工作流

标题：  
`Research -> Plan -> Execute -> Review -> Ship`

讲稿要点：

- Research：先理解问题，不急着开写。
- Plan：先定范围、步骤和验证门槛。
- Execute：分阶段做，不一次性铺太大。
- Review 和 Ship：把验证和交付纳入标准流程，而不是靠感觉结束。

---

## 第 5 页：7 个关键原语

标题：  
`原语决定系统边界`

讲稿要点：

- `Subagents`：拆任务、隔离上下文、支持并行。
- `Commands`：把高频动作命令化。
- `Skills`：把知识、脚本、坑点沉淀下来。
- `Hooks`、`Settings`、`Workflow`、`Checkpoint` 负责约束、编排和恢复。

---

## 第 6 页：最值得抄的模式

标题：  
`Command -> Agent -> Skill`

讲稿要点：

- Command 负责启动一个固定流程。
- Agent 负责承担具体角色和上下文。
- Skill 负责提供专业知识和边界约束。
- 这个模式的好处，是减少重复 prompt，提升稳定性和可复用性。

---

## 第 7 页：最重要的落地原则

标题：  
`五条最值得照搬的实践`

讲稿要点：

- 先 plan，再 code。
- 按 vertical slice 拆任务，不要按前后端横切。
- 高频动作做成 commands，项目知识做成 skills。
- 合并前必须有独立 review，不能自己改完自己宣布成功。

---

## 第 8 页：为什么 `CLAUDE.md` 关键

标题：  
`没有规则文件，就没有稳定执行`

讲稿要点：

- `CLAUDE.md` 不是介绍文档，而是 AI 的项目操作手册。
- 至少要写清：项目结构、启动方式、测试命令、目录边界。
- 这个仓库给了一个很实用的标准：新开会话只说“run the tests”，Claude 就应该第一次跑通。

---

## 第 9 页：团队怎么落地

标题：  
`从 0 到 1 的五步法`

讲稿要点：

- 第一步，写好 `CLAUDE.md` 和基础 settings。
- 第二步，做 3 个最常用 commands。
- 第三步，做 2 个关键 skills。
- 第四步，引入 review 和验证闭环，不靠“AI 说做完了”。

---

## 第 10 页：总结

标题：  
`一句话结论`

讲稿要点：

- 这个仓库最重要的价值，不是 prompt 技巧，而是工程化方法。
- 它把 AI 编程升级成：`规则 + 命令 + 技能 + 分工 + 审查`。
- 如果团队只带走一个观点，那就是：不要让 AI 临场发挥，要让它进入系统。

---

## 讲者备注

- 15 分钟版本：每页控制在 1 分钟左右。
- 30 分钟版本：重点展开第 4、6、8、9 页。
- 如果要做成正式 PPT，建议补 4 张图：
- 工作流箭头图
- 原语关系图
- `Command -> Agent -> Skill` 结构图
- 团队落地路线图
