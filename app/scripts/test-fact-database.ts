import assert from "node:assert/strict";
import { Database } from "bun:sqlite";
import { dirname, join } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import { buildFactDatabase } from "./fact-database";

type CountRow = {
  readonly count: number;
};

const scriptDir = dirname(fileURLToPath(import.meta.url));
const appRoot = join(scriptDir, "..");
const repoRoot = join(appRoot, "..");
const outputPath = join(tmpdir(), "looker-bi-gym-facts.sqlite");

const summary = await buildFactDatabase({ repoRoot, outputPath });

assert.equal(summary.outputPath, outputPath);
assert.ok(summary.sourceCount >= 30, "Expected at least 30 source cards.");
assert.ok(
  summary.sourceDocumentCount >= 20,
  "Expected at least 20 full source snapshots.",
);
assert.ok(summary.factCount >= 75, "Expected at least 75 facts.");
assert.ok(
  summary.factSourceCount >= summary.factCount,
  "Every fact should have at least one source link.",
);
assert.ok(
  summary.factLinkCount >= summary.factCount,
  "Expected at least one related-fact edge per fact on average.",
);
assert.ok(
  summary.factTripleCount >=
    summary.factSourceCount * 2 + summary.factLinkCount,
  "Expected triples to include source and fact graph edges.",
);

const database = new Database(outputPath, { readonly: true });
const sourceCount = database
  .query<CountRow, []>("SELECT COUNT(*) AS count FROM sources")
  .get();
const factCount = database
  .query<CountRow, []>("SELECT COUNT(*) AS count FROM facts")
  .get();
const unresolvedSourceCount = database
  .query<CountRow, []>(
    `SELECT COUNT(*) AS count
     FROM facts
     LEFT JOIN fact_sources ON facts.id = fact_sources.fact_id
     WHERE fact_sources.source_id IS NULL`,
  )
  .get();
const gdprSourceCount = database
  .query<CountRow, []>(
    `SELECT COUNT(*) AS count
     FROM fact_sources
     WHERE fact_id = 'FACT-GDPR-PERSONAL-DATA'
       AND source_id = 'SRC-GDPR-EC-DATA-PROTECTION'`,
  )
  .get();
const fullBigQueryDocumentCount = database
  .query<CountRow, []>(
    `SELECT COUNT(*) AS count
     FROM source_documents
     WHERE source_id = 'SRC-BIGQUERY-VIEWS-INTRO'
       AND path = 'sources/platforms/bigquery/full/views-intro.md'`,
  )
  .get();
const factSourceTripleCount = database
  .query<CountRow, []>(
    `SELECT COUNT(*) AS count
     FROM triples
     WHERE predicate = 'SUPPORTED_BY_SOURCE'`,
  )
  .get();
const factLinkTripleCount = database
  .query<CountRow, []>(
    `SELECT COUNT(*) AS count
     FROM triples
     WHERE predicate = 'RELATED_TO_FACT'`,
  )
  .get();

database.close();

assert.equal(sourceCount?.count, summary.sourceCount);
assert.equal(factCount?.count, summary.factCount);
assert.equal(unresolvedSourceCount?.count, 0);
assert.equal(gdprSourceCount?.count, 1);
assert.equal(fullBigQueryDocumentCount?.count, 1);
assert.equal(factSourceTripleCount?.count, summary.factSourceCount);
assert.equal(factLinkTripleCount?.count, summary.factLinkCount);
