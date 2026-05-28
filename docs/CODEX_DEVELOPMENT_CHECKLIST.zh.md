# Codex 开发检查清单

English version: [CODEX_DEVELOPMENT_CHECKLIST.md](./CODEX_DEVELOPMENT_CHECKLIST.md)

这是一份给新项目 `AGENTS.md` 使用的最短入口清单。它不替代完整流程卡，只负责让 Codex 在开始前快速自检。

## 开始前

- [ ] 我已经识别目标仓库：`pantheon-base`、`pantheon-ops` 或 `harness-engineering`
- [ ] 我已经判断任务层级：`platform`、`system/*` 或 `business/*`
- [ ] 我已经读了仓库本地的 `AGENTS.md` / `CLAUDE.md`
- [ ] 我已经读了这次任务对应的 design / contract / acceptance 文档

## 任务中

- [ ] 我优先复用了现有 skill、harness check、脚本或测试
- [ ] 如果是 UI 任务，我已经启用 `impeccable`
- [ ] 如果是跨层任务，我已经明确边界和依赖
- [ ] 如果是生成、删除、继承同步或高风险任务，我已经确认验证矩阵

## 完成前

- [ ] 我已经跑了与变更面匹配的验证
- [ ] 我已经记录 evidence、已知风险和未验证项
- [ ] 如果影响菜单、权限、i18n、schema、路由、文档或继承关系，我已经同步更新

## 何时升级

- 任务非 trivial 时，回到完整流程卡：
  - [Codex 开发流程增强卡](./CODEX_DEVELOPMENT_PROCESS.zh.md)

