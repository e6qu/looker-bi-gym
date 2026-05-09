# BigQuery Materialized Views Introduction

- Source ID: `SRC-BIGQUERY-MATERIALIZED-VIEWS`
- URL: https://cloud.google.com/bigquery/docs/materialized-views-intro
- Accessed: 2026-05-09
- Local format: Markdown wrapper containing the complete fetched article HTML.
- License: Google Cloud documentation is licensed under Creative Commons Attribution 4.0, and code samples under Apache 2.0, except as otherwise noted on the source page.

## Complete Article HTML Snapshot

~~~html
<article class="devsite-article">
  
  
  
  
  

  <div class="devsite-article-meta nocontent" role="navigation" data-nosnippet>
    
    
    <ul class="devsite-breadcrumb-list"
  
    aria-label="Breadcrumb">
  
  <li class="devsite-breadcrumb-item
             ">
    
    
    
      
        
  <a href="https://docs.cloud.google.com/"
      
        class="devsite-breadcrumb-link gc-analytics-event"
      
        data-category="Site-Wide Custom Events"
      
        data-label="Breadcrumbs"
      
        data-value="1"
      
        track-type="globalNav"
      
        track-name="breadcrumb"
      
        track-metadata-position="1"
      
        track-metadata-eventdetail="Google Cloud Documentation"
      
    >
    
          Home
        
  </a>
  
      
    
  </li>
  
  <li class="devsite-breadcrumb-item
             ">
    
      
      <div class="devsite-breadcrumb-guillemet material-icons" aria-hidden="true"></div>
    
    
    
      
        
  <a href="https://docs.cloud.google.com/docs"
      
        class="devsite-breadcrumb-link gc-analytics-event"
      
        data-category="Site-Wide Custom Events"
      
        data-label="Breadcrumbs"
      
        data-value="2"
      
        track-type="globalNav"
      
        track-name="breadcrumb"
      
        track-metadata-position="2"
      
        track-metadata-eventdetail="Documentation"
      
    >
    
          Documentation
        
  </a>
  
      
    
  </li>
  
  <li class="devsite-breadcrumb-item
             ">
    
      
      <div class="devsite-breadcrumb-guillemet material-icons" aria-hidden="true"></div>
    
    
    
      
        
  <a href="https://docs.cloud.google.com/docs/data"
      
        class="devsite-breadcrumb-link gc-analytics-event"
      
        data-category="Site-Wide Custom Events"
      
        data-label="Breadcrumbs"
      
        data-value="3"
      
        track-type="globalNav"
      
        track-name="breadcrumb"
      
        track-metadata-position="3"
      
        track-metadata-eventdetail="Data analytics"
      
    >
    
          Data analytics
        
  </a>
  
      
    
  </li>
  
  <li class="devsite-breadcrumb-item
             ">
    
      
      <div class="devsite-breadcrumb-guillemet material-icons" aria-hidden="true"></div>
    
    
    
      
        
  <a href="https://docs.cloud.google.com/bigquery/docs"
      
        class="devsite-breadcrumb-link gc-analytics-event"
      
        data-category="Site-Wide Custom Events"
      
        data-label="Breadcrumbs"
      
        data-value="4"
      
        track-type="globalNav"
      
        track-name="breadcrumb"
      
        track-metadata-position="4"
      
        track-metadata-eventdetail="BigQuery"
      
    >
    
          BigQuery
        
  </a>
  
      
    
  </li>
  
  <li class="devsite-breadcrumb-item
             ">
    
      
      <div class="devsite-breadcrumb-guillemet material-icons" aria-hidden="true"></div>
    
    
    
      
        
  <a href="https://docs.cloud.google.com/bigquery/docs/introduction"
      
        class="devsite-breadcrumb-link gc-analytics-event"
      
        data-category="Site-Wide Custom Events"
      
        data-label="Breadcrumbs"
      
        data-value="5"
      
        track-type="globalNav"
      
        track-name="breadcrumb"
      
        track-metadata-position="5"
      
        track-metadata-eventdetail=""
      
    >
    
          Guides
        
  </a>
  
      
    
  </li>
  
</ul>
    
      
    <devsite-thumb-rating position="header">
    </devsite-thumb-rating>
  
    
  </div>
  
    <devsite-feedback
  position="header"
  project-name="BigQuery"
  product-id="81912"
  bucket="docs"
  context=""
  version="t-devsite-webserver-20260428-r00-rc01.477318040238770238"
  data-label="Send Feedback Button"
  track-type="feedback"
  track-name="sendFeedbackLink"
  track-metadata-position="header"
  class="nocontent"
  data-nosnippet
  
  
    project-feedback-url="https://issuetracker.google.com/issues/new?component=187149&amp;template=0"
  
  
    
      project-icon="https://docs.cloud.google.com/_static/clouddocs/images/icons/products/bigquery-color.svg"
    
  
  
    project-support-url="https://docs.cloud.google.com/bigquery/docs/getting-support"
  
  
  >

  <button>
  
    
    Send feedback
  
  </button>
</devsite-feedback>
  <devsite-actions hidden data-nosnippet><devsite-feature-tooltip
      ack-key="AckCollectionsBookmarkTooltipDismiss"
      analytics-category="Site-Wide Custom Events"
      analytics-action-show="Callout Profile displayed"
      analytics-action-close="Callout Profile dismissed"
      analytics-label="Create Collection Callout"
      class="devsite-page-bookmark-tooltip nocontent"
      data-nosnippet
      dismiss-button="true"
      id="devsite-collections-dropdown"
      
      dismiss-button-text="Dismiss"

      
      close-button-text="Got it">

    
    
      <devsite-bookmark></devsite-bookmark>
    

    <span slot="popout-heading">
      
      Stay organized with collections
    </span>
    <span slot="popout-contents">
      
      Save and categorize content based on your preferences.
    </span>
  </devsite-feature-tooltip>
    <devsite-llm-tools></devsite-llm-tools></devsite-actions>
  
    
  

  <devsite-toc class="devsite-nav"
    depth="2"
    devsite-toc-embedded
    >
  </devsite-toc>
  
    
  <div class="devsite-article-body clearfix
  devsite-no-page-title">

  
    
    
    
    <h1 id="introduction-to-materialized-views" data-text="Introduction to materialized views" tabindex="-1">Introduction to materialized views</h1>
    

<p>Materialized views are precomputed views that periodically store the results of
a SQL query. In some use cases, materialized views reduce the total processing
time and related charges by reducing the amount of data to be scanned for each
query. You can query materialized views as you would other data resources.</p>

<p>The following use cases highlight the value of materialized views:</p>

<ul>
<li><strong>Pre-process data</strong>. Improve query performance by preparing aggregates,
filters, joins, and clusters.</li>
<li><strong>Dashboard acceleration</strong>. Empower BI tools like Looker that
frequently query the same aggregate metrics&mdash;for example, daily
active users.</li>
<li><strong>Real-time analytics on large streams</strong>. Can provide faster responses
on tables that receive high-velocity streaming data.</li>
<li><strong>Cost management</strong>. Reduce the cost of repetitive, expensive queries
over large datasets.</li>
</ul>
<aside class="note"><strong>Note:</strong><span> Materialized views aren&#39;t available when you use reservations created with
  certain BigQuery editions. For more information about which features are enabled
  in each edition, see <a href="/bigquery/docs/editions-intro">Introduction to
  BigQuery editions</a>.</span></aside>
<p>Key characteristics of materialized views include the following:</p>

<ul>
<li><strong>Zero maintenance</strong>. Materialized views are precomputed in the background when
the base tables change. Any incremental data changes from the base tables are
automatically added to the materialized views, with no user action required.</li>
<li><strong>Fresh data</strong>. Materialized views return fresh data. If changes to base
tables might invalidate the materialized view, then data is read directly
from the base tables. If the changes to the base tables don&#39;t invalidate the
materialized view, then rest of the data is read from the materialized view and
only the changes are read from the base tables.</li>
<li><strong>Smart tuning</strong>. If any part of a query against a base table can be
resolved by querying the materialized view, then BigQuery
reroutes the query to use the materialized view for improved performance
and efficiency. For information about how and when smart tuning can improve
queries, see
<a href="/bigquery/docs/materialized-views-use#smart_tuning">Use materialized views</a>.</li>
</ul>

<h3 id="use_cases" data-text="Incremental and non-incremental materialized views" tabindex="-1">Incremental and non-incremental materialized views</h3>

<p>There are two basic kinds of materialized views:</p>

<ul>
<li><em>Incremental materialized views</em> support a limited set of features. To learn more about supported SQL syntax for materialized views, see <a href="/bigquery/docs/materialized-views-create" track-type="article" track-metadata-position="body">Create materialized views</a>. Only incremental materialized views can take advantage of
<a href="/bigquery/docs/materialized-views-use#smart_tuning" track-type="article" track-name="internalLink" track-metadata-position="body">smart tuning</a>.</li>
<li><em>Non-incremental functions</em> support most of the syntaxes that incremental
materialized views don&#39;t support.</li>
</ul>

<p>When you create materialized views, by default BigQuery only lets you create
views based upon <em>incremental</em> queries. To create a non-incremental view, you can
specify <code translate="no" dir="ltr">allow_non_incremental_definition = true</code> in the materialized view&#39;s
definition.</p>

<p>The best type of materialized view to use depends on your situation. The following
table compares the features of incremental and non-incremental materialized
views:</p>

<table>
  <colgroup>
    <col width="20%">
    <col width="50%">
    <col width="30%">
  </colgroup>
<thead>
<tr>
<th><b>Category</b></th>
<th><b>Incremental</b></th>
<th><b>Non-incremental</b></th>
</tr>
</thead>
<tbody>
<tr>
<td>Query supported</td>
<td><a href="/bigquery/docs/materialized-views-create#aggregate_requirements">Limited</a></td>
<td><a href="/bigquery/docs/materialized-views-create#create-non-inc">Most queries</a></td>
</tr>
<tr>
<td>Maintenance cost</td>
<td>Can reduce the cost of frequently used queries. To learn how materialized views are updated, see
<a href="/bigquery/docs/materialized-views-use#incremental_updates">incremental
updates</a>.</td>
<td>Every refresh runs the full query.</td>
</tr>
<tr>
<td>Smart tuning support</td>
<td>Supported for most views queries.</td>
<td>No</td>
</tr>
<tr>
<td>Always fresh results</td>
<td>Supported. Incremental views return fresh query results even when the base tables have changed since the last refresh.</td>
<td>No</td>
</tr>
</tbody>
</table>

<h2 id="authorized_materialized_views" data-text="Authorized materialized views" tabindex="-1">Authorized materialized views</h2>

<p>You can create an authorized materialized view to share a subset of data from a
source dataset to a view in a secondary dataset. You can then share this view to
specific users and groups (principals) who can view the data you share.
Principals can query the data you provide in a view, but they can&#39;t access
the source dataset directly.</p>

<p>Authorized views and authorized materialized views are authorized in the same
way. For details, see <a href="/bigquery/docs/authorized-views">Authorized views</a>.</p>

<h2 id="interaction" data-text="Interaction with other BigQuery features" tabindex="-1">Interaction with other BigQuery features</h2>

<p>The following BigQuery features work transparently with
materialized views:</p>

<ul>
<li><p><strong><a href="/bigquery/docs/query-plan-explanation">Query plan explanation</a>:</strong> The query plan
reflects which materialized views are scanned (if any), and shows how many
bytes are read from the materialized views and base tables combined.</p></li>
<li><p><strong><a href="/bigquery/docs/cached-results">Query caching</a>:</strong> The results of a query
that BigQuery rewrites using
a materialized view can be cached subject to the usual limitations (using of
deterministic functions, no streaming into the base tables, etc.).</p></li>
<li><p><strong><a href="/bigquery/docs/best-practices-costs#restrict-bytes-billed">Cost restriction</a>:</strong>
If you have set a value for maximum bytes billed,
and a query would read a number of bytes beyond the limit, the query fails
without incurring a charge, whether the query uses materialized views, the
base tables, or both.</p></li>
<li><p><strong><a href="/bigquery/docs/best-practices-costs#perform-dry-run">Cost estimation using dry run</a>:</strong>
A dry run repeats query rewrite logic
using the available materialized views and provides a cost estimate. You can use
this feature as a way to test whether a specific query uses any
materialized views.</p></li>
<li><p><strong><a href="/bigquery/docs/data-replication">Cross-region data replication</a>:</strong>
Materialized views can be created on top of BigQuery tables that
have cross-region replication enabled, but only on the primary region. If the
secondary region is used, you can encounter the following error message:
<code translate="no" dir="ltr">The dataset replica of the cross region dataset {PROJECT}:{DATASET} in region {REGION} is read-only because it&#39;s not the primary replica.</code></p></li>
</ul>

<h3 id="cdc" data-text="Tables with active change data capture" tabindex="-1">Tables with active change data capture</h3>

<p>You can create materialized views over tables with active
<a href="/bigquery/docs/change-data-capture">change data capture</a> (CDC). These materialized
views function like materialized views over BigQuery tables,
including the benefits of automatic refresh. Materialized views can&#39;t perform
<a href="/bigquery/docs/change-data-capture#query-max-staleness">runtime merge queries</a>,
so materialized views must be configured with a sufficient <code translate="no" dir="ltr">max_staleness</code> to
avoid runtime merge jobs. For more information, see
<a href="#cdc_limits">Limitations of materialized views over tables with active change data capture</a>.</p>



<h3 id="biglake" data-text="BigLake metadata cache-enabled tables" tabindex="-1">BigLake metadata cache-enabled tables</h3>

<p>Materialized views over <a href="/bigquery/docs/biglake-intro#metadata_caching_for_performance">BigLake metadata cache-enabled
tables</a> can
reference structured data stored in Cloud Storage and Amazon Simple Storage Service (Amazon S3).
These materialized views function
like materialized views over BigQuery-managed storage tables,
including the benefits of automatic refresh and smart tuning. Other benefits
include the pre-aggregating, pre-filtering, and pre-joining of data stored
outside of BigQuery. Materialized views over
BigLake tables are stored in and have all of the characteristics
of <a href="/bigquery/docs/storage_overview">BigQuery managed storage</a>.</p>
<aside class="note"><strong>Note:</strong><span> When a materialized view over a BigLake table with cached
metadata is refreshed, the materialized view&#39;s cached data contains all
updates to the external table up to the most recent metadata cache creation.</span></aside>
<p>When you create a materialized view over an Amazon S3
BigLake table, the data in the materialized view isn&#39;t
available for joins with BigQuery data. To make Amazon S3
data in a materialized view available for joins, create a
<a href="/bigquery/docs/load-data-using-cross-cloud-transfer#materialized_view_replicas">replica</a> of the materialized view.
You can only create materialized view replicas over
<a href="/bigquery/docs/authorized-views">authorized materialized views</a>.</p>

<h2 id="limitations" data-text="Limitations" tabindex="-1">Limitations</h2>

<ul>
<li>Limits on base table references and other restrictions might apply.
For more information about materialized view limits, see <a href="/bigquery/quotas#materialized_view_limits">Quotas
and limits</a>.</li>
<li>The data of a materialized view cannot be updated or manipulated directly
using operations such as <code translate="no" dir="ltr">COPY</code>, <code translate="no" dir="ltr">EXPORT</code>, <code translate="no" dir="ltr">LOAD</code>, <code translate="no" dir="ltr">WRITE</code>, or data
manipulation language (DML) statements.</li>
<li>The materialized view SQL cannot be updated after the materialized view is
created.</li>
<li>A materialized view must reside in the same organization as its base tables,
or in the same project if the project does not belong to an organization.</li>
<li>Materialized views use a restricted SQL syntax and a limited set of
aggregation functions. For more information, see <a href="/bigquery/docs/materialized-views#supported-mvs">Supported
materialized views</a>.</li>
<li>Materialized views cannot be nested on other materialized views.</li>
<li>Materialized views cannot query external or wildcard tables,
logical views<sup>1</sup>, or snapshots.</li>
<li><a href="/bigquery/docs/reference/system-variables">System variables</a>, including the
<code translate="no" dir="ltr">@@session_id</code> system variable, aren&#39;t supported with materialized views.</li>
<li>The value of the <code translate="no" dir="ltr">max_staleness</code> option must be between 30 minutes and 3 days,
inclusive.</li>
<li>Only the GoogleSQL dialect is supported for materialized views.</li>
<li>You can set descriptions for materialized views, but you cannot set
descriptions for the individual columns in the materialized view.</li>
<li>If you delete a base table without first deleting the materialized view,
queries and refreshes of the materialized view fail. If you recreate the base
table, you must also recreate the materialized view.</li>
<li>Only non-incremental materialized view can have <a href="/bigquery/docs/spanner-external-datasets">Spanner
external dataset base tables</a>.
If a non-incremental materialized view&#39;s last refresh occurred
outside the <code translate="no" dir="ltr">max_staleness</code> interval, then the query reads the base
Spanner external dataset tables. To learn more about
Spanner external dataset tables, see
<a href="/bigquery/docs/materialized-views-create#spanner">Create materialized views over Spanner external datasets</a>.</li>
<li>Query results are not cached if the query runs against non-incremental
materialized views that reference <a href="/bigquery/docs/spanner-external-datasets">Spanner external dataset tables</a>.</li>
<li>Materialized views can&#39;t inherit or explicitly define
<a href="/bigquery/docs/reference/standard-sql/data-types#parameterized_data_types">parameterized data types</a>,
such as <code translate="no" dir="ltr">STRING(n)</code>, as parameterized data types are only supported for base
table columns and script variables.</li>
</ul>

<p><sup>1</sup>Logical view reference support is in
<a href="https://cloud.google.com/products/#product-launch-stages">preview</a>. For more information, see
<a href="/bigquery/docs/materialized-views-create#reference_logical_views">Reference logical views</a>.</p>

<h3 id="cdc_limits" data-text="Limitations of materialized views over tables with active CDC" tabindex="-1">Limitations of materialized views over tables with active CDC</h3>

<p>Materialized views with active change data capture base tables have the following
limitations:</p>

<ul>
<li>If a materialized view has a base table with active
<a href="/bigquery/docs/change-data-capture">change data capture</a>, then that table
can&#39;t be referenced in a query that also references the materialized view.</li>
<li>When you create a materialized view over a table with active
change data capture, the materialized
view can&#39;t perform the runtime merge jobs of the underlying CDC table.
Set the <a href="/bigquery/docs/materialized-views-create#max_staleness"><code translate="no" dir="ltr">max_staleness</code> value</a>
of the materialized view to at least twice the <code translate="no" dir="ltr">max_staleness</code> value of
the base table. Queries against a materialized view fail if the current
version of the underlying CDC table is staler than the materialized view
<code translate="no" dir="ltr">max_staleness</code>.</li>
<li>Smart tuning isn&#39;t supported for materialized views over tables with active change data
capture.</li>
</ul>

<h3 id="biglake_limits" data-text="Limitations of materialized views over BigLake tables" tabindex="-1">Limitations of materialized views over BigLake tables</h3>

<ul>
<li>Partitioning of the materialized view is not supported. The base
tables can use hive partitioning but the materialized view storage cannot be
partitioned in BigLake tables. This means that any
deletion in a base table causes a full refresh of the materialized view. For
more details see <a href="/bigquery/docs/materialized-views-use#incremental_updates">Incremental updates</a>.</li>
<li>The <a href="/bigquery/docs/materialized-views-create#max_staleness"><code translate="no" dir="ltr">--max_staleness</code>
option</a> value of the
materialized view must be greater than that of the BigLake base
table.</li>
<li>Joins between BigQuery managed tables and
BigLake tables are not supported in a single materialized view
definition.</li>
<li>BigQuery BI Engine doesn&#39;t support acceleration of materialized views over
BigLake tables.
</li>
</ul>

<h2 id="materialized_views_pricing" data-text="Materialized views pricing" tabindex="-1">Materialized views pricing</h2>

<p>Costs are associated with the following aspects of materialized views:</p>

<ul>
<li>Querying materialized views.</li>
<li>Maintaining materialized views, such as when materialized views are
refreshed. The cost for automatic refresh is billed to the project where the view
resides. The cost for manual refresh is billed to the project in which the manual
refresh job is run. For more information about controlling maintenance cost,
see <a href="/bigquery/docs/materialized-views-manage#refresh">Refresh job maintenance</a>.</li>
<li>Storing materialized view tables.</li>
</ul>

<table>
<thead>
<tr>
<th>Component</th>
<th>On-demand pricing</th>
<th>Capacity-based  pricing</th>
</tr>
</thead>

<tbody>
<tr>
<td>Querying</td>
<td>Bytes processed by materialized views and any necessary portions of the base tables.<sup>1</sup></td>
<td>Slots are consumed during query time.</td>
</tr>
<tr>
<td>Maintenance</td>
<td>Bytes processed during refresh time.</td>
<td>Slots are consumed during refresh time.</td>
</tr>
<tr>
<td>Storage</td>
<td>Bytes stored in materialized views.</td>
<td>Bytes stored in materialized views.</td>
</tr>
</tbody>
</table>

<p><sup>1</sup>Where possible, BigQuery reads only the changes since
the last time the view was refreshed. For more information, see
<a href="/bigquery/docs/materialized-views-use#incremental_updates">Incremental updates</a>.</p>

<h3 id="storage_cost_details" data-text="Storage cost details" tabindex="-1">Storage cost details</h3>

<p>For <code translate="no" dir="ltr">AVG</code>, <code translate="no" dir="ltr">ARRAY_AGG</code>, and <code translate="no" dir="ltr">APPROX_COUNT_DISTINCT</code> aggregate values in a
materialized view, the final value is not directly stored. Instead,
BigQuery internally stores a materialized view as an intermediate
<em>sketch</em>, which is used to produce the final value.</p>

<p>As an example, consider a materialized view that&#39;s created with the following
command:</p>

<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><span class="devsite-syntax-k">CREATE</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">MATERIALIZED</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">VIEW</span><span class="devsite-syntax-w"> </span><var translate="no"><span class="devsite-syntax-k">project</span><span class="devsite-syntax-o">-</span><span class="devsite-syntax-n">id</span></var><span class="devsite-syntax-p">.</span><var translate="no"><span class="devsite-syntax-n">my_dataset</span></var><span class="devsite-syntax-p">.</span><var translate="no"><span class="devsite-syntax-n">my_mv_table</span></var><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span>
<span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">date</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">AVG</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">net_paid</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">avg_paid</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><var translate="no"><span class="devsite-syntax-k">project</span><span class="devsite-syntax-o">-</span><span class="devsite-syntax-n">id</span></var><span class="devsite-syntax-p">.</span><var translate="no"><span class="devsite-syntax-n">my_dataset</span></var><span class="devsite-syntax-p">.</span><var translate="no"><span class="devsite-syntax-n">my_base_table</span></var>
<span class="devsite-syntax-k">GROUP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">date</span></pre></devsite-code>

<p>While the <code translate="no" dir="ltr">avg_paid</code> column is rendered as <code translate="no" dir="ltr">NUMERIC</code> or <code translate="no" dir="ltr">FLOAT64</code> to the user,
internally it is stored as <code translate="no" dir="ltr">BYTES</code>, with its content being an intermediate
sketch in proprietary format. For <a href="https://cloud.google.com/bigquery/pricing#data">data size calculation</a>,
the column is treated as <code translate="no" dir="ltr">BYTES</code>.</p>

<h2 id="whats_next" data-text="What's next" tabindex="-1">What's next</h2>

<ul>
<li><a href="/bigquery/docs/logical-materialized-view-overview">Overview of logical and materialized views</a></li>
<li><a href="/bigquery/docs/materialized-views-create">Create materialized views</a></li>
<li><a href="/bigquery/docs/materialized-views-use">Use materialized views</a></li>
<li><a href="/bigquery/docs/materialized-views-manage">Manage materialized views</a></li>
</ul>


  
  

  
    <devsite-hats-survey class="nocontent" data-nosnippet
      hats-id="Nd7nTix2o0eU5NUYprb0ThtUc5jf"
      listnr-id="83405"></devsite-hats-survey>
  

  
</div>

  
    
    
      
    <devsite-thumb-rating position="footer">
    </devsite-thumb-rating>
  
       
         <devsite-feedback
  position="footer"
  project-name="BigQuery"
  product-id="81912"
  bucket="docs"
  context=""
  version="t-devsite-webserver-20260428-r00-rc01.477318040238770238"
  data-label="Send Feedback Button"
  track-type="feedback"
  track-name="sendFeedbackLink"
  track-metadata-position="footer"
  class="nocontent"
  data-nosnippet
  
  
    project-feedback-url="https://issuetracker.google.com/issues/new?component=187149&amp;template=0"
  
  
    
      project-icon="https://docs.cloud.google.com/_static/clouddocs/images/icons/products/bigquery-color.svg"
    
  
  
    project-support-url="https://docs.cloud.google.com/bigquery/docs/getting-support"
  
  
  >

  <button>
  
    
    Send feedback
  
  </button>
</devsite-feedback>
       
    
    
  

  <div class="devsite-floating-action-buttons"></div></article>
~~~
