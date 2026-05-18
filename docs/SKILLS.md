# Skills Policy

This repository keeps a project-local `.codex/skills` tree so the method can travel with the repository during migration.

## Default Source

The canonical skill source for a local developer is the user-level Codex skills directory:

- `C:\Users\xiaolong\.codex\skills`

## Recommended Sync Flow

When starting a new project or migrating this workspace to a new machine:

1. sync the user-level skills into the repository-local `.codex/skills`
2. commit the repository-local skills that are meant to travel with the project
3. let the project load its own local skills first

## Priority Rule

If a skill exists both in the user directory and in the project, the project-local copy wins for that repository session.

This prevents project migration from depending on manual skill installation.

## Maintenance Rule

Update the user-level skills when you want the change available across projects.
Update the repository-local skills when the project needs a pinned or customized copy.
