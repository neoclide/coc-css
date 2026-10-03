# Upstream review

## 2026-10-03

Reviewed `microsoft/vscode` `extensions/css-language-features` from
`d43a612ad8121ff1f7fe19a5ee13e237c3c5463c` (the previously synchronized
revision recorded in `.codex/coc-workflow.md`) to
`67cb2a17e24d903be7d50486a70d9bd835e95ad6`.

No runtime changes were applied:

| Upstream commit | Decision |
| --- | --- |
| `d693278c84bead7eabfd5f7e37c5fc3c9610033e` | Deferred: language-service 7.0.0-next.2 is ESM-only and uses LSP 3.18 types. A trial upgrade built but failed type checking at diagnostics, code actions and rename because the current server uses LSP 3.17. The trial manifest and lock changes were removed. A coordinated protocol migration requires separate compatibility work; this review does not claim dependency parity. |
| `3879d0e80fa` | Skipped: bracket-to-dot access is a lint-only change without behavior differences. |
| `e267cb54447` | Skipped: upstream build lockfile brace-expansion update; no corresponding direct dependency in this extension. |
| `d04893d5077` | Skipped: upstream npm audit lockfile changes; do not copy the VS Code dependency tree. |

Preserved Coc activation, configuration, commands, client-owned formatting,
push/pull diagnostics, CommonJS bundles, and the custom-data generation guard.
Baseline build, type checking and the custom-data race regression passed.
After removing the trial upgrade: build and type checking passed, unit tests
passed (1/1), Neovim integration passed (4/4), Vim integration passed (4/4),
contract inventory reported zero risks, and `git diff --check` passed. Vim
needed permission to listen on its local `/tmp` Unix socket.
