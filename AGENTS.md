## Version Control

This repository uses **jj (Jujutsu)** colocated with git:
- **Local operations**: Use `jj` commands (`jj status`, `jj log`, `jj new`, `jj commit`, etc.)
- **Remote operations**: Use `git` commands (`git push`, `git pull`, `git fetch`, etc.)

jj is configured at the repo level only, not globally.

### Task Runner Commands

Use [Task](https://taskfile.dev) for streamlined git push workflows:

| Command | Description |
|---------|-------------|
| `task push` | Push current revision (auto-creates bookmark from description) |
| `task push:main` | Move `main` bookmark to @ and push |
| `task push:force` | Force push current bookmark |
| `task wiki:details` | Generate per-video wiki pages (transcript + Gemini summary) |
| `task status` | Show jj status and all bookmarks |
