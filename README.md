# Harness Engineering

Chinese version: [README.zh.md](./README.zh.md)

Portable, tool-agnostic Harness Engineering for non-trivial software delivery with coding agents and human review.

Good agent output is not only a prompt problem. It is a harness problem. If you want repeatable delivery, you need explicit contracts, scoped task packets, verification evidence, review closure, and upgradeable checks.

## Why This Exists

Most teams adopting coding agents eventually hit the same wall:

- prompts are inconsistent
- task boundaries drift
- verification is ad hoc
- review lives in chat instead of durable artifacts
- switching tools means rebuilding the workflow

This repository packages the missing method layer.

## What You Get

- `agentic-method-kit/`, the portable method source of truth
- `agentic-repo-shell/`, the copyable repo-local shell for new projects
- `sample-overlays/pantheon/`, an optional example overlay, not part of the portable core
- `docs/harness/`, the repo-local contract projection and policy docs
- `scripts/`, the bootstrap and validation helpers

## Core Ideas

- Tool-agnostic. Codex, Claude Code, Cursor, Copilot, OpenHands, or human-led execution can use the same repo contracts.
- Explicit control layers. Guides, sensors, state, gates, templates, and adapters are separated on purpose.
- Durable closure. Task packets, evidence, review artifacts, and failure registry updates are part of delivery, not cleanup.
- Portable adoption. You copy the method into a repo instead of reinventing the workflow for each project.

## Quick Start

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
3. Optionally study or apply an example overlay such as `sample-overlays/pantheon/`
4. Run the harness checks

## Start Reading

- Method release note: [docs/METHOD_RELEASE_1_0.zh.md](./docs/METHOD_RELEASE_1_0.zh.md)
- Social and community copy pack: [docs/METHOD_RELEASE_1_0_SOCIAL.zh.md](./docs/METHOD_RELEASE_1_0_SOCIAL.zh.md)
- Full documentation map: [docs/README.md](./docs/README.md)

## Status

Current release line:

- method kit `1.0.0`
- repo shell `1.0.0`

Release metadata:

- [agentic-method-kit/METHOD_VERSION.json](./agentic-method-kit/METHOD_VERSION.json)
- [SHELL_VERSION.json](./SHELL_VERSION.json)
- [WORKSPACE_MANIFEST.json](./WORKSPACE_MANIFEST.json)

## Validation

```powershell
node scripts/harness/check-adoption.mjs --strict
node scripts/harness/check-method-health.mjs --strict
node scripts/harness/check-review.mjs --strict
node scripts/harness/check-template-health.mjs
node scripts/harness/check-runtime-evidence.mjs
node scripts/harness/check-doc-links.mjs --strict
node scripts/harness/check-doc-inventory.mjs --strict
node scripts/harness/check-sync-drift.mjs --strict
node scripts/harness/check-doc-frontmatter.mjs --report-legacy
node --test agentic-repo-shell/scripts/harness/*.test.mjs
node --test sample-overlays/pantheon/scripts/harness/*.test.mjs
```

## Canonical Sources

- `agentic-method-kit/` is the method source of truth
- `docs/harness/` is this repository's contract and policy projection layer
- root `.agents/` serves this distribution workspace itself
- `agentic-repo-shell/.agents/` serves downstream bootstrapped repositories

## Boundaries

This repository maintains and releases the method itself.

It is not where application business code, downstream runtime evidence, or project-specific archives should accumulate.

Project-specific overlays are examples or downstream assets. They must not be required by the portable method gate.
