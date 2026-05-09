# BigQuery Date Functions

- Source ID: `SRC-BIGQUERY-DATE-FUNCTIONS`
- URL: https://cloud.google.com/bigquery/docs/reference/standard-sql/date_functions
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
      Date functions<devsite-actions hidden data-nosnippet><devsite-feature-tooltip
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





<p>GoogleSQL for BigQuery supports the following date functions.</p>

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
  <td><a href="/bigquery/docs/reference/standard-sql/date_functions#current_date"><code translate="no" dir="ltr">CURRENT_DATE</code></a>
</td>
  <td>
    Returns the current date as a <code translate="no" dir="ltr">DATE</code> value.
  </td>
</tr>

<tr>
  <td><a href="/bigquery/docs/reference/standard-sql/date_functions#date"><code translate="no" dir="ltr">DATE</code></a>
</td>
  <td>
    Constructs a <code translate="no" dir="ltr">DATE</code> value.
  </td>
</tr>

<tr>
  <td><a href="/bigquery/docs/reference/standard-sql/date_functions#date_add"><code translate="no" dir="ltr">DATE_ADD</code></a>
</td>
  <td>
    Adds a specified time interval to a <code translate="no" dir="ltr">DATE</code> value.
  </td>
</tr>

<tr>
  <td><a href="/bigquery/docs/reference/standard-sql/date_functions#date_diff"><code translate="no" dir="ltr">DATE_DIFF</code></a>
</td>
  <td>
    Gets the number of unit boundaries between two <code translate="no" dir="ltr">DATE</code> values
    at a particular time granularity.
  </td>
</tr>

<tr>
  <td><a href="/bigquery/docs/reference/standard-sql/date_functions#date_from_unix_date"><code translate="no" dir="ltr">DATE_FROM_UNIX_DATE</code></a>
</td>
  <td>
    Interprets an <code translate="no" dir="ltr">INT64</code> expression as the number of days
    since 1970-01-01.
    
  </td>
</tr>

<tr>
  <td><a href="/bigquery/docs/reference/standard-sql/date_functions#date_sub"><code translate="no" dir="ltr">DATE_SUB</code></a>
</td>
  <td>
    Subtracts a specified time interval from a <code translate="no" dir="ltr">DATE</code> value.
  </td>
</tr>

<tr>
  <td><a href="/bigquery/docs/reference/standard-sql/date_functions#date_trunc"><code translate="no" dir="ltr">DATE_TRUNC</code></a>
</td>
  <td>
    
    Truncates a <code translate="no" dir="ltr">DATE</code>, <code translate="no" dir="ltr">DATETIME</code>, or
    <code translate="no" dir="ltr">TIMESTAMP</code> value at a particular
    granularity.
    
  </td>
</tr>

<tr>
  <td><a href="/bigquery/docs/reference/standard-sql/date_functions#extract"><code translate="no" dir="ltr">EXTRACT</code></a>
</td>
  <td>
    Extracts part of a date from a <code translate="no" dir="ltr">DATE</code> value.
  </td>
</tr>

<tr>
  <td><a href="/bigquery/docs/reference/standard-sql/date_functions#format_date"><code translate="no" dir="ltr">FORMAT_DATE</code></a>
</td>
  <td>
    Formats a <code translate="no" dir="ltr">DATE</code> value according to a specified format string.
  </td>
</tr>

<tr>
  <td><a href="/bigquery/docs/reference/standard-sql/array_functions#generate_date_array"><code translate="no" dir="ltr">GENERATE_DATE_ARRAY</code></a>
</td>
  <td>
    Generates an array of dates in a range.
    <br>For more information, see <a href="/bigquery/docs/reference/standard-sql/array_functions">Array functions</a>.

  </td>
</tr>

<tr>
  <td><a href="/bigquery/docs/reference/standard-sql/date_functions#last_day"><code translate="no" dir="ltr">LAST_DAY</code></a>
</td>
  <td>
    Gets the last day in a specified time period that contains a
    <code translate="no" dir="ltr">DATE</code> value.
  </td>
</tr>

<tr>
  <td><a href="/bigquery/docs/reference/standard-sql/date_functions#parse_date"><code translate="no" dir="ltr">PARSE_DATE</code></a>
</td>
  <td>
    Converts a <code translate="no" dir="ltr">STRING</code> value to a <code translate="no" dir="ltr">DATE</code> value.
    
  </td>
</tr>

<tr>
  <td><a href="/bigquery/docs/reference/standard-sql/date_functions#unix_date"><code translate="no" dir="ltr">UNIX_DATE</code></a>
</td>
  <td>
    Converts a <code translate="no" dir="ltr">DATE</code> value to the number of days since 1970-01-01.
    
  </td>
</tr>

  </tbody>
</table>

<h2 id="current_date" data-text="CURRENT_DATE" tabindex="-1"><code translate="no" dir="ltr">CURRENT_DATE</code></h2>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-nf">CURRENT_DATE</span><span class="devsite-syntax-p">()</span>
</code></pre></devsite-code><div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-nf">CURRENT_DATE</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">time_zone_expression</span><span class="devsite-syntax-p">)</span>
</code></pre></devsite-code><div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-n">CURRENT_DATE</span>
</code></pre></devsite-code>
<p><strong>Description</strong></p>

<p>Returns the current date as a <code translate="no" dir="ltr">DATE</code> object. Parentheses are optional when
called with no arguments.</p>

<p>This function supports the following arguments:</p>

<ul>
<li><code translate="no" dir="ltr">time_zone_expression</code>: A <code translate="no" dir="ltr">STRING</code> expression that represents a
<a href="/bigquery/docs/reference/standard-sql/timestamp_functions#timezone_definitions">time zone</a>. If no time zone is specified, the
default time zone, UTC, is used. If this expression is
used and it evaluates to <code translate="no" dir="ltr">NULL</code>, this function returns <code translate="no" dir="ltr">NULL</code>.</li>
</ul>

<p>The current date value is set at the start of the query statement that contains
this function. All invocations of <code translate="no" dir="ltr">CURRENT_DATE()</code> within a query statement
yield the same value.</p>

<p><strong>Return Data Type</strong></p>

<p><code translate="no" dir="ltr">DATE</code></p>

<p><strong>Examples</strong></p>

<p>The following query produces the current date in the default time zone:</p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">CURRENT_DATE</span><span class="devsite-syntax-p">()</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">the_date</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*--------------+</span>
<span class="devsite-syntax-cm"> | the_date     |</span>
<span class="devsite-syntax-cm"> +--------------+</span>
<span class="devsite-syntax-cm"> | 2016-12-25   |</span>
<span class="devsite-syntax-cm"> +--------------*/</span>
</code></pre></devsite-code>
<p>The following queries produce the current date in a specified time zone:</p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">CURRENT_DATE</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-s1">'America/Los_Angeles'</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">the_date</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*--------------+</span>
<span class="devsite-syntax-cm"> | the_date     |</span>
<span class="devsite-syntax-cm"> +--------------+</span>
<span class="devsite-syntax-cm"> | 2016-12-25   |</span>
<span class="devsite-syntax-cm"> +--------------*/</span>
</code></pre></devsite-code><div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">CURRENT_DATE</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-s1">'-08'</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">the_date</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*--------------+</span>
<span class="devsite-syntax-cm"> | the_date     |</span>
<span class="devsite-syntax-cm"> +--------------+</span>
<span class="devsite-syntax-cm"> | 2016-12-25   |</span>
<span class="devsite-syntax-cm"> +--------------*/</span>
</code></pre></devsite-code>
<p>The following query produces the current date in the default time zone.
Parentheses aren&#39;t needed if the function has no arguments.</p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">CURRENT_DATE</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">the_date</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*--------------+</span>
<span class="devsite-syntax-cm"> | the_date     |</span>
<span class="devsite-syntax-cm"> +--------------+</span>
<span class="devsite-syntax-cm"> | 2016-12-25   |</span>
<span class="devsite-syntax-cm"> +--------------*/</span>
</code></pre></devsite-code>
<h2 id="date" data-text="DATE" tabindex="-1"><code translate="no" dir="ltr">DATE</code></h2>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-kt">DATE</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-k">year</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">month</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">day</span><span class="devsite-syntax-p">)</span>
</code></pre></devsite-code><div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-kt">DATE</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">timestamp_expression</span><span class="devsite-syntax-p">)</span>
</code></pre></devsite-code><div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-kt">DATE</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">timestamp_expression</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">time_zone_expression</span><span class="devsite-syntax-p">)</span>
</code></pre></devsite-code><div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-kt">DATE</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">datetime_expression</span><span class="devsite-syntax-p">)</span>
</code></pre></devsite-code>
<p><strong>Description</strong></p>

<p>Constructs or extracts a date.</p>

<p>This function supports the following arguments:</p>

<ul>
<li><code translate="no" dir="ltr">year</code>: The <code translate="no" dir="ltr">INT64</code> value for year.</li>
<li><code translate="no" dir="ltr">month</code>: The <code translate="no" dir="ltr">INT64</code> value for month.</li>
<li><code translate="no" dir="ltr">day</code>: The <code translate="no" dir="ltr">INT64</code> value for day.</li>
<li><code translate="no" dir="ltr">timestamp_expression</code>: A <code translate="no" dir="ltr">TIMESTAMP</code> expression that contains the date.</li>
<li><code translate="no" dir="ltr">time_zone_expression</code>: A <code translate="no" dir="ltr">STRING</code> expression that represents a
<a href="/bigquery/docs/reference/standard-sql/timestamp_functions#timezone_definitions">time zone</a>. If no time zone is specified with
<code translate="no" dir="ltr">timestamp_expression</code>, the default time zone, UTC, is
used.</li>
<li><code translate="no" dir="ltr">datetime_expression</code>: A <code translate="no" dir="ltr">DATETIME</code> expression that contains the date.</li>
</ul>

<p><strong>Return Data Type</strong></p>

<p><code translate="no" dir="ltr">DATE</code></p>

<p><strong>Example</strong></p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-kt">DATE</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-mi">2016</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">12</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">25</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">date_ymd</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-kt">DATE</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-kt">DATETIME</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-12-25 23:59:59'</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">date_dt</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-kt">DATE</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-12-25 05:30:00+07'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'America/Los_Angeles'</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">date_tstz</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*------------+------------+------------+</span>
<span class="devsite-syntax-cm"> | date_ymd   | date_dt    | date_tstz  |</span>
<span class="devsite-syntax-cm"> +------------+------------+------------+</span>
<span class="devsite-syntax-cm"> | 2016-12-25 | 2016-12-25 | 2016-12-24 |</span>
<span class="devsite-syntax-cm"> +------------+------------+------------*/</span>
</code></pre></devsite-code>
<h2 id="date_add" data-text="DATE_ADD" tabindex="-1"><code translate="no" dir="ltr">DATE_ADD</code></h2>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-nf">DATE_ADD</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">date_expression</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">INTERVAL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">int64_expression</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">date_part</span><span class="devsite-syntax-p">)</span>
</code></pre></devsite-code>
<p><strong>Description</strong></p>

<p>Adds a specified time interval to a DATE.</p>

<p><code translate="no" dir="ltr">DATE_ADD</code> supports the following <code translate="no" dir="ltr">date_part</code> values:</p>

<ul>
<li><code translate="no" dir="ltr">DAY</code></li>
<li><code translate="no" dir="ltr">WEEK</code>. Equivalent to 7 <code translate="no" dir="ltr">DAY</code>s.</li>
<li><code translate="no" dir="ltr">MONTH</code></li>
<li><code translate="no" dir="ltr">QUARTER</code></li>
<li><code translate="no" dir="ltr">YEAR</code></li>
</ul>

<p>Special handling is required for MONTH, QUARTER, and YEAR parts when
the date is at (or near) the last day of the month. If the resulting
month has fewer days than the original date&#39;s day, then the resulting
date is the last date of that month.</p>

<p><strong>Return Data Type</strong></p>

<p>DATE</p>

<p><strong>Example</strong></p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">DATE_ADD</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-kt">DATE</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2008-12-25'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">INTERVAL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">5</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">DAY</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">five_days_later</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*--------------------+</span>
<span class="devsite-syntax-cm"> | five_days_later    |</span>
<span class="devsite-syntax-cm"> +--------------------+</span>
<span class="devsite-syntax-cm"> | 2008-12-30         |</span>
<span class="devsite-syntax-cm"> +--------------------*/</span>
</code></pre></devsite-code>
<h2 id="date_diff" data-text="DATE_DIFF" tabindex="-1"><code translate="no" dir="ltr">DATE_DIFF</code></h2>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-nf">DATE_DIFF</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">end_date</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">start_date</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">granularity</span><span class="devsite-syntax-p">)</span>
</code></pre></devsite-code>
<p><strong>Description</strong></p>

<p>Gets the number of unit boundaries between two <code translate="no" dir="ltr">DATE</code> values (<code translate="no" dir="ltr">end_date</code> -
<code translate="no" dir="ltr">start_date</code>) at a particular time granularity.</p>

<p><strong>Definitions</strong></p>

<ul>
<li><code translate="no" dir="ltr">start_date</code>: The starting <code translate="no" dir="ltr">DATE</code> value.</li>
<li><code translate="no" dir="ltr">end_date</code>: The ending <code translate="no" dir="ltr">DATE</code> value.</li>
<li><p><code translate="no" dir="ltr">granularity</code>: The date part that represents the granularity. If
you have passed in <code translate="no" dir="ltr">DATE</code> values for the first arguments, <code translate="no" dir="ltr">granularity</code> can
be:</p>

<ul>
<li><code translate="no" dir="ltr">DAY</code></li>
<li><code translate="no" dir="ltr">WEEK</code> This date part begins on Sunday.</li>
<li><code translate="no" dir="ltr">WEEK(&lt;WEEKDAY&gt;)</code>: This date part begins on <code translate="no" dir="ltr">WEEKDAY</code>. Valid values for
<code translate="no" dir="ltr">WEEKDAY</code> are <code translate="no" dir="ltr">SUNDAY</code>, <code translate="no" dir="ltr">MONDAY</code>, <code translate="no" dir="ltr">TUESDAY</code>, <code translate="no" dir="ltr">WEDNESDAY</code>, <code translate="no" dir="ltr">THURSDAY</code>,
<code translate="no" dir="ltr">FRIDAY</code>, and <code translate="no" dir="ltr">SATURDAY</code>.</li>
<li><code translate="no" dir="ltr">ISOWEEK</code>: Uses <a href="https://en.wikipedia.org/wiki/ISO_week_date">ISO 8601 week</a> boundaries. ISO weeks
begin on Monday.</li>
<li><code translate="no" dir="ltr">MONTH</code></li>
<li><code translate="no" dir="ltr">QUARTER</code></li>
<li><code translate="no" dir="ltr">YEAR</code></li>
<li><code translate="no" dir="ltr">ISOYEAR</code>: Uses the <a href="https://en.wikipedia.org/wiki/ISO_8601">ISO 8601</a> week-numbering year boundary.
The ISO year boundary is the Monday of the first week whose Thursday
belongs to the corresponding Gregorian calendar year.</li>
</ul></li>
</ul>

<p><strong>Details</strong></p>

<p>If <code translate="no" dir="ltr">end_date</code> is earlier than <code translate="no" dir="ltr">start_date</code>, the output is negative.</p>
<aside class="note"><strong>Note:</strong><span> The behavior of the this function follows the type of arguments passed in.
For example, <code translate="no" dir="ltr">DATE_DIFF(TIMESTAMP, TIMESTAMP, PART)</code>
behaves like <code translate="no" dir="ltr">TIMESTAMP_DIFF(TIMESTAMP, TIMESTAMP, PART)</code>.</span></aside>
<p><strong>Return Data Type</strong></p>

<p><code translate="no" dir="ltr">INT64</code></p>

<p><strong>Example</strong></p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">DATE_DIFF</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-kt">DATE</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2010-07-07'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">DATE</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2008-12-25'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">DAY</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">days_diff</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*-----------+</span>
<span class="devsite-syntax-cm"> | days_diff |</span>
<span class="devsite-syntax-cm"> +-----------+</span>
<span class="devsite-syntax-cm"> | 559       |</span>
<span class="devsite-syntax-cm"> +-----------*/</span>
</code></pre></devsite-code><div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nf">DATE_DIFF</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-kt">DATE</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2017-10-15'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">DATE</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2017-10-14'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">DAY</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">days_diff</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nf">DATE_DIFF</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-kt">DATE</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2017-10-15'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">DATE</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2017-10-14'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">WEEK</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">weeks_diff</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*-----------+------------+</span>
<span class="devsite-syntax-cm"> | days_diff | weeks_diff |</span>
<span class="devsite-syntax-cm"> +-----------+------------+</span>
<span class="devsite-syntax-cm"> | 1         | 1          |</span>
<span class="devsite-syntax-cm"> +-----------+------------*/</span>
</code></pre></devsite-code>
<p>The example above shows the result of <code translate="no" dir="ltr">DATE_DIFF</code> for two days in succession.
<code translate="no" dir="ltr">DATE_DIFF</code> with the date part <code translate="no" dir="ltr">WEEK</code> returns 1 because <code translate="no" dir="ltr">DATE_DIFF</code> counts the
number of date part boundaries in this range of dates. Each <code translate="no" dir="ltr">WEEK</code> begins on
Sunday, so there is one date part boundary between Saturday, 2017-10-14
and Sunday, 2017-10-15.</p>

<p>The following example shows the result of <code translate="no" dir="ltr">DATE_DIFF</code> for two dates in different
years. <code translate="no" dir="ltr">DATE_DIFF</code> with the date part <code translate="no" dir="ltr">YEAR</code> returns 3 because it counts the
number of Gregorian calendar year boundaries between the two dates. <code translate="no" dir="ltr">DATE_DIFF</code>
with the date part <code translate="no" dir="ltr">ISOYEAR</code> returns 2 because the second date belongs to the
ISO year 2015. The first Thursday of the 2015 calendar year was 2015-01-01, so
the ISO year 2015 begins on the preceding Monday, 2014-12-29.</p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nf">DATE_DIFF</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-s1">'2017-12-30'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2014-12-30'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">YEAR</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">year_diff</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nf">DATE_DIFF</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-s1">'2017-12-30'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2014-12-30'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ISOYEAR</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">isoyear_diff</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*-----------+--------------+</span>
<span class="devsite-syntax-cm"> | year_diff | isoyear_diff |</span>
<span class="devsite-syntax-cm"> +-----------+--------------+</span>
<span class="devsite-syntax-cm"> | 3         | 2            |</span>
<span class="devsite-syntax-cm"> +-----------+--------------*/</span>
</code></pre></devsite-code>
<p>The following example shows the result of <code translate="no" dir="ltr">DATE_DIFF</code> for two days in
succession. The first date falls on a Monday and the second date falls on a
Sunday. <code translate="no" dir="ltr">DATE_DIFF</code> with the date part <code translate="no" dir="ltr">WEEK</code> returns 0 because this date part
uses weeks that begin on Sunday. <code translate="no" dir="ltr">DATE_DIFF</code> with the date part <code translate="no" dir="ltr">WEEK(MONDAY)</code>
returns 1. <code translate="no" dir="ltr">DATE_DIFF</code> with the date part <code translate="no" dir="ltr">ISOWEEK</code> also returns 1 because
ISO weeks begin on Monday.</p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nf">DATE_DIFF</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-s1">'2017-12-18'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2017-12-17'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">WEEK</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">week_diff</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nf">DATE_DIFF</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-s1">'2017-12-18'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2017-12-17'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">WEEK</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-k">MONDAY</span><span class="devsite-syntax-p">))</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">week_weekday_diff</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nf">DATE_DIFF</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-s1">'2017-12-18'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2017-12-17'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">ISOWEEK</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">isoweek_diff</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*-----------+-------------------+--------------+</span>
<span class="devsite-syntax-cm"> | week_diff | week_weekday_diff | isoweek_diff |</span>
<span class="devsite-syntax-cm"> +-----------+-------------------+--------------+</span>
<span class="devsite-syntax-cm"> | 0         | 1                 | 1            |</span>
<span class="devsite-syntax-cm"> +-----------+-------------------+--------------*/</span>
</code></pre></devsite-code>
<h2 id="date_from_unix_date" data-text="DATE_FROM_UNIX_DATE" tabindex="-1"><code translate="no" dir="ltr">DATE_FROM_UNIX_DATE</code></h2>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-nf">DATE_FROM_UNIX_DATE</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">int64_expression</span><span class="devsite-syntax-p">)</span>
</code></pre></devsite-code>
<p><strong>Description</strong></p>

<p>Interprets <code translate="no" dir="ltr">int64_expression</code> as the number of days since 1970-01-01.</p>

<p><strong>Return Data Type</strong></p>

<p>DATE</p>

<p><strong>Example</strong></p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">DATE_FROM_UNIX_DATE</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-mi">14238</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">date_from_epoch</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*-----------------+</span>
<span class="devsite-syntax-cm"> | date_from_epoch |</span>
<span class="devsite-syntax-cm"> +-----------------+</span>
<span class="devsite-syntax-cm"> | 2008-12-25      |</span>
<span class="devsite-syntax-cm"> +-----------------+*/</span>
</code></pre></devsite-code>
<h2 id="date_sub" data-text="DATE_SUB" tabindex="-1"><code translate="no" dir="ltr">DATE_SUB</code></h2>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-nf">DATE_SUB</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">date_expression</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">INTERVAL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">int64_expression</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">date_part</span><span class="devsite-syntax-p">)</span>
</code></pre></devsite-code>
<p><strong>Description</strong></p>

<p>Subtracts a specified time interval from a DATE.</p>

<p><code translate="no" dir="ltr">DATE_SUB</code> supports the following <code translate="no" dir="ltr">date_part</code> values:</p>

<ul>
<li><code translate="no" dir="ltr">DAY</code></li>
<li><code translate="no" dir="ltr">WEEK</code>. Equivalent to 7 <code translate="no" dir="ltr">DAY</code>s.</li>
<li><code translate="no" dir="ltr">MONTH</code></li>
<li><code translate="no" dir="ltr">QUARTER</code></li>
<li><code translate="no" dir="ltr">YEAR</code></li>
</ul>

<p>Special handling is required for MONTH, QUARTER, and YEAR parts when
the date is at (or near) the last day of the month. If the resulting
month has fewer days than the original date&#39;s day, then the resulting
date is the last date of that month.</p>

<p><strong>Return Data Type</strong></p>

<p>DATE</p>

<p><strong>Example</strong></p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">DATE_SUB</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-kt">DATE</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2008-12-25'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">INTERVAL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">5</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">DAY</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">five_days_ago</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*---------------+</span>
<span class="devsite-syntax-cm"> | five_days_ago |</span>
<span class="devsite-syntax-cm"> +---------------+</span>
<span class="devsite-syntax-cm"> | 2008-12-20    |</span>
<span class="devsite-syntax-cm"> +---------------*/</span>
</code></pre></devsite-code>
<h2 id="date_trunc" data-text="DATE_TRUNC" tabindex="-1"><code translate="no" dir="ltr">DATE_TRUNC</code></h2>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-nf">DATE_TRUNC</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">date_value</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">date_granularity</span><span class="devsite-syntax-p">)</span>
</code></pre></devsite-code><div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-nf">DATE_TRUNC</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">datetime_value</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">datetime_granularity</span><span class="devsite-syntax-p">)</span>
</code></pre></devsite-code><div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-nf">DATE_TRUNC</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">timestamp_value</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">timestamp_granularity</span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">time_zone</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-p">)</span>
</code></pre></devsite-code>
<p><strong>Description</strong></p>

<p>Truncates a <code translate="no" dir="ltr">DATE</code>, <code translate="no" dir="ltr">DATETIME</code>, or <code translate="no" dir="ltr">TIMESTAMP</code> value at a particular
granularity.</p>

<p><strong>Definitions</strong></p>

<ul>
<li><code translate="no" dir="ltr">date_value</code>: A <code translate="no" dir="ltr">DATE</code> value to truncate.</li>
<li><code translate="no" dir="ltr">date_granularity</code>: The truncation granularity for a <code translate="no" dir="ltr">DATE</code> value.
<a href="#date_trunc_granularity_date">Date granularities</a> can be used.</li>
<li><code translate="no" dir="ltr">datetime_value</code>: A <code translate="no" dir="ltr">DATETIME</code> value to truncate.</li>
<li><code translate="no" dir="ltr">datetime_granularity</code>: The truncation granularity for a <code translate="no" dir="ltr">DATETIME</code> value.
<a href="#date_trunc_granularity_date">Date granularities</a> and
<a href="#date_trunc_granularity_time">time granularities</a> can be used.</li>
<li><code translate="no" dir="ltr">timestamp_value</code>: A <code translate="no" dir="ltr">TIMESTAMP</code> value to truncate.</li>
<li><code translate="no" dir="ltr">timestamp_granularity</code>: The truncation granularity for a <code translate="no" dir="ltr">TIMESTAMP</code> value.
<a href="#date_trunc_granularity_date">Date granularities</a> and
<a href="#date_trunc_granularity_time">time granularities</a> can be used.</li>
<li><p><code translate="no" dir="ltr">time_zone</code>: A time zone to use with the <code translate="no" dir="ltr">TIMESTAMP</code> value.
<a href="#date_time_zone_parts">Time zone parts</a> can be used.
Use this argument if you want to use a time zone other than
the default time zone, UTC, as part of the
truncate operation.</p>
<aside class="note"><strong>Note:</strong><span> When truncating a timestamp to <code translate="no" dir="ltr">MINUTE</code>
or <code translate="no" dir="ltr">HOUR</code> parts, this function determines the civil time of the
timestamp in the specified (or default) time zone
and subtracts the minutes and seconds (when truncating to <code translate="no" dir="ltr">HOUR</code>) or the
seconds (when truncating to <code translate="no" dir="ltr">MINUTE</code>) from that timestamp.
While this provides intuitive results in most cases, the result is
non-intuitive near daylight savings transitions that aren&#39;t hour-aligned.</span></aside></li>
</ul>

<p><a id="date_trunc_granularity_date"></a></p>

<p><strong>Date granularity definitions</strong></p>

<ul>
<li><p><code translate="no" dir="ltr">DAY</code>: The day in the Gregorian calendar year that contains the
value to truncate.</p></li>
<li><p><code translate="no" dir="ltr">WEEK</code>: The first day in the week that contains the
value to truncate. Weeks begin on Sundays. <code translate="no" dir="ltr">WEEK</code> is equivalent to
<code translate="no" dir="ltr">WEEK(SUNDAY)</code>.</p></li>
<li><p><code translate="no" dir="ltr">WEEK(WEEKDAY)</code>: The first day in the week that contains the
value to truncate. Weeks begin on <code translate="no" dir="ltr">WEEKDAY</code>. <code translate="no" dir="ltr">WEEKDAY</code> must be one of the
 following: <code translate="no" dir="ltr">SUNDAY</code>, <code translate="no" dir="ltr">MONDAY</code>, <code translate="no" dir="ltr">TUESDAY</code>, <code translate="no" dir="ltr">WEDNESDAY</code>, <code translate="no" dir="ltr">THURSDAY</code>, <code translate="no" dir="ltr">FRIDAY</code>,
 or <code translate="no" dir="ltr">SATURDAY</code>.</p></li>
<li><p><code translate="no" dir="ltr">ISOWEEK</code>: The first day in the <a href="https://en.wikipedia.org/wiki/ISO_week_date">ISO 8601 week</a> that contains
the value to truncate. The ISO week begins on
Monday. The first ISO week of each ISO year contains the first Thursday of the
corresponding Gregorian calendar year.</p></li>
<li><p><code translate="no" dir="ltr">MONTH</code>: The first day in the month that contains the
value to truncate.</p></li>
<li><p><code translate="no" dir="ltr">QUARTER</code>: The first day in the quarter that contains the
value to truncate.</p></li>
<li><p><code translate="no" dir="ltr">YEAR</code>: The first day in the year that contains the
value to truncate.</p></li>
<li><p><code translate="no" dir="ltr">ISOYEAR</code>: The first day in the <a href="https://en.wikipedia.org/wiki/ISO_8601">ISO 8601</a> week-numbering year
that contains the value to truncate. The ISO year is the
Monday of the first week where Thursday belongs to the corresponding
Gregorian calendar year.</p></li>
</ul>

<!-- mdlint off(WHITESPACE_LINE_LENGTH) -->

<!-- mdlint on -->

<p><a id="date_trunc_granularity_time"></a></p>

<p><strong>Time granularity definitions</strong></p>

<ul>
<li><p><code translate="no" dir="ltr">MICROSECOND</code>: If used, nothing is truncated from the value.</p></li>
<li><p><code translate="no" dir="ltr">MILLISECOND</code>: The nearest lesser than or equal millisecond.</p></li>
<li><p><code translate="no" dir="ltr">SECOND</code>: The nearest lesser than or equal second.</p></li>
<li><p><code translate="no" dir="ltr">MINUTE</code>: The nearest lesser than or equal minute.</p></li>
<li><p><code translate="no" dir="ltr">HOUR</code>: The nearest lesser than or equal hour.</p></li>
</ul>

<p><a id="date_time_zone_parts"></a></p>

<p><strong>Time zone part definitions</strong></p>

<ul>
<li><code translate="no" dir="ltr">MINUTE</code></li>
<li><code translate="no" dir="ltr">HOUR</code></li>
<li><code translate="no" dir="ltr">DAY</code></li>
<li><code translate="no" dir="ltr">WEEK</code></li>
<li><code translate="no" dir="ltr">WEEK(&lt;WEEKDAY&gt;)</code></li>
<li><code translate="no" dir="ltr">ISOWEEK</code></li>
<li><code translate="no" dir="ltr">MONTH</code></li>
<li><code translate="no" dir="ltr">QUARTER</code></li>
<li><code translate="no" dir="ltr">YEAR</code></li>
<li><code translate="no" dir="ltr">ISOYEAR</code></li>
</ul>

<p><strong>Details</strong></p>

<p>The resulting value is always rounded to the beginning of <code translate="no" dir="ltr">granularity</code>.</p>

<p><strong>Return Data Type</strong></p>

<p>The same data type as the first argument passed into this function.</p>

<p><strong>Examples</strong></p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">DATE_TRUNC</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-kt">DATE</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2008-12-25'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">MONTH</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">month</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*------------+</span>
<span class="devsite-syntax-cm"> | month      |</span>
<span class="devsite-syntax-cm"> +------------+</span>
<span class="devsite-syntax-cm"> | 2008-12-01 |</span>
<span class="devsite-syntax-cm"> +------------*/</span>
</code></pre></devsite-code>
<p>In the following example, the original date falls on a Sunday. Because
the <code translate="no" dir="ltr">date_part</code> is <code translate="no" dir="ltr">WEEK(MONDAY)</code>, <code translate="no" dir="ltr">DATE_TRUNC</code> returns the <code translate="no" dir="ltr">DATE</code> for the
preceding Monday.</p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">date</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">original</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">DATE_TRUNC</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-kt">date</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">WEEK</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-k">MONDAY</span><span class="devsite-syntax-p">))</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">truncated</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">DATE</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-s1">'2017-11-05'</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">date</span><span class="devsite-syntax-p">);</span>

<span class="devsite-syntax-cm">/*------------+------------+</span>
<span class="devsite-syntax-cm"> | original   | truncated  |</span>
<span class="devsite-syntax-cm"> +------------+------------+</span>
<span class="devsite-syntax-cm"> | 2017-11-05 | 2017-10-30 |</span>
<span class="devsite-syntax-cm"> +------------+------------*/</span>
</code></pre></devsite-code>
<p>In the following example, the original <code translate="no" dir="ltr">date_expression</code> is in the Gregorian
calendar year 2015. However, <code translate="no" dir="ltr">DATE_TRUNC</code> with the <code translate="no" dir="ltr">ISOYEAR</code> date part
truncates the <code translate="no" dir="ltr">date_expression</code> to the beginning of the ISO year, not the
Gregorian calendar year. The first Thursday of the 2015 calendar year was
2015-01-01, so the ISO year 2015 begins on the preceding Monday, 2014-12-29.
Therefore the ISO year boundary preceding the <code translate="no" dir="ltr">date_expression</code> 2015-06-15 is
2014-12-29.</p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nf">DATE_TRUNC</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-s1">'2015-06-15'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ISOYEAR</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">isoyear_boundary</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">EXTRACT</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-k">ISOYEAR</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">DATE</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2015-06-15'</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">isoyear_number</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*------------------+----------------+</span>
<span class="devsite-syntax-cm"> | isoyear_boundary | isoyear_number |</span>
<span class="devsite-syntax-cm"> +------------------+----------------+</span>
<span class="devsite-syntax-cm"> | 2014-12-29       | 2015           |</span>
<span class="devsite-syntax-cm"> +------------------+----------------*/</span>
</code></pre></devsite-code>
<h2 id="extract" data-text="EXTRACT" tabindex="-1"><code translate="no" dir="ltr">EXTRACT</code></h2>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">EXTRACT</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">part</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">date_expression</span><span class="devsite-syntax-p">)</span>
</code></pre></devsite-code>
<p><strong>Description</strong></p>

<p>Returns the value corresponding to the specified date part. The <code translate="no" dir="ltr">part</code> must
be one of:</p>

<ul>
<li><code translate="no" dir="ltr">DAYOFWEEK</code>: Returns values in the range [1,7] with Sunday as the first day
of the week.</li>
<li><code translate="no" dir="ltr">DAY</code></li>
<li><code translate="no" dir="ltr">DAYOFYEAR</code></li>
<li><code translate="no" dir="ltr">WEEK</code>: Returns the week number of the date in the range [0, 53]. Weeks begin
with Sunday, and dates prior to the first Sunday of the year are in week
0.</li>
<li><code translate="no" dir="ltr">WEEK(&lt;WEEKDAY&gt;)</code>: Returns the week number of the date in the range [0, 53].
Weeks begin on <code translate="no" dir="ltr">WEEKDAY</code>. Dates prior to
the first <code translate="no" dir="ltr">WEEKDAY</code> of the year are in week 0. Valid values for <code translate="no" dir="ltr">WEEKDAY</code> are
<code translate="no" dir="ltr">SUNDAY</code>, <code translate="no" dir="ltr">MONDAY</code>, <code translate="no" dir="ltr">TUESDAY</code>, <code translate="no" dir="ltr">WEDNESDAY</code>, <code translate="no" dir="ltr">THURSDAY</code>, <code translate="no" dir="ltr">FRIDAY</code>, and
<code translate="no" dir="ltr">SATURDAY</code>.</li>
<li><code translate="no" dir="ltr">ISOWEEK</code>: Returns the <a href="https://en.wikipedia.org/wiki/ISO_week_date">ISO 8601 week</a>
number of the <code translate="no" dir="ltr">date_expression</code>. <code translate="no" dir="ltr">ISOWEEK</code>s begin on Monday. Return values
are in the range [1, 53]. The first <code translate="no" dir="ltr">ISOWEEK</code> of each ISO year begins on the
Monday before the first Thursday of the Gregorian calendar year.</li>
<li><code translate="no" dir="ltr">MONTH</code></li>
<li><code translate="no" dir="ltr">QUARTER</code>: Returns values in the range [1,4].</li>
<li><code translate="no" dir="ltr">YEAR</code></li>
<li><code translate="no" dir="ltr">ISOYEAR</code>: Returns the <a href="https://en.wikipedia.org/wiki/ISO_8601">ISO 8601</a>
week-numbering year, which is the Gregorian calendar year containing the
Thursday of the week to which <code translate="no" dir="ltr">date_expression</code> belongs.</li>
</ul>

<p><strong>Return Data Type</strong></p>

<p>INT64</p>

<p><strong>Examples</strong></p>

<p>In the following example, <code translate="no" dir="ltr">EXTRACT</code> returns a value corresponding to the <code translate="no" dir="ltr">DAY</code>
date part.</p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">EXTRACT</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-k">DAY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">DATE</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2013-12-25'</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">the_day</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*---------+</span>
<span class="devsite-syntax-cm"> | the_day |</span>
<span class="devsite-syntax-cm"> +---------+</span>
<span class="devsite-syntax-cm"> | 25      |</span>
<span class="devsite-syntax-cm"> +---------*/</span>
</code></pre></devsite-code>
<p>In the following example, <code translate="no" dir="ltr">EXTRACT</code> returns values corresponding to different
date parts from a column of dates near the end of the year.</p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-kt">date</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">EXTRACT</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-k">ISOYEAR</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">date</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">isoyear</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">EXTRACT</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-k">ISOWEEK FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">date</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">isoweek</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">EXTRACT</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-k">YEAR</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">date</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">year</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">EXTRACT</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-k">WEEK</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">date</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">week</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNNEST</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-nf">GENERATE_DATE_ARRAY</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-s1">'2015-12-23'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2016-01-09'</span><span class="devsite-syntax-p">))</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">date</span>
<span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">date</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*------------+---------+---------+------+------+</span>
<span class="devsite-syntax-cm"> | date       | isoyear | isoweek | year | week |</span>
<span class="devsite-syntax-cm"> +------------+---------+---------+------+------+</span>
<span class="devsite-syntax-cm"> | 2015-12-23 | 2015    | 52      | 2015 | 51   |</span>
<span class="devsite-syntax-cm"> | 2015-12-24 | 2015    | 52      | 2015 | 51   |</span>
<span class="devsite-syntax-cm"> | 2015-12-25 | 2015    | 52      | 2015 | 51   |</span>
<span class="devsite-syntax-cm"> | 2015-12-26 | 2015    | 52      | 2015 | 51   |</span>
<span class="devsite-syntax-cm"> | 2015-12-27 | 2015    | 52      | 2015 | 52   |</span>
<span class="devsite-syntax-cm"> | 2015-12-28 | 2015    | 53      | 2015 | 52   |</span>
<span class="devsite-syntax-cm"> | 2015-12-29 | 2015    | 53      | 2015 | 52   |</span>
<span class="devsite-syntax-cm"> | 2015-12-30 | 2015    | 53      | 2015 | 52   |</span>
<span class="devsite-syntax-cm"> | 2015-12-31 | 2015    | 53      | 2015 | 52   |</span>
<span class="devsite-syntax-cm"> | 2016-01-01 | 2015    | 53      | 2016 | 0    |</span>
<span class="devsite-syntax-cm"> | 2016-01-02 | 2015    | 53      | 2016 | 0    |</span>
<span class="devsite-syntax-cm"> | 2016-01-03 | 2015    | 53      | 2016 | 1    |</span>
<span class="devsite-syntax-cm"> | 2016-01-04 | 2016    | 1       | 2016 | 1    |</span>
<span class="devsite-syntax-cm"> | 2016-01-05 | 2016    | 1       | 2016 | 1    |</span>
<span class="devsite-syntax-cm"> | 2016-01-06 | 2016    | 1       | 2016 | 1    |</span>
<span class="devsite-syntax-cm"> | 2016-01-07 | 2016    | 1       | 2016 | 1    |</span>
<span class="devsite-syntax-cm"> | 2016-01-08 | 2016    | 1       | 2016 | 1    |</span>
<span class="devsite-syntax-cm"> | 2016-01-09 | 2016    | 1       | 2016 | 1    |</span>
<span class="devsite-syntax-cm"> +------------+---------+---------+------+------*/</span>
</code></pre></devsite-code>
<p>In the following example, <code translate="no" dir="ltr">date_expression</code> falls on a Sunday. <code translate="no" dir="ltr">EXTRACT</code>
calculates the first column using weeks that begin on Sunday, and it calculates
the second column using weeks that begin on Monday.</p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">WITH</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">table</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">DATE</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-s1">'2017-11-05'</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">date</span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-k">SELECT</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-kt">date</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">EXTRACT</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-k">WEEK</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-k">SUNDAY</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">date</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">week_sunday</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">EXTRACT</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-k">WEEK</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-k">MONDAY</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">date</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">week_monday</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">table</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*------------+-------------+-------------+</span>
<span class="devsite-syntax-cm"> | date       | week_sunday | week_monday |</span>
<span class="devsite-syntax-cm"> +------------+-------------+-------------+</span>
<span class="devsite-syntax-cm"> | 2017-11-05 | 45          | 44          |</span>
<span class="devsite-syntax-cm"> +------------+-------------+-------------*/</span>
</code></pre></devsite-code>
<h2 id="format_date" data-text="FORMAT_DATE" tabindex="-1"><code translate="no" dir="ltr">FORMAT_DATE</code></h2>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-nf">FORMAT_DATE</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">format_string</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">date_expr</span><span class="devsite-syntax-p">)</span>
</code></pre></devsite-code>
<p><strong>Description</strong></p>

<p>Formats a <code translate="no" dir="ltr">DATE</code> value according to a specified format string.</p>

<p><strong>Definitions</strong></p>

<ul>
<li><code translate="no" dir="ltr">format_string</code>: A <code translate="no" dir="ltr">STRING</code> value that contains the
<a href="/bigquery/docs/reference/standard-sql/format-elements#format_elements_date_time">format elements</a> to use with <code translate="no" dir="ltr">date_expr</code>.</li>
<li><code translate="no" dir="ltr">date_expr</code>: A <code translate="no" dir="ltr">DATE</code> value that represents the date to format.</li>
</ul>

<p><strong>Return Data Type</strong></p>

<p><code translate="no" dir="ltr">STRING</code></p>

<p><strong>Examples</strong></p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">FORMAT_DATE</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-s1">'%x'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">DATE</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2008-12-25'</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">US_format</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*------------+</span>
<span class="devsite-syntax-cm"> | US_format  |</span>
<span class="devsite-syntax-cm"> +------------+</span>
<span class="devsite-syntax-cm"> | 12/25/08   |</span>
<span class="devsite-syntax-cm"> +------------*/</span>
</code></pre></devsite-code><div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">FORMAT_DATE</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-s1">'%b-%d-%Y'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">DATE</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2008-12-25'</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">formatted</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*-------------+</span>
<span class="devsite-syntax-cm"> | formatted   |</span>
<span class="devsite-syntax-cm"> +-------------+</span>
<span class="devsite-syntax-cm"> | Dec-25-2008 |</span>
<span class="devsite-syntax-cm"> +-------------*/</span>
</code></pre></devsite-code><div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">FORMAT_DATE</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-s1">'%b %Y'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">DATE</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2008-12-25'</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">formatted</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*-------------+</span>
<span class="devsite-syntax-cm"> | formatted   |</span>
<span class="devsite-syntax-cm"> +-------------+</span>
<span class="devsite-syntax-cm"> | Dec 2008    |</span>
<span class="devsite-syntax-cm"> +-------------*/</span>
</code></pre></devsite-code>
<h2 id="last_day" data-text="LAST_DAY" tabindex="-1"><code translate="no" dir="ltr">LAST_DAY</code></h2>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-nf">LAST_DAY</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">date_expression</span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">date_part</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-p">)</span>
</code></pre></devsite-code>
<p><strong>Description</strong></p>

<p>Returns the last day from a date expression. This is commonly used to return
the last day of the month.</p>

<p>You can optionally specify the date part for which the last day is returned.
If this parameter isn&#39;t used, the default value is <code translate="no" dir="ltr">MONTH</code>.
<code translate="no" dir="ltr">LAST_DAY</code> supports the following values for <code translate="no" dir="ltr">date_part</code>:</p>

<ul>
<li><code translate="no" dir="ltr">YEAR</code></li>
<li><code translate="no" dir="ltr">QUARTER</code></li>
<li><code translate="no" dir="ltr">MONTH</code></li>
<li><code translate="no" dir="ltr">WEEK</code>. Equivalent to 7 <code translate="no" dir="ltr">DAY</code>s.</li>
<li><code translate="no" dir="ltr">WEEK(&lt;WEEKDAY&gt;)</code>. <code translate="no" dir="ltr">&lt;WEEKDAY&gt;</code> represents the starting day of the week.
Valid values are <code translate="no" dir="ltr">SUNDAY</code>, <code translate="no" dir="ltr">MONDAY</code>, <code translate="no" dir="ltr">TUESDAY</code>, <code translate="no" dir="ltr">WEDNESDAY</code>, <code translate="no" dir="ltr">THURSDAY</code>,
<code translate="no" dir="ltr">FRIDAY</code>, and <code translate="no" dir="ltr">SATURDAY</code>.</li>
<li><code translate="no" dir="ltr">ISOWEEK</code>. Uses <a href="https://en.wikipedia.org/wiki/ISO_week_date">ISO 8601</a> week boundaries. ISO weeks begin
on Monday.</li>
<li><code translate="no" dir="ltr">ISOYEAR</code>. Uses the <a href="https://en.wikipedia.org/wiki/ISO_8601">ISO 8601</a> week-numbering year boundary.
The ISO year boundary is the Monday of the first week whose Thursday belongs
to the corresponding Gregorian calendar year.</li>
</ul>

<p><strong>Return Data Type</strong></p>

<p><code translate="no" dir="ltr">DATE</code></p>

<p><strong>Example</strong></p>

<p>These both return the last day of the month:</p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">LAST_DAY</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-kt">DATE</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2008-11-25'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">MONTH</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">last_day</span>

<span class="devsite-syntax-cm">/*------------+</span>
<span class="devsite-syntax-cm"> | last_day   |</span>
<span class="devsite-syntax-cm"> +------------+</span>
<span class="devsite-syntax-cm"> | 2008-11-30 |</span>
<span class="devsite-syntax-cm"> +------------*/</span>
</code></pre></devsite-code><div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">LAST_DAY</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-kt">DATE</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2008-11-25'</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">last_day</span>

<span class="devsite-syntax-cm">/*------------+</span>
<span class="devsite-syntax-cm"> | last_day   |</span>
<span class="devsite-syntax-cm"> +------------+</span>
<span class="devsite-syntax-cm"> | 2008-11-30 |</span>
<span class="devsite-syntax-cm"> +------------*/</span>
</code></pre></devsite-code>
<p>This returns the last day of the year:</p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">LAST_DAY</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-kt">DATE</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2008-11-25'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">YEAR</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">last_day</span>

<span class="devsite-syntax-cm">/*------------+</span>
<span class="devsite-syntax-cm"> | last_day   |</span>
<span class="devsite-syntax-cm"> +------------+</span>
<span class="devsite-syntax-cm"> | 2008-12-31 |</span>
<span class="devsite-syntax-cm"> +------------*/</span>
</code></pre></devsite-code>
<p>This returns the last day of the week for a week that starts on a Sunday:</p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">LAST_DAY</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-kt">DATE</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2008-11-10'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">WEEK</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-k">SUNDAY</span><span class="devsite-syntax-p">))</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">last_day</span>

<span class="devsite-syntax-cm">/*------------+</span>
<span class="devsite-syntax-cm"> | last_day   |</span>
<span class="devsite-syntax-cm"> +------------+</span>
<span class="devsite-syntax-cm"> | 2008-11-15 |</span>
<span class="devsite-syntax-cm"> +------------*/</span>
</code></pre></devsite-code>
<p>This returns the last day of the week for a week that starts on a Monday:</p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">LAST_DAY</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-kt">DATE</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2008-11-10'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">WEEK</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-k">MONDAY</span><span class="devsite-syntax-p">))</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">last_day</span>

<span class="devsite-syntax-cm">/*------------+</span>
<span class="devsite-syntax-cm"> | last_day   |</span>
<span class="devsite-syntax-cm"> +------------+</span>
<span class="devsite-syntax-cm"> | 2008-11-16 |</span>
<span class="devsite-syntax-cm"> +------------*/</span>
</code></pre></devsite-code>
<h2 id="parse_date" data-text="PARSE_DATE" tabindex="-1"><code translate="no" dir="ltr">PARSE_DATE</code></h2>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-nf">PARSE_DATE</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">format_string</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">date_string</span><span class="devsite-syntax-p">)</span>
</code></pre></devsite-code>
<p><strong>Description</strong></p>

<p>Converts a <code translate="no" dir="ltr">STRING</code> value to a <code translate="no" dir="ltr">DATE</code> value.</p>

<p><strong>Definitions</strong></p>

<ul>
<li><code translate="no" dir="ltr">format_string</code>: A <code translate="no" dir="ltr">STRING</code> value that contains the
<a href="/bigquery/docs/reference/standard-sql/format-elements#format_elements_date_time">format elements</a> to use with <code translate="no" dir="ltr">date_string</code>.</li>
<li><code translate="no" dir="ltr">date_string</code>: A <code translate="no" dir="ltr">STRING</code> value that represents the date to parse.</li>
</ul>

<p><strong>Details</strong></p>

<p>Each element in <code translate="no" dir="ltr">date_string</code> must have a corresponding element in
<code translate="no" dir="ltr">format_string</code>. The location of each element in <code translate="no" dir="ltr">format_string</code> must match the
location of each element in <code translate="no" dir="ltr">date_string</code>.</p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-c1">-- This works because elements on both sides match.</span>
<span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">PARSE_DATE</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-s1">'%A %b %e %Y'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Thursday Dec 25 2008'</span><span class="devsite-syntax-p">);</span>

<span class="devsite-syntax-c1">-- This produces an error because the year element is in different locations.</span>
<span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">PARSE_DATE</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-s1">'%Y %A %b %e'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Thursday Dec 25 2008'</span><span class="devsite-syntax-p">);</span>

<span class="devsite-syntax-c1">-- This produces an error because one of the year elements is missing.</span>
<span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">PARSE_DATE</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-s1">'%A %b %e'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Thursday Dec 25 2008'</span><span class="devsite-syntax-p">);</span>

<span class="devsite-syntax-c1">-- This works because %F can find all matching elements in date_string.</span>
<span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">PARSE_DATE</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-s1">'%F'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2000-12-30'</span><span class="devsite-syntax-p">);</span>
</code></pre></devsite-code>
<p>The following additional considerations apply when using the <code translate="no" dir="ltr">PARSE_DATE</code>
function:</p>

<ul>
<li>Unspecified fields. Any unspecified field is initialized from <code translate="no" dir="ltr">1970-01-01</code>.</li>
<li>Case insensitivity. Names, such as <code translate="no" dir="ltr">Monday</code>, <code translate="no" dir="ltr">February</code>, and so on, are
case insensitive.</li>
<li>Whitespace. One or more consecutive white spaces in the format string
matches zero or more consecutive white spaces in the date string. In
addition, leading and trailing white spaces in the date string are always
allowed, even if they aren&#39;t in the format string.</li>
<li>Format precedence. When two (or more) format elements have overlapping
information (for example both <code translate="no" dir="ltr">%F</code> and <code translate="no" dir="ltr">%Y</code> affect the year), the last one
generally overrides any earlier ones.</li>
<li>Mixed ISO and non-ISO elements. The ISO format elements are <code translate="no" dir="ltr">%G</code>, <code translate="no" dir="ltr">%g</code>,
<code translate="no" dir="ltr">%J</code>, and <code translate="no" dir="ltr">%V</code>. When these ISO elements are used together with other non-ISO
elements, the ISO elements are ignored, resulting in different values. For
example, the function arguments <code translate="no" dir="ltr">(&#39;%g %J&#39;, &#39;8405&#39;)</code> return a value with the
year <code translate="no" dir="ltr">1984</code>, whereas the arguments <code translate="no" dir="ltr">(&#39;%g %j&#39;, &#39;8405&#39;)</code> return a value with
the year <code translate="no" dir="ltr">1970</code> because the ISO element <code translate="no" dir="ltr">%g</code> is ignored.</li>
<li>Numeric values after <code translate="no" dir="ltr">%G</code> input values. Any input string value that
corresponds to the <code translate="no" dir="ltr">%G</code> format element requires a whitespace or non-digit
character as a separator from numeric values that follow. This is a known
issue in GoogleSQL. For example, the function arguments <code translate="no" dir="ltr">(&#39;%G
%V&#39;,&#39;2020 50&#39;)</code> or <code translate="no" dir="ltr">(&#39;%G-%V&#39;,&#39;2020-50&#39;)</code> work, but not <code translate="no" dir="ltr">(&#39;%G%V&#39;,&#39;202050&#39;)</code>.
For input values before the corresponding <code translate="no" dir="ltr">%G</code> value, no separator is
needed. For example, the arguments <code translate="no" dir="ltr">(&#39;%V%G&#39;,&#39;502020&#39;)</code> work. The separator
after the <code translate="no" dir="ltr">%G</code> values identifies the end of the specified ISO year value so
that the function can parse properly.</li>
</ul>

<p><strong>Return Data Type</strong></p>

<p><code translate="no" dir="ltr">DATE</code></p>

<p><strong>Examples</strong></p>

<p>This example converts a <code translate="no" dir="ltr">MM/DD/YY</code> formatted string to a <code translate="no" dir="ltr">DATE</code> object:</p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">PARSE_DATE</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-s1">'%x'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'12/25/08'</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">parsed</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*------------+</span>
<span class="devsite-syntax-cm"> | parsed     |</span>
<span class="devsite-syntax-cm"> +------------+</span>
<span class="devsite-syntax-cm"> | 2008-12-25 |</span>
<span class="devsite-syntax-cm"> +------------*/</span>
</code></pre></devsite-code>
<p>This example converts a <code translate="no" dir="ltr">YYYYMMDD</code> formatted string to a <code translate="no" dir="ltr">DATE</code> object:</p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">PARSE_DATE</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-s1">'%Y%m%d'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'20081225'</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">parsed</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*------------+</span>
<span class="devsite-syntax-cm"> | parsed     |</span>
<span class="devsite-syntax-cm"> +------------+</span>
<span class="devsite-syntax-cm"> | 2008-12-25 |</span>
<span class="devsite-syntax-cm"> +------------*/</span>
</code></pre></devsite-code>
<h2 id="unix_date" data-text="UNIX_DATE" tabindex="-1"><code translate="no" dir="ltr">UNIX_DATE</code></h2>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-nf">UNIX_DATE</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">date_expression</span><span class="devsite-syntax-p">)</span>
</code></pre></devsite-code>
<p><strong>Description</strong></p>

<p>Returns the number of days since <code translate="no" dir="ltr">1970-01-01</code>.</p>

<p><strong>Return Data Type</strong></p>

<p>INT64</p>

<p><strong>Example</strong></p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">UNIX_DATE</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-kt">DATE</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2008-12-25'</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">days_from_epoch</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*-----------------+</span>
<span class="devsite-syntax-cm"> | days_from_epoch |</span>
<span class="devsite-syntax-cm"> +-----------------+</span>
<span class="devsite-syntax-cm"> | 14238           |</span>
<span class="devsite-syntax-cm"> +-----------------*/</span>
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
