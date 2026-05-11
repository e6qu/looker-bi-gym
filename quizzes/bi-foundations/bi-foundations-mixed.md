---
id: bi-foundations-mixed
title: BI Foundations Mixed Quiz
estimated_minutes: 50
audience: Data analyst moving into BI and banking.
description: >
  Scenario-driven quiz covering BI grain, BigQuery SQL and serving patterns,
  Looker Studio data sources, controls, blends, credentials, and banking BI
  control decisions.
questions:
  easy:
    - id: q-easy-balance-row-grain
      type: multiple_choice
      estimated_seconds: 50
      recommended_learner_tasks: [LT-BI-001]
      source_facts:
        - FACT-BI-GRAIN-DECLARE-BEFORE-AGGREGATION
        - FACT-DEPOSITS-ACCOUNT-DAILY-BALANCES-GRAIN
      prompt: >
        A branch dashboard scorecard shows total deposit balance by currency
        for 2026-03-31. The balance source stores one snapshot per account per
        business date. At what grain does a single balance row exist before it
        is aggregated?
      options:
        - id: account_business_date
          label: One row per account and business date.
        - id: branch_only
          label: One row per branch, regardless of account or date.
        - id: product_only
          label: One row per product family.
      answer: account_business_date
      explanation: >
        The source row is an account-day balance snapshot. Dashboard totals can
        be interpreted only after that account-and-business-date grain is clear.
      self_assessment: >
        If the grain is unclear, profile rows and keys before interpreting a
        total.
    - id: q-easy-dashboard-field-minimisation
      type: select_all
      estimated_seconds: 60
      recommended_learner_tasks: [LT-BI-001, LT-LOOKER-004]
      source_facts:
        - FACT-GDPR-DATA-MINIMISATION
        - FACT-GDPR-PERSONAL-DATA
        - FACT-BIGQUERY-SELECT-LIST-NARROWING
      prompt: >
        A currency-level balance source needs `business_date`, `currency_code`,
        and aggregated balance. Which fields should be excluded unless a
        separate approved purpose exists?
      options:
        - id: account_id
          label: account_id
        - id: customer_id
          label: customer_id
        - id: synthetic_iban
          label: synthetic_iban
        - id: currency_code
          label: currency_code
      answer: [account_id, customer_id, synthetic_iban]
      explanation: >
        Currency is part of the aggregate. Account, customer, and IBAN-shaped
        identifiers are unnecessary for this output and should not ride along.
      self_assessment: >
        If a row identifier appears in an aggregate source, name the specific
        reporting purpose or remove it.
    - id: q-easy-looker-data-source-role
      type: multiple_choice
      estimated_seconds: 50
      recommended_learner_tasks: [LT-LOOKER-004]
      source_facts:
        - FACT-LOOKER-STUDIO-DATA-SOURCE
        - FACT-LOOKER-STUDIO-FIELD-TYPES
      prompt: >
        Before building Looker Studio charts, which layer should be inspected
        for field names, field types, and connection settings?
      options:
        - id: data_source
          label: The data source that connects data and exposes the field schema.
        - id: chart_title
          label: The chart title, because it defines field types.
        - id: viewer_activity
          label: Viewer activity, because clicks become report fields.
      answer: data_source
      explanation: >
        Looker Studio charts and controls use fields exposed by the data source.
        Checking the source layer prevents chart work from hiding schema or
        access issues.
      self_assessment: >
        If a chart field is surprising, inspect the data source before changing
        chart formatting.
    - id: q-easy-reusable-calculated-field
      type: multiple_choice
      estimated_seconds: 55
      recommended_learner_tasks: [LT-LOOKER-004]
      source_facts:
        - FACT-LOOKER-STUDIO-CALCULATED-FIELD-SCOPE
        - FACT-LOOKER-STUDIO-DATA-SOURCE
      prompt: >
        A `ledger_total` formula will be reused by several charts. Where is it
        safer to define it than inside one chart?
      options:
        - id: reusable_layer
          label: In upstream serving SQL or a reusable data-source field.
        - id: one_chart
          label: In the first scorecard only.
        - id: report_title
          label: In the report title.
      answer: reusable_layer
      explanation: >
        Chart-specific fields exist only in that chart. Reused metric logic
        belongs in a shared serving or data-source layer.
      self_assessment: >
        If two charts need the same metric, avoid copying a one-chart formula.
    - id: q-easy-logical-view-contract
      type: multiple_choice
      estimated_seconds: 55
      recommended_learner_tasks: [LT-LOOKER-004]
      source_facts:
        - FACT-BIGQUERY-LOGICAL-VIEW
        - FACT-BIGQUERY-VIEW-QUERY-RUNS-EACH-TIME
      prompt: >
        A BigQuery object should expose tested SQL to a dashboard without
        storing a new table. Which description fits a logical view?
      options:
        - id: sql_virtual_table
          label: A virtual table defined by SQL whose query runs when queried.
        - id: editable_dashboard_table
          label: A table edited directly by report viewers.
        - id: spreadsheet_copy
          label: A spreadsheet copy of the dashboard result.
      answer: sql_virtual_table
      explanation: >
        A logical view is a SQL-defined virtual table. It gives a reusable query
        contract, but its defining query still runs when the view is queried.
      self_assessment: >
        If a view is treated like stored results, revisit its query and cost
        behavior.
    - id: q-easy-ratio-zero-denominator
      type: multiple_choice
      estimated_seconds: 60
      recommended_learner_tasks: [LT-DQ-006]
      source_facts:
        - FACT-BIGQUERY-SAFE-DIVIDE-RATIO-GUARD
        - FACT-BI-RATIO-SUM-COMPONENTS-FIRST
      prompt: >
        A dashboard ratio can encounter a zero denominator. What must the
        metric contract state before release?
      options:
        - id: null_policy
          label: How NULL or zero-denominator results are displayed, counted, and reconciled.
        - id: always_zero
          label: That every zero-denominator case should display as zero.
        - id: skip_components
          label: That numerator and denominator definitions are unnecessary.
      answer: null_policy
      explanation: >
        Safe division protects query execution, not the dashboard meaning. The
        contract still needs component and display rules.
      self_assessment: >
        If NULL, zero, and blank all mean the same thing, the ratio contract is
        not ready.
    - id: q-easy-refresh-reference-date
      type: multiple_choice
      estimated_seconds: 55
      recommended_learner_tasks: [LT-LOOKER-004]
      source_facts:
        - FACT-LOOKER-STUDIO-DATA-FRESHNESS-TRADEOFF
        - FACT-BI-REFERENCE-DATE-SEPARATION
      prompt: >
        A report refreshed at 08:05, but the metric rows are for business date
        2026-03-31. What should the handoff keep separate?
      options:
        - id: refresh_vs_business_date
          label: Report refresh time and source business reference date.
        - id: same_control
          label: Nothing; refresh time and business date are always the same.
        - id: chart_position
          label: Only the chart position.
      answer: refresh_vs_business_date
      explanation: >
        Freshness tells when a report may query or cache data. It does not
        replace the source business date used by the metric.
      self_assessment: >
        If a timestamp is used as a business date, separate the two fields.
    - id: q-easy-control-contract
      type: multiple_choice
      estimated_seconds: 60
      recommended_learner_tasks: [LT-LOOKER-007]
      source_facts:
        - FACT-LOOKER-STUDIO-CONTROLS-FILTER-DATA
        - FACT-LOOKER-STUDIO-CONTROL-FIELD-ID
      prompt: >
        A Currency list control filters a deposits dashboard. What should its
        control contract name?
      options:
        - id: field_values_default_charts
          label: The bound field, allowed values, default value, and affected charts.
        - id: color_position_only
          label: Only the control color and screen position.
        - id: private_identifier
          label: A private customer identifier for precise filtering.
      answer: field_values_default_charts
      explanation: >
        Controls should be tied to stable data-source fields and to explicit
        value/default/chart behavior.
      self_assessment: >
        If a control cannot be traced to a field, do not use it to explain a
        metric change.
    - id: q-easy-parameter-value-boundary
      type: multiple_choice
      estimated_seconds: 60
      recommended_learner_tasks: [LT-LOOKER-007]
      source_facts:
        - FACT-BIGQUERY-PARAMETERIZED-QUERY-USER-INPUT
        - FACT-BIGQUERY-PARAMETER-NOT-IDENTIFIER
      prompt: >
        A report passes a selected currency into BigQuery. Which value belongs
        in a query parameter?
      options:
        - id: currency_value
          label: "`RON` as the value for `@selected_currency`."
        - id: table_name
          label: The table name chosen by the report viewer.
        - id: where_fragment
          label: A pasted SQL fragment for the WHERE clause.
      answer: currency_value
      explanation: >
        Parameters are for values such as dates and currencies. Table names,
        column names, and SQL fragments stay in governed SQL.
      self_assessment: >
        If a selection changes SQL structure, redesign the serving query.
    - id: q-easy-deposit-guarantee-ceiling
      type: multiple_choice
      estimated_seconds: 55
      recommended_learner_tasks: [LT-BI-002]
      source_facts:
        - FACT-FGDB-100K-PER-DEPOSITOR-PER-BANK
        - FACT-DGSD-100K-EU
      prompt: >
        A Romanian/EU deposit guarantee note needs the standard ceiling amount
        in EUR. What amount should it use?
      options:
        - id: eur_100k
          label: "EUR 100,000 per depositor per bank."
        - id: ron_100k
          label: "RON 100,000 per account."
        - id: no_ceiling
          label: "No standard ceiling."
      answer: eur_100k
      explanation: >
        The standard ceiling used here is EUR 100,000 per depositor per bank.
        Coverage analysis still needs the correct depositor-bank grain.
      self_assessment: >
        If the amount is known but the grain is wrong, the coverage metric is
        still wrong.
    - id: q-easy-count-distinct-customers
      type: multiple_choice
      estimated_seconds: 55
      recommended_learner_tasks: [LT-BI-002]
      source_facts:
        - FACT-BIGQUERY-COUNT-DISTINCT-GRAIN
        - FACT-BI-FANOUT-JOIN-RISK
      prompt: >
        A joined table has one customer appearing on several account rows. Which
        aggregate best counts customers once inside each reporting group?
      options:
        - id: distinct_customer
          label: "`COUNT(DISTINCT customer_id)` at the intended reporting grain."
        - id: count_rows
          label: "`COUNT(*)` after the join."
        - id: sum_balances
          label: "`SUM(ledger_balance)` with no customer count."
      answer: distinct_customer
      explanation: >
        DISTINCT counts each customer value once within the grouped result.
        Row counts after a join can reflect account or owner rows instead of
        customer entities.
      self_assessment: >
        If the entity being counted can repeat after a join, use a distinct
        count or restore the entity grain first.
    - id: q-easy-sum-null-control
      type: multiple_choice
      estimated_seconds: 55
      recommended_learner_tasks: [LT-DQ-006]
      source_facts:
        - FACT-BIGQUERY-SUM-NULLS
        - FACT-BI-RECONCILIATION-WINDOWS
      prompt: >
        A branch balance group contains only missing balance values. What
        should the reconciliation output make visible before replacing the
        result with zero?
      options:
        - id: null_group
          label: That the group has no non-NULL balance values.
        - id: silent_zero
          label: That the missing group is automatically a true zero balance.
        - id: hide_branch
          label: That the branch should be hidden from all controls.
      answer: null_group
      explanation: >
        BigQuery SUM returns non-NULL totals when values exist, but an all-NULL
        or empty group can produce NULL. Reconciliation should distinguish
        missing evidence from a real zero.
      self_assessment: >
        If a NULL total is displayed as zero, note the rule and count the
        affected groups.
    - id: q-easy-partition-date-filter
      type: multiple_choice
      estimated_seconds: 55
      recommended_learner_tasks: [LT-LOOKER-007]
      source_facts:
        - FACT-BIGQUERY-PARTITION-FILTERS
        - FACT-BI-REFERENCE-DATE-SEPARATION
      prompt: >
        A large daily fact table is partitioned by business date. Which filter
        helps BigQuery avoid scanning irrelevant date partitions?
      options:
        - id: date_range_filter
          label: A predicate on the business-date partition field.
        - id: title_filter
          label: A report title that mentions the month.
        - id: no_filter
          label: No date predicate, because the dashboard chart has a date axis.
      answer: date_range_filter
      explanation: >
        Partition pruning depends on filters that reference the partition field.
        A chart label does not reduce the warehouse scan.
      self_assessment: >
        If a report has a date range, make sure the serving SQL can use it to
        constrain the scanned partitions.
    - id: q-easy-date-trunc-period-label
      type: multiple_choice
      estimated_seconds: 55
      recommended_learner_tasks: [LT-SQL-003]
      source_facts:
        - FACT-BIGQUERY-DATE-TRUNC-GRANULARITY
        - FACT-BI-REFERENCE-DATE-SEPARATION
      prompt: >
        A monthly trend should group daily transactions into calendar months.
        Which BigQuery-style transformation belongs in the serving query?
      options:
        - id: truncate_month
          label: Truncate the transaction date to month granularity.
        - id: free_text_month
          label: Type the month name manually into the chart title.
        - id: refresh_month
          label: Use the dashboard refresh month as the transaction month.
      answer: truncate_month
      explanation: >
        Period grouping should be derived from the source date at the intended
        granularity. Refresh timing is separate from the business date.
      self_assessment: >
        If the period label cannot be reproduced from source dates, move the
        transformation into SQL.
    - id: q-easy-window-row-preservation
      type: multiple_choice
      estimated_seconds: 60
      recommended_learner_tasks: [LT-SQL-003]
      source_facts:
        - FACT-BIGQUERY-WINDOW-PRESERVES-ROWS
        - FACT-BIGQUERY-QUALIFY-WINDOW-FILTER
      prompt: >
        A query adds `ROW_NUMBER()` to rank balances inside each account. What
        happens before a QUALIFY or WHERE-style filter is applied?
      options:
        - id: row_added_each_input
          label: Each input row remains and receives a window result.
        - id: rows_collapsed
          label: The account is automatically reduced to one row.
        - id: charts_filtered
          label: Looker Studio automatically removes historical rows.
      answer: row_added_each_input
      explanation: >
        Window functions compute over a row set but return a value for each row.
        A later filter is needed to keep only the latest ranked row.
      self_assessment: >
        If a ranking column appears without a filter, check whether historical
        rows are still present.
    - id: q-easy-pseudonymized-customer-id
      type: multiple_choice
      estimated_seconds: 55
      recommended_learner_tasks: [LT-LOOKER-004]
      source_facts:
        - FACT-GDPR-PSEUDONYMIZED-STILL-PERSONAL
        - FACT-GDPR-PERSONAL-DATA
      prompt: >
        A dashboard field contains hashed customer identifiers. What is the
        cautious privacy interpretation when re-identification remains possible?
      options:
        - id: still_personal
          label: Treat the field as personal data.
        - id: automatically_anonymous
          label: Treat the field as anonymous in every context.
        - id: no_access_review
          label: Remove all access review because the values are hashed.
      answer: still_personal
      explanation: >
        Pseudonymised or encrypted data can still be personal data when a person
        can be re-identified with additional information.
      self_assessment: >
        If an identifier can be linked back to a person, keep it out of broad
        aggregate outputs unless it is necessary.
    - id: q-easy-purpose-limited-output
      type: multiple_choice
      estimated_seconds: 55
      recommended_learner_tasks: [LT-LOOKER-004]
      source_facts:
        - FACT-GDPR-PURPOSE-LIMITATION
        - FACT-GDPR-DATA-MINIMISATION
      prompt: >
        A report purpose is monthly branch liquidity monitoring. Which design
        choice best matches that purpose?
      options:
        - id: aggregate_needed_fields
          label: Publish aggregate branch, date, currency, and balance fields needed for the metric.
        - id: raw_customer_export
          label: Include raw customer identifiers because they might be useful later.
        - id: unrelated_usage
          label: Add unrelated fields for future dashboard ideas.
      answer: aggregate_needed_fields
      explanation: >
        Purpose limitation and minimisation push the output toward fields needed
        for the stated BI purpose, not speculative raw-detail reuse.
      self_assessment: >
        If a field is present only because it might help someday, remove it or
        define a separate approved purpose.
    - id: q-easy-fgdb-payment-currency
      type: multiple_choice
      estimated_seconds: 50
      recommended_learner_tasks: [LT-BI-002]
      source_facts:
        - FACT-FGDB-PAYS-RON
        - FACT-BI-REFERENCE-DATE-SEPARATION
      prompt: >
        A Romanian deposit-guarantee dashboard shows deposits in EUR and RON.
        Which currency detail is needed for compensation reporting context?
      options:
        - id: ron_payment_rate_date
          label: Compensation is paid in RON using the relevant BNR exchange-rate date.
        - id: original_currency_only
          label: Compensation is always paid only in the original account currency.
        - id: no_currency_date
          label: Currency conversion dates are irrelevant to compensation context.
      answer: ron_payment_rate_date
      explanation: >
        FGDB compensation context uses RON payment and a specific exchange-rate
        date, so the dashboard should keep currency and reference dates clear.
      self_assessment: >
        If a guarantee note mixes ledger currency and payment currency, add the
        conversion rule and date.
    - id: q-easy-looker-dimension-metric
      type: multiple_choice
      estimated_seconds: 55
      recommended_learner_tasks: [LT-LOOKER-004]
      source_facts:
        - FACT-LOOKER-STUDIO-DIMENSIONS-METRICS
        - FACT-LOOKER-STUDIO-DIMENSION-CONTEXT
      prompt: >
        In a branch balance table, `branch_region` groups rows and
        `ledger_balance` is summed. Which pairing describes their chart roles?
      options:
        - id: dimension_metric
          label: "`branch_region` is a dimension; `ledger_balance` is a metric."
        - id: metric_dimension
          label: "`branch_region` is a metric; `ledger_balance` is a dimension."
        - id: both_controls
          label: Both fields are only report controls and cannot appear in charts.
      answer: dimension_metric
      explanation: >
        Dimensions group or describe data, while metrics are aggregated. The
        selected dimensions affect the meaning of the displayed metric.
      self_assessment: >
        If a chart total changes when a grouping field is added, check the
        dimension and metric roles.
    - id: q-easy-reusable-data-source
      type: multiple_choice
      estimated_seconds: 55
      recommended_learner_tasks: [LT-LOOKER-004]
      source_facts:
        - FACT-LOOKER-STUDIO-EMBEDDED-REUSABLE-DATA-SOURCES
        - FACT-LOOKER-STUDIO-DATA-SOURCE
      prompt: >
        Two reports need the same governed balance fields and field types. Which
        Looker Studio choice supports reuse across reports?
      options:
        - id: reusable_data_source
          label: Use a reusable data source with the governed field schema.
        - id: duplicate_each_chart
          label: Recreate field definitions separately inside every chart.
        - id: hide_schema
          label: Avoid inspecting the data-source schema.
      answer: reusable_data_source
      explanation: >
        Reusable data sources let reports share a connection and field schema.
        That is safer than copying metric definitions chart by chart.
      self_assessment: >
        If two reports need the same field contract, prefer a shared data-source
        boundary.
  medium:
    - id: q-medium-fanout-delta
      type: numeric
      estimated_seconds: 70
      recommended_learner_tasks: [LT-BI-002]
      source_facts:
        - FACT-BI-FANOUT-JOIN-RISK
        - FACT-DEPOSITS-FANOUT-CONTROL-TOTALS
      prompt: >
        The correct latest account-grain balance total is 95700. The naive
        owner-joined total is 164800. What is the overstatement delta?
      answer: 69100
      explanation: >
        The owner join duplicates balance facts. The overstatement is 164800
        minus 95700, which equals 69100.
      self_assessment: >
        If the duplicated measure is not obvious, isolate the join before adding
        dashboard fields.
    - id: q-medium-reduce-before-join
      type: multiple_choice
      estimated_seconds: 80
      recommended_learner_tasks: [LT-BI-002]
      source_facts:
        - FACT-BIGQUERY-REDUCE-BEFORE-JOIN
        - FACT-BI-FANOUT-JOIN-RISK
      prompt: >
        A query joins daily balances to owners before aggregating. Which rewrite
        best reduces fanout and unnecessary join work?
      options:
        - id: aggregate_first
          label: Aggregate balances to the required account/date or report grain before joining.
        - id: join_everything
          label: Join all raw rows first, then hope the chart aggregation fixes totals.
        - id: add_columns
          label: Add more owner columns so the join is easier to inspect visually.
      answer: aggregate_first
      explanation: >
        Reducing data before a join limits both cost and grain risk. Joining raw
        many-to-many rows first can multiply measures.
      self_assessment: >
        If the join changes the number of measure rows unexpectedly, reduce to
        the required grain first.
    - id: q-medium-qualify-latest-row
      type: multiple_choice
      estimated_seconds: 80
      recommended_learner_tasks: [LT-SQL-003]
      source_facts:
        - FACT-BIGQUERY-QUALIFY-WINDOW-FILTER
        - FACT-BIGQUERY-WINDOW-PRESERVES-ROWS
      prompt: >
        A BigQuery query ranks snapshots inside each account and needs only the
        latest row per account. Which pattern fits?
      options:
        - id: qualify_rank
          label: "Use `ROW_NUMBER() OVER (...)` and filter the rank with QUALIFY."
        - id: sum_history
          label: Sum every historical snapshot and let the chart pick the latest.
        - id: manual_pick
          label: Display all rows and choose the latest by sight.
      answer: qualify_rank
      explanation: >
        QUALIFY filters window-function results after ranking, which is a clear
        latest-row selection pattern.
      self_assessment: >
        If latest-row logic depends on chart sorting, move the selection into
        SQL.
    - id: q-medium-month-end-date-check
      type: multiple_choice
      estimated_seconds: 75
      recommended_learner_tasks: [LT-SQL-003]
      source_facts:
        - FACT-BIGQUERY-LAST-DAY-MONTH-END
        - FACT-BIGQUERY-DATE-TRUNC-GRANULARITY
        - FACT-BI-REFERENCE-DATE-SEPARATION
      prompt: >
        A monthly exposure query must keep only true month-end `as_of_date`
        values. Which check belongs in SQL?
      options:
        - id: last_day_check
          label: Compare `as_of_date` to the last day of its month.
        - id: string_month
          label: Keep rows where the date string contains the month name.
        - id: refresh_time
          label: Use the report refresh timestamp as the month-end date.
      answer: last_day_check
      explanation: >
        Month-end logic should use date functions and source reference dates,
        not string appearance or report refresh time.
      self_assessment: >
        If the month-end filter is not reproducible from the date value, rewrite
        it.
    - id: q-medium-safe-cast-control
      type: multiple_choice
      estimated_seconds: 80
      recommended_learner_tasks: [LT-DQ-006]
      source_facts:
        - FACT-BIGQUERY-SAFE-CAST-DQ-NULL
        - FACT-GDPR-ACCURACY
      prompt: >
        A source field should parse as a number, but some rows contain invalid
        text. After SAFE_CAST-style parsing, what should the control output
        include?
      options:
        - id: failed_parse_count
          label: A count of rows where parsing failed and produced NULL.
        - id: silent_drop
          label: No count, because failed casts should disappear silently.
        - id: accuracy_proven
          label: A statement that parsing proves the source is accurate.
      answer: failed_parse_count
      explanation: >
        SAFE_CAST-style parsing can produce NULL for bad inputs. Those NULLs are
        quality evidence and should be counted or reconciled.
      self_assessment: >
        If failed parses vanish before reconciliation, the control is hiding
        source quality evidence.
    - id: q-medium-looker-aggregation-context
      type: multiple_choice
      estimated_seconds: 80
      recommended_learner_tasks: [LT-LOOKER-004]
      source_facts:
        - FACT-LOOKER-STUDIO-DIMENSION-CONTEXT
        - FACT-LOOKER-STUDIO-DEFAULT-AGGREGATION
      prompt: >
        A Looker Studio table first groups a measure by currency, then by
        currency and branch. What should be checked before comparing the two
        totals?
      options:
        - id: dimension_context
          label: The chart dimensions and default aggregation used by the measure.
        - id: font_size
          label: Only the table font size.
        - id: viewer_history
          label: Each viewer's click history.
      answer: dimension_context
      explanation: >
        Looker Studio aggregates metrics in the context of chart dimensions.
        Changing dimensions can change what the displayed total means.
      self_assessment: >
        If a measure changes meaning when a dimension is added, check
        aggregation and grain.
    - id: q-medium-blend-field-scope
      type: select_all
      estimated_seconds: 90
      recommended_learner_tasks: [LT-BI-002, LT-LOOKER-004]
      source_facts:
        - FACT-LOOKER-STUDIO-BLEND-MORE-ROWS
        - FACT-LOOKER-STUDIO-BLEND-FIELD-SUBSET
        - FACT-BI-FANOUT-JOIN-RISK
      prompt: >
        A Looker Studio blend joins balances to a branch mapping. Which checks
        reduce the chance of wrong totals?
      options:
        - id: join_key_grain
          label: State the join key and expected grain before trusting the total.
        - id: needed_fields_only
          label: Include only the fields required for the chart.
        - id: compare_control_total
          label: Compare the blended total to a known upstream control total.
        - id: add_all_fields
          label: Add every available field so the blend is more complete.
      answer: [join_key_grain, needed_fields_only, compare_control_total]
      explanation: >
        Blends can create extra rows when join conditions match multiple
        records. Narrow fields, stated join grain, and upstream controls make
        that risk visible.
      self_assessment: >
        If a blend total lacks an upstream control total, reproduce the metric
        upstream before release.
    - id: q-medium-owner-viewer-credentials
      type: multiple_choice
      estimated_seconds: 80
      recommended_learner_tasks: [LT-LOOKER-004]
      source_facts:
        - FACT-LOOKER-STUDIO-OWNER-CREDENTIALS-RISK
        - FACT-LOOKER-STUDIO-VIEWER-CREDENTIALS
      prompt: >
        A Looker Studio report can run with owner credentials or viewer
        credentials. What is the practical access-control question?
      options:
        - id: whose_access
          label: Whether data is seen through the owner's access or each viewer's access.
        - id: chart_color
          label: Which chart color is used for restricted data.
        - id: file_name
          label: Whether the report title contains the data-source name.
      answer: whose_access
      explanation: >
        Credential mode affects whose access is used when the report reads data.
        That decision should match the intended sharing boundary.
      self_assessment: >
        If report viewers can see data without the intended access path, revisit
        credentials and serving views.
    - id: q-medium-dry-run-publication-check
      type: multiple_choice
      estimated_seconds: 75
      recommended_learner_tasks: [LT-LOOKER-007]
      source_facts:
        - FACT-BIGQUERY-QUERY-VALIDATOR-BYTES
        - FACT-BIGQUERY-DRY-RUN-BYTES
        - FACT-LOOKER-STUDIO-BIGQUERY-REFRESH-COST
      prompt: >
        A BigQuery-backed report query will refresh repeatedly. What should be
        checked before publication?
      options:
        - id: byte_estimate
          label: A query validator or dry-run byte estimate for the serving query.
        - id: screenshot_only
          label: Only a screenshot showing that the chart rendered once.
        - id: title_length
          label: The number of characters in the report title.
      answer: byte_estimate
      explanation: >
        Looker Studio refreshes can trigger BigQuery query costs. Pre-run byte
        estimates help judge whether the serving query is acceptable.
      self_assessment: >
        If a report query has no cost estimate, check it before repeated
        refreshes.
    - id: q-medium-control-parameter-predicate
      type: multiple_choice
      estimated_seconds: 80
      recommended_learner_tasks: [LT-LOOKER-007]
      source_facts:
        - FACT-BIGQUERY-PARAMETERIZED-QUERY-USER-INPUT
        - FACT-BIGQUERY-PARAMETER-NOT-IDENTIFIER
        - FACT-LOOKER-STUDIO-CONTROL-PARAMETER-INPUT
      prompt: >
        A Looker Studio control supplies a selected currency to a BigQuery-backed
        source. Which SQL predicate is the safe pattern?
      options:
        - id: named_parameter_predicate
          label: "`currency_code = @selected_currency`."
        - id: table_name_parameter
          label: "`FROM @selected_table`."
        - id: raw_sql_parameter
          label: "`WHERE @raw_filter_clause`."
      answer: named_parameter_predicate
      explanation: >
        The selected currency is a value, so it fits a named parameter
        predicate. SQL object names and query structure should remain fixed.
      self_assessment: >
        If a control changes query structure instead of a value, redesign the
        handoff.
    - id: q-medium-approx-count-distinct-use
      type: multiple_choice
      estimated_seconds: 75
      recommended_learner_tasks: [LT-BI-002]
      source_facts:
        - FACT-BIGQUERY-APPROX-COUNT-DISTINCT
        - FACT-BIGQUERY-COUNT-DISTINCT-GRAIN
      prompt: >
        A dashboard owner wants a fast exploratory estimate of unique accounts,
        then an exact count for a reconciliation signoff. Which pairing fits?
      options:
        - id: approximate_then_exact
          label: Use approximate distinct counts for exploration and exact distinct counts for signoff.
        - id: approximate_signoff
          label: Use approximate distinct counts as final reconciliation evidence.
        - id: row_count_signoff
          label: Use raw joined row counts for both purposes.
      answer: approximate_then_exact
      explanation: >
        Approximate distinct counts are estimates. Reconciliation and coverage
        checks should use exact grain-aware counts.
      self_assessment: >
        If the result will be used as a control total, avoid approximate counts.
    - id: q-medium-last-value-frame
      type: multiple_choice
      estimated_seconds: 80
      recommended_learner_tasks: [LT-SQL-003]
      source_facts:
        - FACT-BIGQUERY-LAST-VALUE-FRAME
        - FACT-BI-SEMI-ADDITIVE-BALANCE-SNAPSHOT
      prompt: >
        A query uses `LAST_VALUE(ledger_balance)` to get an account's latest
        balance. What must be specified carefully for the result to mean
        "latest"?
      options:
        - id: order_and_frame
          label: The ordering column and window frame.
        - id: chart_color
          label: The color used for the balance line.
        - id: report_title
          label: The dashboard title.
      answer: order_and_frame
      explanation: >
        LAST_VALUE depends on the current window frame. Latest-balance logic
        needs explicit ordering and frame behavior.
      self_assessment: >
        If navigation-window results look wrong, inspect the window frame before
        changing the chart.
    - id: q-medium-partition-by-window
      type: multiple_choice
      estimated_seconds: 75
      recommended_learner_tasks: [LT-SQL-003]
      source_facts:
        - FACT-BIGQUERY-PARTITION-BY-WINDOW
        - FACT-BIGQUERY-WINDOW-PRESERVES-ROWS
      prompt: >
        A running balance diagnostic should restart separately for each account.
        Which window-clause element creates those independent account groups?
      options:
        - id: partition_by_account
          label: "`PARTITION BY account_id`."
        - id: order_only
          label: Only `ORDER BY business_date` with no partition.
        - id: group_by_chart
          label: A Looker Studio chart grouping after the SQL runs.
      answer: partition_by_account
      explanation: >
        PARTITION BY divides the input rows into independent window partitions.
        Without it, rows from different accounts can share the same calculation
        context.
      self_assessment: >
        If a window result crosses entity boundaries, add the correct
        partitioning key.
    - id: q-medium-select-list-vs-star
      type: select_all
      estimated_seconds: 80
      recommended_learner_tasks: [LT-LOOKER-004]
      source_facts:
        - FACT-BIGQUERY-SELECT-LIST-NARROWING
        - FACT-GDPR-DATA-MINIMISATION
        - FACT-BIGQUERY-VIEW-SCOPE
      prompt: >
        A serving view feeds a public branch-level dashboard. Which choices make
        the output safer and cheaper than `SELECT *`?
      options:
        - id: required_columns
          label: Select only fields required by the dashboard purpose.
        - id: aggregate_before_publish
          label: Expose aggregated branch metrics instead of raw customer rows.
        - id: documented_scope
          label: Document the view scope and grain.
        - id: all_raw_columns
          label: Include every raw column so future charts have more options.
      answer: [required_columns, aggregate_before_publish, documented_scope]
      explanation: >
        Narrow serving views reduce scanned data and unnecessary personal-data
        exposure. They also make the BI contract easier to review.
      self_assessment: >
        If a dashboard source uses every raw column, challenge both performance
        and minimisation.
    - id: q-medium-view-region-check
      type: multiple_choice
      estimated_seconds: 70
      recommended_learner_tasks: [LT-LOOKER-004]
      source_facts:
        - FACT-BIGQUERY-VIEW-SAME-REGION
        - FACT-BIGQUERY-VIEW-LIMITATIONS
      prompt: >
        A BigQuery view in an EU dataset references a table in a different
        location. Which deployment issue should be checked first?
      options:
        - id: same_location
          label: Whether the view and referenced resources are in the same location.
        - id: chart_font
          label: Whether the report font matches the source table name.
        - id: viewer_language
          label: Whether the report viewer's browser language is English.
      answer: same_location
      explanation: >
        BigQuery logical views must reference resources in the same location as
        the view. Region mismatch is a serving-layer issue, not a chart-style
        issue.
      self_assessment: >
        If a view fails before any chart is built, check dataset locations and
        view limitations.
    - id: q-medium-view-sql-change
      type: multiple_choice
      estimated_seconds: 75
      recommended_learner_tasks: [LT-LOOKER-004]
      source_facts:
        - FACT-BIGQUERY-VIEW-SQL-VERSIONING
        - FACT-BIGQUERY-LOGICAL-VIEW
      prompt: >
        A dashboard still points to the same BigQuery view name, but the view's
        SQL has changed. What should the BI owner assume?
      options:
        - id: downstream_behavior_changed
          label: Downstream behavior may have changed even though the object name stayed the same.
        - id: no_change_possible
          label: Nothing can change unless the view name changes.
        - id: charts_ignore_sql
          label: Looker Studio ignores view SQL once a chart has been created.
      answer: downstream_behavior_changed
      explanation: >
        A logical view is defined by SQL. Changing that SQL changes the virtual
        table contract consumed by reports.
      self_assessment: >
        If a view powers reports, treat SQL changes as report-impacting changes.
    - id: q-medium-freshness-memory
      type: multiple_choice
      estimated_seconds: 75
      recommended_learner_tasks: [LT-DQ-005]
      source_facts:
        - FACT-LOOKER-STUDIO-FRESHNESS-MEMORY
        - FACT-LOOKER-STUDIO-DATA-FRESHNESS-TRADEOFF
      prompt: >
        A Looker Studio page displays an older value even after the source table
        was updated. Which explanation is plausible?
      options:
        - id: freshness_cache
          label: The report may still serve data from memory under the data freshness setting.
        - id: source_deleted
          label: The source table must have been deleted.
        - id: metric_invalid
          label: Every metric on the page is automatically invalid.
      answer: freshness_cache
      explanation: >
        Looker Studio freshness settings can allow report data to be served from
        memory. Freshness review should separate source updates from report
        serving behavior.
      self_assessment: >
        If values look stale, compare source update time, report freshness, and
        refresh behavior before changing metric logic.
    - id: q-medium-leftmost-blend-source
      type: multiple_choice
      estimated_seconds: 80
      recommended_learner_tasks: [LT-LOOKER-004]
      source_facts:
        - FACT-LOOKER-STUDIO-BLEND-LEFTMOST
        - FACT-LOOKER-STUDIO-BLEND-JOIN-CONFIG
      prompt: >
        A blend combines a complete balance source with a smaller branch mapping
        table. In the documented default pattern, why does source order matter?
      options:
        - id: retained_records
          label: The leftmost source determines the retained records.
        - id: color_palette
          label: The leftmost source determines the chart colors.
        - id: credential_mode
          label: The leftmost source always changes owner credentials to viewer credentials.
      answer: retained_records
      explanation: >
        Blend join configuration includes source order and join keys. In the
        documented default pattern, the leftmost source determines retained
        records.
      self_assessment: >
        If a blend loses expected rows, inspect join keys and source order.
    - id: q-medium-eligible-excluded-deposits
      type: select_all
      estimated_seconds: 85
      recommended_learner_tasks: [LT-BI-002]
      source_facts:
        - FACT-FGDB-ELIGIBLE-DEPOSITS
        - FACT-FGDB-EXCLUDED-DEPOSITS
        - FACT-FGDB-DEPOSIT-DEFINITION
      prompt: >
        A deposit-guarantee dataset contains account balances, depositor IDs,
        and an exclusion reason field. Which checks are needed before calculating
        covered balance?
      options:
        - id: eligible_deposit
          label: Keep only deposits that are eligible for guarantee treatment.
        - id: exclusion_reason
          label: Remove or separately report rows with an exclusion reason.
        - id: deposit_definition
          label: Confirm the balance represents a deposit or due interest concept.
        - id: branch_color
          label: Choose a branch chart color before checking eligibility.
      answer: [eligible_deposit, exclusion_reason, deposit_definition]
      explanation: >
        Coverage calculations need deposit definition and eligibility logic
        before applying the ceiling. Chart appearance cannot repair eligibility
        mistakes.
      self_assessment: >
        If excluded deposits are mixed with covered deposits, separate them
        before aggregating.
    - id: q-medium-purpose-and-minimisation
      type: select_all
      estimated_seconds: 80
      recommended_learner_tasks: [LT-LOOKER-004]
      source_facts:
        - FACT-GDPR-PURPOSE-LIMITATION
        - FACT-GDPR-ACCOUNTABILITY
        - FACT-BIGQUERY-VIEW-SCOPE
      prompt: >
        A new dashboard source will be shared with branch managers. Which
        evidence should exist before publishing?
      options:
        - id: stated_purpose
          label: A stated reporting purpose.
        - id: scoped_fields
          label: A field list limited to that purpose.
        - id: accountable_owner
          label: An owner or reviewer for the published source.
        - id: speculative_fields
          label: Extra raw fields kept for unrelated future ideas.
      answer: [stated_purpose, scoped_fields, accountable_owner]
      explanation: >
        Purpose, scoped fields, and ownership make the BI source reviewable.
        Speculative raw-detail fields weaken both privacy and BI contracts.
      self_assessment: >
        If the source has no stated purpose or owner, pause publication.
  hard:
    - id: q-hard-semi-additive-exposure
      type: multiple_choice
      estimated_seconds: 95
      recommended_learner_tasks: [LT-SQL-003]
      source_facts:
        - FACT-BI-SEMI-ADDITIVE-BALANCE-SNAPSHOT
        - FACT-BI-REFERENCE-DATE-SEPARATION
        - FACT-REAL-ESTATE-VALUATION-DATE-SEPARATION
      prompt: >
        A March exposure page has February and March loan snapshots plus
        collateral valuation dates. Which result should be the KPI?
      options:
        - id: latest_period_by_currency
          label: Latest-period principal by currency, with cross-date sums kept as controls.
        - id: all_snapshots_sum
          label: February and March principal summed together.
        - id: valuation_as_principal
          label: Collateral market value used as loan principal.
      answer: latest_period_by_currency
      explanation: >
        Balance and exposure snapshots are semi-additive: they can be summed
        across entities for one reference date, not blindly across time.
        Collateral valuation date is a separate concept.
      self_assessment: >
        If every date field is interchangeable, rebuild the exposure and
        valuation controls.
    - id: q-hard-fanout-metric-ownership
      type: multiple_choice
      estimated_seconds: 90
      recommended_learner_tasks: [LT-BI-002, LT-LOOKER-004]
      source_facts:
        - FACT-BI-FANOUT-JOIN-RISK
        - FACT-BIGQUERY-REDUCE-BEFORE-JOIN
        - FACT-LOOKER-STUDIO-CALCULATED-FIELD-SCOPE
      prompt: >
        A shared executive dashboard needs fanout-safe `ledger_total`. Where
        should the repair live?
      options:
        - id: shared_serving_logic
          label: In upstream serving SQL or a reusable data-source field.
        - id: single_chart_formula
          label: In a one-off formula hidden inside one chart.
        - id: raw_owner_join
          label: In the raw owner join before balance grain is restored.
      answer: shared_serving_logic
      explanation: >
        The raw owner join can duplicate balances. A shared metric should be
        repaired before charts reuse it, or later charts can reintroduce the
        same error.
      self_assessment: >
        If the fix exists only in one chart, move it to a shared layer before
        signoff.
    - id: q-hard-blend-freshness-signoff
      type: multiple_choice
      estimated_seconds: 90
      recommended_learner_tasks: [LT-LOOKER-004, LT-DQ-005]
      source_facts:
        - FACT-LOOKER-STUDIO-BLEND-FRESHNESS-MINIMUM
        - FACT-LOOKER-STUDIO-BLEND-JOIN-CONFIG
        - FACT-LOOKER-STUDIO-DATA-FRESHNESS-TRADEOFF
      prompt: >
        A report blends a BigQuery serving view with a branch mapping source.
        What must be checked before signing off freshness?
      options:
        - id: each_source_refresh
          label: Each source's freshness setting and how the blend uses the minimum refresh time.
        - id: bigquery_only
          label: Only the BigQuery source, because blends always inherit its freshness.
        - id: chart_order
          label: Only the order of charts on the page.
      answer: each_source_refresh
      explanation: >
        A blended source depends on the included sources and their join
        configuration. Freshness review should cover every included source.
      self_assessment: >
        If a blend has more than one source, freshness and join setup both need
        explicit review.
    - id: q-hard-refresh-cost-evidence
      type: select_all
      estimated_seconds: 95
      recommended_learner_tasks: [LT-LOOKER-004, LT-DQ-005]
      source_facts:
        - FACT-LOOKER-STUDIO-BIGQUERY-REFRESH-COST
        - FACT-BIGQUERY-JOBS-BYTES
        - FACT-BIGQUERY-JOBS-CREATION-TIME
      prompt: >
        A BigQuery-backed Looker Studio report refreshes automatically. Which
        evidence belongs in the operations review?
      options:
        - id: refresh_cost_note
          label: A note that report refreshes can trigger BigQuery query costs.
        - id: job_bytes
          label: Bytes processed for the dashboard query window.
        - id: job_time_window
          label: Job creation-time evidence for the review window.
        - id: chart_palette
          label: The color palette chosen by the report editor.
      answer: [refresh_cost_note, job_bytes, job_time_window]
      explanation: >
        Refresh settings can create BigQuery cost. Job bytes and creation-time
        evidence connect report behavior to observable warehouse activity.
      self_assessment: >
        If refresh behavior cannot be tied to job evidence, the operations note
        is incomplete.
    - id: q-hard-control-publication-review
      type: select_all
      estimated_seconds: 95
      recommended_learner_tasks: [LT-LOOKER-007, LT-DQ-005]
      source_facts:
        - FACT-BIGQUERY-DRY-RUN-BYTES
        - FACT-BIGQUERY-QUERY-VALIDATOR-BYTES
        - FACT-LOOKER-STUDIO-BIGQUERY-REFRESH-COST
        - FACT-LOOKER-STUDIO-CONTROLS-FILTER-DATA
      prompt: >
        Before publishing a dashboard page with date and currency controls over
        BigQuery data, which checks belong in the release review?
      options:
        - id: byte_estimate
          label: Pre-run byte estimate or dry-run evidence for the serving query.
        - id: control_scope
          label: Control fields, allowed values, defaults, and affected charts.
        - id: refresh_cost
          label: Expected cost behavior when the report refreshes.
        - id: raw_private_rows
          label: A pasted sample of raw private customer rows.
      answer: [byte_estimate, control_scope, refresh_cost]
      explanation: >
        The release review should connect controls, query cost evidence, and
        report refresh behavior. Raw private rows are not needed to validate
        that contract.
      self_assessment: >
        If controls and query cost are not reviewed together, the page is not
        ready for repeated use.
    - id: q-hard-authorized-view-access
      type: select_all
      estimated_seconds: 95
      recommended_learner_tasks: [LT-LOOKER-004]
      source_facts:
        - FACT-BIGQUERY-AUTHORIZED-VIEW-ACCESS-CONTROL
        - FACT-LOOKER-STUDIO-VIEWER-CREDENTIALS
        - FACT-GDPR-DATA-MINIMISATION
      prompt: >
        A branch dashboard needs selected aggregate data, while raw tables
        include unnecessary identifiers. Which design choices fit?
      options:
        - id: curated_view
          label: Expose only required fields through a curated or authorized serving view.
        - id: viewer_access_check
          label: Use a credential mode that matches the intended access boundary.
        - id: drop_unneeded_ids
          label: Exclude identifiers that are not needed for the dashboard purpose.
        - id: raw_table_direct
          label: Grant broad raw-table access because the dashboard only shows totals.
      answer: [curated_view, viewer_access_check, drop_unneeded_ids]
      explanation: >
        A serving view can expose selected data without raw-table access, and
        report credentials must match the access decision. Field minimisation
        still applies.
      self_assessment: >
        If raw-table access is broader than the report purpose, redesign the
        serving layer and credential mode.
    - id: q-hard-materialized-view-decision
      type: select_all
      estimated_seconds: 95
      recommended_learner_tasks: [LT-LOOKER-004, LT-LOOKER-007]
      source_facts:
        - FACT-BIGQUERY-VIEW-QUERY-RUNS-EACH-TIME
        - FACT-BIGQUERY-MATERIALIZED-VIEW-CACHE
        - FACT-BIGQUERY-MATERIALIZED-VIEW-LIMITATIONS
      prompt: >
        A dashboard query is reused often and the logical view is expensive.
        What should be checked before replacing it with a materialized view?
      options:
        - id: query_pattern
          label: Whether the repeated query pattern benefits from cached results.
        - id: sql_restrictions
          label: Whether the SQL fits materialized-view restrictions.
        - id: freshness_fit
          label: Whether cached refresh behavior fits the dashboard need.
        - id: any_sql_allowed
          label: That any logical-view SQL can be materialized without restrictions.
      answer: [query_pattern, sql_restrictions, freshness_fit]
      explanation: >
        Logical views run when queried. Materialized views can help compatible
        repeated patterns, but SQL shape and refresh behavior must fit their
        constraints.
      self_assessment: >
        If the decision is based only on speed, check SQL compatibility and
        freshness first.
    - id: q-hard-job-evidence-privacy
      type: select_all
      estimated_seconds: 95
      recommended_learner_tasks: [LT-DQ-005, LT-LOOKER-004]
      source_facts:
        - FACT-BIGQUERY-JOBS-USER-EMAIL
        - FACT-BIGQUERY-JOBS-BYTES
        - FACT-GDPR-PERSONAL-DATA
      prompt: >
        A cost review uses BigQuery job metadata. Which handling choices are
        appropriate before sharing the evidence widely?
      options:
        - id: keep_bytes
          label: Keep bytes processed and billing fields needed for cost review.
        - id: aggregate_users
          label: Aggregate or redact user-level identifiers when they are not needed.
        - id: time_window
          label: State the job observation window.
        - id: publish_emails
          label: Publish every user email because it appears in job metadata.
      answer: [keep_bytes, aggregate_users, time_window]
      explanation: >
        Job metadata can support cost review, but user-level fields can be
        personal data. Keep the cost evidence and minimise unnecessary identity
        exposure.
      self_assessment: >
        If job evidence includes identities, state why they are needed or remove
        them.
    - id: q-hard-depositor-bank-grain
      type: multiple_choice
      estimated_seconds: 95
      recommended_learner_tasks: [LT-BI-002]
      source_facts:
        - FACT-FGDB-JOINT-ACCOUNT-HOLDERS
        - FACT-DGSD-AGGREGATE-PER-DEPOSITOR
        - FACT-BI-FANOUT-JOIN-RISK
      prompt: >
        A deposit-guarantee analysis includes joint accounts and several
        accounts per customer. Which grain is needed before comparing balances
        to the guarantee ceiling?
      options:
        - id: depositor_bank
          label: Depositor-bank grain, with joint-account ownership handled explicitly.
        - id: account_only
          label: Account grain only, because account balances already equal depositor coverage.
        - id: branch_only
          label: Branch grain only, because branch totals determine coverage.
      answer: depositor_bank
      explanation: >
        Deposit-guarantee coverage aggregates per depositor per bank. Account
        ownership and joint-account rules make account-only totals insufficient.
      self_assessment: >
        If the analysis stops at account totals, it is not a coverage-grain
        result.
    - id: q-hard-operations-dependency-register
      type: select_all
      estimated_seconds: 95
      recommended_learner_tasks: [LT-DQ-005, LT-LOOKER-004]
      source_facts:
        - FACT-DORA-ICT-IDENTIFICATION
        - FACT-DORA-THIRD-PARTY-REGISTER
        - FACT-BIGQUERY-JOBS-BYTES
      prompt: >
        A dashboard supports an internal operations control. Which items belong
        in its dependency register?
      options:
        - id: source_and_owner
          label: The report source, owner, and control purpose.
        - id: external_dependency
          label: External or platform dependencies that affect the report.
        - id: job_evidence
          label: Warehouse job evidence used to monitor query cost or activity.
        - id: decorative_theme
          label: Only the decorative report theme.
      answer: [source_and_owner, external_dependency, job_evidence]
      explanation: >
        Operational BI needs an inventory of important ICT assets and
        dependencies. For BigQuery-backed reports, job evidence can support cost
        and activity monitoring.
      self_assessment: >
        If a control dashboard has no owner or dependency record, its
        operational evidence is incomplete.
    - id: q-hard-temporary-high-balance
      type: select_all
      estimated_seconds: 95
      recommended_learner_tasks: [LT-BI-002, LT-DQ-005]
      source_facts:
        - FACT-DGSD-TEMPORARY-HIGH-BALANCES
        - FACT-FGDB-PAYS-RON
        - FACT-BI-REFERENCE-DATE-SEPARATION
      prompt: >
        A depositor has a balance above the standard guarantee ceiling because
        of a recent protected event. Which fields are needed before modelling
        temporary high-balance treatment?
      options:
        - id: event_type
          label: The event type supporting temporary high-balance treatment.
        - id: event_and_protected_dates
          label: Event date, protected-until date, and unavailability date.
        - id: currency_conversion_context
          label: Currency and exchange-rate-date context for compensation reporting.
        - id: chart_background
          label: The dashboard background color.
      answer:
        [event_type, event_and_protected_dates, currency_conversion_context]
      explanation: >
        Temporary high-balance treatment depends on event evidence and dates,
        while Romanian compensation context also needs currency conversion
        context.
      self_assessment: >
        If a balance simply exceeds the ceiling with no event evidence, do not
        model it as temporarily protected.
    - id: q-hard-dora-incident-evidence
      type: select_all
      estimated_seconds: 95
      recommended_learner_tasks: [LT-DQ-005, LT-LOOKER-004]
      source_facts:
        - FACT-DORA-INCIDENTS
        - FACT-DORA-BACKUP-RESTORE
        - FACT-DORA-DATA-CONFIDENTIALITY-INTEGRITY
      prompt: >
        A banking BI dashboard supports an operational incident review. Which
        evidence should be captured for the report dependency?
      options:
        - id: incident_window
          label: The incident or observation window affecting the dashboard.
        - id: backup_restore_dependency
          label: Backup or restore dependency notes for the data pipeline.
        - id: integrity_confidentiality
          label: Data integrity and confidentiality controls relevant to the report.
        - id: decorative_layout
          label: The decorative layout chosen for the incident page.
      answer:
        [incident_window, backup_restore_dependency, integrity_confidentiality]
      explanation: >
        Operational resilience review is about ICT incidents, restore
        dependencies, and data protection qualities, not visual decoration.
      self_assessment: >
        If a dashboard is used in an incident review, record the dependency and
        evidence window.
    - id: q-hard-eba-validation-change
      type: select_all
      estimated_seconds: 95
      recommended_learner_tasks: [LT-DQ-005]
      source_facts:
        - FACT-EBA-DPM-VALIDATION-RULES
        - FACT-EBA-VALIDATION-RULES-CHANGE
        - FACT-EBA-FRAMEWORK-VERSIONING
      prompt: >
        A regulatory-style BI pack has validation rules that changed between
        framework versions. What should a reviewer check before comparing two
        submitted periods?
      options:
        - id: rule_version
          label: The validation rule version used for each period.
        - id: framework_version
          label: The reporting framework version and reference date.
        - id: changed_rule_effect
          label: Whether changed rules explain differences in validation results.
        - id: chart_spacing
          label: Whether chart spacing is identical in both periods.
      answer: [rule_version, framework_version, changed_rule_effect]
      explanation: >
        Validation outcomes can change when framework or rule versions change.
        Period comparisons need the version context before drawing BI
        conclusions.
      self_assessment: >
        If a validation break appears after a framework update, check rule
        changes before assuming the data changed.
    - id: q-hard-region-aware-serving-layer
      type: select_all
      estimated_seconds: 95
      recommended_learner_tasks: [LT-LOOKER-004, LT-LOOKER-007]
      source_facts:
        - FACT-BIGQUERY-VIEW-SAME-REGION
        - FACT-BIGQUERY-VIEW-SQL-VERSIONING
        - FACT-BIGQUERY-AUTHORIZED-VIEW-ACCESS-CONTROL
      prompt: >
        A governed serving layer will expose aggregate EU-region warehouse data
        to Looker Studio. Which design checks belong before publishing the view?
      options:
        - id: location_check
          label: Confirm referenced tables and the view are in a compatible location.
        - id: sql_contract_review
          label: Review and version the SQL defining the virtual table contract.
        - id: access_boundary
          label: Use a curated or authorized view boundary for selected fields.
        - id: viewer_table_choice
          label: Let report viewers choose arbitrary raw table names at runtime.
      answer: [location_check, sql_contract_review, access_boundary]
      explanation: >
        The serving layer needs region compatibility, governed SQL, and a clear
        access boundary. Runtime raw-table selection is not an appropriate BI
        contract.
      self_assessment: >
        If the view location, SQL version, or access boundary is unknown, do not
        publish it as a stable dashboard source.
    - id: q-hard-query-cost-triage
      type: select_all
      estimated_seconds: 95
      recommended_learner_tasks: [LT-LOOKER-007, LT-DQ-005]
      source_facts:
        - FACT-BIGQUERY-PARTITION-FILTERS
        - FACT-BIGQUERY-SELECT-LIST-NARROWING
        - FACT-BIGQUERY-JOBS-BYTES
        - FACT-LOOKER-STUDIO-BIGQUERY-REFRESH-COST
      prompt: >
        BigQuery job evidence shows a dashboard query scanning far more bytes
        after a new date control was added. Which fixes should be investigated?
      options:
        - id: partition_predicate
          label: Push the selected date range into a partition-field predicate.
        - id: narrow_columns
          label: Remove unused columns from the serving SELECT list.
        - id: refresh_behavior
          label: Review how report refreshes trigger the query.
        - id: bigger_title
          label: Increase the report title size.
      answer: [partition_predicate, narrow_columns, refresh_behavior]
      explanation: >
        Partition filters, narrowed input, and refresh behavior all affect
        BigQuery-backed report cost. Styling does not reduce bytes processed.
      self_assessment: >
        If bytes processed spike after a control change, inspect predicates,
        selected columns, and refresh settings.
    - id: q-hard-stale-dashboard-root-cause
      type: select_all
      estimated_seconds: 95
      recommended_learner_tasks: [LT-DQ-005, LT-LOOKER-004]
      source_facts:
        - FACT-LOOKER-STUDIO-FRESHNESS-MEMORY
        - FACT-LOOKER-STUDIO-BLEND-FRESHNESS-MINIMUM
        - FACT-BI-REFERENCE-DATE-SEPARATION
      prompt: >
        A blended executive report shows yesterday's values for one source and
        current values for another. Which root-cause checks are relevant?
      options:
        - id: source_business_dates
          label: Compare each source's business reference date.
        - id: source_freshness
          label: Compare freshness settings across all blended sources.
        - id: memory_serving
          label: Check whether report data may still be served from memory.
        - id: chart_border
          label: Change the chart border style.
      answer: [source_business_dates, source_freshness, memory_serving]
      explanation: >
        Staleness can come from source reference dates, blend freshness
        settings, or report serving behavior. Visual styling cannot diagnose the
        data timing.
      self_assessment: >
        If sources disagree on date context, resolve that before explaining the
        metric.
    - id: q-hard-null-balance-reconciliation
      type: select_all
      estimated_seconds: 95
      recommended_learner_tasks: [LT-DQ-006, LT-DQ-005]
      source_facts:
        - FACT-BIGQUERY-SUM-NULLS
        - FACT-GDPR-ACCURACY
        - FACT-BI-RECONCILIATION-WINDOWS
      prompt: >
        A month-end branch report contains NULL balances for several branches.
        Which reconciliation actions are appropriate before publishing totals?
      options:
        - id: count_null_groups
          label: Count groups with missing or all-NULL balance inputs.
        - id: define_display_rule
          label: Define whether NULL displays as blank, zero, or a flagged issue.
        - id: investigate_source
          label: Investigate whether the missing values affect accuracy.
        - id: silently_zero
          label: Replace every NULL with zero without a note.
      answer: [count_null_groups, define_display_rule, investigate_source]
      explanation: >
        NULL handling affects both metric meaning and data quality evidence.
        Silent replacement hides whether the source has missing values.
      self_assessment: >
        If a total depends on NULL replacement, document the rule and the count
        of affected rows or groups.
    - id: q-hard-approx-count-coverage-risk
      type: multiple_choice
      estimated_seconds: 90
      recommended_learner_tasks: [LT-BI-002]
      source_facts:
        - FACT-BIGQUERY-APPROX-COUNT-DISTINCT
        - FACT-DGSD-AGGREGATE-PER-DEPOSITOR
        - FACT-FGDB-GUARANTEE-CEILING
      prompt: >
        A deposit-guarantee dashboard estimates covered depositors with
        `APPROX_COUNT_DISTINCT(depositor_id)`. Why is that unsuitable as final
        coverage evidence?
      options:
        - id: estimate_not_exact
          label: Coverage needs exact depositor-bank grouping before applying the ceiling.
        - id: approximate_required
          label: Guarantee rules require approximate counts.
        - id: account_level_enough
          label: Account-level estimates are always enough for coverage.
      answer: estimate_not_exact
      explanation: >
        Approximate distinct count is an estimate. Coverage calculations depend
        on exact depositor aggregation and the per-depositor ceiling.
      self_assessment: >
        If an estimate drives a guarantee number, replace it with exact
        depositor-bank logic.
    - id: q-hard-special-category-dashboard-risk
      type: select_all
      estimated_seconds: 95
      recommended_learner_tasks: [LT-LOOKER-004]
      source_facts:
        - FACT-GDPR-SPECIAL-CATEGORIES
        - FACT-GDPR-DATA-MINIMISATION
        - FACT-GDPR-SECURITY-PROCESSING
      prompt: >
        A proposed dashboard field could reveal special-category personal data
        and is not needed for the BI metric. Which publication decisions fit?
      options:
        - id: exclude_field
          label: Exclude the field from the dashboard source.
        - id: review_security
          label: Escalate access and security review if a valid purpose is later defined.
        - id: document_minimisation
          label: Document that the metric can be produced without the field.
        - id: publish_anyway
          label: Publish the field because the chart currently hides it.
      answer: [exclude_field, review_security, document_minimisation]
      explanation: >
        Special-category personal data needs careful handling, and minimisation
        still applies when the field is unnecessary for the metric.
      self_assessment: >
        If a sensitive field is not needed for the stated metric, remove it from
        the serving source.
    - id: q-hard-blend-vs-upstream-model
      type: multiple_choice
      estimated_seconds: 90
      recommended_learner_tasks: [LT-BI-002, LT-LOOKER-004]
      source_facts:
        - FACT-LOOKER-STUDIO-BLEND-MORE-ROWS
        - FACT-BIGQUERY-REDUCE-BEFORE-JOIN
        - FACT-LOOKER-STUDIO-CALCULATED-FIELD-SCOPE
      prompt: >
        A Looker Studio blend repeatedly overstates balances when branch mapping
        has duplicate keys. Which durable fix best protects all dashboard pages?
      options:
        - id: upstream_model_fix
          label: Deduplicate or aggregate to the intended grain upstream and expose a reusable metric.
        - id: hide_one_chart_total
          label: Hide the total on the one chart where the issue was first noticed.
        - id: add_duplicate_fields
          label: Add more duplicate mapping fields to the blend.
      answer: upstream_model_fix
      explanation: >
        Blend row multiplication is a grain problem. A durable fix belongs in
        upstream modelling or reusable metric logic, not in a single chart's
        presentation.
      self_assessment: >
        If duplicate keys can change a metric, repair the data shape before
        styling the report.
content_type: quiz_bank
status: published
version: 0.1.0
topic: bi-foundations
tags: [quiz, mixed-difficulty]
---

# BI Foundations Mixed Quiz

Scenario-driven quiz covering BI grain, browser SQL, BigQuery serving concepts,
Looker Studio mechanics, dashboard controls, and synthetic-data privacy
boundaries.
