# 013 - App Quality And Accessibility Pass

## Objective

Improve usability, accessibility, and robustness of the first app release.

## Dependencies

- [012 - CI And GitHub Pages Deployment](012-ci-and-github-pages-deployment.md)

## Deliverables

- Keyboard-accessible navigation.
- Accessible form labels for challenge inputs.
- Clear error states.
- Clear loading states for datasets and DuckDB-WASM.
- Responsive layout for common desktop and tablet sizes.
- Browser compatibility notes.
- No third-party analytics by default.

## Verification

- Core pages are usable with keyboard navigation.
- Challenge forms have labels and meaningful error messages.
- SQL runtime has loading/error states.
- App does not send learner data to external services.
- Site remains readable on narrow screens.

## Tests

- Run app build.
- Run available lint/accessibility checks.
- Manually navigate home, index, and challenge pages using keyboard only.
- Manually test at least Chrome and one additional browser.
- Inspect network activity during a browser-only challenge and confirm no learner answer data is transmitted.

## Implementation Notes

- Added a skip link and route-change focus management so keyboard users can move directly to the main content and land there after hash-route navigation.
- Added stronger shared focus-visible styles for links, buttons, form controls, and details summaries.
- Added visible labels for numeric quiz/checkpoint answers and the SQL editor.
- Added clearer SQL runtime loading, error, disabled, and running states with status-region announcements.
- Added a static SVG favicon so production previews no longer generate a browser console/network 404 for `/favicon.ico`.
- Added browser compatibility and no-third-party-analytics notes to `app/README.md`.
- Added [10 - App Quality And Browser QA](../../docs/10-app-quality-browser-qa.md) with repeatable keyboard, challenge-form, responsive, compatibility, and network-boundary checks.

## Verification Notes

- `bun typecheck` passed.
- `bun lint` passed.
- `bun build` passed.
- `bun validate:static-links` passed.
- `make check` passed after the favicon rebuild.
- `bun preview` was blocked by the sandbox with `listen EPERM` on `127.0.0.1:4173`; the approved run served the built app at `http://127.0.0.1:4173/`.
- Headless Chrome 148 smoke verification passed against the production preview for:
  - home route rendering;
  - skip-link focus;
  - hash-route focus on `#/challenges`;
  - rendered routes for docs, challenge index, orientation quiz, SQL challenge, and cloud-evidence challenge;
  - unlabeled input/textarea/select detection across those routes;
  - DuckDB-WASM SQL challenge readiness and query result rendering;
  - 390 px responsive challenge index without document-level horizontal overflow;
  - no unexpected external or mutation network requests during the browser-only flow;
  - no console errors after adding the favicon.
- Source inspection with `rg` found no app `fetch`, `XMLHttpRequest`, `sendBeacon`, analytics, telemetry, or WebSocket calls. The only relevant runtime calls are browser-local `localStorage`, DuckDB `registerFileText`, and a DuckDB Web Worker loaded from the built static assets.
- Safari 26.1 is installed, but `safaridriver` could not create a session because Safari's persistent "Allow remote automation" setting is disabled. Attempting to enable it was rejected as a persistent security-setting change. This second-browser verification remains documented in `BUGS.md` as a follow-up gap requiring explicit user action.
- The approved preview server was stopped after verification and confirmed unreachable on `127.0.0.1:4173`.
- Follow-up on 2026-05-10: branch `ci-ui-warning-checks` adds automated
  Playwright diagnostics collection for browser console warnings, browser
  console errors, uncaught page errors, and failed network requests. Local
  `bun run test:e2e` and full `bun run check` passed with that guard enabled,
  and no browser diagnostics were found in the covered rendered flows.
