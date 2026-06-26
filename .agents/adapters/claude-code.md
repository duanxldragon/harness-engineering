# Claude Code Adapter

> Anthropic Claude Code integration for Pantheon Harness

## Activation

Activate this adapter when using Claude Code CLI for implementation tasks.

## Capability Mapping

| Harness Concept | Claude Code Capability |
|-----------------|------------------------|
| Task Packet | `--system` prompt with scoped instructions |
| Handoff Protocol | Structured output format |
| Verification Evidence | File generation, test output |
| Review Loop | Native review mode |

## Constraints

- Claude Code operates with project context
- Use CLAUDE.md for project-specific rules
- File modifications require explicit approval

## Evidence Format

```json
{
  "adapter": "claude-code",
  "version": "1.0.0",
  "sessionId": "...",
  "commands": [...],
  "artifacts": [...]
}
```
