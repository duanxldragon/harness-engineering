# Codex Adapter

> OpenAI Codex CLI integration for Pantheon Harness

## Activation

Activate this adapter when using `codex` CLI for implementation tasks.

## Capability Mapping

| Harness Concept | Codex Capability |
|-----------------|------------------|
| Task Packet | CLI prompt with scoped instructions |
| Handoff Protocol | Structured output format |
| Verification Evidence | `--output` flag, file generation |
| Review Loop | Multi-turn session |

## Constraints

- Codex operates autonomously; use explicit boundary files
- File modifications require `--apply` flag
- Rate limits apply to API calls

## Evidence Format

```json
{
  "adapter": "codex",
  "version": "1.0.0",
  "sessionId": "...",
  "commands": [...],
  "artifacts": [...]
}
```
