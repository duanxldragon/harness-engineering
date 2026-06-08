# Release Guide

English version: [RELEASE.md](./RELEASE.md)

这个工作区发布的是方法资产，而不是一个单体 starter 仓库。

## 发布单元

- `agentic-method-kit`
- `agentic-repo-shell`
- `sample-overlays`

## 发布检查清单

1. 更新待发布包中的版本元数据。
2. 在需要时更新 method kit 与 repo shell 之间的兼容性元数据。
3. 更新 changelog 和 upgrade notes。
4. 运行根级方法检查：
   - `node scripts/harness/check-adoption.mjs --strict`
   - `node scripts/harness/check-method-health.mjs --strict`
5. 运行包级测试：
   - `node --test agentic-repo-shell/scripts/harness/*.test.mjs`
   - `node --test sample-overlays/pantheon/scripts/harness/*.test.mjs`
6. 当 shell 或 overlay 发生变化时，运行 bootstrap smoke：
   - `pwsh ./scripts/bootstrap-agentic-repo.ps1 -TargetPath .tmp/release-smoke -OverlayPath sample-overlays/pantheon -Force`
   - `node .tmp/release-smoke/scripts/harness/check-method-health.mjs --strict --root .tmp/release-smoke`
   - `node --test .tmp/release-smoke/scripts/harness/*.test.mjs`
7. 验证完成后，清理临时 smoke 目录。

如果你要做完整的 distribution workspace 拆分演练，还可以使用：

- `pwsh ./scripts/scaffold-standalone-method-repo.ps1 -TargetPath .tmp/standalone-method-repo -Force`

## 打包规则

可发布面就是这些包目录本身。

默认发布范围包括：

- `agentic-method-kit/`
- `agentic-repo-shell/`
- `sample-overlays/`
- 用来描述或校验这些包的根级方法文档、manifest 和 bootstrap scripts

可选的本地 skill 同步资产不属于默认发布产物：

- `.codex/skills/.system/` 下同步进来的 user-home skills
- `.codex/skills/gstack-*/` 这类同步进来的外部 skill packs
- `.codex/skills/impeccable/` 与 `.codex/skills/ui-ux-pro-max/` 这类全局可用 helper skills 的本地副本

这些目录应被视为工作站加速层，而不是 canonical method source。
如果某个 skill 必须成为正式发布方法的一部分，应当有意识地整理并以 repo-owned skill 的方式提交，而不是借用本地同步输出顺带发布。

根工作区本身是：

- 一个维护环境
- 一个验证环境
- 一份历史记录

它不是下游仓库应该整包复制的最终产物。
