# BigQuery Window Function Calls

- Source ID: `SRC-BIGQUERY-WINDOW-FUNCTIONS`
- URL: https://cloud.google.com/bigquery/docs/reference/standard-sql/window-function-calls
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
      Window function calls<devsite-actions hidden data-nosnippet><devsite-feature-tooltip
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





<p>A window function, also known as an analytic function, computes values
over a group of rows and returns a single result for <em>each</em> row. This is
different from an aggregate function, which returns a single result for
<em>a group</em> of rows.</p>

<p>A window function includes an <code translate="no" dir="ltr">OVER</code> clause, which defines a window of rows
around the row being evaluated. For each row, the window function result
is computed using the selected window of rows as input, possibly
doing aggregation.</p>

<p>With window functions you can compute moving averages, rank items, calculate
cumulative sums, and perform other analyses.</p>

<h2 id="syntax" data-text="Window function syntax" tabindex="-1">Window function syntax</h2>

<div></div><devsite-code><pre translate="no" dir="ltr" is-upgraded>
function_name ( [ argument_list ] ) OVER over_clause

<a href="#def_over_clause">over_clause</a>:
  { named_window | ( [ window_specification ] ) }

<a href="#def_window_spec">window_specification</a>:
  [ named_window ]
  [ PARTITION BY partition_expression [, ...] ]
  [ ORDER BY expression [ { ASC | DESC }  ] [, ...] ]
  [ window_frame_clause ]

<a href="#def_window_frame">window_frame_clause</a>:
  { rows_range } { <a href="#def_window_frame">frame_start</a> | <a href="#def_window_frame">frame_between</a> }

<a href="#def_window_frame">rows_range</a>:
  { ROWS | RANGE }
</pre></devsite-code>

<p><strong>Description</strong></p>

<p>A window function computes results over a group of rows. You can use the
following syntax to build a window function:</p>

<ul>
<li><p><code translate="no" dir="ltr">function_name</code>: The function that performs a window operation.</p>

<p>For example, the numbering function <code translate="no" dir="ltr">RANK()</code> could be used here.</p></li>
<li><p><code translate="no" dir="ltr">argument_list</code>: Arguments that are specific to the function.
Some functions have them, some don&#39;t.
Not all clauses are supported
when the function is used with the <code translate="no" dir="ltr">OVER</code> clause as a window function. For
example, the <code translate="no" dir="ltr">DISTINCT</code> clause can&#39;t be used with the <code translate="no" dir="ltr">OVER</code> clause. For
more information, see
<a href="/bigquery/docs/reference/standard-sql/aggregate-function-calls">Aggregate function calls</a>.</p></li>
<li><p><code translate="no" dir="ltr">OVER</code>: Keyword required in the window function syntax preceding
the <a href="#def_over_clause"><code translate="no" dir="ltr">OVER</code> clause</a>.</p></li>
<li><p><a href="#def_over_clause"><code translate="no" dir="ltr">over_clause</code></a>: References a window that defines a group
of rows in a table upon which to use a window function.</p></li>
<li><p><a href="#def_window_spec"><code translate="no" dir="ltr">window_specification</code></a>: Defines the specifications for
the window.</p></li>
<li><p><a href="#def_window_frame"><code translate="no" dir="ltr">window_frame_clause</code></a>: Defines the window frame
for the window.</p></li>
<li><p><a href="#def_window_frame"><code translate="no" dir="ltr">rows_range</code></a>: Defines the physical rows or a
logical range for a window frame.</p></li>
</ul>

<p><strong>Notes</strong></p>

<p>A window function can appear as a scalar expression operand in
the following places in the query:</p>

<ul>
<li>The <code translate="no" dir="ltr">SELECT</code> list. If the window function appears in the <code translate="no" dir="ltr">SELECT</code> list,
its argument list and <code translate="no" dir="ltr">OVER</code> clause can&#39;t refer to aliases introduced
in the same <code translate="no" dir="ltr">SELECT</code> list.</li>
<li>The <code translate="no" dir="ltr">ORDER BY</code> clause. If the window function appears in the <code translate="no" dir="ltr">ORDER BY</code>
clause of the query, its argument list can refer to <code translate="no" dir="ltr">SELECT</code>
list aliases.</li>
<li>The <code translate="no" dir="ltr">QUALIFY</code> clause.</li>
</ul>

<p>A window function can&#39;t refer to another window function in its
argument list or its <code translate="no" dir="ltr">OVER</code> clause, even indirectly through an alias.</p>

<p>A window function is evaluated after aggregation. For example, the
<code translate="no" dir="ltr">GROUP BY</code> clause and non-window aggregate functions are evaluated first.
Because aggregate functions are evaluated before window functions,
aggregate functions can be used as input operands to window functions.</p>

<p><strong>Returns</strong></p>

<p>A single result for each row in the input.</p>

<h3 id="def_over_clause" data-text="Defining the OVER clause" tabindex="-1">Defining the <code translate="no" dir="ltr">OVER</code> clause</h3>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-n">function_name</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">argument_list</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">OVER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">over_clause</span>

<span class="devsite-syntax-n">over_clause</span><span class="devsite-syntax-err">:</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">{</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">named_window</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">|</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">window_specification</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">}</span>
</code></pre></devsite-code>
<p><strong>Description</strong></p>

<p>The <code translate="no" dir="ltr">OVER</code> clause references a window that defines a group of rows in a table
upon which to use a window function. You can provide a
<a href="#ref_named_window"><code translate="no" dir="ltr">named_window</code></a> that is
<a href="/bigquery/docs/reference/standard-sql/query-syntax#window_clause">defined in your query</a>, or you can
define the <a href="#def_window_spec">specifications for a new window</a>.</p>

<p><strong>Notes</strong></p>

<p>If neither a named window nor window specification is provided, all
input rows are included in the window for every row.</p>

<p><strong>Examples using the <code translate="no" dir="ltr">OVER</code> clause</strong></p>

<p>These queries use window specifications:</p>

<ul>
<li><a href="#compute_a_grand_total">Compute a grand total</a></li>
<li><a href="#compute_a_subtotal">Compute a subtotal</a></li>
<li><a href="#compute_a_cumulative_sum">Compute a cumulative sum</a></li>
<li><a href="#compute_a_moving_average">Compute a moving average</a></li>
<li><a href="#compute_the_number_of_items_within_a_range">Compute the number of items within a range</a></li>
<li><a href="#get_the_most_popular_item_in_each_category">Get the most popular item in each category</a></li>
<li><a href="#get_the_last_value_in_a_range">Get the last value in a range</a></li>
<li><a href="#compute_rank">Compute rank</a></li>
</ul>

<p>These queries use a named window:</p>

<ul>
<li><a href="#get_the_last_value_in_a_range">Get the last value in a range</a></li>
<li><a href="#def_use_named_window">Use a named window in a window frame clause</a></li>
</ul>

<h3 id="def_window_spec" data-text="Defining the window specification" tabindex="-1">Defining the window specification</h3>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-n">window_specification</span><span class="devsite-syntax-err">:</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">named_window</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">PARTITION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">partition_expression</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">...</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">expression</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">{</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ASC</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">|</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">DESC</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">}</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">...</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">window_frame_clause</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>
</code></pre></devsite-code>
<p><strong>Description</strong></p>

<p>Defines the specifications for the window.</p>

<ul>
<li><a href="#ref_named_window"><code translate="no" dir="ltr">named_window</code></a>: The name of an existing window that was
defined with a <a href="/bigquery/docs/reference/standard-sql/query-syntax#window_clause"><code translate="no" dir="ltr">WINDOW</code> clause</a>.</li>
</ul>
<aside class="special"><strong>Important:</strong><span> If you use a named window, special rules apply to
<code translate="no" dir="ltr">PARTITION BY</code>, <code translate="no" dir="ltr">ORDER BY</code>, and <code translate="no" dir="ltr">window_frame_clause</code>. See
<a href="#named_window_rules">Rules for using a named window in the window specification</a>.</span></aside>
<ul>
<li><code translate="no" dir="ltr">PARTITION BY</code>: Breaks up the input rows into separate partitions, over
which the window function is independently evaluated.
<ul>
<li>A <code translate="no" dir="ltr">partition_expression</code> computes a value that determines which partition
each row falls into.</li>
<li>Multiple partition expressions are allowed in the <code translate="no" dir="ltr">PARTITION BY</code> clause.</li>
<li>An expression can&#39;t contain floating point types, non-groupable types,
constants, or window functions.</li>
<li>If this optional clause isn&#39;t used, all rows in the input table
comprise a single partition.</li>
</ul></li>
<li><p><code translate="no" dir="ltr">ORDER BY</code>: Defines how rows are ordered within a partition.</p>

<p>This clause is optional in most situations, but is required in some
cases for <a href="/bigquery/docs/reference/standard-sql/navigation_functions">navigation functions</a>.</p></li>
<li><p><a href="#def_window_frame"><code translate="no" dir="ltr">window_frame_clause</code></a>: For aggregate analytic
functions, defines the window frame within the current partition.
The window frame determines what to include in the window.
If this clause is used, <code translate="no" dir="ltr">ORDER BY</code> is required except for fully
unbounded windows.</p></li>
</ul>

<p><strong>Notes</strong></p>

<p>If neither the <code translate="no" dir="ltr">ORDER BY</code> clause nor window frame clause are present,
the window frame includes all rows in that partition.</p>

<p>For aggregate analytic functions, if the <code translate="no" dir="ltr">ORDER BY</code> clause is present but
the window frame clause isn&#39;t, the following window frame clause is
used by default:</p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-kt">RANGE</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BETWEEN</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNBOUNDED</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">PRECEDING</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AND</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">CURRENT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ROW</span>
</code></pre></devsite-code>
<p>For example, the following queries are equivalent:</p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">book</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">LAST_VALUE</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">book</span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">OVER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">year</span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">Library</span>
</code></pre></devsite-code><div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">book</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">LAST_VALUE</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">book</span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">OVER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">year</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-kt">RANGE</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BETWEEN</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNBOUNDED</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">PRECEDING</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AND</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">CURRENT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ROW</span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">Library</span>
</code></pre></devsite-code>
<p><a id="named_window_rules"></a>
<strong>Rules for using a named window in the window specification</strong></p>

<p>If you use a named window in your window specifications, these rules apply:</p>

<ul>
<li>The specifications in the named window can be extended
with new specifications that you define in the window specification clause.</li>
<li>You can&#39;t have redundant definitions. If you have an <code translate="no" dir="ltr">ORDER BY</code> clause
in the named window and the window specification clause, an
error is thrown.</li>
<li><p>The order of clauses matters. <code translate="no" dir="ltr">PARTITION BY</code> must come first,
followed by <code translate="no" dir="ltr">ORDER BY</code> and <code translate="no" dir="ltr">window_frame_clause</code>. If you add a named window,
its window specifications are processed first.</p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-err">--</span><span class="devsite-syntax-n">this</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">works</span><span class="devsite-syntax-err">:</span>
<span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">item</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">purchases</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">LAST_VALUE</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">item</span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">OVER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">ItemWindow</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ROWS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BETWEEN</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">PRECEDING</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AND</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">FOLLOWING</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">most_popular</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">Produce</span>
<span class="devsite-syntax-k">WINDOW</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">ItemWindow</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">purchases</span><span class="devsite-syntax-p">)</span>

<span class="devsite-syntax-err">--</span><span class="devsite-syntax-n">this</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">doesn</span><span class="devsite-syntax-s1">'t work:</span>
<span class="devsite-syntax-s1">SELECT item, purchases, LAST_VALUE(item)</span>
<span class="devsite-syntax-s1">  OVER (ItemWindow ORDER BY purchases) AS most_popular</span>
<span class="devsite-syntax-s1">FROM Produce</span>
<span class="devsite-syntax-s1">WINDOW ItemWindow AS (ROWS BETWEEN 2 PRECEDING AND 2 FOLLOWING)</span>
</code></pre></devsite-code></li>
<li><p>A named window and <code translate="no" dir="ltr">PARTITION BY</code> can&#39;t appear together in the
window specification. If you need <code translate="no" dir="ltr">PARTITION BY</code>, add it to the named window.</p></li>
<li><p>You can&#39;t refer to a named window in an <code translate="no" dir="ltr">ORDER BY</code> clause, an outer query,
or any subquery.</p></li>
</ul>

<p><strong>Examples using the window specification</strong></p>

<p>These queries define partitions in a window function:</p>

<ul>
<li><a href="#compute_a_subtotal">Compute a subtotal</a></li>
<li><a href="#compute_a_cumulative_sum">Compute a cumulative sum</a></li>
<li><a href="#get_the_most_popular_item_in_each_category">Get the most popular item in each category</a></li>
<li><a href="#get_the_last_value_in_a_range">Get the last value in a range</a></li>
<li><a href="#compute_rank">Compute rank</a></li>
<li><a href="#def_use_named_window">Use a named window in a window frame clause</a></li>
</ul>

<p>These queries include a named window in a window specification:</p>

<ul>
<li><a href="#get_the_last_value_in_a_range">Get the last value in a range</a></li>
<li><a href="#def_use_named_window">Use a named window in a window frame clause</a></li>
</ul>

<p>These queries define how rows are ordered in a partition:</p>

<ul>
<li><a href="#compute_a_subtotal">Compute a subtotal</a></li>
<li><a href="#compute_a_cumulative_sum">Compute a cumulative sum</a></li>
<li><a href="#compute_a_moving_average">Compute a moving average</a></li>
<li><a href="#compute_the_number_of_items_within_a_range">Compute the number of items within a range</a></li>
<li><a href="#get_the_most_popular_item_in_each_category">Get the most popular item in each category</a></li>
<li><a href="#get_the_last_value_in_a_range">Get the last value in a range</a></li>
<li><a href="#compute_rank">Compute rank</a></li>
<li><a href="#def_use_named_window">Use a named window in a window frame clause</a></li>
</ul>

<h3 id="def_window_frame" data-text="Defining the window frame clause" tabindex="-1">Defining the window frame clause</h3>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-n">window_frame_clause</span><span class="devsite-syntax-err">:</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">{</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">rows_range</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">}</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">{</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">frame_start</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">|</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">frame_between</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">}</span>

<span class="devsite-syntax-n">rows_range</span><span class="devsite-syntax-err">:</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">{</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ROWS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">|</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">RANGE</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">}</span>

<span class="devsite-syntax-n">frame_between</span><span class="devsite-syntax-err">:</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">{</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">BETWEEN</span><span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">unbounded_preceding</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AND</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">frame_end_a</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-err">|</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BETWEEN</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">numeric_preceding</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AND</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">frame_end_a</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-err">|</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BETWEEN</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">current_row</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AND</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">frame_end_b</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-err">|</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BETWEEN</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">numeric_following</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AND</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">frame_end_c</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">}</span>

<span class="devsite-syntax-n">frame_start</span><span class="devsite-syntax-err">:</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">{</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">unbounded_preceding</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">|</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">numeric_preceding</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">|</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">current_row</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">}</span>

<span class="devsite-syntax-n">frame_end_a</span><span class="devsite-syntax-err">:</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">{</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">numeric_preceding</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">|</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">current_row</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">|</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">numeric_following</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">|</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">unbounded_following</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">}</span>

<span class="devsite-syntax-n">frame_end_b</span><span class="devsite-syntax-err">:</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">{</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">current_row</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">|</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">numeric_following</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">|</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">unbounded_following</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">}</span>

<span class="devsite-syntax-n">frame_end_c</span><span class="devsite-syntax-err">:</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">{</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">numeric_following</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">|</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">unbounded_following</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">}</span>

<span class="devsite-syntax-n">unbounded_preceding</span><span class="devsite-syntax-err">:</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNBOUNDED</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">PRECEDING</span>

<span class="devsite-syntax-n">numeric_preceding</span><span class="devsite-syntax-err">:</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">numeric_expression</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">PRECEDING</span>

<span class="devsite-syntax-n">unbounded_following</span><span class="devsite-syntax-err">:</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNBOUNDED</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">FOLLOWING</span>

<span class="devsite-syntax-n">numeric_following</span><span class="devsite-syntax-err">:</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">numeric_expression</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">FOLLOWING</span>

<span class="devsite-syntax-n">current_row</span><span class="devsite-syntax-err">:</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">CURRENT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ROW</span>
</code></pre></devsite-code>
<p>The window frame clause defines the window frame around the current row within
a partition, over which the window function is evaluated.
Only aggregate analytic functions can use a window frame clause.</p>

<ul>
<li><p><code translate="no" dir="ltr">rows_range</code>: A clause that defines a window frame with physical rows
or a logical range.</p>

<ul>
<li><code translate="no" dir="ltr">ROWS</code>: Computes the window frame based on physical offsets from the
current row. For example, you could include two rows before and after
the current row.</li>
<li><code translate="no" dir="ltr">RANGE</code>: Computes the window frame based on a logical range of rows
around the current row, based on the current row’s <code translate="no" dir="ltr">ORDER BY</code> key value.
The provided range value is added or subtracted to the current row&#39;s
key value to define a starting or ending range boundary for the
window frame. In a range-based window frame, there must be exactly one
expression in the <code translate="no" dir="ltr">ORDER BY</code> clause, and the expression must have a
numeric type.</li>
</ul>
<aside class="tip"><strong>Tip:</strong><span> If you want to use a range with a date, use <code translate="no" dir="ltr">ORDER BY</code> with the
<code translate="no" dir="ltr">UNIX_DATE()</code> function. If you want to use a range with a timestamp,
use the <code translate="no" dir="ltr">UNIX_SECONDS()</code>, <code translate="no" dir="ltr">UNIX_MILLIS()</code>, or <code translate="no" dir="ltr">UNIX_MICROS()</code> function.</span></aside></li>
<li><p><code translate="no" dir="ltr">frame_between</code>: Creates a window frame with a lower and upper boundary.
The first boundary represents the lower boundary. The second boundary
represents the upper boundary. Only certain boundary combinations can be
used, as show in the preceding syntax.</p>

<ul>
<li>Define the beginning of the window frame with <code translate="no" dir="ltr">unbounded_preceding</code>,
<code translate="no" dir="ltr">numeric_preceding</code>, <code translate="no" dir="ltr">numeric_following</code>, or <code translate="no" dir="ltr">current_row</code>.
<ul>
<li><code translate="no" dir="ltr">unbounded_preceding</code>: The window frame starts at the beginning of the
partition.</li>
<li><code translate="no" dir="ltr">numeric_preceding</code> or <code translate="no" dir="ltr">numeric_following</code>: The start of the window
frame is relative to the
current row.</li>
<li><code translate="no" dir="ltr">current_row</code>: The window frame starts at the current row.</li>
</ul></li>
<li>Define the end of the window frame with <code translate="no" dir="ltr">numeric_preceding</code>,
<code translate="no" dir="ltr">numeric_following</code>, <code translate="no" dir="ltr">current_row</code>, or <code translate="no" dir="ltr">unbounded_following</code>.
<ul>
<li><code translate="no" dir="ltr">numeric_preceding</code> or <code translate="no" dir="ltr">numeric_following</code>: The end of the window
frame is relative to the current row.</li>
<li><code translate="no" dir="ltr">current_row</code>: The window frame ends at the current row.</li>
<li><code translate="no" dir="ltr">unbounded_following</code>: The window frame ends at the end of the
partition.</li>
</ul></li>
</ul></li>
<li><p><code translate="no" dir="ltr">frame_start</code>: Creates a window frame with a lower boundary.
The window frame ends at the current row.</p>

<ul>
<li><code translate="no" dir="ltr">unbounded_preceding</code>: The window frame starts at the beginning of the
partition.</li>
<li><code translate="no" dir="ltr">numeric_preceding</code>: The start of the window frame is relative to the
current row.</li>
<li><code translate="no" dir="ltr">current_row</code>: The window frame starts at the current row.</li>
</ul></li>
<li><p><code translate="no" dir="ltr">numeric_expression</code>: An expression that represents a numeric type.
The numeric expression must be a constant, non-negative integer
or parameter.</p></li>
</ul>

<p><strong>Notes</strong></p>

<p>If a boundary extends beyond the beginning or end of a partition,
the window frame will only include rows from within that partition.</p>

<p>You can&#39;t use a window frame clause with some
<a href="/bigquery/docs/reference/standard-sql/navigation_functions">navigation functions</a> and
<a href="/bigquery/docs/reference/standard-sql/numbering_functions">numbering functions</a>,
such as <code translate="no" dir="ltr">RANK()</code>.</p>

<p><strong>Examples using the window frame clause</strong></p>

<p>These queries compute values with <code translate="no" dir="ltr">ROWS</code>:</p>

<ul>
<li><a href="#compute_a_cumulative_sum">Compute a cumulative sum</a></li>
<li><a href="#compute_a_moving_average">Compute a moving average</a></li>
<li><a href="#get_the_most_popular_item_in_each_category">Get the most popular item in each category</a></li>
<li><a href="#get_the_last_value_in_a_range">Get the last value in a range</a></li>
<li><a href="#def_use_named_window">Use a named window in a window frame clause</a></li>
</ul>

<p>These queries compute values with <code translate="no" dir="ltr">RANGE</code>:</p>

<ul>
<li><a href="#compute_the_number_of_items_within_a_range">Compute the number of items within a range</a></li>
</ul>

<p>These queries compute values with a partially or fully unbound window:</p>

<ul>
<li><a href="#compute_a_grand_total">Compute a grand total</a></li>
<li><a href="#compute_a_subtotal">Compute a subtotal</a></li>
<li><a href="#compute_a_cumulative_sum">Compute a cumulative sum</a></li>
<li><a href="#get_the_most_popular_item_in_each_category">Get the most popular item in each category</a></li>
<li><a href="#compute_rank">Compute rank</a></li>
</ul>

<p>These queries compute values with numeric boundaries:</p>

<ul>
<li><a href="#compute_a_cumulative_sum">Compute a cumulative sum</a></li>
<li><a href="#compute_a_moving_average">Compute a moving average</a></li>
<li><a href="#compute_the_number_of_items_within_a_range">Compute the number of items within a range</a></li>
<li><a href="#get_the_last_value_in_a_range">Get the last value in a range</a></li>
<li><a href="#def_use_named_window">Use a named window in a window frame clause</a></li>
</ul>

<p>These queries compute values with the current row as a boundary:</p>

<ul>
<li><a href="#compute_a_grand_total">Compute a grand total</a></li>
<li><a href="#compute_a_subtotal">Compute a subtotal</a></li>
<li><a href="#compute_a_cumulative_sum">Compute a cumulative sum</a></li>
</ul>

<h3 id="ref_named_window" data-text="Referencing a named window" tabindex="-1">Referencing a named window</h3>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">query_expr</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">function_name</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">argument_list</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">OVER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">over_clause</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">from_item</span>
<span class="devsite-syntax-k">WINDOW</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">named_window_expression</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">...</span><span class="devsite-syntax-err">]</span>

<span class="devsite-syntax-n">over_clause</span><span class="devsite-syntax-err">:</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">{</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">named_window</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">|</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">window_specification</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">}</span>

<span class="devsite-syntax-n">window_specification</span><span class="devsite-syntax-err">:</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">named_window</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">PARTITION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">partition_expression</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">...</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">expression</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">{</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ASC</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">|</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">DESC</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">}</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">...</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">window_frame_clause</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>

<span class="devsite-syntax-n">named_window_expression</span><span class="devsite-syntax-err">:</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">named_window</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">{</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">named_window</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">|</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">window_specification</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">}</span>
</code></pre></devsite-code>
<p>A named window represents a group of rows in a table upon which to use an
window function. A named window is defined in the
<a href="/bigquery/docs/reference/standard-sql/query-syntax#window_clause"><code translate="no" dir="ltr">WINDOW</code> clause</a>, and referenced in
a window function&#39;s <a href="#def_over_clause"><code translate="no" dir="ltr">OVER</code> clause</a>.
In an <code translate="no" dir="ltr">OVER</code> clause, a named window can appear either by itself or embedded
within a <a href="#def_window_spec">window specification</a>.</p>

<p><strong>Examples</strong></p>

<ul>
<li><a href="#get_the_last_value_in_a_range">Get the last value in a range</a></li>
<li><a href="#def_use_named_window">Use a named window in a window frame clause</a></li>
</ul>

<h2 id="filter_window_results" data-text="Filtering results with the QUALIFY clause" tabindex="-1">Filtering results with the QUALIFY clause</h2>

<p>The <code translate="no" dir="ltr">QUALIFY</code> clause can be used to filter the results of a window function.
For more information and examples, see the
<a href="/bigquery/docs/reference/standard-sql/query-syntax#qualify_clause"><code translate="no" dir="ltr">QUALIFY</code> clause</a>.</p>

<h2 id="window_function_examples" data-text="Window function examples" tabindex="-1">Window function examples</h2>

<p>In these examples, the <mark>highlighted item</mark> is the current row. The <strong>bolded
items</strong> are the rows that are included in the analysis.</p>

<h3 id="common_tables_used_in_examples" data-text="Common tables used in examples" tabindex="-1">Common tables used in examples</h3>

<p>The following tables are used in the subsequent aggregate analytic
query examples: <a href="#produce_table"><code translate="no" dir="ltr">Produce</code></a>, <a href="#employees_table"><code translate="no" dir="ltr">Employees</code></a>,
and <a href="#farm_table"><code translate="no" dir="ltr">Farm</code></a>.</p>

<h4 id="produce_table" data-text="Produce table" tabindex="-1">Produce table</h4>

<p>Some examples reference a table called <code translate="no" dir="ltr">Produce</code>:</p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">WITH</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">Produce</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span>
<span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'kale'</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">as</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">item</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">23</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">as</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">purchases</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'vegetable'</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">as</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">category</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'banana'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'fruit'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'cabbage'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">9</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'vegetable'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'apple'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">8</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'fruit'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'leek'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'vegetable'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'lettuce'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">10</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'vegetable'</span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">*</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">Produce</span>

<span class="devsite-syntax-cm">/*-------------------------------------+</span>
<span class="devsite-syntax-cm"> | item      | category   | purchases  |</span>
<span class="devsite-syntax-cm"> +-------------------------------------+</span>
<span class="devsite-syntax-cm"> | kale      | vegetable  | 23         |</span>
<span class="devsite-syntax-cm"> | banana    | fruit      | 2          |</span>
<span class="devsite-syntax-cm"> | cabbage   | vegetable  | 9          |</span>
<span class="devsite-syntax-cm"> | apple     | fruit      | 8          |</span>
<span class="devsite-syntax-cm"> | leek      | vegetable  | 2          |</span>
<span class="devsite-syntax-cm"> | lettuce   | vegetable  | 10         |</span>
<span class="devsite-syntax-cm"> +-------------------------------------*/</span>
</code></pre></devsite-code>
<h4 id="employees_table" data-text="Employees table" tabindex="-1">Employees table</h4>

<p>Some examples reference a table called <code translate="no" dir="ltr">Employees</code>:</p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">WITH</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">Employees</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span>
<span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Isabella'</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">as</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">name</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">as</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">department</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">DATE</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-mi">1997</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">09</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">28</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">as</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">start_date</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Anthony'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">1</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">DATE</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-mi">1995</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">11</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">29</span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Daniel'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">DATE</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-mi">2004</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">06</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">24</span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Andrew'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">1</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">DATE</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-mi">1999</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">01</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">23</span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Jacob'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">1</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">DATE</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-mi">1990</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">07</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">11</span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Jose'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">DATE</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-mi">2013</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">03</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">17</span><span class="devsite-syntax-p">))</span>
<span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">*</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">Employees</span>

<span class="devsite-syntax-cm">/*-------------------------------------+</span>
<span class="devsite-syntax-cm"> | name      | department | start_date |</span>
<span class="devsite-syntax-cm"> +-------------------------------------+</span>
<span class="devsite-syntax-cm"> | Isabella  | 2          | 1997-09-28 |</span>
<span class="devsite-syntax-cm"> | Anthony   | 1          | 1995-11-29 |</span>
<span class="devsite-syntax-cm"> | Daniel    | 2          | 2004-06-24 |</span>
<span class="devsite-syntax-cm"> | Andrew    | 1          | 1999-01-23 |</span>
<span class="devsite-syntax-cm"> | Jacob     | 1          | 1990-07-11 |</span>
<span class="devsite-syntax-cm"> | Jose      | 2          | 2013-03-17 |</span>
<span class="devsite-syntax-cm"> +-------------------------------------*/</span>
</code></pre></devsite-code>
<h4 id="farm_table" data-text="Farm table" tabindex="-1">Farm table</h4>

<p>Some examples reference a table called <code translate="no" dir="ltr">Farm</code>:</p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">WITH</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">Farm</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span>
<span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'cat'</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">as</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">animal</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">23</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">as</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">population</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'mammal'</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">as</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">category</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'duck'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">3</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'bird'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'dog'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'mammal'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'goose'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">1</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'bird'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'ox'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'mammal'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'goat'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'mammal'</span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">*</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">Farm</span>

<span class="devsite-syntax-cm">/*-------------------------------------+</span>
<span class="devsite-syntax-cm"> | animal    | category   | population |</span>
<span class="devsite-syntax-cm"> +-------------------------------------+</span>
<span class="devsite-syntax-cm"> | cat       | mammal     | 23         |</span>
<span class="devsite-syntax-cm"> | duck      | bird       | 3          |</span>
<span class="devsite-syntax-cm"> | dog       | mammal     | 2          |</span>
<span class="devsite-syntax-cm"> | goose     | bird       | 1          |</span>
<span class="devsite-syntax-cm"> | ox        | mammal     | 2          |</span>
<span class="devsite-syntax-cm"> | goat      | mammal     | 2          |</span>
<span class="devsite-syntax-cm"> +-------------------------------------*/</span>
</code></pre></devsite-code>
<h3 id="compute_a_grand_total" data-text="Compute a grand total" tabindex="-1">Compute a grand total</h3>

<p>This computes a grand total for all items in the
<a href="#produce_table"><code translate="no" dir="ltr">Produce</code></a> table.</p>

<ul>
<li>(<strong><mark>banana</mark></strong>, <strong>apple</strong>, <strong>leek</strong>, <strong>cabbage</strong>, <strong>lettuce</strong>, <strong>kale</strong>) = 54 total purchases</li>
<li>(<strong>banana</strong>, <strong><mark>apple</mark></strong>, <strong>leek</strong>, <strong>cabbage</strong>, <strong>lettuce</strong>, <strong>kale</strong>) = 54 total purchases</li>
<li>(<strong>banana</strong>, <strong>apple</strong>, <strong><mark>leek</mark></strong>, <strong>cabbage</strong>, <strong>lettuce</strong>, <strong>kale</strong>) = 54 total purchases</li>
<li>(<strong>banana</strong>, <strong>apple</strong>, <strong>leek</strong>, <strong><mark>cabbage</mark></strong>, <strong>lettuce</strong>, <strong>kale</strong>) = 54 total purchases</li>
<li>(<strong>banana</strong>, <strong>apple</strong>, <strong>leek</strong>, <strong>cabbage</strong>, <strong><mark>lettuce</mark></strong>, <strong>kale</strong>) = 54 total purchases</li>
<li>(<strong>banana</strong>, <strong>apple</strong>, <strong>leek</strong>, <strong>cabbage</strong>, <strong>lettuce</strong>, <strong><mark>kale</mark></strong>) = 54 total purchases</li>
</ul>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">item</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">purchases</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">category</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">SUM</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">purchases</span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">OVER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">()</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">total_purchases</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">Produce</span>

<span class="devsite-syntax-cm">/*-------------------------------------------------------+</span>
<span class="devsite-syntax-cm"> | item      | purchases  | category   | total_purchases |</span>
<span class="devsite-syntax-cm"> +-------------------------------------------------------+</span>
<span class="devsite-syntax-cm"> | banana    | 2          | fruit      | 54              |</span>
<span class="devsite-syntax-cm"> | leek      | 2          | vegetable  | 54              |</span>
<span class="devsite-syntax-cm"> | apple     | 8          | fruit      | 54              |</span>
<span class="devsite-syntax-cm"> | cabbage   | 9          | vegetable  | 54              |</span>
<span class="devsite-syntax-cm"> | lettuce   | 10         | vegetable  | 54              |</span>
<span class="devsite-syntax-cm"> | kale      | 23         | vegetable  | 54              |</span>
<span class="devsite-syntax-cm"> +-------------------------------------------------------*/</span>
</code></pre></devsite-code>
<h3 id="compute_a_subtotal" data-text="Compute a subtotal" tabindex="-1">Compute a subtotal</h3>

<p>This computes a subtotal for each category in the
<a href="#produce_table"><code translate="no" dir="ltr">Produce</code></a> table.</p>

<ul>
<li>fruit
<ul>
<li>(<strong><mark>banana</mark></strong>, <strong>apple</strong>) = 10 total purchases</li>
<li>(<strong>banana</strong>, <strong><mark>apple</mark></strong>) = 10 total purchases</li>
</ul></li>
<li>vegetable
<ul>
<li>(<strong><mark>leek</mark></strong>, <strong>cabbage</strong>, <strong>lettuce</strong>, <strong>kale</strong>) = 44 total purchases</li>
<li>(<strong>leek</strong>, <strong><mark>cabbage</mark></strong>, <strong>lettuce</strong>, <strong>kale</strong>) = 44 total purchases</li>
<li>(<strong>leek</strong>, <strong>cabbage</strong>, <strong><mark>lettuce</mark></strong>, <strong>kale</strong>) = 44 total purchases</li>
<li>(<strong>leek</strong>, <strong>cabbage</strong>, <strong>lettuce</strong>, <strong><mark>kale</mark></strong>) = 44 total purchases</li>
</ul></li>
</ul>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">item</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">purchases</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">category</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">SUM</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">purchases</span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">OVER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">PARTITION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">category</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">purchases</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">ROWS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BETWEEN</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNBOUNDED</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">PRECEDING</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AND</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNBOUNDED</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">FOLLOWING</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">total_purchases</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">Produce</span>

<span class="devsite-syntax-cm">/*-------------------------------------------------------+</span>
<span class="devsite-syntax-cm"> | item      | purchases  | category   | total_purchases |</span>
<span class="devsite-syntax-cm"> +-------------------------------------------------------+</span>
<span class="devsite-syntax-cm"> | banana    | 2          | fruit      | 10              |</span>
<span class="devsite-syntax-cm"> | apple     | 8          | fruit      | 10              |</span>
<span class="devsite-syntax-cm"> | leek      | 2          | vegetable  | 44              |</span>
<span class="devsite-syntax-cm"> | cabbage   | 9          | vegetable  | 44              |</span>
<span class="devsite-syntax-cm"> | lettuce   | 10         | vegetable  | 44              |</span>
<span class="devsite-syntax-cm"> | kale      | 23         | vegetable  | 44              |</span>
<span class="devsite-syntax-cm"> +-------------------------------------------------------*/</span>
</code></pre></devsite-code>
<h3 id="compute_a_cumulative_sum" data-text="Compute a cumulative sum" tabindex="-1">Compute a cumulative sum</h3>

<p>This computes a cumulative sum for each category in the
<a href="#produce_table"><code translate="no" dir="ltr">Produce</code></a> table. The sum is computed with respect to the
order defined using the <code translate="no" dir="ltr">ORDER BY</code> clause.</p>

<ul>
<li>fruit
<ul>
<li>(<strong><mark>banana</mark></strong>, apple) = 2 total purchases</li>
<li>(<strong>banana</strong>, <strong><mark>apple</mark></strong>) = 10 total purchases</li>
</ul></li>
<li>vegetable
<ul>
<li>(<strong><mark>leek</mark></strong>, cabbage, lettuce, kale) = 2 total purchases</li>
<li>(<strong>leek</strong>, <strong><mark>cabbage</mark></strong>, lettuce, kale) = 11 total purchases</li>
<li>(<strong>leek</strong>, <strong>cabbage</strong>, <strong><mark>lettuce</mark></strong>, kale) = 21 total purchases</li>
<li>(<strong>leek</strong>, <strong>cabbage</strong>, <strong>lettuce</strong>, <strong><mark>kale</mark></strong>) = 44 total purchases</li>
</ul></li>
</ul>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">item</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">purchases</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">category</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">SUM</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">purchases</span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">OVER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">PARTITION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">category</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">purchases</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">ROWS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BETWEEN</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNBOUNDED</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">PRECEDING</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AND</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">CURRENT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ROW</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">total_purchases</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">Produce</span>

<span class="devsite-syntax-cm">/*-------------------------------------------------------+</span>
<span class="devsite-syntax-cm"> | item      | purchases  | category   | total_purchases |</span>
<span class="devsite-syntax-cm"> +-------------------------------------------------------+</span>
<span class="devsite-syntax-cm"> | banana    | 2          | fruit      | 2               |</span>
<span class="devsite-syntax-cm"> | apple     | 8          | fruit      | 10              |</span>
<span class="devsite-syntax-cm"> | leek      | 2          | vegetable  | 2               |</span>
<span class="devsite-syntax-cm"> | cabbage   | 9          | vegetable  | 11              |</span>
<span class="devsite-syntax-cm"> | lettuce   | 10         | vegetable  | 21              |</span>
<span class="devsite-syntax-cm"> | kale      | 23         | vegetable  | 44              |</span>
<span class="devsite-syntax-cm"> +-------------------------------------------------------*/</span>
</code></pre></devsite-code>
<p>This does the same thing as the preceding example. You don&#39;t have to add
<code translate="no" dir="ltr">CURRENT ROW</code> as a boundary unless you would like to for readability.</p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">item</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">purchases</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">category</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">SUM</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">purchases</span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">OVER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">PARTITION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">category</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">purchases</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">ROWS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNBOUNDED</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">PRECEDING</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">total_purchases</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">Produce</span>
</code></pre></devsite-code>
<p>In this example, all items in the <a href="#produce_table"><code translate="no" dir="ltr">Produce</code></a> table are included
in the partition. Only preceding rows are analyzed. The analysis starts two
rows prior to the current row in the partition.</p>

<ul>
<li>(<mark>banana</mark>, leek, apple, cabbage, lettuce, kale) = NULL</li>
<li>(banana, <mark>leek</mark>, apple, cabbage, lettuce, kale) = NULL</li>
<li>(<strong>banana</strong>, leek, <mark>apple</mark>, cabbage, lettuce, kale) = 2</li>
<li>(<strong>banana</strong>, <strong>leek</strong>, apple, <mark>cabbage</mark>, lettuce, kale) = 4</li>
<li>(<strong>banana</strong>, <strong>leek</strong>, <strong>apple</strong>, cabbage, <mark>lettuce</mark>, kale) = 12</li>
<li>(<strong>banana</strong>, <strong>leek</strong>, <strong>apple</strong>, <strong>cabbage</strong>, lettuce, <mark>kale</mark>) = 21</li>
</ul>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">item</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">purchases</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">category</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">SUM</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">purchases</span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">OVER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">purchases</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">ROWS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BETWEEN</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNBOUNDED</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">PRECEDING</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AND</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">PRECEDING</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">total_purchases</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">Produce</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*-------------------------------------------------------+</span>
<span class="devsite-syntax-cm"> | item      | purchases  | category   | total_purchases |</span>
<span class="devsite-syntax-cm"> +-------------------------------------------------------+</span>
<span class="devsite-syntax-cm"> | banana    | 2          | fruit      | NULL            |</span>
<span class="devsite-syntax-cm"> | leek      | 2          | vegetable  | NULL            |</span>
<span class="devsite-syntax-cm"> | apple     | 8          | fruit      | 2               |</span>
<span class="devsite-syntax-cm"> | cabbage   | 9          | vegetable  | 4               |</span>
<span class="devsite-syntax-cm"> | lettuce   | 10         | vegetable  | 12              |</span>
<span class="devsite-syntax-cm"> | kale      | 23         | vegetable  | 21              |</span>
<span class="devsite-syntax-cm"> +-------------------------------------------------------*/</span>
</code></pre></devsite-code>
<h3 id="compute_a_moving_average" data-text="Compute a moving average" tabindex="-1">Compute a moving average</h3>

<p>This computes a moving average in the <a href="#produce_table"><code translate="no" dir="ltr">Produce</code></a> table.
The lower boundary is 1 row before the
current row. The upper boundary is 1 row after the current row.</p>

<ul>
<li>(<strong><mark>banana</mark></strong>, <strong>leek</strong>, apple, cabbage, lettuce, kale) = 2 average purchases</li>
<li>(<strong>banana</strong>, <strong><mark>leek</mark></strong>, <strong>apple</strong>, cabbage, lettuce, kale) = 4 average purchases</li>
<li>(banana, <strong>leek</strong>, <strong><mark>apple</mark></strong>, <strong>cabbage</strong>, lettuce, kale) = 6.3333 average purchases</li>
<li>(banana, leek, <strong>apple</strong>, <strong><mark>cabbage</mark></strong>, <strong>lettuce</strong>, kale) = 9 average purchases</li>
<li>(banana, leek, apple, <strong>cabbage</strong>, <strong><mark>lettuce</mark></strong>, <strong>kale</strong>) = 14 average purchases</li>
<li>(banana, leek, apple, cabbage, <strong>lettuce</strong>, <strong><mark>kale</mark></strong>) = 16.5 average purchases</li>
</ul>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">item</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">purchases</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">category</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">AVG</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">purchases</span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">OVER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">purchases</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">ROWS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BETWEEN</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">1</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">PRECEDING</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AND</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">1</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">FOLLOWING</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">avg_purchases</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">Produce</span>

<span class="devsite-syntax-cm">/*-------------------------------------------------------+</span>
<span class="devsite-syntax-cm"> | item      | purchases  | category   | avg_purchases   |</span>
<span class="devsite-syntax-cm"> +-------------------------------------------------------+</span>
<span class="devsite-syntax-cm"> | banana    | 2          | fruit      | 2               |</span>
<span class="devsite-syntax-cm"> | leek      | 2          | vegetable  | 4               |</span>
<span class="devsite-syntax-cm"> | apple     | 8          | fruit      | 6.33333         |</span>
<span class="devsite-syntax-cm"> | cabbage   | 9          | vegetable  | 9               |</span>
<span class="devsite-syntax-cm"> | lettuce   | 10         | vegetable  | 14              |</span>
<span class="devsite-syntax-cm"> | kale      | 23         | vegetable  | 16.5            |</span>
<span class="devsite-syntax-cm"> +-------------------------------------------------------*/</span>
</code></pre></devsite-code>
<h3 id="compute_the_number_of_items_within_a_range" data-text="Compute the number of items within a range" tabindex="-1">Compute the number of items within a range</h3>

<p>This example gets the number of animals that have a similar population
count in the <a href="#farm_table"><code translate="no" dir="ltr">Farm</code></a> table.</p>

<ul>
<li>(<strong><mark>goose</mark></strong>, <strong>dog</strong>, <strong>ox</strong>, <strong>goat</strong>, duck, cat) = 4 animals between population range 0-2.</li>
<li>(<strong>goose</strong>, <strong><mark>dog</mark></strong>, <strong>ox</strong>, <strong>goat</strong>, <strong>duck</strong>, cat) = 5 animals between population range 1-3.</li>
<li>(<strong>goose</strong>, <strong>dog</strong>, <strong><mark>ox</mark></strong>, <strong>goat</strong>, <strong>duck</strong>, cat) = 5 animals between population range 1-3.</li>
<li>(<strong>goose</strong>, <strong>dog</strong>, <strong>ox</strong>, <strong><mark>goat</mark></strong>, <strong>duck</strong>, cat) = 5 animals between population range 1-3.</li>
<li>(goose, <strong>dog</strong>, <strong>ox</strong>, <strong>goat</strong>, <strong><mark>duck</mark></strong>, cat) = 4 animals between population range 2-4.</li>
<li>(goose, dog, ox, goat, duck, <strong><mark>cat</mark></strong>) = 1 animal between population range 22-24.</li>
</ul>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">animal</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">population</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">category</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">COUNT</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-err">*</span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">OVER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">population</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-kt">RANGE</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BETWEEN</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">1</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">PRECEDING</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AND</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">1</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">FOLLOWING</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">similar_population</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">Farm</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*----------------------------------------------------------+</span>
<span class="devsite-syntax-cm"> | animal    | population | category   | similar_population |</span>
<span class="devsite-syntax-cm"> +----------------------------------------------------------+</span>
<span class="devsite-syntax-cm"> | goose     | 1          | bird       | 4                  |</span>
<span class="devsite-syntax-cm"> | dog       | 2          | mammal     | 5                  |</span>
<span class="devsite-syntax-cm"> | ox        | 2          | mammal     | 5                  |</span>
<span class="devsite-syntax-cm"> | goat      | 2          | mammal     | 5                  |</span>
<span class="devsite-syntax-cm"> | duck      | 3          | bird       | 4                  |</span>
<span class="devsite-syntax-cm"> | cat       | 23         | mammal     | 1                  |</span>
<span class="devsite-syntax-cm"> +----------------------------------------------------------*/</span>
</code></pre></devsite-code>
<h3 id="get_the_most_popular_item_in_each_category" data-text="Get the most popular item in each category" tabindex="-1">Get the most popular item in each category</h3>

<p>This example gets the most popular item in each category. It defines how rows
in a window are partitioned and ordered in each partition. The
<a href="#produce_table"><code translate="no" dir="ltr">Produce</code></a> table is referenced.</p>

<ul>
<li>fruit
<ul>
<li>(<strong><mark>banana</mark></strong>, <strong>apple</strong>) = apple is most popular</li>
<li>(<strong>banana</strong>, <strong><mark>apple</mark></strong>) = apple is most popular</li>
</ul></li>
<li>vegetable
<ul>
<li>(<strong><mark>leek</mark></strong>, <strong>cabbage</strong>, <strong>lettuce</strong>, <strong>kale</strong>) = kale is most popular</li>
<li>(<strong>leek</strong>, <strong><mark>cabbage</mark></strong>, <strong>lettuce</strong>, <strong>kale</strong>) = kale is most popular</li>
<li>(<strong>leek</strong>, <strong>cabbage</strong>, <strong><mark>lettuce</mark></strong>, <strong>kale</strong>) = kale is most popular</li>
<li>(<strong>leek</strong>, <strong>cabbage</strong>, <strong>lettuce</strong>, <strong><mark>kale</mark></strong>) = kale is most popular</li>
</ul></li>
</ul>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">item</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">purchases</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">category</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">LAST_VALUE</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">item</span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">OVER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">PARTITION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">category</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">purchases</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">ROWS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BETWEEN</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNBOUNDED</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">PRECEDING</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AND</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNBOUNDED</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">FOLLOWING</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">most_popular</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">Produce</span>

<span class="devsite-syntax-cm">/*----------------------------------------------------+</span>
<span class="devsite-syntax-cm"> | item      | purchases  | category   | most_popular |</span>
<span class="devsite-syntax-cm"> +----------------------------------------------------+</span>
<span class="devsite-syntax-cm"> | banana    | 2          | fruit      | apple        |</span>
<span class="devsite-syntax-cm"> | apple     | 8          | fruit      | apple        |</span>
<span class="devsite-syntax-cm"> | leek      | 2          | vegetable  | kale         |</span>
<span class="devsite-syntax-cm"> | cabbage   | 9          | vegetable  | kale         |</span>
<span class="devsite-syntax-cm"> | lettuce   | 10         | vegetable  | kale         |</span>
<span class="devsite-syntax-cm"> | kale      | 23         | vegetable  | kale         |</span>
<span class="devsite-syntax-cm"> +----------------------------------------------------*/</span>
</code></pre></devsite-code>
<h3 id="get_the_last_value_in_a_range" data-text="Get the last value in a range" tabindex="-1">Get the last value in a range</h3>

<p>This example gets the most popular item in a specific window frame, using
the <a href="#produce_table"><code translate="no" dir="ltr">Produce</code></a> table. The window frame analyzes up to three
rows at a time. Take a close look at the <code translate="no" dir="ltr">most_popular</code> column for vegetables.
Instead of getting the most popular item in a specific category, it gets the
most popular item in a specific range in that category.</p>

<ul>
<li>fruit
<ul>
<li>(<strong><mark>banana</mark></strong>, <strong>apple</strong>) = apple is most popular</li>
<li>(<strong>banana</strong>, <strong><mark>apple</mark></strong>) = apple is most popular</li>
</ul></li>
<li>vegetable
<ul>
<li>(<strong><mark>leek</mark></strong>, <strong>cabbage</strong>, lettuce, kale) = cabbage is most popular</li>
<li>(<strong>leek</strong>, <strong><mark>cabbage</mark></strong>, <strong>lettuce</strong>, kale) = lettuce is most popular</li>
<li>(leek, <strong>cabbage</strong>, <strong><mark>lettuce</mark></strong>, <strong>kale</strong>) = kale is most popular</li>
<li>(leek, cabbage, <strong>lettuce</strong>, <strong><mark>kale</mark></strong>) = kale is most popular</li>
</ul></li>
</ul>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">item</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">purchases</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">category</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">LAST_VALUE</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">item</span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">OVER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">PARTITION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">category</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">purchases</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">ROWS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BETWEEN</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">1</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">PRECEDING</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AND</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">1</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">FOLLOWING</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">most_popular</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">Produce</span>

<span class="devsite-syntax-cm">/*----------------------------------------------------+</span>
<span class="devsite-syntax-cm"> | item      | purchases  | category   | most_popular |</span>
<span class="devsite-syntax-cm"> +----------------------------------------------------+</span>
<span class="devsite-syntax-cm"> | banana    | 2          | fruit      | apple        |</span>
<span class="devsite-syntax-cm"> | apple     | 8          | fruit      | apple        |</span>
<span class="devsite-syntax-cm"> | leek      | 2          | vegetable  | cabbage      |</span>
<span class="devsite-syntax-cm"> | cabbage   | 9          | vegetable  | lettuce      |</span>
<span class="devsite-syntax-cm"> | lettuce   | 10         | vegetable  | kale         |</span>
<span class="devsite-syntax-cm"> | kale      | 23         | vegetable  | kale         |</span>
<span class="devsite-syntax-cm"> +----------------------------------------------------*/</span>
</code></pre></devsite-code>
<p>This example returns the same results as the preceding example, but it includes
a named window called <code translate="no" dir="ltr">ItemWindow</code>. Some of the window specifications are
defined directly in the <code translate="no" dir="ltr">OVER</code> clause and some are defined in the named window.</p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">item</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">purchases</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">category</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">LAST_VALUE</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">item</span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">OVER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-n">ItemWindow</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">ROWS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BETWEEN</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">1</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">PRECEDING</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AND</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">1</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">FOLLOWING</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">most_popular</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">Produce</span>
<span class="devsite-syntax-k">WINDOW</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">ItemWindow</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">PARTITION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">category</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">purchases</span><span class="devsite-syntax-p">)</span>
</code></pre></devsite-code>
<h3 id="compute_rank" data-text="Compute rank" tabindex="-1">Compute rank</h3>

<p>This example calculates the rank of each employee within their department,
based on their start date. The window specification is defined directly
in the <code translate="no" dir="ltr">OVER</code> clause. The <a href="#employees_table"><code translate="no" dir="ltr">Employees</code></a> table is referenced.</p>

<ul>
<li>department 1
<ul>
<li>(<strong><mark>Jacob</mark></strong>, <strong>Anthony</strong>, <strong>Andrew</strong>) = Assign rank 1 to Jacob</li>
<li>(<strong>Jacob</strong>, <strong><mark>Anthony</mark></strong>, <strong>Andrew</strong>) = Assign rank 2 to Anthony</li>
<li>(<strong>Jacob</strong>, <strong>Anthony</strong>, <strong><mark>Andrew</mark></strong>) = Assign rank 3 to Andrew</li>
</ul></li>
<li>department 2
<ul>
<li>(<strong><mark>Isabella</mark></strong>, <strong>Daniel</strong>, <strong>Jose</strong>) = Assign rank 1 to Isabella</li>
<li>(<strong>Isabella</strong>, <strong><mark>Daniel</mark></strong>, <strong>Jose</strong>) = Assign rank 2 to Daniel</li>
<li>(<strong>Isabella</strong>, <strong>Daniel</strong>, <strong><mark>Jose</mark></strong>) = Assign rank 3 to Jose</li>
</ul></li>
</ul>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">name</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">department</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">start_date</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nf">RANK</span><span class="devsite-syntax-p">()</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">OVER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-k">PARTITION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">department</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">start_date</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">rank</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">Employees</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*--------------------------------------------+</span>
<span class="devsite-syntax-cm"> | name      | department | start_date | rank |</span>
<span class="devsite-syntax-cm"> +--------------------------------------------+</span>
<span class="devsite-syntax-cm"> | Jacob     | 1          | 1990-07-11 | 1    |</span>
<span class="devsite-syntax-cm"> | Anthony   | 1          | 1995-11-29 | 2    |</span>
<span class="devsite-syntax-cm"> | Andrew    | 1          | 1999-01-23 | 3    |</span>
<span class="devsite-syntax-cm"> | Isabella  | 2          | 1997-09-28 | 1    |</span>
<span class="devsite-syntax-cm"> | Daniel    | 2          | 2004-06-24 | 2    |</span>
<span class="devsite-syntax-cm"> | Jose      | 2          | 2013-03-17 | 3    |</span>
<span class="devsite-syntax-cm"> +--------------------------------------------*/</span>
</code></pre></devsite-code>
<h3 id="def_use_named_window" data-text="Use a named window in a window frame clause" tabindex="-1">Use a named window in a window frame clause</h3>

<p>You can define some of your logic in a named window and some of it in a
window frame clause. This logic is combined. Here is an example, using the
<a href="#produce_table"><code translate="no" dir="ltr">Produce</code></a> table.</p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">item</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">purchases</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">category</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">LAST_VALUE</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">item</span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">OVER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">ItemWindow</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">most_popular</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">Produce</span>
<span class="devsite-syntax-k">WINDOW</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">ItemWindow</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">PARTITION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">category</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">purchases</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">ROWS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BETWEEN</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">PRECEDING</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AND</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">FOLLOWING</span><span class="devsite-syntax-p">)</span>

<span class="devsite-syntax-cm">/*-------------------------------------------------------+</span>
<span class="devsite-syntax-cm"> | item      | purchases  | category   | most_popular    |</span>
<span class="devsite-syntax-cm"> +-------------------------------------------------------+</span>
<span class="devsite-syntax-cm"> | banana    | 2          | fruit      | apple           |</span>
<span class="devsite-syntax-cm"> | apple     | 8          | fruit      | apple           |</span>
<span class="devsite-syntax-cm"> | leek      | 2          | vegetable  | lettuce         |</span>
<span class="devsite-syntax-cm"> | cabbage   | 9          | vegetable  | kale            |</span>
<span class="devsite-syntax-cm"> | lettuce   | 10         | vegetable  | kale            |</span>
<span class="devsite-syntax-cm"> | kale      | 23         | vegetable  | kale            |</span>
<span class="devsite-syntax-cm"> +-------------------------------------------------------*/</span>
</code></pre></devsite-code>
<p>You can also get the previous results with these examples:</p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">item</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">purchases</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">category</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">LAST_VALUE</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">item</span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">OVER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">ItemWindow</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">most_popular</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">Produce</span>
<span class="devsite-syntax-k">WINDOW</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">a</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-k">PARTITION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">category</span><span class="devsite-syntax-p">),</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">b</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">a</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">purchases</span><span class="devsite-syntax-p">),</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">c</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">b</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ROWS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BETWEEN</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">PRECEDING</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AND</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">FOLLOWING</span><span class="devsite-syntax-p">),</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">ItemWindow</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">c</span><span class="devsite-syntax-p">)</span>
</code></pre></devsite-code><div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">item</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">purchases</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">category</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">LAST_VALUE</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">item</span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">OVER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">ItemWindow</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ROWS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BETWEEN</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">PRECEDING</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AND</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">FOLLOWING</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">most_popular</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">Produce</span>
<span class="devsite-syntax-k">WINDOW</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">a</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-k">PARTITION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">category</span><span class="devsite-syntax-p">),</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">b</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">a</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">purchases</span><span class="devsite-syntax-p">),</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">ItemWindow</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">b</span><span class="devsite-syntax-p">)</span>
</code></pre></devsite-code>
<p>The following example produces an error because a window frame clause has been
defined twice:</p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">item</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">purchases</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">category</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">LAST_VALUE</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">item</span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">OVER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-n">ItemWindow</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">ROWS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BETWEEN</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">1</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">PRECEDING</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AND</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">1</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">FOLLOWING</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">most_popular</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">Produce</span>
<span class="devsite-syntax-k">WINDOW</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">ItemWindow</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">purchases</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">ROWS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BETWEEN</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">PRECEDING</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AND</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">FOLLOWING</span><span class="devsite-syntax-p">)</span>
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
