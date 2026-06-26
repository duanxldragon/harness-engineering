# GitHub Copilot Adapter

> GitHub Copilot integration for Pantheon Harness

## Activation

Activate this adapter when using GitHub Copilot for implementation tasks.

## Capability Mapping

| Harness Concept | Copilot Capability |
|-----------------|---------------------|
| Task Packet | Inline completion with context |
| Handoff Protocol | Manual state transfer |
| Verification Evidence | Manual test output capture |
| Review Loop | PR review integration |

## Constraints

- Copilot provides inline suggestions only
- No autonomous file creation
- Requires manual verification

## Evidence Format

```json
{
  "adapter": "github-copilot",
  "version": "1.0.0",
  "completions": [...],
  "artifacts": [...]
}
```
