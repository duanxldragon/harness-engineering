# Claude Code Best Practice 仓库最佳实践总结

原始仓库地址：  
https://github.com/shanraisshan/claude-code-best-practice

重点参考资料：  
- README: https://github.com/shanraisshan/claude-code-best-practice/blob/main/README.md
- Claude settings: https://github.com/shanraisshan/claude-code-best-practice/blob/main/best-practice/claude-settings.md
- Skills 实践: https://github.com/shanraisshan/claude-code-best-practice/blob/main/tips/claude-thariq-tips-17-mar-26.md

---

## 1. 文档目的

本文用于总结 `claude-code-best-practice` 仓库中的核心方法论和可落地实践，帮助团队把 Claude Code 从“临时问答工具”升级为“可复用、可约束、可审查、可协作的工程执行系统”。

本文不是对仓库内容的逐段翻译，而是按团队落地视角进行提炼和归纳。

---

## 2. 仓库定位

这个仓库的定位不是单纯的 prompt 集合，也不是一个固定模板仓库，而是一套围绕 Claude Code 的工程化实践资料库。

它重点解决的问题是：

- 如何组织 Claude Code 的能力原语
- 如何把一次性 prompt 沉淀成长期可复用流程
- 如何通过规则、命令、技能、代理和审查机制，把 AI 编程变成稳定的团队生产方式

README 中明确建议将这个仓库作为“课程”和“参考资料”来学习，而不是直接照抄所有内容。

---

## 3. 核心理念

仓库传达的核心理念可以总结为以下几点：

### 3.1 不要把 Claude Code 只当聊天工具

Claude Code 的价值不在于“对话能力”本身，而在于它能够承担规划、执行、验证、审查、交付等一系列工程动作。

### 3.2 不要依赖一次性 prompt

真正高价值的使用方式不是“每次重新描述需求”，而是把共性能力沉淀成：

- 项目规则
- 命令
- 技能
- 自动化钩子
- 标准工作流

### 3.3 AI 编程必须进入工程化闭环

成熟的工作链路应该覆盖：

- Research
- Plan
- Execute
- Review
- Ship

也就是说，AI 不应只负责“写代码”，而要纳入完整的软件交付流程。

---

## 4. Claude Code 的核心原语

仓库将 Claude Code 的常用能力整理为一组关键原语，这部分是理解整个仓库的基础。

### 4.1 Subagents

Subagent 用来拆分任务和隔离上下文。

特点：

- 每个 agent 承担相对独立的职责
- 可以并行处理问题
- 可以减少单一会话上下文膨胀
- 适合复杂任务的分工协作

### 4.2 Commands

Command 用于封装高频工作流。

特点：

- 通过 slash command 触发
- 适合沉淀重复动作
- 比重复输入 prompt 更稳定
- 有助于减少主会话污染

### 4.3 Skills

Skill 用于沉淀专业知识和可执行经验。

特点：

- skill 是目录，不只是一个 markdown 文件
- 可以包含脚本、参考文档、示例、坑点
- 适合封装领域知识和操作规范

### 4.4 Workflows

Workflow 是 commands、agents、skills 的组合方式。

特点：

- 用于组织端到端流程
- 可复用
- 可审查
- 可在团队内共享

### 4.5 Hooks

Hook 用于在关键节点自动执行检查或限制行为。

常见用途：

- 阻止危险操作
- 自动格式化
- 自动补充收尾验证
- 追踪 skill 使用情况

### 4.6 MCP Servers

MCP Server 用于扩展 Claude Code 的工具能力。

常见用途：

- 浏览器控制
- 外部系统访问
- 数据源接入
- 文件与工具桥接

### 4.7 Settings / Memory / Checkpointing

这部分负责 Claude Code 的长期配置与恢复能力。

包括：

- `settings.json`：行为和权限配置
- `CLAUDE.md` / rules：项目规则和长期上下文
- checkpointing：任务中断恢复与状态延续

---

## 5. 仓库最重要的组织模式

仓库中最值得直接借鉴的模式是：

`Command -> Agent -> Skill`

含义如下：

- `Command`：启动一个明确工作流
- `Agent`：承担具体角色与上下文
- `Skill`：提供专业知识、脚本和边界约束

这种模式的优势在于：

- 降低重复 prompt 成本
- 使工作流具备复用性
- 让复杂任务可拆分、可验证
- 更适合团队共享和长期维护

仓库用 `/weather-orchestrator` 作为完整示例，展示如何把 command、agent、skill 编排成一个实际流程。

参考：  
https://github.com/shanraisshan/claude-code-best-practice/tree/main/orchestration-workflow

---

## 6. 开发工作流最佳实践

### 6.1 先计划，再执行

仓库强烈建议复杂任务不要直接实现，而应先进入 planning 阶段。

原因：

- 可以先统一目标
- 可以暴露歧义
- 可以提前识别风险
- 可以减少返工

### 6.2 计划应分阶段并带验证门禁

一个成熟计划通常应包含多个 phase，每个阶段都应明确：

- 目标
- 范围
- 风险
- 验证方式

验证门禁通常包括：

- 单元测试
- 集成测试
- 构建检查
- 手动验收
- UI 验证

### 6.3 按 vertical slice 拆任务

仓库明确不推荐按层拆解任务，例如：

- 先改数据库
- 再改 API
- 最后改前端

更推荐按“用户功能闭环”拆分，即 vertical slice。

优点：

- 更快看到真实结果
- 更容易验证
- 更适合 AI 独立完成一段完整工作
- 减少跨阶段沟通和上下文切换成本

### 6.4 先减少规格歧义

对于模糊任务，应先让模型帮助澄清问题，再进入执行。

常见做法：

- 先给最小背景
- 让 AI 反过来提问
- 把需求压缩成更明确 spec
- 再开新会话执行

### 6.5 原型优先于长篇需求文档

在产品和 UI 场景中，快速做多个原型版本通常比先写很长的 PRD 更高效。

---

## 7. 上下文管理最佳实践

### 7.1 长会话会退化

仓库多次强调，长会话可能导致：

- 关注点发散
- 历史上下文污染
- 推理质量下降
- 错误继承

因此，不适合让重要任务无限延长在同一个 session 中完成。

### 7.2 主动压缩上下文

建议在以下场景主动 compact 或切换新会话：

- 任务阶段切换
- 讨论结束进入实施
- 多轮试错后开始偏题
- 需要重新聚焦目标时

### 7.3 用 subagent 隔离上下文

不要让主会话承担所有细节。  
可将搜索、审查、验证等动作交给子 agent。

### 7.4 用 checkpoint / recap 保持可恢复性

复杂工作不能依赖“当前会话还没关闭”。  
应保证即使中断，也能用 recap 或 checkpoint 继续。

---

## 8. `CLAUDE.md` 最佳实践

这是仓库中最值得团队直接落地的一部分。

### 8.1 `CLAUDE.md` 的目标

`CLAUDE.md` 的作用不是写口号，而是提供足够具体的项目运行和协作规则，让 Claude Code 能稳定执行。

### 8.2 应包含的核心内容

建议至少包含：

- 项目结构说明
- 安装命令
- 启动命令
- 构建命令
- 测试命令
- 代码规范
- 提交规范
- 不允许修改的目录
- 特殊环境要求
- 常见故障说明

### 8.3 一个实用判断标准

仓库给出的判断标准非常明确：

任意开发者打开 Claude Code 后，只说一句“run the tests”，如果不能在第一次跑通，说明 `CLAUDE.md` 还不够好。

这条标准非常适合作为团队验收原则。

### 8.4 仓库状态要保持一致

如果代码库处于：

- 半迁移状态
- 新旧架构并存但规则不清
- 多种风格混杂
- 冗余路径未清理

Claude 很容易被误导，进而做出不一致修改。

---

## 9. Settings 最佳实践

仓库专门整理了 Claude Code settings 的实践，总结下来有几条很关键。

### 9.1 设置是分层覆盖的

设置来源不是单一文件，而是多层覆盖。

通常包括：

- managed settings
- CLI 参数
- 项目内 `.claude/settings.local.json`
- 项目内 `.claude/settings.json`
- 用户级 `~/.claude/settings.json`

这意味着：

- 团队规范可以共享
- 个人偏好可以保留
- 项目限制可以局部加强

### 9.2 优先做精细权限配置

推荐精确配置：

- allow
- ask
- deny
- additionalDirectories

而不是一味放大权限范围。

### 9.3 优先用 auto mode，而不是危险跳过权限

仓库明确建议：

- 用 `auto mode`
- 用 allowlist
- 配合 sandbox

而不是直接使用危险的全权限模式。

### 9.4 sandbox 是稳定性和安全性的关键

sandbox 的价值在于：

- 降低误操作风险
- 降低外部依赖污染
- 减少无关网络访问
- 帮助实现更可控的执行环境

### 9.5 worktree 配置对大型仓库有帮助

仓库提到可以通过配置降低 worktree 的复制和体积成本，适合大型 monorepo 或多模块项目。

---

## 10. Subagents 最佳实践

### 10.1 用功能导向 agent，不要只有泛角色

仓库不太推崇过于抽象的 agent，例如：

- 通用 QA agent
- 通用 backend engineer

更推荐：

- 针对具体业务能力的 agent
- 针对特定任务场景的 agent
- 绑定专门 skill 的 agent

### 10.2 用多 agent 提升验证质量

推荐把“实现”和“审查”分离。

例如：

- 一个 agent 实现功能
- 一个 agent 检查风险
- 一个 agent 验证测试

这样可以降低“自己改、自己说没问题”的确认偏差。

### 10.3 并行优先

适合并行的场景包括：

- 搜索代码
- 分模块调研
- 多路径验证
- 不同文件的独立改动
- 交叉 review

仓库还提到 agent teams、tmux、git worktrees 等并行协作方式。

---

## 11. Commands 最佳实践

### 11.1 高频动作一定要命令化

如果一个动作经常重复，就不应每次都重新写 prompt，而应沉淀成 command。

适合命令化的动作包括：

- 规划任务
- 修复失败测试
- 审查 diff
- 汇总上下文
- 准备发版
- 清理技术债

### 11.2 Command 的价值是流程稳定

同样一句需求，手打 prompt 的输出可能波动很大；  
而 command 能通过固定结构、固定角色、固定 skill，提升执行稳定性。

### 11.3 Command 应尽量少污染主上下文

很多“流程型工作”更适合通过 command 独立触发，而不是塞进主对话。

---

## 12. Skills 最佳实践

### 12.1 Skill 是目录，不是单文件

成熟 skill 通常不仅有一个 `SKILL.md`，还可能有：

- `references/`
- `scripts/`
- `examples/`
- `assets/`
- `notes/`

这样才方便按需读取，而不是一次性灌入所有上下文。

### 12.2 用 progressive disclosure

skill 的设计原则之一是“按需暴露信息”。

意思是：

- 不把所有资料一次给模型
- 让模型在需要时再读取具体参考
- 保持上下文简洁

### 12.3 `Gotchas` 是高价值内容

skill 中应明确记录模型常犯错误，例如：

- 常见误判
- 特定框架陷阱
- 环境限制
- 禁止做法
- 项目特有约束

这类信息通常比普通说明更能改变输出质量。

### 12.4 Skill 的 description 应写成触发条件

description 不是单纯摘要，而应明确告诉模型：

“什么情况下应该使用这个 skill”

这样才能提高 skill 被正确调用的概率。

### 12.5 Skill 不应重复常识

普通编程常识 Claude 本身通常已经知道。  
skill 应优先提供：

- 项目特有规则
- 反直觉边界
- 复用脚本
- 真实样例
- 常见坑点

### 12.6 Skill 应携带可执行资源

如果能提供脚本、模板、参考文件，就不要让模型每次现写。

### 12.7 Skill 可以带状态，但持久化要谨慎

仓库提到 skill 目录可以带 memory，但升级可能导致目录内容丢失。  
因此长期持久化数据更适合放到插件或更稳定的数据目录。

---

## 13. Hooks 最佳实践

### 13.1 用 hooks 管控危险操作

hooks 适合处理：

- 删除或覆盖文件
- 修改敏感目录
- 运行危险命令
- 推送或发布前确认

### 13.2 用 PostToolUse 自动补收尾动作

例如：

- 自动格式化
- 自动 lint
- 自动提醒补测试
- 自动补齐缺少的验证步骤

### 13.3 用 Stop hook 阻止“过早宣布完成”

Claude 很容易在没有完整验证时说“已经完成”。  
Stop hook 可以在结束前提醒：

- 是否真正验证过
- 是否还有未检查风险
- 是否需要继续执行

### 13.4 用 hooks 追踪流程使用情况

hooks 还可以帮助观察：

- 哪些 skill 被触发
- 哪些流程最常用
- 哪些环节经常失败

这有助于持续优化工作流。

---

## 14. Git / PR 最佳实践

### 14.1 保持 PR 小而清晰

小 PR 的好处包括：

- 更容易 review
- 更容易回滚
- 更容易 bisect
- 更容易定位回归

### 14.2 倾向 squash merge

仓库倾向于 squash merge，因为它有助于：

- 维持干净历史
- 以功能为单位聚合变更
- 提高回滚可操作性

### 14.3 高频提交优于大堆积

比起长时间积累大量修改，更推荐小步提交、阶段确认。

### 14.4 merge 前做独立 review

不要只让实现者自证成功。  
建议在 merge 前安排独立 review，检查：

- 功能风险
- 回归风险
- 测试缺口
- 安全隐患

---

## 15. 调试最佳实践

### 15.1 截图是高价值上下文

对于 UI、布局和复杂交互问题，截图能显著提高模型判断质量。

### 15.2 尽量让模型拿到真实日志

包括：

- 浏览器控制台日志
- 后端日志
- 异步任务日志
- 测试失败输出

相比只靠口述问题，直接给日志更有效。

### 15.3 代码场景优先 agentic search

仓库明确倾向：

- `glob`
- `grep`
- 文件阅读
- 实时工具调用

而不是过度依赖向量检索式 RAG。

原因在于：

- 代码变化快
- 索引容易过期
- 语义检索可能失真
- 工程任务更依赖精确定位

---

## 16. 团队落地建议

如果团队要从零开始落地，建议按以下顺序推进。

### 16.1 第一阶段：建立基础规则

先完成：

- `CLAUDE.md`
- `.claude/settings.json`
- 基础权限和目录约束
- 统一测试和构建入口

### 16.2 第二阶段：沉淀高频流程

优先把最常见的动作变成 commands，例如：

- `/plan-task`
- `/fix-test`
- `/review-diff`
- `/ship`

### 16.3 第三阶段：沉淀关键 skills

建议先做两个方向：

- 项目开发规范 skill
- 测试 / 排障 skill

### 16.4 第四阶段：引入 hooks

优先覆盖：

- 危险命令拦截
- 自动格式化
- 结束前验证提醒

### 16.5 第五阶段：引入多 agent 协作

对复杂需求逐步采用：

- 一个 agent 规划
- 一个 agent 实现
- 一个 agent review
- 一个 agent 验证

---

## 17. 最值得直接照搬的实践清单

以下实践最建议直接借鉴：

1. 所有复杂任务先 plan 再 execute
2. 所有高频动作优先做成 commands
3. 所有重要领域知识优先做成 skills
4. 所有危险操作优先交给 hooks 和 settings 限制
5. 所有大任务按 vertical slice 拆分
6. 所有关键交付在合并前做独立 review
7. 所有项目必须有能直接跑通测试的 `CLAUDE.md`
8. 所有重要流程都应具备可恢复上下文
9. 所有复杂任务都应优先考虑多 agent 分工
10. 所有“AI 说完成了”的结论都必须有验证证据

---

## 18. 一句话结论

这个仓库最重要的价值，不是教你写更复杂的 prompt，  
而是教你把 AI 编程从“临时发挥”升级成“规则 + 命令 + 技能 + 分工 + 审查”的工程系统。

如果团队只学一件事，就应该学这件事。

---

## 19. 参考链接

- 仓库主页  
https://github.com/shanraisshan/claude-code-best-practice

- README  
https://github.com/shanraisshan/claude-code-best-practice/blob/main/README.md

- Claude settings 总结  
https://github.com/shanraisshan/claude-code-best-practice/blob/main/best-practice/claude-settings.md

- Skills 实践总结  
https://github.com/shanraisshan/claude-code-best-practice/blob/main/tips/claude-thariq-tips-17-mar-26.md
