# BigQuery Navigation Functions

- Source ID: `SRC-BIGQUERY-NAVIGATION-FUNCTIONS`
- URL: https://cloud.google.com/bigquery/docs/reference/standard-sql/navigation_functions
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
      Navigation functions<devsite-actions hidden data-nosnippet><devsite-feature-tooltip
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





<p>GoogleSQL for BigQuery supports navigation functions.
Navigation functions are a subset of window functions. To create a
window function call and learn about the syntax for window functions,
see <a href="/bigquery/docs/reference/standard-sql/window-function-calls">Window function_calls</a>.</p>

<p>Navigation functions generally compute some
<code translate="no" dir="ltr">value_expression</code> over a different row in the window frame from the
current row. The <code translate="no" dir="ltr">OVER</code> clause syntax varies across navigation functions.</p>

<p>For all navigation functions, the result data type is the same type as
<code translate="no" dir="ltr">value_expression</code>.</p>

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
  <td><a href="/bigquery/docs/reference/standard-sql/navigation_functions#first_value"><code translate="no" dir="ltr">FIRST_VALUE</code></a>
</td>
  <td>
    Gets a value for the first row in the current window frame.
    
  </td>
</tr>

<tr>
  <td><a href="/bigquery/docs/reference/standard-sql/navigation_functions#lag"><code translate="no" dir="ltr">LAG</code></a>
</td>
  <td>
    Gets a value for a preceding row.
    
  </td>
</tr>

<tr>
  <td><a href="/bigquery/docs/reference/standard-sql/navigation_functions#last_value"><code translate="no" dir="ltr">LAST_VALUE</code></a>
</td>
  <td>
    Gets a value for the last row in the current window frame.
    
  </td>
</tr>

<tr>
  <td><a href="/bigquery/docs/reference/standard-sql/navigation_functions#lead"><code translate="no" dir="ltr">LEAD</code></a>
</td>
  <td>
    Gets a value for a subsequent row.
    
  </td>
</tr>

<tr>
  <td><a href="/bigquery/docs/reference/standard-sql/navigation_functions#nth_value"><code translate="no" dir="ltr">NTH_VALUE</code></a>
</td>
  <td>
    Gets a value for the Nth row of the current window frame.
    
  </td>
</tr>

<tr>
  <td><a href="/bigquery/docs/reference/standard-sql/navigation_functions#percentile_cont"><code translate="no" dir="ltr">PERCENTILE_CONT</code></a>
</td>
  <td>
    Computes the specified percentile for a value, using
    linear interpolation.
    
  </td>
</tr>

<tr>
  <td><a href="/bigquery/docs/reference/standard-sql/navigation_functions#percentile_disc"><code translate="no" dir="ltr">PERCENTILE_DISC</code></a>
</td>
  <td>
    Computes the specified percentile for a discrete value.
    
  </td>
</tr>

  </tbody>
</table>

<h2 id="first_value" data-text="FIRST_VALUE" tabindex="-1"><code translate="no" dir="ltr">FIRST_VALUE</code></h2>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-nf">FIRST_VALUE</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">value_expression</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[{</span><span class="devsite-syntax-k">RESPECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">|</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">IGNORE</span><span class="devsite-syntax-err">}</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">NULLS</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-k">OVER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">over_clause</span>

<span class="devsite-syntax-n">over_clause</span><span class="devsite-syntax-err">:</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">{</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">named_window</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">|</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">window_specification</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">}</span>

<span class="devsite-syntax-n">window_specification</span><span class="devsite-syntax-err">:</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">named_window</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">PARTITION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">partition_expression</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">...</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">expression</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">{</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ASC</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">|</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">DESC</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">}</span><span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">...</span><span class="devsite-syntax-err">]</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">window_frame_clause</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>

</code></pre></devsite-code>
<p><strong>Description</strong></p>

<p>Returns the value of the <code translate="no" dir="ltr">value_expression</code> for the first row in the current
window frame.</p>

<p>This function includes <code translate="no" dir="ltr">NULL</code> values in the calculation unless <code translate="no" dir="ltr">IGNORE NULLS</code> is
present. If <code translate="no" dir="ltr">IGNORE NULLS</code> is present, the function excludes <code translate="no" dir="ltr">NULL</code> values from
the calculation.</p>

<p>To learn more about the <code translate="no" dir="ltr">OVER</code> clause and how to use it, see
<a href="/bigquery/docs/reference/standard-sql/window-function-calls">Window function calls</a>.</p>

<!-- mdlint off(WHITESPACE_LINE_LENGTH) -->

<!-- mdlint on -->

<p><strong>Supported Argument Types</strong></p>

<p><code translate="no" dir="ltr">value_expression</code> can be any data type that an expression can return.</p>

<p><strong>Return Data Type</strong></p>

<p>Same type as <code translate="no" dir="ltr">value_expression</code>.</p>

<p><strong>Examples</strong></p>

<p>The following example computes the fastest time for each division.</p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">WITH</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">finishers</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span>
<span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Sophia Liu'</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">as</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">name</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 2:51:45'</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">as</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">finish_time</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-s1">'F30-34'</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">as</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">division</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Lisa Stelzner'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 2:54:11'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'F35-39'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Nikki Leith'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 2:59:01'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'F30-34'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Lauren Matthews'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 3:01:17'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'F35-39'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Desiree Berry'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 3:05:42'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'F35-39'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Suzy Slane'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 3:06:24'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'F35-39'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Jen Edwards'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 3:06:36'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'F30-34'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Meghan Lederer'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 3:07:41'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'F30-34'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Carly Forte'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 3:08:58'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'F25-29'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Lauren Reasoner'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 3:10:14'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'F30-34'</span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">name</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nf">FORMAT_TIMESTAMP</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-s1">'%X'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">finish_time</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">finish_time</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">division</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nf">FORMAT_TIMESTAMP</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-s1">'%X'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">fastest_time</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">fastest_time</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nf">TIMESTAMP_DIFF</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">finish_time</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">fastest_time</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">SECOND</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">delta_in_seconds</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">name</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">finish_time</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">division</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nf">FIRST_VALUE</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">finish_time</span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">OVER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-k">PARTITION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">division</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">finish_time</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ASC</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">ROWS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BETWEEN</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNBOUNDED</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">PRECEDING</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AND</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNBOUNDED</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">FOLLOWING</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">fastest_time</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">finishers</span><span class="devsite-syntax-p">);</span>

<span class="devsite-syntax-cm">/*-----------------+-------------+----------+--------------+------------------+</span>
<span class="devsite-syntax-cm"> | name            | finish_time | division | fastest_time | delta_in_seconds |</span>
<span class="devsite-syntax-cm"> +-----------------+-------------+----------+--------------+------------------+</span>
<span class="devsite-syntax-cm"> | Carly Forte     | 03:08:58    | F25-29   | 03:08:58     | 0                |</span>
<span class="devsite-syntax-cm"> | Sophia Liu      | 02:51:45    | F30-34   | 02:51:45     | 0                |</span>
<span class="devsite-syntax-cm"> | Nikki Leith     | 02:59:01    | F30-34   | 02:51:45     | 436              |</span>
<span class="devsite-syntax-cm"> | Jen Edwards     | 03:06:36    | F30-34   | 02:51:45     | 891              |</span>
<span class="devsite-syntax-cm"> | Meghan Lederer  | 03:07:41    | F30-34   | 02:51:45     | 956              |</span>
<span class="devsite-syntax-cm"> | Lauren Reasoner | 03:10:14    | F30-34   | 02:51:45     | 1109             |</span>
<span class="devsite-syntax-cm"> | Lisa Stelzner   | 02:54:11    | F35-39   | 02:54:11     | 0                |</span>
<span class="devsite-syntax-cm"> | Lauren Matthews | 03:01:17    | F35-39   | 02:54:11     | 426              |</span>
<span class="devsite-syntax-cm"> | Desiree Berry   | 03:05:42    | F35-39   | 02:54:11     | 691              |</span>
<span class="devsite-syntax-cm"> | Suzy Slane      | 03:06:24    | F35-39   | 02:54:11     | 733              |</span>
<span class="devsite-syntax-cm"> +-----------------+-------------+----------+--------------+------------------*/</span>
</code></pre></devsite-code>
<h2 id="lag" data-text="LAG" tabindex="-1"><code translate="no" dir="ltr">LAG</code></h2>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-nf">LAG</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">value_expression</span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">offset</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">default_expression</span><span class="devsite-syntax-err">]]</span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-k">OVER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">over_clause</span>

<span class="devsite-syntax-n">over_clause</span><span class="devsite-syntax-err">:</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">{</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">named_window</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">|</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">window_specification</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">}</span>

<span class="devsite-syntax-n">window_specification</span><span class="devsite-syntax-err">:</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">named_window</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">PARTITION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">partition_expression</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">...</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">expression</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">{</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ASC</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">|</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">DESC</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">}</span><span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">...</span><span class="devsite-syntax-err">]</span>

</code></pre></devsite-code>
<p><strong>Description</strong></p>

<p>Returns the value of the <code translate="no" dir="ltr">value_expression</code> on a preceding row. Changing the
<code translate="no" dir="ltr">offset</code> value changes which preceding row is returned; the default value is
<code translate="no" dir="ltr">1</code>, indicating the previous row in the window frame. An error occurs if
<code translate="no" dir="ltr">offset</code> is NULL or a negative value.</p>

<p>The optional <code translate="no" dir="ltr">default_expression</code> is used if there isn&#39;t a row in the window
frame at the specified offset. This expression must be a constant expression and
its type must be implicitly coercible to the type of <code translate="no" dir="ltr">value_expression</code>. If left
unspecified, <code translate="no" dir="ltr">default_expression</code> defaults to NULL.</p>

<p>To learn more about the <code translate="no" dir="ltr">OVER</code> clause and how to use it, see
<a href="/bigquery/docs/reference/standard-sql/window-function-calls">Window function calls</a>.</p>

<!-- mdlint off(WHITESPACE_LINE_LENGTH) -->

<!-- mdlint on -->

<p><strong>Supported Argument Types</strong></p>

<ul>
<li><code translate="no" dir="ltr">value_expression</code> can be any data type that can be returned from an
expression.</li>
<li><code translate="no" dir="ltr">offset</code> must be a non-negative integer literal or parameter.</li>
<li><code translate="no" dir="ltr">default_expression</code> must be compatible with the value expression type.</li>
</ul>

<p><strong>Return Data Type</strong></p>

<p>Same type as <code translate="no" dir="ltr">value_expression</code>.</p>

<p><strong>Examples</strong></p>

<p>The following example illustrates a basic use of the <code translate="no" dir="ltr">LAG</code> function.</p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">WITH</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">finishers</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span>
<span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Sophia Liu'</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">as</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">name</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 2:51:45'</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">as</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">finish_time</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-s1">'F30-34'</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">as</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">division</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Lisa Stelzner'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 2:54:11'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'F35-39'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Nikki Leith'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 2:59:01'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'F30-34'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Lauren Matthews'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 3:01:17'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'F35-39'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Desiree Berry'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 3:05:42'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'F35-39'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Suzy Slane'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 3:06:24'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'F35-39'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Jen Edwards'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 3:06:36'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'F30-34'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Meghan Lederer'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 3:07:41'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'F30-34'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Carly Forte'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 3:08:58'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'F25-29'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Lauren Reasoner'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 3:10:14'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'F30-34'</span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">name</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">finish_time</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">division</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nf">LAG</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-k">name</span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">OVER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-k">PARTITION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">division</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">finish_time</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ASC</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">preceding_runner</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">finishers</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*-----------------+-------------+----------+------------------+</span>
<span class="devsite-syntax-cm"> | name            | finish_time | division | preceding_runner |</span>
<span class="devsite-syntax-cm"> +-----------------+-------------+----------+------------------+</span>
<span class="devsite-syntax-cm"> | Carly Forte     | 03:08:58    | F25-29   | NULL             |</span>
<span class="devsite-syntax-cm"> | Sophia Liu      | 02:51:45    | F30-34   | NULL             |</span>
<span class="devsite-syntax-cm"> | Nikki Leith     | 02:59:01    | F30-34   | Sophia Liu       |</span>
<span class="devsite-syntax-cm"> | Jen Edwards     | 03:06:36    | F30-34   | Nikki Leith      |</span>
<span class="devsite-syntax-cm"> | Meghan Lederer  | 03:07:41    | F30-34   | Jen Edwards      |</span>
<span class="devsite-syntax-cm"> | Lauren Reasoner | 03:10:14    | F30-34   | Meghan Lederer   |</span>
<span class="devsite-syntax-cm"> | Lisa Stelzner   | 02:54:11    | F35-39   | NULL             |</span>
<span class="devsite-syntax-cm"> | Lauren Matthews | 03:01:17    | F35-39   | Lisa Stelzner    |</span>
<span class="devsite-syntax-cm"> | Desiree Berry   | 03:05:42    | F35-39   | Lauren Matthews  |</span>
<span class="devsite-syntax-cm"> | Suzy Slane      | 03:06:24    | F35-39   | Desiree Berry    |</span>
<span class="devsite-syntax-cm"> +-----------------+-------------+----------+------------------*/</span>
</code></pre></devsite-code>
<p>This next example uses the optional <code translate="no" dir="ltr">offset</code> parameter.</p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">WITH</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">finishers</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span>
<span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Sophia Liu'</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">as</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">name</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 2:51:45'</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">as</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">finish_time</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-s1">'F30-34'</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">as</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">division</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Lisa Stelzner'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 2:54:11'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'F35-39'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Nikki Leith'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 2:59:01'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'F30-34'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Lauren Matthews'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 3:01:17'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'F35-39'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Desiree Berry'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 3:05:42'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'F35-39'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Suzy Slane'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 3:06:24'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'F35-39'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Jen Edwards'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 3:06:36'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'F30-34'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Meghan Lederer'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 3:07:41'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'F30-34'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Carly Forte'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 3:08:58'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'F25-29'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Lauren Reasoner'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 3:10:14'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'F30-34'</span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">name</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">finish_time</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">division</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nf">LAG</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-k">name</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">OVER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-k">PARTITION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">division</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">finish_time</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ASC</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">two_runners_ahead</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">finishers</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*-----------------+-------------+----------+-------------------+</span>
<span class="devsite-syntax-cm"> | name            | finish_time | division | two_runners_ahead |</span>
<span class="devsite-syntax-cm"> +-----------------+-------------+----------+-------------------+</span>
<span class="devsite-syntax-cm"> | Carly Forte     | 03:08:58    | F25-29   | NULL              |</span>
<span class="devsite-syntax-cm"> | Sophia Liu      | 02:51:45    | F30-34   | NULL              |</span>
<span class="devsite-syntax-cm"> | Nikki Leith     | 02:59:01    | F30-34   | NULL              |</span>
<span class="devsite-syntax-cm"> | Jen Edwards     | 03:06:36    | F30-34   | Sophia Liu        |</span>
<span class="devsite-syntax-cm"> | Meghan Lederer  | 03:07:41    | F30-34   | Nikki Leith       |</span>
<span class="devsite-syntax-cm"> | Lauren Reasoner | 03:10:14    | F30-34   | Jen Edwards       |</span>
<span class="devsite-syntax-cm"> | Lisa Stelzner   | 02:54:11    | F35-39   | NULL              |</span>
<span class="devsite-syntax-cm"> | Lauren Matthews | 03:01:17    | F35-39   | NULL              |</span>
<span class="devsite-syntax-cm"> | Desiree Berry   | 03:05:42    | F35-39   | Lisa Stelzner     |</span>
<span class="devsite-syntax-cm"> | Suzy Slane      | 03:06:24    | F35-39   | Lauren Matthews   |</span>
<span class="devsite-syntax-cm"> +-----------------+-------------+----------+-------------------*/</span>
</code></pre></devsite-code>
<p>The following example replaces NULL values with a default value.</p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">WITH</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">finishers</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span>
<span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Sophia Liu'</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">as</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">name</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 2:51:45'</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">as</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">finish_time</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-s1">'F30-34'</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">as</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">division</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Lisa Stelzner'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 2:54:11'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'F35-39'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Nikki Leith'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 2:59:01'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'F30-34'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Lauren Matthews'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 3:01:17'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'F35-39'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Desiree Berry'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 3:05:42'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'F35-39'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Suzy Slane'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 3:06:24'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'F35-39'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Jen Edwards'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 3:06:36'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'F30-34'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Meghan Lederer'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 3:07:41'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'F30-34'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Carly Forte'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 3:08:58'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'F25-29'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Lauren Reasoner'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 3:10:14'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'F30-34'</span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">name</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">finish_time</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">division</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nf">LAG</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-k">name</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Nobody'</span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">OVER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-k">PARTITION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">division</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">finish_time</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ASC</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">two_runners_ahead</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">finishers</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*-----------------+-------------+----------+-------------------+</span>
<span class="devsite-syntax-cm"> | name            | finish_time | division | two_runners_ahead |</span>
<span class="devsite-syntax-cm"> +-----------------+-------------+----------+-------------------+</span>
<span class="devsite-syntax-cm"> | Carly Forte     | 03:08:58    | F25-29   | Nobody            |</span>
<span class="devsite-syntax-cm"> | Sophia Liu      | 02:51:45    | F30-34   | Nobody            |</span>
<span class="devsite-syntax-cm"> | Nikki Leith     | 02:59:01    | F30-34   | Nobody            |</span>
<span class="devsite-syntax-cm"> | Jen Edwards     | 03:06:36    | F30-34   | Sophia Liu        |</span>
<span class="devsite-syntax-cm"> | Meghan Lederer  | 03:07:41    | F30-34   | Nikki Leith       |</span>
<span class="devsite-syntax-cm"> | Lauren Reasoner | 03:10:14    | F30-34   | Jen Edwards       |</span>
<span class="devsite-syntax-cm"> | Lisa Stelzner   | 02:54:11    | F35-39   | Nobody            |</span>
<span class="devsite-syntax-cm"> | Lauren Matthews | 03:01:17    | F35-39   | Nobody            |</span>
<span class="devsite-syntax-cm"> | Desiree Berry   | 03:05:42    | F35-39   | Lisa Stelzner     |</span>
<span class="devsite-syntax-cm"> | Suzy Slane      | 03:06:24    | F35-39   | Lauren Matthews   |</span>
<span class="devsite-syntax-cm"> +-----------------+-------------+----------+-------------------*/</span>
</code></pre></devsite-code>
<h2 id="last_value" data-text="LAST_VALUE" tabindex="-1"><code translate="no" dir="ltr">LAST_VALUE</code></h2>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-nf">LAST_VALUE</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">value_expression</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[{</span><span class="devsite-syntax-k">RESPECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">|</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">IGNORE</span><span class="devsite-syntax-err">}</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">NULLS</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-k">OVER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">over_clause</span>

<span class="devsite-syntax-n">over_clause</span><span class="devsite-syntax-err">:</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">{</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">named_window</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">|</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">window_specification</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">}</span>

<span class="devsite-syntax-n">window_specification</span><span class="devsite-syntax-err">:</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">named_window</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">PARTITION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">partition_expression</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">...</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">expression</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">{</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ASC</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">|</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">DESC</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">}</span><span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">...</span><span class="devsite-syntax-err">]</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">window_frame_clause</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>

</code></pre></devsite-code>
<p><strong>Description</strong></p>

<p>Returns the value of the <code translate="no" dir="ltr">value_expression</code> for the last row in the current
window frame.</p>

<p>This function includes <code translate="no" dir="ltr">NULL</code> values in the calculation unless <code translate="no" dir="ltr">IGNORE NULLS</code> is
present. If <code translate="no" dir="ltr">IGNORE NULLS</code> is present, the function excludes <code translate="no" dir="ltr">NULL</code> values from
the calculation.</p>

<p>To learn more about the <code translate="no" dir="ltr">OVER</code> clause and how to use it, see
<a href="/bigquery/docs/reference/standard-sql/window-function-calls">Window function calls</a>.</p>

<!-- mdlint off(WHITESPACE_LINE_LENGTH) -->

<!-- mdlint on -->

<p><strong>Supported Argument Types</strong></p>

<p><code translate="no" dir="ltr">value_expression</code> can be any data type that an expression can return.</p>

<p><strong>Return Data Type</strong></p>

<p>Same type as <code translate="no" dir="ltr">value_expression</code>.</p>

<p><strong>Examples</strong></p>

<p>The following example computes the slowest time for each division.</p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">WITH</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">finishers</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span>
<span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Sophia Liu'</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">as</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">name</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 2:51:45'</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">as</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">finish_time</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-s1">'F30-34'</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">as</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">division</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Lisa Stelzner'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 2:54:11'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'F35-39'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Nikki Leith'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 2:59:01'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'F30-34'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Lauren Matthews'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 3:01:17'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'F35-39'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Desiree Berry'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 3:05:42'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'F35-39'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Suzy Slane'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 3:06:24'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'F35-39'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Jen Edwards'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 3:06:36'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'F30-34'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Meghan Lederer'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 3:07:41'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'F30-34'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Carly Forte'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 3:08:58'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'F25-29'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Lauren Reasoner'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 3:10:14'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'F30-34'</span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">name</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nf">FORMAT_TIMESTAMP</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-s1">'%X'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">finish_time</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">finish_time</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">division</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nf">FORMAT_TIMESTAMP</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-s1">'%X'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">slowest_time</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">slowest_time</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nf">TIMESTAMP_DIFF</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">slowest_time</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">finish_time</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">SECOND</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">delta_in_seconds</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">name</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">finish_time</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">division</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nf">LAST_VALUE</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">finish_time</span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">OVER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-k">PARTITION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">division</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">finish_time</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ASC</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">ROWS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BETWEEN</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNBOUNDED</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">PRECEDING</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AND</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNBOUNDED</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">FOLLOWING</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">slowest_time</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">finishers</span><span class="devsite-syntax-p">);</span>

<span class="devsite-syntax-cm">/*-----------------+-------------+----------+--------------+------------------+</span>
<span class="devsite-syntax-cm"> | name            | finish_time | division | slowest_time | delta_in_seconds |</span>
<span class="devsite-syntax-cm"> +-----------------+-------------+----------+--------------+------------------+</span>
<span class="devsite-syntax-cm"> | Carly Forte     | 03:08:58    | F25-29   | 03:08:58     | 0                |</span>
<span class="devsite-syntax-cm"> | Sophia Liu      | 02:51:45    | F30-34   | 03:10:14     | 1109             |</span>
<span class="devsite-syntax-cm"> | Nikki Leith     | 02:59:01    | F30-34   | 03:10:14     | 673              |</span>
<span class="devsite-syntax-cm"> | Jen Edwards     | 03:06:36    | F30-34   | 03:10:14     | 218              |</span>
<span class="devsite-syntax-cm"> | Meghan Lederer  | 03:07:41    | F30-34   | 03:10:14     | 153              |</span>
<span class="devsite-syntax-cm"> | Lauren Reasoner | 03:10:14    | F30-34   | 03:10:14     | 0                |</span>
<span class="devsite-syntax-cm"> | Lisa Stelzner   | 02:54:11    | F35-39   | 03:06:24     | 733              |</span>
<span class="devsite-syntax-cm"> | Lauren Matthews | 03:01:17    | F35-39   | 03:06:24     | 307              |</span>
<span class="devsite-syntax-cm"> | Desiree Berry   | 03:05:42    | F35-39   | 03:06:24     | 42               |</span>
<span class="devsite-syntax-cm"> | Suzy Slane      | 03:06:24    | F35-39   | 03:06:24     | 0                |</span>
<span class="devsite-syntax-cm"> +-----------------+-------------+----------+--------------+------------------*/</span>
</code></pre></devsite-code>
<h2 id="lead" data-text="LEAD" tabindex="-1"><code translate="no" dir="ltr">LEAD</code></h2>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-nf">LEAD</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">value_expression</span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">offset</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">default_expression</span><span class="devsite-syntax-err">]]</span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-k">OVER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">over_clause</span>

<span class="devsite-syntax-n">over_clause</span><span class="devsite-syntax-err">:</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">{</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">named_window</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">|</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">window_specification</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">}</span>

<span class="devsite-syntax-n">window_specification</span><span class="devsite-syntax-err">:</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">named_window</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">PARTITION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">partition_expression</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">...</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">expression</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">{</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ASC</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">|</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">DESC</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">}</span><span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">...</span><span class="devsite-syntax-err">]</span>

</code></pre></devsite-code>
<p><strong>Description</strong></p>

<p>Returns the value of the <code translate="no" dir="ltr">value_expression</code> on a subsequent row. Changing the
<code translate="no" dir="ltr">offset</code> value changes which subsequent row is returned; the default value is
<code translate="no" dir="ltr">1</code>, indicating the next row in the window frame. An error occurs if <code translate="no" dir="ltr">offset</code> is
NULL or a negative value.</p>

<p>The optional <code translate="no" dir="ltr">default_expression</code> is used if there isn&#39;t a row in the window
frame at the specified offset. This expression must be a constant expression and
its type must be implicitly coercible to the type of <code translate="no" dir="ltr">value_expression</code>. If left
unspecified, <code translate="no" dir="ltr">default_expression</code> defaults to NULL.</p>

<p>To learn more about the <code translate="no" dir="ltr">OVER</code> clause and how to use it, see
<a href="/bigquery/docs/reference/standard-sql/window-function-calls">Window function calls</a>.</p>

<!-- mdlint off(WHITESPACE_LINE_LENGTH) -->

<!-- mdlint on -->

<p><strong>Supported Argument Types</strong></p>

<ul>
<li><code translate="no" dir="ltr">value_expression</code> can be any data type that can be returned from an
expression.</li>
<li><code translate="no" dir="ltr">offset</code> must be a non-negative integer literal or parameter.</li>
<li><code translate="no" dir="ltr">default_expression</code> must be compatible with the value expression type.</li>
</ul>

<p><strong>Return Data Type</strong></p>

<p>Same type as <code translate="no" dir="ltr">value_expression</code>.</p>

<p><strong>Examples</strong></p>

<p>The following example illustrates a basic use of the <code translate="no" dir="ltr">LEAD</code> function.</p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">WITH</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">finishers</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span>
<span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Sophia Liu'</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">as</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">name</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 2:51:45'</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">as</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">finish_time</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-s1">'F30-34'</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">as</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">division</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Lisa Stelzner'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 2:54:11'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'F35-39'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Nikki Leith'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 2:59:01'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'F30-34'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Lauren Matthews'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 3:01:17'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'F35-39'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Desiree Berry'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 3:05:42'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'F35-39'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Suzy Slane'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 3:06:24'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'F35-39'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Jen Edwards'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 3:06:36'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'F30-34'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Meghan Lederer'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 3:07:41'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'F30-34'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Carly Forte'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 3:08:58'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'F25-29'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Lauren Reasoner'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 3:10:14'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'F30-34'</span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">name</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">finish_time</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">division</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nf">LEAD</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-k">name</span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">OVER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-k">PARTITION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">division</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">finish_time</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ASC</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">followed_by</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">finishers</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*-----------------+-------------+----------+-----------------+</span>
<span class="devsite-syntax-cm"> | name            | finish_time | division | followed_by     |</span>
<span class="devsite-syntax-cm"> +-----------------+-------------+----------+-----------------+</span>
<span class="devsite-syntax-cm"> | Carly Forte     | 03:08:58    | F25-29   | NULL            |</span>
<span class="devsite-syntax-cm"> | Sophia Liu      | 02:51:45    | F30-34   | Nikki Leith     |</span>
<span class="devsite-syntax-cm"> | Nikki Leith     | 02:59:01    | F30-34   | Jen Edwards     |</span>
<span class="devsite-syntax-cm"> | Jen Edwards     | 03:06:36    | F30-34   | Meghan Lederer  |</span>
<span class="devsite-syntax-cm"> | Meghan Lederer  | 03:07:41    | F30-34   | Lauren Reasoner |</span>
<span class="devsite-syntax-cm"> | Lauren Reasoner | 03:10:14    | F30-34   | NULL            |</span>
<span class="devsite-syntax-cm"> | Lisa Stelzner   | 02:54:11    | F35-39   | Lauren Matthews |</span>
<span class="devsite-syntax-cm"> | Lauren Matthews | 03:01:17    | F35-39   | Desiree Berry   |</span>
<span class="devsite-syntax-cm"> | Desiree Berry   | 03:05:42    | F35-39   | Suzy Slane      |</span>
<span class="devsite-syntax-cm"> | Suzy Slane      | 03:06:24    | F35-39   | NULL            |</span>
<span class="devsite-syntax-cm"> +-----------------+-------------+----------+-----------------*/</span>
</code></pre></devsite-code>
<p>This next example uses the optional <code translate="no" dir="ltr">offset</code> parameter.</p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">WITH</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">finishers</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span>
<span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Sophia Liu'</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">as</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">name</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 2:51:45'</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">as</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">finish_time</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-s1">'F30-34'</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">as</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">division</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Lisa Stelzner'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 2:54:11'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'F35-39'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Nikki Leith'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 2:59:01'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'F30-34'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Lauren Matthews'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 3:01:17'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'F35-39'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Desiree Berry'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 3:05:42'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'F35-39'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Suzy Slane'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 3:06:24'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'F35-39'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Jen Edwards'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 3:06:36'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'F30-34'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Meghan Lederer'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 3:07:41'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'F30-34'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Carly Forte'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 3:08:58'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'F25-29'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Lauren Reasoner'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 3:10:14'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'F30-34'</span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">name</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">finish_time</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">division</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nf">LEAD</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-k">name</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">OVER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-k">PARTITION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">division</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">finish_time</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ASC</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">two_runners_back</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">finishers</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*-----------------+-------------+----------+------------------+</span>
<span class="devsite-syntax-cm"> | name            | finish_time | division | two_runners_back |</span>
<span class="devsite-syntax-cm"> +-----------------+-------------+----------+------------------+</span>
<span class="devsite-syntax-cm"> | Carly Forte     | 03:08:58    | F25-29   | NULL             |</span>
<span class="devsite-syntax-cm"> | Sophia Liu      | 02:51:45    | F30-34   | Jen Edwards      |</span>
<span class="devsite-syntax-cm"> | Nikki Leith     | 02:59:01    | F30-34   | Meghan Lederer   |</span>
<span class="devsite-syntax-cm"> | Jen Edwards     | 03:06:36    | F30-34   | Lauren Reasoner  |</span>
<span class="devsite-syntax-cm"> | Meghan Lederer  | 03:07:41    | F30-34   | NULL             |</span>
<span class="devsite-syntax-cm"> | Lauren Reasoner | 03:10:14    | F30-34   | NULL             |</span>
<span class="devsite-syntax-cm"> | Lisa Stelzner   | 02:54:11    | F35-39   | Desiree Berry    |</span>
<span class="devsite-syntax-cm"> | Lauren Matthews | 03:01:17    | F35-39   | Suzy Slane       |</span>
<span class="devsite-syntax-cm"> | Desiree Berry   | 03:05:42    | F35-39   | NULL             |</span>
<span class="devsite-syntax-cm"> | Suzy Slane      | 03:06:24    | F35-39   | NULL             |</span>
<span class="devsite-syntax-cm"> +-----------------+-------------+----------+------------------*/</span>
</code></pre></devsite-code>
<p>The following example replaces NULL values with a default value.</p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">WITH</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">finishers</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span>
<span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Sophia Liu'</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">as</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">name</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 2:51:45'</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">as</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">finish_time</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-s1">'F30-34'</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">as</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">division</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Lisa Stelzner'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 2:54:11'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'F35-39'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Nikki Leith'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 2:59:01'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'F30-34'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Lauren Matthews'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 3:01:17'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'F35-39'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Desiree Berry'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 3:05:42'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'F35-39'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Suzy Slane'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 3:06:24'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'F35-39'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Jen Edwards'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 3:06:36'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'F30-34'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Meghan Lederer'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 3:07:41'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'F30-34'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Carly Forte'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 3:08:58'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'F25-29'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Lauren Reasoner'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 3:10:14'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'F30-34'</span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">name</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">finish_time</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">division</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nf">LEAD</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-k">name</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Nobody'</span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">OVER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-k">PARTITION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">division</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">finish_time</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ASC</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">two_runners_back</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">finishers</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*-----------------+-------------+----------+------------------+</span>
<span class="devsite-syntax-cm"> | name            | finish_time | division | two_runners_back |</span>
<span class="devsite-syntax-cm"> +-----------------+-------------+----------+------------------+</span>
<span class="devsite-syntax-cm"> | Carly Forte     | 03:08:58    | F25-29   | Nobody           |</span>
<span class="devsite-syntax-cm"> | Sophia Liu      | 02:51:45    | F30-34   | Jen Edwards      |</span>
<span class="devsite-syntax-cm"> | Nikki Leith     | 02:59:01    | F30-34   | Meghan Lederer   |</span>
<span class="devsite-syntax-cm"> | Jen Edwards     | 03:06:36    | F30-34   | Lauren Reasoner  |</span>
<span class="devsite-syntax-cm"> | Meghan Lederer  | 03:07:41    | F30-34   | Nobody           |</span>
<span class="devsite-syntax-cm"> | Lauren Reasoner | 03:10:14    | F30-34   | Nobody           |</span>
<span class="devsite-syntax-cm"> | Lisa Stelzner   | 02:54:11    | F35-39   | Desiree Berry    |</span>
<span class="devsite-syntax-cm"> | Lauren Matthews | 03:01:17    | F35-39   | Suzy Slane       |</span>
<span class="devsite-syntax-cm"> | Desiree Berry   | 03:05:42    | F35-39   | Nobody           |</span>
<span class="devsite-syntax-cm"> | Suzy Slane      | 03:06:24    | F35-39   | Nobody           |</span>
<span class="devsite-syntax-cm"> +-----------------+-------------+----------+------------------*/</span>
</code></pre></devsite-code>
<h2 id="nth_value" data-text="NTH_VALUE" tabindex="-1"><code translate="no" dir="ltr">NTH_VALUE</code></h2>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-nf">NTH_VALUE</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">value_expression</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">constant_integer_expression</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[{</span><span class="devsite-syntax-k">RESPECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">|</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">IGNORE</span><span class="devsite-syntax-err">}</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">NULLS</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-k">OVER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">over_clause</span>

<span class="devsite-syntax-n">over_clause</span><span class="devsite-syntax-err">:</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">{</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">named_window</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">|</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">window_specification</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">}</span>

<span class="devsite-syntax-n">window_specification</span><span class="devsite-syntax-err">:</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">named_window</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">PARTITION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">partition_expression</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">...</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">expression</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">{</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ASC</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">|</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">DESC</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">}</span><span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">...</span><span class="devsite-syntax-err">]</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">window_frame_clause</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>

</code></pre></devsite-code>
<p><strong>Description</strong></p>

<p>Returns the value of <code translate="no" dir="ltr">value_expression</code> at the Nth row of the current window
frame, where Nth is defined by <code translate="no" dir="ltr">constant_integer_expression</code>. Returns NULL if
there is no such row.</p>

<p>This function includes <code translate="no" dir="ltr">NULL</code> values in the calculation unless <code translate="no" dir="ltr">IGNORE NULLS</code> is
present. If <code translate="no" dir="ltr">IGNORE NULLS</code> is present, the function excludes <code translate="no" dir="ltr">NULL</code> values from
the calculation.</p>

<p>To learn more about the <code translate="no" dir="ltr">OVER</code> clause and how to use it, see
<a href="/bigquery/docs/reference/standard-sql/window-function-calls">Window function calls</a>.</p>

<!-- mdlint off(WHITESPACE_LINE_LENGTH) -->

<!-- mdlint on -->

<p><strong>Supported Argument Types</strong></p>

<ul>
<li><code translate="no" dir="ltr">value_expression</code> can be any data type that can be returned from an
expression.</li>
<li><code translate="no" dir="ltr">constant_integer_expression</code> can be any constant expression that returns an
integer.</li>
</ul>

<p><strong>Return Data Type</strong></p>

<p>Same type as <code translate="no" dir="ltr">value_expression</code>.</p>

<p><strong>Examples</strong></p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">WITH</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">finishers</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span>
<span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Sophia Liu'</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">as</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">name</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 2:51:45'</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">as</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">finish_time</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-s1">'F30-34'</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">as</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">division</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Lisa Stelzner'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 2:54:11'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'F35-39'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Nikki Leith'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 2:59:01'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'F30-34'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Lauren Matthews'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 3:01:17'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'F35-39'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Desiree Berry'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 3:05:42'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'F35-39'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Suzy Slane'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 3:06:24'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'F35-39'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Jen Edwards'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 3:06:36'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'F30-34'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Meghan Lederer'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 3:07:41'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'F30-34'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Carly Forte'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 3:08:58'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'F25-29'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Lauren Reasoner'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-10-18 3:10:14'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'F30-34'</span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">name</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nf">FORMAT_TIMESTAMP</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-s1">'%X'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">finish_time</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">finish_time</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">division</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nf">FORMAT_TIMESTAMP</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-s1">'%X'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">fastest_time</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">fastest_time</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nf">FORMAT_TIMESTAMP</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-s1">'%X'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">second_fastest</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">second_fastest</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">name</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">finish_time</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">division</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-n">finishers</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nf">FIRST_VALUE</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">finish_time</span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">OVER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">w1</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">fastest_time</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nf">NTH_VALUE</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">finish_time</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">OVER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">w1</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">as</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">second_fastest</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">finishers</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">WINDOW</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">w1</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">PARTITION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">division</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">finish_time</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ASC</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">ROWS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BETWEEN</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNBOUNDED</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">PRECEDING</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AND</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNBOUNDED</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">FOLLOWING</span><span class="devsite-syntax-p">));</span>

<span class="devsite-syntax-cm">/*-----------------+-------------+----------+--------------+----------------+</span>
<span class="devsite-syntax-cm"> | name            | finish_time | division | fastest_time | second_fastest |</span>
<span class="devsite-syntax-cm"> +-----------------+-------------+----------+--------------+----------------+</span>
<span class="devsite-syntax-cm"> | Carly Forte     | 03:08:58    | F25-29   | 03:08:58     | NULL           |</span>
<span class="devsite-syntax-cm"> | Sophia Liu      | 02:51:45    | F30-34   | 02:51:45     | 02:59:01       |</span>
<span class="devsite-syntax-cm"> | Nikki Leith     | 02:59:01    | F30-34   | 02:51:45     | 02:59:01       |</span>
<span class="devsite-syntax-cm"> | Jen Edwards     | 03:06:36    | F30-34   | 02:51:45     | 02:59:01       |</span>
<span class="devsite-syntax-cm"> | Meghan Lederer  | 03:07:41    | F30-34   | 02:51:45     | 02:59:01       |</span>
<span class="devsite-syntax-cm"> | Lauren Reasoner | 03:10:14    | F30-34   | 02:51:45     | 02:59:01       |</span>
<span class="devsite-syntax-cm"> | Lisa Stelzner   | 02:54:11    | F35-39   | 02:54:11     | 03:01:17       |</span>
<span class="devsite-syntax-cm"> | Lauren Matthews | 03:01:17    | F35-39   | 02:54:11     | 03:01:17       |</span>
<span class="devsite-syntax-cm"> | Desiree Berry   | 03:05:42    | F35-39   | 02:54:11     | 03:01:17       |</span>
<span class="devsite-syntax-cm"> | Suzy Slane      | 03:06:24    | F35-39   | 02:54:11     | 03:01:17       |</span>
<span class="devsite-syntax-cm"> +-----------------+-------------+----------+--------------+----------------*/</span>
</code></pre></devsite-code>
<h2 id="percentile_cont" data-text="PERCENTILE_CONT" tabindex="-1"><code translate="no" dir="ltr">PERCENTILE_CONT</code></h2>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-nf">PERCENTILE_CONT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">value_expression</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">percentile</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[{</span><span class="devsite-syntax-k">RESPECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">|</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">IGNORE</span><span class="devsite-syntax-err">}</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">NULLS</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-k">OVER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">over_clause</span>

<span class="devsite-syntax-n">over_clause</span><span class="devsite-syntax-err">:</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">{</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">named_window</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">|</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">window_specification</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">}</span>

<span class="devsite-syntax-n">window_specification</span><span class="devsite-syntax-err">:</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">named_window</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">PARTITION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">partition_expression</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">...</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>

</code></pre></devsite-code>
<p><strong>Description</strong></p>

<p>Computes the specified percentile value for the value_expression, with linear
interpolation.</p>

<p>This function ignores NULL
values if
<code translate="no" dir="ltr">RESPECT NULLS</code> is absent. If <code translate="no" dir="ltr">RESPECT NULLS</code> is present:</p>

<ul>
<li>Interpolation between two <code translate="no" dir="ltr">NULL</code> values returns <code translate="no" dir="ltr">NULL</code>.</li>
<li>Interpolation between a <code translate="no" dir="ltr">NULL</code> value and a non-<code translate="no" dir="ltr">NULL</code> value returns the
non-<code translate="no" dir="ltr">NULL</code> value.</li>
</ul>

<p>To learn more about the <code translate="no" dir="ltr">OVER</code> clause and how to use it, see
<a href="/bigquery/docs/reference/standard-sql/window-function-calls">Window function calls</a>.</p>

<!-- mdlint off(WHITESPACE_LINE_LENGTH) -->

<!-- mdlint on -->

<p><code translate="no" dir="ltr">PERCENTILE_CONT</code> can be used with differential privacy. To learn more, see
<a href="/bigquery/docs/reference/standard-sql/aggregate-dp-functions">Differentially private aggregate functions</a>.</p>

<p><strong>Supported Argument Types</strong></p>

<ul>
<li><code translate="no" dir="ltr">value_expression</code> and <code translate="no" dir="ltr">percentile</code> must have one of the following types:
<ul>
<li><code translate="no" dir="ltr">NUMERIC</code></li>
<li><code translate="no" dir="ltr">BIGNUMERIC</code></li>
<li><code translate="no" dir="ltr">FLOAT64</code></li>
</ul></li>
<li><code translate="no" dir="ltr">percentile</code> must be a literal in the range <code translate="no" dir="ltr">[0, 1]</code>.</li>
</ul>

<p><strong>Return Data Type</strong></p>

<p>The return data type is determined by the argument types with the following
table.
<table></p>

<p><thead>
<tr>
<th>INPUT</th><th><code translate="no" dir="ltr">NUMERIC</code></th><th><code translate="no" dir="ltr">BIGNUMERIC</code></th><th><code translate="no" dir="ltr">FLOAT64</code></th>
</tr>
</thead>
<tbody>
<tr><th><code translate="no" dir="ltr">NUMERIC</code></th><td style="vertical-align:middle"><code translate="no" dir="ltr">NUMERIC</code></td><td style="vertical-align:middle"><code translate="no" dir="ltr">BIGNUMERIC</code></td><td style="vertical-align:middle"><code translate="no" dir="ltr">FLOAT64</code></td></tr>
<tr><th><code translate="no" dir="ltr">BIGNUMERIC</code></th><td style="vertical-align:middle"><code translate="no" dir="ltr">BIGNUMERIC</code></td><td style="vertical-align:middle"><code translate="no" dir="ltr">BIGNUMERIC</code></td><td style="vertical-align:middle"><code translate="no" dir="ltr">FLOAT64</code></td></tr>
<tr><th><code translate="no" dir="ltr">FLOAT64</code></th><td style="vertical-align:middle"><code translate="no" dir="ltr">FLOAT64</code></td><td style="vertical-align:middle"><code translate="no" dir="ltr">FLOAT64</code></td><td style="vertical-align:middle"><code translate="no" dir="ltr">FLOAT64</code></td></tr>
</tbody></p>

<p></table></p>

<p><strong>Examples</strong></p>

<p>The following example computes the value for some percentiles from a column of
values while ignoring nulls.</p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nf">PERCENTILE_CONT</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">0</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">OVER</span><span class="devsite-syntax-p">()</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">min</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nf">PERCENTILE_CONT</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mf">0.01</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">OVER</span><span class="devsite-syntax-p">()</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">percentile1</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nf">PERCENTILE_CONT</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mf">0.5</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">OVER</span><span class="devsite-syntax-p">()</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">median</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nf">PERCENTILE_CONT</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mf">0.9</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">OVER</span><span class="devsite-syntax-p">()</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">percentile90</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nf">PERCENTILE_CONT</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">1</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">OVER</span><span class="devsite-syntax-p">()</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">max</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNNEST</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-mi">0</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">3</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-no">NULL</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">1</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">LIMIT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">1</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-w"> </span><span class="devsite-syntax-cm">/*-----+-------------+--------+--------------+-----+</span>
<span class="devsite-syntax-cm">  | min | percentile1 | median | percentile90 | max |</span>
<span class="devsite-syntax-cm">  +-----+-------------+--------+--------------+-----+</span>
<span class="devsite-syntax-cm">  | 0   | 0.03        | 1.5    | 2.7          | 3   |</span>
<span class="devsite-syntax-cm">  +-----+-------------+--------+--------------+-----*/</span>
</code></pre></devsite-code>
<p>The following example computes the value for some percentiles from a column of
values while respecting nulls.</p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nf">PERCENTILE_CONT</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">0</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">RESPECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">NULLS</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">OVER</span><span class="devsite-syntax-p">()</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">min</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nf">PERCENTILE_CONT</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mf">0.01</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">RESPECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">NULLS</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">OVER</span><span class="devsite-syntax-p">()</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">percentile1</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nf">PERCENTILE_CONT</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mf">0.5</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">RESPECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">NULLS</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">OVER</span><span class="devsite-syntax-p">()</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">median</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nf">PERCENTILE_CONT</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mf">0.9</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">RESPECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">NULLS</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">OVER</span><span class="devsite-syntax-p">()</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">percentile90</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nf">PERCENTILE_CONT</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">1</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">RESPECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">NULLS</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">OVER</span><span class="devsite-syntax-p">()</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">max</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNNEST</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-mi">0</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">3</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-no">NULL</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">1</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">LIMIT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">1</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*------+-------------+--------+--------------+-----+</span>
<span class="devsite-syntax-cm"> | min  | percentile1 | median | percentile90 | max |</span>
<span class="devsite-syntax-cm"> +------+-------------+--------+--------------+-----+</span>
<span class="devsite-syntax-cm"> | NULL | 0           | 1      | 2.6          | 3   |</span>
<span class="devsite-syntax-cm"> +------+-------------+--------+--------------+-----*/</span>
</code></pre></devsite-code>
<h2 id="percentile_disc" data-text="PERCENTILE_DISC" tabindex="-1"><code translate="no" dir="ltr">PERCENTILE_DISC</code></h2>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-nf">PERCENTILE_DISC</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">value_expression</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">percentile</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[{</span><span class="devsite-syntax-k">RESPECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">|</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">IGNORE</span><span class="devsite-syntax-err">}</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">NULLS</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-k">OVER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">over_clause</span>

<span class="devsite-syntax-n">over_clause</span><span class="devsite-syntax-err">:</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">{</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">named_window</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">|</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">window_specification</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">}</span>

<span class="devsite-syntax-n">window_specification</span><span class="devsite-syntax-err">:</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">named_window</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">PARTITION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">partition_expression</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">...</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>

</code></pre></devsite-code>
<p><strong>Description</strong></p>

<p>Computes the specified percentile value for a discrete <code translate="no" dir="ltr">value_expression</code>. The
returned value is the first sorted value of <code translate="no" dir="ltr">value_expression</code> with cumulative
distribution greater than or equal to the given <code translate="no" dir="ltr">percentile</code> value.</p>

<p>This function ignores <code translate="no" dir="ltr">NULL</code>
values unless
<code translate="no" dir="ltr">RESPECT NULLS</code> is present.</p>

<p>To learn more about the <code translate="no" dir="ltr">OVER</code> clause and how to use it, see
<a href="/bigquery/docs/reference/standard-sql/window-function-calls">Window function calls</a>.</p>

<!-- mdlint off(WHITESPACE_LINE_LENGTH) -->

<!-- mdlint on -->
<aside class="note"><strong>Note:</strong><span> If you&#39;re querying a large dataset, you can compute results faster and
save resources by using <a href="/bigquery/docs/reference/standard-sql/kll_functions">KLL functions</a> for approximate
percentile values. For more information, see
<a href="/bigquery/docs/sketches">Sketches</a>.</span></aside>
<p><strong>Supported Argument Types</strong></p>

<ul>
<li><code translate="no" dir="ltr">value_expression</code> can be any orderable type.</li>
<li><code translate="no" dir="ltr">percentile</code> must be a literal in the range <code translate="no" dir="ltr">[0, 1]</code>, with one of the
following types:
<ul>
<li><code translate="no" dir="ltr">NUMERIC</code></li>
<li><code translate="no" dir="ltr">BIGNUMERIC</code></li>
<li><code translate="no" dir="ltr">FLOAT64</code></li>
</ul></li>
</ul>

<p><strong>Return Data Type</strong></p>

<p>Same type as <code translate="no" dir="ltr">value_expression</code>.</p>

<p><strong>Examples</strong></p>

<p>The following example computes the value for some percentiles from a column of
values while ignoring nulls.</p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nf">PERCENTILE_DISC</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">0</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">OVER</span><span class="devsite-syntax-p">()</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">min</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nf">PERCENTILE_DISC</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mf">0.5</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">OVER</span><span class="devsite-syntax-p">()</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">median</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nf">PERCENTILE_DISC</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">1</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">OVER</span><span class="devsite-syntax-p">()</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">max</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNNEST</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-s1">'c'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-no">NULL</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'b'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'a'</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*------+-----+--------+-----+</span>
<span class="devsite-syntax-cm"> | x    | min | median | max |</span>
<span class="devsite-syntax-cm"> +------+-----+--------+-----+</span>
<span class="devsite-syntax-cm"> | c    | a   | b      | c   |</span>
<span class="devsite-syntax-cm"> | NULL | a   | b      | c   |</span>
<span class="devsite-syntax-cm"> | b    | a   | b      | c   |</span>
<span class="devsite-syntax-cm"> | a    | a   | b      | c   |</span>
<span class="devsite-syntax-cm"> +------+-----+--------+-----*/</span>
</code></pre></devsite-code>
<p>The following example computes the value for some percentiles from a column of
values while respecting nulls.</p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nf">PERCENTILE_DISC</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">0</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">RESPECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">NULLS</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">OVER</span><span class="devsite-syntax-p">()</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">min</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nf">PERCENTILE_DISC</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mf">0.5</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">RESPECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">NULLS</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">OVER</span><span class="devsite-syntax-p">()</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">median</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nf">PERCENTILE_DISC</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">1</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">RESPECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">NULLS</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">OVER</span><span class="devsite-syntax-p">()</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">max</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNNEST</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-s1">'c'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-no">NULL</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'b'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'a'</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*------+------+--------+-----+</span>
<span class="devsite-syntax-cm"> | x    | min  | median | max |</span>
<span class="devsite-syntax-cm"> +------+------+--------+-----+</span>
<span class="devsite-syntax-cm"> | c    | NULL | a      | c   |</span>
<span class="devsite-syntax-cm"> | NULL | NULL | a      | c   |</span>
<span class="devsite-syntax-cm"> | b    | NULL | a      | c   |</span>
<span class="devsite-syntax-cm"> | a    | NULL | a      | c   |</span>
<span class="devsite-syntax-cm"> +------+------+--------+-----*/</span>

</code></pre></devsite-code>

  

  
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
