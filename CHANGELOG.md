# Changelog

Pantheon Harness 方法论变更记录。按 semver 管理。

格式灵感：[Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)

---

## [1.0.0] — 2026-06-15

### Added
- **三权分立模型**：人（需求+验收）+ Claude（规划+审查）+ Codex（执行）的硬边界
- **Claude/Codex 写边界表**：明确 Claude 能改和不能改的文件类别
- **Task Packet 模板**：标准化 Claude→Codex 任务委派格式（最小/完整/SonarQube 修复）
- **非程序员验收清单**：6 维 20 项检查，不读代码也能验收
- **SonarQube 排除规则文档化**：6 条规则全量注释原因+日期+可删除条件
- **质量门禁矩阵**：Go test / TS / Lint / Build / SonarQube / Smoke / UI / Security 8 项门禁
- **OMX 配置标准化**：29 skills + 37 prompts + Explore Harness 警告消除
- **文档分层体系**：方法论→harness-engineering、平台→pantheon-base、业务→pantheon-ops
- **演化机制**：VERSION + CHANGELOG + 月度复盘模板 + 三次重复即固化规则

### Changed
- `CLAUDE.md` 新增 §三权分立 和 §Methodology 索引段
- `sonar-project.properties` 全面注释 + `sonar.qualitygate.wait=true`
- Workspace `docs/` 从 20 个文件精简为 3 个协调文档

### Removed
- 清理 workspace `docs/` 下已过时的分析方法报告
- 归档 Claude Code 最佳实践材料到 `archive/references/`

### Fixed
- OMX explore harness Windows 警告（设置 `OMX_EXPLORE_BIN`）
- OMX prompts/skills 数量从 4/6 补齐到 37/29

### Known Issues
- PR #73 smoke test selector 待修复（等待委派 Codex 执行）
- Claude 直接修改 `prefetch.ts` + `smoke spec` 的违规已记录
