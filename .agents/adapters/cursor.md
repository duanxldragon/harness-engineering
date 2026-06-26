# Cursor Adapter

> Cursor IDE integration for Pantheon Harness

## Activation

Activate this adapter when using Cursor for implementation tasks.

## Capability Mapping

| Harness Concept | Cursor Capability |
|-----------------|-------------------|
| Task Packet | Agent mode with scoped instructions |
| Handoff Protocol | Structured output format |
| Verification Evidence | Inline diff, test panel |
| Review Loop | Built-in review panel |

## Constraints

- Cursor operates with full IDE context
- Use workspace rules in CLAUDE.md
- File modifications require user approval

## Evidence Format

```json
{
  "adapter": "cursor",
  "version": "1.0.0",
  "sessionId": "...",
  "commands": [...],
  "artifacts": [...]
}
```
