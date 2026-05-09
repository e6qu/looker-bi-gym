# BigQuery Aggregate Function Calls

- Source ID: `SRC-BIGQUERY-AGGREGATE-CALLS`
- URL: https://cloud.google.com/bigquery/docs/reference/standard-sql/aggregate-function-calls
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
    
    
    
      
        
  <a href="https://docs.cloud.google.com/bigquery/quotas"
      
        class="devsite-breadcrumb-link gc-analytics-event"
      
        data-category="Site-Wide Custom Events"
      
        data-label="Breadcrumbs"
      
        data-value="5"
      
        track-type="globalNav"
      
        track-name="breadcrumb"
      
        track-metadata-position="5"
      
        track-metadata-eventdetail=""
      
    >
    
          Reference
        
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
  
    <h1 class="devsite-page-title" tabindex="-1">
      Aggregate function calls<devsite-actions hidden data-nosnippet><devsite-feature-tooltip
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
  
      
    </h1>
  

  <devsite-toc class="devsite-nav"
    depth="2"
    devsite-toc-embedded
    >
  </devsite-toc>
  
    
  <div class="devsite-article-body clearfix
  ">

  
    
    
    
























































































































































































































  

  




























<!-- mdlint off(WHITESPACE_LINE_LENGTH) -->





<p>An aggregate function summarizes the rows of a group into a single value.
When an aggregate function is used with
the <code translate="no" dir="ltr">OVER</code> clause, it becomes a window function, which computes values over a
group of rows and then returns a single result for each row.</p>

<h2 id="aggregate_function_call_syntax" data-text="Aggregate function call syntax" tabindex="-1">Aggregate function call syntax</h2>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-n">function_name</span><span class="devsite-syntax-p">(</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">DISTINCT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">function_arguments</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">{</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">IGNORE</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">|</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">RESPECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">}</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">NULLS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">HAVING</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">{</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">MAX</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">|</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">MIN</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">}</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">having_expression</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">key</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">{</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ASC</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">|</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">DESC</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">}</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">...</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">LIMIT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">n</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>
<span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">OVER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">over_clause</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>
</code></pre></devsite-code>
<p><strong>Description</strong></p>

<p>Each aggregate function supports all or a subset of the
aggregate function call syntax. You can use the following syntax to build an
aggregate function:</p>

<ul>
<li><code translate="no" dir="ltr">DISTINCT</code>: Each distinct value of
<code translate="no" dir="ltr">expression</code> is aggregated only once into the result.</li>
<li><p><code translate="no" dir="ltr">IGNORE NULLS</code> or <code translate="no" dir="ltr">RESPECT NULLS</code>: If <code translate="no" dir="ltr">IGNORE NULLS</code> is
specified, the <code translate="no" dir="ltr">NULL</code> values are excluded from the result. If
<code translate="no" dir="ltr">RESPECT NULLS</code> is specified, both <code translate="no" dir="ltr">NULL</code> and non-<code translate="no" dir="ltr">NULL</code> values can be
included in the result.</p>

<p>If neither <code translate="no" dir="ltr">IGNORE NULLS</code> nor <code translate="no" dir="ltr">RESPECT NULLS</code> is specified, most functions
default to <code translate="no" dir="ltr">IGNORE NULLS</code> behavior but in a few cases <code translate="no" dir="ltr">NULL</code> values are
respected.</p></li>
<li><p><code translate="no" dir="ltr">HAVING MAX</code> or <code translate="no" dir="ltr">HAVING MIN</code>: Restricts the set of rows that the
function aggregates by a maximum or minimum value.
For details, see <a href="#max_min_clause">HAVING MAX and HAVING MIN clause</a>.</p></li>
<li><p><code translate="no" dir="ltr">ORDER BY</code>: Specifies the order of the values.</p>

<ul>
<li><p>For each sort key, the default sort direction is <code translate="no" dir="ltr">ASC</code>.</p></li>
<li><p><code translate="no" dir="ltr">NULL</code> is the minimum possible value, so <code translate="no" dir="ltr">NULL</code>s appear first
in <code translate="no" dir="ltr">ASC</code> sorts and last in <code translate="no" dir="ltr">DESC</code> sorts.</p></li>
<li><p>If you&#39;re using floating point data types, see
<a href="/bigquery/docs/reference/standard-sql/data-types#floating_point_semantics">Floating point semantics</a>
on ordering and grouping.</p></li>
<li><p>The <code translate="no" dir="ltr">ORDER BY</code> clause is supported only for aggregate functions that
depend on the order of their input. For those functions, if the
<code translate="no" dir="ltr">ORDER BY</code> clause is omitted, the output is nondeterministic.</p></li>
<li><p>This <code translate="no" dir="ltr">ORDER BY</code> clause can&#39;t be used if the <code translate="no" dir="ltr">OVER</code> clause is used.</p></li>
<li><p>If <code translate="no" dir="ltr">DISTINCT</code> is also specified, then
the sort key must be the same as <code translate="no" dir="ltr">expression</code>.</p></li>
</ul></li>
<li><p><code translate="no" dir="ltr">LIMIT</code>: Specifies the maximum number of <code translate="no" dir="ltr">expression</code> inputs in the
result.</p>

<ul>
<li><p>If the input is an <code translate="no" dir="ltr">ARRAY</code> value, the limit applies to the number of input
arrays, not the number of elements in the arrays. An empty array counts
as <code translate="no" dir="ltr">1</code>. A <code translate="no" dir="ltr">NULL</code> array isn&#39;t counted.</p></li>
<li><p>If the input is a <code translate="no" dir="ltr">STRING</code> value, the limit applies to the number of input
strings, not the number of characters or bytes in the inputs. An empty
string counts as <code translate="no" dir="ltr">1</code>. A <code translate="no" dir="ltr">NULL</code> string isn&#39;t counted.</p></li>
<li><p>The limit <code translate="no" dir="ltr">n</code> must be a constant <code translate="no" dir="ltr">INT64</code>.</p></li>
</ul></li>
<li><p><code translate="no" dir="ltr">OVER</code>: If the aggregate function is also a window function, use this clause
to define a window of rows around the row being evaluated. For each row,
the aggregate function result is computed using the selected window of rows as
input. If the <code translate="no" dir="ltr">OVER</code> clause is used, aggregate function
clauses, such as
<code translate="no" dir="ltr">DISTINCT</code>, aren&#39;t supported, but function call
modifiers, such as <code translate="no" dir="ltr">IGNORE_NULLS</code>,
are still supported. To learn more about the <code translate="no" dir="ltr">OVER</code> clause,
see <a href="/bigquery/docs/reference/standard-sql/window-function-calls">Window function calls</a>.</p></li>
</ul>

<p><strong>Details</strong></p>

<p>The clauses in an aggregate function call are applied in the following order:</p>

<ul>
<li><code translate="no" dir="ltr">OVER</code></li>
<li><code translate="no" dir="ltr">HAVING MAX</code>/<code translate="no" dir="ltr">HAVING MIN</code></li>
<li><code translate="no" dir="ltr">IGNORE NULLS</code> or <code translate="no" dir="ltr">RESPECT NULLS</code></li>
<li><code translate="no" dir="ltr">DISTINCT</code></li>
<li><code translate="no" dir="ltr">ORDER BY</code></li>
<li><code translate="no" dir="ltr">LIMIT</code></li>
</ul>

<p>When used in conjunction with a <code translate="no" dir="ltr">GROUP BY</code> clause, the groups summarized
typically have at least one row. When the associated <code translate="no" dir="ltr">SELECT</code> statement has
no <code translate="no" dir="ltr">GROUP BY</code> clause or when certain aggregate function modifiers filter rows
from the group to be summarized, it&#39;s possible that the aggregate function
needs to summarize an empty group.</p>

<h2 id="max_min_clause" data-text="Restrict aggregation by a maximum or minimum value" tabindex="-1">Restrict aggregation by a maximum or minimum value</h2>

<p>Some aggregate functions support two optional clauses that are called
<code translate="no" dir="ltr">HAVING MAX</code> and <code translate="no" dir="ltr">HAVING MIN</code>. These clauses restrict the set of rows that a
function aggregates to rows that have a maximum or minimum value in a particular
column.</p>

<h3 id="having_max" data-text="HAVING MAX clause" tabindex="-1">HAVING MAX clause</h3>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">HAVING</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">MAX</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">having_expression</span>
</code></pre></devsite-code>
<p><code translate="no" dir="ltr">HAVING MAX</code> restricts the set of input rows that the function aggregates to
only those with the maximum <code translate="no" dir="ltr">having_expression</code> value. The maximum value is
computed as the result of <code translate="no" dir="ltr">MAX(having_expression)</code> across rows in the group.
Only rows whose <code translate="no" dir="ltr">having_expression</code> value is equal to this maximum value (using
SQL equality semantics) are included in the aggregation. All other rows are
ignored in the aggregation.</p>

<p>This clause supports all <a href="/bigquery/docs/reference/standard-sql/data-types#data_type_properties">orderable data types</a>,
except for <code translate="no" dir="ltr">ARRAY</code>.</p>

<p><strong>Examples</strong></p>

<p>In the following query, rows with the most inches of precipitation, <code translate="no" dir="ltr">4</code>, are
added to a group, and then the <code translate="no" dir="ltr">year</code> for one of these rows is produced.
Which row is produced is nondeterministic, not random.</p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">WITH</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">Precipitation</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">2009</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">year</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'spring'</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">season</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">3</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">inches</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">2001</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'winter'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">4</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">2003</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'fall'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">1</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">2002</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'spring'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">4</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">2005</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'summer'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">1</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">ANY_VALUE</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-k">year</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">HAVING</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">MAX</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">inches</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">any_year_with_max_inches</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">Precipitation</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*--------------------------+</span>
<span class="devsite-syntax-cm"> | any_year_with_max_inches |</span>
<span class="devsite-syntax-cm"> +--------------------------+</span>
<span class="devsite-syntax-cm"> | 2001                     |</span>
<span class="devsite-syntax-cm"> +--------------------------*/</span>
</code></pre></devsite-code>
<h3 id="having_min" data-text="HAVING MIN clause" tabindex="-1">HAVING MIN clause</h3>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">HAVING</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">MIN</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">having_expression</span>
</code></pre></devsite-code>
<p><code translate="no" dir="ltr">HAVING MIN</code> restricts the set of input rows that the function aggregates to
only those with the minimum <code translate="no" dir="ltr">having_expression</code> value. The minimum value is
computed as the result of <code translate="no" dir="ltr">MIN(having_expression)</code> across rows in the group.
Only rows whose <code translate="no" dir="ltr">having_expression</code> value is equal to this minimum value (using
SQL equality semantics) are included in the aggregation. All other rows are
ignored in the aggregation.</p>

<p>This clause supports all <a href="/bigquery/docs/reference/standard-sql/data-types#data_type_properties">orderable data types</a>,
except for <code translate="no" dir="ltr">ARRAY</code>.</p>

<p><strong>Examples</strong></p>

<p>In the following query, rows with the fewest inches of precipitation, <code translate="no" dir="ltr">1</code>,
are added to a group, and then the <code translate="no" dir="ltr">year</code> for one of these rows is produced.
Which row is produced is nondeterministic, not random.</p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">WITH</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">Precipitation</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">2009</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">year</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'spring'</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">season</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">3</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">inches</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">2001</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'winter'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">4</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">2003</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'fall'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">1</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">2002</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'spring'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">4</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">2005</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'summer'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">1</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">ANY_VALUE</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-k">year</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">HAVING</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">MIN</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">inches</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">any_year_with_min_inches</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">Precipitation</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*--------------------------+</span>
<span class="devsite-syntax-cm"> | any_year_with_min_inches |</span>
<span class="devsite-syntax-cm"> +--------------------------+</span>
<span class="devsite-syntax-cm"> | 2003                     |</span>
<span class="devsite-syntax-cm"> +--------------------------*/</span>
</code></pre></devsite-code>
<h2 id="aggregate_function_examples" data-text="Aggregate function examples" tabindex="-1">Aggregate function examples</h2>

<p>A simple aggregate function call for <code translate="no" dir="ltr">COUNT</code>, <code translate="no" dir="ltr">MIN</code>, and <code translate="no" dir="ltr">MAX</code> looks like this:</p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nf">COUNT</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-err">*</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">total_count</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nf">COUNT</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">fruit</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">non_null_count</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">MIN</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">fruit</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">min</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">MAX</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">fruit</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">max</span>
<span class="devsite-syntax-k">FROM</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-p">(</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-no">NULL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">fruit</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'apple'</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">fruit</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'pear'</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">fruit</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'orange'</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">fruit</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-p">)</span>

<span class="devsite-syntax-cm">/*-------------+----------------+-------+------+</span>
<span class="devsite-syntax-cm"> | total_count | non_null_count | min   | max  |</span>
<span class="devsite-syntax-cm"> +-------------+----------------+-------+------+</span>
<span class="devsite-syntax-cm"> | 4           | 3              | apple | pear |</span>
<span class="devsite-syntax-cm"> +-------------+----------------+-------+------*/</span>
</code></pre></devsite-code>
<p>In the following example, the average of <code translate="no" dir="ltr">x</code> over a specified window is returned
for each row. To learn more about windows and how to use them, see
<a href="/bigquery/docs/reference/standard-sql/window-function-calls">Window function calls</a>.</p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nf">AVG</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">OVER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ROWS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BETWEEN</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">1</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">PRECEDING</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AND</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">CURRENT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ROW</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">avg</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNNEST</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-mi">0</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">4</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">4</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">5</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*------+------+</span>
<span class="devsite-syntax-cm"> | x    | avg  |</span>
<span class="devsite-syntax-cm"> +------+------+</span>
<span class="devsite-syntax-cm"> | 0    | 0    |</span>
<span class="devsite-syntax-cm"> | 2    | 1    |</span>
<span class="devsite-syntax-cm"> | 4    | 3    |</span>
<span class="devsite-syntax-cm"> | 4    | 4    |</span>
<span class="devsite-syntax-cm"> | 5    | 4.5  |</span>
<span class="devsite-syntax-cm"> +------+------*/</span>
</code></pre></devsite-code>
<!-- mdlint off(WHITESPACE_LINE_LENGTH) -->

<!-- mdlint on -->

  

  
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
