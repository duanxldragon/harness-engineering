# Claude Code Best Practice 分享 PPT 提纲

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

可讲要点：

- 今天不讲 prompt 技巧合集
- 重点讲怎么把 Claude Code 用成工程体系
- 目标是让 AI 编程可复用、可约束、可审查

---

## 第 2 页：为什么要看这个仓库

标题：  
`问题不在模型能力，而在使用方式`

页面要点：

- 只把 AI 当聊天工具，效果不稳定
- 每次都要重复解释项目背景
- 经验沉淀不下来
- 很难协作、很难 review、很难复用

可讲结论：

- 这个仓库的价值，是把“临时 prompt”升级成“工程工作流”

---

## 第 3 页：仓库想解决什么

标题：  
`从 Vibe Coding 到 Agentic Engineering`

页面要点：

- 不再只追求“AI 会写代码”
- 而是让 AI 参与完整交付链路
- 强调流程、规则、分工和验证

可讲结论：

- Claude Code 应该被当成工程执行系统，而不是问答机器人

---

## 第 4 页：核心工作流

标题：  
`Research -> Plan -> Execute -> Review -> Ship`

页面要点：

- Research：先理解问题和上下文
- Plan：先定范围、步骤和验证门槛
- Execute：分阶段实现
- Review：独立检查风险和遗漏
- Ship：形成可交付结果

可讲结论：

- 好的 AI 编程流程，不该止步于“写完代码”

---

## 第 5 页：Claude Code 的 7 个关键原语

标题：  
`原语决定系统边界`

页面要点：

- Subagents：拆任务、隔离上下文
- Commands：封装高频流程
- Skills：沉淀知识、脚本、坑点
- Workflows：编排端到端流程
- Hooks：自动检查和约束
- Settings：权限与行为配置
- Memory / Checkpoint：恢复上下文

可讲结论：

- 这些不是零散功能，而是一套可以拼装的工程积木

---

## 第 6 页：最值得抄的架构模式

标题：  
`Command -> Agent -> Skill`

页面要点：

- Command 负责启动流程
- Agent 负责承担角色
- Skill 负责提供专业知识
- 三层组合后，工作流更稳定、更可复用

可讲结论：

- 少写重复 prompt，多做结构化沉淀

---

## 第 7 页：仓库里最值得照搬的实践

标题：  
`五条最重要的落地原则`

页面要点：

- 先 plan，再 code
- 按 vertical slice 拆任务
- 高频动作做成 commands
- 项目知识做成 skills
- 合并前必须独立 review

可讲结论：

- AI 编程要从“单次输出”转向“可验证闭环”

---

## 第 8 页：为什么 `CLAUDE.md` 这么关键

标题：  
`没有规则文件，就没有稳定执行`

页面要点：

- 写清项目结构、构建、测试、限制
- 让 Claude 第一次就进入正确状态
- 目标不是介绍项目，而是指导执行

可讲结论：

- 标准可以非常简单：
- 新开会话只说“run the tests”，Claude 就应能第一次跑通

---

## 第 9 页：团队怎么最小成本落地

标题：  
`从 0 到 1 的五步法`

页面要点：

1. 写好 `CLAUDE.md`
2. 配好 `.claude/settings.json`
3. 做 3 个高频 commands
4. 做 2 个关键 skills
5. 引入 review 和验证闭环

可讲结论：

- 不需要一开始做很复杂，先把最小闭环跑起来

---

## 第 10 页：总结页

标题：  
`一句话结论`

页面要点：

- 这个仓库最有价值的，不是 prompt 花样
- 而是把 AI 编程升级成：
- `规则 + 命令 + 技能 + 分工 + 审查`

可讲结论：

- 如果团队只带走一个观点，那就是：
- 不要让 AI 临场发挥，要让它进入工程系统

---

## 附：演讲备注

建议总时长：

- 15 分钟版本：每页 1 到 1.5 分钟
- 30 分钟版本：第 4、6、8、9 页展开讲

建议加的视觉元素：

- 第 4 页放工作流箭头图
- 第 5 页放原语关系图
- 第 6 页放 `Command -> Agent -> Skill` 结构图
- 第 9 页放落地路线图
