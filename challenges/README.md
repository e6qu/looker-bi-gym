# Challenge Manifests

Challenge manifests are authored as YAML in `challenges/manifests/`.

The static app does not read YAML directly. Run `bun run validate:manifests` to:

- validate every source manifest against `challenges/schema/challenge-manifest.schema.json`;
- validate draft manifests under `challenges/drafts/`;
- verify challenge IDs are unique;
- locally generate ignored `app/src/generated/challengeCatalog.json` for browser loading.

Only YAML files in `challenges/manifests/` are emitted to the browser catalog. Draft files are schema-validated authoring smoke tests.

Every challenge must declare `required_tools`. Use `none` for browser-only work.

See [Challenge Authoring Guide](AUTHORING.md) for mode selection, manifest fields, validators, dataset references, tutorial conversion rules, and example templates.

Invalid fixtures live in `challenges/fixtures/` and are used to prove validation fails with a clear error.

Solution fixtures live in `challenges/solution-fixtures/` and are used by `bun run test:fixtures` to prove released challenge validators pass known-good solutions and reject expected known-bad solutions.
