# 010 - Cloud Evidence Challenge Pattern

## Objective

Define and implement the first cloud-evidence challenge pattern for tasks that involve BigQuery or Looker Studio but cannot be directly validated by GitHub Pages.

## Dependencies

- [004 - Challenge Manifest Schema](004-challenge-manifest-schema.md)
- [008 - Validators, Flags, And Progress](008-validators-flags-and-progress.md)

## Deliverables

- `cloud-evidence` challenge mode.
- Evidence input components for:
  - SQL text
  - CSV/JSON pasted result
  - Numeric values
  - Report URL
  - Checklist confirmation
- First placeholder or simple Looker Studio evidence challenge.
- Clear statement of what is mechanically verified and what is self-attested.

## Verification

- The app does not request credentials.
- Evidence is processed locally only.
- Validators can inspect pasted SQL and tabular evidence.
- The challenge clearly marks any manual/self-attested evidence.

## Tests

- Run unit tests for evidence parsers.
- Validate SQL text contains required table/view names.
- Validate pasted CSV/JSON has expected columns.
- Validate numeric evidence against configured ranges.
- Verify an invalid report URL fails format validation.
- Run app build.
