# coc-css repository guide

The project skills under `.codex/skills` define the workflows for issue work,
audits, tests, upstream synchronization, and releases. Do not duplicate those
workflows here; this file contains only repository-specific constraints.

## Code map

- `src/index.ts` is the coc.nvim client entry point. It starts the language
  client, forwards filesystem requests, publishes custom-data changes, and
  registers the CSS, SCSS, and LESS range formatters.
- `server/cssServer.ts` owns the language-server behavior. Runtime-specific
  Node wiring belongs under `server/node/`; shared server helpers belong under
  `server/utils/`.
- `esbuild.js` creates two bundles: `lib/index.js` for the extension and
  `lib/server.js` for the language server. `lib/` is generated and ignored;
  change source files instead of editing bundle output.
- `schemas/package.schema.json` describes the `contributes.css.customData`
  extension contribution, not the extension's settings schema.

## Repository-specific invariants

- Keep the `css/customDataChanged` notification name and payload synchronized
  between `src/index.ts` and `server/cssServer.ts`.
- Keep client-side request handlers in `src/requests.ts` compatible with their
  server-side callers in `server/requests.ts`.
- Formatting is intentionally registered by the client per language. The
  server is started with `provideFormatter: false`; avoid registering the same
  formatter from both sides.
- Preserve both diagnostic modes in `server/utils/validation.ts`: the server
  selects pull diagnostics when the client advertises support and otherwise
  falls back to push diagnostics.
- Keep `coc.nvim` external to the bundle and out of server-only modules. The
  server bundle must continue to run independently over the LSP connection.
- Configuration changes must stay consistent across the relevant CSS, SCSS,
  and LESS entries in `package.json` and their user-facing documentation in
  `Readme.md`. Changes to the custom-data contribution must also update
  `schemas/package.schema.json`.
- The client and server sources retain different upstream formatting styles.
  Match the file being edited and avoid repository-wide formatting churn.
- Do not raise the `node12.16` esbuild target or the declared coc.nvim engine
  requirement as a side effect of unrelated work.

## Local validation facts

- `yarn.lock` is the tracked dependency lockfile; do not replace or rewrite it
  with another package manager unless dependency management is the task.
- The repository currently defines only `build` and `prepare` scripts. Run
  `yarn build` after source or build-configuration changes, and always run
  `git diff --check` before handing off a change.
