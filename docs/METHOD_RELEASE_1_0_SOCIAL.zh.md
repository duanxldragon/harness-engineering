# Harness Engineering 1.0 对外文案包

配套正式说明：

- [METHOD_RELEASE_1_0.zh.md](./METHOD_RELEASE_1_0.zh.md)

这份文档不是方法定义文件，而是对外传播素材。目标是让外部读者先理解“为什么需要 Harness Engineering”，再理解“这一版到底发布了什么”。

## 版本一：公众号导语

过去一年，很多团队已经开始把 Codex、Claude Code、Cursor、Copilot 这类 coding agent 引入真实开发流程。

但只要进入非 trivial 的交付，很快就会遇到同一个问题：真正决定结果的，往往不是你用了哪个模型，也不是 prompt 写得多花，而是你有没有一套稳定的 harness。

没有 harness，agent 输出就很容易停留在“能写点代码”的阶段。需求边界不清，变更身份不清，验证证据缺失，review 只是聊天记录，方法升级也没有落点。换一个工具，整套流程就得重来。

我们这次发布的 `Harness Engineering 1.0`，想解决的就是这个问题。

它不是某个单一工具的预设，也不是某个编辑器的玩法集合。它是一套仓库级的方法资产，核心由契约、模板、校验器和可升级的控制回路组成。

在这套方法里，非 trivial 交付不再只依赖“让 agent 自己发挥”，而是进入一条明确闭环：

- change record
- task packet
- implementation
- verification evidence
- review artifact
- failure registry

这一版发布的重点，不是再教大家怎么写 prompt，而是把方法本身从具体工具里抽出来，沉淀成可以迁移、可以审计、可以升级的 repo-level workflow。

如果你所在的团队已经开始认真用 coding agent 做交付，这件事迟早要补。区别只在于是出问题之后被动补，还是现在主动把方法层搭起来。

## 版本二：推特 / X 线程

### Thread title

`Harness Engineering 1.0` is out.

This is not a Claude Code preset or a Codex preset.

It is a tool-agnostic delivery method for non-trivial software work with coding agents.

### Thread body

1. Most teams adopting coding agents hit the same wall.

The problem is not just prompts.

It is harness.

2. Once work becomes non-trivial, you need more than "ask the model and inspect the diff".

You need contracts, scoped tasks, evidence, review closure, and upgradeable checks.

3. That is what `Harness Engineering 1.0` packages.

Not one tool.
Not one editor.
Not one runtime.

A repo-level method.

4. The release includes:

- a harness core model
- a coverage model
- a template taxonomy
- a tool adapter matrix
- portable task/evidence/review/failure-registry assets
- repo-shell bootstrap material
- validation checks

5. The key idea:

good agent output is not only a model-quality problem.

It is a control-loop problem.

6. So the method makes the delivery loop explicit:

change record
-> task packet
-> implementation
-> verification evidence
-> review artifact
-> failure registry

7. The point is portability.

You should be able to change tools without rebuilding the whole operating method.

8. If your team is already using agents for real delivery, this is the layer that turns scattered tricks into an actual engineering workflow.

Repo:

`https://github.com/duanxldragon/harness-engineering`

## 版本三：社区帖子

### 标题

发布 `Harness Engineering 1.0`：一套面向 coding agent 的仓库级交付方法

### 正文

最近把自己在 agent 协作开发里的方法层资产整理成了一个独立仓库，先发出 `Harness Engineering 1.0`。

这套东西的出发点很直接：如果团队只是偶尔让 agent 写几个函数，prompt 和模型选择可能已经够用了。但只要进入非 trivial 交付，真正限制结果的通常不是“模型聪不聪明”，而是“有没有一套稳定的 harness”。

我这里说的 harness，不是某个工具的内置规则，而是一套仓库级控制结构。它需要至少回答这些问题：

- 这次变更的身份是什么
- 任务边界怎么约束
- 验证证据存在哪里
- review 怎么闭环
- 重复失败怎么沉淀成方法升级
- 工具切换后流程还能不能继续工作

`Harness Engineering 1.0` 做的事情，就是把这些问题沉淀成可迁移资产：

- 方法核心模型
- 覆盖模型
- 模板分类
- 工具适配矩阵
- task packet / evidence / review / failure registry 模板和 schema
- repo shell
- method-health / adoption / failure-registry 等校验脚本

这套方法不是为某一个工具绑定设计的。Codex、Claude Code、Cursor、Copilot、OpenHands，或者人工主导执行，都可以接到同一套仓库契约上。

如果你也在认真把 coding agent 用到真实开发里，欢迎看看，尤其适合那些已经开始感觉“光靠 prompt 不够了”的团队。

仓库地址：

`https://github.com/duanxldragon/harness-engineering`

## 使用建议

- 公众号版本适合放在首发文章开头，再往下接方法细节和落地例子
- 线程版本适合直接发布，必要时把第 4 条拆成两条
- 社区帖子版本适合发在技术论坛、微信群公告、知识星球或内部方法介绍帖
