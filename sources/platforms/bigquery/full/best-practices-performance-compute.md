# BigQuery Optimize Query Computation

- Source ID: `SRC-BIGQUERY-PERFORMANCE-COMPUTE`
- URL: https://cloud.google.com/bigquery/docs/best-practices-performance-compute
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

  
    
    
    
    <h1 id="optimize-query-computation" data-text="Optimize query computation" tabindex="-1">Optimize query computation</h1>
    

<p>This document provides the best practices for optimizing your query performance.</p>

<p>When you run a query, you can
<a href="/bigquery/docs/query-insights">view the query plan</a>
in the Google Cloud console. You can also request execution details by using
the
<a href="/bigquery/docs/information-schema-jobs"><code translate="no" dir="ltr">INFORMATION_SCHEMA.JOBS*</code> views</a>
or the
<a href="/bigquery/docs/query-plan-explanation#api_sample_representation"><code translate="no" dir="ltr">jobs.get</code> REST API method</a>.</p>

<p>The query plan includes details about query stages and steps. These details can
help you identify ways to improve query performance. For example, if you notice
a stage that writes a lot more output than other stages, it might mean that you
need to filter earlier in the query.</p>

<p>To learn more about the query plan and see examples of how the query plan
information can help you to improve query performance, see
<a href="/bigquery/docs/query-insights">Get query performance insights</a>.
After addressing the query performance insights, you can further optimize your
query by performing the following tasks:</p>

<ul>
<li><a href="#reduce-data-processed">Reduce data that is to be processed</a></li>
<li><a href="#optimize-query-operations">Optimize query operations</a></li>
<li><a href="#reduce-query-output">Reduce the output of your query</a></li>
<li><a href="#avoid-anti-sql-patterns">Avoid anti-SQL patterns</a></li>
</ul>

<h2 id="reduce-data-processed" data-text="Reduce data processed" tabindex="-1">Reduce data processed</h2>

<p>You can reduce data that needs to be processed by using the options described in
the following sections.</p>

<h3 id="avoid_select_" data-text="Avoid SELECT *" tabindex="-1">Avoid <code translate="no" dir="ltr">SELECT *</code></h3>

<p><strong>Best practice:</strong> Control projection by querying only the columns that you
need.</p>

<p>Projection refers to the number of columns that are read by your query.
Projecting excess columns incurs additional (wasted) I/O and materialization
(writing results).</p>

<ul>
  <li><b>Use the data preview options.</b> If you are experimenting with data or exploring data, use one of the
    <a href="/bigquery/docs/best-practices-costs#preview-data">data preview options</a> instead of
    <code translate="no" dir="ltr">SELECT *</code>.</li>
  <li><b>Query specific columns.</b> Applying a <code translate="no" dir="ltr">LIMIT</code> clause to a <code translate="no" dir="ltr">SELECT *</code>
     query does not affect the amount
    of data read. You are billed for reading all bytes in the entire table, and the query counts against
    your free tier quota. Instead, query only the columns you need. For example, use <code translate="no" dir="ltr">SELECT * EXCEPT</code> to
    exclude one or more columns from the results.</li>
  <li><b>Use partitioned tables.</b> If you do require queries against every column in a table, but only against a
    subset of data, consider:</p>
    <ul>
    <li>Materializing results in a destination table and querying that table instead.</li>
      <li><a href="/bigquery/docs/creating-partitioned-tables">Partitioning your tables</a>
      and <a href="/bigquery/docs/querying-partitioned-tables">querying the relevant partition</a>.
      For example, use <code translate="no" dir="ltr">WHERE _PARTITIONDATE="2017-01-01"</code>
      to query only the January 1, 2017 partition.</li> 
</ul>
</ul>

<ul>
<li><p><strong>Use <code translate="no" dir="ltr">SELECT * EXCEPT</code></strong>. Querying a subset of data or using <code translate="no" dir="ltr">SELECT * EXCEPT</code>
can greatly reduce the amount of data that is read by a query. In addition to
the cost savings, performance is improved by reducing the amount of data I/O
and the amount of materialization that is required for the query results.</p>

<div></div><devsite-code><pre class="devsite-click-to-copy notranslate" dir="ltr" is-upgraded syntax="GoogleSQL"><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">*</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">EXCEPT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">col1</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">col2</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">col5</span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">mydataset</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">newtable</span></pre></devsite-code></li>
</ul>

<h3 id="avoid_excessive_wildcard_tables" data-text="Avoid excessive wildcard tables" tabindex="-1">Avoid excessive wildcard tables</h3>

<p><strong>Best practice:</strong> When querying <a href="/bigquery/docs/querying-wildcard-tables">wildcard tables</a>,
you must use the most granular prefix.</p>

<p>Use wildcards to query multiple tables by using concise SQL statements. Wildcard
tables are a union of tables that match the wildcard expression. Wildcard tables
are useful if your dataset contains the following resources:</p>

<ul>
<li>Multiple, similarly named tables with compatible schemas</li>
<li>Sharded tables</li>
</ul>
<aside class="note"><strong>Note:</strong><span> If your data allows it, use time-partitioned tables instead of sharded
tables. For more information, see
<a href="#avoid-oversharding-tables">Avoid oversharding tables</a>.</span></aside>
<p>When you query a wildcard table, specify a wildcard (<code translate="no" dir="ltr">*</code>) after the common
table prefix. For example, <code translate="no" dir="ltr">FROM <code translate="no" dir="ltr">bigquery-public-data.noaa_gsod.gsod194*</code></code>
queries all tables from the 1940s.</p>

<p>More granular prefixes perform better than shorter prefixes. For example,
<code translate="no" dir="ltr">FROM <code translate="no" dir="ltr">bigquery-public-data.noaa_gsod.gsod194*</code></code> performs better than
<code translate="no" dir="ltr">FROM <code translate="no" dir="ltr">bigquery-public-data.noaa_gsod.*</code></code> because fewer tables match
the wildcard.</p>

<h3 id="avoid_tables_sharded_by_date" data-text="Avoid tables sharded by date" tabindex="-1">Avoid tables sharded by date</h3>

<p><strong>Best practice:</strong> Don&#39;t use tables sharded by date (also called date-named
tables) in place of time-partitioned tables.</p>

<p><a href="/bigquery/docs/partitioned-tables">Partitioned tables</a> perform better than
date-named tables. When you create tables sharded by date,
BigQuery must maintain a copy of the schema and metadata for each
date-named table. Also, when date-named tables are used, BigQuery
might be required to verify permissions for each queried table. This practice
also adds to query overhead and impacts query performance.</p>

<h3 id="avoid-oversharding-tables" data-text="Avoid oversharding tables" tabindex="-1">Avoid oversharding tables</h3>

<p><strong>Best practice:</strong> Avoid creating too many table shards. If you are sharding
tables by date, use time-partitioned tables instead.</p>

<p>Table sharding refers to dividing large datasets into separate tables and adding
a suffix to each table name. If you are sharding tables by date, use
<a href="/bigquery/docs/creating-partitioned-tables">time-partitioned tables</a> instead.</p>

<p>Because of the low cost of BigQuery storage, you don&#39;t need to
optimize your tables for cost as you would in a relational database system.
Creating a large number of table shards has performance impacts that outweigh
any cost benefits.</p>

<p>Sharded tables require BigQuery to maintain schema, metadata,
and permissions for each shard. Because of the added overhead required to
maintain information on each shard, oversharding tables can impact query
performance.</p>

<p>The amount and source of data read by a query can impact query
performance and cost.</p>

<h3 id="prune_partitioned_queries" data-text="Prune partitioned queries" tabindex="-1">Prune partitioned queries</h3>

<p><strong>Best practice:</strong> When querying a <a href="/bigquery/docs/querying-partitioned-tables">partitioned table</a>,
to filter with partitions on partitioned tables, use the following columns:</p>

<ul>
<li>For ingestion-time partitioned tables, use the pseudocolumn <code translate="no" dir="ltr">_PARTITIONTIME</code></li>
<li>For partitioned tables such as the time-unit column-based and integer-range,
use the <em>partitioning column</em>.</li>
</ul>

<p>For time-unit partitioned tables, filtering the data with <code translate="no" dir="ltr">_PARTITIONTIME</code> or
<em>partitioning column</em> lets you specify a date or range of dates. For example,
the following <code translate="no" dir="ltr">WHERE</code> clause uses the <code translate="no" dir="ltr">_PARTITIONTIME</code> pseudocolumn to specify
partitions between January 1, 2016 and January 31, 2016:</p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">WHERE</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">_PARTITIONTIME</span>
<span class="devsite-syntax-k">BETWEEN</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-s2">"20160101"</span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-k">AND</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-s2">"20160131"</span><span class="devsite-syntax-p">)</span>
</code></pre></devsite-code>
<p>The query processes data only in the partitions that are indicated by the date
range. Filtering your partitions improves query performance and reduces costs.</p>

<h3 id="reduce_data_before_using_a_join" data-text="Reduce data before using a JOIN" tabindex="-1">Reduce data before using a <code translate="no" dir="ltr">JOIN</code></h3>

<p><strong>Best practice:</strong> Reduce the amount of data that is processed before a <code translate="no" dir="ltr">JOIN</code>
clause by performing aggregations.</p>

<p>Using a <a href="/bigquery/docs/reference/standard-sql/query-syntax#group_by_clause"><code translate="no" dir="ltr">GROUP BY</code> clause</a>
with <a href="/bigquery/docs/reference/standard-sql/aggregate_functions">aggregate functions</a>
is computationally intensive, because these types of queries use
<a href="https://cloud.google.com/blog/products/bigquery/in-memory-query-execution-in-google-bigquery">shuffle</a>.
As these queries are computationally intensive, you must use a <code translate="no" dir="ltr">GROUP BY</code>
clause only when necessary.</p>

<p>For queries with <code translate="no" dir="ltr">GROUP BY</code> and <code translate="no" dir="ltr">JOIN</code>, perform aggregation earlier in the query
to reduce the amount of data processed.
For example, the following query performs a <code translate="no" dir="ltr">JOIN</code> on two large tables without
any filtering beforehand:</p>

<div></div><devsite-code><pre class="devsite-click-to-copy notranslate" dir="ltr" is-upgraded syntax="GoogleSQL"><span class="devsite-syntax-k">WITH</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">users_posts</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">*</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">FROM</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-n devsite-syntax-n-Quoted">`bigquery-public-data`</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">stackoverflow</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">comments</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">c</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">JOIN</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-n devsite-syntax-n-Quoted">`bigquery-public-data`</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">stackoverflow</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">users</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">u</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">ON</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-n">c</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">user_id</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">u</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">id</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-k">SELECT</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">user_id</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nf">ANY_VALUE</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">display_name</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">display_name</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nf">ANY_VALUE</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">reputation</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">reputation</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nf">COUNT</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">text</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">comments_count</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">users_posts</span>
<span class="devsite-syntax-k">GROUP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">user_id</span>
<span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">comments_count</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">DESC</span>
<span class="devsite-syntax-k">LIMIT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">20</span><span class="devsite-syntax-p">;</span></pre></devsite-code>

<p>This query pre-aggregates the comment counts which reduces the amount of data
read for the <code translate="no" dir="ltr">JOIN</code>:</p>

<div></div><devsite-code><pre class="devsite-click-to-copy notranslate" dir="ltr" is-upgraded syntax="GoogleSQL"><span class="devsite-syntax-k">WITH</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">comments</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">SELECT</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-n">user_id</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-nf">COUNT</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">text</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">comments_count</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">FROM</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-n devsite-syntax-n-Quoted">`bigquery-public-data`</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">stackoverflow</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">comments</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">WHERE</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-n">user_id</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">IS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">NOT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-no">NULL</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">GROUP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">user_id</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">comments_count</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">DESC</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">LIMIT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">20</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-k">SELECT</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">user_id</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">display_name</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">reputation</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">comments_count</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">comments</span>
<span class="devsite-syntax-k">JOIN</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n devsite-syntax-n-Quoted">`bigquery-public-data`</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">stackoverflow</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">users</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">u</span>
<span class="devsite-syntax-k">ON</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">user_id</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">u</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">id</span>
<span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">comments_count</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">DESC</span><span class="devsite-syntax-p">;</span></pre></devsite-code>
<aside class="note"><strong>Note:</strong><span> <code translate="no" dir="ltr">WITH</code> clauses with common table expressions (CTEs) are used
for query readability, not performance. There is no guarantee that adding
a <code translate="no" dir="ltr">WITH</code> clause causes BigQuery to materialize temporary
intermediate tables and reuse the temporary result for multiple references.
The <code translate="no" dir="ltr">WITH</code> clause might be evaluated multiple times within a query, depending on
query optimizer decisions.</span></aside>
<h3 id="use_the_where_clause" data-text="Use the WHERE clause" tabindex="-1">Use the <code translate="no" dir="ltr">WHERE</code> clause</h3>

<p><strong>Best practice:</strong> Use a
<a href="/bigquery/docs/reference/standard-sql/query-syntax#where_clause"><code translate="no" dir="ltr">WHERE</code> clause</a>
to limit the amount of data a query returns. When possible, use <code translate="no" dir="ltr">BOOL</code>,
<code translate="no" dir="ltr">INT64</code>, <code translate="no" dir="ltr">FLOAT64</code>, or <code translate="no" dir="ltr">DATE</code> columns in the <code translate="no" dir="ltr">WHERE</code> clause.</p>

<p>Operations on <code translate="no" dir="ltr">BOOL</code>, <code translate="no" dir="ltr">INT64</code>, <code translate="no" dir="ltr">FLOAT64</code>, and <code translate="no" dir="ltr">DATE</code> columns are typically faster
than operations on <code translate="no" dir="ltr">STRING</code> or <code translate="no" dir="ltr">BYTE</code> columns. When possible, use a column that
uses one of these data types in the <code translate="no" dir="ltr">WHERE</code> clause to reduce the amount of
data returned by the query.</p>

<h3 id="use_materialized_views" data-text="Use materialized views" tabindex="-1">Use materialized views</h3>

<p><strong>Best practice:</strong> Use materialized views to precompute the results of a query
for increased performance and efficiency.</p>

<p><a href="/bigquery/docs/materialized-views-intro">Materialized views</a> are precomputed views that
periodically cache the results of a query for increased performance and
efficiency. BigQuery leverages precomputed results from
materialized views and <a href="/bigquery/docs/materialized-views-use#incremental_updates">whenever
possible</a> reads only
changes from the base tables to compute up-to-date results. Materialized
views can be queried directly or can be used by the
BigQuery optimizer to process queries to the base tables.</p>

<h3 id="use-bi-engine" data-text="Use BI Engine" tabindex="-1">Use BI Engine</h3>

<p><strong>Best practice:</strong> Use BigQuery BI Engine to accelerate queries by caching the
data that you use most frequently.</p>

<p>Consider adding a <a href="/bigquery/docs/bi-engine-query">BI Engine</a>
reservation to the project where the queries are being computed.
BigQuery BI Engine uses a vectorized query engine to accelerate the <code translate="no" dir="ltr">SELECT</code>
query performance.</p>

<h3 id="use_search_indexes" data-text="Use search indexes" tabindex="-1">Use search indexes</h3>

<p><strong>Best practice:</strong> Use search indexes for efficient row lookups when you need
to find individual rows of data in large tables.</p>

<p>A <a href="/bigquery/docs/search-intro">search index</a> is a data structure designed
to enable very efficient search with the <a href="/bigquery/docs/reference/standard-sql/search_functions#search"><code translate="no" dir="ltr">SEARCH</code> function</a>
but can also accelerate queries using <a href="/bigquery/docs/search#operator_and_function_optimization">other operators and functions</a>,
such as the equal (<code translate="no" dir="ltr">=</code>), <code translate="no" dir="ltr">IN</code>, or <code translate="no" dir="ltr">LIKE</code> operators and certain string and JSON
functions.</p>

<h2 id="optimize-query-operations" data-text="Optimize query operations" tabindex="-1">Optimize query operations</h2>

<p>You can optimize your query operations by using the options described in the
following sections.</p>

<h3 id="avoid_repeatedly_transforming_data" data-text="Avoid repeatedly transforming data" tabindex="-1">Avoid repeatedly transforming data</h3>

<p><strong>Best practice:</strong> If you are using SQL to perform ETL operations, then avoid
situations where you are repeatedly transforming the same data.</p>

<p>For example, if you are using SQL to trim strings or extract data by using
regular expressions, it is more performant to materialize the transformed
results in a destination table. Functions like regular expressions require
additional computation. Querying the destination table without the added
transformation overhead is much more efficient.</p>

<h3 id="avoid_multiple_evaluations_of_the_same_ctes" data-text="Avoid multiple evaluations of the same CTEs" tabindex="-1">Avoid multiple evaluations of the same CTEs</h3>

<p><strong>Best practice</strong>: Use <a href="/bigquery/docs/reference/standard-sql/procedural-language">procedural language</a>,
variables, <a href="/bigquery/docs/multi-statement-queries#temporary_tables">temporary tables</a>,
and automatically expiring tables to persist calculations and use them later in
the query.</p>

<p>When your query contains <a href="/bigquery/docs/reference/standard-sql/query-syntax#with_clause">common table expressions (CTEs)</a>
that are used in multiple places in the query, they might end up being evaluated
each time they are referenced. The query optimizer attempts to detect parts of
the query that could be executed only once, but this might not always be
possible. As a result, using a CTE might not help reduce internal query
complexity and resource consumption.</p>

<p>You can store the result of a CTE in a scalar variable or a temporary table
depending on the data that the CTE returns.</p>

<h3 id="avoid_repeated_joins_and_subqueries" data-text="Avoid repeated joins and subqueries" tabindex="-1">Avoid repeated joins and subqueries</h3>

<p><strong>Best practice:</strong> Avoid repeatedly joining the same tables and using the same
subqueries.</p>

<p>Instead of repeatedly joining the data, it might be more performant for you to
use nested repeated data to represent the relationships. Nested repeated data
saves you the performance impact of the communication bandwidth that a join
requires. It also saves you the I/O costs that you incur by repeatedly
reading and writing the same data. For more information, see
<a href="/bigquery/docs/best-practices-performance-nested">use nested and repeated fields</a>.</p>

<p>Similarly, repeating the same subqueries affects performance through repetitive
query processing. If you are using the same subqueries in multiple queries,
consider materializing the subquery results in a table. Then consume the
materialized data in your queries.</p>

<p>Materializing your subquery results improves performance and reduces the overall
amount of data that BigQuery reads and writes. The small
cost of storing the materialized data outweighs the performance impact of
repeated I/O and query processing.</p>

<h3 id="optimize_your_join_patterns" data-text="Optimize your join patterns" tabindex="-1">Optimize your join patterns</h3>

<p><strong>Best practice:</strong> For queries that join data from multiple tables, optimize
your join patterns by starting with the largest table.</p>

<p>When you create a query by using a <code translate="no" dir="ltr">JOIN</code> clause, consider the order in which you are
merging the data. The GoogleSQL query optimizer determines which table
should be on which side of the join. As a best practice, place the
table with the largest number of rows first, followed by the table with the
fewest rows, and then place the remaining tables by decreasing size.</p>

<p>When you have a large table as the left side of the <code translate="no" dir="ltr">JOIN</code> and a small one on
the right side of the <code translate="no" dir="ltr">JOIN</code>, a broadcast join is created. A broadcast join
sends all the data in the smaller table to each slot that processes the larger
table. It is advisable to perform the broadcast join first.</p>

<p>To view the size of the tables in your <code translate="no" dir="ltr">JOIN</code>, see
<a href="/bigquery/docs/tables#get_information_about_tables">Get information about tables</a>.</p>

<h3 id="specify_primary_key_and_foreign_key_constraints" data-text="Specify primary key and foreign key constraints" tabindex="-1">Specify primary key and foreign key constraints</h3>

<p><strong>Best practice:</strong> Specify key constraints in the table schema when table data
satisfies the data integrity requirements of
<a href="/bigquery/docs/primary-foreign-keys">primary key or foreign key constraints</a>.
The query engine can use the key constraints to optimize query plans.</p>

<p>BigQuery doesn&#39;t automatically check for data integrity, so you
must ensure that your data meets the constraints specified in the table schema.
If you don&#39;t maintain data integrity
in tables with specified constraints, your query results might be inaccurate.</p>

<h3 id="optimize_the_order_by_clause" data-text="Optimize the ORDER BY clause" tabindex="-1">Optimize the <code translate="no" dir="ltr">ORDER BY</code> clause</h3>

<p><strong>Best practice:</strong> When you use the <code translate="no" dir="ltr">ORDER BY</code> clause, ensure that you follow
the best practices:</p>

<ul>
<li><p><strong>Use <code translate="no" dir="ltr">ORDER BY</code> in the outermost query or within
<a href="/bigquery/docs/reference/standard-sql/window-function-calls">window clauses</a>.</strong>
Push complex operations to the end of the query.
Placing an <code translate="no" dir="ltr">ORDER BY</code> clause in the middle of a query greatly impacts
performance unless it is being used in a window function.</p>

<p>Another technique for ordering your query is to push complex operations, such as
regular expressions and mathematical functions, to the end of the query.
This technique reduces the data to be processed before the complex operations
are performed.</p></li>
<li><p><strong>Use a <code translate="no" dir="ltr">LIMIT</code> clause.</strong> If you are ordering a very large number of values
but don&#39;t need to have all of them returned, use a <code translate="no" dir="ltr">LIMIT</code> clause.
For example, the following query orders a very large result set and throws a
<code translate="no" dir="ltr">Resources exceeded</code> error. The query sorts by the <code translate="no" dir="ltr">title</code> column in <code translate="no" dir="ltr">mytable</code>.
The <code translate="no" dir="ltr">title</code> column contains millions of values.</p>

<div></div><devsite-code><pre class="devsite-click-to-copy notranslate" dir="ltr" is-upgraded syntax="GoogleSQL"><span class="devsite-syntax-k">SELECT</span>
<span class="devsite-syntax-n">title</span>
<span class="devsite-syntax-k">FROM</span>
<span class="devsite-syntax-n devsite-syntax-n-Quoted">`my-project.mydataset.mytable`</span>
<span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span>
<span class="devsite-syntax-n">title</span><span class="devsite-syntax-p">;</span></pre></devsite-code>

<p>To remove the error, use a query like the following:</p>

<div></div><devsite-code><pre class="devsite-click-to-copy notranslate" dir="ltr" is-upgraded syntax="GoogleSQL"><span class="devsite-syntax-k">SELECT</span>
<span class="devsite-syntax-n">title</span>
<span class="devsite-syntax-k">FROM</span>
<span class="devsite-syntax-n devsite-syntax-n-Quoted">`my-project.mydataset.mytable`</span>
<span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span>
<span class="devsite-syntax-n">title</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">DESC</span>
<span class="devsite-syntax-k">LIMIT</span>
<span class="devsite-syntax-mi">1000</span><span class="devsite-syntax-p">;</span></pre></devsite-code></li>
<li><p><strong>Use a window function.</strong> If you are ordering a very large number of values,
use a window function, and limit data before calling the window function.
For example, the following query lists the ten oldest
Stack Overflow users and their ranking, with the oldest account being ranked
lowest:</p>

<div></div><devsite-code><pre class="devsite-click-to-copy notranslate" dir="ltr" is-upgraded syntax="GoogleSQL"><span class="devsite-syntax-k">SELECT</span>
<span class="devsite-syntax-n">id</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-n">reputation</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-n">creation_date</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-nf">DENSE_RANK</span><span class="devsite-syntax-p">()</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">OVER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">creation_date</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">user_rank</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">bigquery</span><span class="devsite-syntax-o">-</span><span class="devsite-syntax-k">public</span><span class="devsite-syntax-o">-</span><span class="devsite-syntax-k">data</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">stackoverflow</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">users</span>
<span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">user_rank</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ASC</span>
<span class="devsite-syntax-k">LIMIT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">10</span><span class="devsite-syntax-p">;</span></pre></devsite-code>

<p>This query takes approximately 15 seconds to run. This query uses <code translate="no" dir="ltr">LIMIT</code> at
the end of the query, but not in the <code translate="no" dir="ltr">DENSE_RANK() OVER</code> window function.
Because of this, the query requires all of the data to be sorted on a
single worker node.</p>

<p>Instead, you should limit the dataset before computing the window function
in order to improve performance:</p>

<div></div><devsite-code><pre class="devsite-click-to-copy notranslate" dir="ltr" is-upgraded syntax="GoogleSQL"><span class="devsite-syntax-k">WITH</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">users</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span>
<span class="devsite-syntax-k">SELECT</span>
<span class="devsite-syntax-n">id</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-n">reputation</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-n">creation_date</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">bigquery</span><span class="devsite-syntax-o">-</span><span class="devsite-syntax-k">public</span><span class="devsite-syntax-o">-</span><span class="devsite-syntax-k">data</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">stackoverflow</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">users</span>
<span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">creation_date</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ASC</span>
<span class="devsite-syntax-k">LIMIT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">10</span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-k">SELECT</span>
<span class="devsite-syntax-n">id</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-n">reputation</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-n">creation_date</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-nf">DENSE_RANK</span><span class="devsite-syntax-p">()</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">OVER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">creation_date</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">user_rank</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">users</span>
<span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">user_rank</span><span class="devsite-syntax-p">;</span></pre></devsite-code>

<p>This query takes approximately 2 seconds to run, while returning the
same results as the previous query.</p>

<p>One caveat is that the <code translate="no" dir="ltr">DENSE_RANK()</code> function ranks the data within years, so
for ranking data that spans across multiple years, these queries don&#39;t give
identical results.</p></li>
</ul>

<h3 id="split_complex_queries_into_smaller_ones" data-text="Split complex queries into smaller ones" tabindex="-1">Split complex queries into smaller ones</h3>

<p><strong>Best practice</strong>: Leverage <a href="/bigquery/docs/multi-statement-queries">multi-statement query</a>
capabilities and <a href="/bigquery/docs/procedures">stored procedures</a>
to perform the computations that were designed as one complex query as multiple
smaller and simpler queries instead.</p>

<p>Complex queries, <code translate="no" dir="ltr">REGEX</code> functions, and layered subqueries or joins can be slow
and resource intensive to run. Trying to fit all computations in one huge
<code translate="no" dir="ltr">SELECT</code> statement, for example to make it a view, is sometimes an antipattern,
and it can result in a slow, resource-intensive query. In extreme cases, the
internal query plan becomes so complex that BigQuery is unable to
execute it.</p>

<p>Splitting up a complex query allows for materializing intermediate results in
variables or
<a href="/bigquery/docs/multi-statement-queries#temporary_tables">temporary tables</a>.
You can then use these intermediate results in other parts of the query. It is
increasingly useful when these results are needed in more than one place of the
query.</p>

<p>Often it lets you better express the true intent of parts of
the query with temporary tables being the data materialization points.</p>

<h3 id="use_nested_and_repeated_fields" data-text="Use nested and repeated fields" tabindex="-1">Use nested and repeated fields</h3>

<p>For information about how to denormalize data storage using nested and repeated
fields, see <a href="/bigquery/docs/best-practices-performance-nested">Use nested and repeated fields</a>.</p>

<h3 id="use_int64_data_types_in_joins" data-text="Use INT64 data types in joins" tabindex="-1">Use <code translate="no" dir="ltr">INT64</code> data types in joins</h3>

<p><strong>Best practice:</strong> Use <code translate="no" dir="ltr">INT64</code> data types in joins instead of <code translate="no" dir="ltr">STRING</code> data
types to reduce cost and improve comparison performance.</p>

<p>BigQuery doesn&#39;t index primary keys like traditional databases,
so the wider the join column is, the longer the comparison takes. Therefore,
using <code translate="no" dir="ltr">INT64</code> data types in joins is cheaper and more efficient than using
<code translate="no" dir="ltr">STRING</code> data types.</p>

<h2 id="reduce-query-output" data-text="Reduce query outputs" tabindex="-1">Reduce query outputs</h2>

<p>You can reduce the query outputs by using the options described in the following
the sections.</p>

<h3 id="materialize_large_result_sets" data-text="Materialize large result sets" tabindex="-1">Materialize large result sets</h3>

<p><strong>Best practice:</strong> Consider <a href="/bigquery/docs/writing-results#large-results">materializing large result sets</a>
to a destination table. Writing large result sets has performance and cost
impacts.</p>

<p>BigQuery limits cached results to approximately 10 GB
compressed. Queries that return larger results overtake this limit and
frequently result in the following error: <a href="/bigquery/troubleshooting-errors#responseTooLarge"><code translate="no" dir="ltr">Response too large</code></a>.</p>

<p>This error often occurs when you select a large number of fields from a table
with a considerable amount of data. Issues writing cached results can also occur
in ETL-style queries that normalize data without reduction or aggregation.</p>

<p>You can overcome the limitation on cached result size by using the following
options:</p>

<ul>
<li>Use filters to limit the result set</li>
<li>Use a <code translate="no" dir="ltr">LIMIT</code> clause to reduce the result set, especially if you are using
an <code translate="no" dir="ltr">ORDER BY</code> clause</li>
<li>Write the output data to a destination table</li>
</ul>

<p>You can page through the results using the BigQuery REST API. For more
information, see <a href="/bigquery/docs/paging-results">Paging through table data</a>.</p>
<aside class="note"><strong>Note:</strong><span> Writing very large result sets to destination tables impacts query
performance (I/O). In addition, you incur a small cost for storing the
destination table. You can automatically delete a large destination table by
using the dataset&#39;s <a href="/bigquery/docs/datasets#create-dataset">default table expiration</a>.
For more information, see <a href="/bigquery/docs/best-practices-storage#use-expiration-settings">Use the expiration settings</a>
in the storage best practices.</span></aside>
<h2 id="avoid-anti-sql-patterns" data-text="Avoid anti-SQL patterns" tabindex="-1">Avoid anti-SQL patterns</h2>

<p>The following best practices provide guidance on avoiding query anti-patterns
that impact performance in BigQuery.</p>

<h3 id="avoid_self_joins" data-text="Avoid self joins" tabindex="-1">Avoid self joins</h3>

<p><strong>Best practice:</strong> Instead of using self-joins, use a
<a href="/bigquery/docs/reference/standard-sql/analytic-function-concepts">window (analytic) function</a>
or the
<a href="/bigquery/docs/reference/standard-sql/query-syntax#pivot_operator"><code translate="no" dir="ltr">PIVOT</code> operator</a>.</p>

<p>Typically, self-joins are used to compute row-dependent relationships. The
result of using a self-join is that it potentially squares the number of output
rows. This increase in output data can cause poor performance.</p>

<h3 id="avoid_cross_joins" data-text="Avoid cross joins" tabindex="-1">Avoid cross joins</h3>

<p><strong>Best practice:</strong> Avoid joins that generate more outputs than inputs. When a
<code translate="no" dir="ltr">CROSS JOIN</code> is required, pre-aggregate your data.</p>

<p>Cross joins are queries where each row from the first table is joined to every
row in the second table, with non-unique keys on both sides. The worst
case output is the number of rows in the left table multiplied by the number of
rows in the right table. In extreme cases, the query might not finish.</p>

<p>If the query job completes, the query plan explanation shows output rows
versus input rows. You can confirm a <a href="https://en.wikipedia.org/wiki/Relational_algebra#Selection_and_cross_product" class="external">Cartesian product</a> 
by modifying the query to print the number of rows on each side of the <code translate="no" dir="ltr">JOIN</code>
clause, grouped by the join key. You can also check the performance insights
in the query execution graph for a
<a href="/bigquery/docs/query-insights#high_cardinality_join">high cardinality join</a>.</p>

<p>To avoid performance issues associated with joins that generate more outputs
than inputs:</p>

<ul>
<li>Use a <code translate="no" dir="ltr">GROUP BY</code> clause to
<a href="/bigquery/docs/best-practices-performance-compute#reduce_data_before_using_a_join">pre-aggregate the data</a>.</li>
<li>Use a window function. Window functions are often more efficient than using
a cross join. For more information, see <a href="/bigquery/docs/reference/standard-sql/window-function-calls">window functions</a>.</li>
</ul>

<h3 id="avoid-dml-update-single-rows" data-text="Avoid DML statements that update or insert single rows" tabindex="-1">Avoid DML statements that update or insert single rows</h3>

<p><strong>Best practice:</strong> Avoid <a href="/bigquery/docs/data-manipulation-language">DML</a>
statements that update or insert single rows. Batch your updates and
inserts.</p>

<p>Using point-specific DML statements is an attempt to treat
BigQuery like an Online Transaction Processing (OLTP) system.
BigQuery focuses on Online Analytical Processing (OLAP) by using
table scans and not point lookups. If you need OLTP-like behavior (single-row
updates or inserts), consider a database designed to support OLTP use cases such
as <a href="/sql/docs">Cloud SQL</a>.</p>

<p>BigQuery DML statements are intended for bulk updates. <code translate="no" dir="ltr">UPDATE</code>
and <code translate="no" dir="ltr">DELETE</code> DML statements in BigQuery are oriented towards
periodic rewrites of your data, not single row mutations. The <code translate="no" dir="ltr">INSERT</code> DML
statement is intended to be used sparingly. Inserts consume the same
modification <a href="/bigquery/quotas#data-manipulation-language-statements">quotas</a>
as load jobs. If your use case involves frequent single row inserts, consider
<a href="/bigquery/docs/streaming-data-into-bigquery">streaming</a> your data instead.</p>

<p>If batching your <code translate="no" dir="ltr">UPDATE</code> statements yields many tuples in very long queries,
you might approach the query length limit of 256 KB. To work around the query
length limit, consider whether your updates can be handled based on a logical
criteria instead of a series of direct tuple replacements.</p>

<p>For example, you could load your set of replacement records into another table,
then write the DML statement to update all values in the original table if the
non-updated columns match. For example, if the original data is in table <code translate="no" dir="ltr">t</code> and
the updates are staged in table <code translate="no" dir="ltr">u</code>, the query would look like the following:</p>

<div></div><devsite-code><pre class="devsite-click-to-copy notranslate" dir="ltr" is-upgraded syntax="GoogleSQL"><span class="devsite-syntax-k">UPDATE</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">dataset</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">t</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">t</span>
<span class="devsite-syntax-k">SET</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">my_column</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">u</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">my_column</span>
<span class="devsite-syntax-k">FROM</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">dataset</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">u</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">u</span>
<span class="devsite-syntax-k">WHERE</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">t</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">my_key</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">u</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">my_key</span></pre></devsite-code>

<h3 id="use_alias_names_for_similarly_named_columns" data-text="Use alias names for similarly named columns" tabindex="-1">Use alias names for similarly named columns</h3>

<p><strong>Best Practice:</strong> Use column and table aliases when you work with similarly
named columns across queries, including subqueries.</p>

<p>Aliases help to identify which columns and tables are referenced in addition to
your initial reference of the column. Using aliases can help you understand
and address problems in your SQL query, including finding the columns that are used
in subqueries.</p>

<h2 id="whats_next" data-text="What's next" tabindex="-1">What's next</h2>

<ul>
<li>Learn how to <a href="/bigquery/docs/best-practices-costs">optimize cost</a>.</li>
<li>Learn how to <a href="/bigquery/docs/best-practices-storage">optimize storage</a>.</li>
<li>Learn how to <a href="/bigquery/docs/best-practices-performance-functions">optimize functions</a>.</li>
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
