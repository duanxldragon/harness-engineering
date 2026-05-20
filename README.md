# Harness Engineering

Chinese version: [README.zh.md](./README.zh.md)

Harness Engineering is a portable, tool-agnostic method for running non-trivial software delivery with coding agents and human reviewers.

It is built around one idea: good agent output is not just a prompt problem. It is a harness problem. You need explicit contracts, scoped task packets, verification evidence, review gates, and method health checks so work can be repeated, audited, and upgraded across repositories.

## What You Get

- `agentic-method-kit/`: the portable method source of truth
- `agentic-repo-shell/`: the copyable repo-local shell for new projects
- `pantheon-overlay/`: optional Pantheon-specific overlay
- `docs/harness/`: reference contracts and method docs
- `scripts/`: bootstrap and validation helpers

## What Makes This Different

- The method is tool-agnostic. Codex, Claude Code, Cursor, Copilot, OpenHands, or human-led execution can all use the same repo contracts.
- The method separates control layers clearly: guides, sensors, state, gates, templates, and adapters.
- The method treats verification and review artifacts as first-class deliverables, not optional afterthoughts.
- The method can travel. You copy the kit and shell into another repository instead of rebuilding the workflow from scratch.

## Start Here

If you want to understand the method:

1. [agentic-method-kit/README.zh.md](./agentic-method-kit/README.zh.md)
2. [agentic-method-kit/HARNESS_CORE_MODEL.zh.md](./agentic-method-kit/HARNESS_CORE_MODEL.zh.md)
3. [agentic-method-kit/HARNESS_COVERAGE_MODEL.zh.md](./agentic-method-kit/HARNESS_COVERAGE_MODEL.zh.md)
4. [agentic-method-kit/HARNESS_TEMPLATE_TAXONOMY.zh.md](./agentic-method-kit/HARNESS_TEMPLATE_TAXONOMY.zh.md)
5. [agentic-method-kit/TOOL_ADAPTER_MATRIX.zh.md](./agentic-method-kit/TOOL_ADAPTER_MATRIX.zh.md)
6. [agentic-method-kit/METHOD_PLAYBOOK.zh.md](./agentic-method-kit/METHOD_PLAYBOOK.zh.md)

If you want to adopt it in a new repository:

1. Copy `agentic-method-kit/`
2. Copy `agentic-repo-shell/`
3. Optionally apply `pantheon-overlay/`
4. Run the harness checks

For a fuller map of the repository, see [docs/README.md](./docs/README.md).

## Release Status

Current release line:

- method kit `1.0.0`
- repo shell `1.0.0`

Release metadata:

- [agentic-method-kit/METHOD_VERSION.json](./agentic-method-kit/METHOD_VERSION.json)
- [SHELL_VERSION.json](./SHELL_VERSION.json)
- [WORKSPACE_MANIFEST.json](./WORKSPACE_MANIFEST.json)

Public release note:

- [docs/METHOD_RELEASE_1_0.zh.md](./docs/METHOD_RELEASE_1_0.zh.md)

## Validation

Core checks:

```powershell
node scripts/harness/check-adoption.mjs --strict
node scripts/harness/check-method-health.mjs --strict
node scripts/harness/check-doc-frontmatter.mjs --report-legacy
node --test agentic-repo-shell/scripts/harness/*.test.mjs
node --test pantheon-overlay/scripts/harness/*.test.mjs
```

## Boundaries

This repository is for maintaining and releasing the method itself.

It is not where application business code, product runtime evidence, or project-specific archives should accumulate.
