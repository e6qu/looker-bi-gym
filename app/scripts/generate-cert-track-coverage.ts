import { readdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

type Topic = {
  readonly id: string;
  readonly label: string;
  readonly area: TopicArea;
  readonly keywords: readonly RegExp[];
};

type TopicArea =
  | "BI modeling"
  | "BigQuery SQL"
  | "BigQuery cost"
  | "BigQuery security"
  | "Looker Studio"
  | "Privacy / regulation"
  | "Banking domain";

type SurfaceCoverage = {
  readonly quizHits: number;
  readonly flashcardHits: number;
  readonly examHits: number;
  readonly terminologyHits: number;
};

const scriptDir = dirname(fileURLToPath(import.meta.url));
const appRoot = join(scriptDir, "..");
const repoRoot = join(appRoot, "..");
const outputPath = join(repoRoot, "_development", "cert-track-coverage.md");

const topics: readonly Topic[] = [
  {
    id: "bi-grain",
    label: "BI grain (declare before aggregation)",
    area: "BI modeling",
    keywords: [/\bgrain\b/iu, /\bdeclare\s+(?:the\s+)?grain\b/iu],
  },
  {
    id: "bi-fanout",
    label: "Fanout (raw owner-join multiplies measures)",
    area: "BI modeling",
    keywords: [/\bfanout\b/iu, /\bfan-?out\b/iu],
  },
  {
    id: "bi-weighted-ratio",
    label: "Weighted average vs average-of-averages",
    area: "BI modeling",
    keywords: [
      /average[- ]of[- ]averages?/iu,
      /weighted\s+(?:average|ratio)/iu,
      /SUM\([^)]*\)\s*\/\s*SUM\(/u,
    ],
  },
  {
    id: "bi-count-star-vs-column",
    label: "COUNT(*) vs COUNT(column)",
    area: "BI modeling",
    keywords: [/COUNT\(\*\)\s+(?:and|vs)/iu, /COUNT\(column\)/iu],
  },
  {
    id: "bi-distinct-additive",
    label: "SUM(COUNT(DISTINCT)) additive trap",
    area: "BI modeling",
    keywords: [
      /SUM\([^)]*COUNT\(DISTINCT/iu,
      /distinct\s+count\b.*\b(?:additive|across\s+groups)/iu,
    ],
  },
  {
    id: "bi-semi-additive",
    label: "Semi-additive measures (balance snapshots)",
    area: "BI modeling",
    keywords: [/\bsemi-?additive\b/iu],
  },
  {
    id: "bi-scd",
    label: "Slowly Changing Dimensions (types 1/2/3)",
    area: "BI modeling",
    keywords: [/\bSCD\b/iu, /slowly\s+changing\s+dimension/iu],
  },
  {
    id: "bi-conformed",
    label: "Conformed dimensions",
    area: "BI modeling",
    keywords: [/\bconformed\s+dimension/iu],
  },
  {
    id: "bi-surrogate-key",
    label: "Surrogate vs natural key",
    area: "BI modeling",
    keywords: [/\bsurrogate\s+key/iu, /\bnatural\s+key/iu],
  },
  {
    id: "bq-logical-view",
    label: "BigQuery logical view (re-runs query)",
    area: "BigQuery SQL",
    keywords: [
      /logical\s+view/iu,
      /view\s+(?:runs|re-runs)\s+(?:its\s+)?query/iu,
    ],
  },
  {
    id: "bq-materialized-view",
    label: "BigQuery materialized view (cache + refresh + limits)",
    area: "BigQuery SQL",
    keywords: [/materiali[sz]ed\s+view/iu],
  },
  {
    id: "bq-clustering",
    label: "BigQuery clustering",
    area: "BigQuery cost",
    keywords: [
      /\bclustered\s+table/iu,
      /\bclustering\b/iu,
      /\bCLUSTER\s+BY\b/iu,
    ],
  },
  {
    id: "bq-partition-filter",
    label: "BigQuery partition filters / partition pruning",
    area: "BigQuery cost",
    keywords: [
      /partition\s+(?:filter|pruning)/iu,
      /partition-?field\s+predicate/iu,
      /partitioned\s+table/iu,
    ],
  },
  {
    id: "bq-results-cache",
    label: "BigQuery query results cache",
    area: "BigQuery cost",
    keywords: [/query\s+results\s+cache/iu, /\bcache_hit\b/iu],
  },
  {
    id: "bq-dry-run",
    label: "BigQuery dry run / query validator",
    area: "BigQuery cost",
    keywords: [/dry[- ]run/iu, /query\s+validator/iu],
  },
  {
    id: "bq-jobs-information-schema",
    label: "INFORMATION_SCHEMA.JOBS and job metadata",
    area: "BigQuery cost",
    keywords: [
      /INFORMATION_SCHEMA\.JOBS/u,
      /\bjob\s+metadata\b/iu,
      /total_bytes_(?:processed|billed)/iu,
    ],
  },
  {
    id: "bq-parameterized-query",
    label: "BigQuery parameterized queries (@name predicates)",
    area: "BigQuery SQL",
    keywords: [
      /parameterized\s+quer/iu,
      /@selected_\w+/u,
      /\bnamed\s+parameter/iu,
    ],
  },
  {
    id: "bq-safe-cast-divide",
    label: "SAFE_CAST and SAFE_DIVIDE",
    area: "BigQuery SQL",
    keywords: [/SAFE_CAST/u, /SAFE_DIVIDE/u],
  },
  {
    id: "bq-qualify",
    label: "QUALIFY for window-result filtering",
    area: "BigQuery SQL",
    keywords: [/\bQUALIFY\b/u],
  },
  {
    id: "bq-date-trunc",
    label: "DATE_TRUNC and last-day-of-month checks",
    area: "BigQuery SQL",
    keywords: [/DATE_TRUNC/u, /LAST_DAY/u, /\bmonth-?end\b/iu],
  },
  {
    id: "bq-authorized-view",
    label: "BigQuery authorized view",
    area: "BigQuery security",
    keywords: [/authori[sz]ed\s+view/iu],
  },
  {
    id: "bq-row-level-security",
    label: "BigQuery row-level security (ROW ACCESS POLICY)",
    area: "BigQuery security",
    keywords: [
      /row\s+access\s+polic/iu,
      /row-?level\s+securit/iu,
      /CREATE\s+ROW\s+ACCESS\s+POLICY/u,
    ],
  },
  {
    id: "bq-column-level-security",
    label: "BigQuery column-level security (policy tags)",
    area: "BigQuery security",
    keywords: [
      /column-?level\s+securit/iu,
      /policy\s+tag/iu,
      /fine-?grained\s+reader/iu,
    ],
  },
  {
    id: "ls-data-source",
    label: "Looker Studio data source",
    area: "Looker Studio",
    keywords: [/Looker\s+Studio\s+data\s+source/iu, /\bdata-?source\s+field/iu],
  },
  {
    id: "ls-calculated-field-scope",
    label: "Looker Studio calculated field scope (data-source vs chart-level)",
    area: "Looker Studio",
    keywords: [
      /calculated\s+field/iu,
      /chart-?level\s+calculated/iu,
      /report-?level\s+calculated/iu,
    ],
  },
  {
    id: "ls-blend",
    label: "Looker Studio blend (rows / leftmost / join types)",
    area: "Looker Studio",
    keywords: [
      /Looker\s+Studio\s+blend/iu,
      /blend\s+(?:join|operator|leftmost)/iu,
    ],
  },
  {
    id: "ls-credentials",
    label: "Looker Studio credentials (owner/viewer/service)",
    area: "Looker Studio",
    keywords: [
      /owner\s+credentials/iu,
      /viewer\s+credentials/iu,
      /service\s+account\s+credentials/iu,
    ],
  },
  {
    id: "ls-controls",
    label: "Looker Studio controls / parameters",
    area: "Looker Studio",
    keywords: [/Looker\s+Studio\s+control/iu, /control\s+parameter/iu],
  },
  {
    id: "ls-freshness",
    label: "Looker Studio data freshness intervals",
    area: "Looker Studio",
    keywords: [
      /data\s+freshness/iu,
      /freshness\s+(?:interval|setting|memory)/iu,
    ],
  },
  {
    id: "gdpr-personal-data",
    label: "GDPR personal data + special category",
    area: "Privacy / regulation",
    keywords: [
      /personal\s+data/iu,
      /special-?category\s+(?:personal\s+)?data/iu,
      /pseudonymi[sz]/iu,
    ],
  },
  {
    id: "gdpr-principles",
    label: "GDPR minimisation / purpose limitation / storage limitation",
    area: "Privacy / regulation",
    keywords: [
      /data\s+minimisation/iu,
      /purpose\s+limitation/iu,
      /storage\s+limitation/iu,
      /accountability/iu,
    ],
  },
  {
    id: "deposit-guarantee",
    label: "DGSD / FGDB deposit guarantee",
    area: "Banking domain",
    keywords: [
      /\bDGSD\b/u,
      /\bFGDB\b/u,
      /deposit-?guarantee/iu,
      /depositor-?bank/iu,
    ],
  },
  {
    id: "dora",
    label: "DORA ICT risk / incidents / third-party register",
    area: "Banking domain",
    keywords: [/\bDORA\b/u, /ICT\s+(?:risk|incident|third-?party)/iu],
  },
  {
    id: "crr-cet1",
    label: "CRR CET1 capital ratio",
    area: "Banking domain",
    keywords: [/\bCRR\b/u, /\bCET1\b/u, /capital\s+ratio/iu],
  },
  {
    id: "ifrs9",
    label: "IFRS 9 stage 1/2/3",
    area: "Banking domain",
    keywords: [/IFRS\s*9/iu, /expected\s+credit\s+loss/iu, /\bECL\b/u],
  },
  {
    id: "bcbs-239",
    label: "BCBS 239 RDARR principles",
    area: "Banking domain",
    keywords: [/BCBS\s*239/iu, /risk\s+data\s+aggregation/iu, /RDARR/u],
  },
  {
    id: "eba-validation",
    label: "EBA DPM and validation rules / versioning",
    area: "Banking domain",
    keywords: [
      /EBA\s+(?:DPM|validation\s+rule|reporting\s+framework)/iu,
      /\bDPM\b/u,
    ],
  },
  {
    id: "psd2",
    label: "PSD2 strong customer authentication / payment data",
    area: "Banking domain",
    keywords: [/\bPSD2\b/u, /strong\s+customer\s+authentication/iu, /\bSCA\b/u],
  },
  {
    id: "aml-cft",
    label: "AML / CFT suspicious activity, KYC sensitivity",
    area: "Banking domain",
    keywords: [/\bAML\b/u, /\bCFT\b/u, /\bKYC\b/u, /suspicious\s+activit/iu],
  },
  {
    id: "corep-finrep",
    label: "COREP / FINREP supervisory reporting templates",
    area: "Banking domain",
    keywords: [/\bCOREP\b/u, /\bFINREP\b/u, /supervisory\s+reporting/iu],
  },
];

type SurfaceFile = {
  readonly relativePath: string;
  readonly text: string;
};

async function* walkMarkdown(root: string): AsyncGenerator<SurfaceFile> {
  let entries;
  try {
    entries = await readdir(root, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    const fullPath = join(root, entry.name);
    if (entry.isDirectory()) {
      yield* walkMarkdown(fullPath);
      continue;
    }
    if (!entry.name.endsWith(".md")) {
      continue;
    }
    const text = await readFile(fullPath, "utf8");
    yield { relativePath: fullPath.slice(repoRoot.length + 1), text };
  }
}

async function collectText(root: string): Promise<string> {
  let combined = "";
  for await (const file of walkMarkdown(join(repoRoot, root))) {
    combined += "\n" + file.text;
  }
  return combined;
}

function countHits(text: string, topic: Topic): number {
  let count = 0;
  for (const keyword of topic.keywords) {
    const matches = text.match(new RegExp(keyword.source, keyword.flags + "g"));
    if (matches !== null) {
      count += matches.length;
    }
  }
  return count;
}

async function main(): Promise<void> {
  const [quizText, flashcardText, examText, terminologyText] =
    await Promise.all([
      collectText("quizzes"),
      collectText("flashcards"),
      collectText("exams"),
      collectText("terminology"),
    ]);

  const rows = topics.map((topic) => {
    const coverage: SurfaceCoverage = {
      quizHits: countHits(quizText, topic),
      flashcardHits: countHits(flashcardText, topic),
      examHits: countHits(examText, topic),
      terminologyHits: countHits(terminologyText, topic),
    };
    return { topic, coverage };
  });

  const lines: string[] = [];
  lines.push("# Cert-Track Coverage Matrix");
  lines.push("");
  lines.push(
    "Generated by `bun run coverage:cert-track`. Counts keyword hits per",
  );
  lines.push("named cert-track topic across each assessment surface.");
  lines.push("");
  lines.push(
    "A `0` for a topic on a surface means no question / card / entry on",
  );
  lines.push("that surface tests or defines it. The script does not judge");
  lines.push("quality; it only spots presence or absence of the keyword set.");
  lines.push("");
  lines.push("## Summary By Area");
  lines.push("");

  const areaSummary = new Map<TopicArea, { covered: number; total: number }>();
  for (const { topic, coverage } of rows) {
    const total =
      coverage.quizHits +
      coverage.flashcardHits +
      coverage.examHits +
      coverage.terminologyHits;
    const current = areaSummary.get(topic.area) ?? { covered: 0, total: 0 };
    areaSummary.set(topic.area, {
      covered: current.covered + (total > 0 ? 1 : 0),
      total: current.total + 1,
    });
  }

  lines.push("| Area | Topics covered |");
  lines.push("| ---- | -------------- |");
  for (const [area, summary] of areaSummary.entries()) {
    lines.push(`| ${area} | ${summary.covered} / ${summary.total} |`);
  }
  lines.push("");

  lines.push("## Topic Coverage");
  lines.push("");
  lines.push("| Topic | Quiz | Flashcards | Exam | Terminology |");
  lines.push("| ----- | ---: | ---------: | ---: | ----------: |");

  for (const { topic, coverage } of rows) {
    lines.push(
      `| ${topic.label} | ${coverage.quizHits} | ${coverage.flashcardHits} | ${coverage.examHits} | ${coverage.terminologyHits} |`,
    );
  }
  lines.push("");

  lines.push("## Under-Served Topics");
  lines.push("");
  lines.push("Topics with zero hits on at least one assessment surface (quiz,");
  lines.push("flashcards, or exam). Terminology coverage is informational; an");
  lines.push(
    "under-served topic on the assessment surfaces is where new questions",
  );
  lines.push("or cards have the highest cert-track payoff.");
  lines.push("");

  for (const { topic, coverage } of rows) {
    const gaps: string[] = [];
    if (coverage.quizHits === 0) gaps.push("quiz");
    if (coverage.flashcardHits === 0) gaps.push("flashcards");
    if (coverage.examHits === 0) gaps.push("exam");
    if (gaps.length === 0) continue;
    lines.push(
      `- **${topic.label}** (${topic.area}): missing on ${gaps.join(", ")}`,
    );
  }

  await writeFile(outputPath, lines.join("\n").trimEnd() + "\n", "utf8");
  process.stdout.write(
    `Wrote ${outputPath.slice(repoRoot.length + 1)} for ${topics.length} cert-track topics across 4 surfaces.\n`,
  );
}

await main();
