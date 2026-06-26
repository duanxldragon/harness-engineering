# Context Engineering Guide

> Learn from Claude Code and OpenAI Codex best practices for managing agent context.

## 0. 概述

Context Engineering is the discipline of managing an agent's working memory. It is more important than prompt engineering. Agents who manage context well consistently outperform those who don't.

**Core principle**: Keep CLAUDE.md concise, use lazy-loading rules, and separate investigation from execution.

## 1. CLAUDE.md Size Control

### 1.1 Target Size

- **Hard limit**: 200 lines recommended
- **Over 300 lines**: Consider splitting into sub-rules

### 1.2 What Goes in CLAUDE.md

Only content that applies broadly across every session:
- Project structure and conventions
- Build/test commands
- Architecture constraints
- Role separation rules
- Quality gates

### 1.3 What Goes in Skills Instead

Domain knowledge or workflows relevant only sometimes:
- Specific domain rules
- Workflow templates
- Tool-specific patterns
- Project memory

## 2. Lazy-Loading Rules

Use path-based rule files for module-specific guidance:

```
.claude/rules/
├── *.md                    # Applied to all files
├── backend/*.md           # Applied to backend directory
├── frontend/src/*.md      # Applied to frontend source
└── tests/**/*.md          # Applied to test files
```

These files only load when relevant files are accessed, saving context tokens.

## 3. Context Budget

### 3.1 Response Modes

| Mode | Use When | Context Cost |
|------|----------|-------------|
| terse | Routine changes, clear tasks | Minimal |
| standard | Normal development tasks | Moderate |
| detailed | Complex architecture, security review | High |

### 3.2 /compact Trigger

When context reaches 40-50% capacity, compact the session:
- Claude Code: `/compact`
- Codex CLI: Similar context management

Signs you need compaction:
- Long conversation history
- Many files visited
- Slow responses

## 4. Context Pollution Prevention

### 4.1 Subagent Isolation

Use subagents for noisy tasks to keep the main context clean:

**Good candidates for subagent:**
- Deep file reading (10+ files)
- Searching across many paths
- Parallel investigation
- Research tasks

**Keep in main context:**
- Implementation
- Quick fixes
- Coordination

### 4.2 Subagent Patterns

```markdown
---
name: code-explorer
description: Explore and map code structure
agent: explore
context: fork
---

Task: [specific exploration goal]
Scope: [files/directories to explore]
Output: [summary format]
```

### 4.3 Context Hygiene Rules

1. **Separate intent from execution**: Plan first, then implement
2. **Name evidence clearly**: Don't bury verification results
3. **End sessions cleanly**: Summarize state before closing
4. **Resume selectively**: Use `/clear` for unrelated tasks

## 5. Retrieval Strategy

### 5.1 Entry Sources

Default retrieval order:
1. CLAUDE.md (always loaded)
2. Current task packet
3. Latest review summary
4. Raw file reading

### 5.2 Summary First

For large codebases:
- Use codegraph or structural tools first
- Read summaries before raw files
- Promote findings to documentation

### 5.3 Retrieval Helpers

| Helper | Use For |
|--------|---------|
| codegraph | Symbol lookup, impact, callers/callees |
| grep | Fast text search |
| semantic search | Meaning-based search |
| file structure | Directory overview |

## 6. Integration with Pantheon Harness

This guide complements:

- **Task Packet Spec**: Context Strategy field in task packets
- **Verification Evidence Spec**: Evidence format requirements
- **Workflow Routing**: When to use subagents

## 7. Version History

| Version | Date | Changes |
|---------|------|---------|
| v1.0 | 2026-06-26 | Initial version based on Claude Code and Codex best practices |
