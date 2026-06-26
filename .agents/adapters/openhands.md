# OpenHands Adapter

> OpenHands integration for Pantheon Harness

## Activation

Activate this adapter when using OpenHands for autonomous implementation tasks.

## Capability Mapping

| Harness Concept | OpenHands Capability |
|-----------------|----------------------|
| Task Packet | Task instruction format |
| Handoff Protocol | Structured output |
| Verification Evidence | Action history, file diffs |
| Review Loop | Session replay |

## Constraints

- OpenHands operates autonomously
- Use sandbox mode for safety
- File modifications require explicit confirmation

## Evidence Format

```json
{
  "adapter": "openhands",
  "version": "1.0.0",
  "actions": [...],
  "artifacts": [...]
}
```
