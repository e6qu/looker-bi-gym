# Challenge Manifests

Challenge manifests are authored as YAML in `challenges/manifests/`.

The static app does not read YAML directly. Run `pnpm validate:manifests` to:

- validate every source manifest against `challenges/schema/challenge-manifest.schema.json`;
- verify challenge IDs are unique;
- locally generate ignored `app/src/generated/challengeCatalog.json` for browser loading.

Every challenge must declare `required_tools`. Use `none` for browser-only work.

Invalid fixtures live in `challenges/fixtures/` and are used to prove validation fails with a clear error.
