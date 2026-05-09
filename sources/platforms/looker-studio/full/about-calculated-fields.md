# Looker Studio About Calculated Fields

- Source ID: `SRC-LOOKER-STUDIO-ABOUT-CALCULATED-FIELDS`
- URL: https://cloud.google.com/looker/docs/studio/about-calculated-fields
- Accessed: 2026-05-09
- Local format: Markdown wrapper containing the complete fetched article HTML.
- License: Google Cloud documentation is licensed under Creative Commons Attribution 4.0, and code samples under Apache 2.0, except as otherwise noted on the source page.

## Complete Article HTML Snapshot

~~~html
<article class="devsite-article">
  
  
  
    <div class="devsite-banner devsite-banner-announcement nocontent" data-nosnippet
      
        
      >
      <div class="devsite-banner-message">
        <div class="devsite-banner-message-text">
          Looker Studio is now called Data Studio. <a href="/data-studio/welcome#looker_studio_is_now_called">Learn more about this change</a>.
        </div>
      </div>
    </div>
  
  
  

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
    
    
    
      
        
  <a href="https://docs.cloud.google.com/data-studio"
      
        class="devsite-breadcrumb-link gc-analytics-event"
      
        data-category="Site-Wide Custom Events"
      
        data-label="Breadcrumbs"
      
        data-value="4"
      
        track-type="globalNav"
      
        track-name="breadcrumb"
      
        track-metadata-position="4"
      
        track-metadata-eventdetail="Data Studio"
      
    >
    
          Data Studio
        
  </a>
  
      
    
  </li>
  
  <li class="devsite-breadcrumb-item
             ">
    
      
      <div class="devsite-breadcrumb-guillemet material-icons" aria-hidden="true"></div>
    
    
    
      
        
  <a href="https://docs.cloud.google.com/data-studio/welcome"
      
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
  project-name="Data Studio"
  product-id="5274844"
  bucket="Documentation"
  context="Feedback"
  version="t-devsite-webserver-20260428-r00-rc01.477318040238770238"
  data-label="Send Feedback Button"
  track-type="feedback"
  track-name="sendFeedbackLink"
  track-metadata-position="header"
  class="nocontent"
  data-nosnippet
  
  
  
    
      project-icon="https://docs.cloud.google.com/_static/clouddocs/images/icons/categories/data-analytics-color.svg"
    
  
  
  
  >

  <button>
  
    
    Send feedback
  
  </button>
</devsite-feedback>
  
    <h1 class="devsite-page-title" tabindex="-1">
      About calculated fields<devsite-actions hidden data-nosnippet><devsite-feature-tooltip
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

  
    
    
    


























<p>Calculated fields let you create new metrics and dimensions that are derived from your data. Calculated fields let you extend and transform the information that flows from your data sources and see the results in reports.</p>

<p><a name="watch-a-video"> </a></p>

<h2 id="watch_a_video" data-text="Watch a video" tabindex="-1">Watch a video</h2>

<div class="video-wrapper"> <devsite-video video-id="suAa8QtPBJY"> </devsite-video> </div>

<p><a name="how-calculated-fields-work"> </a></p>

<h2 id="how_calculated_fields_work" data-text="How calculated fields work" tabindex="-1">How calculated fields work</h2>

<p>A calculated field is a formula that performs some action on one or more other fields in your data source. Calculated fields can perform arithmetic and math; manipulate text, date, and geographical information; and use branching logic to evaluate your data and return different results. You can also create custom groups with the <a href="/data-studio/create-a-custom-group"><strong>custom group</strong></a> calculated field type, or custom bins with the <a href="/data-studio/create-a-custom-bin"><strong>custom bin</strong></a> calculated field type. The output of a calculated field can then be displayed for every row of data in charts that include that field. How this new data is displayed depends on how it&#39;s used.</p>

<p>For example, say you create a calculated field called <strong>Total</strong> that multiplies a unit price field (<strong><span class="notranslate">Price</span></strong>) by a quantity sold field (<strong><span class="notranslate"> Qty Sold </span></strong>):</p>

<p><img alt="The Add a field panel displays the formula sum(Price) * sum(Qty Sold) for a calculated field called Total." src="/static/data-studio/images/calc-field-example-2018-09-25-rge.png" style="max-width:700px" class="screenshot"></p>

<p>When used in a table, the calculated <strong>Total</strong> field shows the product of that multiplication for each row.</p>

<p><img alt="A table chart displays columns for SKU, Item, Price, and Qty Sold, along with the Total calculated field, which multiplies the Price value by the Qty Sold for each row." src="/static/data-studio/images/use-calc-field-table-2018-09-26.png" style="max-width:700px"></p>

<p>When used in scorecard, the <strong>Total</strong> field displays the sum of the products for all rows in which quantity is multiplied by price.</p>

<p><img alt="The Total calculated field metric in a Scorecard chart displays the value 15,488.22 with the field name, Total, in superscript." src="/static/data-studio/images/use-calc-field-scorecard-2018-09-26.png" style="max-width:700px"></p>

<p><a name="data-source-vs-chart-specific-calculated-fields"> </a></p>

<h2 id="data_source_versus_chart-specific_calculated_fields" data-text="Data source versus chart-specific calculated fields" tabindex="-1">Data source versus chart-specific calculated fields</h2>

<p>There are two kinds of calculated fields, which are determined by where you create them: <a href="#calculated-fields-in-data-sources">in the data source</a>, or <a href="#chart-specific-calculated-fields">in specific charts</a> in a report. Each kind of calculated field offers certain advantages over the other.</p>

<p><a name="calculated-fields-in-data-sources"> </a></p>

<h3 id="calculated_fields_in_data_sources" data-text="Calculated fields in data sources" tabindex="-1">Calculated fields in data sources</h3>

<p>When you create a calculated field in a data source, the following actions are available:</p>

<ul>
<li>The calculated field is available in any report that uses that data source.</li>
<li>You can use a data source calculated field in charts, controls, and other calculated fields, just like a regular field.</li>
<li>You can filter on a data source calculated field, just like a regular field. For example, you could set a filter property to include only items with a combined value of $500 or more:</li>
</ul>

<p><img alt="A calculated field called  Item Filter with the logic Greater than or equal to 500 is selected as the Filter Control Filter." src="/static/data-studio/images/use-calc-field-filter-2018-09-26.png" style="max-width:700px" class="screenshot"></p>

<p><a name="limits-of-dscf"> </a></p>

<h4 id="limits_of_data_source_calculated_fields" data-text="Limits of data source calculated fields" tabindex="-1">Limits of data source calculated fields</h4>

<p>Calculated fields in data sources have the following limitations:</p>

<ul>
<li>You can&#39;t use a data source calculated field with blended data.</li>
<li>You must have edit rights to the data source to create or edit calculated fields there.</li>
<li>You cannot apply <a href="/data-studio/format-fields-in-reports">custom value formatting</a> when you create or edit a calculated field in a data source.</li>
</ul>

<p>You can apply custom value formatting to a data source calculated field in the <strong>Setup</strong> tab of a chart&#39;s <strong>Properties</strong> panel.</p>

<p><a name="chart-specific-calculated-field"> </a> <a name="chart-specific-calculated-fields"> </a></p>

<h3 id="chart-specific_calculated_fields" data-text="Chart-specific calculated fields" tabindex="-1">Chart-specific calculated fields</h3>

<p>You can add calculated fields directly to a chart in your report. These chart-specific (also known as &quot;chart level&quot;) calculated fields can do math, use functions, and return results-based CASE statements, just like calculated fields in a data source.</p>

<p>Chart-specific calculated fields offer some advantages over data source calculated fields:</p>

<ul>
<li>You can quickly add fields without needing access to the data source.</li>
<li>You can create chart-specific calculated fields that are based on blended data.</li>
<li>You can include data source calculated fields in chart-specific calculated fields.</li>
<li>You can apply <a href="/data-studio/format-fields-in-reports">custom value formatting</a> to a chart-specific calculated field during the creation process.</li>
</ul>

<p><a name="limits-of-cscf"> </a></p>

<h4 id="limits_of_chart-specific_calculated_fields" data-text="Limits of chart-specific calculated fields" tabindex="-1">Limits of chart-specific calculated fields</h4>

<ul>
<li>Chart-specific calculated fields only exist in the chart in which you create them. Creating a field in the chart does not also create it in the chart&#39;s data source.</li>
<li>You can&#39;t reference other chart-specific calculated fields in your formula, even if those fields are defined in the same chart. (If you need to reference other calculated fields, use a data source calculated field.)</li>
<li>To be able to create chart-specific calculated fields, you must be an editor of the report.</li>
<li><a href="/data-studio/edit-fields-in-your-reports">Field Editing in Reports</a> must be enabled in the data source.</li>
</ul>

<p>The following table summarizes the differences between these 2 kinds of calculated fields.</p>

<table> <tbody>
 <tr>
 <th> Feature </th>
 <th> Data source calculated fields </th>
 <th> Chart-specific calculated fields </th>
 </tr>
 <tr>
 <td> Who can create? </td>
 <td> Data source editors </td>
 <td> Report editors </td>
 </tr>
 <tr>
 <td> Works on blended data? </td>
 <td> No </td>
 <td> Yes </td>
 </tr>
 <tr>
 <td> Include other calculated fields? </td>
 <td> Yes </td>
 <td> No </td>
 </tr>
 <tr>
 <td> Where can the field be used? </td>
 <td> Any report based on the data source </td>
 <td> Only the specific chart in which it was created </td>
 </tr>
 </tbody>
 </table>

<p><a name="data-type"> </a></p>

<h2 id="data_type" data-text="Data type" tabindex="-1">Data type</h2>

<p>The data type of a calculated field depends on the functions involved in the formula:</p>

<ul>
<li>Formulas that use arithmetic or aggregation functions, such as <code translate="no" dir="ltr">SUM</code>, <code translate="no" dir="ltr">COUNT</code>, or <code translate="no" dir="ltr">MAX</code>, create <strong>Number</strong> type fields.</li>
<li>Formulas that use text functions, such as <code translate="no" dir="ltr">CONCAT</code>, <code translate="no" dir="ltr">SUBSTR</code>, or <code translate="no" dir="ltr">LOWER</code>, create <strong>Text</strong> type fields.</li>
<li>Formulas that use date and time functions create <strong>Number</strong> or <strong>Date &amp; Time</strong> types fields, depending on the function used.</li>
</ul>

<p>You can change the data type of your calculated fields using the <strong>Type</strong> drop-down menu in the data source editor.</p>

<p>Learn more about <a href="/data-studio/data-types">data types</a>.</p>

<p><a name="aggregation"> </a> <a name="aggregation-and-calculated-fields"> </a></p>

<h2 id="aggregation_and_calculated_fields" data-text="Aggregation and calculated fields" tabindex="-1">Aggregation and calculated fields</h2>

<p>Aggregation is the method by which a field&#39;s data is summarized. You can construct calculated fields that work on unaggregated, row-by-row values, or on aggregated values.</p>

<p>For example, suppose you have 2 unaggregated numeric dimensions, <strong>Price</strong> and <strong>Quantity Sold</strong>, with the following data:</p>

<table> <tbody>
 <tr>
 <td> <strong> Order Date </strong> </td>
 <td> <strong> Item </strong> </td>
 <td> <strong> Quantity Sold </strong> </td>
 <td> <strong> Price </strong> </td>
 </tr>
 <tr>
 <td> 10/2/2019 </td>
 <td> Pretty Bird Bird Seed </td>
 <td> <p style="text-align: right"> 7 </p> </td>
 <td> <p style="text-align: right"> 7.99 </p> </td>
 </tr>
 <tr>
 <td> 10/3/2019 </td>
 <td> Pretty Bird Bird Seed </td>
 <td> <p style="text-align: right"> 5 </p> </td>
 <td> <p style="text-align: right"> 7.99 </p> </td>
 </tr>
 <tr>
 <td> 10/8/2019 </td>
 <td> Pretty Bird Bird Seed </td>
 <td> <p style="text-align: right"> 3 </p> </td>
 <td> <p style="text-align: right"> 7.99 </p> </td>
 </tr>
 <tr>
 <td> 10/13/2019 </td>
 <td> Pretty Bird Bird Seed </td>
 <td> <p style="text-align: right"> 5 </p> </td>
 <td> <p style="text-align: right"> 7.99 </p> </td>
 </tr>
 </tbody>
 </table>

<p>To calculate the total value for these orders, you&#39;d multiply <em>Price</em> and <em>Quantity Sold</em> :</p>

<p><code translate="no" dir="ltr">Price * Quantity Sold</code></p>

<p>If you create this field in the data source, the result is an unaggregated numeric dimension. Using this in a chart uses the default aggregation of Sum and calculates the total per row of your data.</p>

<p>To create an aggregated calculated metric, include the desired aggregation functions for any of the numeric fields that make up the formula. For example, suppose you want to display your total profit margin in a scorecard. You could do so with a formula like this:</p>

<p><code translate="no" dir="ltr">SUM(Profit) / SUM(Revenue)</code></p>

<p>When you explicitly specify the aggregation method, the field&#39;s default aggregation is set to <code translate="no" dir="ltr">Auto</code>. This ensures that Data Studio aggregates the formula as intended and prevents your calculated fields from being broken if someone changes the default aggregation.</p>

<p><a name="what-you-can-do-with-calculated-fields"> </a></p>

<h2 id="what_you_can_do_with_calculated_fields" data-text="What you can do with calculated fields" tabindex="-1">What you can do with calculated fields</h2>

<p>Calculated fields let you perform these tasks:</p>

<ul>
<li><a href="#do-basic-math-with-numeric-fields">Do basic math with numeric fields</a></li>
<li><a href="#manipulate-your-data-with-functions">Manipulate your data with functions</a></li>
<li><a href="#use-branching-logic">Use branching logic</a></li>
<li><a href="#create-custom-groups">Create a custom group</a></li>
<li><a href="#create-a-custom-bin">Create a custom bin</a></li>
</ul>

<p><a name="arithmetic-operators"> </a> <a name="do-basic-math-with-numeric-fields"> </a></p>

<h3 id="do_basic_math_with_numeric_fields" data-text="Do basic math with numeric fields" tabindex="-1">Do basic math with numeric fields</h3>

<p>You can perform arithmetic calculations using the normal operators:</p>

<ul>
<li>Addition: +</li>
<li>Subtraction: -</li>
<li>Division: /</li>
<li>Multiplication: *</li>
</ul>

<p>You can construct a calculated field using any of these operators in combination with static numeric values and unaggregated numeric fields from your data source. Use parentheses to force calculation order.</p>

<p><strong>Examples</strong></p>

<p><code translate="no" dir="ltr">Users / New Users</code></p>

<p><code translate="no" dir="ltr">(SUM(Price) * SUM(Quantity)) *.085</code></p>

<p>Learn more about <a href="/data-studio/operators">operators</a>.</p>

<p><a name="functions"> </a> <a name="manipulate-your-data-with-functions"> </a></p>

<h3 id="manipulate_your_data_with_functions" data-text="Manipulate your data with functions" tabindex="-1">Manipulate your data with functions</h3>

<p>Functions let you aggregate your data in different ways, apply mathematical and statistical operations, manipulate text, and work with date and geographic information.</p>

<p><strong>Examples</strong></p>

<p><code translate="no" dir="ltr"></code><span class="notranslate"><code translate="no" dir="ltr">SUM</code></span><code translate="no" dir="ltr">(Quantity)</code> - adds the values in the Quantity field.</p>

<p><code translate="no" dir="ltr"></code><span class="notranslate"><code translate="no" dir="ltr">PERCENTILE</code></span><code translate="no" dir="ltr">(Users per day, 50)</code> -- returns the 50th percentile of all values of the Users per day field.</p>

<p><code translate="no" dir="ltr"></code><span class="notranslate"><code translate="no" dir="ltr">ROUND</code></span><code translate="no" dir="ltr">(Revenue Per User, 0)</code> -- rounds the Revenue per User field to 0 places.</p>

<p><code translate="no" dir="ltr"></code><span class="notranslate"><code translate="no" dir="ltr">SUBSTR</code></span><code translate="no" dir="ltr">(Campaign, 1, 5)</code> -- returns the first 5 characters of the Campaign field.</p>

<p><code translate="no" dir="ltr"></code><span class="notranslate"><code translate="no" dir="ltr">REGEXP_EXTRACT</code></span><code translate="no" dir="ltr">(Pipe delimited values, R&#39;^([a-zA-Z_]*)(\|)&#39;)</code> -- extracts the first value in a pipe delimited string.</p>

<p><code translate="no" dir="ltr"></code><span class="notranslate"><code translate="no" dir="ltr">DATETIME_DIFF</code></span><code translate="no" dir="ltr">(Start Date, End Date)</code> -- calculates the number of days between Start Date and End Date.</p>

<p><code translate="no" dir="ltr"></code><span class="notranslate"><code translate="no" dir="ltr">PARSE_DATETIME</code></span><code translate="no" dir="ltr">(&quot;%d/%m/%Y %H:%M:%S&quot;, DateTimeText)</code> -- create a date from a text field.</p>

<p><code translate="no" dir="ltr"></code><span class="notranslate"><code translate="no" dir="ltr">TOCITY</code></span><code translate="no" dir="ltr">(Criteria ID, &quot;</code><span class="notranslate"><code translate="no" dir="ltr">CRITERIA_ID</code></span><code translate="no" dir="ltr">&quot;)</code> -- Display the associated city name from a valid Google Ads Geographical Targeting criteria ID.</p>

<p><a href="/data-studio/use-functions-in-calculated-fields">Learn more about using functions</a>.</p>

<p><a name="use-branching-logic"> </a></p>

<h3 id="use_branching_logic" data-text="Use branching logic" tabindex="-1">Use branching logic</h3>

<p><span class="notranslate"> CASE </span> statements let you perform branching &quot;if/then/else&quot; style logic in your calculated fields. For example, the following CASE formula categorizes the specified countries into regions, while grouping unspecified ones into an &quot;Other&quot; category:</p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="Component Pascal" syntax-guessed><code translate="no" dir="ltr"><span class="devsite-syntax-kr">CASE</span>
    <span class="devsite-syntax-n">WHEN</span> <span class="devsite-syntax-n">Country</span> <span class="devsite-syntax-kr">IN</span> <span class="devsite-syntax-p">(</span><span class="devsite-syntax-s">"USA"</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-s">"Canada"</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-s">"Mexico"</span><span class="devsite-syntax-p">)</span> <span class="devsite-syntax-kr">THEN</span> <span class="devsite-syntax-s">"North America"</span>
    <span class="devsite-syntax-n">WHEN</span> <span class="devsite-syntax-n">Country</span> <span class="devsite-syntax-kr">IN</span> <span class="devsite-syntax-p">(</span><span class="devsite-syntax-s">"England"</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-s">"France"</span><span class="devsite-syntax-p">)</span> <span class="devsite-syntax-kr">THEN</span> <span class="devsite-syntax-s">"Europe"</span>
    <span class="devsite-syntax-kr">ELSE</span> <span class="devsite-syntax-s">"Other"</span>
<span class="devsite-syntax-kr">END</span>
</code></pre></devsite-code>
<p><a href="/data-studio/case-searched">Learn more about <span class="notranslate"> CASE </span></a>.</p>

<p><a name="create-a-custom-group"> </a></p>

<h3 id="create_a_custom_group" data-text="Create a custom group" tabindex="-1">Create a custom group</h3>

<p>Custom groups let you create ad hoc custom groups for dimensions without needing to develop or code <code translate="no" dir="ltr">CASE</code> logic in calculated fields or SQL. This can be helpful when you want to assign fixed labels or category names to values that match specific conditions.</p>

<p>For example, a table chart called <strong>FAA flight count by destination</strong> displays a <strong>Record Count</strong> metric that is grouped by a <strong>DestState</strong> dimension that represents flight destinations.</p>

<p><img src="/static/data-studio/images/custom-group-table-before.png" width="500" alt></p>

<p>The report creator wants to view and compare the data by region instead of by individual states, but there is no <strong>Region</strong> dimension available in the data source. The report creator can group specific states or countries into regions by creating a custom group.</p>

<p>The report creator adds a custom group calculated field to the chart by entering the following specifications:</p>

<p><img src="/static/data-studio/images/custom-group-example-condition.png" width="600" alt></p>

<ul>
<li><p>In the <strong>Selected field to group by</strong> field, the report creator selects the <strong>DestState</strong> field.</p></li>
<li><p>In the <strong>New field name</strong> field, the report creator provides a name for the new group field. It is called <strong>Flight destination region</strong>.</p></li>
<li><p>In the <strong>Group name</strong> field, the report creator inputs <strong>Pacific Northwest</strong> to represent the states that are grouped in the Pacific Northwest region.</p></li>
<li><p>In the <strong>Include or Exclude</strong> drop-down menu, the report creator selects <strong>Include</strong>.</p></li>
<li><p>In the <strong>Condition</strong> drop-down menu, the report creator selects the <code translate="no" dir="ltr">In</code> function so that they can specify specific values for the Pacific Northwest group.</p></li>
<li><p>In the <strong>Group values</strong> field, the report creator inputs the state abbreviations <strong>OR</strong>, <strong>WY</strong>, <strong>ID, MT,</strong> and <strong>WA.</strong></p></li>
<li><p>The report creator wants to see how the Pacific Northwest region compares to the rest of the country. The report creator selects the <strong>Group remaining values as a new group</strong> checkbox.</p></li>
<li><p>In the <strong>Group name for remaining values</strong> field, the report creator inputs the label <strong>Other US regions</strong> so that all remaining states that are not in the Pacific Northwest group are grouped together under one label.</p></li>
<li><p>The report editor clicks <strong>Save</strong>.</p></li>
</ul>

<p>The resulting table now displays the <strong>Record Count</strong> metric grouped by the new <strong>Flight destination region</strong> dimension groups: <strong>Pacific Northwest</strong> and <strong>Other US regions</strong>.</p>

<p><img src="/static/data-studio/images/custom-group-table-result.png" width="500" alt></p>

<p>This table lets users quickly understand how many flight destinations were located in the Pacific Northwest region (4,430,314 flights), compared to other US regions (112,334,509 flights).</p>

<p><a href="/data-studio/create-a-custom-group">Learn more about custom groups.</a></p>

<p><a name="create-a-custom-bin"> </a></p>

<h3 id="create_a_custom_bin" data-text="Create a custom bin" tabindex="-1">Create a custom bin</h3>

<p>Custom bins let you create ad hoc bins, or numeric tiers, for numeric type dimensions without needing to develop or code <code translate="no" dir="ltr">CASE</code> logic in calculated fields or SQL. The <strong>Bin</strong> calculated field type can be helpful when you want to quickly group values into specific integer ranges to adjust the granularity of your data.</p>

<p>For example, a table chart called <strong>Film releases by year</strong> displays a <strong>Record Count</strong> metric that is grouped by a <strong>year_film</strong> dimension that represents the year that a film was released.</p>

<p><img src="/static/data-studio/images/custom-bin-example-1.png" width="500" alt></p>

<p>The report creator wants to view and compare the data by decade instead of by individual years, but there is no <strong>Decade</strong> dimension available in the data source. The report creator can group the years by decades by creating a custom bin.</p>

<p>The report creator adds a custom bin calculated field to the chart by entering the following specifications:</p>

<p><img src="/static/data-studio/images/custom-bin-example-2.png" width="600" alt></p>

<ul>
<li><p>In the <strong>New field name</strong> field, the report creator provides a name for the new group field: <strong>Decade.</strong></p></li>
<li><p>In the <strong>Selected field to bin by</strong> field, the report creator selects the <strong>year_film</strong> field.</p></li>
<li><p>n the <strong>Bin field format</strong> field, the report creator selects the <strong>Interval &quot;[x,y)&quot;</strong> format.</p></li>
<li><p>In the <strong>Bin type</strong> field, the report creator selects <strong>Equal Sized.</strong></p></li>
<li><p>In the <strong>Bin Size</strong> field, the report creator inputs <strong>10</strong>, for the number of years in a decade.</p></li>
<li><p>In the <strong>Bin min value</strong>, the report creator inputs <strong>1920</strong> to begin the bins at the earliest decade that a film was released in the dataset.</p></li>
<li><p>In the <strong>Bin max value</strong>, the report creator inputs <strong>2020</strong>, which end the bins at the latest decade that a film was released in the dataset.</p></li>
<li><p>To account for any extraneous data points, the report creator selects the <strong>Bin remaining values outside the min and max as separate bins</strong> checkbox.</p></li>
<li><p>The report editor clicks <strong>Save</strong>.</p></li>
</ul>

<p>The resulting table now displays the <strong>Record Count</strong> metric grouped by the new <strong>Decade</strong> bin field, to display the number of films that were released each decade.</p>

<p><img src="/static/data-studio/images/custom-bin-example-3.png" width="500" alt></p>

<p><a href="/data-studio/create-a-custom-bin">Learn more about custom bins.</a></p>

<p><a name="related-resources"> </a></p>

<h2 id="related_resources" data-text="Related resources" tabindex="-1">Related resources</h2>

<ul>
<li><a href="/data-studio/function-list">Data Studio function list</a></li>
<li><a href="/data-studio/model-your-data">Dimensions and metrics</a></li>
<li><a href="/data-studio/format-fields-in-reports">Format fields in reports</a></li>
<li><a href="/data-studio/add-data-to-a-report">Create a data source</a></li>
<li><a href="/data-studio/create-a-custom-group">Create a custom group</a></li>
<li><a href="/data-studio/create-a-custom-bin">Create a custom bin</a></li>
</ul>

  

  
    <devsite-hats-survey class="nocontent" data-nosnippet
      hats-id="Nd7nTix2o0eU5NUYprb0ThtUc5jf"
      listnr-id="83405"></devsite-hats-survey>
  

  
</div>

  
    
    
      
    <devsite-thumb-rating position="footer">
    </devsite-thumb-rating>
  
       
         <devsite-feedback
  position="footer"
  project-name="Data Studio"
  product-id="5274844"
  bucket="Documentation"
  context="Feedback"
  version="t-devsite-webserver-20260428-r00-rc01.477318040238770238"
  data-label="Send Feedback Button"
  track-type="feedback"
  track-name="sendFeedbackLink"
  track-metadata-position="footer"
  class="nocontent"
  data-nosnippet
  
  
  
    
      project-icon="https://docs.cloud.google.com/_static/clouddocs/images/icons/categories/data-analytics-color.svg"
    
  
  
  
  >

  <button>
  
    
    Send feedback
  
  </button>
</devsite-feedback>
       
    
    
  

  <div class="devsite-floating-action-buttons"></div></article>
~~~
