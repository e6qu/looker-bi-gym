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
