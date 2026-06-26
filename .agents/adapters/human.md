# Human Reviewer Adapter

> Human reviewer integration for Pantheon Harness

## Activation

Activate this adapter when a human is performing review.

## Capability Mapping

| Harness Concept | Human Capability |
|-----------------|-------------------|
| Task Packet | Manual acceptance criteria review |
| Handoff Protocol | Face-to-face or written handoff |
| Verification Evidence | Manual testing, screenshot |
| Review Loop | Inline comments, approval |

## Constraints

- Humans provide judgment on quality
- Use [acceptance-checklist.zh.md](../architecture/methodology/acceptance-checklist.zh.md)
- Final approval authority

## Evidence Format

```json
{
  "adapter": "human",
  "version": "1.0.0",
  "reviewer": "...",
  "comments": [...],
  "approval": true
}
```
