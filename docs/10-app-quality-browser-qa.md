# App Quality And Browser QA

This checklist is for the static app quality pass. It keeps browser verification focused on learner-visible behavior and the no-backend boundary.

## Browser Targets

- Current stable Chrome on desktop.
- Current stable Safari on desktop.
- Narrow responsive viewport around 390 px wide.
- Tablet-sized responsive viewport around 768 px wide.

The browser SQL runtime requires WebAssembly, Web Workers, Blob URLs, ES modules, and local storage. If those features are blocked, the challenge page should keep the rest of the app readable and show a DuckDB-WASM loading or error message.

## Keyboard Checks

- Tab from the top of the page and confirm the skip link moves focus to the main content.
- Use Tab and Shift+Tab through primary navigation, document navigation, challenge cards, settings, and challenge forms.
- Confirm focus indicators are visible on links, buttons, inputs, textareas, checkboxes, radio buttons, and details summaries.
- Confirm hash-route navigation moves focus to main content after route changes.

## Challenge Form Checks

- Open `#/challenges/orientation-quiz` and confirm radio/select-all/numeric answers have visible prompts, labels, and status messages after checking answers.
- Open `#/challenges/first-banking-dataset` and confirm the SQL editor has a visible label, the run button is disabled while DuckDB-WASM loads, and query errors are shown as status messages.
- Open `#/challenges/looker-studio-evidence` and confirm evidence inputs have visible labels and descriptions.

## Network Boundary Check

Use browser developer tools while completing a browser-only challenge.

Expected network activity:

- Initial static app assets from the same origin.
- DuckDB-WASM JavaScript worker and WASM files from the same origin when a SQL challenge loads.

Unexpected network activity:

- Analytics, session replay, advertising, or telemetry endpoints.
- POST, PUT, PATCH, or DELETE requests carrying learner answers.
- Requests to Google Cloud, Looker Studio, or banking systems from the static app.

Learner answers and generated flags should stay in browser `localStorage`.
