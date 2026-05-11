---
{
  "id": "LT-DQ-006",
  "title": "LT-DQ-006 - Define A Ratio Null Contract",
  "content_type": "learner_task",
  "status": "published",
  "version": "0.1.0",
  "topic": "learner-tasks",
  "source_facts":
    [
      "FACT-BIGQUERY-SAFE-DIVIDE-RATIO-GUARD",
      "FACT-BIGQUERY-SAFE-CAST-DQ-NULL",
      "FACT-BI-RATIO-SUM-COMPONENTS-FIRST",
      "FACT-BI-RECONCILIATION-WINDOWS",
    ],
  "tags": ["tutorial", "synthetic-data", "data-quality"],
}
---

# LT-DQ-006 - Define A Ratio Null Contract

Area: data quality and metric contracts. Timebox: 15-20 minutes. Dataset:
`deposits-seed/v0.1.0`.

Objective: define and test a dashboard ratio contract that makes parse failures
and zero denominators visible before a report turns the result into a KPI.

After this task, you will be able to:

- Separate ratio numerator and denominator checks from chart formatting.
- Use local SQL to reproduce the same contract outcome expected from
  BigQuery-style safe casting and safe division.
- Explain why `NULL` ratio output is a control state, not a silent pass.

Training boundary: use synthetic training data only. This task is technical
learning material, not legal, regulatory, accounting, privacy, compliance, or
model-risk advice.

## Source Facts

This material is backed by source notes for the BI, platform, dataset, and regulatory facts it uses.

## Prerequisites

- Complete [LT-DQ-005](lt-dq-005-reconcile-dashboard-controls.md).
- Open the [deposits seed workbench](#/workbench/deposits-seed/v0.1.0).
- Use this task page as the complete instruction source; the workbench is only
  where you run the SQL.

## Steps

1. Paste this query into the browser SQL workbench. It uses DuckDB-compatible
   `TRY_CAST` and `NULLIF` so the exercise runs locally. In BigQuery, the
   source-backed production pattern is `SAFE_CAST` plus `SAFE_DIVIDE`.

```sql
WITH ratio_inputs(metric_name, approved_text, submitted_text) AS (
  VALUES
    ('standard_approval_rate', '12', '20'),
    ('zero_denominator_case', '4', '0'),
    ('bad_input_case', 'x', '10')
),
parsed AS (
  SELECT
    metric_name,
    TRY_CAST(approved_text AS DOUBLE) AS approved_count,
    TRY_CAST(submitted_text AS DOUBLE) AS submitted_count
  FROM ratio_inputs
)
SELECT
  metric_name,
  approved_count,
  submitted_count,
  approved_count / NULLIF(submitted_count, 0) AS approval_rate,
  CASE
    WHEN approved_count IS NULL OR submitted_count IS NULL THEN 'parse_error'
    WHEN submitted_count = 0 THEN 'zero_denominator'
    ELSE 'pass'
  END AS control_status
FROM parsed
ORDER BY metric_name;
```

2. Verify this deterministic output:

| metric_name            | approved_count | submitted_count | approval_rate | control_status   |
| ---------------------- | -------------- | --------------- | ------------- | ---------------- |
| bad_input_case         |                | 10              |               | parse_error      |
| standard_approval_rate | 12             | 20              | 0.6           | pass             |
| zero_denominator_case  | 4              | 0               |               | zero_denominator |

3. Write the metric contract in plain language:
   - numerator: approved applications or approved records after parsing;
   - denominator: submitted applications or submitted records after parsing;
   - display rule: show `NULL` as a control condition, not as zero;
   - release rule: report the control count beside the KPI until upstream data
     is fixed.
4. Run the control-count query:

```sql
WITH ratio_inputs(metric_name, approved_text, submitted_text) AS (
  VALUES
    ('standard_approval_rate', '12', '20'),
    ('zero_denominator_case', '4', '0'),
    ('bad_input_case', 'x', '10')
),
parsed AS (
  SELECT
    metric_name,
    TRY_CAST(approved_text AS DOUBLE) AS approved_count,
    TRY_CAST(submitted_text AS DOUBLE) AS submitted_count
  FROM ratio_inputs
),
scored AS (
  SELECT
    metric_name,
    CASE
      WHEN approved_count IS NULL OR submitted_count IS NULL THEN 'parse_error'
      WHEN submitted_count = 0 THEN 'zero_denominator'
      ELSE 'pass'
    END AS control_status
  FROM parsed
)
SELECT
  control_status,
  COUNT(*) AS row_count
FROM scored
GROUP BY control_status
ORDER BY control_status;
```

5. Verify the control summary:

| control_status   | row_count |
| ---------------- | --------- |
| parse_error      | 1         |
| pass             | 1         |
| zero_denominator | 1         |

## Checkpoints

- The valid case returns `approval_rate = 0.6`.
- The zero-denominator case returns a blank/NULL `approval_rate`.
- The bad input case returns a blank/NULL `approved_count` and
  `control_status = parse_error`.
- No account, customer, or synthetic IBAN fields are introduced.

## Visualization Or Reporting Action

Use the control summary as a bar chart design:

- dimension: `control_status`;
- metric: `row_count`;
- alert condition: any `parse_error` or `zero_denominator` row is non-zero.

The chart belongs beside the ratio KPI so a reviewer can see whether the KPI is
safe to interpret.

## Common Failure Modes

- Displaying `NULL` approval rates as zero without an explicit contract.
- Filtering out parse errors before counting them.
- Mixing numerator and denominator definitions into one chart formula.
- Treating local `TRY_CAST`/`NULLIF` syntax as the production BigQuery syntax;
  BigQuery-specific implementation should use the cited `SAFE_CAST` and
  `SAFE_DIVIDE` behavior.

## Self-Assessment

Mark the task complete only if you can explain why the valid ratio is `0.6`,
why the two failing cases remain visible, and how the dashboard should show the
control count next to the KPI.

## End Challenge

Write a one-line release note in this form:

`valid_rate=<rate>; parse_errors=<count>; zero_denominators=<count>; release_rule=<rule>`

The expected answer is:

`valid_rate=0.6; parse_errors=1; zero_denominators=1; release_rule=show_null_as_control_condition`

## Answer Reference

The expected values are fully derived from the inline synthetic rows in this
task. No external files, credentials, backend, or command-line tools are
required.
