# Method Playbook

English version: [METHOD_PLAYBOOK.md](./METHOD_PLAYBOOK.md)

这份 playbook 用来把一组工具收敛成一套统一的方法。

## 默认技术栈

- `OpenSpec`：change identity、proposal、design、tasks、archive
- `superpowers`：brainstorming、planning、execution、debugging、verification
- `impeccable`：UI 质量门禁
- `gstack`：浏览器 evidence、QA、review
- 本地 harness checks：task packet、evidence、adoption

## 默认工作流

### 1. Intake

- 判断当前工作是 `trivial` 还是 `non-trivial`
- 如果是 non-trivial，先创建或选择一个 `OpenSpec` change

### 2. Design

- 使用 `superpowers:brainstorming`
- 产出 design / spec 结果
- 明确 scope 边界

### 3. Planning

- 使用 `superpowers:writing-plans`
- 产出可执行的具体实现计划

### 4. Task Packet

- 根据 plan 创建 task packet
- 填写 linkage 字段：
  - task id
  - openspec change
  - evidence directory
  - review file

### 5. Implementation

- 使用 `superpowers:executing-plans` 或同等严格的执行方式
- 如果进入调试，转入 `systematic-debugging`

### 6. UI Quality

- 如果触碰 UI，运行 `impeccable`
- 如果浏览器路径重要，通过 `gstack` 收集 evidence

### 7. Evidence

- 把命令结果保存到 `.harness/evidence/<task-id>/commands.json`
- 把人类可读摘要保存到 `summary.md`
- 把 review 输出保存到 `review.md`
- `review.md` 必须包含嵌入式 machine-readable JSON block

### 8. Mechanical Checks

- 运行：
  - `check-task-packet`
  - `check-evidence`
  - `check-adoption`

### 9. Review

- 采用 findings-first 风格
- review 必须指向同一份 task packet 和 evidence

### 10. Close

- 合并或发布
- 完成后归档 OpenSpec change

## 最小 Machine-Readable 闭环

每个 non-trivial 任务都应当具备：

- 一个 OpenSpec change，或显式写 `none`
- 一个 task packet
- 一个 evidence directory
- 一个 review artifact

这四者必须通过显式字段互相引用，而不是只靠文件名约定。

可移植的最小闭环包括：

- task packet 的 `## Linkage`
- evidence 的 `linkage`
- review 的 `## Machine Readable` JSON block

