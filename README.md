# Agentic Method Workspace

This repository is the standalone maintenance and distribution workspace for a reusable agentic development method.

Chinese documentation is available in [README.zh.md](./README.zh.md).

It is intentionally product-agnostic. Pantheon is supported through an optional overlay, but the repository itself is meant to serve any team that wants a portable Harness Engineering workflow across Codex, Claude Code, Cursor, GitHub Copilot, OpenHands, or human-driven execution.

## What This Repository Publishes

The method is distributed in layers:

- `agentic-method-kit/`: method source of truth, schemas, templates, playbook, version metadata
- `agentic-repo-shell/`: copyable repo-local shell with adapters, CI entrypoints, and runtime skeleton
- `pantheon-overlay/`: optional Pantheon-specific inheritance and governance overlay
- `docs/harness/`: root-level reference contracts for the method
- `scripts/`: bootstrap and validation helpers

This root repository is the canonical maintenance workspace for those layers. A downstream business repository should usually copy only the publishable surfaces, not this entire repo.

## Recommended Reading Order

Start here if you want to understand the method itself:

1. [agentic-method-kit/README.md](./agentic-method-kit/README.md)
2. [agentic-method-kit/METHOD_PLAYBOOK.md](./agentic-method-kit/METHOD_PLAYBOOK.md)
3. [docs/harness/HARNESS_ENGINEERING_CONTRACT.md](./docs/harness/HARNESS_ENGINEERING_CONTRACT.md)
4. [docs/harness/AGENT_INTERFACE_CONTRACT.md](./docs/harness/AGENT_INTERFACE_CONTRACT.md)
5. [docs/harness/TASK_PACKET_SPEC.md](./docs/harness/TASK_PACKET_SPEC.md)
6. [docs/harness/VERIFICATION_EVIDENCE_SPEC.md](./docs/harness/VERIFICATION_EVIDENCE_SPEC.md)
7. [docs/harness/REVIEW_LOOP_SPEC.md](./docs/harness/REVIEW_LOOP_SPEC.md)
8. [.agents/README.md](./.agents/README.md)

Then continue with repository distribution and release mechanics:

1. [DISTRIBUTION.md](./DISTRIBUTION.md)
2. [RELEASE.md](./RELEASE.md)
3. [MIGRATION_TO_STANDALONE_REPO.md](./MIGRATION_TO_STANDALONE_REPO.md)
4. [STANDALONE_REPO_BOOTSTRAP_CHECKLIST.md](./STANDALONE_REPO_BOOTSTRAP_CHECKLIST.md)
5. [PANTHEON_CONSUMER_SYNC_POLICY.md](./PANTHEON_CONSUMER_SYNC_POLICY.md)

## How To Use It In A New Project

For a normal repository bootstrap, the recommended copy set is:

1. `agentic-method-kit/`
2. `agentic-repo-shell/`
3. optional `pantheon-overlay/`

Use the root workspace directly only when you are maintaining or releasing the method itself.

## Environment

Minimum environment:

- `git`
- `node` 20+
- PowerShell for the provided bootstrap scripts

Optional but recommended:

- Codex, Claude Code, Cursor, or another agent runtime

No specific skill bundle is required to adopt the method. Skills are execution accelerators; the actual source of truth remains the repository contracts, templates, and checks.

## Validation And Release

Core release checks:

```powershell
node scripts/harness/check-adoption.mjs --strict
node scripts/harness/check-method-health.mjs --strict
node --test agentic-repo-shell/scripts/harness/*.test.mjs
node --test pantheon-overlay/scripts/harness/*.test.mjs
```

Release metadata currently starts at version `1.0.0`:

- [agentic-method-kit/METHOD_VERSION.json](./agentic-method-kit/METHOD_VERSION.json)
- [SHELL_VERSION.json](./SHELL_VERSION.json)
- [WORKSPACE_MANIFEST.json](./WORKSPACE_MANIFEST.json)

## Boundaries

What belongs here:

- method contracts
- schemas and templates
- tool adapters
- bootstrap scripts
- release and migration guides

What does not belong here:

- application business code
- foundation product code
- large project-specific archives
- active runtime evidence from consumer repositories
