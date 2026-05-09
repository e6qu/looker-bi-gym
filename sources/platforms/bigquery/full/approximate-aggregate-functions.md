# BigQuery Approximate Aggregate Functions

- Source ID: `SRC-BIGQUERY-APPROX-AGGREGATES`
- URL: https://cloud.google.com/bigquery/docs/reference/standard-sql/approximate_aggregate_functions
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
      Approximate aggregate functions<devsite-actions hidden data-nosnippet><devsite-feature-tooltip
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





<p>GoogleSQL for BigQuery supports approximate aggregate functions.
To learn about the syntax for aggregate function calls, see
<a href="/bigquery/docs/reference/standard-sql/aggregate-function-calls">Aggregate function calls</a>.</p>

<p>Approximate aggregate functions are scalable in terms of memory usage and time,
but produce approximate results instead of exact results. These functions
typically require less memory than <a href="/bigquery/docs/reference/standard-sql/aggregate_functions">exact aggregation functions</a>
like <code translate="no" dir="ltr">COUNT(DISTINCT ...)</code>, but also introduce statistical uncertainty.
This makes approximate aggregation appropriate for large data streams for
which linear memory usage is impractical, as well as for data that is
already approximate.</p>

<p>The approximate aggregate functions in this section work directly on the
input data, rather than an intermediate estimation of the data. These functions
<em>don&#39;t allow</em> users to specify the precision for the estimation with
sketches. If you would like to specify precision with sketches, see:</p>

<ul>
<li><a href="/bigquery/docs/reference/standard-sql/hll_functions">HyperLogLog++ functions</a> to estimate cardinality.</li>
<li><a href="/bigquery/docs/reference/standard-sql/kll_functions">KLL functions</a> to estimate quantile values.</li>
</ul>

<h2 id="function_list" data-text="Function list" tabindex="-1">Function list</h2>

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Summary</th>
    </tr>
  </thead>
  <tbody>

<tr>
  <td><a href="/bigquery/docs/reference/standard-sql/approximate_aggregate_functions#approx_count_distinct"><code translate="no" dir="ltr">APPROX_COUNT_DISTINCT</code></a>
</td>
  <td>
    Gets the approximate result for <code translate="no" dir="ltr">COUNT(DISTINCT expression)</code>.
    
  </td>
</tr>

<tr>
  <td><a href="/bigquery/docs/reference/standard-sql/approximate_aggregate_functions#approx_quantiles"><code translate="no" dir="ltr">APPROX_QUANTILES</code></a>
</td>
  <td>
    Gets the approximate quantile boundaries.
    
  </td>
</tr>

<tr>
  <td><a href="/bigquery/docs/reference/standard-sql/approximate_aggregate_functions#approx_top_count"><code translate="no" dir="ltr">APPROX_TOP_COUNT</code></a>
</td>
  <td>
    Gets the approximate top elements and their approximate count.
    
  </td>
</tr>

<tr>
  <td><a href="/bigquery/docs/reference/standard-sql/approximate_aggregate_functions#approx_top_sum"><code translate="no" dir="ltr">APPROX_TOP_SUM</code></a>
</td>
  <td>
    Gets the approximate top elements and sum, based on the approximate sum
    of an assigned weight.
    
  </td>
</tr>

  </tbody>
</table>

<h2 id="approx_count_distinct" data-text="APPROX_COUNT_DISTINCT" tabindex="-1"><code translate="no" dir="ltr">APPROX_COUNT_DISTINCT</code></h2>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-nf">APPROX_COUNT_DISTINCT</span><span class="devsite-syntax-p">(</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">expression</span>
<span class="devsite-syntax-p">)</span>
</code></pre></devsite-code>
<p><strong>Description</strong></p>

<p>Returns the approximate result for <code translate="no" dir="ltr">COUNT(DISTINCT expression)</code>. The value
returned is a statistical estimate, not necessarily the actual value.</p>

<p>This function is less accurate than <code translate="no" dir="ltr">COUNT(DISTINCT expression)</code>, but performs
better on huge input.</p>

<p><strong>Supported Argument Types</strong></p>

<p>Any data type <strong>except</strong>:</p>

<ul>
<li><code translate="no" dir="ltr">ARRAY</code></li>
<li><code translate="no" dir="ltr">STRUCT</code></li>
<li><code translate="no" dir="ltr">INTERVAL</code></li>
</ul>

<p><strong>Returned Data Types</strong></p>

<p><code translate="no" dir="ltr">INT64</code></p>

<p><strong>Examples</strong></p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">APPROX_COUNT_DISTINCT</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">as</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">approx_distinct</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNNEST</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-mi">0</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">1</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">1</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">3</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">5</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">as</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*-----------------+</span>
<span class="devsite-syntax-cm"> | approx_distinct |</span>
<span class="devsite-syntax-cm"> +-----------------+</span>
<span class="devsite-syntax-cm"> | 5               |</span>
<span class="devsite-syntax-cm"> +-----------------*/</span>
</code></pre></devsite-code>
<h2 id="approx_quantiles" data-text="APPROX_QUANTILES" tabindex="-1"><code translate="no" dir="ltr">APPROX_QUANTILES</code></h2>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-nf">APPROX_QUANTILES</span><span class="devsite-syntax-p">(</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">DISTINCT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">expression</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">number</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">{</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">IGNORE</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">|</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">RESPECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">}</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">NULLS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>
<span class="devsite-syntax-p">)</span>
</code></pre></devsite-code>
<p><strong>Description</strong></p>

<p>Returns the approximate boundaries for a group of <code translate="no" dir="ltr">expression</code> values, where
<code translate="no" dir="ltr">number</code> represents the number of quantiles to create. This function returns an
array of <code translate="no" dir="ltr">number</code> + 1 elements, sorted in ascending order, where the
first element is the approximate minimum and the last element is the approximate
maximum.</p>

<p>Returns <code translate="no" dir="ltr">NULL</code> if there are zero input rows or <code translate="no" dir="ltr">expression</code> evaluates to
<code translate="no" dir="ltr">NULL</code> for all rows.</p>

<p>To learn more about the optional aggregate clauses that you can pass
into this function, see
<a href="/bigquery/docs/reference/standard-sql/aggregate-function-calls">Aggregate function calls</a>.</p>

<!-- mdlint off(WHITESPACE_LINE_LENGTH) -->

<!-- mdlint on -->

<p><strong>Supported Argument Types</strong></p>

<ul>
<li><p><code translate="no" dir="ltr">expression</code>: Any supported data type <strong>except</strong>:</p>

<ul>
<li><code translate="no" dir="ltr">ARRAY</code></li>
<li><code translate="no" dir="ltr">STRUCT</code></li>
<li><code translate="no" dir="ltr">INTERVAL</code></li>
</ul></li>
<li><p><code translate="no" dir="ltr">number</code>: <code translate="no" dir="ltr">INT64</code> literal or query parameter.</p></li>
</ul>

<p><strong>Returned Data Types</strong></p>

<p><code translate="no" dir="ltr">ARRAY&lt;T&gt;</code> where <code translate="no" dir="ltr">T</code> is the type specified by <code translate="no" dir="ltr">expression</code>.</p>

<p><strong>Examples</strong></p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">APPROX_QUANTILES</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">approx_quantiles</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNNEST</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-mi">1</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">1</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">1</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">4</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">5</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">6</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">7</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">8</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">9</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">10</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*------------------+</span>
<span class="devsite-syntax-cm"> | approx_quantiles |</span>
<span class="devsite-syntax-cm"> +------------------+</span>
<span class="devsite-syntax-cm"> | [1, 5, 10]       |</span>
<span class="devsite-syntax-cm"> +------------------*/</span>
</code></pre></devsite-code><div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">APPROX_QUANTILES</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">100</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-k">OFFSET</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-mi">90</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">percentile_90</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNNEST</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-mi">1</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">3</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">4</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">5</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">6</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">7</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">8</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">9</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">10</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*---------------+</span>
<span class="devsite-syntax-cm"> | percentile_90 |</span>
<span class="devsite-syntax-cm"> +---------------+</span>
<span class="devsite-syntax-cm"> | 9             |</span>
<span class="devsite-syntax-cm"> +---------------*/</span>
</code></pre></devsite-code><div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">APPROX_QUANTILES</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-k">DISTINCT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">approx_quantiles</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNNEST</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-mi">1</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">1</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">1</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">4</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">5</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">6</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">7</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">8</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">9</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">10</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*------------------+</span>
<span class="devsite-syntax-cm"> | approx_quantiles |</span>
<span class="devsite-syntax-cm"> +------------------+</span>
<span class="devsite-syntax-cm"> | [1, 6, 10]       |</span>
<span class="devsite-syntax-cm"> +------------------*/</span>
</code></pre></devsite-code><div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">FORMAT</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-s2">"%T"</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">APPROX_QUANTILES</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">RESPECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">NULLS</span><span class="devsite-syntax-p">))</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">approx_quantiles</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNNEST</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-no">NULL</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-no">NULL</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">1</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">1</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">1</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">4</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">5</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">6</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">7</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">8</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">9</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">10</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*------------------+</span>
<span class="devsite-syntax-cm"> | approx_quantiles |</span>
<span class="devsite-syntax-cm"> +------------------+</span>
<span class="devsite-syntax-cm"> | [NULL, 4, 10]    |</span>
<span class="devsite-syntax-cm"> +------------------*/</span>
</code></pre></devsite-code><div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">FORMAT</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-s2">"%T"</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">APPROX_QUANTILES</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-k">DISTINCT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">RESPECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">NULLS</span><span class="devsite-syntax-p">))</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">approx_quantiles</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNNEST</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-no">NULL</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-no">NULL</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">1</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">1</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">1</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">4</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">5</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">6</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">7</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">8</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">9</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">10</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*------------------+</span>
<span class="devsite-syntax-cm"> | approx_quantiles |</span>
<span class="devsite-syntax-cm"> +------------------+</span>
<span class="devsite-syntax-cm"> | [NULL, 6, 10]    |</span>
<span class="devsite-syntax-cm"> +------------------*/</span>
</code></pre></devsite-code>
<h2 id="approx_top_count" data-text="APPROX_TOP_COUNT" tabindex="-1"><code translate="no" dir="ltr">APPROX_TOP_COUNT</code></h2>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-nf">APPROX_TOP_COUNT</span><span class="devsite-syntax-p">(</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">expression</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">number</span>
<span class="devsite-syntax-p">)</span>
</code></pre></devsite-code>
<p><strong>Description</strong></p>

<p>Returns the approximate top elements of <code translate="no" dir="ltr">expression</code> as an array of <code translate="no" dir="ltr">STRUCT</code>s.
The <code translate="no" dir="ltr">number</code> parameter specifies the number of elements returned.</p>

<p>Each <code translate="no" dir="ltr">STRUCT</code> contains two fields. The first field (named <code translate="no" dir="ltr">value</code>) contains an
input value. The second field (named <code translate="no" dir="ltr">count</code>) contains an <code translate="no" dir="ltr">INT64</code> specifying the
number of times the value was returned.</p>

<p>Returns <code translate="no" dir="ltr">NULL</code> if there are zero input rows.</p>

<p>To learn more about the optional aggregate clauses that you can pass
into this function, see
<a href="/bigquery/docs/reference/standard-sql/aggregate-function-calls">Aggregate function calls</a>.</p>

<!-- mdlint off(WHITESPACE_LINE_LENGTH) -->

<!-- mdlint on -->

<p><strong>Supported Argument Types</strong></p>

<ul>
<li><code translate="no" dir="ltr">expression</code>: Any data type that the <code translate="no" dir="ltr">GROUP BY</code> clause supports.</li>
<li><code translate="no" dir="ltr">number</code>: <code translate="no" dir="ltr">INT64</code> literal or query parameter.</li>
</ul>

<p><strong>Returned Data Types</strong></p>

<p><code translate="no" dir="ltr">ARRAY&lt;STRUCT&gt;</code></p>

<p><strong>Examples</strong></p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">APPROX_TOP_COUNT</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">as</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">approx_top_count</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNNEST</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-s2">"apple"</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">"apple"</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">"pear"</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">"pear"</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">"pear"</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">"banana"</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">as</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*-------------------------+</span>
<span class="devsite-syntax-cm"> | approx_top_count        |</span>
<span class="devsite-syntax-cm"> +-------------------------+</span>
<span class="devsite-syntax-cm"> | [{pear, 3}, {apple, 2}] |</span>
<span class="devsite-syntax-cm"> +-------------------------*/</span>
</code></pre></devsite-code>
<p><strong>NULL handling</strong></p>

<p><code translate="no" dir="ltr">APPROX_TOP_COUNT</code> doesn&#39;t ignore <code translate="no" dir="ltr">NULL</code>s in the input. For example:</p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">APPROX_TOP_COUNT</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">as</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">approx_top_count</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNNEST</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-no">NULL</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">"pear"</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">"pear"</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">"pear"</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">"apple"</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-no">NULL</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">as</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*------------------------+</span>
<span class="devsite-syntax-cm"> | approx_top_count       |</span>
<span class="devsite-syntax-cm"> +------------------------+</span>
<span class="devsite-syntax-cm"> | [{pear, 3}, {NULL, 2}] |</span>
<span class="devsite-syntax-cm"> +------------------------*/</span>
</code></pre></devsite-code>
<h2 id="approx_top_sum" data-text="APPROX_TOP_SUM" tabindex="-1"><code translate="no" dir="ltr">APPROX_TOP_SUM</code></h2>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-nf">APPROX_TOP_SUM</span><span class="devsite-syntax-p">(</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">expression</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">weight</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">number</span>
<span class="devsite-syntax-p">)</span>
</code></pre></devsite-code>
<p><strong>Description</strong></p>

<p>Returns the approximate top elements of <code translate="no" dir="ltr">expression</code>, ordered by the sum of the
<code translate="no" dir="ltr">weight</code> values provided for each unique value of <code translate="no" dir="ltr">expression</code>. The <code translate="no" dir="ltr">number</code>
parameter specifies the number of elements returned.</p>

<p>If the <code translate="no" dir="ltr">weight</code> input is negative or <code translate="no" dir="ltr">NaN</code>, this function returns an error.</p>

<p>The elements are returned as an array of <code translate="no" dir="ltr">STRUCT</code>s.
Each <code translate="no" dir="ltr">STRUCT</code> contains two fields: <code translate="no" dir="ltr">value</code> and <code translate="no" dir="ltr">sum</code>.
The <code translate="no" dir="ltr">value</code> field contains the value of the input expression. The <code translate="no" dir="ltr">sum</code> field is
the same type as <code translate="no" dir="ltr">weight</code>, and is the approximate sum of the input weight
associated with the <code translate="no" dir="ltr">value</code> field.</p>

<p>Returns <code translate="no" dir="ltr">NULL</code> if there are zero input rows.</p>

<p>To learn more about the optional aggregate clauses that you can pass
into this function, see
<a href="/bigquery/docs/reference/standard-sql/aggregate-function-calls">Aggregate function calls</a>.</p>

<!-- mdlint off(WHITESPACE_LINE_LENGTH) -->

<!-- mdlint on -->

<p><strong>Supported Argument Types</strong></p>

<ul>
<li><code translate="no" dir="ltr">expression</code>: Any data type that the <code translate="no" dir="ltr">GROUP BY</code> clause supports.</li>
<li><p><code translate="no" dir="ltr">weight</code>: One of the following:</p>

<ul>
<li><code translate="no" dir="ltr">INT64</code></li>
<li><code translate="no" dir="ltr">NUMERIC</code></li>
<li><code translate="no" dir="ltr">BIGNUMERIC</code></li>
<li><code translate="no" dir="ltr">FLOAT64</code></li>
</ul></li>
<li><p><code translate="no" dir="ltr">number</code>: <code translate="no" dir="ltr">INT64</code> literal or query parameter.</p></li>
</ul>

<p><strong>Returned Data Types</strong></p>

<p><code translate="no" dir="ltr">ARRAY&lt;STRUCT&gt;</code></p>

<p><strong>Examples</strong></p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">APPROX_TOP_SUM</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">weight</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">approx_top_sum</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">FROM</span>
<span class="devsite-syntax-k">UNNEST</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-err">[</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-kt">STRUCT</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-s2">"apple"</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">3</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">weight</span><span class="devsite-syntax-p">),</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-s2">"pear"</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-p">),</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-s2">"apple"</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">0</span><span class="devsite-syntax-p">),</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-s2">"banana"</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">5</span><span class="devsite-syntax-p">),</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-s2">"pear"</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">4</span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-err">]</span><span class="devsite-syntax-p">);</span>

<span class="devsite-syntax-cm">/*--------------------------+</span>
<span class="devsite-syntax-cm"> | approx_top_sum           |</span>
<span class="devsite-syntax-cm"> +--------------------------+</span>
<span class="devsite-syntax-cm"> | [{pear, 6}, {banana, 5}] |</span>
<span class="devsite-syntax-cm"> +--------------------------*/</span>
</code></pre></devsite-code>
<p><strong>NULL handling</strong></p>

<p><code translate="no" dir="ltr">APPROX_TOP_SUM</code> doesn&#39;t ignore <code translate="no" dir="ltr">NULL</code> values for the <code translate="no" dir="ltr">expression</code> and <code translate="no" dir="ltr">weight</code>
parameters.</p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">APPROX_TOP_SUM</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">weight</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">approx_top_sum</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">FROM</span>
<span class="devsite-syntax-k">UNNEST</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-kt">STRUCT</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-s2">"apple"</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-no">NULL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">weight</span><span class="devsite-syntax-p">),</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-s2">"pear"</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">0</span><span class="devsite-syntax-p">),</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-s2">"pear"</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-no">NULL</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-p">);</span>

<span class="devsite-syntax-cm">/*----------------------------+</span>
<span class="devsite-syntax-cm"> | approx_top_sum             |</span>
<span class="devsite-syntax-cm"> +----------------------------+</span>
<span class="devsite-syntax-cm"> | [{pear, 0}, {apple, NULL}] |</span>
<span class="devsite-syntax-cm"> +----------------------------*/</span>
</code></pre></devsite-code><div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">APPROX_TOP_SUM</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">weight</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">approx_top_sum</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">FROM</span>
<span class="devsite-syntax-k">UNNEST</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-kt">STRUCT</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-s2">"apple"</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">0</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">weight</span><span class="devsite-syntax-p">),</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-no">NULL</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-p">);</span>

<span class="devsite-syntax-cm">/*-------------------------+</span>
<span class="devsite-syntax-cm"> | approx_top_sum          |</span>
<span class="devsite-syntax-cm"> +-------------------------+</span>
<span class="devsite-syntax-cm"> | [{NULL, 2}, {apple, 0}] |</span>
<span class="devsite-syntax-cm"> +-------------------------*/</span>
</code></pre></devsite-code><div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">APPROX_TOP_SUM</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">weight</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">approx_top_sum</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">FROM</span>
<span class="devsite-syntax-k">UNNEST</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-kt">STRUCT</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-s2">"apple"</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">0</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">weight</span><span class="devsite-syntax-p">),</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-no">NULL</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-no">NULL</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-p">);</span>

<span class="devsite-syntax-cm">/*----------------------------+</span>
<span class="devsite-syntax-cm"> | approx_top_sum             |</span>
<span class="devsite-syntax-cm"> +----------------------------+</span>
<span class="devsite-syntax-cm"> | [{apple, 0}, {NULL, NULL}] |</span>
<span class="devsite-syntax-cm"> +----------------------------*/</span>
</code></pre></devsite-code>

  

  
    <devsite-hats-survey class="nocontent" data-nosnippet
      hats-id="mwETRvWii0eU5NUYprb0Y9z5GVbc"
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
