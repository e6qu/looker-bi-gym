# 011 - Authoring Guide And Tutorial Conversion Rules

## Objective

Document how to add new tutorials and convert existing markdown tutorials into challenge format.

## Dependencies

- [009 - First Browser Challenges](009-first-browser-challenges.md)
- [010 - Cloud Evidence Challenge Pattern](010-cloud-evidence-challenge-pattern.md)

## Deliverables

- Authoring guide for new challenges.
- Manifest field reference.
- Validator reference.
- Dataset reference.
- Tutorial conversion checklist.
- Required-tools policy.
- Example challenge templates.

## Verification

- A new challenge author can identify required files and fields.
- The guide explains how to choose challenge mode.
- The guide explains how to define verification and tests.
- The guide prohibits real banking data and secrets.
- The guide requires exact tool lists for any non-browser task.
- The guide rejects esoteric or highly platform-specific tooling.

## Tests

- Use the guide to create a minimal draft challenge.
- Run manifest validation on the draft.
- Run app build with the draft included.
- Verify the guide links to dataset, regulation, and task references.
- Search the guide for explicit warnings against real data and credentials.
- Search the guide for required-tools policy language.
