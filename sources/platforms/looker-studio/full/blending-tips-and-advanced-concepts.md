# Looker Studio Blending Tips And Advanced Concepts

- Source ID: `SRC-LOOKER-STUDIO-BLENDS`
- URL: https://cloud.google.com/looker/docs/studio/blending-tips-and-advanced-concepts
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
      Blending tips and advanced concepts<devsite-actions hidden data-nosnippet><devsite-feature-tooltip
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

  
    
    
    


























<p>The information in this article provides advice and in-depth information about data blending to help you understand how blending works and to solve complex use cases. To get the most from this article, you should already be familiar with the basics of data blending, which are covered by the other articles in this topic.</p>

<p><a name="blends-subset"> </a></p>

<h2 id="blends_should_contain_only_a_subset_of_the_available_data" data-text="Blends should contain only a subset of the available data" tabindex="-1">Blends should contain only a subset of the available data</h2>

<p>As a best practice, you should only include the specific fields you&#39;ll want to visualize in charts that are based on a blend. Here&#39;s why this is important:</p>

<ul>
<li>Blending can create very large datasets, which can lead to slow performance and possibly higher query costs for paid services such as BigQuery.</li>
<li>Charts that are based on blends calculate all rows in the blend even if they are not used in the chart.
<ul>
<li>For example, say you create a blend containing 10 fields. You then define a chart that only uses 1 of those fields. Data Studio calculates the 10-field blend and then queries that 1 field in the output of the blend to create the chart.</li>
<li>Reaggregation only happens if your blend contains a subset of the underlying data.</li>
</ul></li>
</ul>

<p><a name="reaggregation"> </a></p>

<h2 id="use_blending_to_reaggregate_metrics" data-text="Use blending to reaggregate metrics" tabindex="-1">Use blending to reaggregate metrics</h2>

<p>Metrics that you include from the underlying data source become unaggregated numbers in a blend. When the blend includes less than the full set of fields from the underlying data source, these numbers are reaggregated based on the new data. Using blending in this way can be useful if you need to apply a different aggregation to an already aggregated field, such as calculating an average of averages.</p>

<p>See <a href="/data-studio/use-blending-to-reaggregate-data">Use blending to reaggregate data</a> for more information.</p>

<p><a name="self-blend"> </a></p>

<h2 id="create_blends_from_a_single_data_source" data-text="Create blends from a single data source" tabindex="-1">Create blends from a single data source</h2>

<p>Blends don&#39;t have to use different data sources. You may also find it useful to reaggregate data by blending multiple tables from the same data source.</p>

<p>For example, say you have a dataset that contains population data for the top three counties in the most populous US states, as shown in the following table:</p>

<table width="700"> <colgroup> </colgroup> <thead>
 <tr>
 <th scope="col"> <p> State </p> </th>
 <th scope="col"> <p> County </p> </th>
 <th scope="col"> <p> Population (2023 Estimate) </p> </th>
 </tr>
 </thead>
 <tbody>
 <tr>
 <td> <p> California </p> </td>
 <td> <p> Los Angeles County </p> </td>
 <td> <p class="align-right"> 10,014,009 </p> </td>
 </tr>
 <tr>
 <td> <p> California </p> </td>
 <td> <p> San Diego County </p> </td>
 <td> <p class="align-right"> 3,298,634 </p> </td>
 </tr>
 <tr>
 <td> <p> California </p> </td>
 <td> <p> Orange County </p> </td>
 <td> <p class="align-right"> 3,186,989 </p> </td>
 </tr>
 <tr>
 <td> <p> Texas </p> </td>
 <td> <p> Harris County </p> </td>
 <td> <p class="align-right"> 4,731,145 </p> </td>
 </tr>
 <tr>
 <td> <p> Texas </p> </td>
 <td> <p> Dallas County </p> </td>
 <td> <p class="align-right"> 2,613,539 </p> </td>
 </tr>
 <tr>
 <td> <p> Texas </p> </td>
 <td> <p> Tarrant County </p> </td>
 <td> <p class="align-right"> 2,110,640 </p> </td>
 </tr>
 <tr>
 <td> <p> New York </p> </td>
 <td> <p> Kings County (Brooklyn) </p> </td>
 <td> <p class="align-right"> 2,736,074 </p> </td>
 </tr>
 <tr>
 <td> <p> New York </p> </td>
 <td> <p> Queens County </p> </td>
 <td> <p class="align-right"> 2,405,464 </p> </td>
 </tr>
 <tr>
 <td> <p> New York </p> </td>
 <td> <p> Bronx County </p> </td>
 <td> <p class="align-right"> 1,418,890 </p> </td>
 </tr>
 </tbody>
 </table>

<p>You&#39;d like to calculate the percentage of population for each county in the state; but, to do that, you need to have the total population of each state as its own field. In the dataset, that metric isn&#39;t available -- but you can get it by blending your population data source with itself, by performing the following steps:</p>

<ol>
<li>Create a data source using your base dataset.</li>
<li>Add a chart that uses that data source to a report.</li>
<li>Create a blend with two tables. Each table will use the same data source that you created in step 1.
<ol>
<li>For Table 1, include the following fields:
<ol>
<li><strong>State</strong>, <strong>County</strong>, <strong>Population</strong>.</li>
<li>Rename <strong>Population</strong> to <strong>CountyPopulation</strong>.</li>
</ol></li>
<li>For Table 2, include only the <strong>Population</strong> field, and rename that field to <strong>StatePopulation</strong>.</li>
</ol></li>
<li>For the join condition, use a <strong>Left Outer</strong> join, linking <strong>State</strong> in Table 1 to <strong>State</strong> in Table 2.</li>
<li>Click <strong>Save</strong>.</li>
<li>Return to the report editor by clicking <strong>X</strong>.</li>
</ol>

<p><img alt src="/static/data-studio/images/self-blend-2024-08-14.png" style="max-width:700px"></p>

<p>Next, add a new chart (for example, a table) to your report and select the blend as the data source for the chart by performing these steps:</p>

<ol>
<li>Add the <strong>State</strong>, <strong>County</strong>, <strong>CountyPopulation</strong>, and <strong>StatePopulation</strong> fields to the chart.</li>
<li>To calculate the percentage of state population for each county, add a calculated field to the chart that uses your new reaggregated data:
<ol>
<li>In the properties panel, click <strong>Add metric</strong>, and then click <strong>Add field</strong>.</li>
<li>Name the field (for example) <strong>Percent of State Population</strong>.</li>
<li>In the <strong>Formula</strong> box, enter <code translate="no" dir="ltr">(CountyPopulation / StatePopulation)*100</code>.</li>
<li>(Optional) Set the <strong>Display Format</strong> to show the percentage values to a specific level (for example, <strong>Percent (2)</strong> for two decimal digits).</li>
</ol></li>
</ol>

<p><img alt src="/static/data-studio/images/percent-of-state-pop-calc-field-2024-08-14.png" style="max-width:700px"></p>

<p>When you&#39;re done, your table should look something like this:</p>

<table width="569"> <colgroup> <col width="100"></col> <col width="100"></col> <col width="100"></col> <col width="100"></col> <col width="169"></col> </colgroup> <thead>
 <tr>
 <th scope="col"> <p> State </p> </th>
 <th scope="col"> <p> County </p> </th>
 <th scope="col"> <p> CountyPopulation </p> </th>
 <th scope="col"> <p> StatePopulation </p> </th>
 <th scope="col"> <p> Percent of State Population </p> </th>
 </tr>
 </thead>
 <tbody>
 <tr>
 <td> <p> California </p> </td>
 <td> <p> Los Angeles County </p> </td>
 <td> <p class="align-right"> 10014009 </p> </td>
 <td> <p class="align-right"> 16499632 </p> </td>
 <td> <p class="align-right"> 60.69 </p> </td>
 </tr>
 <tr>
 <td> <p> Texas </p> </td>
 <td> <p> Harris County </p> </td>
 <td> <p class="align-right"> 4731145 </p> </td>
 <td> <p class="align-right"> 9455324 </p> </td>
 <td> <p class="align-right"> 50.04 </p> </td>
 </tr>
 <tr>
 <td> <p> California </p> </td>
 <td> <p> San Diego County </p> </td>
 <td> <p class="align-right"> 3298634 </p> </td>
 <td> <p class="align-right"> 16499632 </p> </td>
 <td> <p class="align-right"> 19.99 </p> </td>
 </tr>
 <tr>
 <td> <p> California </p> </td>
 <td> <p> Orange County </p> </td>
 <td> <p class="align-right"> 3186989 </p> </td>
 <td> <p class="align-right"> 16499632 </p> </td>
 <td> <p class="align-right"> 19.32 </p> </td>
 </tr>
 <tr>
 <td> <p> New York </p> </td>
 <td> <p> Kings County (Brooklyn) </p> </td>
 <td> <p class="align-right"> 2736074 </p> </td>
 <td> <p class="align-right"> 6560428 </p> </td>
 <td> <p class="align-right"> 41.71 </p> </td>
 </tr>
 <tr>
 <td> <p> Texas </p> </td>
 <td> <p> Dallas County </p> </td>
 <td> <p class="align-right"> 2613539 </p> </td>
 <td> <p class="align-right"> 9455324 </p> </td>
 <td> <p class="align-right"> 27.64 </p> </td>
 </tr>
 <tr>
 <td> <p> New York </p> </td>
 <td> <p> Queens County </p> </td>
 <td> <p class="align-right"> 2405464 </p> </td>
 <td> <p class="align-right"> 6560428 </p> </td>
 <td> <p class="align-right"> 36.67 </p> </td>
 </tr>
 <tr>
 <td> <p> Texas </p> </td>
 <td> <p> Tarrant County </p> </td>
 <td> <p class="align-right"> 2110640 </p> </td>
 <td> <p class="align-right"> 9455324 </p> </td>
 <td> <p class="align-right"> 22.32 </p> </td>
 </tr>
 <tr>
 <td> <p> New York </p> </td>
 <td> <p> Bronx County </p> </td>
 <td> <p class="align-right"> 1418890 </p> </td>
 <td> <p class="align-right"> 6560428 </p> </td>
 <td> <p class="align-right"> 21.63 </p> </td>
 </tr>
 </tbody>
 </table>

<p><a name="table-order"> </a></p>

<h2 id="table_order_in_the_blend" data-text="Table order in the blend" tabindex="-1">Table order in the blend</h2>

<p>Data Studio evaluates the join configurations in the blend in order, starting with the leftmost configuration. The results of each join are then applied to the next join to the right. For example, in a three-table blend, the join configuration between table 1 (leftmost) and table 2 (middle) is evaluated, and then those results are used by the join configuration between table 2 and table 3 (rightmost).</p>

<h3 id="table_order_in_automatically_created_blends" data-text="Table order in automatically created blends" tabindex="-1">Table order in automatically created blends</h3>

<p>When you blend a selection of charts, Data Studio creates a table for each chart and then adds the fields in the chart to the corresponding table. The order of the tables in the blend matches the order in which you select the charts: the first chart selected becomes the first (leftmost) table, the second chart selected becomes the second table, etc.</p>

<p>Data Studio also automatically creates a join configuration for each table and uses the left outer join type.</p>

<p>If the default configuration isn&#39;t what you want, or if there aren&#39;t clear linkages between the tables, you can edit the blend to suit your goals.</p>

<p><a name="tables-before-blend"> </a></p>

<h2 id="tables_are_created_before_the_blend" data-text="Tables are created before the blend" tabindex="-1">Tables are created before the blend</h2>

<p>The data for each table in a blend is queried before that data is joined into the final blend. Date ranges, filters, and calculated fields in a table are applied to the query that generates the table before any joins are performed. These factors can affect the data that is included in the blend tables and change the output of the blend.</p>

<p><a name="more-rows"> </a></p>

<h2 id="blends_may_contain_more_rows_than_the_original_data" data-text="Blends may contain more rows than the original data" tabindex="-1">Blends may contain more rows than the original data</h2>

<p>You might see more data in a blended chart than you&#39;ll see in charts that are based on the individual data sources that make up the blend. The result can depend on your data and on the join configuration chosen for the blend. For example, a left outer join includes all the records from the left hand table, as well as all the records from the tables to the right that share the same values across the join condition. Multiple matches for the join condition can result in more rows appearing in the blended data than exist in the leftmost data source.</p>
<aside class="special"><strong>Important:</strong><span> Cross joins will always return more rows than the sum of the rows in the individual data sources, which can generate a &quot;too much data requested&quot; error in your chart. <a name="date-ranges-filters"> </a></span></aside>
<h2 id="blends_and_explicit_date_ranges_and_filters" data-text="Blends and explicit date ranges and filters" tabindex="-1">Blends and explicit date ranges and filters</h2>

<p>Two ways to limit the number of rows in your blends are by using a date range or applying a filter. You can limit the rows either on charts that are based on a blend or on the tables that make up the blend. It&#39;s helpful to think about the process as being either &quot;pre-blend&quot; or &quot;post-blend.&quot;</p>

<p>When you apply a date range or filter to a table in the blend, it takes effect before the data is joined with the other tables in the blend. Rows that are outside the date range or that are excluded by the filter aren&#39;t available for the join query to work on.</p>

<p>When you apply a date range or filter to a chart based on a blend, you&#39;re applying it to the data after the blend has been created (&quot;post-blend&quot;).</p>

<p>This difference could have a big impact on the results that you see in your charts, depending on your data and how you&#39;ve configured the blend.</p>

<p><a name="inherited-filters"> </a></p>

<h2 id="blends_and_inherited_filters" data-text="Blends and inherited filters" tabindex="-1">Blends and inherited filters</h2>

<p>Blends inherit report, page, or group level filters as long as the filter is compatible with the pre-blend or post-blend data. If the filter is compatible with the underlying data source(s) that the blend uses, then the filter acts on the pre-blended data. Otherwise, the filter acts on the post-blended data. If the filter isn&#39;t compatible with either the pre-blend or post-blend data, the filter is ignored.</p>

<p>Learn more about <a href="/data-studio/about-filter-properties">filter inheritance</a>.</p>

<p>When a chart that is based on a blend is subject to an inherited filter, Data Studio processes the data in five steps:</p>

<p><strong>(Pre-blend)</strong>:</p>

<ul>
<li><strong>Step 1:</strong> The data is grouped and aggregated based on the dimensions that are specified in the <strong>Blend Data</strong> panel.</li>
<li><strong>Step 2:</strong> Inherited dimension filters and compatible metric filters are applied to the data sources that are included in the <strong>Blend Data</strong> panel.</li>
</ul>

<p><strong>(Blend)</strong>:</p>

<ul>
<li><strong>Step 3:</strong> The data is blended using the specified join configuration.</li>
</ul>

<p><strong>(Post-blend)</strong>:</p>

<ul>
<li><strong>Step 4:</strong> The data is grouped and aggregated based on the dimensions in the chart.</li>
<li><strong>Step 5:</strong> Metric filters, if compatible with blended data, are applied to the chart.</li>
</ul>

<p><a name="related-resources"> </a></p>

<h2 id="related_resources" data-text="Related resources" tabindex="-1">Related resources</h2>

<ul>
<li><a href="/data-studio/troubleshooting-guide">Troubleshoot blending issues</a></li>
<li><a href="/data-studio/aggregation">Aggregation</a></li>
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
