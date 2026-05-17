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
      estimated_seconds: 90
      recommended_learner_tasks: [LT-BI-001]
      source_facts:
        - FACT-BI-GRAIN-DECLARE-BEFORE-AGGREGATION
        - FACT-DEPOSITS-ACCOUNT-DAILY-BALANCES-GRAIN
      prompt: |
        Your team's deposits dashboard scorecard reads `RON 237,170` for
        2026-03-31. The branch finance lead expected something near
        `RON 79,000` - the dashboard is over by a factor of three. You
        open the source and find one row per account per
        `business_date`. There are 18 rows total (6 RON-or-EUR accounts
        across 3 business dates):

            business_date | account_id | currency_code | ledger_balance
            2026-03-29    | A1001      | RON           | 42800
            2026-03-29    | A1003      | RON           | 18640
            2026-03-29    | A1004      | RON           | 12200
            2026-03-29    | A1006      | RON           |  5100
            2026-03-30    | A1001      | RON           | 43120
            2026-03-30    | A1003      | RON           | 18810
            2026-03-30    | A1004      | RON           | 12150
            2026-03-30    | A1006      | RON           |  5050
            2026-03-31    | A1001      | RON           | 43000
            2026-03-31    | A1003      | RON           | 19000
            2026-03-31    | A1004      | RON           | 12300
            2026-03-31    | A1006      | RON           |  5000
            (plus six EUR rows across the same three dates)

        The scorecard formula is
        `SUM(ledger_balance) WHERE currency_code = 'RON'`, with no
        `business_date` filter. Why is the number too big?
      options:
        - id: snapshot_summed_across_dates
          label: |
            The SUM ran across all three `business_date` values, so
            each RON account was counted three times. The correct
            shape is `SUM(ledger_balance) WHERE currency_code = 'RON'
            AND business_date = (SELECT MAX(business_date) FROM
            account_daily_balances)`. The RON row for 2026-03-31 sums
            to 43000 + 19000 + 12300 + 5000 = `79,300`, which matches
            what the finance lead expected.
        - id: missing_currency_filter
          label: |
            The currency filter is matching EUR rows that were stored
            with the wrong code (e.g. `'EU'` instead of `'EUR'`). The
            SUM is picking those rows up; tighten the filter to
            `currency_code = 'RON'` with a `TRIM`.
        - id: aggregation_off
          label: |
            The Looker Studio data source has aggregation disabled for
            `ledger_balance`, so the scorecard shows a sum of the row
            count (3 dates × 4 RON accounts × an aggregation expression
            applied per-row instead of across rows). Re-enable
            "Default aggregation = Sum" on the data source field.
      answer: snapshot_summed_across_dates
      explanation: |
        A balance is a stock, not a flow. Summing the same account's
        balance across three snapshot dates triple-counts every RON
        account because the 2026-03-29 snapshot of A1001 (42800), the
        2026-03-30 snapshot (43120), and the 2026-03-31 snapshot
        (43000) are *the same money* observed at three reporting
        instants. The aggregate of all three (42800 + 43120 + 43000 =
        128920 for A1001 alone) is not a real number anyone can use.
        Adding the other three RON accounts the same way gets you
        close to the `237,170` the dashboard is showing.

        Fix the formula to filter to one `business_date`, ideally
        always the latest. Two practical shapes:

            -- in the warehouse view that the dashboard reads:
            WHERE business_date = (
              SELECT MAX(business_date) FROM account_daily_balances
            )

            -- in Looker Studio, a date-range control bound to
            -- business_date with default value = latest_date.

        If you publish the un-filtered version, the finance lead will
        budget against phantom money; a stock metric without a
        reference date is not a metric.
      self_assessment: |
        Whenever you see `SUM(...)` on a column whose name contains
        "balance", "outstanding", "exposure", "position", or
        "deposit", your first question to the author is "summed
        across which `business_date`(s)?". If the answer is "all of
        them", it is wrong.
    - id: q-easy-dashboard-field-minimisation
      type: select_all
      estimated_seconds: 90
      recommended_learner_tasks: [LT-BI-001, LT-LOOKER-004]
      source_facts:
        - FACT-GDPR-DATA-MINIMISATION
        - FACT-GDPR-PERSONAL-DATA
        - FACT-BIGQUERY-SELECT-LIST-NARROWING
      prompt: |
        You are preparing a "deposits by currency" page for a
        branch-management audience. Their role description does not
        include investigating individual depositors - they look at
        aggregates and decide whether to ask the operations team for
        a deeper drill-down. The raw source has these columns:

            business_date     DATE
            account_id        STRING   -- e.g. 'A1001'
            customer_id       STRING   -- e.g. 'C5001'
            synthetic_iban    STRING   -- e.g. 'RO49AAAA1B31007593840000'
            ledger_balance    INT64
            currency_code     STRING

        The chart needs `business_date`, `currency_code`, and a sum of
        `ledger_balance` per currency for the latest day. Which
        columns must NOT ride along into the serving view that feeds
        the chart? (Select all that apply.)
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
      explanation: |
        `currency_code` is part of the aggregation grouping and the
        chart's currency axis - it stays. The three identifier columns
        are personal-data-shaped (`account_id`, `customer_id`,
        `synthetic_iban`); leaving them in the serving view does two
        bad things at once. First, it lets any viewer who can
        re-issue the underlying query re-identify the depositor set,
        even though the chart only renders aggregates. Second, it
        widens the audit blast radius - any data leak or shared
        screenshot now contains identifiers.

        GDPR's data-minimisation principle (Article 5(1)(c)) says
        personal data shall be "adequate, relevant and limited to
        what is necessary in relation to the purposes for which they
        are processed". The "purpose" here is per-currency
        aggregate reporting; per-depositor identifiers are not
        necessary for that purpose. The shape that satisfies it:

            CREATE OR REPLACE VIEW serving_deposit_dashboard AS
            SELECT
              business_date,
              currency_code,
              SUM(ledger_balance) AS ledger_total
            FROM account_daily_balances
            GROUP BY business_date, currency_code;

        Anything beyond that goes in a separately access-controlled
        investigation view, not the dashboard's serving view.
      self_assessment: |
        For every column in a serving view, write one sentence naming
        the chart-side purpose it serves. If you cannot name one for
        a column, the column should not be in the view - even when
        the data is synthetic. Training the habit on synthetic data
        is the only reason you will have it on production data.
    - id: q-easy-looker-data-source-role
      type: multiple_choice
      estimated_seconds: 80
      recommended_learner_tasks: [LT-LOOKER-004]
      source_facts:
        - FACT-LOOKER-STUDIO-DATA-SOURCE
        - FACT-LOOKER-STUDIO-FIELD-TYPES
      prompt: |
        You open a Looker Studio report at 09:00 Monday and the
        latest-day deposits scorecard is rendering `ledger_total` as
        `1970-01-02` instead of a money amount. You wrote the
        underlying BigQuery view yourself last week and the SQL is
        unchanged - `SUM(ledger_balance) AS ledger_total` against an
        `INT64` column.

        A teammate already restarted the report. The format is the
        same. Before touching the chart, where do you check first?
      options:
        - id: data_source
          label: |
            The data source. Open `Resource > Manage added data sources
            > <your data source> > Edit`. Each field row shows a Type
            dropdown (Number, Date, Text, Boolean, ...). Looker
            Studio reads field type from the data source, and the
            data source can override what BigQuery says per field
            (someone may have flipped `ledger_total` to Date by
            mistake).
        - id: chart_layer
          label: |
            The chart. Open the chart, find the metric pill for
            `ledger_total`, and check whether a chart-level
            calculated field has renamed the underlying field -
            renames are what cause type drift across charts.
        - id: blend_definition
          label: |
            The blend. Looker Studio blends override the underlying
            data-source type for every field they touch, so the
            chart's apparent type is being set by the blend
            definition.
        - id: bigquery_information_schema
          label: |
            BigQuery. Run `SELECT data_type FROM
            <project>.<dataset>.INFORMATION_SCHEMA.COLUMNS WHERE
            table_name = 'serving_deposit_dashboard' AND column_name
            = 'ledger_total'`. Looker Studio inherits the warehouse
            type directly with no override layer.
      answer: data_source
      explanation: |
        Looker Studio has a real data-source layer between BigQuery
        and the chart. When the data source is added, Looker Studio
        introspects the BigQuery schema and proposes a Type per
        field, but the human author can then override it (e.g.,
        forcing a "year" column from Number to Date so the chart
        groups by year). That override lives in the data source, not
        in the warehouse and not in the chart.

        Why the other options miss:

        - Chart-level calculated fields can compute new columns and
          can rename a field on the chart, but they do not retype an
          existing field. Setting the chart's pill to a different
          field does not change the underlying type.
        - Blends do not generally override the source-side type of
          existing fields; new fields a blend creates can be retyped
          on the blend, but a plain `SUM` from a single source comes
          through with the source-side type.
        - `INFORMATION_SCHEMA.COLUMNS` will confirm BigQuery is still
          returning `INT64`, but it cannot show you the Looker Studio
          override that is causing the chart's behaviour. The
          shortest path is: data source > field row > Type.

        The fix is one click: change the Type back to Number and
        save the data source. The chart re-renders correctly without
        any chart-level change.
      self_assessment: |
        Whenever a Looker Studio chart "lies" about a column
        (wrong type, wrong default aggregation, NULL where you
        expected zero), check the data source layer before the chart
        layer. Type and default aggregation are data-source
        properties; chart-level changes can only mask them.
    - id: q-easy-reusable-calculated-field
      type: multiple_choice
      estimated_seconds: 80
      recommended_learner_tasks: [LT-LOOKER-004]
      source_facts:
        - FACT-LOOKER-STUDIO-CALCULATED-FIELD-SCOPE
        - FACT-LOOKER-STUDIO-DATA-SOURCE
      prompt: |
        Last week a colleague defined `ledger_total = SUM(ledger_balance)`
        as a chart-level calculated field on the latest-day scorecard
        for the deposits dashboard. Today, three more charts (a
        currency-mix donut, a 30-day trend line, and a per-branch bar)
        need the same `ledger_total`, and the team plans to add a
        Slack-shared summary report on the same data source next
        sprint.

        Your teammate suggests copying the chart-level formula onto
        each of the four charts so they all match, and then "we'll be
        careful to update all four if the definition ever changes".
        What do you do instead?
      options:
        - id: reusable_layer
          label: |
            Move the formula one layer up. Best: define
            `ledger_total` in the upstream serving SQL the dashboard
            reads from, e.g.

                CREATE OR REPLACE VIEW serving_deposit_dashboard AS
                SELECT
                  business_date,
                  currency_code,
                  SUM(ledger_balance) AS ledger_total
                FROM account_daily_balances
                GROUP BY business_date, currency_code;

            Next best: define a data-source-level calculated field
            in Looker Studio (`Resource > Manage added data sources
            > Add a field`) with formula `SUM(ledger_balance)` and
            default aggregation `Auto`. After either fix, every
            chart, the new blend, and the next-sprint summary report
            pick the same definition up automatically.
        - id: each_chart
          label: |
            Copy the chart-level formula to each of the four charts
            so they stay in sync. Schedule a quarterly review to
            check that all four are still identical, and warn the
            team that any change to the metric is a four-place edit.
        - id: report_filter
          label: |
            Add `ledger_total = SUM(ledger_balance)` as a
            report-level filter expression so every chart on this
            report inherits it. Report filters apply across every
            chart in the report, so this is the same effect with
            less typing.
      answer: reusable_layer
      explanation: |
        Chart-level calculated fields are scoped to the chart they
        live in. They are invisible to other charts on the same
        report, to blends that use the same data source, and to any
        future report that connects to the same data source.
        Multiplying the formula across four chart edits is the
        beginning of metric drift: the moment someone "fixes" one
        copy without finding the others, two charts will quietly
        disagree on the same name.

        The right escalation has two stops:

        - **Upstream view (best)**. Define the metric where the
          data lives. Every BI surface that reads the view -
          dashboards now, blends later, an ad-hoc CSV pull next
          quarter - sees the same `ledger_total`. The metric has
          one owner: the view's DDL.
        - **Data-source-level calculated field (next best)**. If
          you can't change the warehouse view, define the field
          once on the Looker Studio data source. Every chart on
          every report that uses that data source picks it up.
          Chart-level scope is for genuinely chart-specific
          formatting (a chart-only label, a chart-only filter
          expression), not for the metric definition itself.

        The "report filter" distractor is genuinely tempting because
        it does propagate across all charts on the same report -
        but a filter selects rows, it doesn't define a metric. And
        it would still not be visible to the next report on the same
        data source.
      self_assessment: |
        If the same metric is going to appear in more than one
        chart, it belongs in the layer that all those charts share -
        usually the warehouse view, sometimes the data-source field
        list, never the chart. The exception is a true one-off ratio
        for one specific chart's annotation.
    - id: q-easy-logical-view-contract
      type: multiple_choice
      estimated_seconds: 65
      recommended_learner_tasks: [LT-LOOKER-004]
      source_facts:
        - FACT-BIGQUERY-LOGICAL-VIEW
        - FACT-BIGQUERY-VIEW-QUERY-RUNS-EACH-TIME
      prompt: |
        Your team is about to expose `serving_deposit_dashboard` to a
        dashboard with twelve viewers who refresh once an hour. The
        underlying SQL is a `SELECT business_date, currency_code,
        SUM(ledger_balance) ... GROUP BY ...` against a 100 MB
        partitioned table. A new engineer suggests making
        `serving_deposit_dashboard` a logical view "because logical
        views cache the result, so the SQL only runs once". What is
        wrong with that statement?
      options:
        - id: logical_view_reruns_query
          label: |
            A logical view is a SQL-defined virtual table; its query
            runs every time the view is queried. The 12 viewers ×
            hourly refresh would re-scan the partition 12 times an
            hour. If caching matters, use a materialized view
            instead.
        - id: logical_views_cannot_be_queried
          label: |
            Logical views are not directly queryable - they only show
            up in the BigQuery UI. The team will need a CTE or
            temp table instead.
        - id: external_table_alternative
          label: |
            Logical views can only reference Cloud Storage URIs, so
            this design will not work with a partitioned BigQuery
            table at all.
      answer: logical_view_reruns_query
      explanation: |
        Logical view: a stored SQL definition. Every time someone
        queries the view, the defining SQL runs. There is no per-view
        result cache (the per-query results cache is a separate
        mechanism and is text- and identity-sensitive). For caching
        across multiple queries, you reach for a materialized view -
        which caches its result and refreshes on a best-effort
        target.
      self_assessment: |
        "Logical view" and "materialized view" sound similar; the
        word you actually want depends on whether the result needs
        to be stored or recomputed each time.
    - id: q-easy-ratio-zero-denominator
      type: multiple_choice
      estimated_seconds: 75
      recommended_learner_tasks: [LT-DQ-006]
      source_facts:
        - FACT-BIGQUERY-SAFE-DIVIDE-RATIO-GUARD
        - FACT-BI-RATIO-SUM-COMPONENTS-FIRST
      prompt: |
        The "approval rate" tile on a credit-decision dashboard reads
        `0%` for the 2026-03 reporting month. You look at the
        underlying serving result and see this row for the month:

            period   | approved_count | submitted_count | approval_rate
            2026-03  | 0              | 0               | NULL

        Submitted is 0 because the upstream ingest job failed - no
        applications were loaded. The chart converted the NULL ratio
        to `0%` for display. What is the smallest correct fix to the
        metric contract?
      options:
        - id: null_distinct_from_zero
          label: |
            Display NULL as a distinct state ("n/a" or a dash), not as
            `0%`. The contract names the three input failure modes
            (zero numerator + non-zero denominator, NULL inputs, zero
            denominator) and a separate display rule for each.
        - id: always_zero
          label: |
            Display every zero-denominator case as `0%` and add a
            note in the chart caption. Operations will know to check
            the ingest job when they see `0%`.
        - id: skip_components
          label: |
            Show only the ratio in the data source; drop the
            numerator and denominator columns so the dashboard
            doesn't expose the zero counts at all.
      answer: null_distinct_from_zero
      explanation: |
        `SAFE_DIVIDE` (or DuckDB's `NULLIF` trick) prevents the SQL
        from raising on a zero denominator, but it doesn't tell the
        dashboard what to draw. `0%` and "no data" are different
        states: one is a bad approval rate, the other is a broken
        pipeline. The contract has to distinguish them, or the
        oncall will quietly stop trusting the tile.
      self_assessment: |
        If `NULL`, `0`, and "blank" all render the same on the
        dashboard, the ratio contract isn't finished.
    - id: q-easy-refresh-reference-date
      type: multiple_choice
      estimated_seconds: 80
      recommended_learner_tasks: [LT-LOOKER-004]
      source_facts:
        - FACT-LOOKER-STUDIO-DATA-FRESHNESS-TRADEOFF
        - FACT-BI-REFERENCE-DATE-SEPARATION
      prompt: |
        The deposits dashboard footer says "Data refreshed 2026-04-01
        08:05 UTC". The scorecards above it show `RON 79,300` and are
        labelled "Latest day". A regional manager messages the team
        Slack:

        > Wait, is this number Tuesday's or Monday's? The refresh
        > stamp says Tuesday morning but our books say the close is
        > always Monday end-of-day...

        She is half-right and half-confused. Two distinct dates are in
        play here. Which two does the dashboard need to keep visibly
        separate?
      options:
        - id: refresh_vs_business_date
          label: |
            **Refresh time** (when Looker Studio last queried or cached
            data; `2026-04-01 08:05 UTC` in the footer) and the
            **source business reference date** (the date the rows in
            the scorecard refer to; `business_date = 2026-03-31`).
            The scorecard should label `2026-03-31` as its "as of"
            date next to the number, not the refresh time.
        - id: same_control
          label: |
            They are the same number under the hood - Looker Studio
            overwrites `business_date` with the report's refresh
            timestamp during query execution, so there is nothing to
            keep separate. The footer's refresh time is the dashboard's
            single source of truth for "what day are we looking at".
        - id: chart_axis_label
          label: |
            Only the chart axis label needs to be tightened; the
            underlying `business_date` is decorative and can stay
            whatever the warehouse last wrote. Rename the axis from
            "business_date" to "Latest day" and the confusion goes
            away.
      answer: refresh_vs_business_date
      explanation: |
        Two timestamps with two different meanings:

        - **Refresh time** is a *Looker Studio* concept: when the
          report last pulled data from the source (or when its cache
          would next expire). It says nothing about the business
          period the rows describe.
        - **Business reference date** (`business_date`, `as_of_date`,
          `reporting_date`, etc.) is a *source* concept: which day
          the row's balance is a snapshot of.

        These can disagree in obvious and non-obvious ways. Obvious:
        a 5am refresh on Tuesday still reports on Monday's
        end-of-day balances. Non-obvious: a freshness setting
        configured to 60 minutes keeps serving Monday's numbers all
        through Tuesday morning, while the refresh stamp moves
        forward each minute.

        Fix: surface `business_date` next to the number ("As of
        2026-03-31"). Surface refresh time only in the footer or a
        small "last queried" indicator. Never collapse the two into
        a single timestamp.
      self_assessment: |
        Every dashboard page that shows a stock metric (balance,
        position, exposure) needs an explicit "as of" date pinned
        from the source. Refresh time is operational metadata about
        the report, not a business reference.
    - id: q-easy-control-contract
      type: multiple_choice
      estimated_seconds: 80
      recommended_learner_tasks: [LT-LOOKER-007]
      source_facts:
        - FACT-LOOKER-STUDIO-CONTROLS-FILTER-DATA
        - FACT-LOOKER-STUDIO-CONTROL-FIELD-ID
      prompt: |
        You're adding a Currency selector to the deposits dashboard so
        users can switch between RON and EUR views. A teammate ships
        a first draft of the control that "just works" - she dragged
        a Drop-down control onto the page and the charts already
        respond. In code-review the design lead asks for a
        documented control contract before publish. What does that
        contract have to name?
      options:
        - id: field_values_default_charts
          label: |
            (1) the **bound field** (`currency_code` from the
            serving data source) and the field ID Looker Studio
            uses to thread the filter through;
            (2) the **allowed values** the control accepts (`RON`,
            `EUR`; no NULL, no "All currencies" unless intentional);
            (3) the **default value** that loads with the report
            (e.g. `RON` for the Romanian audience);
            (4) the **affected charts** - which tiles on the page
            obey this control vs which are pinned (e.g. the FX
            reference rate chart stays on its own currency).
        - id: bound_to_natural_label
          label: |
            The currency's display label string (e.g. "Romanian Leu",
            "Euro"). Looker Studio matches the visible label to the
            chart pill, so getting the label right is the contract;
            renaming the label keeps the control aligned with the
            underlying field automatically.
        - id: bound_to_calculated_field
          label: |
            A chart-level calculated field expression
            (`CASE WHEN @selected_currency = 'RON' THEN ...`) that
            the control rewrites at runtime. The control's contract
            is just the formula and the parameter name.
      answer: field_values_default_charts
      explanation: |
        Controls in Looker Studio filter charts by matching values on
        a **field ID** in the data source, not by display label. The
        contract for any control has to pin that link explicitly:
        which field, which allowed values, what loads by default,
        and which charts on the page actually obey it. Without that,
        three things go wrong over time: a field rename in the data
        source silently breaks the filter; a "RON " (trailing space)
        value sneaks into the allowed list and matches nothing; a
        new chart on the page is silently unfiltered because nobody
        noticed.

        The "display label" distractor is the most tempting because
        a label is what the user sees. But Looker Studio matches on
        field ID + value, not on the rendered label. Renaming a
        label changes nothing about the filter.

        The "chart-level calculated field" distractor confuses
        Looker Studio controls with BigQuery parameters. A control
        does not generally rewrite the chart's SQL; it sets a filter
        expression that charts already declare they obey.
      self_assessment: |
        For every control on a published dashboard you should be
        able to point at a row in a small table: control name,
        bound field, allowed values, default, affected charts. If
        you can't, the control is operating on vibes and the next
        author will break it.
    - id: q-easy-parameter-value-boundary
      type: multiple_choice
      estimated_seconds: 80
      recommended_learner_tasks: [LT-LOOKER-007]
      source_facts:
        - FACT-BIGQUERY-PARAMETERIZED-QUERY-USER-INPUT
        - FACT-BIGQUERY-PARAMETER-NOT-IDENTIFIER
      prompt: |
        The deposits dashboard passes the viewer's selected currency
        from a Looker Studio control into the BigQuery serving query.
        Your colleague writes a draft of the BigQuery side. Which of
        these three shapes is the right boundary between
        user-controlled input and governed SQL?

            -- (A) Value parameter
            DECLARE selected_currency STRING DEFAULT 'RON';
            SELECT business_date, currency_code, SUM(ledger_balance)
            FROM `proj.dataset.account_daily_balances`
            WHERE currency_code = @selected_currency
            GROUP BY 1, 2;

            -- (B) Table-name parameter
            DECLARE selected_table STRING DEFAULT 'account_daily_balances';
            SELECT ...
            FROM CONCAT('`proj.dataset.', @selected_table, '`');

            -- (C) Pasted WHERE clause
            DECLARE selected_where STRING DEFAULT 'currency_code = ''RON''';
            EXECUTE IMMEDIATE
              CONCAT('SELECT ... WHERE ', @selected_where);

        Which shape belongs in published BigQuery SQL?
      options:
        - id: currency_value
          label: |
            (A). Parameters carry **values** that the SQL compares
            against - dates, currencies, branch IDs, thresholds.
            `@selected_currency = 'RON'` is the right boundary;
            the SQL structure stays governed and the user input
            cannot rewrite the query.
        - id: table_name
          label: |
            (B). Letting the report viewer pick the table by name
            keeps the SQL flexible: a single query template can
            point at any of the deposits, lending, or cards fact
            tables depending on the page.
        - id: where_fragment
          label: |
            (C). Passing a SQL fragment is the most flexible -
            controls can express arbitrary `WHERE` clauses without
            redeploying the warehouse view, including `IN` lists,
            ranges, and AND/OR combinations.
      answer: currency_value
      explanation: |
        BigQuery parameters bind **values** into a prepared SQL
        statement, the way bound parameters work in any sane
        database client. The query plan is fixed at the warehouse;
        the user's choice slides into the `WHERE` predicate as a
        value comparison.

        Why the other two shapes are wrong:

        - **Table-name parameter**. BigQuery parameters cannot stand
          in for identifiers (table names, column names, dataset
          names). To switch tables the SQL would have to be
          re-generated, which means you're back to building a query
          string from user input. That is the start of injection
          risk and bypasses any governance you placed on the
          original table.
        - **Pasted WHERE fragment**. Same problem, worse. A
          user-supplied SQL fragment is unrestricted: `1=1 OR
          1=1`, `1=1; DROP TABLE ...`, or just an accidental
          OR-clause that silently widens the scan. `EXECUTE
          IMMEDIATE` on user input is the BigQuery equivalent of
          string-built SQL.

        The rule of thumb: parameters carry *what to compare
        against*; the SQL author controls *the shape of the
        comparison*. If the choice the user makes changes the
        shape (which tables, which columns, which operators), it
        is not a parameter - it is a different governed query.
      self_assessment: |
        Anywhere a control or parameter feeds into BigQuery, you
        should be able to point at the literal SQL the value lands
        in (`= @x`, `IN UNNEST(@xs)`, `BETWEEN @from AND @to`). If
        the value is being concatenated into the SQL text, that is
        a design smell, not a feature.
    - id: q-easy-deposit-guarantee-ceiling
      type: multiple_choice
      estimated_seconds: 80
      recommended_learner_tasks: [LT-BI-002]
      source_facts:
        - FACT-FGDB-100K-PER-DEPOSITOR-PER-BANK
        - FACT-DGSD-100K-EU
      prompt: |
        The compliance team asks for a footnote on the deposit
        dashboard explaining the standard deposit-guarantee ceiling.
        Your draft note has to state the amount, the currency, and
        the grain ("per what"). Picking from the synthetic dataset
        for context: depositor `C5001` holds two accounts at the
        same bank, `A1001` (RON 43,000) and `A1004` (RON 12,300),
        for a combined balance of RON 55,300 on 2026-03-31.

        Which footnote is correct for the EU harmonised regime
        (DGSD / Romania's FGDB)?
      options:
        - id: eur_100k
          label: |
            "Covered up to **EUR 100,000 per depositor per credit
            institution**. A depositor holding multiple accounts at
            the same bank is covered once up to the ceiling on the
            sum of those accounts." For `C5001` at this bank, that
            means EUR 100,000 of cover on the combined RON 55,300
            equivalent, not separate cover per account.
        - id: ron_100k
          label: |
            "Covered up to **RON 100,000 per account**." Each of the
            depositor's accounts gets its own RON 100,000 of cover,
            so `C5001` is effectively covered up to RON 200,000 at
            this bank.
        - id: no_ceiling
          label: |
            "No standard ceiling - banks set their own coverage."
            The deposit-guarantee regime is bank-specific in
            practice, so the dashboard should defer to the bank's
            own published policy and not state a fixed number.
      answer: eur_100k
      explanation: |
        The EU Deposit Guarantee Schemes Directive (DGSD, Directive
        2014/49/EU) sets a harmonised ceiling of **EUR 100,000 per
        depositor per credit institution**. Romania implements this
        via the Fondul de Garantare a Depozitelor Bancare (FGDB) at
        the same level (RON-denominated cover is paid out at the
        EUR-100,000-equivalent).

        Two things commonly get wrong here:

        - **Currency**: the ceiling is fixed in EUR. RON-denominated
          balances are converted at the relevant date's exchange
          rate when payout is determined. A dashboard footnote that
          says "RON 100,000" is wrong for the EU regime.
        - **Grain**: the ceiling is per *depositor* per *credit
          institution*, not per *account*. A depositor with three
          accounts at the same bank holding EUR 60k each (EUR 180k
          combined) is covered for EUR 100k total at that bank, not
          EUR 300k. This is the depositor-bank grain that the
          orientation lesson called out.

        For BI work this matters because any "estimated covered
        deposits" metric has to be computed at depositor-bank grain
        (sum across the depositor's accounts at the bank, then cap
        at EUR 100,000), not at account grain. Most beginner
        spreadsheets sum coverage at account grain and overstate by
        a multiple.
      self_assessment: |
        Anywhere a metric says "deposit guarantee coverage", you
        must be able to name the grain (depositor × bank) and the
        ceiling currency (EUR). If either is missing or off, the
        coverage number is wrong even when the SQL is correct.
    - id: q-easy-count-distinct-customers
      type: multiple_choice
      estimated_seconds: 80
      recommended_learner_tasks: [LT-BI-002]
      source_facts:
        - FACT-BIGQUERY-COUNT-DISTINCT-GRAIN
        - FACT-BI-FANOUT-JOIN-RISK
      prompt: |
        A "branch loyalty" report wants to count "active customers
        per branch this month". The serving query joins
        `account_daily_balances` (one row per account per business
        date) to `accounts` (one row per account) to
        `account_owners` (one row per (account, owner) - some
        accounts have two owners).

        Sample for branch `BR-B-01` (Bucuresti) on 2026-03-31:

            account_id | owner_customer_id
            A1001      | C5001
            A1001      | C5099       (joint holder)
            A1004      | C5001       (same customer, second account)

        Three rows. How many unique customers should the branch
        loyalty count show for `BR-B-01` on this day?
      options:
        - id: distinct_customer
          label: |
            **Two**. Use `COUNT(DISTINCT owner_customer_id)` grouped
            by `branch_id, business_date`. `C5001` appears on
            multiple rows (joint with `C5099` on `A1001`, sole on
            `A1004`) but is one customer. `COUNT(DISTINCT)` is the
            grain-correcting aggregate when rows can repeat.
        - id: count_rows
          label: |
            **Three**. `COUNT(*)` after the join is the simplest
            and most consistent way to count customers; the join
            already includes the customer on each row, so each row
            is one customer-mention.
        - id: sum_balances
          label: |
            **Skip the count**. Don't count customers at all -
            `SUM(ledger_balance)` already implicitly tells you how
            many customers are involved through the total amount.
      answer: distinct_customer
      explanation: |
        Many-to-many joins between facts and ownership are the
        single most common source of "the customer count is wrong"
        bugs in banking BI. The shape:

        - 1 account-day row on the fact side,
        - times 1..N owner rows on the ownership side,
        - = N account-day-owner rows after the join.

        `COUNT(*)` after that join gives you account-day-owner
        rows, which is neither customers nor accounts nor days. In
        the example, three rows for branch BR-B-01 on 2026-03-31
        because A1001 has two owners and A1004 has one owner whose
        ID matches one of A1001's owners.

        `COUNT(DISTINCT owner_customer_id)` collapses the
        duplicates: `C5001` appears three times across the rows but
        contributes once to the count. The branch loyalty report
        wants **2** unique customers, not 3 rows.

        The "skip the count" distractor is the gateway to a
        different wrong answer: when stakeholders ask "how many
        customers", silence is not safer than the wrong number -
        someone will infer one from the total balance.

        Production note: `COUNT(DISTINCT ...)` is exact in
        BigQuery for small groups but uses `HyperLogLog++` (an
        approximation) above a default threshold. For exact counts
        on large groups, `APPROX_COUNT_DISTINCT` is the explicit
        approximate, and `COUNT(DISTINCT ...) WITHIN GROUP (...)`
        and pre-aggregation patterns are the exact ones.
      self_assessment: |
        Any time a query joins to an ownership / membership table
        and then counts an entity, the counting aggregate is almost
        always `COUNT(DISTINCT ...)`, not `COUNT(*)`. Reverse the
        rule of thumb: if the count uses `*`, the join probably
        wasn't many-to-many - prove that before publishing.
    - id: q-easy-sum-null-control
      type: multiple_choice
      estimated_seconds: 75
      recommended_learner_tasks: [LT-DQ-006]
      source_facts:
        - FACT-BIGQUERY-SUM-NULLS
        - FACT-BI-RECONCILIATION-WINDOWS
      prompt: |
        The branch-balances tile shows `RON 0` for branch `BR-IS-01`
        on 2026-03-31. You drill in and find no rows came through for
        that branch today - the ingest job dropped them. The
        reconciliation control runs

            SELECT branch_id, SUM(ledger_balance) AS ledger_total
            FROM serving_deposit_branch_daily
            WHERE business_date = DATE '2026-03-31'
            GROUP BY branch_id;

        and the result for `BR-IS-01` is one row with
        `ledger_total = NULL`, which the chart renders as `0`. What
        does the reconciliation contract need to say about this case
        before publish?
      options:
        - id: null_group
          label: |
            That a NULL total is a distinct state ("no rows in group")
            and must not be rendered as `0`. The control output adds
            a separate `null_total_branches` count so a
            zero-row-ingest day is visible as an operations event,
            not buried as "this branch had no money".
        - id: silent_zero
          label: |
            That an all-NULL or empty group is automatically a real
            zero balance, because nobody held money at that branch
            today. The chart can keep showing `RON 0` with no extra
            handling.
        - id: hide_branch
          label: |
            That the branch should be hidden from all controls and
            charts until the ingest job is rerun. The dashboard
            should suppress any group whose `ledger_total` is NULL.
      answer: null_group
      explanation: |
        `SUM` over an empty group (or a group whose only values are
        NULL) returns NULL in BigQuery and DuckDB, not zero. That
        NULL means "no observations" - which is operationally very
        different from "we observed zero":

        - **Real zero**: ingest succeeded, the branch genuinely had
          no balances today.
        - **Null total**: ingest failed, the dashboard is missing
          rows that should have been there.

        Quietly converting NULL to `0` collapses these two states
        into one. The right reconciliation surfaces both: the
        per-branch total (NULL where there is no data) and a
        separate count of branches in that state, so an oncall
        engineer sees the second metric tick from 0 to 1 when an
        ingest fails.

        Hiding the branch entirely is worse than rendering `0` - it
        removes the symptom that something is wrong.
      self_assessment: |
        Wherever you display an aggregate, the chart needs a
        distinct treatment for "no data" vs "zero data". If both
        render the same, the dashboard is hiding ingest failures.
    - id: q-easy-partition-date-filter
      type: multiple_choice
      estimated_seconds: 75
      recommended_learner_tasks: [LT-LOOKER-007]
      source_facts:
        - FACT-BIGQUERY-PARTITION-FILTERS
        - FACT-BI-REFERENCE-DATE-SEPARATION
      prompt: |
        `fct_account_daily_balances` in production has 18 months of
        data and is partitioned by `business_date`. The new
        latest-day scorecard fires this query every minute:

            SELECT currency_code, SUM(ledger_balance) AS ledger_total
            FROM `proj.dataset.fct_account_daily_balances`
            WHERE branch_id IN ('BR-B-01', 'BR-IS-01')
            GROUP BY currency_code;

        The BigQuery dry-run estimate says it will scan ~1.8 TB per
        run. Your colleague says "but the chart axis is fixed to
        the latest day, so the partition is pruned automatically -
        the dry-run is wrong". Which fix actually reduces the scan?
      options:
        - id: date_range_filter
          label: |
            Add a `WHERE business_date = (SELECT MAX(business_date)
            FROM <same table>)` (or a more direct `business_date >=
            CURRENT_DATE() - 1`) predicate to the SQL. Partition
            pruning only happens when the filter is on the
            partition field, at the SQL level, before BigQuery
            picks blocks to scan. The chart-level axis selection is
            cosmetic.
        - id: chart_date_filter
          label: |
            Move the date constraint to a Looker Studio chart filter
            ("Latest day only"). The chart filter runs after the
            warehouse query returns, so the scan is identical to
            today but the displayed data is smaller and the
            scorecard renders cleanly.
        - id: no_filter
          label: |
            Leave the query as is. BigQuery automatically prunes
            partitions when the chart's date axis or date control
            is bound to the partition column. The dry-run estimate
            is over-conservative.
      answer: date_range_filter
      explanation: |
        Partition pruning in BigQuery happens at the **SQL planning
        stage**: the optimizer inspects the SQL text and only reads
        partitions that the `WHERE` predicate can possibly include.
        Predicates on non-partition columns (`branch_id` in this
        query) do not prune partitions; they just filter rows after
        the scan.

        The chart-level distractor is genuinely tempting because the
        rendered chart only shows the latest day - but Looker Studio
        filters apply *after* the SQL has run. The full-table scan
        already happened; the filter just hides 17 months of rows
        in the browser. Cost is unchanged.

        The "automatic pruning from the chart axis" distractor is
        the most common production mistake in this family. BigQuery
        does **not** look at Looker Studio chart definitions when
        choosing which partitions to scan. If the partition column
        is not in the SQL's `WHERE` clause, all partitions are
        scanned.

        Fix shape:

            WHERE business_date = (
              SELECT MAX(business_date)
              FROM `proj.dataset.fct_account_daily_balances`
            )
            AND branch_id IN ('BR-B-01', 'BR-IS-01')

        That reduces the scan to one day's partition (a few MB) and
        the dry-run estimate drops accordingly.
      self_assessment: |
        Partition pruning is determined by what's in the SQL's
        `WHERE` clause, not by what the dashboard shows. If a query
        is reading more than you expected, the first check is
        "what predicates does this SQL have on the partition
        column?" - not the chart.
    - id: q-easy-date-trunc-period-label
      type: multiple_choice
      estimated_seconds: 75
      recommended_learner_tasks: [LT-SQL-003]
      source_facts:
        - FACT-BIGQUERY-DATE-TRUNC-GRANULARITY
        - FACT-BI-REFERENCE-DATE-SEPARATION
      prompt: |
        A monthly trend chart must group daily transactions by
        calendar month - "January 2026" rows should sum together,
        "February 2026" rows separately. Sample data:

            transaction_date | amount
            2025-12-15       | 100
            2026-01-03       | 200
            2026-01-29       | 150
            2026-02-10       |  90

        Which transformation in the serving query produces a
        grouping key that gives monthly totals correctly?
      options:
        - id: truncate_month
          label: |
            `DATE_TRUNC(transaction_date, MONTH) AS period_start`.
            Returns `2025-12-01`, `2026-01-01`, `2026-01-01`,
            `2026-02-01` for the four rows above. Grouping by it
            sums the two January rows together and keeps January
            2026 separate from January 2025.
        - id: format_string_label
          label: |
            `FORMAT_DATE('%B', transaction_date) AS period_label`.
            Returns `'December'`, `'January'`, `'January'`,
            `'February'`. Grouping by it sums January 2025 and
            January 2026 together because both produce
            `'January'` - one row in the result instead of two.
        - id: extract_month_number
          label: |
            `EXTRACT(MONTH FROM transaction_date) AS period_month`.
            Returns `12`, `1`, `1`, `2`. Grouping by it puts every
            January of every year in the same bucket and drops the
            year entirely.
      answer: truncate_month
      explanation: |
        `DATE_TRUNC` aligns a date to a coarser granularity while
        preserving the year - that's what makes "January 2026" and
        "January 2025" distinct grouping keys. The result is also
        a `DATE`, so charts can sort it correctly and label it with
        the report's date formatting.

        The other two distractors are textbook mistakes:

        - `FORMAT_DATE('%B', ...)` produces a month name without
          the year. Every January in the history collapses into
          one row. The chart looks fine until you notice the
          January total is the sum of all years, not "this
          January".
        - `EXTRACT(MONTH FROM ...)` produces an integer 1..12,
          same problem. Useful for "average across months of the
          year" analyses, never for a monthly trend.

        Production tip: when you need both the truncated date and
        a display label, compute the date once and format on the
        chart side:

            SELECT
              DATE_TRUNC(transaction_date, MONTH) AS period_start,
              SUM(amount) AS amount_total
            FROM ...
            GROUP BY period_start
            ORDER BY period_start;

        The chart formats `period_start` as "Jan 2026" in display
        only - the underlying value is a real date for sorting.
      self_assessment: |
        Any time a grouping key is "the month" / "the quarter" /
        "the week", reach for `DATE_TRUNC` first. String month
        names lose the year; integer month numbers do too.
    - id: q-easy-window-row-preservation
      type: multiple_choice
      estimated_seconds: 75
      recommended_learner_tasks: [LT-SQL-003]
      source_facts:
        - FACT-BIGQUERY-WINDOW-PRESERVES-ROWS
        - FACT-BIGQUERY-QUALIFY-WINDOW-FILTER
      prompt: |
        Each account has multiple `business_date` snapshots and you
        want one row per account showing the latest snapshot. A
        teammate writes:

            SELECT
              account_id,
              business_date,
              ledger_balance,
              ROW_NUMBER() OVER (
                PARTITION BY account_id
                ORDER BY business_date DESC
              ) AS rn
            FROM account_daily_balances;

        She runs it and is surprised the result has 18 rows (not
        6) - one row per snapshot, just with a `rn` column added.
        What's happening before the QUALIFY / WHERE filter that
        would reduce it to "latest per account"?
      options:
        - id: row_added_each_input
          label: |
            `ROW_NUMBER()` is a window function. Window functions
            **preserve rows**: each input row stays in the output,
            with the window value computed alongside it. The
            18-row result is correct for this stage; reducing to
            6 needs an explicit filter, e.g. `QUALIFY rn = 1` (or
            a wrapping `SELECT ... WHERE rn = 1`).
        - id: rows_collapsed
          label: |
            The PARTITION BY clause should already have collapsed
            the result to one row per `account_id`. Seeing 18 rows
            means BigQuery isn't honouring the partition; rewrite
            using `GROUP BY account_id` instead.
        - id: charts_filtered
          label: |
            BigQuery emits all 18 rows but Looker Studio
            automatically filters historical rows on a chart with
            `rn = 1`. The SQL doesn't need a `WHERE` or `QUALIFY`;
            the chart side handles it.
      answer: row_added_each_input
      explanation: |
        Window functions and aggregate functions look similar but
        behave differently:

        - `SUM(x) ... GROUP BY g` collapses rows: the output has
          one row per group.
        - `SUM(x) OVER (PARTITION BY g)` does **not** collapse:
          the output has one row per input row, each carrying the
          group's sum.

        `ROW_NUMBER() OVER (PARTITION BY ... ORDER BY ...)` is the
        same: every input row stays and gets a rank within its
        partition. To keep only "row 1 per account", you filter
        on `rn`:

            -- BigQuery syntax with QUALIFY:
            SELECT ...
            FROM account_daily_balances
            QUALIFY ROW_NUMBER() OVER (
              PARTITION BY account_id
              ORDER BY business_date DESC
            ) = 1;

            -- Or wrap in a subquery / CTE:
            WITH ranked AS (
              SELECT *, ROW_NUMBER() OVER (...) AS rn FROM ...
            )
            SELECT * FROM ranked WHERE rn = 1;

        The "PARTITION BY collapses" distractor is the most
        tempting because the SQL keyword reads as "split into
        groups, one result per group". It does split into groups,
        but it does not collapse - that is what `GROUP BY` does.
      self_assessment: |
        Whenever you see a window function (`ROW_NUMBER()`,
        `RANK()`, `LAG()`, `SUM() OVER (...)`), expect one row out
        per row in. To collapse, either filter on the window
        result, or use a real aggregate (`GROUP BY`).
    - id: q-easy-pseudonymized-customer-id
      type: multiple_choice
      estimated_seconds: 75
      recommended_learner_tasks: [LT-LOOKER-004]
      source_facts:
        - FACT-GDPR-PSEUDONYMIZED-STILL-PERSONAL
        - FACT-GDPR-PERSONAL-DATA
      prompt: |
        A team built a "monthly customer churn" dashboard. Each
        row carries `customer_hash`, computed as
        `SHA256(customer_id || 'salt-2026')`. Marketing wants the
        dashboard widely shared because "it's just a hash - no
        real customer data is visible". You also know the team
        keeps the hash mapping (`customer_id → customer_hash`) in
        a separate `analytics.id_mapping` table for joining the
        churn output back to the CRM.

        What is the cautious GDPR interpretation of
        `customer_hash`?
      options:
        - id: still_personal
          label: |
            Still **personal data**. GDPR Article 4(5) and Recital
            26 are explicit: pseudonymisation reduces risk but
            does not anonymise. Because the mapping table exists
            and a person could be re-identified from
            `customer_hash` + mapping table, the field is still
            personal data and needs the same lawful basis,
            minimisation, and access controls as `customer_id`.
        - id: automatically_anonymous
          label: |
            **Anonymous** in every context. Once a value is
            hashed, it is irreversible by design and outside the
            scope of GDPR. The dashboard can be shared without
            restriction; the original `customer_id` never leaves
            the warehouse.
        - id: no_access_review
          label: |
            Personal data on the warehouse side, **anonymous on
            the dashboard side**. Because Looker Studio viewers
            cannot see the mapping table, the hash on the
            dashboard is anonymous to them; no access review is
            needed for the dashboard share.
      answer: still_personal
      explanation: |
        Pseudonymisation is a privacy-friendly technique - it
        reduces the surface area for accidental disclosure - but
        it is not anonymisation. GDPR Recital 26 says data is
        anonymous only when re-identification is no longer
        possible by any *reasonably likely* means. A hash plus a
        mapping table held by the same organisation is the
        textbook case of *not* anonymous: anyone with access to
        the mapping can reverse the hash.

        That has practical consequences:

        - The dashboard's lawful basis still has to cover
          processing of `customer_hash` (typically the same basis
          as for the underlying `customer_id`).
        - Data-minimisation still applies: the dashboard should
          carry `customer_hash` only if the named purpose
          requires per-customer granularity. For monthly churn at
          an aggregate level, the customer dimension can usually
          be dropped entirely.
        - Access controls have to extend to the mapping table:
          if a viewer can reach the mapping (directly, or via
          another query, or because the mapping table is in a
          shared dataset), the dashboard's "just a hash" framing
          is fictional.

        Even when the mapping is not in the same database,
        re-identification is often possible via auxiliary data
        (account IDs, transaction patterns, branch + currency +
        date combinations). The cautious default is to treat
        pseudonymous identifiers as personal data unless an
        explicit anonymisation review says otherwise.
      self_assessment: |
        Hash isn't a privacy boundary; a missing mapping is. If
        anyone in the organisation can reverse the
        pseudonymisation, treat the field as personal data and
        minimise it.
    - id: q-easy-purpose-limited-output
      type: multiple_choice
      estimated_seconds: 75
      recommended_learner_tasks: [LT-LOOKER-004]
      source_facts:
        - FACT-GDPR-PURPOSE-LIMITATION
        - FACT-GDPR-DATA-MINIMISATION
      prompt: |
        The product team has approved a Looker Studio report for a
        narrow purpose: "monthly branch liquidity monitoring".
        Audience is operations; the question they answer with it is
        "do we have enough cash buffer per branch per currency at
        month-end?". A senior engineer suggests adding
        `customer_id`, `account_id`, and `transaction_description`
        to the underlying serving view "because some day someone
        will want to drill in".

        Which output design matches the approved purpose?
      options:
        - id: aggregate_needed_fields
          label: |
            Publish only: `business_date` (month-end),
            `branch_id`, `currency_code`,
            `SUM(ledger_balance) AS ledger_total`,
            `COUNT(DISTINCT account_id) AS account_count` (no raw
            `account_id` exposed). Add a separate approved
            "drill-in" purpose and a separate view if and when
            someone actually needs per-account or per-customer
            detail.
        - id: raw_customer_export
          label: |
            Publish the approved aggregate columns **plus**
            `customer_id` and `account_id` "just in case". The
            extra columns sit in the view but are not used by the
            charts today; if the data-source schema hides them,
            no harm done.
        - id: unrelated_usage
          label: |
            Publish the aggregate columns plus a small set of
            forward-looking dimensions
            (`marketing_campaign_id`, `app_install_source`) so
            the same view can power a future "growth" dashboard
            without needing a new view.
      answer: aggregate_needed_fields
      explanation: |
        Two GDPR principles point at the same answer:

        - **Purpose limitation** (Article 5(1)(b)) - personal
          data shall be "collected for specified, explicit and
          legitimate purposes and not further processed in a
          manner that is incompatible with those purposes". A
          view authorised for "monthly branch liquidity
          monitoring" cannot quietly accumulate fields for a
          later, undefined drill-in.
        - **Data minimisation** (Article 5(1)(c)) - personal
          data shall be "adequate, relevant and limited to what
          is necessary in relation to the purposes". `customer_id`
          and `transaction_description` are not necessary for a
          branch-level liquidity number.

        Practical consequences for the BI author:

        - Each serving view has one named purpose. If a new
          purpose comes up (drill-in for an exception
          investigation, growth monitoring, etc.), it gets its
          own view with its own field list and its own audience.
        - "Just in case" columns are a smell. They train the
          audience to expect the data, and the data accumulates
          access surface area you have to defend.
        - If the operations team genuinely needs to drill into a
          specific anomaly, that's a different request and a
          different audit trail than "the dashboard".

        The "add forward-looking dimensions" distractor is the
        purpose-limitation violation in its most polite form:
        same view, multiple purposes, no obvious harm. It is
        still the wrong design.
      self_assessment: |
        For each column in a serving view, name the chart-side
        purpose it serves and the audience that needs it. "Future
        use" is not a purpose; it's a way of widening access
        without writing it down.
    - id: q-easy-fgdb-payment-currency
      type: multiple_choice
      estimated_seconds: 70
      recommended_learner_tasks: [LT-BI-002]
      source_facts:
        - FACT-FGDB-PAYS-RON
        - FACT-BI-REFERENCE-DATE-SEPARATION
      prompt: |
        A Romanian deposit-guarantee compensation dashboard shows
        balances in EUR and RON. A note next to the
        "covered amount" tile reads:

        > Compensation is paid out in RON at the BNR reference
        > exchange rate for the relevant date.

        A reviewer pushes back: "we already converted everything
        to EUR up top, so the note can just say 'EUR 100,000'".
        Is the existing note doing real work?
      options:
        - id: ron_payment_rate_date
          label: |
            Yes. Romanian FGDB compensation is paid in RON, with
            EUR-denominated coverage converted at the BNR reference
            rate for a specific reference date (typically the
            date the bank is declared unable to repay deposits).
            The dashboard needs both: the EUR ceiling for the
            harmonised regime and the RON payment currency +
            rate-date for what depositors actually receive.
        - id: original_currency_only
          label: |
            Yes, but the note is incomplete - FGDB pays in the
            depositor's original account currency (RON for RON
            accounts, EUR for EUR accounts), so the note should
            drop "in RON" and say "in the account's denomination
            currency".
        - id: no_currency_date
          label: |
            No. Currency conversion dates are irrelevant to
            compensation - the EUR ceiling is fixed by the EU
            directive and the same number of euros is paid out
            regardless of when the bank failed. Drop the note.
      answer: ron_payment_rate_date
      explanation: |
        Two truths that have to coexist in any deposit-guarantee
        reporting:

        - The **coverage ceiling** is denominated in EUR
          (`EUR 100,000` under the harmonised DGSD regime).
        - The **payment to depositors** in Romania is made in RON,
          converted from EUR at the BNR reference rate for a
          specific reference date.

        That is why the rate-date matters operationally: if the
        bank is declared unable to repay deposits on 2026-03-15
        and the FGDB pays out two weeks later, the conversion uses
        the 2026-03-15 BNR rate, not the rate on the payout date.
        Two depositors with identical EUR-equivalent balances on
        the failure date can receive identical RON payments even
        if the exchange rate moved in between.

        The "original currency" distractor is the most common
        misreading: yes, the depositor's account is in RON or
        EUR, but the FGDB compensation regime explicitly settles
        in RON regardless of the original account denomination.

        For BI work this matters because:

        - A "covered amount" metric has two natural units (EUR
          for the ceiling, RON for the actual payment) and they
          should be shown side by side, not collapsed.
        - The reference date for currency conversion is a
          third date alongside `business_date` and `refresh_time`
          - keep it labelled explicitly when shown.
      self_assessment: |
        Banking dashboards routinely have three dates in play
        (business date, refresh time, currency-conversion
        reference date) and three units (account currency, payout
        currency, EUR ceiling). Conflating any of them is the
        normal way a "covered amount" tile goes wrong.
    - id: q-easy-looker-dimension-metric
      type: multiple_choice
      estimated_seconds: 75
      recommended_learner_tasks: [LT-LOOKER-004]
      source_facts:
        - FACT-LOOKER-STUDIO-DIMENSIONS-METRICS
        - FACT-LOOKER-STUDIO-DIMENSION-CONTEXT
      prompt: |
        On a Looker Studio bar chart, you drop `branch_region` into
        the chart's Dimension shelf and `ledger_balance` into the
        Metric shelf. The chart's default aggregation for
        `ledger_balance` is `Sum`. A teammate, mid-design-review,
        says "both fields are metrics anyway because they both
        appear on the chart's measurement spec." Which framing is
        correct?
      options:
        - id: dimension_metric
          label: |
            `branch_region` is a **dimension** - it carves the
            rows into groups (one bar per region). `ledger_balance`
            is a **metric** - it is the value aggregated within
            each group (the bar height; `SUM(ledger_balance) GROUP
            BY branch_region`). Changing which dimensions are on
            the chart changes what the metric *means* (per region
            vs per region+currency, etc.).
        - id: both_metrics
          label: |
            Both fields are metrics. The dimension shelf in
            Looker Studio is a UI label; under the hood, every
            field on a chart is summed or counted. `branch_region`
            is just summed-as-string.
        - id: parameter_dimension
          label: |
            `branch_region` is a parameter-driven control (it
            switches which slice the chart shows) and
            `ledger_balance` is the dimension whose values the
            chart renders. Aggregation happens implicitly in the
            warehouse before Looker Studio reads it.
      answer: dimension_metric
      explanation: |
        Dimension and metric are the two basic chart-field roles
        in Looker Studio (and in dimensional modelling in
        general):

        - **Dimensions** group or describe rows. Adding a
          dimension to the chart is equivalent to adding a column
          to `GROUP BY` in the underlying SQL.
        - **Metrics** are aggregated values per group. A metric
          has a default aggregation function (Sum, Count, Avg,
          ...) chosen on the data source.

        That distinction matters because the *same data* can
        carry very different meanings depending on which
        dimensions are on the chart. `SUM(ledger_balance) GROUP
        BY branch_region` is "total balance per region";
        `SUM(ledger_balance) GROUP BY branch_region,
        currency_code` is "total balance per region per
        currency"; the first is just an unsafe rollup of the
        second across currencies (mixing RON and EUR).

        The "both are metrics" distractor confuses the chart
        shelf labels with how Looker Studio computes the chart.
        The "parameter-driven control" distractor mixes up
        dimensions with controls (controls filter rows; they
        don't define the grouping).
      self_assessment: |
        Whenever you add or remove a dimension on a chart, the
        meaning of every metric on that chart changes. If you
        cannot say what `SUM(...) GROUP BY <current
        dimensions>` produces, the chart is not ready to
        publish.
    - id: q-easy-reusable-data-source
      type: multiple_choice
      estimated_seconds: 75
      recommended_learner_tasks: [LT-LOOKER-004]
      source_facts:
        - FACT-LOOKER-STUDIO-EMBEDDED-REUSABLE-DATA-SOURCES
        - FACT-LOOKER-STUDIO-DATA-SOURCE
      prompt: |
        The deposits team owns three Looker Studio reports backed
        by `serving_deposit_branch_daily`: an executive scorecard,
        a per-branch detail page, and a quarterly export for
        compliance. All three need the same field names, types,
        default aggregations, and a calculated field for
        `ledger_total_eur` (RON converted to EUR at the latest
        published rate). Which Looker Studio choice makes that
        sustainable across the three reports?
      options:
        - id: reusable_data_source
          label: |
            Create a single **reusable data source** named
            `Deposits Branch Daily (governed)` against the
            warehouse view, define field types and the
            `ledger_total_eur` calculated field once on it, and
            attach all three reports to that one data source.
            Changes to a field type or formula propagate to all
            three reports automatically.
        - id: duplicate_each_chart
          label: |
            Duplicate the field definitions and the
            `ledger_total_eur` formula inside each chart of each
            report. Set a calendar reminder to keep them in sync
            quarterly.
        - id: hide_schema
          label: |
            Do not inspect the data-source schema at all - let
            each report pick fields as needed. If two reports
            disagree, fix them at the chart level later.
      answer: reusable_data_source
      explanation: |
        Looker Studio has two flavours of data source:

        - **Embedded** - created in-line when you make a new
          report. Lives inside that one report. Field schema and
          calculated fields are not shared with other reports.
        - **Reusable** - a standalone data source object that
          multiple reports can attach to. Field schema,
          calculated fields, type overrides, default
          aggregations, and access settings are defined once.

        For multi-report governed BI, reusable is the only
        sustainable choice. Three reports × N fields × the
        `ledger_total_eur` formula is already 3N+3 places to keep
        in sync the wrong way; with a reusable source, it is
        N+1, and changes propagate.

        The "duplicate each chart" distractor is what gets
        chosen in practice when nobody is thinking about the
        future - and is the start of metric drift across
        reports. The "hide schema" distractor is rarely picked
        deliberately, but it is what *happens* when authors do
        not know about the reusable-data-source option.

        How to create one: in Looker Studio, `Resource > Manage
        added data sources > Add a data source > <connector> >
        Connect`, then click **"Make Reusable"** on the data
        source detail header. Reports then reference it by name.
      self_assessment: |
        For any field, formula, or aggregation that more than
        one report needs, the right home is the data source -
        and the right kind of data source is reusable. If you
        find yourself copying a calculated field from chart to
        chart, you've already lost.
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
          label: Aggregate balances to the required account/date grain in a CTE before joining owners.
        - id: distinct_at_end
          label: Keep the raw owner join and add `SELECT DISTINCT` at the end to remove duplicates.
        - id: group_by_owner_account
          label: Keep the raw owner join and `GROUP BY account_id, customer_id` to collapse it.
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
          label: "`ROW_NUMBER() OVER (PARTITION BY account_id ORDER BY snapshot_date DESC)` with `QUALIFY rn = 1`."
        - id: max_in_select
          label: "`SELECT account_id, MAX(snapshot_date), balance ...` so the row with the latest date wins per account."
        - id: order_limit
          label: "`SELECT * FROM snapshots ORDER BY snapshot_date DESC LIMIT 1`, scoped by account through the chart filter."
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
          label: "`WHERE as_of_date = LAST_DAY(as_of_date)` to keep only true month-end snapshots."
        - id: day_28_or_later
          label: "`WHERE EXTRACT(DAY FROM as_of_date) >= 28` to keep rows on or after the 28th of any month."
        - id: month_diff
          label: "`WHERE DATE_TRUNC(as_of_date, MONTH) = as_of_date` to keep rows whose date is the first day of the month."
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
        - id: chart_filter_only
          label: Only the chart-level filter, since adding a dimension cannot change a SUM total.
        - id: data_freshness
          label: Only the data freshness setting, since the underlying source rows are the same.
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
          label: Whether the BigQuery query runs as the owner's identity or as each viewer's identity.
        - id: refresh_interval_only
          label: Whether the data freshness interval is shorter or longer than 1 hour.
        - id: data_source_type
          label: Whether the data source is embedded in the report or reusable across reports.
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
        - id: cache_hit_only
          label: Only that the first run returned `cache_hit = TRUE`, so future refreshes will not bill.
        - id: row_count_proxy
          label: Only the chart's displayed row count, since bytes processed and rows displayed are equivalent.
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
          label: "The `ORDER BY` column and the explicit window frame (`ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING`)."
        - id: partition_only
          label: "Only the `PARTITION BY` clause; default frame and ordering are enough for `LAST_VALUE`."
        - id: outer_order_by
          label: "Only the query's outer `ORDER BY`, since window order is inherited from it."
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
          label: Whether the view and referenced resources are in the same location (EU multi-region vs us multi-region).
        - id: dataset_naming_only
          label: Whether the dataset names start with the same prefix so the view can resolve them.
        - id: same_project
          label: Whether both the view and the referenced tables sit in the same Google Cloud project.
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
          label: The leftmost source determines the retained records in a left-outer blend by default.
        - id: inherit_aggregation
          label: The leftmost source determines the default aggregation for every metric on the right.
        - id: refresh_anchor
          label: The leftmost source sets the data freshness for every right-side source.
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
        - id: branch_grain_substitution
          label: Aggregate to branch grain first; branch totals can stand in for depositor-bank coverage when account-level data is unavailable.
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
    - id: q-medium-weighted-average-ratio
      type: multiple_choice
      estimated_seconds: 85
      recommended_learner_tasks: [LT-DQ-006]
      source_facts:
        - FACT-BI-RATIO-SUM-COMPONENTS-FIRST
        - FACT-LOOKER-STUDIO-DEFAULT-AGGREGATION
      prompt: >
        A retail bank reports `Average account balance per active account`
        on an executive dashboard. Two implementations are proposed:
        formula A computes `SUM(account_balance) / SUM(active_account_count)`
        from a daily branch-level serving view; formula B computes
        `AVG(branch_average_balance)` from the same serving view. Which
        gives the cert-correct weighted result under a chart filter that
        drops the smallest branches?
      options:
        - id: formula_a_weighted
          label: Formula A; the numerator and denominator re-aggregate at the filtered grain so each retained branch contributes in proportion to its account count.
        - id: formula_b_average
          label: Formula B; averaging an already-averaged column produces a stable cross-branch number that survives any filter.
        - id: either_match
          label: Either; for a fixed serving view the two formulas mathematically agree.
        - id: a_only_if_unfiltered
          label: Formula A only on the unfiltered total; under any filter, formula B is required to recompute.
      answer: formula_a_weighted
      explanation: >
        Weighted ratios aggregate components first so they recompute
        correctly at any filter context. Averaging branch averages
        discards the branch weights and is an average-of-averages
        antipattern.
      self_assessment: >
        If a chart filter changes the ratio's meaning, suspect an
        average-of-averages formula and replace with `SUM(num) / SUM(den)`.
    - id: q-medium-sum-count-distinct-trap
      type: multiple_choice
      estimated_seconds: 85
      recommended_learner_tasks: [LT-BI-002]
      source_facts:
        - FACT-BIGQUERY-COUNT-DISTINCT-GRAIN
        - FACT-BI-FANOUT-JOIN-RISK
      prompt: >
        A wealth-management dashboard groups account totals by
        `relationship_manager` and by `service_tier`, then reports
        `SUM(distinct_customer_count)` across the two groupings as
        "unique customers served". One customer is served by two
        relationship managers across two service tiers. How does the
        reported number compare to the real distinct-customer count?
      options:
        - id: overstates
          label: It overstates the true distinct-customer count because each customer is counted once per group they appear in.
        - id: understates
          label: It understates because BigQuery deduplicates across the SUM and skips the customer.
        - id: matches
          label: It matches the true distinct-customer count because `COUNT(DISTINCT)` is additive across non-overlapping groups.
        - id: depends_on_join
          label: It depends on whether the dashboard uses an `INNER JOIN` or `LEFT JOIN` between customers and accounts.
      answer: overstates
      explanation: >
        `COUNT(DISTINCT)` is not additive across groups when the same
        entity appears in multiple groups. Summing per-group distinct
        counts double-counts shared entities. The cert-correct fix is to
        compute `COUNT(DISTINCT customer_id)` over the same window
        directly.
      self_assessment: >
        Whenever a grouped report sums distinct counts, ask whether the
        entity can appear in multiple groups; if so, recompute on the
        full window.
    - id: q-medium-psd2-sca-evidence
      type: select_all
      estimated_seconds: 90
      recommended_learner_tasks: [LT-DQ-005]
      source_facts:
        - FACT-PSD2-STRONG-CUSTOMER-AUTHENTICATION
        - FACT-GDPR-DATA-MINIMISATION
      prompt: >
        A payments BI dashboard tracks strong customer authentication
        outcomes for electronic transactions. Which fields belong in the
        governed serving view feeding the aggregate page?
      options:
        - id: sca_outcome
          label: SCA outcome (success / failure / skipped) per transaction reporting date.
        - id: exemption_reason
          label: The applied SCA exemption category (when an exemption was used).
        - id: counterparty_channel
          label: Counterparty type and acceptance channel categories.
        - id: raw_customer_id
          label: The raw customer identifier on every row so support staff can drill into a specific cardholder from the aggregate.
      answer: [sca_outcome, exemption_reason, counterparty_channel]
      explanation: >
        Aggregate SCA dashboards need outcome, exemption, and channel
        categories. Raw customer identifiers fail PSD2-aware data
        minimisation when they sit on a broadly shared aggregate page;
        per-customer investigation belongs on a separately governed
        detail surface.
      self_assessment: >
        If aggregate authentication metrics rely on per-customer fields
        being present, separate the aggregate page from the
        access-controlled investigation page.
    - id: q-medium-aml-cft-alert-page
      type: multiple_choice
      estimated_seconds: 85
      recommended_learner_tasks: [LT-DQ-005]
      source_facts:
        - FACT-AML-CFT-SUSPICIOUS-ACTIVITY
        - FACT-GDPR-DATA-MINIMISATION
        - FACT-GDPR-SPECIAL-CATEGORIES
      prompt: >
        A bank's compliance team needs an internal dashboard summarising
        AML alert volumes by reporting period. Which serving design fits
        cert-track expectations for AML / CFT BI?
      options:
        - id: aggregate_governed
          label: A governed aggregate serving view with alert counts and ageing categories; per-alert narratives and KYC fields stay on a separately access-controlled detail page.
        - id: full_alert_export
          label: A flat extract that joins every alert with the full KYC record and customer narrative, so compliance can analyse without leaving the report.
        - id: aggregate_with_customer_ids
          label: An aggregate page that keeps customer IDs as a chart dimension so investigators can pivot from the totals.
        - id: blend_kyc_to_marketing
          label: A blend between AML alerts and the marketing dashboard so account managers can see alert flags in their own page.
      answer: aggregate_governed
      explanation: >
        AML records, KYC narratives, and per-customer suspicion
        evidence are highly sensitive personal data with strict
        access-control expectations; specific fields may also reveal
        GDPR Article 9 special-category data (for example health,
        political opinion, religious belief) when narrative text
        captures it. The cert-correct pattern is an aggregate governed
        view for the broad audience and a separately access-controlled
        detail page for investigation. Carrying KYC narratives or
        customer IDs into the aggregate page violates data minimisation
        and the case-by-case access boundary the AML / CFT regime
        expects.
      self_assessment: >
        If an AML aggregate page exposes investigation-level fields,
        split the surface into a governed summary and a restricted
        detail page.
    - id: q-medium-corep-finrep-versioning
      type: multiple_choice
      estimated_seconds: 90
      recommended_learner_tasks: [LT-DQ-005]
      source_facts:
        - FACT-EBA-FRAMEWORK-VERSIONING
        - FACT-EBA-DPM-VALIDATION-RULES
        - FACT-CRR-CET1-RATIO
      prompt: >
        A bank prepares its COREP / FINREP submission for 2026-Q1. A
        capital-monitoring dashboard already reports the same CET1
        numerator and denominator using the prior framework version. The
        reviewer asks the BI team to align the dashboard with the
        version used for the submission. Which alignment evidence
        belongs in the dashboard release record?
      options:
        - id: framework_version_per_period
          label: The reporting framework version, validation rule version, and reference date, recorded next to the CET1 value for each period shown.
        - id: chart_only_alignment
          label: Only that the chart appears next to the COREP submission link, since the data source is upstream and is implicitly aligned.
        - id: relabel_to_match
          label: A note that the dashboard label is renamed to match the COREP cell coordinate; that proves alignment.
        - id: latest_version_only
          label: Only the latest framework version, applied retroactively to all periods so the chart looks consistent.
      answer: framework_version_per_period
      explanation: >
        Validation outcomes and capital ratios can change between
        framework versions. Period comparisons need the rule and
        framework version recorded per period before a regulatory-style
        BI metric can be aligned to the submission template.
      self_assessment: >
        If a regulatory-flavoured dashboard does not record the
        framework version per period, comparisons across periods are
        not trustworthy.
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
        - id: cache_hit_skip
          label: A claim that all refreshes hit the query results cache so bytes do not matter.
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
        - id: ignore_partition_filter
          label: A note that the partition filter can be omitted because the date control narrows the result.
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
        - id: viewer_count_only
          label: Only the count of report viewers in the last 24 hours.
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
        - id: depositor_geo_only
          label: Only the depositor's residence country, since high-balance protection is residence-based.
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
        - id: viewer_email_list
          label: The list of viewer emails who opened the report during the incident window.
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
        - id: only_failing_rows
          label: Only the count of failing rows, without naming the rule version that produced the count.
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
        - id: switch_to_legacy_sql
          label: Switch the serving query to legacy SQL because GoogleSQL scans more data.
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
        - id: lower_freshness_for_all
          label: Lower freshness on every source to 1 minute so the blend cannot be stale.
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
    - id: q-hard-count-star-vs-column
      type: multiple_choice
      estimated_seconds: 90
      recommended_learner_tasks: [LT-DQ-006]
      source_facts:
        - FACT-BIGQUERY-COUNT-STAR-VS-COLUMN
        - FACT-BIGQUERY-SUM-NULLS
      prompt: >
        A balance table has 18 rows; 4 of them have `ledger_balance IS NULL`
        because the source pipeline dropped values. A quality check runs
        `COUNT(*)` and `COUNT(ledger_balance)` side by side. What does each
        return and how should that be interpreted?
      options:
        - id: 18_and_14
          label: "`COUNT(*)` returns 18 and `COUNT(ledger_balance)` returns 14; the gap is the count of NULL balances that the quality check must investigate."
        - id: 18_and_18
          label: "Both return 18, because BigQuery treats NULL as a zero balance when counting a numeric column."
        - id: 14_and_14
          label: "Both return 14, because BigQuery's `COUNT(*)` skips rows where any column is NULL."
        - id: error
          label: "`COUNT(ledger_balance)` errors out at runtime when the column contains NULL, so the contract must use only `COUNT(*)`."
      answer: 18_and_14
      explanation: >
        `COUNT(*)` counts every row including those with NULLs anywhere;
        `COUNT(column)` skips rows where that column is NULL. The 4-row gap is
        directly observable evidence of missing values.
      self_assessment: >
        If a quality check ever needs to report on missing values, prefer
        `COUNT(column)` next to `COUNT(*)` rather than treating them as
        interchangeable.
    - id: q-hard-clustering-vs-partitioning
      type: multiple_choice
      estimated_seconds: 95
      recommended_learner_tasks: [LT-LOOKER-007]
      source_facts:
        - FACT-BIGQUERY-CLUSTERING
        - FACT-BIGQUERY-PARTITION-FILTERS
      prompt: >
        A daily fact table is partitioned by `business_date` and contains tens
        of millions of rows per partition. A dashboard query reads
        `business_date = DATE '2026-03-31'` and aggregates by `currency_code`
        and `branch_id`. Which design best reduces bytes scanned in addition
        to the partition filter?
      options:
        - id: cluster_on_currency_branch
          label: Cluster the table on `(currency_code, branch_id)` so the partition's rows are sorted by the columns used in the aggregation.
        - id: cluster_on_business_date
          label: Cluster the table on `business_date`; clustering on the partition column further narrows the scan.
        - id: more_partitions
          label: Re-partition the table hourly so each partition has fewer rows than the daily one.
        - id: drop_partition
          label: Remove the date partition and rely on clustering on `business_date` alone for scan reduction.
      answer: cluster_on_currency_branch
      explanation: >
        Clustering sorts rows inside a partition by the cluster columns.
        Filters or aggregations on those columns scan less data. Clustering on
        the partition column is redundant; the partition already handles that
        axis.
      self_assessment: >
        If a query is partition-pruned and still scans too much, look at which
        non-partition columns it filters or groups by and cluster on them.
    - id: q-hard-row-access-policy
      type: multiple_choice
      estimated_seconds: 90
      recommended_learner_tasks: [LT-LOOKER-004]
      source_facts:
        - FACT-BIGQUERY-ROW-ACCESS-POLICY
        - FACT-BIGQUERY-AUTHORIZED-VIEW-ACCESS-CONTROL
      prompt: >
        Branch managers should each see only their own branch's rows from
        `serve.account_daily_summary`, while the executive team sees every
        branch. Which BigQuery mechanic is the cert-correct primary control?
      options:
        - id: row_access_policy
          label: "One `CREATE ROW ACCESS POLICY` per branch-manager group with `GRANT TO ('group:branch-NN-managers@example.com')` and `FILTER USING (branch_id = 'BNN')`, so each grantee group sees only its branch's rows."
        - id: per_branch_views
          label: Create one logical view per branch and grant each manager access only to their view.
        - id: scheduled_query_per_branch
          label: A scheduled query per branch that writes a branch-scoped result table; managers query their table.
        - id: column_policy_tag
          label: A column-level policy tag on `branch_id` so only authorised viewers can read the column.
      answer: row_access_policy
      explanation: >
        Row-level security is the cert-correct primary control when one
        underlying table must return different rows for different identities.
        Per-branch views and scheduled queries are sustainable for a small
        number of branches but multiply objects to govern; a column-level
        policy tag protects column visibility, not row-level scope.
      self_assessment: >
        If the design relies on duplicating views or schedules per identity,
        check whether row-level security would compress the surface area.
    - id: q-hard-column-policy-tag
      type: multiple_choice
      estimated_seconds: 90
      recommended_learner_tasks: [LT-LOOKER-004]
      source_facts:
        - FACT-BIGQUERY-COLUMN-POLICY-TAG
        - FACT-GDPR-DATA-MINIMISATION
        - FACT-GDPR-PERSONAL-DATA
      prompt: >
        A team needs to expose `account_daily_balances` to a wide audience
        for aggregate reporting, but `account_id` and `synthetic_iban` must
        be hidden from anyone without an explicit personal-data role. Which
        BigQuery mechanic fits?
      options:
        - id: policy_tag_on_columns
          label: Attach a policy tag (e.g. `personal-data`) to `account_id` and `synthetic_iban`; queries that select those columns require the fine-grained reader role.
        - id: hide_columns_in_view
          label: Create a view that omits the columns and grant access only to the view; row-level security on the underlying table is unnecessary.
        - id: drop_columns_from_table
          label: Drop the columns from the table entirely so no policy is needed.
        - id: lower_freshness
          label: Lower Looker Studio freshness to 1 minute so cached personal-data values cannot accumulate.
      answer: policy_tag_on_columns
      explanation: >
        Column-level security via policy tags is the cert-correct way to
        protect specific columns inside a table that should otherwise stay
        broadly readable. A view-based hiding pattern is reasonable but still
        leaves the underlying table column selectable by anyone with table
        access.
      self_assessment: >
        If only specific columns need restriction while the rest of the table
        stays broadly readable, prefer policy tags over inventing new views.
    - id: q-hard-results-cache-cost
      type: multiple_choice
      estimated_seconds: 85
      recommended_learner_tasks: [LT-DQ-005]
      source_facts:
        - FACT-BIGQUERY-RESULTS-CACHE
        - FACT-BIGQUERY-JOBS-BYTES
        - FACT-LOOKER-STUDIO-BIGQUERY-REFRESH-COST
      prompt: >
        A BigQuery-backed dashboard runs the same query every hour for 24
        hours; the underlying table is unchanged. What does the cost evidence
        look like and what should the cost review record?
      options:
        - id: most_refreshes_cache_hit
          label: Most refreshes hit the query results cache (`cache_hit = TRUE`) and bill 0 bytes; record that cost depends on data stability and cannot be assumed for future days.
        - id: every_refresh_bills_same
          label: Every refresh bills the same bytes; the cache only affects user-initiated queries from the UI, not Looker Studio refreshes.
        - id: cache_persists_indefinitely
          label: Once a query hits the cache, results are served from the cache indefinitely until the dashboard is reopened in a different region.
        - id: cache_hit_for_changed_data
          label: Cache hits occur regardless of whether the underlying table changed, as long as the SQL text is identical.
      answer: most_refreshes_cache_hit
      explanation: >
        Cached query results last about 24 hours and are returned when the
        query and underlying data are unchanged. Cache hits report
        `cache_hit = TRUE` and bill zero bytes. Cost reviews should not rely
        on the cache as a control because cache eligibility depends on data
        stability.
      self_assessment: >
        If a cost report shows zero billed bytes for a refreshing dashboard,
        confirm whether that is sustained cache-hit behaviour or a single
        snapshot.
    - id: q-hard-materialized-view-refresh
      type: multiple_choice
      estimated_seconds: 90
      recommended_learner_tasks: [LT-DQ-005]
      source_facts:
        - FACT-BIGQUERY-MATERIALIZED-VIEW-REFRESH
        - FACT-BIGQUERY-MATERIALIZED-VIEW-CACHE
        - FACT-LOOKER-STUDIO-DATA-FRESHNESS-TRADEOFF
      prompt: >
        A dashboard's logical view is replaced with a materialized view to
        reduce repeated cost. The freshness target says results should
        usually be within 30 minutes of the base table. Which refresh
        consideration belongs in the design record?
      options:
        - id: refresh_interval_best_effort
          label: Configure the materialized view's `max_staleness` / `refresh_interval_minutes` toward the freshness target, with the explicit caveat that BigQuery automatic refresh is best-effort; queries on stale results may either return cached results or trigger a refresh depending on configuration, so the design record names the target plus the staleness fallback.
        - id: refresh_only_on_query
          label: Materialized views refresh only when queried, so the dashboard automatically sees current data on every load.
        - id: refresh_disable_for_perf
          label: Disable automatic refresh; rely on `cache_hit` in `INFORMATION_SCHEMA.JOBS` to identify when data is stale.
        - id: refresh_via_ls_freshness
          label: Set Looker Studio data freshness to 30 minutes so the materialized view automatically refreshes at that interval.
      answer: refresh_interval_best_effort
      explanation: >
        BigQuery materialized-view automatic refresh is best-effort. The
        refresh interval / `max_staleness` settings express a target, not
        a hard SLA. A design record should name the target, what
        configuration was applied, and the documented behaviour when the
        cached result is older than the target. Looker Studio data
        freshness is a separate report-side cache threshold and does not
        configure warehouse refresh.
      self_assessment: >
        If a freshness target is treated as a guarantee, restate it as a
        best-effort target and record the staleness fallback the design
        accepts.
    - id: q-hard-blend-join-types
      type: multiple_choice
      estimated_seconds: 85
      recommended_learner_tasks: [LT-LOOKER-004]
      source_facts:
        - FACT-LOOKER-STUDIO-BLEND-JOIN-TYPES
        - FACT-LOOKER-STUDIO-BLEND-LEFTMOST
        - FACT-LOOKER-STUDIO-BLEND-MORE-ROWS
      prompt: >
        A blend joins `account_daily_balances` (left) to a branch dimension
        (right) where some accounts reference branches that no longer exist
        in the dimension table. The default blend operator is left outer.
        What happens in the chart, and which alternative would drop those
        records on purpose?
      options:
        - id: left_outer_keeps_inner_drops
          label: The default left outer keeps unmatched balance rows (branch fields appear NULL); switching the operator to inner would drop them.
        - id: inner_default_keeps
          label: The default operator is inner and already keeps every left row; full outer would drop them.
        - id: cross_join_default
          label: Looker Studio uses a cross join by default, so every balance row repeats per branch and the totals overstate.
        - id: right_outer_drop_left
          label: Right outer is the default, so unmatched left rows are silently dropped.
      answer: left_outer_keeps_inner_drops
      explanation: >
        The default blend operator is left outer; unmatched left rows are
        kept with NULL right-side values. Switching to an inner join drops
        unmatched left rows on purpose. Cross and right outer joins are
        opt-in operators.
      self_assessment: >
        If a blend chart silently drops or duplicates records, inspect the
        join operator before adjusting the chart.
    - id: q-hard-freshness-interval-cost
      type: multiple_choice
      estimated_seconds: 80
      recommended_learner_tasks: [LT-DQ-005]
      source_facts:
        - FACT-LOOKER-STUDIO-FRESHNESS-INTERVALS
        - FACT-LOOKER-STUDIO-BIGQUERY-REFRESH-COST
        - FACT-BIGQUERY-RESULTS-CACHE
      prompt: >
        A Looker Studio report sets data freshness to 1 minute on a
        BigQuery-backed source. The report is opened and a viewer
        interacts with charts repeatedly over several minutes. What does
        the data freshness setting actually do, and what belongs in the
        cost-observability note?
      options:
        - id: freshness_is_cache_threshold
          label: Freshness is a cache-staleness threshold; cached chart data is reused for up to the configured interval, and a subsequent chart interaction after the interval has elapsed (or any cache-invalidating change) sends a fresh query. Cost grows with how often viewers interact after the threshold lapses, not with seconds elapsed.
        - id: interval_only_first_load
          label: Freshness affects only the first load; subsequent chart interactions never re-query BigQuery regardless of interval.
        - id: cache_hits_no_cost
          label: A 1-minute freshness guarantees every refresh hits the query results cache, so cost is zero regardless of data-change patterns.
        - id: interval_caps_bytes
          label: The freshness interval caps the bytes any single refresh can bill, so 1-minute freshness is the cheapest option.
      answer: freshness_is_cache_threshold
      explanation: >
        Looker Studio data freshness is the maximum age the report will
        reuse a cached result before issuing a new query, not an
        auto-refresh interval. Shorter freshness raises the chance that a
        chart interaction triggers a billed BigQuery query, because the
        cached data expires sooner. The cost-observability note should
        record the freshness threshold, the expected interaction
        frequency after threshold lapse, and the change rate of the base
        table.
      self_assessment: >
        If a freshness change is treated as an auto-refresh-frequency
        change, restate the setting as a cache-staleness threshold and
        recompute the cost expectation against viewer interaction
        patterns instead of seconds-on-screen.
    - id: q-hard-scd-type
      type: multiple_choice
      estimated_seconds: 95
      recommended_learner_tasks: [LT-BI-001]
      source_facts:
        - FACT-BI-SCD-TYPES
        - FACT-BI-SURROGATE-KEY
        - FACT-BI-REFERENCE-DATE-SEPARATION
      prompt: >
        A branch is renamed on 2026-02-15. A trend chart of monthly deposits
        by branch should report 2026-01 totals under the old name and
        2026-03 totals under the new name. Which dimension design supports
        this without rewriting history?
      options:
        - id: scd2
          label: SCD type 2 on `dim_branch` with effective-from / effective-to columns and a surrogate key; facts reference the surrogate valid at the reference date.
        - id: scd1_overwrite
          label: SCD type 1; overwrite `branch_name` with the new value, accepting that historical totals will appear under the new name.
        - id: branch_per_period
          label: Add a new branch row for every month; facts join on natural `branch_id` + reference month.
        - id: no_change_needed
          label: No change needed; `business_date` already separates historical and current reporting.
      answer: scd2
      explanation: >
        SCD type 2 splits the dimension on every change with effective-from
        and effective-to dates. Facts reference the surrogate key valid at
        the fact's reference date, so each period's totals stay under the
        name in force at that time.
      self_assessment: >
        If a historical metric must respect period-specific dimension
        attributes, prefer SCD type 2 over SCD type 1 overwrite.
    - id: q-hard-conformed-dimensions
      type: multiple_choice
      estimated_seconds: 90
      recommended_learner_tasks: [LT-BI-002]
      source_facts:
        - FACT-BI-CONFORMED-DIMENSION
        - FACT-BI-FANOUT-JOIN-RISK
      prompt: >
        A bank's deposits, lending, and fees subject areas each build their
        own `dim_branch` table from different source pipelines. A new
        executive page wants to compare deposits vs lending exposure by
        branch. What is the cert-correct durable fix?
      options:
        - id: conformed_dim_branch
          label: Build one conformed `dim_branch` shared across all subject areas, with the same grain, keys, and attribute semantics; switch fact tables to reference it.
        - id: blend_per_chart
          label: Blend deposits and lending in Looker Studio per chart, joining on `branch_id` at the report layer.
        - id: union_subject_dims
          label: Union the three `dim_branch` tables into one BI view; deduplicate by `branch_id` at query time.
        - id: chart_filter_only
          label: Use a chart filter that aligns the two metrics to a shared branch list at presentation time.
      answer: conformed_dim_branch
      explanation: >
        Conformed dimensions are a documented BI durable fix for cross-mart
        consistency. Per-chart blends, runtime unions, and chart-level
        filters do not protect future subject areas added on the same shape.
      self_assessment: >
        If two subject areas keep diverging on the same dimension, the right
        fix is a shared conformed table, not a chart-level workaround.
    - id: q-hard-crr-cet1-grain
      type: multiple_choice
      estimated_seconds: 90
      recommended_learner_tasks: [LT-DQ-005]
      source_facts:
        - FACT-CRR-CET1-RATIO
        - FACT-BI-REFERENCE-DATE-SEPARATION
      prompt: >
        A capital-monitoring dashboard reports a CET1 ratio of 13.7% for
        2026-03-31. A reviewer asks where the numerator and denominator
        originate. Which combination of evidence is required for the BI
        ratio to be cert-trustworthy?
      options:
        - id: same_period_numer_denom
          label: CET1 capital and total risk-weighted exposure (RWA) for the same reporting date, reconciled to the COREP capital adequacy template.
        - id: ratio_only
          label: The ratio value from the regulatory submission and the report refresh time; the components are an implementation detail.
        - id: prior_period_numer
          label: CET1 capital from the prior month-end (because capital reports lag), with RWA from 2026-03-31.
        - id: rwa_average
          label: An average of RWA across the last four month-ends, with CET1 from 2026-03-31 only.
      answer: same_period_numer_denom
      explanation: >
        The CRR CET1 ratio is a same-period numerator-over-denominator
        construction. Mixing reporting dates or RWA methodologies produces a
        number that cannot be compared period-over-period or to the COREP
        template.
      self_assessment: >
        If a regulatory-style BI metric reports a ratio with two
        components, both components must come from the same period and the
        same approach.
    - id: q-hard-ifrs9-stage
      type: multiple_choice
      estimated_seconds: 95
      recommended_learner_tasks: [LT-SQL-003]
      source_facts:
        - FACT-IFRS9-STAGES
        - FACT-BI-SEMI-ADDITIVE-BALANCE-SNAPSHOT
      prompt: >
        A credit-risk dashboard reports a single "ECL total" by month. The
        risk committee notices a large month-over-month jump but cannot
        explain it. What is the BI design fix?
      options:
        - id: stage_breakdown
          label: Break the ECL total by IFRS 9 stage (1, 2, 3) per reporting date; stage transitions usually explain large ECL movements.
        - id: average_ecl
          label: Replace the monthly ECL total with a 12-month rolling average to dampen the jump.
        - id: filter_stage_3
          label: Filter the dashboard to stage 3 only, since stage 1 and 2 ECL are immaterial.
        - id: cross_period_sum
          label: Sum ECL across the latest 3 months as the "current" ECL so single-month jumps disappear.
      answer: stage_breakdown
      explanation: >
        IFRS 9 ECL is staged; movements between stages are the main driver
        of ECL variance. A single total hides the cause. Dampening
        techniques (rolling averages, cross-period sums) obscure the signal
        the committee needs.
      self_assessment: >
        If a regulatory-flavoured metric is volatile, surface the breakdown
        that explains the volatility rather than smoothing it.
    - id: q-hard-bcbs-239-lineage
      type: select_all
      estimated_seconds: 95
      recommended_learner_tasks: [LT-DQ-005]
      source_facts:
        - FACT-BCBS-239-RDARR-PRINCIPLES
        - FACT-BI-RECONCILIATION-WINDOWS
        - FACT-DORA-DATA-CONFIDENTIALITY-INTEGRITY
      prompt: >
        A banking BI dashboard feeds a credit-risk decision body. Which
        evidence should be available per metric for BCBS 239-style review?
      options:
        - id: source_lineage
          label: Source-to-metric data lineage including the upstream serving views and base tables.
        - id: named_owner
          label: A named owner and reviewer responsible for the metric definition.
        - id: reconciliation_record
          label: A reconciliation record between the dashboard total and an upstream control total per reporting date.
        - id: cache_hit_replaces_lineage
          label: A `cache_hit = TRUE` rate above 95 percent in `INFORMATION_SCHEMA.JOBS`, treated as a substitute for lineage and reconciliation evidence.
      answer: [source_lineage, named_owner, reconciliation_record]
      explanation: >
        BCBS 239 principles require risk-data lineage, accountability, and
        reconciliation evidence. Visual styling is not in scope.
      self_assessment: >
        If a metric is used in a credit-risk decision, its evidence chain
        (lineage + owner + reconciliation) must be retrievable, not just its
        last-period value.
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
