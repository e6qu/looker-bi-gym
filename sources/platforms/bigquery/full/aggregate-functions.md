# BigQuery Aggregate Functions

- Source ID: `SRC-BIGQUERY-AGGREGATE-FUNCTIONS`
- URL: https://cloud.google.com/bigquery/docs/reference/standard-sql/aggregate_functions
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
      Aggregate functions<devsite-actions hidden data-nosnippet><devsite-feature-tooltip
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





<p>GoogleSQL for BigQuery supports the following general aggregate functions.
To learn about the syntax for aggregate function calls, see
<a href="/bigquery/docs/reference/standard-sql/aggregate-function-calls">Aggregate function calls</a>.</p>

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
  <td><a href="/bigquery/docs/reference/standard-sql/aggregate_functions#agg"><code translate="no" dir="ltr">AGG</code></a>
</td>
  <td>
    Aggregates a measure type.
    
  </td>
</tr>

<tr>
  <td><a href="/bigquery/docs/reference/standard-sql/aggregate_functions#any_value"><code translate="no" dir="ltr">ANY_VALUE</code></a>
</td>
  <td>
    Gets an expression for some row.
  </td>
</tr>

<tr>
  <td><a href="/bigquery/docs/reference/standard-sql/approximate_aggregate_functions#approx_count_distinct"><code translate="no" dir="ltr">APPROX_COUNT_DISTINCT</code></a>
</td>
  <td>
    Gets the approximate result for <code translate="no" dir="ltr">COUNT(DISTINCT expression)</code>.
    <br>For more information, see <a href="/bigquery/docs/reference/standard-sql/approximate_aggregate_functions">Approximate aggregate functions</a>.

  </td>
</tr>

<tr>
  <td><a href="/bigquery/docs/reference/standard-sql/approximate_aggregate_functions#approx_quantiles"><code translate="no" dir="ltr">APPROX_QUANTILES</code></a>
</td>
  <td>
    Gets the approximate quantile boundaries.
    <br>For more information, see <a href="/bigquery/docs/reference/standard-sql/approximate_aggregate_functions">Approximate aggregate functions</a>.

  </td>
</tr>

<tr>
  <td><a href="/bigquery/docs/reference/standard-sql/approximate_aggregate_functions#approx_top_count"><code translate="no" dir="ltr">APPROX_TOP_COUNT</code></a>
</td>
  <td>
    Gets the approximate top elements and their approximate count.
    <br>For more information, see <a href="/bigquery/docs/reference/standard-sql/approximate_aggregate_functions">Approximate aggregate functions</a>.

  </td>
</tr>

<tr>
  <td><a href="/bigquery/docs/reference/standard-sql/approximate_aggregate_functions#approx_top_sum"><code translate="no" dir="ltr">APPROX_TOP_SUM</code></a>
</td>
  <td>
    Gets the approximate top elements and sum, based on the approximate sum
    of an assigned weight.
    <br>For more information, see <a href="/bigquery/docs/reference/standard-sql/approximate_aggregate_functions">Approximate aggregate functions</a>.

  </td>
</tr>

<tr>
  <td><a href="/bigquery/docs/reference/standard-sql/aggregate_functions#array_agg"><code translate="no" dir="ltr">ARRAY_AGG</code></a>
</td>
  <td>
    Gets an array of values.
    
  </td>
</tr>

<tr>
  <td><a href="/bigquery/docs/reference/standard-sql/aggregate_functions#array_concat_agg"><code translate="no" dir="ltr">ARRAY_CONCAT_AGG</code></a>
</td>
  <td>
    Concatenates arrays and returns a single array as a result.
    
  </td>
</tr>

<tr>
  <td><a href="/bigquery/docs/reference/standard-sql/aggregate_functions#avg"><code translate="no" dir="ltr">AVG</code></a>
</td>
  <td>
    Gets the average of non-<code translate="no" dir="ltr">NULL</code> values.
    
  </td>
</tr>

<tr>
  <td><a href="/bigquery/docs/reference/standard-sql/aggregate-dp-functions#dp_avg"><code translate="no" dir="ltr">AVG</code> (Differential Privacy)</a>
</td>
  <td>
    <code translate="no" dir="ltr">DIFFERENTIAL_PRIVACY</code>-supported <code translate="no" dir="ltr">AVG</code>.<br/><br/>
    Gets the differentially-private average of non-<code translate="no" dir="ltr">NULL</code>,
    non-<code translate="no" dir="ltr">NaN</code> values in a query with a
    <code translate="no" dir="ltr">DIFFERENTIAL_PRIVACY</code> clause.
    <br><br>For more information, see <a href="/bigquery/docs/reference/standard-sql/aggregate-dp-functions">Differential privacy functions</a>.

  </td>
</tr>

<tr>
  <td><a href="/bigquery/docs/reference/standard-sql/aggregate_functions#bit_and"><code translate="no" dir="ltr">BIT_AND</code></a>
</td>
  <td>
    Performs a bitwise AND operation on an expression.
    
  </td>
</tr>

<tr>
  <td><a href="/bigquery/docs/reference/standard-sql/aggregate_functions#bit_or"><code translate="no" dir="ltr">BIT_OR</code></a>
</td>
  <td>
    Performs a bitwise OR operation on an expression.
    
  </td>
</tr>

<tr>
  <td><a href="/bigquery/docs/reference/standard-sql/aggregate_functions#bit_xor"><code translate="no" dir="ltr">BIT_XOR</code></a>
</td>
  <td>
    Performs a bitwise XOR operation on an expression.
    
  </td>
</tr>

<tr>
  <td><a href="/bigquery/docs/reference/standard-sql/statistical_aggregate_functions#corr"><code translate="no" dir="ltr">CORR</code></a>
</td>
  <td>
    Computes the Pearson coefficient of correlation of a set of number pairs.
    <br>For more information, see <a href="/bigquery/docs/reference/standard-sql/statistical_aggregate_functions">Statistical aggregate functions</a>.

  </td>
</tr>

<tr>
  <td><a href="/bigquery/docs/reference/standard-sql/aggregate_functions#count"><code translate="no" dir="ltr">COUNT</code></a>
</td>
  <td>
    Gets the number of rows in the input, or the number of rows with an
    expression evaluated to any value other than <code translate="no" dir="ltr">NULL</code>.
  </td>
</tr>

<tr>
  <td><a href="/bigquery/docs/reference/standard-sql/aggregate-dp-functions#dp_count"><code translate="no" dir="ltr">COUNT</code> (Differential Privacy)</a>
</td>
  <td>
    <code translate="no" dir="ltr">DIFFERENTIAL_PRIVACY</code>-supported <code translate="no" dir="ltr">COUNT</code>.<br/><br/>
    Signature 1: Gets the differentially-private count of rows in a query with a
    <code translate="no" dir="ltr">DIFFERENTIAL_PRIVACY</code> clause.
    <br/>
    <br/>
    Signature 2: Gets the differentially-private count of rows with a
    non-<code translate="no" dir="ltr">NULL</code> expression in a query with a
    <code translate="no" dir="ltr">DIFFERENTIAL_PRIVACY</code> clause.
    <br><br>For more information, see <a href="/bigquery/docs/reference/standard-sql/aggregate-dp-functions">Differential privacy functions</a>.

  </td>
</tr>

<tr>
  <td><a href="/bigquery/docs/reference/standard-sql/aggregate_functions#countif"><code translate="no" dir="ltr">COUNTIF</code></a>
</td>
  <td>
    Gets the number of <code translate="no" dir="ltr">TRUE</code> values for an expression.
  </td>
</tr>

<tr>
  <td><a href="/bigquery/docs/reference/standard-sql/statistical_aggregate_functions#covar_pop"><code translate="no" dir="ltr">COVAR_POP</code></a>
</td>
  <td>
    Computes the population covariance of a set of number pairs.
    <br>For more information, see <a href="/bigquery/docs/reference/standard-sql/statistical_aggregate_functions">Statistical aggregate functions</a>.

  </td>
</tr>

<tr>
  <td><a href="/bigquery/docs/reference/standard-sql/statistical_aggregate_functions#covar_samp"><code translate="no" dir="ltr">COVAR_SAMP</code></a>
</td>
  <td>
    Computes the sample covariance of a set of number pairs.
    <br>For more information, see <a href="/bigquery/docs/reference/standard-sql/statistical_aggregate_functions">Statistical aggregate functions</a>.

  </td>
</tr>

<tr>
  <td><a href="/bigquery/docs/reference/standard-sql/aggregate_functions#grouping"><code translate="no" dir="ltr">GROUPING</code></a>
</td>
  <td>
    Checks if a groupable value in the <code translate="no" dir="ltr">GROUP BY</code> clause is
    aggregated.
  </td>
</tr>

<tr>
  <td><a href="/bigquery/docs/reference/standard-sql/aggregate_functions#logical_and"><code translate="no" dir="ltr">LOGICAL_AND</code></a>
</td>
  <td>
    Gets the logical AND of all non-<code translate="no" dir="ltr">NULL</code> expressions.
  </td>
</tr>

<tr>
  <td><a href="/bigquery/docs/reference/standard-sql/aggregate_functions#logical_or"><code translate="no" dir="ltr">LOGICAL_OR</code></a>
</td>
  <td>
    Gets the logical OR of all non-<code translate="no" dir="ltr">NULL</code> expressions.
  </td>
</tr>

<tr>
  <td><a href="/bigquery/docs/reference/standard-sql/aggregate_functions#max"><code translate="no" dir="ltr">MAX</code></a>
</td>
  <td>
    Gets the maximum non-<code translate="no" dir="ltr">NULL</code> value.
    
  </td>
</tr>

<tr>
  <td><a href="/bigquery/docs/reference/standard-sql/aggregate_functions#max_by"><code translate="no" dir="ltr">MAX_BY</code></a>
</td>
  <td>
    Synonym for <code translate="no" dir="ltr">ANY_VALUE(x HAVING MAX y)</code>.
    
  </td>
</tr>

<tr>
  <td><a href="/bigquery/docs/reference/standard-sql/aggregate_functions#min"><code translate="no" dir="ltr">MIN</code></a>
</td>
  <td>
    Gets the minimum non-<code translate="no" dir="ltr">NULL</code> value.
  </td>
</tr>

<tr>
  <td><a href="/bigquery/docs/reference/standard-sql/aggregate_functions#min_by"><code translate="no" dir="ltr">MIN_BY</code></a>
</td>
  <td>
    Synonym for <code translate="no" dir="ltr">ANY_VALUE(x HAVING MIN y)</code>.
    
  </td>
</tr>

<tr>
  <td><a href="/bigquery/docs/reference/standard-sql/navigation_functions#percentile_cont"><code translate="no" dir="ltr">PERCENTILE_CONT</code></a>
</td>
  <td>
    Computes the specified percentile for a value, using
    linear interpolation.
    <br>For more information, see <a href="/bigquery/docs/reference/standard-sql/navigation_functions">Navigation functions</a>.

  </td>
</tr>

<tr>
  <td><a href="/bigquery/docs/reference/standard-sql/aggregate-dp-functions#dp_percentile_cont"><code translate="no" dir="ltr">PERCENTILE_CONT</code> (Differential Privacy)</a>
</td>
  <td>
    <code translate="no" dir="ltr">DIFFERENTIAL_PRIVACY</code>-supported <code translate="no" dir="ltr">PERCENTILE_CONT</code>.<br/><br/>
    Computes a differentially-private percentile across privacy unit columns
    in a query with a <code translate="no" dir="ltr">DIFFERENTIAL_PRIVACY</code> clause.
    <br><br>For more information, see <a href="/bigquery/docs/reference/standard-sql/aggregate-dp-functions">Differential privacy functions</a>.

  </td>
</tr>

<tr>
  <td><a href="/bigquery/docs/reference/standard-sql/navigation_functions#percentile_disc"><code translate="no" dir="ltr">PERCENTILE_DISC</code></a>
</td>
  <td>
    Computes the specified percentile for a discrete value.
    <br>For more information, see <a href="/bigquery/docs/reference/standard-sql/navigation_functions">Navigation functions</a>.

  </td>
</tr>

<tr>
  <td><a href="/bigquery/docs/reference/standard-sql/geography_functions#st_centroid_agg"><code translate="no" dir="ltr">ST_CENTROID_AGG</code></a>
</td>
  <td>
    Gets the centroid of a set of <code translate="no" dir="ltr">GEOGRAPHY</code> values.
    <br>For more information, see <a href="/bigquery/docs/reference/standard-sql/geography_functions">Geography functions</a>.

  </td>
</tr>

<tr>
  <td><a href="/bigquery/docs/reference/standard-sql/geography_functions#st_extent"><code translate="no" dir="ltr">ST_EXTENT</code></a>
</td>
  <td>
    Gets the bounding box for a group of <code translate="no" dir="ltr">GEOGRAPHY</code> values.
    <br>For more information, see <a href="/bigquery/docs/reference/standard-sql/geography_functions">Geography functions</a>.

  </td>
</tr>

<tr>
  <td><a href="/bigquery/docs/reference/standard-sql/geography_functions#st_union_agg"><code translate="no" dir="ltr">ST_UNION_AGG</code></a>
</td>
  <td>
    Aggregates over <code translate="no" dir="ltr">GEOGRAPHY</code> values and gets their
    point set union.
    <br>For more information, see <a href="/bigquery/docs/reference/standard-sql/geography_functions">Geography functions</a>.

  </td>
</tr>

<tr>
  <td><a href="/bigquery/docs/reference/standard-sql/statistical_aggregate_functions#stddev"><code translate="no" dir="ltr">STDDEV</code></a>
</td>
  <td>
    An alias of the <code translate="no" dir="ltr">STDDEV_SAMP</code> function.
    <br>For more information, see <a href="/bigquery/docs/reference/standard-sql/statistical_aggregate_functions">Statistical aggregate functions</a>.

  </td>
</tr>

<tr>
  <td><a href="/bigquery/docs/reference/standard-sql/statistical_aggregate_functions#stddev_pop"><code translate="no" dir="ltr">STDDEV_POP</code></a>
</td>
  <td>
    Computes the population (biased) standard deviation of the values.
    <br>For more information, see <a href="/bigquery/docs/reference/standard-sql/statistical_aggregate_functions">Statistical aggregate functions</a>.

  </td>
</tr>

<tr>
  <td><a href="/bigquery/docs/reference/standard-sql/statistical_aggregate_functions#stddev_samp"><code translate="no" dir="ltr">STDDEV_SAMP</code></a>
</td>
  <td>
    Computes the sample (unbiased) standard deviation of the values.
    <br>For more information, see <a href="/bigquery/docs/reference/standard-sql/statistical_aggregate_functions">Statistical aggregate functions</a>.

  </td>
</tr>

<tr>
  <td><a href="/bigquery/docs/reference/standard-sql/aggregate_functions#string_agg"><code translate="no" dir="ltr">STRING_AGG</code></a>
</td>
  <td>
    Concatenates non-<code translate="no" dir="ltr">NULL</code> <code translate="no" dir="ltr">STRING</code> or
    <code translate="no" dir="ltr">BYTES</code> values.
    
  </td>
</tr>

<tr>
  <td><a href="/bigquery/docs/reference/standard-sql/aggregate_functions#sum"><code translate="no" dir="ltr">SUM</code></a>
</td>
  <td>
    Gets the sum of non-<code translate="no" dir="ltr">NULL</code> values.
    
  </td>
</tr>

<tr>
  <td><a href="/bigquery/docs/reference/standard-sql/aggregate-dp-functions#dp_sum"><code translate="no" dir="ltr">SUM</code> (Differential Privacy)</a>
</td>
  <td>
    <code translate="no" dir="ltr">DIFFERENTIAL_PRIVACY</code>-supported <code translate="no" dir="ltr">SUM</code>.<br/><br/>
    Gets the differentially-private sum of non-<code translate="no" dir="ltr">NULL</code>,
    non-<code translate="no" dir="ltr">NaN</code> values in a query with a
    <code translate="no" dir="ltr">DIFFERENTIAL_PRIVACY</code> clause.
    <br><br>For more information, see <a href="/bigquery/docs/reference/standard-sql/aggregate-dp-functions">Differential privacy functions</a>.

  </td>
</tr>

<tr>
  <td><a href="/bigquery/docs/reference/standard-sql/statistical_aggregate_functions#var_pop"><code translate="no" dir="ltr">VAR_POP</code></a>
</td>
  <td>
    Computes the population (biased) variance of the values.
    <br>For more information, see <a href="/bigquery/docs/reference/standard-sql/statistical_aggregate_functions">Statistical aggregate functions</a>.

  </td>
</tr>

<tr>
  <td><a href="/bigquery/docs/reference/standard-sql/statistical_aggregate_functions#var_samp"><code translate="no" dir="ltr">VAR_SAMP</code></a>
</td>
  <td>
    Computes the sample (unbiased) variance of the values.
    <br>For more information, see <a href="/bigquery/docs/reference/standard-sql/statistical_aggregate_functions">Statistical aggregate functions</a>.

  </td>
</tr>

<tr>
  <td><a href="/bigquery/docs/reference/standard-sql/statistical_aggregate_functions#variance"><code translate="no" dir="ltr">VARIANCE</code></a>
</td>
  <td>
    An alias of <code translate="no" dir="ltr">VAR_SAMP</code>.
    <br>For more information, see <a href="/bigquery/docs/reference/standard-sql/statistical_aggregate_functions">Statistical aggregate functions</a>.

  </td>
</tr>

  </tbody>
</table>

<h2 id="agg" data-text="AGG" tabindex="-1"><code translate="no" dir="ltr">AGG</code></h2>

<aside class="beta">
  <p><strong>Preview</strong></p>
  <p>
    This product or feature is subject to the "Pre-GA Offerings Terms"
    in the General Service Terms section of the
    <a href="https://cloud.google.com/terms/service-terms">Service Specific Terms</a>.
    Pre-GA products and features are available "as is" and might have
    limited support. For more information, see the
    <a href="https://cloud.google.com/products#product-launch-stages">launch stage descriptions</a>.
  </p>
</aside>
<aside class="note"><strong>Note:</strong><span> To provide feedback or request support for this feature, send an email to
<a href="mailto:bq-graph-preview-support@google.com">bq-graph-preview-support@google.com</a>.</span></aside><div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-n">AGG</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">measure_expression</span><span class="devsite-syntax-p">)</span>
</code></pre></devsite-code>
<p><strong>Description</strong></p>

<p>Aggregates a <a href="/bigquery/docs/reference/standard-sql/data-types#measure_type">measure type</a>. A measure type encapsulates an
aggregate calculation to perform, locked to a specific granularity defined by
a key. The <code translate="no" dir="ltr">AGG</code> function invokes the calculation exactly once per key
with the guarantee of avoiding overcounting. Measures are useful for defining
business metrics. You can perform aggregation using the <code translate="no" dir="ltr">AGG</code>
function instead of complex aggregation queries.</p>

<p>For more information and examples of using the <code translate="no" dir="ltr">AGG</code> function
with measures, see <a href="/bigquery/docs/graph-measures">work with measures</a>.</p>

<p><strong>Supported Argument Types</strong></p>

<p>A single <code translate="no" dir="ltr">MEASURE</code> type</p>

<p><strong>Returned Data Types</strong></p>

<p>The type returned by the expression associated with the measure.</p>

<p><strong>Examples</strong></p>

<p>The following example creates a graph called <code translate="no" dir="ltr">StoreGraph</code> based on the
<code translate="no" dir="ltr">Stores</code> and <code translate="no" dir="ltr">Locations</code> tables. The node table defined by location data has
a measure property called <code translate="no" dir="ltr">total_population</code>. The measure is defined by the
aggregate calculation <code translate="no" dir="ltr">SUM(population)</code> and the key <code translate="no" dir="ltr">id</code>.</p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">CREATE</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">OR</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">REPLACE</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">TABLE</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">mydataset</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">Stores</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">name</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">STRING</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">PRIMARY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">KEY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">NOT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ENFORCED</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">location_id</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">INT64</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">REFERENCES</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">mydataset</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">Locations</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">id</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">NOT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ENFORCED</span>
<span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Store 1'</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">name</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">101</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">location_id</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Store 2'</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">name</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">101</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">location_id</span>
<span class="devsite-syntax-p">);</span>

<span class="devsite-syntax-k">CREATE</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">OR</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">REPLACE</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">TABLE</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">mydataset</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">Locations</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">id</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">INT64</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">PRIMARY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">KEY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">NOT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ENFORCED</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">name</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">STRING</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">population</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">INT64</span>
<span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">101</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">id</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Anytown'</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">name</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">1000</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">population</span>
<span class="devsite-syntax-p">);</span>

<span class="devsite-syntax-k">CREATE</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">OR</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">REPLACE</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">PROPERTY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">GRAPH</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">mydataset</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">StoreGraph</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">NODE</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">TABLES</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-n">mydataset</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">Stores</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">S</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-n">mydataset</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">Locations</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">L</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">PROPERTIES</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">id</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">name</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">population</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">MEASURE</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-nf">SUM</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">population</span><span class="devsite-syntax-p">))</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">total_population</span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">EDGE</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">TABLES</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-n">mydataset</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">Stores</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">SL</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">SOURCE</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">KEY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">location_id</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">REFERENCES</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">L</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">id</span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">DESTINATION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">KEY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-k">name</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">REFERENCES</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">S</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-k">name</span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-p">);</span>
</code></pre></devsite-code>
<p>To access measures defined on a graph, you must call the
<a href="/bigquery/docs/reference/standard-sql/graph-sql-queries#graph_expand"><code translate="no" dir="ltr">GRAPH_EXPAND</code> TVF</a>, which performs a series of <code translate="no" dir="ltr">LEFT JOIN</code>
operations on your graph&#39;s input tables to produce a flattened version of
the graph.</p>

<p>The following query calls the <code translate="no" dir="ltr">GRAPH_EXPAND</code> function and omits the
<code translate="no" dir="ltr">L_total_population</code> column from the output because
you can&#39;t directly select a column for a property defined by a measure without
using the <code translate="no" dir="ltr">AGG</code> function:</p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">*</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">EXCEPT</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">L_total_population</span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">GRAPH_EXPAND</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-s1">'mydataset.StoreGraph'</span><span class="devsite-syntax-p">);</span>

<span class="devsite-syntax-cm">/*---------------+---------+------+---------+--------------+</span>
<span class="devsite-syntax-cm"> | S_location_id | S_name  | L_id | L_name  | L_population |</span>
<span class="devsite-syntax-cm"> +---------------+---------+------+---------+--------------+</span>
<span class="devsite-syntax-cm"> | 101           | Store 2 | 101  | Anytown | 1000         |</span>
<span class="devsite-syntax-cm"> | 101           | Store 1 | 101  | Anytown | 1000         |</span>
<span class="devsite-syntax-cm"> +---------------+---------+------+---------+--------------*/</span>
</code></pre></devsite-code>
<p>The following query shows the difference between aggregating a measure and
a regular value. When you apply the <code translate="no" dir="ltr">AGG</code> function to the <code translate="no" dir="ltr">L_total_population</code>
measure, the population of a location is counted exactly once per distinct
<code translate="no" dir="ltr">location_id</code> value.
If you call the <code translate="no" dir="ltr">SUM</code> function on <code translate="no" dir="ltr">L_population</code>, then the <code translate="no" dir="ltr">L_population</code>
column contributes the population for every row in the table with a given
location ID.</p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">S_location_id</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">AGG</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">L_total_population</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">true_total_population</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nf">SUM</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">L_population</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">overcounted_population</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">GRAPH_EXPAND</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-s1">'mydataset.StoreGraph'</span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-k">GROUP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">S_location_id</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*---------------+-----------------------+------------------------+</span>
<span class="devsite-syntax-cm"> | S_location_id | true_total_population | overcounted_population |</span>
<span class="devsite-syntax-cm"> +---------------+-----------------------+------------------------+</span>
<span class="devsite-syntax-cm"> | 101           | 1000                  | 2000                   |</span>
<span class="devsite-syntax-cm"> +---------------+-----------------------+------------------------*/</span>
</code></pre></devsite-code>
<h2 id="any_value" data-text="ANY_VALUE" tabindex="-1"><code translate="no" dir="ltr">ANY_VALUE</code></h2>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-nf">ANY_VALUE</span><span class="devsite-syntax-p">(</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">expression</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">HAVING</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">{</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">MAX</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">|</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">MIN</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">}</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">having_expression</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>
<span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">OVER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">over_clause</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>

<span class="devsite-syntax-n">over_clause</span><span class="devsite-syntax-err">:</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">{</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">named_window</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">|</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">window_specification</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">}</span>

<span class="devsite-syntax-n">window_specification</span><span class="devsite-syntax-err">:</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">named_window</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">PARTITION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">partition_expression</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">...</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">expression</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">{</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ASC</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">|</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">DESC</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">}</span><span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">...</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">window_frame_clause</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>

</code></pre></devsite-code>
<p><strong>Description</strong></p>

<p>Returns <code translate="no" dir="ltr">expression</code> for some row chosen from the group. Which row is chosen is
nondeterministic, not random. Returns <code translate="no" dir="ltr">NULL</code> when the input produces no
rows. Returns <code translate="no" dir="ltr">NULL</code> when <code translate="no" dir="ltr">expression</code>
or <code translate="no" dir="ltr">having_expression</code> is
<code translate="no" dir="ltr">NULL</code> for all rows in the group.</p>

<p>If <code translate="no" dir="ltr">expression</code> contains any non-NULL values, then <code translate="no" dir="ltr">ANY_VALUE</code> behaves as if
<code translate="no" dir="ltr">IGNORE NULLS</code> is specified;
rows for which <code translate="no" dir="ltr">expression</code> is <code translate="no" dir="ltr">NULL</code> aren&#39;t considered and won&#39;t be
selected.</p>

<p>If the <code translate="no" dir="ltr">HAVING</code> clause is included in the <code translate="no" dir="ltr">ANY_VALUE</code> function, the
<code translate="no" dir="ltr">OVER</code> clause can&#39;t be used with this function.</p>

<p>To learn more about the optional aggregate clauses that you can pass
into this function, see
<a href="/bigquery/docs/reference/standard-sql/aggregate-function-calls">Aggregate function calls</a>.</p>

<!-- mdlint off(WHITESPACE_LINE_LENGTH) -->

<!-- mdlint on -->

<p>To learn more about the <code translate="no" dir="ltr">OVER</code> clause and how to use it, see
<a href="/bigquery/docs/reference/standard-sql/window-function-calls">Window function calls</a>.</p>

<!-- mdlint off(WHITESPACE_LINE_LENGTH) -->

<!-- mdlint on -->

<p><strong>Supported Argument Types</strong></p>

<p>Any</p>

<p><strong>Returned Data Types</strong></p>

<p>Matches the input data type.</p>

<p><strong>Examples</strong></p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">ANY_VALUE</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">fruit</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">as</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">any_value</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNNEST</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-s2">"apple"</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">"banana"</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">"pear"</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">as</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">fruit</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*-----------+</span>
<span class="devsite-syntax-cm"> | any_value |</span>
<span class="devsite-syntax-cm"> +-----------+</span>
<span class="devsite-syntax-cm"> | apple     |</span>
<span class="devsite-syntax-cm"> +-----------*/</span>
</code></pre></devsite-code><div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">fruit</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nf">ANY_VALUE</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">fruit</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">OVER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">LENGTH</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">fruit</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ROWS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BETWEEN</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">1</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">PRECEDING</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AND</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">CURRENT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ROW</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">any_value</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNNEST</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-s2">"apple"</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">"banana"</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">"pear"</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">as</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">fruit</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*--------+-----------+</span>
<span class="devsite-syntax-cm"> | fruit  | any_value |</span>
<span class="devsite-syntax-cm"> +--------+-----------+</span>
<span class="devsite-syntax-cm"> | pear   | pear      |</span>
<span class="devsite-syntax-cm"> | apple  | pear      |</span>
<span class="devsite-syntax-cm"> | banana | apple     |</span>
<span class="devsite-syntax-cm"> +--------+-----------*/</span>
</code></pre></devsite-code><div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">WITH</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">Store</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">20</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">sold</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">"apples"</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">fruit</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">30</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">sold</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">"pears"</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">fruit</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">30</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">sold</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">"bananas"</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">fruit</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">10</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">sold</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">"oranges"</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">fruit</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">ANY_VALUE</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">fruit</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">HAVING</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">MAX</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">sold</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">a_highest_selling_fruit</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">Store</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*-------------------------+</span>
<span class="devsite-syntax-cm"> | a_highest_selling_fruit |</span>
<span class="devsite-syntax-cm"> +-------------------------+</span>
<span class="devsite-syntax-cm"> | pears                   |</span>
<span class="devsite-syntax-cm"> +-------------------------*/</span>
</code></pre></devsite-code><div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">WITH</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">Store</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">20</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">sold</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">"apples"</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">fruit</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">30</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">sold</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">"pears"</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">fruit</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">30</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">sold</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">"bananas"</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">fruit</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">10</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">sold</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">"oranges"</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">fruit</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">ANY_VALUE</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">fruit</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">HAVING</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">MIN</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">sold</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">a_lowest_selling_fruit</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">Store</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*-------------------------+</span>
<span class="devsite-syntax-cm"> | a_lowest_selling_fruit  |</span>
<span class="devsite-syntax-cm"> +-------------------------+</span>
<span class="devsite-syntax-cm"> | oranges                 |</span>
<span class="devsite-syntax-cm"> +-------------------------*/</span>
</code></pre></devsite-code>
<h2 id="array_agg" data-text="ARRAY_AGG" tabindex="-1"><code translate="no" dir="ltr">ARRAY_AGG</code></h2>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-nf">ARRAY_AGG</span><span class="devsite-syntax-p">(</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">DISTINCT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">expression</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">{</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">IGNORE</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">|</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">RESPECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">}</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">NULLS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">key</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">{</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ASC</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">|</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">DESC</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">}</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">...</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">LIMIT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">n</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>
<span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">OVER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">over_clause</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>

<span class="devsite-syntax-n">over_clause</span><span class="devsite-syntax-err">:</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">{</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">named_window</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">|</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">window_specification</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">}</span>

<span class="devsite-syntax-n">window_specification</span><span class="devsite-syntax-err">:</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">named_window</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">PARTITION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">partition_expression</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">...</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">expression</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">{</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ASC</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">|</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">DESC</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">}</span><span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">...</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">window_frame_clause</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>

</code></pre></devsite-code>
<p><strong>Description</strong></p>

<p>Returns an ARRAY of <code translate="no" dir="ltr">expression</code> values.</p>

<p>To learn more about the optional aggregate clauses that you can pass
into this function, see
<a href="/bigquery/docs/reference/standard-sql/aggregate-function-calls">Aggregate function calls</a>.</p>

<!-- mdlint off(WHITESPACE_LINE_LENGTH) -->

<!-- mdlint on -->

<p>If this function is used with the <code translate="no" dir="ltr">OVER</code> clause, it&#39;s part of a
window function call. In a window function call,
aggregate function clauses can&#39;t be used.
To learn more about the <code translate="no" dir="ltr">OVER</code> clause and how to use it, see
<a href="/bigquery/docs/reference/standard-sql/window-function-calls">Window function calls</a>.</p>

<!-- mdlint off(WHITESPACE_LINE_LENGTH) -->

<!-- mdlint on -->

<p>An error is raised if an array in the final query result contains a <code translate="no" dir="ltr">NULL</code>
element.</p>

<p><strong>Supported Argument Types</strong></p>

<p>All data types except ARRAY.</p>

<p><strong>Returned Data Types</strong></p>

<p>ARRAY</p>

<p>If there are zero input rows, this function returns <code translate="no" dir="ltr">NULL</code>.</p>

<p><strong>Examples</strong></p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">ARRAY_AGG</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">array_agg</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNNEST</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">1</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-err">-</span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">3</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">-</span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">1</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*-------------------------+</span>
<span class="devsite-syntax-cm"> | array_agg               |</span>
<span class="devsite-syntax-cm"> +-------------------------+</span>
<span class="devsite-syntax-cm"> | [2, 1, -2, 3, -2, 1, 2] |</span>
<span class="devsite-syntax-cm"> +-------------------------*/</span>
</code></pre></devsite-code><div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">ARRAY_AGG</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-k">DISTINCT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">array_agg</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNNEST</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">1</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">-</span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">3</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">-</span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">1</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*---------------+</span>
<span class="devsite-syntax-cm"> | array_agg     |</span>
<span class="devsite-syntax-cm"> +---------------+</span>
<span class="devsite-syntax-cm"> | [2, 1, -2, 3] |</span>
<span class="devsite-syntax-cm"> +---------------*/</span>
</code></pre></devsite-code><div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">ARRAY_AGG</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">IGNORE</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">NULLS</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">array_agg</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNNEST</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-no">NULL</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">1</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">-</span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">3</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">-</span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">1</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-no">NULL</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*-------------------+</span>
<span class="devsite-syntax-cm"> | array_agg         |</span>
<span class="devsite-syntax-cm"> +-------------------+</span>
<span class="devsite-syntax-cm"> | [1, -2, 3, -2, 1] |</span>
<span class="devsite-syntax-cm"> +-------------------*/</span>
</code></pre></devsite-code><div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">ARRAY_AGG</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">ABS</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">))</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">array_agg</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNNEST</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">1</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">-</span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">3</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">-</span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">1</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*-------------------------+</span>
<span class="devsite-syntax-cm"> | array_agg               |</span>
<span class="devsite-syntax-cm"> +-------------------------+</span>
<span class="devsite-syntax-cm"> | [1, 1, 2, -2, -2, 2, 3] |</span>
<span class="devsite-syntax-cm"> +-------------------------*/</span>
</code></pre></devsite-code><div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">ARRAY_AGG</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">LIMIT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">5</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">array_agg</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNNEST</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">1</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">-</span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">3</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">-</span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">1</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*-------------------+</span>
<span class="devsite-syntax-cm"> | array_agg         |</span>
<span class="devsite-syntax-cm"> +-------------------+</span>
<span class="devsite-syntax-cm"> | [2, 1, -2, 3, -2] |</span>
<span class="devsite-syntax-cm"> +-------------------*/</span>
</code></pre></devsite-code><div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">WITH</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">vals</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-p">(</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">1</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">-</span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">3</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">-</span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">1</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">x</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">ARRAY_AGG</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-k">DISTINCT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">as</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">array_agg</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">vals</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*------------+</span>
<span class="devsite-syntax-cm"> | array_agg  |</span>
<span class="devsite-syntax-cm"> +------------+</span>
<span class="devsite-syntax-cm"> | [-2, 1, 3] |</span>
<span class="devsite-syntax-cm"> +------------*/</span>
</code></pre></devsite-code><div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">WITH</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">vals</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-p">(</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">1</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'a'</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">y</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">1</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'b'</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">y</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'a'</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">y</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'c'</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">y</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">ARRAY_AGG</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">y</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">as</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">array_agg</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">vals</span>
<span class="devsite-syntax-k">GROUP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*---------------+</span>
<span class="devsite-syntax-cm"> | x | array_agg |</span>
<span class="devsite-syntax-cm"> +---------------+</span>
<span class="devsite-syntax-cm"> | 1 | [a, b]    |</span>
<span class="devsite-syntax-cm"> | 2 | [a, c]    |</span>
<span class="devsite-syntax-cm"> +---------------*/</span>
</code></pre></devsite-code><div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nf">ARRAY_AGG</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">OVER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">ABS</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">))</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">array_agg</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNNEST</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">1</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">-</span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">3</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">-</span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">1</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*----+-------------------------+</span>
<span class="devsite-syntax-cm"> | x  | array_agg               |</span>
<span class="devsite-syntax-cm"> +----+-------------------------+</span>
<span class="devsite-syntax-cm"> | 1  | [1, 1]                  |</span>
<span class="devsite-syntax-cm"> | 1  | [1, 1]                  |</span>
<span class="devsite-syntax-cm"> | 2  | [1, 1, 2, -2, -2, 2]    |</span>
<span class="devsite-syntax-cm"> | -2 | [1, 1, 2, -2, -2, 2]    |</span>
<span class="devsite-syntax-cm"> | -2 | [1, 1, 2, -2, -2, 2]    |</span>
<span class="devsite-syntax-cm"> | 2  | [1, 1, 2, -2, -2, 2]    |</span>
<span class="devsite-syntax-cm"> | 3  | [1, 1, 2, -2, -2, 2, 3] |</span>
<span class="devsite-syntax-cm"> +----+-------------------------*/</span>
</code></pre></devsite-code>
<h2 id="array_concat_agg" data-text="ARRAY_CONCAT_AGG" tabindex="-1"><code translate="no" dir="ltr">ARRAY_CONCAT_AGG</code></h2>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-nf">ARRAY_CONCAT_AGG</span><span class="devsite-syntax-p">(</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">expression</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">key</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">{</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ASC</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">|</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">DESC</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">}</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">...</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">LIMIT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">n</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>
<span class="devsite-syntax-p">)</span>
</code></pre></devsite-code>
<p><strong>Description</strong></p>

<p>Concatenates elements from <code translate="no" dir="ltr">expression</code> of type <code translate="no" dir="ltr">ARRAY</code>, returning a single
array as a result.</p>

<p>This function ignores <code translate="no" dir="ltr">NULL</code> input arrays, but respects the <code translate="no" dir="ltr">NULL</code> elements in
non-<code translate="no" dir="ltr">NULL</code> input arrays. An
error is raised, however, if an array in the final query result contains a
<code translate="no" dir="ltr">NULL</code> element. Returns <code translate="no" dir="ltr">NULL</code> if there are zero input rows or
<code translate="no" dir="ltr">expression</code> evaluates to <code translate="no" dir="ltr">NULL</code> for all rows.</p>

<p>To learn more about the optional aggregate clauses that you can pass
into this function, see
<a href="/bigquery/docs/reference/standard-sql/aggregate-function-calls">Aggregate function calls</a>.</p>

<!-- mdlint off(WHITESPACE_LINE_LENGTH) -->

<!-- mdlint on -->

<p><strong>Supported Argument Types</strong></p>

<p><code translate="no" dir="ltr">ARRAY</code></p>

<p><strong>Returned Data Types</strong></p>

<p><code translate="no" dir="ltr">ARRAY</code></p>

<p><strong>Examples</strong></p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">FORMAT</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-s2">"%T"</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">ARRAY_CONCAT_AGG</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">))</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">array_concat_agg</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-no">NULL</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">1</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">3</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">4</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">x</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-no">NULL</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-mi">5</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">6</span><span class="devsite-syntax-err">]</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-mi">7</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">8</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">9</span><span class="devsite-syntax-err">]</span>
<span class="devsite-syntax-p">);</span>

<span class="devsite-syntax-cm">/*-----------------------------------+</span>
<span class="devsite-syntax-cm"> | array_concat_agg                  |</span>
<span class="devsite-syntax-cm"> +-----------------------------------+</span>
<span class="devsite-syntax-cm"> | [NULL, 1, 2, 3, 4, 5, 6, 7, 8, 9] |</span>
<span class="devsite-syntax-cm"> +-----------------------------------*/</span>
</code></pre></devsite-code><div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">FORMAT</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-s2">"%T"</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">ARRAY_CONCAT_AGG</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">ARRAY_LENGTH</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">)))</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">array_concat_agg</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-mi">1</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">3</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">4</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">x</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-mi">5</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">6</span><span class="devsite-syntax-err">]</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-mi">7</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">8</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">9</span><span class="devsite-syntax-err">]</span>
<span class="devsite-syntax-p">);</span>

<span class="devsite-syntax-cm">/*-----------------------------------+</span>
<span class="devsite-syntax-cm"> | array_concat_agg                  |</span>
<span class="devsite-syntax-cm"> +-----------------------------------+</span>
<span class="devsite-syntax-cm"> | [5, 6, 7, 8, 9, 1, 2, 3, 4]       |</span>
<span class="devsite-syntax-cm"> +-----------------------------------*/</span>
</code></pre></devsite-code><div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">FORMAT</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-s2">"%T"</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">ARRAY_CONCAT_AGG</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">LIMIT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-p">))</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">array_concat_agg</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-mi">1</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">3</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">4</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">x</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-mi">5</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">6</span><span class="devsite-syntax-err">]</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-mi">7</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">8</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">9</span><span class="devsite-syntax-err">]</span>
<span class="devsite-syntax-p">);</span>

<span class="devsite-syntax-cm">/*--------------------------+</span>
<span class="devsite-syntax-cm"> | array_concat_agg         |</span>
<span class="devsite-syntax-cm"> +--------------------------+</span>
<span class="devsite-syntax-cm"> | [1, 2, 3, 4, 5, 6]       |</span>
<span class="devsite-syntax-cm"> +--------------------------*/</span>
</code></pre></devsite-code><div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">FORMAT</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-s2">"%T"</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">ARRAY_CONCAT_AGG</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">ARRAY_LENGTH</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">LIMIT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-p">))</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">array_concat_agg</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-mi">1</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">3</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">4</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">x</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-mi">5</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">6</span><span class="devsite-syntax-err">]</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-mi">7</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">8</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">9</span><span class="devsite-syntax-err">]</span>
<span class="devsite-syntax-p">);</span>

<span class="devsite-syntax-cm">/*------------------+</span>
<span class="devsite-syntax-cm"> | array_concat_agg |</span>
<span class="devsite-syntax-cm"> +------------------+</span>
<span class="devsite-syntax-cm"> | [5, 6, 7, 8, 9]  |</span>
<span class="devsite-syntax-cm"> +------------------*/</span>
</code></pre></devsite-code>
<h2 id="avg" data-text="AVG" tabindex="-1"><code translate="no" dir="ltr">AVG</code></h2>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-nf">AVG</span><span class="devsite-syntax-p">(</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">DISTINCT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">expression</span>
<span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">OVER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">over_clause</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>

<span class="devsite-syntax-n">over_clause</span><span class="devsite-syntax-err">:</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">{</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">named_window</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">|</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">window_specification</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">}</span>

<span class="devsite-syntax-n">window_specification</span><span class="devsite-syntax-err">:</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">named_window</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">PARTITION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">partition_expression</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">...</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">expression</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">{</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ASC</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">|</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">DESC</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">}</span><span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">...</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">window_frame_clause</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>

</code></pre></devsite-code>
<p><strong>Description</strong></p>

<p>Returns the average of non-<code translate="no" dir="ltr">NULL</code> values in an aggregated group.</p>

<p>To learn more about the optional aggregate clauses that you can pass
into this function, see
<a href="/bigquery/docs/reference/standard-sql/aggregate-function-calls">Aggregate function calls</a>.</p>

<p>This function can be used with the
<a href="/bigquery/docs/reference/standard-sql/query-syntax#agg_threshold_clause"><code translate="no" dir="ltr">AGGREGATION_THRESHOLD</code> clause</a>.</p>

<!-- mdlint off(WHITESPACE_LINE_LENGTH) -->

<!-- mdlint on -->

<p>If this function is used with the <code translate="no" dir="ltr">OVER</code> clause, it&#39;s part of a
window function call. In a window function call,
aggregate function clauses can&#39;t be used.
To learn more about the <code translate="no" dir="ltr">OVER</code> clause and how to use it, see
<a href="/bigquery/docs/reference/standard-sql/window-function-calls">Window function calls</a>.</p>

<!-- mdlint off(WHITESPACE_LINE_LENGTH) -->

<!-- mdlint on -->

<p><code translate="no" dir="ltr">AVG</code> can be used with differential privacy. For more information, see
<a href="/bigquery/docs/reference/standard-sql/aggregate-dp-functions">Differentially private aggregate functions</a>.</p>

<p>Caveats:</p>

<ul>
<li>If the aggregated group is empty or the argument is <code translate="no" dir="ltr">NULL</code> for all rows in
the group, returns <code translate="no" dir="ltr">NULL</code>.</li>
<li>If the argument is <code translate="no" dir="ltr">NaN</code> for any row in the group, returns <code translate="no" dir="ltr">NaN</code>.</li>
<li>If the argument is <code translate="no" dir="ltr">[+|-]Infinity</code> for any row in the group, returns either
<code translate="no" dir="ltr">[+|-]Infinity</code> or <code translate="no" dir="ltr">NaN</code>.</li>
<li>If there is numeric overflow, produces an error.</li>
<li>If a <a href="/bigquery/docs/reference/standard-sql/data-types#floating_point_types">floating-point type</a> is returned, the result is
<a href="/bigquery/docs/reference/standard-sql/data-types#floating_point_semantics">non-deterministic</a>, which means you might receive a
different result each time you use this function.</li>
</ul>

<p><strong>Supported Argument Types</strong></p>

<ul>
<li>Any numeric input type</li>
<li><code translate="no" dir="ltr">INTERVAL</code></li>
</ul>

<p><strong>Returned Data Types</strong></p>

<table>

<thead>
<tr>
<th>INPUT</th><th><code translate="no" dir="ltr">INT64</code></th><th><code translate="no" dir="ltr">NUMERIC</code></th><th><code translate="no" dir="ltr">BIGNUMERIC</code></th><th><code translate="no" dir="ltr">FLOAT64</code></th><th><code translate="no" dir="ltr">INTERVAL</code></th>
</tr>
</thead>
<tbody>
<tr><th>OUTPUT</th><td style="vertical-align:middle"><code translate="no" dir="ltr">FLOAT64</code></td><td style="vertical-align:middle"><code translate="no" dir="ltr">NUMERIC</code></td><td style="vertical-align:middle"><code translate="no" dir="ltr">BIGNUMERIC</code></td><td style="vertical-align:middle"><code translate="no" dir="ltr">FLOAT64</code></td><td style="vertical-align:middle"><code translate="no" dir="ltr">INTERVAL</code></td></tr>
</tbody>

</table>

<p><strong>Examples</strong></p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">AVG</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">as</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">avg</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNNEST</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-mi">0</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">4</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">4</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">5</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">as</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*-----+</span>
<span class="devsite-syntax-cm"> | avg |</span>
<span class="devsite-syntax-cm"> +-----+</span>
<span class="devsite-syntax-cm"> | 3   |</span>
<span class="devsite-syntax-cm"> +-----*/</span>
</code></pre></devsite-code><div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">AVG</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-k">DISTINCT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">avg</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNNEST</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-mi">0</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">4</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">4</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">5</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*------+</span>
<span class="devsite-syntax-cm"> | avg  |</span>
<span class="devsite-syntax-cm"> +------+</span>
<span class="devsite-syntax-cm"> | 2.75 |</span>
<span class="devsite-syntax-cm"> +------*/</span>
</code></pre></devsite-code><div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nf">AVG</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">OVER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ROWS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BETWEEN</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">1</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">PRECEDING</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AND</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">CURRENT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ROW</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">avg</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNNEST</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-mi">0</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-no">NULL</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">4</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">4</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">5</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*------+------+</span>
<span class="devsite-syntax-cm"> | x    | avg  |</span>
<span class="devsite-syntax-cm"> +------+------+</span>
<span class="devsite-syntax-cm"> | NULL | NULL |</span>
<span class="devsite-syntax-cm"> | 0    | 0    |</span>
<span class="devsite-syntax-cm"> | 2    | 1    |</span>
<span class="devsite-syntax-cm"> | 4    | 3    |</span>
<span class="devsite-syntax-cm"> | 4    | 4    |</span>
<span class="devsite-syntax-cm"> | 5    | 4.5  |</span>
<span class="devsite-syntax-cm"> +------+------*/</span>
</code></pre></devsite-code>
<h2 id="bit_and" data-text="BIT_AND" tabindex="-1"><code translate="no" dir="ltr">BIT_AND</code></h2>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-nf">BIT_AND</span><span class="devsite-syntax-p">(</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">expression</span>
<span class="devsite-syntax-p">)</span>
</code></pre></devsite-code>
<p><strong>Description</strong></p>

<p>Performs a bitwise AND operation on <code translate="no" dir="ltr">expression</code> and returns the result.</p>

<p>To learn more about the optional aggregate clauses that you can pass
into this function, see
<a href="/bigquery/docs/reference/standard-sql/aggregate-function-calls">Aggregate function calls</a>.</p>

<!-- mdlint off(WHITESPACE_LINE_LENGTH) -->

<!-- mdlint on -->

<p><strong>Supported Argument Types</strong></p>

<ul>
<li>INT64</li>
</ul>

<p><strong>Returned Data Types</strong></p>

<p>INT64</p>

<p><strong>Examples</strong></p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">BIT_AND</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">as</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">bit_and</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNNEST</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-mh">0xF001</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mh">0x00A1</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">as</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*---------+</span>
<span class="devsite-syntax-cm"> | bit_and |</span>
<span class="devsite-syntax-cm"> +---------+</span>
<span class="devsite-syntax-cm"> | 1       |</span>
<span class="devsite-syntax-cm"> +---------*/</span>
</code></pre></devsite-code>
<h2 id="bit_or" data-text="BIT_OR" tabindex="-1"><code translate="no" dir="ltr">BIT_OR</code></h2>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-nf">BIT_OR</span><span class="devsite-syntax-p">(</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">expression</span>
<span class="devsite-syntax-p">)</span>
</code></pre></devsite-code>
<p><strong>Description</strong></p>

<p>Performs a bitwise OR operation on <code translate="no" dir="ltr">expression</code> and returns the result.</p>

<p>To learn more about the optional aggregate clauses that you can pass
into this function, see
<a href="/bigquery/docs/reference/standard-sql/aggregate-function-calls">Aggregate function calls</a>.</p>

<!-- mdlint off(WHITESPACE_LINE_LENGTH) -->

<!-- mdlint on -->

<p><strong>Supported Argument Types</strong></p>

<ul>
<li>INT64</li>
</ul>

<p><strong>Returned Data Types</strong></p>

<p>INT64</p>

<p><strong>Examples</strong></p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">BIT_OR</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">as</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">bit_or</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNNEST</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-mh">0xF001</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mh">0x00A1</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">as</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*--------+</span>
<span class="devsite-syntax-cm"> | bit_or |</span>
<span class="devsite-syntax-cm"> +--------+</span>
<span class="devsite-syntax-cm"> | 61601  |</span>
<span class="devsite-syntax-cm"> +--------*/</span>
</code></pre></devsite-code>
<h2 id="bit_xor" data-text="BIT_XOR" tabindex="-1"><code translate="no" dir="ltr">BIT_XOR</code></h2>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-nf">BIT_XOR</span><span class="devsite-syntax-p">(</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">DISTINCT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">expression</span>
<span class="devsite-syntax-p">)</span>
</code></pre></devsite-code>
<p><strong>Description</strong></p>

<p>Performs a bitwise XOR operation on <code translate="no" dir="ltr">expression</code> and returns the result.</p>

<p>To learn more about the optional aggregate clauses that you can pass
into this function, see
<a href="/bigquery/docs/reference/standard-sql/aggregate-function-calls">Aggregate function calls</a>.</p>

<!-- mdlint off(WHITESPACE_LINE_LENGTH) -->

<!-- mdlint on -->

<p><strong>Supported Argument Types</strong></p>

<ul>
<li>INT64</li>
</ul>

<p><strong>Returned Data Types</strong></p>

<p>INT64</p>

<p><strong>Examples</strong></p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">BIT_XOR</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">bit_xor</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNNEST</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-mi">5678</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">1234</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*---------+</span>
<span class="devsite-syntax-cm"> | bit_xor |</span>
<span class="devsite-syntax-cm"> +---------+</span>
<span class="devsite-syntax-cm"> | 4860    |</span>
<span class="devsite-syntax-cm"> +---------*/</span>
</code></pre></devsite-code><div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">BIT_XOR</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">bit_xor</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNNEST</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-mi">1234</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">5678</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">1234</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*---------+</span>
<span class="devsite-syntax-cm"> | bit_xor |</span>
<span class="devsite-syntax-cm"> +---------+</span>
<span class="devsite-syntax-cm"> | 5678    |</span>
<span class="devsite-syntax-cm"> +---------*/</span>
</code></pre></devsite-code><div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">BIT_XOR</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-k">DISTINCT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">bit_xor</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNNEST</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-mi">1234</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">5678</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">1234</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*---------+</span>
<span class="devsite-syntax-cm"> | bit_xor |</span>
<span class="devsite-syntax-cm"> +---------+</span>
<span class="devsite-syntax-cm"> | 4860    |</span>
<span class="devsite-syntax-cm"> +---------*/</span>
</code></pre></devsite-code>
<h2 id="count" data-text="COUNT" tabindex="-1"><code translate="no" dir="ltr">COUNT</code></h2>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-nf">COUNT</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-err">*</span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">OVER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">over_clause</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>
</code></pre></devsite-code><div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-nf">COUNT</span><span class="devsite-syntax-p">(</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">DISTINCT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">expression</span>
<span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">OVER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">over_clause</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>

<span class="devsite-syntax-n">over_clause</span><span class="devsite-syntax-err">:</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">{</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">named_window</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">|</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">window_specification</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">}</span>

<span class="devsite-syntax-n">window_specification</span><span class="devsite-syntax-err">:</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">named_window</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">PARTITION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">partition_expression</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">...</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">expression</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">{</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ASC</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">|</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">DESC</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">}</span><span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">...</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">window_frame_clause</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>

</code></pre></devsite-code>
<p><strong>Description</strong></p>

<p>Gets the number of rows in the input or the number of rows with an
expression evaluated to any value other than <code translate="no" dir="ltr">NULL</code>.</p>
<aside class="note"><strong>Note:</strong><span> If you&#39;re querying a large dataset, you can compute results faster and
save resources by using <a href="/bigquery/docs/reference/standard-sql/hll_functions">HLL++ functions</a> for approximate
distinct counts. For more information, see
<a href="/bigquery/docs/sketches">Sketches</a>.</span></aside>
<p><strong>Definitions</strong></p>

<ul>
<li><code translate="no" dir="ltr">*</code>: Use this value to get the number of all rows in the input.</li>
<li><code translate="no" dir="ltr">expression</code>: A value of any data type that represents the expression to
evaluate. If <code translate="no" dir="ltr">DISTINCT</code> is present,
<code translate="no" dir="ltr">expression</code> can only be a data type that is
<a href="/bigquery/docs/reference/standard-sql/data-types#groupable_data_types">groupable</a>.</li>
<li>Optional aggregate clauses: To learn more about the optional aggregate
clauses that you can pass into this function, see
<a href="/bigquery/docs/reference/standard-sql/aggregate-function-calls">Aggregate function calls</a>.</li>
</ul>

<!-- mdlint off(WHITESPACE_LINE_LENGTH) -->

<!-- mdlint on -->

<ul>
<li><code translate="no" dir="ltr">OVER</code>: To learn more about the <code translate="no" dir="ltr">OVER</code> clause and how to use it, see
<a href="/bigquery/docs/reference/standard-sql/window-function-calls">Window function calls</a>.</li>
</ul>

<!-- mdlint off(WHITESPACE_LINE_LENGTH) -->

<!-- mdlint on -->

<p><strong>Details</strong></p>

<p>To count the number of distinct values of an expression for which a
certain condition is satisfied, you can use the following recipe:</p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-nf">COUNT</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-k">DISTINCT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">IF</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">condition</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">expression</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-no">NULL</span><span class="devsite-syntax-p">))</span>
</code></pre></devsite-code>
<p><code translate="no" dir="ltr">IF</code> returns the value of <code translate="no" dir="ltr">expression</code> if <code translate="no" dir="ltr">condition</code> is <code translate="no" dir="ltr">TRUE</code>, or
<code translate="no" dir="ltr">NULL</code> otherwise. The surrounding <code translate="no" dir="ltr">COUNT(DISTINCT ...)</code> ignores the <code translate="no" dir="ltr">NULL</code>
values, so it counts only the distinct values of <code translate="no" dir="ltr">expression</code> for which
<code translate="no" dir="ltr">condition</code> is <code translate="no" dir="ltr">TRUE</code>.</p>

<p>To count the number of non-distinct values of an expression for which a
certain condition is satisfied, consider using the
<a href="/bigquery/docs/reference/standard-sql/aggregate_functions#countif"><code translate="no" dir="ltr">COUNTIF</code></a> function.</p>

<p>This function with <code translate="no" dir="ltr">DISTINCT</code> supports specifying <a href="/bigquery/docs/reference/standard-sql/collation-concepts">collation</a>.</p>

<p><code translate="no" dir="ltr">COUNT</code> can be used with differential privacy. For more information, see
<a href="/bigquery/docs/reference/standard-sql/aggregate-dp-functions">Differentially private aggregate functions</a>.</p>

<p><strong>Return type</strong></p>

<p><code translate="no" dir="ltr">INT64</code></p>

<p><strong>Examples</strong></p>

<p>You can use the <code translate="no" dir="ltr">COUNT</code> function to return the number of rows in a table or the
number of distinct values of an expression. For example:</p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nf">COUNT</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-err">*</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">count_star</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nf">COUNT</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-k">DISTINCT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">count_dist_x</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNNEST</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-mi">1</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">4</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">4</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">5</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*------------+--------------+</span>
<span class="devsite-syntax-cm"> | count_star | count_dist_x |</span>
<span class="devsite-syntax-cm"> +------------+--------------+</span>
<span class="devsite-syntax-cm"> | 4          | 3            |</span>
<span class="devsite-syntax-cm"> +------------+--------------*/</span>
</code></pre></devsite-code><div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nf">COUNT</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-err">*</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">OVER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-k">PARTITION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">MOD</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">3</span><span class="devsite-syntax-p">))</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">count_star</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nf">COUNT</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-k">DISTINCT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">OVER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-k">PARTITION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">MOD</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">3</span><span class="devsite-syntax-p">))</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">count_dist_x</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNNEST</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-mi">1</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">4</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">4</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">5</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*------+------------+--------------+</span>
<span class="devsite-syntax-cm"> | x    | count_star | count_dist_x |</span>
<span class="devsite-syntax-cm"> +------+------------+--------------+</span>
<span class="devsite-syntax-cm"> | 1    | 3          | 2            |</span>
<span class="devsite-syntax-cm"> | 4    | 3          | 2            |</span>
<span class="devsite-syntax-cm"> | 4    | 3          | 2            |</span>
<span class="devsite-syntax-cm"> | 5    | 1          | 1            |</span>
<span class="devsite-syntax-cm"> +------+------------+--------------*/</span>
</code></pre></devsite-code><div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nf">COUNT</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-err">*</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">OVER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-k">PARTITION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">MOD</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">3</span><span class="devsite-syntax-p">))</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">count_star</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nf">COUNT</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">OVER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-k">PARTITION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">MOD</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">3</span><span class="devsite-syntax-p">))</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">count_x</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNNEST</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-mi">1</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">4</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-no">NULL</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">4</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">5</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*------+------------+---------+</span>
<span class="devsite-syntax-cm"> | x    | count_star | count_x |</span>
<span class="devsite-syntax-cm"> +------+------------+---------+</span>
<span class="devsite-syntax-cm"> | NULL | 1          | 0       |</span>
<span class="devsite-syntax-cm"> | 1    | 3          | 3       |</span>
<span class="devsite-syntax-cm"> | 4    | 3          | 3       |</span>
<span class="devsite-syntax-cm"> | 4    | 3          | 3       |</span>
<span class="devsite-syntax-cm"> | 5    | 1          | 1       |</span>
<span class="devsite-syntax-cm"> +------+------------+---------*/</span>
</code></pre></devsite-code>
<p>The following query counts the number of distinct positive values of <code translate="no" dir="ltr">x</code>:</p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">COUNT</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-k">DISTINCT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">IF</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-w"> &gt; </span><span class="devsite-syntax-mi">0</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-no">NULL</span><span class="devsite-syntax-p">))</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">distinct_positive</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNNEST</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-mi">1</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">-</span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">4</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">1</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">-</span><span class="devsite-syntax-mi">5</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">4</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">1</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">3</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">-</span><span class="devsite-syntax-mi">6</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">1</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*-------------------+</span>
<span class="devsite-syntax-cm"> | distinct_positive |</span>
<span class="devsite-syntax-cm"> +-------------------+</span>
<span class="devsite-syntax-cm"> | 3                 |</span>
<span class="devsite-syntax-cm"> +-------------------*/</span>
</code></pre></devsite-code>
<p>The following query counts the number of distinct dates on which a certain kind
of event occurred:</p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">WITH</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">Events</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">DATE</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2021-01-01'</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">event_date</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'SUCCESS'</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">event_type</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">DATE</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2021-01-02'</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">event_date</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'SUCCESS'</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">event_type</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">DATE</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2021-01-02'</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">event_date</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'FAILURE'</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">event_type</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">DATE</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2021-01-03'</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">event_date</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'SUCCESS'</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">event_type</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">DATE</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2021-01-04'</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">event_date</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'FAILURE'</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">event_type</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">DATE</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2021-01-04'</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">event_date</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'FAILURE'</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">event_type</span>
<span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-k">SELECT</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nf">COUNT</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-k">DISTINCT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">IF</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">event_type</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'FAILURE'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">event_date</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-no">NULL</span><span class="devsite-syntax-p">))</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">distinct_dates_with_failures</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">Events</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*------------------------------+</span>
<span class="devsite-syntax-cm"> | distinct_dates_with_failures |</span>
<span class="devsite-syntax-cm"> +------------------------------+</span>
<span class="devsite-syntax-cm"> | 2                            |</span>
<span class="devsite-syntax-cm"> +------------------------------*/</span>
</code></pre></devsite-code>
<p>The following query counts the number of distinct <code translate="no" dir="ltr">id</code>s that exist in both
the <code translate="no" dir="ltr">customers</code> and <code translate="no" dir="ltr">vendor</code> tables:</p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">WITH</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">customers</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">1934</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">id</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'a'</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">team</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">2991</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'b'</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">3988</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'c'</span><span class="devsite-syntax-p">),</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">vendors</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">1934</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">id</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'d'</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">team</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">2991</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'e'</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">4366</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'f'</span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-k">SELECT</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nf">COUNT</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-k">DISTINCT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">IF</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">id</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">IN</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">id</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">customers</span><span class="devsite-syntax-p">),</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">id</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-no">NULL</span><span class="devsite-syntax-p">))</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">result</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">vendors</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*--------+</span>
<span class="devsite-syntax-cm"> | result |</span>
<span class="devsite-syntax-cm"> +--------+</span>
<span class="devsite-syntax-cm"> | 2      |</span>
<span class="devsite-syntax-cm"> +--------*/</span>
</code></pre></devsite-code>
<h2 id="countif" data-text="COUNTIF" tabindex="-1"><code translate="no" dir="ltr">COUNTIF</code></h2>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-nf">COUNTIF</span><span class="devsite-syntax-p">(</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">DISTINCT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">expression</span>
<span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">OVER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">over_clause</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>

<span class="devsite-syntax-n">over_clause</span><span class="devsite-syntax-err">:</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">{</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">named_window</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">|</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">window_specification</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">}</span>

<span class="devsite-syntax-n">window_specification</span><span class="devsite-syntax-err">:</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">named_window</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">PARTITION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">partition_expression</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">...</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">expression</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">{</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ASC</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">|</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">DESC</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">}</span><span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">...</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">window_frame_clause</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>

</code></pre></devsite-code>
<p><strong>Description</strong></p>

<p>Gets the number of <code translate="no" dir="ltr">TRUE</code> values for an expression.</p>

<p><strong>Definitions</strong></p>

<ul>
<li><code translate="no" dir="ltr">expression</code>: A <code translate="no" dir="ltr">BOOL</code> value that represents the expression to evaluate.</li>
<li>Optional aggregate clauses: To learn more about the optional aggregate
clauses that you can pass into this function, see
<a href="/bigquery/docs/reference/standard-sql/aggregate-function-calls">Aggregate function calls</a>.</li>
</ul>

<!-- mdlint off(WHITESPACE_LINE_LENGTH) -->

<!-- mdlint on -->

<ul>
<li><code translate="no" dir="ltr">OVER</code>: To learn more about the <code translate="no" dir="ltr">OVER</code> clause and how to use it, see
<a href="/bigquery/docs/reference/standard-sql/window-function-calls">Window function calls</a>.</li>
</ul>

<!-- mdlint off(WHITESPACE_LINE_LENGTH) -->

<!-- mdlint on -->

<p><strong>Details</strong></p>

<p>The function signature <code translate="no" dir="ltr">COUNTIF(DISTINCT ...)</code> is generally not useful. If you
would like to use <code translate="no" dir="ltr">DISTINCT</code>, use <code translate="no" dir="ltr">COUNT</code> with <code translate="no" dir="ltr">DISTINCT IF</code>. For more
information, see the <a href="/bigquery/docs/reference/standard-sql/aggregate_functions#count"><code translate="no" dir="ltr">COUNT</code></a> function.</p>

<p><strong>Return type</strong></p>

<p><code translate="no" dir="ltr">INT64</code></p>

<p><strong>Examples</strong></p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">COUNTIF</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">x&lt;0</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">num_negative</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">COUNTIF</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">x&gt;0</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">num_positive</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNNEST</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-mi">5</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">-</span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">3</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">6</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">-</span><span class="devsite-syntax-mi">10</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">-</span><span class="devsite-syntax-mi">7</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">4</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">0</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*--------------+--------------+</span>
<span class="devsite-syntax-cm"> | num_negative | num_positive |</span>
<span class="devsite-syntax-cm"> +--------------+--------------+</span>
<span class="devsite-syntax-cm"> | 3            | 4            |</span>
<span class="devsite-syntax-cm"> +--------------+--------------*/</span>
</code></pre></devsite-code><div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nf">COUNTIF</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">x&lt;0</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">OVER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">ABS</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ROWS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BETWEEN</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">1</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">PRECEDING</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AND</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">1</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">FOLLOWING</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">num_negative</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNNEST</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-mi">5</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">-</span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">3</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">6</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">-</span><span class="devsite-syntax-mi">10</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-no">NULL</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">-</span><span class="devsite-syntax-mi">7</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">4</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">0</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*------+--------------+</span>
<span class="devsite-syntax-cm"> | x    | num_negative |</span>
<span class="devsite-syntax-cm"> +------+--------------+</span>
<span class="devsite-syntax-cm"> | NULL | 0            |</span>
<span class="devsite-syntax-cm"> | 0    | 1            |</span>
<span class="devsite-syntax-cm"> | -2   | 1            |</span>
<span class="devsite-syntax-cm"> | 3    | 1            |</span>
<span class="devsite-syntax-cm"> | 4    | 0            |</span>
<span class="devsite-syntax-cm"> | 5    | 0            |</span>
<span class="devsite-syntax-cm"> | 6    | 1            |</span>
<span class="devsite-syntax-cm"> | -7   | 2            |</span>
<span class="devsite-syntax-cm"> | -10  | 2            |</span>
<span class="devsite-syntax-cm"> +------+--------------*/</span>
</code></pre></devsite-code>
<h2 id="grouping" data-text="GROUPING" tabindex="-1"><code translate="no" dir="ltr">GROUPING</code></h2>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">GROUPING</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">groupable_value</span><span class="devsite-syntax-p">)</span>
</code></pre></devsite-code>
<p><strong>Description</strong></p>

<p>If a groupable item in the <a href="/bigquery/docs/reference/standard-sql/query-syntax#group_by_clause"><code translate="no" dir="ltr">GROUP BY</code> clause</a> is aggregated
(and thus not grouped), this function returns <code translate="no" dir="ltr">1</code>. Otherwise,
this function returns <code translate="no" dir="ltr">0</code>.</p>

<p>Definitions:</p>

<ul>
<li><code translate="no" dir="ltr">groupable_value</code>: An expression that represents a value that can be grouped
in the <code translate="no" dir="ltr">GROUP BY</code> clause.</li>
</ul>

<p>Details:</p>

<p>The <code translate="no" dir="ltr">GROUPING</code> function is helpful if you need to determine which rows are
produced by which grouping sets. A grouping set is a group of columns by which
rows can be grouped together. So, if you need to filter rows by
a few specific grouping sets, you can use the <code translate="no" dir="ltr">GROUPING</code> function to identify
which grouping sets grouped which rows by creating a matrix of the results.</p>

<p>In addition, you can use the <code translate="no" dir="ltr">GROUPING</code> function to determine the type of
<code translate="no" dir="ltr">NULL</code> produced by the <code translate="no" dir="ltr">GROUP BY</code> clause. In some cases, the <code translate="no" dir="ltr">GROUP BY</code> clause
produces a <code translate="no" dir="ltr">NULL</code> placeholder. This placeholder represents all groupable items
that are aggregated (not grouped) in the current grouping set. This is different
from a standard <code translate="no" dir="ltr">NULL</code>, which can also be produced by a query.</p>

<p>For more information, see the following examples.</p>

<p><strong>Returned Data Type</strong></p>

<p><code translate="no" dir="ltr">INT64</code></p>

<p><strong>Examples</strong></p>

<p>In the following example, it&#39;s difficult to determine which rows are grouped by
the grouping value <code translate="no" dir="ltr">product_type</code> or <code translate="no" dir="ltr">product_name</code>. The <code translate="no" dir="ltr">GROUPING</code> function
makes this easier to determine.</p>

<p>Pay close attention to what&#39;s in the <code translate="no" dir="ltr">product_type_agg</code> and
<code translate="no" dir="ltr">product_name_agg</code> column matrix. This determines how the rows are grouped.</p>

<table>
<thead>
<tr>
<th><code translate="no" dir="ltr">product_type_agg</code></th>
<th><code translate="no" dir="ltr">product_name_agg</code></th>
<th>Notes</th>
</tr>
</thead>

<tbody>
<tr>
<td>1</td>
<td>0</td>
<td>Rows are grouped by <code translate="no" dir="ltr">product_name</code>.</td>
</tr>
<tr>
<td>0</td>
<td>1</td>
<td>Rows are grouped by <code translate="no" dir="ltr">product_type</code>.</td>
</tr>
<tr>
<td>0</td>
<td>0</td>
<td>Rows are grouped by <code translate="no" dir="ltr">product_type</code> and <code translate="no" dir="ltr">product_name</code>.</td>
</tr>
<tr>
<td>1</td>
<td>1</td>
<td>Grand total row.</td>
</tr>
</tbody>
</table>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">WITH</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">Products</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'shirt'</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">product_type</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'t-shirt'</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">product_name</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">3</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">product_count</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'shirt'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'t-shirt'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">8</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'shirt'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'polo'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">25</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'pants'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'jeans'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">6</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-k">SELECT</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">product_type</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">product_name</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nf">SUM</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">product_count</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">product_sum</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">GROUPING</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">product_type</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">product_type_agg</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">GROUPING</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">product_name</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">product_name_agg</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">Products</span>
<span class="devsite-syntax-k">GROUP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">GROUPING</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SET</span><span class="devsite-syntax-n">S</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">product_type</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">product_name</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">())</span>
<span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">product_name</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*--------------+--------------+-------------+------------------+------------------+</span>
<span class="devsite-syntax-cm"> | product_type | product_name | product_sum | product_type_agg | product_name_agg |</span>
<span class="devsite-syntax-cm"> +--------------+--------------+-------------+------------------+------------------+</span>
<span class="devsite-syntax-cm"> | NULL         | NULL         | 42          | 1                | 1                |</span>
<span class="devsite-syntax-cm"> | shirt        | NULL         | 36          | 0                | 1                |</span>
<span class="devsite-syntax-cm"> | pants        | NULL         | 6           | 0                | 1                |</span>
<span class="devsite-syntax-cm"> | NULL         | jeans        | 6           | 1                | 0                |</span>
<span class="devsite-syntax-cm"> | NULL         | polo         | 25          | 1                | 0                |</span>
<span class="devsite-syntax-cm"> | NULL         | t-shirt      | 11          | 1                | 0                |</span>
<span class="devsite-syntax-cm"> +--------------+--------------+-------------+------------------+------------------*/</span>
</code></pre></devsite-code>
<p>In the following example, it&#39;s difficult to determine
if <code translate="no" dir="ltr">NULL</code> represents a <code translate="no" dir="ltr">NULL</code> placeholder or a standard <code translate="no" dir="ltr">NULL</code> value in the
<code translate="no" dir="ltr">product_type</code> column. The <code translate="no" dir="ltr">GROUPING</code> function makes it easier to
determine what type of <code translate="no" dir="ltr">NULL</code> is being produced. If
<code translate="no" dir="ltr">product_type_is_aggregated</code> is <code translate="no" dir="ltr">1</code>, the <code translate="no" dir="ltr">NULL</code> value for
the <code translate="no" dir="ltr">product_type</code> column is a <code translate="no" dir="ltr">NULL</code> placeholder.</p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">WITH</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">Products</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'shirt'</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">product_type</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'t-shirt'</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">product_name</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">3</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">product_count</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'shirt'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'t-shirt'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">8</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-no">NULL</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'polo'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">25</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'pants'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'jeans'</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">6</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-k">SELECT</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">product_type</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">product_name</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nf">SUM</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">product_count</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">product_sum</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">GROUPING</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">product_type</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">product_type_is_aggregated</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">Products</span>
<span class="devsite-syntax-k">GROUP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">GROUPING</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SET</span><span class="devsite-syntax-n">S</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">product_type</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">product_name</span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">product_name</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*--------------+--------------+-------------+----------------------------+</span>
<span class="devsite-syntax-cm"> | product_type | product_name | product_sum | product_type_is_aggregated |</span>
<span class="devsite-syntax-cm"> +--------------+--------------+-------------+----------------------------+</span>
<span class="devsite-syntax-cm"> | shirt        | NULL         | 11          | 0                          |</span>
<span class="devsite-syntax-cm"> | NULL         | NULL         | 25          | 0                          |</span>
<span class="devsite-syntax-cm"> | pants        | NULL         | 6           | 0                          |</span>
<span class="devsite-syntax-cm"> | NULL         | jeans        | 6           | 1                          |</span>
<span class="devsite-syntax-cm"> | NULL         | polo         | 25          | 1                          |</span>
<span class="devsite-syntax-cm"> | NULL         | t-shirt      | 11          | 1                          |</span>
<span class="devsite-syntax-cm"> +--------------+--------------+-------------+----------------------------*/</span>
</code></pre></devsite-code>
<h2 id="logical_and" data-text="LOGICAL_AND" tabindex="-1"><code translate="no" dir="ltr">LOGICAL_AND</code></h2>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-nf">LOGICAL_AND</span><span class="devsite-syntax-p">(</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">expression</span>
<span class="devsite-syntax-p">)</span>
</code></pre></devsite-code>
<p><strong>Description</strong></p>

<p>Returns the logical AND of all non-<code translate="no" dir="ltr">NULL</code> expressions. Returns <code translate="no" dir="ltr">NULL</code> if there
are zero input rows or <code translate="no" dir="ltr">expression</code> evaluates to <code translate="no" dir="ltr">NULL</code> for all rows.</p>

<p>To learn more about the optional aggregate clauses that you can pass
into this function, see
<a href="/bigquery/docs/reference/standard-sql/aggregate-function-calls">Aggregate function calls</a>.</p>

<p>This function can be used with the
<a href="/bigquery/docs/reference/standard-sql/query-syntax#agg_threshold_clause"><code translate="no" dir="ltr">AGGREGATION_THRESHOLD</code> clause</a>.</p>

<!-- mdlint off(WHITESPACE_LINE_LENGTH) -->

<!-- mdlint on -->

<p><strong>Supported Argument Types</strong></p>

<p><code translate="no" dir="ltr">BOOL</code></p>

<p><strong>Return Data Types</strong></p>

<p><code translate="no" dir="ltr">BOOL</code></p>

<p><strong>Examples</strong></p>

<p><code translate="no" dir="ltr">LOGICAL_AND</code> returns <code translate="no" dir="ltr">FALSE</code> because not all of the values in the array are
less than 3.</p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">LOGICAL_AND</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-w"> &lt; </span><span class="devsite-syntax-mi">3</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">logical_and</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNNEST</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-mi">1</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">4</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*-------------+</span>
<span class="devsite-syntax-cm"> | logical_and |</span>
<span class="devsite-syntax-cm"> +-------------+</span>
<span class="devsite-syntax-cm"> | FALSE       |</span>
<span class="devsite-syntax-cm"> +-------------*/</span>
</code></pre></devsite-code>
<h2 id="logical_or" data-text="LOGICAL_OR" tabindex="-1"><code translate="no" dir="ltr">LOGICAL_OR</code></h2>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-nf">LOGICAL_OR</span><span class="devsite-syntax-p">(</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">expression</span>
<span class="devsite-syntax-p">)</span>
</code></pre></devsite-code>
<p><strong>Description</strong></p>

<p>Returns the logical OR of all non-<code translate="no" dir="ltr">NULL</code> expressions. Returns <code translate="no" dir="ltr">NULL</code> if there
are zero input rows or <code translate="no" dir="ltr">expression</code> evaluates to <code translate="no" dir="ltr">NULL</code> for all rows.</p>

<p>To learn more about the optional aggregate clauses that you can pass
into this function, see
<a href="/bigquery/docs/reference/standard-sql/aggregate-function-calls">Aggregate function calls</a>.</p>

<p>This function can be used with the
<a href="/bigquery/docs/reference/standard-sql/query-syntax#agg_threshold_clause"><code translate="no" dir="ltr">AGGREGATION_THRESHOLD</code> clause</a>.</p>

<!-- mdlint off(WHITESPACE_LINE_LENGTH) -->

<!-- mdlint on -->

<p><strong>Supported Argument Types</strong></p>

<p><code translate="no" dir="ltr">BOOL</code></p>

<p><strong>Return Data Types</strong></p>

<p><code translate="no" dir="ltr">BOOL</code></p>

<p><strong>Examples</strong></p>

<p><code translate="no" dir="ltr">LOGICAL_OR</code> returns <code translate="no" dir="ltr">TRUE</code> because at least one of the values in the array is
less than 3.</p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">LOGICAL_OR</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-w"> &lt; </span><span class="devsite-syntax-mi">3</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">logical_or</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNNEST</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-mi">1</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">4</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*------------+</span>
<span class="devsite-syntax-cm"> | logical_or |</span>
<span class="devsite-syntax-cm"> +------------+</span>
<span class="devsite-syntax-cm"> | TRUE       |</span>
<span class="devsite-syntax-cm"> +------------*/</span>
</code></pre></devsite-code>
<h2 id="max" data-text="MAX" tabindex="-1"><code translate="no" dir="ltr">MAX</code></h2>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">MAX</span><span class="devsite-syntax-p">(</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">expression</span>
<span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">OVER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">over_clause</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>

<span class="devsite-syntax-n">over_clause</span><span class="devsite-syntax-err">:</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">{</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">named_window</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">|</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">window_specification</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">}</span>

<span class="devsite-syntax-n">window_specification</span><span class="devsite-syntax-err">:</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">named_window</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">PARTITION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">partition_expression</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">...</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">expression</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">{</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ASC</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">|</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">DESC</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">}</span><span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">...</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">window_frame_clause</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>

</code></pre></devsite-code>
<p><strong>Description</strong></p>

<p>Returns the maximum non-<code translate="no" dir="ltr">NULL</code> value in an aggregated group.</p>

<p>Caveats:</p>

<ul>
<li>If the aggregated group is empty or the argument is <code translate="no" dir="ltr">NULL</code> for all rows in
the group, returns <code translate="no" dir="ltr">NULL</code>.</li>
<li>If the argument is <code translate="no" dir="ltr">NaN</code> for any row in the group, returns <code translate="no" dir="ltr">NaN</code>.</li>
</ul>

<p>To learn more about the optional aggregate clauses that you can pass
into this function, see
<a href="/bigquery/docs/reference/standard-sql/aggregate-function-calls">Aggregate function calls</a>.</p>

<!-- mdlint off(WHITESPACE_LINE_LENGTH) -->

<!-- mdlint on -->

<p>To learn more about the <code translate="no" dir="ltr">OVER</code> clause and how to use it, see
<a href="/bigquery/docs/reference/standard-sql/window-function-calls">Window function calls</a>.</p>

<!-- mdlint off(WHITESPACE_LINE_LENGTH) -->

<!-- mdlint on -->

<p>This function supports specifying <a href="/bigquery/docs/reference/standard-sql/collation-concepts">collation</a>.</p>

<p><strong>Supported Argument Types</strong></p>

<p>Any <a href="/bigquery/docs/reference/standard-sql/data-types#data_type_properties">orderable data type</a> except for <code translate="no" dir="ltr">ARRAY</code>.</p>

<p><strong>Return Data Types</strong></p>

<p>The data type of the input values.</p>

<p><strong>Examples</strong></p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">MAX</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">max</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNNEST</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-mi">8</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">37</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">55</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">4</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*-----+</span>
<span class="devsite-syntax-cm"> | max |</span>
<span class="devsite-syntax-cm"> +-----+</span>
<span class="devsite-syntax-cm"> | 55  |</span>
<span class="devsite-syntax-cm"> +-----*/</span>
</code></pre></devsite-code><div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">MAX</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">OVER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-k">PARTITION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">MOD</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-p">))</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">max</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNNEST</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-mi">8</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-no">NULL</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">37</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">55</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-no">NULL</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">4</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*------+------+</span>
<span class="devsite-syntax-cm"> | x    | max  |</span>
<span class="devsite-syntax-cm"> +------+------+</span>
<span class="devsite-syntax-cm"> | NULL | NULL |</span>
<span class="devsite-syntax-cm"> | NULL | NULL |</span>
<span class="devsite-syntax-cm"> | 8    | 8    |</span>
<span class="devsite-syntax-cm"> | 4    | 8    |</span>
<span class="devsite-syntax-cm"> | 37   | 55   |</span>
<span class="devsite-syntax-cm"> | 55   | 55   |</span>
<span class="devsite-syntax-cm"> +------+------*/</span>
</code></pre></devsite-code>
<h2 id="max_by" data-text="MAX_BY" tabindex="-1"><code translate="no" dir="ltr">MAX_BY</code></h2>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-n">MAX_BY</span><span class="devsite-syntax-p">(</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">y</span>
<span class="devsite-syntax-p">)</span>
</code></pre></devsite-code>
<p><strong>Description</strong></p>

<p>Synonym for <a href="#any_value"><code translate="no" dir="ltr">ANY_VALUE(x HAVING MAX y)</code></a>.</p>

<p><strong>Return Data Types</strong></p>

<p>Matches the input <code translate="no" dir="ltr">x</code> data type.</p>

<p><strong>Examples</strong></p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">WITH</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">fruits</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">"apple"</span><span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">fruit</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mf">3.55</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">price</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">"banana"</span><span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">fruit</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mf">2.10</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">price</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">"pear"</span><span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">fruit</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mf">4.30</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">price</span>
<span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">MAX_BY</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">fruit</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">price</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">as</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">fruit</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">fruits</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*-------+</span>
<span class="devsite-syntax-cm"> | fruit |</span>
<span class="devsite-syntax-cm"> +-------+</span>
<span class="devsite-syntax-cm"> | pear  |</span>
<span class="devsite-syntax-cm"> +-------*/</span>
</code></pre></devsite-code>
<h2 id="min" data-text="MIN" tabindex="-1"><code translate="no" dir="ltr">MIN</code></h2>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">MIN</span><span class="devsite-syntax-p">(</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">expression</span>
<span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">OVER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">over_clause</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>

<span class="devsite-syntax-n">over_clause</span><span class="devsite-syntax-err">:</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">{</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">named_window</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">|</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">window_specification</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">}</span>

<span class="devsite-syntax-n">window_specification</span><span class="devsite-syntax-err">:</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">named_window</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">PARTITION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">partition_expression</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">...</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">expression</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">{</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ASC</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">|</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">DESC</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">}</span><span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">...</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">window_frame_clause</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>

</code></pre></devsite-code>
<p><strong>Description</strong></p>

<p>Returns the minimum non-<code translate="no" dir="ltr">NULL</code> value in an aggregated group.</p>

<p>Caveats:</p>

<ul>
<li>If the aggregated group is empty or the argument is <code translate="no" dir="ltr">NULL</code> for all rows in
the group, returns <code translate="no" dir="ltr">NULL</code>.</li>
<li>If the argument is <code translate="no" dir="ltr">NaN</code> for any row in the group, returns <code translate="no" dir="ltr">NaN</code>.</li>
</ul>

<p>To learn more about the optional aggregate clauses that you can pass
into this function, see
<a href="/bigquery/docs/reference/standard-sql/aggregate-function-calls">Aggregate function calls</a>.</p>

<!-- mdlint off(WHITESPACE_LINE_LENGTH) -->

<!-- mdlint on -->

<p>To learn more about the <code translate="no" dir="ltr">OVER</code> clause and how to use it, see
<a href="/bigquery/docs/reference/standard-sql/window-function-calls">Window function calls</a>.</p>

<!-- mdlint off(WHITESPACE_LINE_LENGTH) -->

<!-- mdlint on -->

<p>This function supports specifying <a href="/bigquery/docs/reference/standard-sql/collation-concepts">collation</a>.</p>

<p><strong>Supported Argument Types</strong></p>

<p>Any <a href="/bigquery/docs/reference/standard-sql/data-types#data_type_properties">orderable data type</a> except for <code translate="no" dir="ltr">ARRAY</code>.</p>

<p><strong>Return Data Types</strong></p>

<p>The data type of the input values.</p>

<p><strong>Examples</strong></p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">MIN</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">min</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNNEST</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-mi">8</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">37</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">4</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">55</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*-----+</span>
<span class="devsite-syntax-cm"> | min |</span>
<span class="devsite-syntax-cm"> +-----+</span>
<span class="devsite-syntax-cm"> | 4   |</span>
<span class="devsite-syntax-cm"> +-----*/</span>
</code></pre></devsite-code><div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">MIN</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">OVER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-k">PARTITION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">MOD</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-p">))</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">min</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNNEST</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-mi">8</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-no">NULL</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">37</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">4</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-no">NULL</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">55</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*------+------+</span>
<span class="devsite-syntax-cm"> | x    | min  |</span>
<span class="devsite-syntax-cm"> +------+------+</span>
<span class="devsite-syntax-cm"> | NULL | NULL |</span>
<span class="devsite-syntax-cm"> | NULL | NULL |</span>
<span class="devsite-syntax-cm"> | 8    | 4    |</span>
<span class="devsite-syntax-cm"> | 4    | 4    |</span>
<span class="devsite-syntax-cm"> | 37   | 37   |</span>
<span class="devsite-syntax-cm"> | 55   | 37   |</span>
<span class="devsite-syntax-cm"> +------+------*/</span>
</code></pre></devsite-code>
<h2 id="min_by" data-text="MIN_BY" tabindex="-1"><code translate="no" dir="ltr">MIN_BY</code></h2>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-n">MIN_BY</span><span class="devsite-syntax-p">(</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">y</span>
<span class="devsite-syntax-p">)</span>
</code></pre></devsite-code>
<p><strong>Description</strong></p>

<p>Synonym for <a href="#any_value"><code translate="no" dir="ltr">ANY_VALUE(x HAVING MIN y)</code></a>.</p>

<p><strong>Return Data Types</strong></p>

<p>Matches the input <code translate="no" dir="ltr">x</code> data type.</p>

<p><strong>Examples</strong></p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">WITH</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">fruits</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">"apple"</span><span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">fruit</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mf">3.55</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">price</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">"banana"</span><span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">fruit</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mf">2.10</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">price</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">"pear"</span><span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">fruit</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mf">4.30</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">price</span>
<span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">MIN_BY</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">fruit</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">price</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">as</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">fruit</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">fruits</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*--------+</span>
<span class="devsite-syntax-cm"> | fruit  |</span>
<span class="devsite-syntax-cm"> +--------+</span>
<span class="devsite-syntax-cm"> | banana |</span>
<span class="devsite-syntax-cm"> +--------*/</span>
</code></pre></devsite-code>
<h2 id="string_agg" data-text="STRING_AGG" tabindex="-1"><code translate="no" dir="ltr">STRING_AGG</code></h2>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-nf">STRING_AGG</span><span class="devsite-syntax-p">(</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">DISTINCT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">expression</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">delimiter</span><span class="devsite-syntax-err">]</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">key</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">{</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ASC</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">|</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">DESC</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">}</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">...</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">LIMIT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">n</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>
<span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">OVER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">over_clause</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>

<span class="devsite-syntax-n">over_clause</span><span class="devsite-syntax-err">:</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">{</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">named_window</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">|</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">window_specification</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">}</span>

<span class="devsite-syntax-n">window_specification</span><span class="devsite-syntax-err">:</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">named_window</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">PARTITION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">partition_expression</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">...</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">expression</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">{</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ASC</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">|</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">DESC</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">}</span><span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">...</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">window_frame_clause</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>

</code></pre></devsite-code>
<p><strong>Description</strong></p>

<p>Returns a value (either <code translate="no" dir="ltr">STRING</code> or <code translate="no" dir="ltr">BYTES</code>) obtained by concatenating
non-<code translate="no" dir="ltr">NULL</code> values. Returns <code translate="no" dir="ltr">NULL</code> if there are zero input rows or <code translate="no" dir="ltr">expression</code>
evaluates to <code translate="no" dir="ltr">NULL</code> for all rows.</p>

<p>If a <code translate="no" dir="ltr">delimiter</code> is specified, concatenated values are separated by that
delimiter; otherwise, a comma is used as a delimiter.</p>

<p>To learn more about the optional aggregate clauses that you can pass
into this function, see
<a href="/bigquery/docs/reference/standard-sql/aggregate-function-calls">Aggregate function calls</a>.</p>

<!-- mdlint off(WHITESPACE_LINE_LENGTH) -->

<!-- mdlint on -->

<p>If this function is used with the <code translate="no" dir="ltr">OVER</code> clause, it&#39;s part of a
window function call. In a window function call,
aggregate function clauses can&#39;t be used.
To learn more about the <code translate="no" dir="ltr">OVER</code> clause and how to use it, see
<a href="/bigquery/docs/reference/standard-sql/window-function-calls">Window function calls</a>.</p>

<!-- mdlint off(WHITESPACE_LINE_LENGTH) -->

<!-- mdlint on -->

<p><strong>Supported Argument Types</strong></p>

<p>Either <code translate="no" dir="ltr">STRING</code> or <code translate="no" dir="ltr">BYTES</code>.</p>

<p><strong>Return Data Types</strong></p>

<p>Either <code translate="no" dir="ltr">STRING</code> or <code translate="no" dir="ltr">BYTES</code>.</p>

<p><strong>Examples</strong></p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">STRING_AGG</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">fruit</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">string_agg</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNNEST</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-s2">"apple"</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-no">NULL</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">"pear"</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">"banana"</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">"pear"</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">fruit</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*------------------------+</span>
<span class="devsite-syntax-cm"> | string_agg             |</span>
<span class="devsite-syntax-cm"> +------------------------+</span>
<span class="devsite-syntax-cm"> | apple,pear,banana,pear |</span>
<span class="devsite-syntax-cm"> +------------------------*/</span>
</code></pre></devsite-code><div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">STRING_AGG</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">fruit</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">" &amp; "</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">string_agg</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNNEST</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-s2">"apple"</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">"pear"</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">"banana"</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">"pear"</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">fruit</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*------------------------------+</span>
<span class="devsite-syntax-cm"> | string_agg                   |</span>
<span class="devsite-syntax-cm"> +------------------------------+</span>
<span class="devsite-syntax-cm"> | apple &amp; pear &amp; banana &amp; pear |</span>
<span class="devsite-syntax-cm"> +------------------------------*/</span>
</code></pre></devsite-code><div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">STRING_AGG</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-k">DISTINCT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">fruit</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">" &amp; "</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">string_agg</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNNEST</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-s2">"apple"</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">"pear"</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">"banana"</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">"pear"</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">fruit</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*-----------------------+</span>
<span class="devsite-syntax-cm"> | string_agg            |</span>
<span class="devsite-syntax-cm"> +-----------------------+</span>
<span class="devsite-syntax-cm"> | apple &amp; pear &amp; banana |</span>
<span class="devsite-syntax-cm"> +-----------------------*/</span>
</code></pre></devsite-code><div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">STRING_AGG</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">fruit</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">" &amp; "</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">LENGTH</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">fruit</span><span class="devsite-syntax-p">))</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">string_agg</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNNEST</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-s2">"apple"</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">"pear"</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">"banana"</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">"pear"</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">fruit</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*------------------------------+</span>
<span class="devsite-syntax-cm"> | string_agg                   |</span>
<span class="devsite-syntax-cm"> +------------------------------+</span>
<span class="devsite-syntax-cm"> | pear &amp; pear &amp; apple &amp; banana |</span>
<span class="devsite-syntax-cm"> +------------------------------*/</span>
</code></pre></devsite-code><div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">STRING_AGG</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">fruit</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">" &amp; "</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">LIMIT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">string_agg</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNNEST</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-s2">"apple"</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">"pear"</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">"banana"</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">"pear"</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">fruit</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*--------------+</span>
<span class="devsite-syntax-cm"> | string_agg   |</span>
<span class="devsite-syntax-cm"> +--------------+</span>
<span class="devsite-syntax-cm"> | apple &amp; pear |</span>
<span class="devsite-syntax-cm"> +--------------*/</span>
</code></pre></devsite-code><div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">STRING_AGG</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-k">DISTINCT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">fruit</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">" &amp; "</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">fruit</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">DESC</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">LIMIT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">string_agg</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNNEST</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-s2">"apple"</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">"pear"</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">"banana"</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">"pear"</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">fruit</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*---------------+</span>
<span class="devsite-syntax-cm"> | string_agg    |</span>
<span class="devsite-syntax-cm"> +---------------+</span>
<span class="devsite-syntax-cm"> | pear &amp; banana |</span>
<span class="devsite-syntax-cm"> +---------------*/</span>
</code></pre></devsite-code><div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">fruit</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nf">STRING_AGG</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">fruit</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">" &amp; "</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">OVER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">LENGTH</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">fruit</span><span class="devsite-syntax-p">))</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">string_agg</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNNEST</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-s2">"apple"</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-no">NULL</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">"pear"</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">"banana"</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">"pear"</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">fruit</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*--------+------------------------------+</span>
<span class="devsite-syntax-cm"> | fruit  | string_agg                   |</span>
<span class="devsite-syntax-cm"> +--------+------------------------------+</span>
<span class="devsite-syntax-cm"> | NULL   | NULL                         |</span>
<span class="devsite-syntax-cm"> | pear   | pear &amp; pear                  |</span>
<span class="devsite-syntax-cm"> | pear   | pear &amp; pear                  |</span>
<span class="devsite-syntax-cm"> | apple  | pear &amp; pear &amp; apple          |</span>
<span class="devsite-syntax-cm"> | banana | pear &amp; pear &amp; apple &amp; banana |</span>
<span class="devsite-syntax-cm"> +--------+------------------------------*/</span>
</code></pre></devsite-code>
<h2 id="sum" data-text="SUM" tabindex="-1"><code translate="no" dir="ltr">SUM</code></h2>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-nf">SUM</span><span class="devsite-syntax-p">(</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">DISTINCT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">expression</span>
<span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">OVER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">over_clause</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>

<span class="devsite-syntax-n">over_clause</span><span class="devsite-syntax-err">:</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">{</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">named_window</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">|</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">window_specification</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">}</span>

<span class="devsite-syntax-n">window_specification</span><span class="devsite-syntax-err">:</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">named_window</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">PARTITION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">partition_expression</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">...</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">expression</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">{</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ASC</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">|</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">DESC</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">}</span><span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">...</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">window_frame_clause</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">]</span>

</code></pre></devsite-code>
<p><strong>Description</strong></p>

<p>Returns the sum of non-<code translate="no" dir="ltr">NULL</code> values in an aggregated group.</p>

<p>To learn more about the optional aggregate clauses that you can pass
into this function, see
<a href="/bigquery/docs/reference/standard-sql/aggregate-function-calls">Aggregate function calls</a>.</p>

<p>This function can be used with the
<a href="/bigquery/docs/reference/standard-sql/query-syntax#agg_threshold_clause"><code translate="no" dir="ltr">AGGREGATION_THRESHOLD</code> clause</a>.</p>

<!-- mdlint off(WHITESPACE_LINE_LENGTH) -->

<!-- mdlint on -->

<p>To learn more about the <code translate="no" dir="ltr">OVER</code> clause and how to use it, see
<a href="/bigquery/docs/reference/standard-sql/window-function-calls">Window function calls</a>.</p>

<!-- mdlint off(WHITESPACE_LINE_LENGTH) -->

<!-- mdlint on -->

<p><code translate="no" dir="ltr">SUM</code> can be used with differential privacy. For more information, see
<a href="/bigquery/docs/reference/standard-sql/aggregate-dp-functions">Differentially private aggregate functions</a>.</p>

<p>Caveats:</p>

<ul>
<li>If the aggregated group is empty or the argument is <code translate="no" dir="ltr">NULL</code> for all rows in
the group, returns <code translate="no" dir="ltr">NULL</code>.</li>
<li>If the argument is <code translate="no" dir="ltr">NaN</code> for any row in the group, returns <code translate="no" dir="ltr">NaN</code>.</li>
<li>If the argument is <code translate="no" dir="ltr">[+|-]Infinity</code> for any row in the group, returns either
<code translate="no" dir="ltr">[+|-]Infinity</code> or <code translate="no" dir="ltr">NaN</code>.</li>
<li>If there is numeric overflow, produces an error.</li>
<li>If a <a href="/bigquery/docs/reference/standard-sql/data-types#floating_point_types">floating-point type</a> is returned, the result is
<a href="/bigquery/docs/reference/standard-sql/data-types#floating_point_semantics">non-deterministic</a>, which means you might receive a
different result each time you use this function.</li>
</ul>

<p><strong>Supported Argument Types</strong></p>

<ul>
<li>Any supported numeric data type</li>
<li><code translate="no" dir="ltr">INTERVAL</code></li>
</ul>

<p><strong>Return Data Types</strong></p>

<table>

<thead>
<tr>
<th>INPUT</th><th><code translate="no" dir="ltr">INT64</code></th><th><code translate="no" dir="ltr">NUMERIC</code></th><th><code translate="no" dir="ltr">BIGNUMERIC</code></th><th><code translate="no" dir="ltr">FLOAT64</code></th><th><code translate="no" dir="ltr">INTERVAL</code></th>
</tr>
</thead>
<tbody>
<tr><th>OUTPUT</th><td style="vertical-align:middle"><code translate="no" dir="ltr">INT64</code></td><td style="vertical-align:middle"><code translate="no" dir="ltr">NUMERIC</code></td><td style="vertical-align:middle"><code translate="no" dir="ltr">BIGNUMERIC</code></td><td style="vertical-align:middle"><code translate="no" dir="ltr">FLOAT64</code></td><td style="vertical-align:middle"><code translate="no" dir="ltr">INTERVAL</code></td></tr>
</tbody>

</table>

<p><strong>Examples</strong></p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">SUM</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">sum</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNNEST</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-mi">1</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">3</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">4</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">5</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">4</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">3</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">1</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*-----+</span>
<span class="devsite-syntax-cm"> | sum |</span>
<span class="devsite-syntax-cm"> +-----+</span>
<span class="devsite-syntax-cm"> | 25  |</span>
<span class="devsite-syntax-cm"> +-----*/</span>
</code></pre></devsite-code><div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">SUM</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-k">DISTINCT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">sum</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNNEST</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-mi">1</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">3</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">4</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">5</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">4</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">3</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">1</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*-----+</span>
<span class="devsite-syntax-cm"> | sum |</span>
<span class="devsite-syntax-cm"> +-----+</span>
<span class="devsite-syntax-cm"> | 15  |</span>
<span class="devsite-syntax-cm"> +-----*/</span>
</code></pre></devsite-code><div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nf">SUM</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">OVER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-k">PARTITION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">MOD</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">3</span><span class="devsite-syntax-p">))</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">sum</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNNEST</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-mi">1</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">3</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">4</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">5</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">4</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">3</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">1</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*---+-----+</span>
<span class="devsite-syntax-cm"> | x | sum |</span>
<span class="devsite-syntax-cm"> +---+-----+</span>
<span class="devsite-syntax-cm"> | 3 | 6   |</span>
<span class="devsite-syntax-cm"> | 3 | 6   |</span>
<span class="devsite-syntax-cm"> | 1 | 10  |</span>
<span class="devsite-syntax-cm"> | 4 | 10  |</span>
<span class="devsite-syntax-cm"> | 4 | 10  |</span>
<span class="devsite-syntax-cm"> | 1 | 10  |</span>
<span class="devsite-syntax-cm"> | 2 | 9   |</span>
<span class="devsite-syntax-cm"> | 5 | 9   |</span>
<span class="devsite-syntax-cm"> | 2 | 9   |</span>
<span class="devsite-syntax-cm"> +---+-----*/</span>
</code></pre></devsite-code><div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nf">SUM</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-k">DISTINCT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">OVER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-k">PARTITION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">MOD</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">3</span><span class="devsite-syntax-p">))</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">sum</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNNEST</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-err">[</span><span class="devsite-syntax-mi">1</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">3</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">4</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">5</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">4</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">3</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">1</span><span class="devsite-syntax-err">]</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*---+-----+</span>
<span class="devsite-syntax-cm"> | x | sum |</span>
<span class="devsite-syntax-cm"> +---+-----+</span>
<span class="devsite-syntax-cm"> | 3 | 3   |</span>
<span class="devsite-syntax-cm"> | 3 | 3   |</span>
<span class="devsite-syntax-cm"> | 1 | 5   |</span>
<span class="devsite-syntax-cm"> | 4 | 5   |</span>
<span class="devsite-syntax-cm"> | 4 | 5   |</span>
<span class="devsite-syntax-cm"> | 1 | 5   |</span>
<span class="devsite-syntax-cm"> | 2 | 7   |</span>
<span class="devsite-syntax-cm"> | 5 | 7   |</span>
<span class="devsite-syntax-cm"> | 2 | 7   |</span>
<span class="devsite-syntax-cm"> +---+-----*/</span>
</code></pre></devsite-code><div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">SUM</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">sum</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNNEST</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-err">[]</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">x</span><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-cm">/*------+</span>
<span class="devsite-syntax-cm"> | sum  |</span>
<span class="devsite-syntax-cm"> +------+</span>
<span class="devsite-syntax-cm"> | NULL |</span>
<span class="devsite-syntax-cm"> +------*/</span>
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
