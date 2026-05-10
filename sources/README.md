# Source Materials

This directory stores local source cards and downloaded source snapshots used by
the fact corpus. Source cards preserve official URLs, publishers, access dates,
short evidence quotes, and links to the `FACT-*` records that use the source.
Permissively licensed BigQuery and Looker Studio documentation is also mirrored
as complete article HTML snapshots inside Markdown files under
`sources/platforms/*/full/`.

The facts database loader currently reads these files together with
`docs/facts/` and builds a local SQLite database for programmatic verification
and future question generation. The planned canonical fact corpus location is
root `facts/`; until that migration lands, `docs/facts/` remains the committed
source path. Non-permissive third-party BI literature should not be copied in
full; keep source cards and short quotes unless the source license allows
snapshotting.

## Source Card Format

```md
## SRC-AREA-STABLE-ID

- Type: official law, official guidance, official product documentation, or
  local repository source.
- Publisher: source owner.
- URL: official source URL or local repository path.
- Accessed: YYYY-MM-DD for external sources.
- Used by facts:
  - `FACT-AREA-STABLE-ID`
- Relevant quotes:
  - "short exact quote"
- Notes: short local interpretation boundaries.
```

## Directories

- [law](law/): EU legislation and official legal texts.
- [regulators](regulators/): public regulator and scheme documentation.
- [platforms](platforms/): BigQuery and Looker Studio product documentation,
  including complete local snapshots for core pages.
- [literature](literature/): BI modeling source cards where full copying is not
  assumed to be allowed.
