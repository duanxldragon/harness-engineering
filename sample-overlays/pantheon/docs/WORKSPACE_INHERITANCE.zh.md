# Pantheon Workspace Inheritance

English version: [WORKSPACE_INHERITANCE.md](./WORKSPACE_INHERITANCE.md)

这个工作区包含一个 foundation 仓库，以及一个或多个派生业务仓库。

## 仓库角色

- `pantheon-base`：foundation architecture、system-domain contracts、共享前后端规则以及共享验收标准的唯一权威源
- `pantheon-ops`：一个派生业务仓库，继承 `pantheon-base`，并增加 operations-domain 的业务模块
- 未来的 `pantheon-xx`：其他派生业务仓库，也应遵循同样的继承模型

## 知识放在哪里

### 放在 `pantheon-base`

- `AGENTS.md` 和 `DESIGN.md`
- `docs/contracts/` 下的 contracts
- `docs/designs/` 下的 system 和 platform 设计规则
- `docs/acceptances/` 下的共享 acceptance 和 review 标准

### 放在业务仓库

- 本地 `AGENTS.md`
- `docs/PROJECT_INHERITANCE.md`
- 业务域 design docs
- 在需要时补充业务域 acceptance 或 audit docs

### 放在工作区根目录

- `.codex/skills/` 下的共享 Codex skills
- inheritance templates
- base upgrade workflow

## 阅读顺序

### Base 工作

1. `pantheon-base/DESIGN.md`
2. `pantheon-base/AGENTS.md`
3. `pantheon-base/docs/README.md`
4. 对应的 base contracts、designs 和 acceptance docs

### 业务仓库工作

1. 工作区 `docs/WORKSPACE_INHERITANCE.md`
2. 本地仓库 `AGENTS.md`
3. 本地仓库 `docs/PROJECT_INHERITANCE.md`
4. `pantheon-base/DESIGN.md`
5. `pantheon-base/AGENTS.md`
6. 对应的 base contracts、designs 和 acceptance docs
7. 本地业务 design docs

## 不可违反的规则

- 不要把大量 base 文档复制到业务仓库里。
- 不要让业务仓库重新定义 `platform` 或 `system/*` 的 ownership。
- 如果要改 base 规则，先在 `pantheon-base` 中修改，再让业务仓库升级到新的 base 版本。

