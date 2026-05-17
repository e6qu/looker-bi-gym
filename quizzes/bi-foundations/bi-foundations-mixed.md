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
      estimated_seconds: 90
      recommended_learner_tasks: [LT-BI-002]
      source_facts:
        - FACT-BI-FANOUT-JOIN-RISK
        - FACT-DEPOSITS-FANOUT-CONTROL-TOTALS
      prompt: |
        A "deposits by owner" report on the latest day reads
        `RON+EUR equivalent 164,800`. The reconciliation against the
        source's latest account-grain `SUM(ledger_balance)` reads
        `95,700`. The owner table has 9 rows for 6 accounts - three
        accounts are jointly owned. The serving SQL is:

            SELECT
              o.customer_id,
              SUM(b.ledger_balance) AS total_balance
            FROM account_daily_balances b
            INNER JOIN account_owners o USING (account_id)
            WHERE b.business_date = '2026-03-31'
            GROUP BY o.customer_id;

        How much money is the report claiming exists that the source
        does not actually back? (Enter the absolute overstatement in
        the dataset's reporting unit.)
      answer: 69100
      explanation: |
        The `INNER JOIN account_owners` is many-to-many on the account
        side (some accounts have two owners). Each account row is
        replicated once per owner before the `SUM`. The dataset's
        9-vs-6 ratio means 3 accounts contribute their balance twice
        in the joined intermediate, inflating the total by exactly
        those three accounts' worth of phantom money.

        Source latest total = 95,700. Report total = 164,800. The
        overstatement is `164,800 - 95,700 = 69,100`. That is not a
        rounding error or an FX drift; it is real-shaped money the
        report is conjuring out of duplicated rows.

        The fix is one of two shapes:

        - Reduce the owner side to one share per account first
          (e.g. allocate by `1 / owner_count`), then join.
        - Compute the per-account total first (which the source
          already gives you), then join an owner roster *for
          display* only, without re-aggregating balances.

        If the report stays as-is, every published number it shows
        is high by ~72% on this day.
      self_assessment: |
        Any time a balance metric joins to ownership / membership /
        membership-history, write the reconciliation total side by
        side. A 70%+ delta means the join changed the grain; it
        will not be fixable on the chart side.
    - id: q-medium-reduce-before-join
      type: multiple_choice
      estimated_seconds: 90
      recommended_learner_tasks: [LT-BI-002]
      source_facts:
        - FACT-BIGQUERY-REDUCE-BEFORE-JOIN
        - FACT-BI-FANOUT-JOIN-RISK
      prompt: |
        Code review: a colleague's query for "deposits by owner"
        looks like this:

            SELECT
              o.customer_id,
              b.business_date,
              SUM(b.ledger_balance) AS total_balance
            FROM account_daily_balances b
            INNER JOIN account_owners o USING (account_id)
            WHERE b.business_date = '2026-03-31'
            GROUP BY o.customer_id, b.business_date;

        The `account_owners` table has 9 rows for 6 accounts (three
        joint accounts). The reconciliation total against the source
        is `95,700` but this query returns `164,800` in total - a
        ~72% overstatement. Which rewrite fixes the fanout without
        changing the business meaning?
      options:
        - id: aggregate_first
          label: |
            Aggregate balances to one row per `(account_id,
            business_date)` in a CTE first, then join to owners
            (allocating by `1 / owner_count` if the metric should
            be split, or keeping account-grain balance separate
            from owner display):

                WITH per_account AS (
                  SELECT account_id, business_date,
                         SUM(ledger_balance) AS account_balance
                  FROM account_daily_balances
                  WHERE business_date = '2026-03-31'
                  GROUP BY account_id, business_date
                ),
                shares AS (
                  SELECT account_id,
                         1.0 / COUNT(*) OVER (PARTITION BY account_id)
                           AS share
                  FROM account_owners
                )
                SELECT o.customer_id,
                       SUM(p.account_balance * s.share) AS total_balance
                FROM per_account p
                JOIN account_owners o USING (account_id)
                JOIN shares s USING (account_id)
                GROUP BY o.customer_id;
        - id: distinct_at_end
          label: |
            Keep the raw owner join and add `SELECT DISTINCT
            customer_id, business_date, total_balance ...` at the
            end. Duplicates are removed after the SUM so the chart
            shows only one row per customer-day.
        - id: group_by_owner_account
          label: |
            Keep the raw owner join and add `account_id` to the
            `GROUP BY`. That keeps the SUM at account grain so the
            inflation goes away.
      answer: aggregate_first
      explanation: |
        The fanout happens between the `INNER JOIN` and the `SUM`:
        each account row appears once per owner *before* the
        balance is summed, so the SUM operates on duplicated
        balance values.

        Why the other rewrites do not work:

        - **`SELECT DISTINCT`**. The duplicates are inside the
          aggregate; the `SUM` already saw the duplicated rows and
          produced the inflated number. Adding DISTINCT to the
          *output* deduplicates rows that already carry the wrong
          total. The chart shows one row per customer-day with the
          wrong total.
        - **`GROUP BY account_id`**. This produces per-account rows
          and stops the fanout - but it also drops the customer
          grain you were trying to report on. The chart no longer
          answers "deposits per customer"; it answers "deposits
          per account", which is the original source.

        The right pattern is **reduce, then join**:
        1. Reduce balances to one row per account at the report's
           reference date (CTE 1).
        2. Compute owner shares per account (CTE 2, optional).
        3. Join the two and aggregate to the customer grain you
           actually want.

        This pattern is so common in BI that it has a name -
        "aggregate before join" - and is the cert-correct response
        any time a fact joins to a many-to-many ownership table.
      self_assessment: |
        If a query joins a balance / amount / measure to a
        membership / ownership table, the safe shape is to reduce
        one side before joining. `DISTINCT` and chart-side filters
        cannot undo a join-changed grain.
    - id: q-medium-qualify-latest-row
      type: multiple_choice
      estimated_seconds: 90
      recommended_learner_tasks: [LT-SQL-003]
      source_facts:
        - FACT-BIGQUERY-QUALIFY-WINDOW-FILTER
        - FACT-BIGQUERY-WINDOW-PRESERVES-ROWS
      prompt: |
        The latest-day scorecard reads from a per-account snapshot
        table with multiple `business_date` rows per account, and
        you want one row per account showing the most recent
        snapshot's balance. Sample:

            account_id | business_date | ledger_balance
            A1001      | 2026-03-29    | 42800
            A1001      | 2026-03-30    | 43120
            A1001      | 2026-03-31    | 43000
            A1003      | 2026-03-29    | 18640
            A1003      | 2026-03-31    | 19000

        Three candidate SQL shapes:

            -- (A) QUALIFY with ROW_NUMBER
            SELECT account_id, business_date, ledger_balance
            FROM snapshots
            QUALIFY ROW_NUMBER() OVER (
              PARTITION BY account_id
              ORDER BY business_date DESC
            ) = 1;

            -- (B) MAX in SELECT
            SELECT account_id, MAX(business_date) AS business_date,
                   ledger_balance
            FROM snapshots
            GROUP BY account_id;

            -- (C) ORDER BY + LIMIT, filter on chart side
            SELECT account_id, business_date, ledger_balance
            FROM snapshots
            ORDER BY business_date DESC
            LIMIT 1;

        Which one is correct?
      options:
        - id: qualify_rank
          label: |
            (A). `ROW_NUMBER() OVER (PARTITION BY account_id
            ORDER BY business_date DESC) = 1` ranks each account's
            snapshots latest-first; `QUALIFY` keeps only rank 1.
            Output: one row per account, with the `ledger_balance`
            that belongs to the latest `business_date` for that
            account.
        - id: max_in_select
          label: |
            (B). `SELECT account_id, MAX(business_date), ledger_balance
            ... GROUP BY account_id`. The `MAX` returns the latest
            date per account; the `ledger_balance` in the SELECT
            list is grouped alongside it, so the row is consistent.
        - id: order_limit
          label: |
            (C). `ORDER BY business_date DESC LIMIT 1` returns the
            single most-recent row. Scope it per account via a
            chart-side filter that re-runs the query for each
            account.
      answer: qualify_rank
      explanation: |
        Only (A) returns one row per account with the matching
        balance.

        (B) is wrong in a subtle way: `MAX(business_date)` is fine,
        but `ledger_balance` in the SELECT list is not in `GROUP
        BY` and is not aggregated. BigQuery and most engines will
        reject this with an "expression not aggregated and not in
        group by" error. Even if a permissive engine ran it, the
        returned `ledger_balance` would be from an arbitrary row in
        the group, not necessarily the row matching the MAX date.

        (C) is wrong because `LIMIT 1` returns one row from the
        entire table, not one per account. You would get the most
        recent row across all accounts. Pushing the
        "per account" logic into a chart-side filter does not
        work either: the query has already returned 1 row before
        the chart filters it.

        Production tip: when the per-group latest pattern is hot,
        consider materialising a `latest_per_account` view or a
        partitioned table; the `QUALIFY` query is small but it
        scans the whole snapshot history on every refresh unless
        the table is pruned.
      self_assessment: |
        For "latest row per group" patterns, the safe shape is
        `ROW_NUMBER() OVER (PARTITION BY ... ORDER BY ... DESC)
        = 1`, then `QUALIFY` (or wrap in a CTE and `WHERE rn = 1`).
        `MAX` alone does not pick a row; it picks a value.
    - id: q-medium-month-end-date-check
      type: multiple_choice
      estimated_seconds: 80
      recommended_learner_tasks: [LT-SQL-003]
      source_facts:
        - FACT-BIGQUERY-LAST-DAY-MONTH-END
        - FACT-BIGQUERY-DATE-TRUNC-GRANULARITY
        - FACT-BI-REFERENCE-DATE-SEPARATION
      prompt: |
        The lending exposure mart claims one row per loan per
        **month-end** `as_of_date`. While profiling the data you
        find an extra row dated `2026-03-15` (mid-month), inserted
        by an off-cycle reconciliation job. The dashboard's monthly
        trend should ignore that row. Which `WHERE` predicate
        belongs in the serving SQL?

        Sample dates in the table:

            2026-01-31     (real month-end - keep)
            2026-02-28     (real month-end - keep, Feb has 28 days in 2026)
            2026-03-15     (off-cycle - drop)
            2026-03-31     (real month-end - keep)
      options:
        - id: last_day_check
          label: |
            `WHERE as_of_date = LAST_DAY(as_of_date)`. The
            `LAST_DAY` function computes the actual last day of the
            month each date falls in (28 for Feb 2026, 31 for
            March 2026, etc.), so the predicate keeps only rows
            whose `as_of_date` already is that month's last day.
        - id: day_28_or_later
          label: |
            `WHERE EXTRACT(DAY FROM as_of_date) >= 28`. Drop any
            row before the 28th. Catches the 2026-03-15 outlier
            and is simple to read; works for every month because
            month-end is always >= 28.
        - id: month_diff
          label: |
            `WHERE DATE_TRUNC(as_of_date, MONTH) = as_of_date`.
            `DATE_TRUNC` returns the **first** day of the month;
            comparing to the date keeps only rows that fall on
            the first of the month, which is what "month-end" means
            in dimensional-modelling speak.
      answer: last_day_check
      explanation: |
        `LAST_DAY(d)` returns the actual last day of `d`'s month -
        2026-01-31, 2026-02-28, 2026-03-31, etc. - so the predicate
        `as_of_date = LAST_DAY(as_of_date)` is the exact filter for
        "month-end snapshots only".

        Why the other two fail:

        - `EXTRACT(DAY FROM as_of_date) >= 28` is approximately
          right and wrong in a way that bites later. It keeps every
          row on the 28th, 29th, 30th, or 31st of any month - so
          a 2026-02-28 row (real month-end) is kept, but so is a
          2026-03-28 mid-week reconciliation snapshot if one
          existed. The predicate doesn't actually test "is
          month-end"; it tests "is near month-end". Off-cycle
          jobs that happen to land on the 30th would slip
          through.
        - `DATE_TRUNC(as_of_date, MONTH)` returns the *first* day
          of the month, not the last. Comparing it to `as_of_date`
          keeps rows that fall on the 1st (2026-03-01,
          2026-04-01, ...), which is the opposite of what you
          want.

        Production tip: in DuckDB the function is `last_day(d)`
        (lowercase); same semantics. In Postgres, use
        `(DATE_TRUNC('month', d) + INTERVAL '1 month' - INTERVAL
        '1 day')::date`.
      self_assessment: |
        When you need "true month-end", use the engine's
        `LAST_DAY` (or equivalent). Day-number heuristics or
        truncation comparisons answer a slightly different
        question and let off-cycle rows leak in.
    - id: q-medium-safe-cast-control
      type: multiple_choice
      estimated_seconds: 90
      recommended_learner_tasks: [LT-DQ-006]
      source_facts:
        - FACT-BIGQUERY-SAFE-CAST-DQ-NULL
        - FACT-GDPR-ACCURACY
      prompt: |
        Your team is importing daily transactions from a partner
        feed. The `submitted_amount` column is supposed to be
        numeric but ~0.4% of rows arrive as text like `"N/A"`,
        `"unknown"`, or empty string. A teammate proposes wrapping
        the cast in `SAFE_CAST` so the pipeline doesn't fail:

            SELECT
              transaction_id,
              SAFE_CAST(submitted_amount AS NUMERIC) AS submitted_amount,
              ...
            FROM raw.transactions;

        Now invalid values come through as `NULL`. What else does
        the reconciliation control need to surface before this
        feeds a downstream metric?
      options:
        - id: failed_parse_count
          label: |
            A separate `failed_parse_count` column that counts the
            rows where `submitted_amount IS NULL AND raw_submitted_amount
            IS NOT NULL` (parse failed; the source had a value, it
            just wasn't numeric). This count flows into the
            reconciliation dashboard so a spike from 0.4% to 3%
            triggers an investigation.
        - id: silent_drop
          label: |
            No additional control. `SAFE_CAST` returning NULL is
            the correct behaviour - downstream SUMs ignore NULL,
            so failed parses just don't contribute to totals.
            Counting them adds noise.
        - id: accuracy_proven
          label: |
            A `accuracy_verified = TRUE` flag on the serving view,
            confirming that all rows now have well-typed values.
            Downstream reports can rely on `submitted_amount` as
            an accurate numeric field.
      answer: failed_parse_count
      explanation: |
        `SAFE_CAST` returns `NULL` instead of raising on invalid
        input. That keeps the pipeline running but **silently
        loses quality signal** - the row is still there but its
        numeric value is now indistinguishable from a row that
        genuinely had no submitted amount.

        Two consequences if you don't count the failures:

        - **Downstream totals understate**. `SUM(submitted_amount)`
          treats failed parses as zero contribution. A
          legitimate-looking total can hide that 3% of the input
          is unparseable.
        - **Quality regressions are invisible**. The partner feed
          might change format and increase the failure rate; nobody
          notices until a stakeholder questions the totals.

        The right shape:

            SELECT
              ...,
              SAFE_CAST(submitted_amount AS NUMERIC) AS submitted_amount,
              CASE
                WHEN submitted_amount IS NOT NULL
                 AND SAFE_CAST(submitted_amount AS NUMERIC) IS NULL
                THEN 1 ELSE 0
              END AS submitted_amount_parse_failed
            FROM raw.transactions;

        And then surface `SUM(submitted_amount_parse_failed)` as a
        reconciliation metric next to the main total. A NULL from
        a real missing value (source sent nothing) is distinct
        from a NULL from a parse failure (source sent something
        unparseable), and both are distinct from a real zero.

        GDPR's accuracy principle (Article 5(1)(d)) also expects
        personal-data accuracy to be maintained - silently
        replacing invalid values with NULL without recording the
        failure makes accuracy regressions invisible to the
        accountable owner.
      self_assessment: |
        Whenever a cast can fail, the failure count is a
        first-class control metric. SAFE_CAST without a parse-
        failure counter is a pipeline that lies quietly when the
        source format drifts.
    - id: q-medium-looker-aggregation-context
      type: multiple_choice
      estimated_seconds: 90
      recommended_learner_tasks: [LT-LOOKER-004]
      source_facts:
        - FACT-LOOKER-STUDIO-DIMENSION-CONTEXT
        - FACT-LOOKER-STUDIO-DEFAULT-AGGREGATION
      prompt: |
        On the deposits dashboard you have two tables that read
        from the same data source:

        - **Table A**: Dimensions `currency_code`; Metric
          `SUM(ledger_total)`. Shows two rows:
          `RON 79,300` and `EUR 16,400`.
        - **Table B**: Dimensions `currency_code, branch_city`;
          Metric `SUM(ledger_total)`. Shows seven rows summing to
          the same `95,700`.

        A stakeholder asks: "Why does Table A show RON = 79,300
        but Table B's RON rows sum to 79,300 *only* when I include
        the UNMAPPED_BRANCH row?". What does the BI author need
        to check before answering?
      options:
        - id: dimension_context
          label: |
            The chart's **dimension context** and the metric's
            **default aggregation**. Table A groups by
            `currency_code` only, so all RON rows in the source
            collapse into one. Table B groups by `currency_code
            AND branch_city`, so each branch's RON contribution
            shows separately; the same 79,300 is just distributed
            across rows. The "RON without UNMAPPED" undercount is
            the user filtering out the UNMAPPED_BRANCH row in
            Table B by accident; the metric itself is consistent.
        - id: chart_filter_only
          label: |
            The chart-level filter on each table. Adding a
            dimension cannot change a `SUM` total; the only thing
            that can is a filter. Some chart-level filter on
            Table B is silently dropping the UNMAPPED_BRANCH row.
        - id: data_freshness
          label: |
            The data freshness setting. The two tables are likely
            reading from different cached snapshots; flush the
            data source cache and the discrepancy will resolve.
      answer: dimension_context
      explanation: |
        Aggregates in Looker Studio (and SQL in general) are
        relative to the **grain of the grouping dimensions**.
        Adding a dimension splits each existing row into
        sub-rows - the *sum across all rows* stays the same, but
        the rows look different.

        Walking through the numbers from the deposits seed:

        Table A (one dimension, `currency_code`):

            currency_code | ledger_total
            RON           | 79300
            EUR           | 16400
            (sum across rows: 95700)

        Table B (two dimensions, `currency_code, branch_city`):

            currency_code | branch_city     | ledger_total
            RON           | Bucuresti       | 43000
            RON           | Iasi            | 19000
            RON           | Timisoara       | 12300
            RON           | UNMAPPED_BRANCH |  5000
            EUR           | Brasov          |  7100
            EUR           | Cluj-Napoca     |  9300
            (sum across rows: 95700)

        The RON rows in Table B sum to 79,300 only if you include
        UNMAPPED_BRANCH. The stakeholder was probably hiding it
        and seeing 74,300, then asked the question. The metric is
        not wrong; the **filter** the user implicitly applied is.

        The freshness distractor is the kind of explanation that
        sounds reasonable when you're under pressure. It is rarely
        the right answer in practice; before reaching for it,
        check whether the two charts even claim to show the same
        thing.
      self_assessment: |
        Whenever two charts on the same data source disagree,
        first list each chart's dimensions and metrics side by
        side. The disagreement is almost always grain (different
        dimensions) or filter (different `WHERE`), not freshness
        or caching.
    - id: q-medium-blend-field-scope
      type: select_all
      estimated_seconds: 100
      recommended_learner_tasks: [LT-BI-002, LT-LOOKER-004]
      source_facts:
        - FACT-LOOKER-STUDIO-BLEND-MORE-ROWS
        - FACT-LOOKER-STUDIO-BLEND-FIELD-SUBSET
        - FACT-BI-FANOUT-JOIN-RISK
      prompt: |
        Looker Studio blend draft: left source is the deposits
        balance serving view (one row per account-day with
        `business_date, account_id, ledger_balance, currency_code,
        branch_id`); right source is a "branch enrichment" sheet
        someone uploaded (one row per branch with `branch_id,
        branch_name, region, comments_field, signoff_date,
        last_inspection`). Join key is `branch_id`.

        The blend's `SUM(ledger_balance)` reads `RON 87,500` on
        2026-03-31, but the upstream warehouse control total reads
        `RON 79,300`. Which checks belong in the review before
        publishing? (Select all that apply.)
      options:
        - id: join_key_grain
          label: |
            Confirm the join is **1:N (not N:M)** by counting the
            right source's rows per `branch_id`. If the enrichment
            sheet has duplicate rows for a `branch_id` (someone
            edited the row twice and didn't delete the original),
            the blend duplicates balance rows.
        - id: needed_fields_only
          label: |
            Restrict the blend to the fields the chart actually
            renders. Don't include `comments_field, signoff_date,
            last_inspection` if the chart only needs
            `branch_name` and `region` - extra fields widen the
            data-source surface and can drag personal data into
            the blend.
        - id: compare_control_total
          label: |
            Reconcile the blended `SUM(ledger_balance)` against
            the warehouse control total before publishing. A
            difference like `87,500 - 79,300 = 8,200` is
            evidence the join changed the grain; the right
            answer is upstream, not in the blend.
        - id: add_all_fields
          label: |
            Include every field from both sources in the blend so
            the dashboard has options to add later without
            re-doing the blend.
      answer: [join_key_grain, needed_fields_only, compare_control_total]
      explanation: |
        Looker Studio blends are SQL-style joins under the hood,
        and they suffer the same fanout failure mode as any join.
        The three useful checks before publishing:

        - **State the join shape**. Count rows per join key on
          the right source. If `account_owners`-style 1:N becomes
          N:M (the right source has duplicate branch IDs), the
          left side fans out. The `87,500 - 79,300 = 8,200`
          overstatement is roughly one branch's worth of balance
          appearing twice.
        - **Narrow the field set**. Each extra column on the
          blend widens the access surface. `comments_field` on a
          branch enrichment sheet is the kind of column that
          carries free-text notes nobody intended to publish.
          Drop fields the chart doesn't need.
        - **Reconcile against an upstream control total**.
          Compute the same metric in the warehouse and compare.
          If the blend disagrees, the blend is wrong (or the
          warehouse is, but the warehouse has more eyes on it).

        The "add all fields" distractor is the most common
        mistake. It feels like flexibility ("we might want
        signoff_date later") but every added field is another
        place a stale, mis-typed, or sensitive value can leak
        through into a published surface.
      self_assessment: |
        Before publishing any blend, write down the join key, the
        row-count check, the field list, and the upstream control
        total. If any of those four is missing, the blend isn't
        ready.
    - id: q-medium-owner-viewer-credentials
      type: multiple_choice
      estimated_seconds: 90
      recommended_learner_tasks: [LT-LOOKER-004]
      source_facts:
        - FACT-LOOKER-STUDIO-OWNER-CREDENTIALS-RISK
        - FACT-LOOKER-STUDIO-VIEWER-CREDENTIALS
      prompt: |
        The compliance dashboard contains EUR-equivalent
        depositor-bank coverage estimates. The report has three
        named viewer groups (`compliance-leads@`, `risk-team@`,
        `internal-audit@`) and is set to refresh once an hour. A
        teammate proposes "set the data source credentials to
        **Owner credentials**, that way nobody has to be granted
        BigQuery access; the report just works for everyone we
        share it with". What's the underlying access-control
        question the team is actually answering by picking owner
        vs viewer credentials?
      options:
        - id: whose_access
          label: |
            Whether each BigQuery query the report fires runs **as
            the owner's IAM identity** (so any viewer can see
            anything the owner can see, with no BigQuery grant of
            their own) or **as each viewer's IAM identity** (so
            BigQuery enforces row-/column-level controls per
            viewer based on what *they* are allowed to see). The
            decision pins where the access boundary actually
            lives - in the report's share list, or in BigQuery
            grants.
        - id: refresh_interval_only
          label: |
            Whether the data freshness interval is shorter or
            longer than 1 hour. Owner credentials are required
            for shorter freshness; viewer credentials force a
            minimum of 1 hour.
        - id: data_source_type
          label: |
            Whether the data source is **embedded** in this one
            report or **reusable** across reports. Owner credentials
            are only available on embedded data sources; reusable
            ones must use viewer credentials.
      answer: whose_access
      explanation: |
        Looker Studio data sources have a `Credentials` setting
        with two values:

        - **Owner credentials**: every query the report issues to
          BigQuery runs as the data-source owner's IAM identity.
          A viewer who can open the report can see all the data
          the owner can see; no per-viewer BigQuery grants are
          needed. This is convenient for broad sharing of
          aggregate dashboards where the owner has narrowed the
          view to safe fields.
        - **Viewer credentials**: each query runs as the viewer's
          own IAM identity. BigQuery's row-access policies,
          policy-tagged columns, and dataset-level grants are
          enforced per viewer. This is needed when the underlying
          table has per-identity restrictions.

        The risk of **owner credentials** is exactly what makes
        them convenient: the data boundary becomes the report's
        share-list (which is in Looker Studio, not BigQuery).
        Adding `compliance-leads@` as a viewer effectively gives
        them whatever the owner can see; if the owner is a
        privileged BigQuery user, the report quietly amplifies
        that access.

        For sensitive coverage data, the safer choice is usually
        viewer credentials *plus* an authorized view that exposes
        only safe aggregate fields - so the viewer's identity is
        what BigQuery checks, but the view's projection already
        narrows what is reachable.
      self_assessment: |
        Before publishing, write down: who is the credential
        identity, what BigQuery objects can it reach, and what
        share list governs that identity? If the chain ends in
        "the owner can see everything", the report has bypassed
        BigQuery's IAM model.
    - id: q-medium-dry-run-publication-check
      type: multiple_choice
      estimated_seconds: 85
      recommended_learner_tasks: [LT-LOOKER-007]
      source_facts:
        - FACT-BIGQUERY-QUERY-VALIDATOR-BYTES
        - FACT-BIGQUERY-DRY-RUN-BYTES
        - FACT-LOOKER-STUDIO-BIGQUERY-REFRESH-COST
      prompt: |
        A new Looker Studio report fires this query against
        BigQuery to populate a scorecard - it will run on every
        page open, every minute on the open-tab refresh, and on
        each viewer's session:

            SELECT currency_code, SUM(ledger_balance) AS ledger_total
            FROM `proj.dataset.fct_account_daily_balances`
            WHERE branch_id IN ('BR-B-01', 'BR-IS-01')
            GROUP BY currency_code;

        Before publishing, what should the BI author check?
      options:
        - id: byte_estimate
          label: |
            Run a **dry-run** (or open the BigQuery UI query
            validator) on the literal SQL. The dry-run reports
            `Total bytes processed` without running the query.
            On a partitioned 18-month table without a partition
            filter, that estimate is often 100x-1000x what the
            author guessed; the right design choice (add
            `business_date = MAX(...)` predicate, or materialise)
            depends on knowing the number.
        - id: cache_hit_only
          label: |
            Run the query once and confirm `cache_hit = TRUE` on
            the second run. BigQuery's results cache means the
            query is billed only once; subsequent Looker Studio
            refreshes hit the cache for free.
        - id: row_count_proxy
          label: |
            Use the **rendered row count** in Looker Studio as
            the cost proxy. A scorecard returning two rows
            (one per currency) is small; the warehouse scan is
            proportional to the displayed result.
      answer: byte_estimate
      explanation: |
        BigQuery bills on **bytes processed**, not rows displayed.
        A scorecard that renders two rows can scan a terabyte
        upstream if the SQL doesn't prune partitions. The
        dry-run / query validator gives you that number without
        running the query:

            -- BigQuery SQL UI: "$<bytes> will be processed"
            -- under the editor before clicking Run.

            -- API: jobs.insert with dryRun=true returns
            -- statistics.query.totalBytesProcessed.

        Why the other answers fail:

        - **Results cache**. BigQuery's results cache is invalidated
          when the underlying table data changes. For a daily fact
          table, every overnight load invalidates the cache; the
          next morning's first refresh is a full scan, and Looker
          Studio repeats that every hour all day. Cache hit on
          run 2 says nothing about run 24.
        - **Row count proxy**. The displayed row count is
          downstream of the warehouse scan. A `SUM(...) GROUP BY
          currency_code` returns 2 rows whether the scan touches
          1 MB or 1 TB.

        Production tip: combine the dry-run check with the
        partition-pruning check from the easy section. A
        `WHERE business_date = (SELECT MAX(business_date) ...)`
        predicate reduces the scan to one partition; the dry-run
        then shows a small number; the report is cheap to refresh.
      self_assessment: |
        For every BigQuery-backed dashboard, the byte-estimate is
        the only honest cost signal before publish. Cache hits,
        row counts, and "it ran fast for me" are not substitutes.
    - id: q-medium-control-parameter-predicate
      type: multiple_choice
      estimated_seconds: 85
      recommended_learner_tasks: [LT-LOOKER-007]
      source_facts:
        - FACT-BIGQUERY-PARAMETERIZED-QUERY-USER-INPUT
        - FACT-BIGQUERY-PARAMETER-NOT-IDENTIFIER
        - FACT-LOOKER-STUDIO-CONTROL-PARAMETER-INPUT
      prompt: |
        The deposits dashboard has a `Currency` Looker Studio
        control. The data source binds it to a BigQuery
        parameter `@selected_currency`. Three candidate
        binding shapes in the data source's custom SQL:

            -- (A) Value predicate
            SELECT business_date, currency_code, SUM(ledger_balance)
            FROM `proj.dataset.account_daily_balances`
            WHERE currency_code = @selected_currency
            GROUP BY 1, 2;

            -- (B) Table-name binding
            SELECT business_date, currency_code, SUM(ledger_balance)
            FROM @selected_table
            GROUP BY 1, 2;

            -- (C) Raw WHERE clause binding
            SELECT business_date, currency_code, SUM(ledger_balance)
            FROM `proj.dataset.account_daily_balances`
            WHERE @raw_filter_clause
            GROUP BY 1, 2;

        Which one is the safe and supported pattern?
      options:
        - id: named_parameter_predicate
          label: |
            (A). `WHERE currency_code = @selected_currency` binds
            the user-selected value into a comparison. BigQuery
            parses the query with the parameter as a bound value;
            the query plan and access surface are fixed; the
            user's choice cannot change the SQL structure.
        - id: table_name_parameter
          label: |
            (B). `FROM @selected_table` lets the dashboard target
            different tables (deposits, lending, cards) by
            switching the control. BigQuery resolves the
            parameter as an identifier, and the rest of the SQL
            adapts.
        - id: raw_sql_parameter
          label: |
            (C). `WHERE @raw_filter_clause` is the most flexible -
            controls can express ranges, IN lists, and AND/OR
            logic by passing a SQL fragment. The data source
            evaluates the fragment as part of the query.
      answer: named_parameter_predicate
      explanation: |
        Same boundary as the easy question, harder context:
        Looker Studio controls + BigQuery parameters work for
        **values** only.

        Why (B) and (C) fail:

        - **Table-name binding**. BigQuery query parameters
          cannot stand in for identifiers (table, dataset,
          column, alias). The query won't parse - and even if
          it did via string interpolation, the user would be
          choosing which table to scan, which bypasses any IAM
          grant scoped to specific tables.
        - **Raw WHERE clause binding**. BigQuery parameters are
          typed values, not SQL fragments. A column called
          `@raw_filter_clause` that gets concatenated into the
          query text is SQL injection (or near enough) -
          `1=1 OR 1=1` widens the scan; a malformed fragment
          breaks the report; nothing about the user input is
          validated against the warehouse schema.

        The right shape (A) keeps the query *shape* fixed in
        the data source SQL and lets only the value slide in.
        The BigQuery dry-run validates the SQL once with a
        sample value; from then on the cost / scan / permissions
        are predictable.
      self_assessment: |
        Parameters carry values. Anything that *changes the
        shape* of the query (which table, which columns, which
        operator) belongs in a separate governed query, not in
        a parameter binding.
    - id: q-medium-approx-count-distinct-use
      type: multiple_choice
      estimated_seconds: 85
      recommended_learner_tasks: [LT-BI-002]
      source_facts:
        - FACT-BIGQUERY-APPROX-COUNT-DISTINCT
        - FACT-BIGQUERY-COUNT-DISTINCT-GRAIN
      prompt: |
        A 6 TB customer-events table needs two related metrics:
        (a) a "monthly active customers" tile on a marketing
        dashboard that refreshes every 15 minutes during the
        day, accuracy within ~1% is fine; (b) a
        regulatory-signoff number "depositors served per
        quarter" that goes into the quarterly compliance report.

        BigQuery offers `COUNT(DISTINCT customer_id)` (exact, can
        be expensive for large groups) and
        `APPROX_COUNT_DISTINCT(customer_id)` (HyperLogLog++ -
        cheaper, ~1-2% error). Which pairing fits?
      options:
        - id: approximate_then_exact
          label: |
            **`APPROX_COUNT_DISTINCT` for the marketing tile**
            (cheap, near-exact, sufficient for trend reading);
            **`COUNT(DISTINCT customer_id)` for the regulatory
            signoff** (exact, defensible to a reviewer who asks
            "what is this number?"). The two metrics carry
            different operational commitments and should use
            different aggregates.
        - id: approximate_signoff
          label: |
            **`APPROX_COUNT_DISTINCT` for both**. The HyperLogLog
            ~1% error is well within reporting tolerance for
            both audiences and saves significant compute; the
            regulator gets a number with a clearly stated
            precision.
        - id: row_count_signoff
          label: |
            **Raw `COUNT(*)` after a customer join for both**.
            Joining `customer_id` first and then counting rows
            is simpler than reasoning about distinct counts;
            the two reports share the same source.
      answer: approximate_then_exact
      explanation: |
        `APPROX_COUNT_DISTINCT` uses HyperLogLog++; expected
        error is ~1-2% for default precision. That is great for:

        - exploratory queries,
        - frequently-refreshed dashboards where trend matters
          more than exact value,
        - cost-conscious slicing across many dimensions at
          once.

        It is wrong for:

        - reconciliation signoff ("the regulator's number must
          tie back exactly"),
        - SLA-bounded counts (no commitment without exact),
        - any number a user might later ask "is this exactly
          right?".

        `COUNT(DISTINCT)` is exact in BigQuery for small groups
        and uses sub-shuffle behaviour for large ones (still
        exact, just more expensive). For ~10 million customers
        it's slower than APPROX but not pathologically so.

        Why **raw `COUNT(*)` after a join** is wrong: if the
        join is many-to-many (one customer holds multiple
        accounts; one account has multiple owners), `COUNT(*)`
        counts row-multiplications, not customers. This is the
        same fanout shape from earlier - the right answer is
        always `COUNT(DISTINCT ...)` or pre-aggregation, never
        post-join `COUNT(*)`.
      self_assessment: |
        Match the aggregate to the audience's tolerance for
        approximation. A dashboard tile and a regulatory number
        are two different artefacts; they don't have to share a
        SQL function.
    - id: q-medium-last-value-frame
      type: multiple_choice
      estimated_seconds: 90
      recommended_learner_tasks: [LT-SQL-003]
      source_facts:
        - FACT-BIGQUERY-LAST-VALUE-FRAME
        - FACT-BI-SEMI-ADDITIVE-BALANCE-SNAPSHOT
      prompt: |
        A colleague writes this to get each account's latest
        balance alongside every snapshot:

            SELECT
              account_id,
              business_date,
              ledger_balance,
              LAST_VALUE(ledger_balance) OVER (
                PARTITION BY account_id
                ORDER BY business_date
              ) AS latest_balance
            FROM account_daily_balances;

        She is surprised that `latest_balance` equals
        `ledger_balance` on every row - the "latest" column
        always matches the current row's balance, not the
        actual most-recent value. What does she need to specify
        for the window to mean "latest across all snapshots for
        this account"?
      options:
        - id: order_and_frame
          label: |
            Add an **explicit window frame** that spans every row
            in the partition:

                LAST_VALUE(ledger_balance) OVER (
                  PARTITION BY account_id
                  ORDER BY business_date
                  ROWS BETWEEN UNBOUNDED PRECEDING
                           AND UNBOUNDED FOLLOWING
                ) AS latest_balance

            Without an explicit frame, `ORDER BY` defaults to
            `RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`,
            so `LAST_VALUE` returns the current row's value.
        - id: partition_only
          label: |
            Drop the `ORDER BY` and keep only `PARTITION BY
            account_id`. With no ordering, the window is treated
            as the whole partition and `LAST_VALUE` returns the
            most recent value across it.
        - id: outer_order_by
          label: |
            Add an outer `ORDER BY business_date DESC` on the
            whole `SELECT`. The window inherits the outer
            ordering, so `LAST_VALUE` re-evaluates per
            row using the outer sort.
      answer: order_and_frame
      explanation: |
        SQL window functions have three parts: PARTITION BY
        (which group), ORDER BY (which order within the group),
        and the **frame** (which rows inside the partition the
        function actually sees).

        The frame defaults bite here:

        - If you specify `ORDER BY` but no frame, the default is
          `RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`.
          That makes `LAST_VALUE(...)` look back to the current
          row only - so it returns the *current row's* value.
        - If you specify neither ORDER BY nor frame, the default
          is `ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED
          FOLLOWING`. `LAST_VALUE` then returns the last row in
          the partition... but "last" is undefined without an
          order, so the engine picks one of the rows arbitrarily
          (depends on shuffle order). That's why "drop the
          ORDER BY" is also wrong.
        - The outer `SELECT`'s `ORDER BY` does not affect window
          evaluation; windows are computed before the outer
          sort.

        The fix is the explicit `ROWS BETWEEN UNBOUNDED
        PRECEDING AND UNBOUNDED FOLLOWING` frame. The window
        now sees all rows in the partition and `LAST_VALUE`
        returns the row with the highest `business_date`.

        A simpler alternative for this specific case:
        `FIRST_VALUE` with `ORDER BY business_date DESC` and the
        default frame, which evaluates to "first row in the
        descending-ordered partition", i.e. the latest.
      self_assessment: |
        Whenever you write `LAST_VALUE` or `FIRST_VALUE`, write
        the frame explicitly. The default frame is the source
        of most "this window function returned the wrong row"
        bugs.
    - id: q-medium-partition-by-window
      type: multiple_choice
      estimated_seconds: 85
      recommended_learner_tasks: [LT-SQL-003]
      source_facts:
        - FACT-BIGQUERY-PARTITION-BY-WINDOW
        - FACT-BIGQUERY-WINDOW-PRESERVES-ROWS
      prompt: |
        A balance-trend diagnostic should show a running total
        of net change for each account, restarting at zero on
        the first `business_date` per account. Three candidate
        window clauses:

            -- (A)
            SUM(net_change) OVER (
              PARTITION BY account_id
              ORDER BY business_date
              ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
            ) AS running_balance

            -- (B)
            SUM(net_change) OVER (
              ORDER BY business_date
              ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
            ) AS running_balance

            -- (C)
            SUM(net_change) AS running_balance  -- chart-side
            -- (computed in Looker Studio with "running total"
            -- enabled on the chart, grouped by account_id)

        Which one restarts at zero on each account's first
        `business_date`?
      options:
        - id: partition_by_account
          label: |
            (A). `PARTITION BY account_id` carves the window
            into independent slices per account. The running
            sum begins at zero (well, at the first row's
            `net_change`) on each account's earliest
            `business_date` and accumulates only that account's
            subsequent rows.
        - id: order_only
          label: |
            (B). `ORDER BY business_date` alone is enough -
            BigQuery's default window scope is per row, and
            ordering by date automatically restarts on a new
            account because the dates change.
        - id: group_by_chart
          label: |
            (C). Compute a plain `SUM(net_change)` in SQL and
            let Looker Studio's "running total" chart option
            partition by account on the chart side. That keeps
            the SQL simple and offloads the running-total math
            to the chart.
      answer: partition_by_account
      explanation: |
        Window-function scope is controlled by `PARTITION BY`,
        not by the order of input rows. Without
        `PARTITION BY account_id`, the running sum accumulates
        across all accounts in `business_date` order - so
        account A1003's first day's running total is
        A1001 + A1003, not just A1003. The chart axis labelled
        "running balance" would be measuring a different
        quantity entirely.

        The "chart-side running total" distractor (option C)
        looks attractive because Looker Studio does offer a
        running-total option on time-series charts, but:

        - It works on the **chart's displayed rows**, not on
          the underlying warehouse rows. If the chart shows
          aggregates by date, it can compute a running total
          across dates; it cannot recompute account-level
          windows.
        - Pushing math to the chart hides the logic in the
          report config rather than the SQL, where it could
          be reviewed.

        Always do account-grain windows in SQL with
        `PARTITION BY account_id`. The chart can format and
        label the result; it shouldn't be doing the
        mathematics.
      self_assessment: |
        Any window function that should "restart per entity"
        needs `PARTITION BY <entity>`. Without it, the window
        accumulates across entities in whatever order the
        engine happens to use.
    - id: q-medium-select-list-vs-star
      type: select_all
      estimated_seconds: 90
      recommended_learner_tasks: [LT-LOOKER-004]
      source_facts:
        - FACT-BIGQUERY-SELECT-LIST-NARROWING
        - FACT-GDPR-DATA-MINIMISATION
        - FACT-BIGQUERY-VIEW-SCOPE
      prompt: |
        A teammate writes the deposits branch-level dashboard
        serving view like this:

            CREATE OR REPLACE VIEW serving_deposit_branch_daily AS
            SELECT *
            FROM `proj.dataset.account_daily_balances`
            WHERE business_date = (
              SELECT MAX(business_date)
              FROM `proj.dataset.account_daily_balances`
            );

        The underlying table has 32 columns including
        `account_id`, `customer_id`, `synthetic_iban`,
        `account_status`, `regulatory_context_tag`, and several
        operational timestamps. The dashboard renders exactly
        five fields: `business_date`, `branch_id`, `currency_code`,
        `SUM(ledger_balance)`, `COUNT(DISTINCT account_id)`.
        Which design changes make this view safer and cheaper?
        (Select all that apply.)
      options:
        - id: required_columns
          label: |
            Replace `SELECT *` with an explicit column list that
            names exactly the five fields the dashboard reads.
            Smaller scan, smaller surface, and the next reader
            can tell what the view is for from the SQL.
        - id: aggregate_before_publish
          label: |
            Aggregate to branch / currency grain inside the view
            itself (`SUM(ledger_balance), COUNT(DISTINCT
            account_id) GROUP BY business_date, branch_id,
            currency_code`). The view's output rows are then a
            handful (one per branch-currency-day), and the
            dashboard reads them directly with no per-account
            rows ever leaving the warehouse.
        - id: documented_scope
          label: |
            Add a comment block at the top of the view DDL
            naming the audience ("branch finance dashboard"),
            the grain (one row per business_date + branch_id +
            currency_code), and the excluded fields and why
            they are excluded. The next BI author can read the
            scope without guessing.
        - id: all_raw_columns
          label: |
            Keep `SELECT *` and add a note to the dashboard wiki
            that downstream charts should ignore the identifier
            columns. Future charts can opt into more columns by
            referencing them without redeploying the view.
      answer: [required_columns, aggregate_before_publish, documented_scope]
      explanation: |
        `SELECT *` in a published view is three problems in one:

        - **Cost**: BigQuery bills on bytes processed. Reading
          32 columns when 5 are needed costs ~6x what it should.
          For a partitioned daily table refreshed every 15
          minutes, that compounds.
        - **Surface**: every additional column is a place a
          sensitive value (`synthetic_iban`,
          `regulatory_context_tag`) can leak into a downstream
          report or a CSV export. The dashboard wiki note in
          the wrong distractor is *not* a control - it's a
          hope.
        - **Reviewability**: a `SELECT *` view obscures intent.
          A future BI author cannot tell from the DDL what the
          view is supposed to expose; they have to read the
          dashboard and the underlying table to triangulate.

        Aggregating inside the view (`SUM`, `COUNT(DISTINCT)`,
        `GROUP BY`) takes this one step further: no per-account
        rows ever leave the warehouse layer. The dashboard reads
        already-aggregated rows; minimisation is enforced by
        the view's shape, not by the consumer's discipline.

        The documentation block looks like a soft touch but is
        the only piece that makes the design durable across
        engineer turnover. Without it, the view inevitably
        accumulates columns over time.
      self_assessment: |
        Every `SELECT *` in a published view is a smell. The
        right shape is: explicit column list, aggregated to the
        consumer's grain when possible, and a one-line scope
        comment at the top.
    - id: q-medium-view-region-check
      type: multiple_choice
      estimated_seconds: 85
      recommended_learner_tasks: [LT-LOOKER-004]
      source_facts:
        - FACT-BIGQUERY-VIEW-SAME-REGION
        - FACT-BIGQUERY-VIEW-LIMITATIONS
      prompt: |
        Your team deploys a new logical view to a BigQuery
        dataset in the `EU` multi-region:

            CREATE OR REPLACE VIEW `eu-proj.deposits_eu.serving_branch_daily`
            AS
            SELECT business_date, branch_id, currency_code,
                   SUM(ledger_balance) AS ledger_total
            FROM `us-proj.deposits_us.account_daily_balances`
            WHERE business_date = DATE '2026-03-31'
            GROUP BY 1, 2, 3;

        The CREATE statement parses fine, but queries against the
        new view return `Cannot read in location: EU; dataset
        ... is in location US`. Which deployment issue is the
        first thing to check?
      options:
        - id: same_location
          label: |
            Whether the **view and every referenced table are
            in the same BigQuery location**. The error message
            is BigQuery's specific signal for a cross-region
            view: `eu-proj.deposits_eu` is in `EU`, but
            `us-proj.deposits_us.account_daily_balances` is in
            `US`. Logical views cannot read across BigQuery
            locations. Fix: move the view to a dataset in `US`,
            or replicate the source data into an `EU` dataset.
        - id: dataset_naming_only
          label: |
            Whether the dataset **names** start with the same
            prefix so BigQuery can resolve the cross-dataset
            reference. The error means the resolver couldn't
            find `deposits_eu` and `deposits_us` as siblings.
            Rename them to share a prefix and the view will
            resolve.
        - id: same_project
          label: |
            Whether the view and the referenced tables are in
            the **same Google Cloud project**. The error
            indicates a project boundary, not a location
            boundary; move both into the same project and the
            view will work.
      answer: same_location
      explanation: |
        BigQuery datasets have a **location** (region or
        multi-region) that determines where the underlying data
        lives. A logical view in dataset X can only reference
        tables in datasets that are in the **same location** as
        X. The compile-time CREATE statement parses fine - it's
        just text - but the first read attempt fails because
        the optimiser needs to read data from a location the
        view isn't allowed to span.

        Why the other distractors mislead:

        - **Dataset naming** has nothing to do with the
          cross-region restriction. BigQuery resolves
          `project.dataset.table` references by ID, not by
          name prefix.
        - **Same project** is a more subtle wrong answer
          because projects often coincide with locations in
          practice. But the rule is about location, not
          project: a view in `proj.eu_dataset` can read
          `proj.us_dataset` only if both are in the same
          location, even though they share the project.

        Fix options:
        - Move the view to a dataset in `US` (data stays
          where it is; consumers query through the `US`
          location).
        - Replicate `account_daily_balances` to an `EU`
          dataset (use BigQuery Data Transfer Service or a
          scheduled copy); then both view and source are in
          `EU`. This costs egress / compute but supports
          cross-region BI when the source can't be moved.
      self_assessment: |
        Any time a BigQuery view fails on first query with a
        "Cannot read in location" message, the issue is
        cross-location reference. Project boundaries don't
        cause it; naming doesn't cause it; location is the
        single variable.
    - id: q-medium-view-sql-change
      type: multiple_choice
      estimated_seconds: 90
      recommended_learner_tasks: [LT-LOOKER-004]
      source_facts:
        - FACT-BIGQUERY-VIEW-SQL-VERSIONING
        - FACT-BIGQUERY-LOGICAL-VIEW
      prompt: |
        The deposits dashboard reads from `proj.dataset.serving_branch_daily`.
        On 2026-04-15, the warehouse team
        `CREATE OR REPLACE VIEW`-ed it to add a new `account_status`
        filter:

            -- before
            CREATE OR REPLACE VIEW serving_branch_daily AS
            SELECT business_date, branch_id, currency_code,
                   SUM(ledger_balance) AS ledger_total
            FROM account_daily_balances
            GROUP BY 1, 2, 3;

            -- after
            CREATE OR REPLACE VIEW serving_branch_daily AS
            SELECT business_date, branch_id, currency_code,
                   SUM(ledger_balance) AS ledger_total
            FROM account_daily_balances
            WHERE account_status = 'ACTIVE'
            GROUP BY 1, 2, 3;

        The dashboard's view name and field schema are
        unchanged. The dashboard hasn't been touched. What
        should the BI owner assume on 2026-04-16?
      options:
        - id: downstream_behavior_changed
          label: |
            **Downstream numbers may have changed** even though
            the view name and schema are unchanged. A logical
            view is its SQL; changing the SQL changes the
            virtual table the dashboard reads. Reconcile every
            scorecard against its prior value and check whether
            "ACTIVE" filtered out accounts that the dashboard
            previously counted. Then either accept the change
            (publish a release note) or revert.
        - id: no_change_possible
          label: |
            Nothing can change because the dashboard's binding
            references the view by name. Looker Studio caches
            the column schema, not the SQL, so the renderer
            keeps producing the previous totals.
        - id: charts_ignore_sql
          label: |
            Looker Studio reads the view's data once at chart
            creation and stores its own copy. Updating the
            underlying SQL is irrelevant; the chart's data is
            internal to Looker Studio.
      answer: downstream_behavior_changed
      explanation: |
        A BigQuery **logical view is its SQL**. The view object
        is essentially a stored query plus metadata. When the
        DDL changes, every subsequent query against the view
        runs the new SQL against the current source data. The
        view name, signature, and downstream tooling stay the
        same; the *answer* the view returns can change.

        In the example, adding `WHERE account_status = 'ACTIVE'`
        is the kind of "obvious safety" change that quietly
        moves the dashboard total. If `account_status = 'ACTIVE'`
        excludes 10% of accounts that previously contributed
        non-zero balances, every scorecard drops by ~10% on
        the 16th with no warning.

        The two wrong distractors describe Looker Studio
        behaviour as if it caches view definitions, which it
        does not. Looker Studio:

        - reads the data source schema (field names + types)
          when the data source is created or refreshed,
        - queries the warehouse on chart refresh (subject to
          data-freshness threshold),
        - displays whatever the warehouse returns.

        Operational habit: treat any `CREATE OR REPLACE VIEW`
        on a view that powers reports as a downstream-affecting
        change. Send the diff and a reconciliation table to
        the dashboard owners; flag the change in a release log;
        keep the prior SQL recoverable.
      self_assessment: |
        A view whose SQL changes is not the same view anymore -
        regardless of name, schema, or downstream pipeline.
        Always reconcile the new total against the old before
        publishing.
    - id: q-medium-freshness-memory
      type: multiple_choice
      estimated_seconds: 85
      recommended_learner_tasks: [LT-DQ-005]
      source_facts:
        - FACT-LOOKER-STUDIO-FRESHNESS-MEMORY
        - FACT-LOOKER-STUDIO-DATA-FRESHNESS-TRADEOFF
      prompt: |
        On Monday at 14:00, the data engineer runs the daily
        ingest job and updates `account_daily_balances` with
        the 2026-03-31 close. A branch manager looks at the
        deposits dashboard at 14:05 and the scorecard still
        reads Friday's total. The dashboard's data-source
        freshness setting is "12 hours". The dashboard was last
        opened by the manager on Friday at 16:30. Which
        explanation is most likely correct - and what does the
        BI author do about it?
      options:
        - id: freshness_cache
          label: |
            Looker Studio is **serving from memory** under the
            12-hour freshness setting. The data source's last
            successful query was Friday at 16:30; the freshness
            timer says "data is still fresh for 12 hours from
            then", so Monday at 14:05 still hits the cached
            Friday result. Fix: drop the freshness setting (to
            e.g. 1 hour) for time-sensitive scorecards, or click
            "Refresh data" in the report header to force a
            fetch, or restructure so the data-source caching
            window aligns with the warehouse refresh cadence.
        - id: source_deleted
          label: |
            The source table must have been deleted between
            Friday and Monday. The dashboard is showing the
            last in-memory result before the table was dropped;
            check `INFORMATION_SCHEMA.TABLES` to confirm the
            table is present.
        - id: metric_invalid
          label: |
            Every metric on the page is automatically invalid
            after a weekend. Looker Studio invalidates metrics
            on Mondays and the displayed totals are residual
            artifacts; the metric definitions need to be
            re-applied.
      answer: freshness_cache
      explanation: |
        Looker Studio's **data freshness** setting is a
        cache-staleness window, not an auto-refresh schedule.
        For BigQuery sources, valid values include 15 minutes,
        1 hour, 4 hours, 12 hours, and "Manual". When a viewer
        opens the report, Looker Studio asks "is the last
        cached result within the freshness window?". If yes,
        it serves from memory; if no, it re-queries the
        warehouse.

        In the scenario, Friday 16:30 + 12h freshness window =
        cached result is valid until ... well past Monday 14:05.
        So the manager sees Friday's number until the
        12-hour timer expires (or until someone hits "Refresh
        data" manually). This is the textbook trade-off the
        freshness setting was designed for: cheaper warehouse
        queries vs more recent data.

        Why the distractors fail:

        - **Source deleted** is the kind of explanation that
          sounds reasonable when you're under pressure. A
          dropped table doesn't return stale data - it returns
          an error.
        - **Metrics invalidated on Mondays** is fiction. Looker
          Studio has no day-of-week behaviour for metric
          validity.

        Fix shapes:

        - **Tighten freshness** on time-sensitive scorecards
          (15 min or 1 hour). Costs more BigQuery queries.
        - **Manual refresh on open** via the report header's
          "Refresh data" button; viewers must remember to
          click.
        - **Align freshness window to ingest cadence**: if the
          warehouse refreshes at 14:00 daily, set freshness to
          something less than the inter-refresh interval so
          stale rolls over correctly.
      self_assessment: |
        Stale-looking dashboards on the morning after an
        update are usually a freshness-window mismatch, not a
        data problem. Trace: source updated when? data source
        last queried when? freshness window length? Three
        timestamps tell the whole story.
    - id: q-medium-leftmost-blend-source
      type: multiple_choice
      estimated_seconds: 90
      recommended_learner_tasks: [LT-LOOKER-004]
      source_facts:
        - FACT-LOOKER-STUDIO-BLEND-LEFTMOST
        - FACT-LOOKER-STUDIO-BLEND-JOIN-CONFIG
      prompt: |
        You build a Looker Studio blend with two sources:

        - **Left source**: `serving_deposit_branch_daily` - 8
          rows (6 branches with EUR/RON splits including
          UNMAPPED).
        - **Right source**: `branch_enrichment` - 5 rows
          (`branch_id, region`); does not include the
          UNMAPPED branch_id.

        Join: `branch_id`, default left-outer.

        The blend's bar chart shows 8 rows (matching the left
        source) with `region` populated for 7 and NULL for the
        UNMAPPED branch. Marketing then asks for a variant that
        only includes branches the marketing team enriched. You
        swap the **order** of the two sources (`branch_enrichment`
        on the left, `serving_deposit_branch_daily` on the
        right). Why does source order matter?
      options:
        - id: retained_records
          label: |
            In the default left-outer blend, the **leftmost
            source determines retained records**. With
            `branch_enrichment` on the left (5 branches),
            the blend retains 5 rows; the UNMAPPED branch's
            deposit row drops out because no enrichment row
            exists for it. Swap-back to keep all 8 deposit
            rows for the operations view, or keep the new
            order for the marketing view.
        - id: inherit_aggregation
          label: |
            The leftmost source determines the **default
            aggregation** for every metric on every right
            source. Putting `branch_enrichment` on the left
            switches the deposit metric's aggregation from
            SUM to COUNT.
        - id: refresh_anchor
          label: |
            The leftmost source sets the **data freshness**
            for every right-side source. Swapping anchors the
            blend on `branch_enrichment`'s freshness setting
            instead.
      answer: retained_records
      explanation: |
        Looker Studio blends default to a left-outer join
        shape: every record from the leftmost source is kept;
        right-side fields fill in where the join key matches,
        NULL where it doesn't. The order of source panels in
        the blend editor literally controls which side is the
        outer side.

        In the scenario:

        - **Original** (deposits left, enrichment right): 8
          rows out. UNMAPPED's deposit row has NULL `region`.
        - **Swapped** (enrichment left, deposits right): 5
          rows out. UNMAPPED's deposit row is dropped because
          there's no enrichment row to anchor it.

        Both are correct outputs of correct queries; they
        answer different questions. The marketing variant is
        "branches we know about"; the operations variant is
        "all our deposits, even at branches we haven't
        enriched".

        The two distractors confuse blend mechanics with other
        features:

        - **Default aggregation** is set per-metric on the
          data source (`SUM` for `ledger_balance`, etc.) and
          doesn't change based on blend order.
        - **Data freshness** is per data source; blends
          inherit each side's setting independently and use
          whichever was last cached, not "anchored" to one
          side.

        Production rule: every blend release should document
        which question it answers and check the row count on
        both source orders before publishing.
      self_assessment: |
        Blend source order is the join-shape choice. Whoever
        is on the left is the outer side; whoever is on the
        right contributes lookups. Spell that out in the
        blend's release note.
    - id: q-medium-eligible-excluded-deposits
      type: select_all
      estimated_seconds: 100
      recommended_learner_tasks: [LT-BI-002]
      source_facts:
        - FACT-FGDB-ELIGIBLE-DEPOSITS
        - FACT-FGDB-EXCLUDED-DEPOSITS
        - FACT-FGDB-DEPOSIT-DEFINITION
      prompt: |
        The compliance team wants a "covered deposits estimate"
        on the deposits dashboard. You're handed a working
        dataset with these columns per row:

            depositor_id, account_id, account_type,
            balance_amount, currency_code, exclusion_reason,
            deposit_classification

        Sample exclusion_reason values seen in the data:

            NULL                  (eligible deposit, no exclusion)
            'CREDIT_INSTITUTION'  (interbank deposit; not eligible)
            'LOCAL_AUTHORITY'     (public-sector exclusion)
            'COLLATERAL_PLEDGED'  (deposit pledged as collateral)

        Sample deposit_classification values:

            'DEMAND_DEPOSIT', 'TERM_DEPOSIT', 'DUE_INTEREST',
            'SUSPENSE_ACCOUNT', 'LOAN_PRINCIPAL'

        Before applying the EUR 100,000 ceiling, which checks
        belong in the covered-amount calculation? (Select all
        that apply.)
      options:
        - id: eligible_deposit
          label: |
            **Keep only eligible deposits**: rows whose
            `exclusion_reason IS NULL`. The other reasons
            (`CREDIT_INSTITUTION`, `LOCAL_AUTHORITY`,
            `COLLATERAL_PLEDGED`) name the standard regulatory
            categories of deposits **excluded** from FGDB
            coverage.
        - id: exclusion_reason
          label: |
            **Report excluded rows separately** (count and
            balance per reason) so reviewers can see why the
            covered total is smaller than the raw deposit
            total. A silent drop is a red flag for an auditor.
        - id: deposit_definition
          label: |
            **Confirm the balance is a deposit**, not a related
            but distinct concept. Rows with `deposit_classification
            = 'LOAN_PRINCIPAL'` or `'SUSPENSE_ACCOUNT'` are not
            deposits in the regulatory sense and should be
            filtered out before applying the ceiling. Due
            interest is generally included; suspense accounts
            and loan principals are not.
        - id: branch_grain_substitution
          label: |
            **Aggregate to branch grain first** and use the
            branch totals as the coverage number. Branch
            totals are a reasonable proxy for depositor-bank
            coverage when account-level data is unavailable.
      answer: [eligible_deposit, exclusion_reason, deposit_definition]
      explanation: |
        The deposit-guarantee covered amount has three filter
        layers before the EUR 100,000 cap is applied:

        - **Is this a deposit?** Many bank balances aren't.
          Loan principals, suspense accounts, and certain
          non-customer ledger entries fail the definition.
          A "covered amount" metric that sums every
          `balance_amount` overstates by including
          non-deposits.
        - **Is the depositor eligible?** FGDB / DGSD excludes
          deposits made by other credit institutions,
          certain public authorities, and a handful of other
          categories. Rows with a non-null `exclusion_reason`
          carry the regulatory category and must be filtered
          out (or shown as a separate "excluded" total) before
          the cap is applied.
        - **Is the balance one that counts?** Pledged
          collateral, frozen amounts, and disputed items have
          specific treatment under the directive.

        The fourth distractor (`branch_grain_substitution`)
        looks helpful and is wrong in a load-bearing way:
        FGDB coverage is **per depositor per credit
        institution**. Branch grain (within one institution,
        across many depositors) is a *different* grain from
        depositor-bank grain. A branch's total balance is not
        a coverage estimate; the same depositor can hold
        accounts at multiple branches of the same bank, and
        coverage applies to the depositor's combined balance
        across all of them.

        The right output shape for the dashboard:

            -- Step 1: keep only deposits
            -- Step 2: keep only eligible rows
            -- Step 3: group to depositor-bank grain
            -- Step 4: cap each depositor's total at EUR 100,000
            -- Step 5: aggregate across depositors for the bank-level metric

        Report excluded balances separately so a reviewer can
        reconcile.
      self_assessment: |
        Any covered-deposit calculation needs three filters
        (deposit definition, eligibility, exclusion-reason)
        and a final cap at depositor-bank grain. Branch-level
        rollups answer a different question and are not a
        substitute.
    - id: q-medium-purpose-and-minimisation
      type: select_all
      estimated_seconds: 90
      recommended_learner_tasks: [LT-LOOKER-004]
      source_facts:
        - FACT-GDPR-PURPOSE-LIMITATION
        - FACT-GDPR-ACCOUNTABILITY
        - FACT-BIGQUERY-VIEW-SCOPE
      prompt: |
        A new Looker Studio data source `serving_branch_daily`
        is about to be shared with the branch-management
        audience. The chart needs five fields; the data source
        currently exposes twelve. Code review asks for
        publishing evidence. Which artefacts should exist
        before the share goes out? (Select all that apply.)
      options:
        - id: stated_purpose
          label: |
            **A named reporting purpose** in plain language
            ("monthly branch liquidity monitoring for retail
            branch managers"). The purpose tells future
            reviewers, auditors, and the next BI author what
            the data source was approved for, and is the
            basis for accepting / rejecting change requests
            later.
        - id: scoped_fields
          label: |
            **A field list limited to that purpose**, with a
            short explanation per field. Each row of the list
            answers "what does the dashboard use this for?".
            Fields the dashboard doesn't read get removed
            from the data source (not just hidden on charts).
        - id: accountable_owner
          label: |
            **A named owner / reviewer**. Not a team alias -
            a specific role identifier (e.g. "Retail BI
            Lead") that is unambiguously responsible for
            keeping the data source aligned with the stated
            purpose and for responding to change requests.
        - id: speculative_fields
          label: |
            **A buffer of unrelated raw fields** kept "in case
            we need them later" (customer_id, transaction
            descriptions, marketing campaign IDs). Including
            them keeps the data source flexible for future
            dashboards on the same source.
      answer: [stated_purpose, scoped_fields, accountable_owner]
      explanation: |
        GDPR's accountability and purpose-limitation
        principles (Articles 5(1)(b), 5(2)) come down to three
        things any reviewable BI surface needs: a stated
        purpose, fields limited to that purpose, and a named
        owner. None of them are abstract:

        - **Purpose**: a future reviewer asking "why does
          this dashboard exist?" should get a one-sentence
          answer from the data source's documentation, not
          from inferring it.
        - **Scoped fields**: each field is justified against
          the named purpose. The reviewer should be able to
          remove a field by pointing at the purpose and
          saying "this doesn't serve it".
        - **Accountable owner**: not a team mailing list, not
          "the BI team", but a specific identifier. When the
          field list creeps over time, this is who decides.

        The "speculative buffer" distractor is the classic
        BI sin in slow motion. A `customer_id` left in "just
        in case" trains the audience to expect access to it,
        accumulates downstream copies, and quietly defeats
        every minimisation argument upstream. The right
        answer to "we might want it later" is "we'll add a
        scoped purpose and a separate view when we want it".

        The same evidence is what makes a BI surface durable
        as engineers come and go. A view with no documented
        purpose, no scoped fields, and no owner is essentially
        unowned property; the next BI author has to decide
        what it's for from the charts that read it, and they
        often guess wrong.
      self_assessment: |
        For every shared data source: write the purpose in
        one sentence, list the fields with their per-field
        justification, name the owner role. If any one of
        the three is missing, the data source isn't ready
        to publish.
    - id: q-medium-weighted-average-ratio
      type: multiple_choice
      estimated_seconds: 100
      recommended_learner_tasks: [LT-DQ-006]
      source_facts:
        - FACT-BI-RATIO-SUM-COMPONENTS-FIRST
        - FACT-LOOKER-STUDIO-DEFAULT-AGGREGATION
      prompt: |
        The exec dashboard reports "Average balance per active
        account" across branches. The daily branch-level
        serving view has these rows for one currency:

            branch         | total_balance | active_accounts
            Bucuresti      | 43000         | 1
            Iasi           | 19000         | 1
            Timisoara      | 12300         | 1
            UNMAPPED       |  5000         | 1
            Brasov (EUR)   |  7100         | 1
            Cluj (EUR)     |  9300         | 1
            (totals)       |  95700        | 6

        Two formulas are proposed:

        - **A**: `SUM(total_balance) / SUM(active_accounts)`
          = 95700 / 6 = **15,950.00**
        - **B**: `AVG(total_balance_per_account)` where
          `total_balance_per_account = total_balance /
          active_accounts` is computed per branch first, then
          averaged across branches = (43000 + 19000 + 12300 +
          5000 + 7100 + 9300) / 6 = **15,950.00** (in this
          row set, since each branch has exactly 1 account)

        Yes, they agree here. Now a chart filter drops the
        smallest two branches (UNMAPPED and Brasov). Which
        formula gives the cert-correct weighted result under
        the filter, and why?
      options:
        - id: formula_a_weighted
          label: |
            **A**. With UNMAPPED and Brasov removed,
            `SUM(total_balance) / SUM(active_accounts)` =
            (95700 - 5000 - 7100) / (6 - 2) = 83,600 / 4 =
            **20,900**. Each retained branch contributes in
            proportion to its account count; this is the
            correct weighted-average under any filter.
        - id: formula_b_average
          label: |
            **B**. `AVG(total_balance_per_account)` after the
            filter = (43000 + 19000 + 12300 + 9300) / 4 =
            **20,900**. Averaging the per-branch averages is
            stable; it's the same number as A in this case
            and is generally the cleaner formula.
        - id: either_match
          label: |
            **Either**. Since the underlying view's grain is
            fixed (one row per branch per currency), both
            formulas produce the same number under any chart
            filter. The choice is stylistic.
        - id: a_only_if_unfiltered
          label: |
            **A only on the full unfiltered total**; under a
            filter, **B** is needed because chart-side
            re-aggregation invalidates the SUM-based
            formula.
      answer: formula_a_weighted
      explanation: |
        Both formulas give the same number when each branch
        has the same number of accounts (1 each in this
        sample). The trap appears when account counts differ
        across branches.

        Add a hypothetical row: a wholesale branch
        `Wholesale-1` with `total_balance = 100,000` and
        `active_accounts = 50` (small wholesale accounts).

        - **A** (weighted): SUM all balances / SUM all
          accounts. Per-account balance is correctly weighted
          by how many accounts each branch represents.
        - **B** (average of averages): The wholesale branch's
          per-account average is 100,000 / 50 = 2,000, which
          enters the across-branch average as a single 2,000
          alongside Bucuresti's 43,000. The wholesale branch's
          50 accounts contribute the same weight to the
          result as Bucuresti's 1 account. The reported
          number is wrong.

        Under a chart filter that drops the smallest branches:

        - **A** recomputes correctly: numerator and
          denominator both shrink by the dropped branches'
          contributions; the ratio re-aggregates at the
          filtered grain.
        - **B** loses the weighting forever - even if you
          recompute, the per-row per-branch average is
          already collapsed; there's no way to recover the
          weights.

        The cert-correct pattern is `SUM(numerator_component)
        / SUM(denominator_component)`. Avoid Looker Studio's
        "Default aggregation: Average" on a calculated field
        like `balance_per_account` unless the field is
        genuinely 1:1 with a single grain (which is rare).
      self_assessment: |
        Whenever a ratio is defined per group, do not average
        it across groups. Re-aggregate the components and
        divide. "Average of averages" is the named anti-
        pattern; it survives a chart filter only when every
        group has equal weight, which is almost never true.
    - id: q-medium-sum-count-distinct-trap
      type: multiple_choice
      estimated_seconds: 100
      recommended_learner_tasks: [LT-BI-002]
      source_facts:
        - FACT-BIGQUERY-COUNT-DISTINCT-GRAIN
        - FACT-BI-FANOUT-JOIN-RISK
      prompt: |
        A wealth-management dashboard reports "unique customers
        served". The serving view has one row per (relationship
        manager × service tier) with a `distinct_customer_count`
        already pre-aggregated. Sample:

            rm        | service_tier | distinct_customer_count
            Maria     | Silver       | 12
            Maria     | Gold         | 5
            Ion       | Silver       | 8
            Ion       | Gold         | 3

        The chart sums `distinct_customer_count` across the
        four rows: **28**. You happen to know that:

        - Customer `C5042` is served by both Maria (Silver)
          and Ion (Silver) - he's in both rows.
        - Customer `C5099` is served by Maria across both
          tiers (Silver and Gold) - she's in both rows.

        How does the reported `28` compare to the **true
        distinct-customer count** (the number of unique
        customers the firm actually serves)?
      options:
        - id: overstates
          label: |
            **It overstates**. `COUNT(DISTINCT)` is not
            additive across groups when the same entity
            appears in multiple groups. The true count is at
            most `28 - 2 = 26` (subtracting C5042 and C5099,
            each double-counted once) and could be less if
            other customers are also in multiple cells. The
            cert-correct fix: compute `COUNT(DISTINCT
            customer_id)` over the full window directly,
            from the underlying detail table.
        - id: understates
          label: |
            **It understates**. BigQuery's SUM operator
            applies a deduplication pass across
            `COUNT(DISTINCT)` columns, so customers in
            multiple groups are counted once. The reported
            28 is actually a lower bound on the true count.
        - id: matches
          label: |
            **It matches**. `COUNT(DISTINCT)` is additive
            across non-overlapping groups, and on a
            well-modelled wealth dashboard the groups are
            non-overlapping by definition (each customer has
            one RM at one tier).
        - id: depends_on_join
          label: |
            **It depends** on whether the dashboard uses an
            `INNER JOIN` or `LEFT JOIN` between the customer
            roster and the (RM × tier) assignments. LEFT JOIN
            would inflate; INNER JOIN gives the true count.
      answer: overstates
      explanation: |
        The classic `SUM(COUNT(DISTINCT ...))` trap:

        - **In each cell**, `COUNT(DISTINCT customer_id)` is
          exact. Maria-Silver = 12 means 12 unique customers
          across Maria's Silver assignments.
        - **Across cells**, SUM treats each cell's count as
          independent. A customer in two cells contributes
          twice.

        For the sample: 12 + 5 + 8 + 3 = 28. C5042 is in
        Maria-Silver and Ion-Silver (counted twice). C5099 is
        in Maria-Silver and Maria-Gold (counted twice). True
        distinct count: 28 - 2 (for the two doubly-counted
        customers) = 26, *assuming* nobody else is double-
        counted. In practice there are more, and the
        reported 28 routinely overstates by 10-30%.

        Why the distractors fail:

        - **Understates**. SUM does no deduplication; it
          just adds the cell totals. There is no BigQuery
          feature that magically de-duplicates a sum of
          distinct counts.
        - **Matches** assumes non-overlapping groups, which
          is almost never true in wealth management - a
          customer is regularly served by multiple RMs over
          time or across products.
        - **Depends on join**. The fanout from a join is a
          different problem (multiple rows for the same
          customer in the detail table). The trap here is
          structural to `SUM(COUNT(DISTINCT))` regardless of
          join shape.

        The cert-correct fix is to compute the distinct
        count once, at the level of grain you actually want
        to report:

            -- correct: one count over the full window
            SELECT COUNT(DISTINCT customer_id) AS unique_customers
            FROM customer_assignments
            WHERE reporting_month = '2026-03';

            -- not: SUM of per-cell distinct counts
            SELECT SUM(distinct_customer_count) AS unique_customers
            FROM rm_tier_summary;

        The pre-aggregated `distinct_customer_count` is fine
        for *displaying per-cell* (the chart's body) but
        cannot be summed for the total.
      self_assessment: |
        Distinct counts are not additive across groups. If a
        chart needs the "total unique X" alongside per-cell
        counts, compute the total from the detail rows
        directly, not by summing the per-cell counts.
    - id: q-medium-psd2-sca-evidence
      type: select_all
      estimated_seconds: 100
      recommended_learner_tasks: [LT-DQ-005]
      source_facts:
        - FACT-PSD2-STRONG-CUSTOMER-AUTHENTICATION
        - FACT-GDPR-DATA-MINIMISATION
      prompt: |
        A payments operations team is building a daily
        dashboard to monitor Strong Customer Authentication
        (SCA) outcomes for the bank's online card payments.
        The audience is the operations leads; the question they
        answer with it is "did anything unusual happen with
        SCA today, and if so where?". The raw events table has:

            transaction_id, customer_id, account_id,
            transaction_timestamp, transaction_amount,
            currency_code, sca_outcome (success / failure /
            skipped), exemption_reason (low_value /
            transaction_risk_analysis / corporate / none),
            counterparty_type (merchant / p2p),
            acceptance_channel (web / mobile_app / pos)

        Which fields belong in the governed serving view that
        feeds the aggregate dashboard page? (Select all that
        apply.)
      options:
        - id: sca_outcome
          label: |
            **`sca_outcome`** (categorical), aggregated as
            counts and percentages per
            `transaction_date / acceptance_channel`. The
            essential signal: is the SCA failure rate
            spiking on a particular channel?
        - id: exemption_reason
          label: |
            **`exemption_reason`** (categorical), aggregated
            as counts. PSD2 RTS exemptions are an important
            sub-population to monitor; a sudden jump in
            `transaction_risk_analysis` exemptions, for
            example, often signals an upstream
            configuration change.
        - id: counterparty_channel
          label: |
            **`counterparty_type`** and **`acceptance_channel`**
            (categorical dimensions). Useful for slicing
            SCA outcomes by where transactions flowed.
        - id: raw_customer_id
          label: |
            **`customer_id`** on every row, so operations
            leads can drill from an aggregate trend straight
            into the specific cardholder's transactions
            without leaving the dashboard.
      answer: [sca_outcome, exemption_reason, counterparty_channel]
      explanation: |
        PSD2 (Directive 2015/2366) and its associated RTS on
        SCA define the categorical outcomes and exemptions a
        bank reports on for online card payments. An
        operational dashboard's job is to surface category
        trends - rates and counts over time, sliced by
        channel and exemption - not to expose per-customer
        records.

        Why `customer_id` (or similar per-record identifiers)
        does not belong:

        - **Aggregate purpose**: the dashboard answers a
          population-level question. Per-customer drill-in
          is a different use case with a different audience
          (fraud / incident response) and a different access
          surface.
        - **Data minimisation** (GDPR Article 5(1)(c)):
          payment data is personal data; carrying
          identifiers into a broadly-shared aggregate view
          fails minimisation. The customer ID widens the
          access blast radius for no aggregate-view benefit.
        - **Risk amplification**: a "click into the
          cardholder" affordance from an aggregate page
          quietly trains the audience that drilling in is
          part of the dashboard. The right pattern is a
          *separately governed* investigation page with its
          own audience, its own audit log, and its own
          access controls.

        Operational note for the BI author: the aggregate
        view should also be at a coarse-enough time grain
        (per minute, hour, or day, depending on volume) that
        outliers can't be combined with other public data to
        re-identify a specific cardholder. A single
        ultra-low-volume transaction on a rare channel
        appearing in the aggregate can be unique enough to
        identify someone.
      self_assessment: |
        On any payments / authentication dashboard, the
        aggregate page carries only categorical dimensions
        and aggregate metrics. Per-customer drill-in lives
        on a separate access-controlled surface with its own
        audit log; the aggregate page never links directly
        into it.
    - id: q-medium-aml-cft-alert-page
      type: multiple_choice
      estimated_seconds: 95
      recommended_learner_tasks: [LT-DQ-005]
      source_facts:
        - FACT-AML-CFT-SUSPICIOUS-ACTIVITY
        - FACT-GDPR-DATA-MINIMISATION
        - FACT-GDPR-SPECIAL-CATEGORIES
      prompt: |
        Compliance asks for an internal dashboard summarising
        AML alert volumes and ageing for the bank's monthly
        operations review. The team has a flat table:

            alert_id, alert_opened_at, alert_type
              (structuring / rapid_movement / unusual_geography),
            ageing_days, status (open / under_review /
              closed_no_action / escalated_to_sar),
            customer_id, account_id, kyc_review_required,
            investigator_narrative (free-text)

        The dashboard audience is "compliance leadership"
        (~15 people) plus "operations leads" (~40 people).
        Which serving design fits the cert-track expectations
        for AML / CFT BI?
      options:
        - id: aggregate_governed
          label: |
            **A governed aggregate view** (alert counts,
            ageing buckets, type and status distribution; no
            `customer_id`, no `investigator_narrative`,
            optionally no per-alert `alert_id`) for the
            broad audience, plus a **separately access-
            controlled detail page** for the alert-handlers
            with the per-alert fields. The aggregate page
            answers "what's our alert load" without ever
            exposing per-alert sensitive data.
        - id: full_alert_export
          label: |
            **A flat extract** that joins every alert with
            the full KYC record and the investigator
            narrative, exposed to the full compliance + ops
            audience. Convenience: one report; if anyone
            needs detail it's right there.
        - id: aggregate_with_customer_ids
          label: |
            **An aggregate page that keeps `customer_id` as
            a chart dimension**, so operations leads can
            pivot from totals to individuals when they spot
            an anomaly. The narrative still stays off the
            page; only the IDs cross over.
        - id: blend_kyc_to_marketing
          label: |
            **A blend between AML alerts and the marketing
            dashboard**, so account managers can see alert
            flags on customers in their portfolio. The alert
            data sits behind the blend's access control.
      answer: aggregate_governed
      explanation: |
        AML data is among the most sensitive personal-data
        categories a bank handles. Why:

        - **Suspicious-activity records carry per-customer
          suspicion evidence** that has strict access-control
          expectations under the AML / CFT regime. Carrying
          `customer_id` or `investigator_narrative` to a
          ~55-person audience defeats those controls.
        - **Narrative free text routinely captures GDPR
          Article 9 special-category data** by accident -
          health condition, political opinion, religious
          belief, ethnic origin - because investigators
          quote customer statements or contextual details.
          Exposing those narratives via a dashboard is a
          severe data-protection event.
        - **Operational separation matters**. Alert-handling
          is a different work surface from alert-load
          monitoring. Conflating them in one dashboard
          means the larger audience inadvertently gets the
          smaller audience's tools.

        Why the distractors fail:

        - **Full export** is the worst design for AML / CFT.
          It is also a textbook GDPR Article 32 failure
          (inappropriate access) and an AML compliance
          failure (loss of investigation-confidentiality).
        - **Aggregate with `customer_id`** is the polite
          version of the same failure. Customer IDs on the
          aggregate page mean any viewer can re-issue the
          underlying query against the same data source and
          enumerate customers. The "narrative stays off"
          claim doesn't survive a moment of pressure.
        - **Blend to marketing** is structurally wrong: it
          places AML alert flags on a surface whose audience
          and access controls were designed for the
          opposite case. Tipping-off risks under AML rules
          aside, this is a known antipattern.

        Right pattern: two surfaces, two audiences, two
        access controls.
      self_assessment: |
        For AML / KYC / suspicious-activity data, the
        default is two surfaces (aggregate vs. detail) with
        separate access. Any "drill-in from aggregate to
        per-customer detail" affordance is a design smell;
        it usually means the wrong audience can reach detail
        it shouldn't.
    - id: q-medium-corep-finrep-versioning
      type: multiple_choice
      estimated_seconds: 100
      recommended_learner_tasks: [LT-DQ-005]
      source_facts:
        - FACT-EBA-FRAMEWORK-VERSIONING
        - FACT-EBA-DPM-VALIDATION-RULES
        - FACT-CRR-CET1-RATIO
      prompt: |
        Your bank's COREP submission for 2026-Q1 uses the EBA
        reporting framework version 3.4 and DPM validation
        rule version 3.4.1.0. The capital-monitoring
        dashboard you built last quarter has a CET1 ratio
        trend chart that reads from the same underlying
        figures, but its source query targets framework
        version 3.3 (the prior period's framework). The
        review board asks: "can we trust the dashboard's
        period-over-period comparison?"

        Which alignment evidence belongs in the dashboard
        release record before you say yes?
      options:
        - id: framework_version_per_period
          label: |
            **A per-period table recording the framework
            version, the DPM validation rule version, and
            the reference date** beside the CET1 numerator,
            denominator, and ratio. The comparison is
            trustworthy only when the framework version is
            recorded next to each period's figure - so a
            reviewer can see whether 2026-Q1 (v3.4) and
            2025-Q4 (v3.3) used different rules, and judge
            whether the year-on-year delta is real or a
            framework artefact.
        - id: chart_only_alignment
          label: |
            A reference link from the dashboard to the COREP
            submission. The data source is upstream; if the
            submission is correct, the dashboard is
            implicitly aligned to the same framework.
        - id: relabel_to_match
          label: |
            Renaming the dashboard label so it matches the
            COREP cell coordinate (e.g.
            "C 03.00 - CET1 ratio"). The label match is
            evidence the BI metric ties to the regulatory
            template.
        - id: latest_version_only
          label: |
            Re-running the dashboard's historical figures
            under the latest framework version (v3.4),
            retroactively, so every period in the trend
            uses one common version. The chart becomes
            internally consistent and visually clean.
      answer: framework_version_per_period
      explanation: |
        Capital ratios under CRR are computed using a
        specific reporting framework version's definitions,
        templates, and validation rules. Frameworks evolve
        over time - new validation rules, redefined
        components, changes to the denominator (Risk Weighted
        Exposure Amount), etc. Two consequences for BI work:

        - **Period-over-period comparisons require
          framework provenance**. A CET1 ratio computed under
          v3.3 and one computed under v3.4 are not strictly
          comparable; a delta might be real, or it might be
          an artefact of a rule change. Without the framework
          version next to each period's value, a reviewer
          cannot tell.
        - **Retroactive re-statement is a regulatory
          decision, not a BI convenience**. Re-running
          historical numbers under the latest framework is a
          formal action that has its own governance. A BI
          dashboard cannot quietly "harmonise" the trend by
          retroactively applying the new version - the
          dashboard's job is to *reflect* the published
          submissions, not to re-state them.

        Why the distractors fail:

        - **Chart-only alignment** (link to the submission)
          is an inheritance argument. It is necessary but
          not sufficient: the link tells a reviewer where to
          go, but not whether the dashboard's data is
          aligned with what's at that link.
        - **Relabel to match** confuses display labelling
          with data alignment. The dashboard can use COREP
          cell labels and still pull the wrong number from
          the wrong framework version.
        - **Retroactive harmonisation** does the opposite of
          what BI should: it hides framework changes from
          the reviewer, making period comparisons feel
          consistent when they are not.

        Right shape: every period's value on the dashboard
        carries a small metadata row (framework version,
        validation rule version, reference date) next to it.
        For periods where the BI team's number does not match
        the submission, the dashboard documents the
        discrepancy and either flags it or re-runs under the
        right version with the decision recorded.
      self_assessment: |
        Regulatory dashboards live and die by provenance.
        Every reported value needs its framework version,
        rule version, and reference date attached, recorded
        per period - especially when frameworks change. Hide
        the version and you hide the question.
  hard:
    - id: q-hard-semi-additive-exposure
      type: multiple_choice
      estimated_seconds: 110
      recommended_learner_tasks: [LT-SQL-003]
      source_facts:
        - FACT-BI-SEMI-ADDITIVE-BALANCE-SNAPSHOT
        - FACT-BI-REFERENCE-DATE-SEPARATION
        - FACT-REAL-ESTATE-VALUATION-DATE-SEPARATION
      prompt: |
        The March exposure dashboard reads from two committed
        month-end snapshots in `loan_monthly_snapshots`
        (2026-02-28 and 2026-03-31) plus collateral
        `property_valuations` rows that have a separate
        `valuation_date`. A teammate's first cut publishes:

            principal_kpi = SUM(outstanding_principal)
              FROM loan_monthly_snapshots
              -- no date filter
            collateral_kpi = SUM(market_value_eur)
              FROM property_valuations
              -- joined to loan on loan_id, but valuation_date
              -- not constrained

        With 5 loans × 2 snapshots = 10 fact rows and per-loan
        valuations going back 12 quarters, the principal_kpi
        reads RON 915,000 and the collateral_kpi reads ~EUR 11.8M.
        Reviewers see the dashboard and the principal looks way
        too high. What is the cert-correct KPI shape?
      options:
        - id: latest_period_by_currency
          label: |
            **Latest-period principal by currency**, with
            cross-date sums kept only as a control number for
            reconciliation. The principal KPI reads
            `SUM(outstanding_principal) WHERE as_of_date =
            DATE '2026-03-31' GROUP BY currency_code`. The
            collateral metric uses
            `valuation_date = (latest applicable date per
            property)` filtered separately; collateral value
            and outstanding principal are different metrics
            on different reference dates and don't sum
            together.
        - id: all_snapshots_sum
          label: |
            **February and March principal summed**. The two
            month-ends together give a better picture of
            quarterly exposure than either alone. The headline
            number for Q1 2026 is the sum across both months,
            keeping each loan represented at both reporting
            dates.
        - id: valuation_as_principal
          label: |
            **Collateral market value used as principal**. If
            collateral is more current than the loan snapshots
            (most recent valuation is later than the most recent
            month-end), the dashboard should prefer collateral
            market value as the headline exposure number.
      answer: latest_period_by_currency
      explanation: |
        Two grain rules collide on an exposure page; both
        need to hold:

        - **Outstanding principal is semi-additive**.
          Balance / exposure / position metrics are
          snapshots, not flows. Summing the same loan's
          February balance and March balance is the same
          mistake as summing an account's daily balance
          across three days - it triple-counts the same
          money. The grain-correct shape: pick one
          reporting reference date (latest month-end) and
          sum across loans, not across time.
        - **Collateral valuation date is separate from
          loan reporting date**. The most recent valuation
          might be from a prior quarter (real estate isn't
          re-appraised daily); using it as the headline
          principal would conflate two different concepts.
          Keep them as two named KPIs with explicit
          reference dates.

        Both wrong paths read like reasonable shortcuts and
        produce dashboards that overstate by 2-3x. Reviewers
        catch the principal one quickly; the collateral one
        only surfaces when someone asks "what date is this
        as of?".
      self_assessment: |
        On exposure pages, every KPI carries an explicit
        reference date. Two KPIs on the same page can have
        two different reference dates - that's fine, label
        each. Cross-date sums belong in a "reconciliation"
        sidebar, never as the headline.
    - id: q-hard-fanout-metric-ownership
      type: multiple_choice
      estimated_seconds: 95
      recommended_learner_tasks: [LT-BI-002, LT-LOOKER-004]
      source_facts:
        - FACT-BI-FANOUT-JOIN-RISK
        - FACT-BIGQUERY-REDUCE-BEFORE-JOIN
        - FACT-LOOKER-STUDIO-CALCULATED-FIELD-SCOPE
      prompt: |
        The exec dashboard's `ledger_total` was originally
        wrong: a developer joined `account_owners` to the
        balance fact and got `RON 164,800` instead of
        `RON 95,700` (the fanout problem). A teammate fixed it
        for that one scorecard by adding a `DISTINCT
        account_id` step inside the **chart-level calculated
        field**. The number now matches. Two more charts on
        the same page (a trend line and a per-branch bar)
        need the same metric. Where should the repair live so
        the fix doesn't have to be repeated three times - or
        worse, get out of sync?
      options:
        - id: shared_serving_logic
          label: |
            **In the upstream serving SQL** (e.g. a
            `serving_deposit_dashboard` view that aggregates
            balances at account-day grain before any owner
            join). Every chart that reads from the view
            inherits the correct grain. Backup: a
            data-source-level calculated field that any chart
            on the data source picks up.
        - id: single_chart_formula
          label: |
            **In a chart-level calculated field on each
            chart**, copied carefully. Schedule a quarterly
            sync to keep the three copies aligned. The fix
            stays close to where the bug originally appeared.
        - id: raw_owner_join
          label: |
            **In the raw owner-join itself**, before the
            balance-grain reduction. Allocate balances pro-rata
            across owners on the join; the chart-level total
            then sums correctly because the underlying rows
            already encode the shares.
      answer: shared_serving_logic
      explanation: |
        Where you put the fix determines who maintains it:

        - **Upstream serving SQL** is owned by the
          warehouse team and reviewed in version control.
          The fix is one place; every consumer benefits.
          Adding a fourth chart later doesn't require
          re-discovering the fanout problem.
        - **Chart-level fix** lives in the report config,
          which has no version control, no diff history,
          and no review process beyond "click around in
          Looker Studio". Three chart-level copies of the
          same fix is three places drift can happen.
        - **Pre-join allocation** (option C) is sometimes
          the right answer when the question is genuinely
          "how is this split across owners?", but it's
          structurally different from the original
          question ("what is the account-grain total?")
          and quietly changes the metric's meaning. It's
          not a "fix"; it's a "different metric".

        The cert-correct rule of thumb: metric repairs
        belong **upstream of the consumer**. The further
        upstream, the more consumers benefit; the further
        downstream, the more places the same fix has to be
        re-implemented and reviewed.
      self_assessment: |
        Whenever you find a bug in a metric on a chart, ask
        "if I add a fourth chart that uses the same metric,
        does my fix automatically apply?". If the answer is
        no, the fix is in the wrong layer.
    - id: q-hard-blend-freshness-signoff
      type: multiple_choice
      estimated_seconds: 100
      recommended_learner_tasks: [LT-LOOKER-004, LT-DQ-005]
      source_facts:
        - FACT-LOOKER-STUDIO-BLEND-FRESHNESS-MINIMUM
        - FACT-LOOKER-STUDIO-BLEND-JOIN-CONFIG
        - FACT-LOOKER-STUDIO-DATA-FRESHNESS-TRADEOFF
      prompt: |
        The deposits dashboard blends two sources:

        - **Source L**: BigQuery view
          `serving_deposit_branch_daily` (data source freshness
          = 15 minutes; daily ingest at 14:00).
        - **Source R**: Google Sheet `branch_enrichment` (data
          source freshness = 12 hours; updated manually
          weekly).

        A reviewer asks: "what does the blended chart actually
        show in terms of freshness?". Two real failure modes
        worry her: (a) the chart reads from an old cached
        Sheet result while the BigQuery side updates, and (b)
        the blend's effective freshness isn't what either
        source's freshness setting promises. Before sign-off,
        what does the BI author need to check?
      options:
        - id: each_source_refresh
          label: |
            **Each source's freshness setting separately, plus
            the blend's effective refresh behaviour**. A blend
            queries each underlying source according to that
            source's freshness window and combines results;
            the blend's effective freshness is therefore
            governed by the slower side - the chart can be
            up to 12 hours stale on the Sheet side even when
            BigQuery refreshes every 15 minutes. Document the
            blend's effective freshness floor and decide
            whether 12 hours is acceptable for the audience.
        - id: bigquery_only
          label: |
            **Only the BigQuery source**. Blends always
            inherit the leftmost source's freshness setting;
            since BigQuery is on the left, the chart refreshes
            every 15 minutes regardless of the Sheet's
            12-hour setting.
        - id: chart_order
          label: |
            **The order of charts on the dashboard page**.
            Charts higher on the page refresh first;
            re-ordering the page so the blended chart is
            first ensures the freshest possible data.
      answer: each_source_refresh
      explanation: |
        Blends in Looker Studio query each underlying data
        source separately, then combine the results in the
        chart. Each side honours its own freshness setting -
        the blend doesn't override them. Practical
        consequences:

        - **Effective freshness floor is the slowest
          source**. The chart can show fresh BigQuery rows
          joined to a stale Sheet snapshot. Stakeholders
          looking at the chart can't tell which side is
          stale without separate metadata.
        - **Edit-after-cache windows are confusing**. If a
          team member updates the Sheet at 11:00 and the
          chart was last queried at 10:55, the cached
          Sheet result is served until 22:55 (12 hours
          later). BigQuery refreshes do not invalidate the
          Sheet cache.
        - **Practical fix**: align the freshness settings
          on both sources to the minimum the audience
          actually needs, OR add a small "data as of"
          per-source indicator on the dashboard so viewers
          can see when each side last refreshed.

        Wrong distractor 1 (leftmost-inherits) confuses the
        blend's *row-retention* rule (leftmost source is the
        outer side, which is the medium-question
        `q-medium-leftmost-blend-source`) with the freshness
        behaviour (each source independently). Wrong
        distractor 2 (chart order) confuses page layout with
        data-loading order; there is no "first refresh" effect
        based on chart position.
      self_assessment: |
        For any blended chart, the dashboard sign-off should
        document each source's freshness setting separately
        and name the slowest source as the effective floor.
        "The chart is fresh" is meaningless without that
        per-source breakdown.
    - id: q-hard-refresh-cost-evidence
      type: select_all
      estimated_seconds: 110
      recommended_learner_tasks: [LT-LOOKER-004, LT-DQ-005]
      source_facts:
        - FACT-LOOKER-STUDIO-BIGQUERY-REFRESH-COST
        - FACT-BIGQUERY-JOBS-BYTES
        - FACT-BIGQUERY-JOBS-CREATION-TIME
      prompt: |
        Finance asks for the monthly cost of the deposits
        dashboard. The dashboard auto-refreshes every 15
        minutes, ~10 viewers open it daily, and the underlying
        BigQuery query reads from a partitioned 18-month fact
        table.

        For the operations review, you query
        `INFORMATION_SCHEMA.JOBS_BY_PROJECT` to find every job
        that ran against the relevant dataset in the last 30
        days. Which evidence rows belong in the review pack?
        (Select all that apply.)
      options:
        - id: refresh_cost_note
          label: |
            A short note in the review pack: "Looker Studio
            auto-refresh on this report can trigger BigQuery
            jobs whose cost is billed to project `proj-A`.
            Cost rises linearly with refresh frequency and
            number of viewers; cache hits do not bill but
            cannot be assumed."
        - id: job_bytes
          label: |
            **`SUM(total_bytes_processed)`** for jobs whose
            `user_email` matches the dashboard's service
            account, broken down by job creation hour.
            Bytes processed × current rate = the actual
            charge.
        - id: job_time_window
          label: |
            **`creation_time`** distribution of the same jobs,
            so the review can show the auto-refresh pattern
            (one job every 15 minutes per active viewer) vs
            ad-hoc query bursts. Outliers in the
            distribution often reveal a stuck refresh loop
            or a viewer leaving the tab open over a holiday.
        - id: cache_hit_skip
          label: |
            A claim that "all refreshes hit the BigQuery
            query results cache, so `total_bytes_processed`
            is effectively zero for repeat queries". The
            review can skip the bytes column.
      answer: [refresh_cost_note, job_bytes, job_time_window]
      explanation: |
        BigQuery bills on bytes processed; cost evidence has
        to tie back to job-level facts the warehouse already
        records.

        The three correct rows give a reviewer the full
        picture:

        - **What costs are possible** (refresh-cost note).
        - **What costs actually happened** (bytes
          processed, summed and broken down).
        - **When they happened** (creation_time
          distribution) - which often reveals whether the
          cost is from the intended dashboard pattern or
          from something else.

        Why "cache hits" is the wrong row to put in the
        review:

        - The BigQuery query results cache is **invalidated
          when the underlying table changes**. Daily ingest
          invalidates it daily. The cache helps when many
          viewers fire identical queries in the same
          window before the next ingest; it does not help
          across days.
        - Even when the cache hits, that's reported on the
          job (`cache_hit = TRUE`, `total_bytes_processed
          = 0`). The bytes column already reflects cache
          behaviour - it isn't bypassed by it. Skipping the
          bytes column hides the cost evidence.

        Production tip: the same JOBS query can be used to
        identify expensive auto-refresh patterns. If
        `count(*)` of jobs from the dashboard's service
        account is suspiciously stable around N × hours-per-
        day, you have an open-tab refresh loop running
        overnight that nobody is reading.
      self_assessment: |
        For any BigQuery-backed report, the operations
        review needs job-level bytes + creation_time
        evidence. "It mostly hits the cache" is a vibe, not
        an evidence row.
    - id: q-hard-control-publication-review
      type: select_all
      estimated_seconds: 110
      recommended_learner_tasks: [LT-LOOKER-007, LT-DQ-005]
      source_facts:
        - FACT-BIGQUERY-DRY-RUN-BYTES
        - FACT-BIGQUERY-QUERY-VALIDATOR-BYTES
        - FACT-LOOKER-STUDIO-BIGQUERY-REFRESH-COST
        - FACT-LOOKER-STUDIO-CONTROLS-FILTER-DATA
      prompt: |
        You're publishing a new deposits page with two
        controls: a `Currency` drop-down (RON / EUR / All)
        and a `Date range` picker (default: latest day). The
        underlying query reads from a partitioned 18-month
        table. Review board asks for evidence the page is
        production-ready. Which evidence belongs in the
        release review? (Select all that apply.)
      options:
        - id: byte_estimate
          label: |
            **A dry-run / query-validator byte estimate** for
            the underlying SQL with default control values,
            plus a second estimate for the worst-case control
            combination ("All currencies + 18-month range")
            so reviewers can see the cost ceiling.
        - id: control_scope
          label: |
            **A documented control contract** per control:
            bound field, allowed values, default value, and
            affected charts. For the Currency control:
            bound to `currency_code`, allowed `{RON, EUR,
            All}`, default `RON`, affects scorecards 1-3
            and the bar chart; does not affect the FX
            reference chart.
        - id: refresh_cost
          label: |
            **Expected cost behaviour at refresh**: the
            dashboard auto-refreshes every 15 minutes per
            open tab. With ~10 daily viewers and a
            partition-pruned default query at ~50 MB per
            refresh, expected monthly bytes processed and
            the projected cost at current rates.
        - id: ignore_partition_filter
          label: |
            **A note** that the partition filter on
            `business_date` can be omitted from the
            underlying SQL because the Date-range control
            narrows the result on the chart side; the
            BigQuery scan is already limited to the
            displayed range.
      answer: [byte_estimate, control_scope, refresh_cost]
      explanation: |
        Three checks gate a real release for a
        controls-driven, BigQuery-backed dashboard:

        - **Byte estimate (dry-run)**. The default control
          state is what 95% of viewers see; the worst-case
          combination is what one of them will pick after
          someone in management says "show me everything".
          Both numbers should be in the review.
        - **Control contract**. Controls in Looker Studio
          are easy to add and surprisingly easy to misuse
          (silently break with a field rename, "All" option
          accidentally matching everything because of a
          NULL pass-through, etc.). The contract makes the
          control debuggable later.
        - **Refresh-cost projection**. The 15-minute
          auto-refresh × N viewers is the cost shape that
          surprises finance after launch. Compute it before
          launch, not after the first month's bill.

        The wrong row (ignore partition filter) is a
        repeat of the easy-question trap from `q-easy-
        partition-date-filter`: chart-side controls do
        **not** prune partitions on the warehouse. BigQuery
        only prunes when the partition column is in the
        SQL's `WHERE` clause; the Date-range control passes
        the range into the chart but does not rewrite the
        SQL to add a partition predicate. Omitting the
        explicit predicate causes a full-table scan on
        every refresh regardless of what the date picker
        is showing.
      self_assessment: |
        Three things on every controls page: byte estimate
        (default + worst-case), per-control contract, and
        refresh-cost projection. The partition filter
        always belongs in the SQL; controls cannot replace
        it.
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
