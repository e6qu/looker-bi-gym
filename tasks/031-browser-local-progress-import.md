# 031 - Browser-Local Progress Import

Status: complete locally on branch `browser-progress-import`; PR pending.

## Goal

Implement browser-local import for `looker-bi-gym.progress-export.v1` so a
learner can paste a previously exported progress JSON, validate it locally,
preview the imported completion evidence, and apply it only after confirmation.

## Deliverables

- Add a strongly typed import parser for `looker-bi-gym.progress-export.v1`.
- Validate the import format, storage version, privacy boundary, completion
  rows, challenge IDs, timestamps, flags, and passed check/question ID arrays.
- Keep import frontend-only: no backend, no file upload, no credentials, no real
  banking data, and no raw answers.
- Add Settings UI controls for paste, validate, preview, and apply.
- Write imported progress to `localStorage` and the same-site cookie only after
  the learner clicks Apply.
- Add unit coverage and Playwright coverage for the import flow.

## Verification

- Invalid privacy-boundary imports are rejected.
- Valid exports round-trip into browser progress state.
- Settings preview appears before Apply is enabled.
- Applying import writes browser-local state and shows a visible success
  message.
- The strict typing boundary remains intact: no `any`, broad `object` type,
  type-ignore comments, or avoidable casts.

## Tests

- `bun run test:progress-export` passed on 2026-05-10.
- `bun run test:e2e` passed on 2026-05-10 after approved local Vite preview
  port binding.
- `bun run typecheck` passed on 2026-05-10.
- `bun run lint` passed on 2026-05-10.
- `bun run test:platform-boundary` passed on 2026-05-10.
- `bun run check` passed on 2026-05-10 after approved local Vite preview port
  binding, including all 11 Playwright rendered UI tests.
