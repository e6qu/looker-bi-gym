# 006 - Quiz Challenge Runtime

## Status

Implementation complete on 2026-05-05. Manual browser refresh verification is still pending because the sandbox cannot bind the Vite dev server and the escalation request was rejected by the environment.

## Objective

Implement the first mechanically graded quiz challenge mode.

## Dependencies

- [004 - Challenge Manifest Schema](004-challenge-manifest-schema.md)

## Deliverables

- [x] Quiz challenge renderer.
- [x] Supported question types:
  - Multiple choice
  - Select all that apply
  - Numeric answer
- [x] Per-question pass/fail feedback.
- [x] Overall quiz completion state.
- [x] First orientation quiz challenge.

## Verification

- [x] Quiz answers are loaded from challenge manifests or validator config.
- [x] Incorrect answers fail without completing the challenge.
- [x] Correct answers complete the challenge.
- [ ] Learner progress persists after page refresh.

## Tests

- [x] Run unit tests for quiz answer evaluation.
- [x] Test single-choice correct and incorrect answers.
- [x] Test select-all order-insensitive answers.
- [x] Test numeric answer tolerance where configured.
- [x] Run app build.
- [ ] Manually complete the orientation quiz and verify completion persists after refresh.

## Notes

- Quiz evaluator source: `app/src/quiz.ts`.
- Quiz UI source: `app/src/App.tsx`.
- Quiz test command: `pnpm test:quiz`.
- Full check command: `pnpm check`.
- `pnpm test:quiz`, `pnpm validate:manifests`, and `pnpm check` passed on 2026-05-05.
- `pnpm dev` failed in the sandbox with `listen EPERM: operation not permitted 127.0.0.1:5173`.
- The escalated `pnpm dev` request was rejected by the environment, so manual browser completion/refresh verification remains pending.
