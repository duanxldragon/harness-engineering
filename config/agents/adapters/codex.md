# Codex Adapter

Chinese version: [codex.zh.md](./codex.zh.md)

Codex is an execution adapter for the Pantheon Harness Engineering protocol.

## Required Reading

1. `docs/harness/harness-engineering-contract.md`
2. `docs/harness/agent-interface-contract.md`
3. `docs/harness/task-packet-spec.md`
4. `docs/harness/verification-evidence-spec.md`
5. `docs/harness/review-loop-spec.md`
6. Current repository `AGENTS.md`

## Codex-Specific Mapping

- Use `.codex/skills/*` only as helper workflows.
- If a skill conflicts with `docs/harness/*` or repository contracts, follow the repository contracts.
- Use shell commands for verification and report command results.
- Use `apply_patch` for manual file edits.
- Respect sandbox approval rules.
- Do not treat chat history as verification evidence.

## Output Requirements

Final responses must include:

- changed files
- commands run
- verification result
- evidence path or summary
- known gaps
