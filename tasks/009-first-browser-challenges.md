# 009 - First Browser Challenges

## Objective

Add the first complete browser-verifiable banking BI challenges.

## Dependencies

- [008 - Validators, Flags, And Progress](008-validators-flags-and-progress.md)

## Deliverables

- Challenge 000: Orientation Quiz.
- Challenge 010: First Banking Dataset Inspection.
- Challenge 020: Account Owner Fanout CTF.
- Challenge content, manifests, checks, questions, and expected validation behavior.
- Challenge links from app navigation.

## Verification

- Each challenge has clear scenario, inputs, tasks, checks, and flag criteria.
- Each challenge can be completed from the browser with no local install.
- Challenge 020 proves that a naive join fails and a correct solution passes.
- All challenges use synthetic data only.

## Tests

- Run manifest validation.
- Run app build.
- Complete each challenge manually in the built site.
- Run known-good solutions through validators.
- Run at least one known-bad solution per challenge and verify failure.
- Verify completion status appears in the challenge index.
