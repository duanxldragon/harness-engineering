# Agent Adapters

> Adapter layer for Pantheon Harness agent integration

This directory contains tool-specific adapter configurations for Pantheon Harness.

## Supported Adapters

| Adapter | Description |
|---------|-------------|
| [codex.md](./adapters/codex.md) | OpenAI Codex CLI integration |
| [claude-code.md](./adapters/claude-code.md) | Anthropic Claude Code integration |
| [cursor.md](./adapters/cursor.md) | Cursor IDE integration |
| [github-copilot.md](./adapters/github-copilot.md) | GitHub Copilot integration |
| [openhands.md](./adapters/openhands.md) | OpenHands integration |
| [human.md](./adapters/human.md) | Human reviewer integration |

## Adapter Matrix

See [TOOL_ADAPTER_MATRIX.md](../architecture/harness/TOOL_ADAPTER_MATRIX.md) for full adapter capability matrix.

## Usage

Adapters define the interface contract between Pantheon Harness and each agent tool. Each adapter specifies:

- **Activation conditions** — When to use this adapter
- **Capability mapping** — How harness concepts map to tool capabilities
- **Constraint translation** — How harness guardrails translate to tool constraints
- **Evidence format** — How verification evidence is captured

## Related

- [AGENT_INTERFACE_CONTRACT.md](../architecture/harness/AGENT_INTERFACE_CONTRACT.md)
- [TOOL_ADAPTERS.md](../architecture/harness/TOOL_ADAPTERS.md)
