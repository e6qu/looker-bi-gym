# Looker Studio Aggregation Article

- Source ID: `SRC-LOOKER-STUDIO-AGGREGATION-ARTICLE`
- URL: https://docs.cloud.google.com/looker/docs/studio/aggregation-article
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
      Aggregation<devsite-actions hidden data-nosnippet><devsite-feature-tooltip
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

  
    
    
    


























<p>Aggregation is the process of <strong>reducing</strong> and <strong>summarizing</strong> tabular data. For example, consider the list of numbers following:</p>

<blockquote>
<p>100, 200, 300, 400, 500</p>
</blockquote>

<p>Using this example, you can state the following facts that illustrate the concept of aggregation:</p>

<table> <tbody>
 <tr>
 <th> Fact </th>
 <th> Aggregation </th>
 </tr>
 <tr>
 <td> There are 5 numbers. </td>
 <td> Count </td>
 </tr>
 <tr>
 <td> The smallest number is 100 </td>
 <td> Minimum </td>
 </tr>
 <tr>
 <td> The largest number is 500 </td>
 <td> Maximum </td>
 </tr>
 <tr>
 <td> The average of the numbers is 300 <strong> </strong> </td>
 <td> Average </td>
 </tr>
 <tr>
 <td> The sum of the numbers is 1500 </td>
 <td> Sum </td>
 </tr>
 </tbody>
 </table>

<p>There are other ways you can aggregate data, including calculating the median, count distinct, quartiles, percentiles, etc.</p>

<p><a name="bringing-in-dimensions"> </a></p>

<h2 id="dimensions_and_aggregation" data-text="Dimensions and aggregation" tabindex="-1">Dimensions and aggregation</h2>

<p>The previous example is based on a single set of numbers, but that&#39;s almost never what you see in the real world. In the real world, your data is typically organized into dimensions and metrics. Dimensions provide a way to categorize and group your data, while metrics measure that data.</p>

<p>In Data Studio, aggregation <strong>always</strong> takes place in the context of a set of dimensions. That set of dimensions can be:</p>

<ul>
<li>Every dimension, which lets you see the raw data.</li>
<li>A subset of your dimensions, which lets you see data broken down (grouped) by the dimensions you select.</li>
<li>The empty set, which lets you see a summary of the entire dataset.</li>
</ul>

<p>For example, here are the same five numbers presented as daily stock prices. <em>Date</em> and <em>Ticker</em> are dimensions, <em>Price</em> is a metric.</p>

<table> <tbody>
 <tr>
 <td> <strong> Date </strong> </td>
 <td> <strong> Ticker </strong> </td>
 <td> <strong> Price </strong> </td>
 </tr>
 <tr>
 <td> January 1 </td>
 <td> GOOG </td>
 <td> 100 </td>
 </tr>
 <tr>
 <td> January 1 </td>
 <td> AAPL </td>
 <td> 200 </td>
 </tr>
 <tr>
 <td> January 2 </td>
 <td> GOOG </td>
 <td> 300 </td>
 </tr>
 <tr>
 <td> January 2 </td>
 <td> AAPL </td>
 <td> 400 </td>
 </tr>
 <tr>
 <td> January 3 </td>
 <td> GOOG </td>
 <td> 500 </td>
 </tr>
 </tbody>
 </table>

<p>You can now use the dimensions to group the data in different ways. For example:</p>

<p><strong>By Ticker</strong></p>

<table> <tbody>
 <tr>
 <td> <strong> Ticker </strong> </td>
 <td> <strong> Price </strong> </td>
 </tr>
 <tr>
 <td> GOOG </td>
 <td> ? </td>
 </tr>
 <tr>
 <td> AAPL </td>
 <td> ? </td>
 </tr>
 </tbody>
 </table>

<p><strong>By Date</strong></p>

<table> <tbody>
 <tr>
 <td> <strong> Date </strong> </td>
 <td> <strong> Price </strong> </td>
 </tr>
 <tr>
 <td> January 1 </td>
 <td> ? </td>
 </tr>
 <tr>
 <td> January 2 </td>
 <td> ? </td>
 </tr>
 <tr>
 <td> January 3 </td>
 <td> ? </td>
 </tr>
 </tbody>
 </table>

<p>In these examples, the metric values depend on what you want to know about the data. For example, to calculate the average price for each company, apply the Average aggregation in conjunction with the <em>Ticker</em> dimension:</p>

<table> <tbody>
 <tr>
 <td> <strong> Ticker </strong> </td>
 <td> <strong> Average of Price </strong> </td>
 </tr>
 <tr>
 <td> GOOG </td>
 <td> (100 + 300 + 500) / 3 = 300 </td>
 </tr>
 <tr>
 <td> AAPL </td>
 <td> (200 + 400) / 2 = 300 </td>
 </tr>
 </tbody>
 </table>

<p>To see how many companies had stock information on a given day, you would use the <em>Date</em> dimension and the Count aggregation:</p>

<table> <tbody>
 <tr>
 <td> <strong> Date </strong> </td>
 <td> <strong> Count of Price </strong> </td>
 </tr>
 <tr>
 <td> January 1 </td>
 <td> 2 </td>
 </tr>
 <tr>
 <td> January 2 </td>
 <td> 2 </td>
 </tr>
 <tr>
 <td> January 3 </td>
 <td> 1 </td>
 </tr>
 </tbody>
 </table>

<p>Now, consider what happens when you use both the <em>Date</em> and <em>Ticker</em> dimensions in the stock table:</p>

<table> <tbody>
 <tr>
 <td> <strong> Date </strong> </td>
 <td> <strong> Ticker </strong> </td>
 <td> <strong> AVG(Price) </strong> </td>
 <td> <strong> SUM(Price) </strong> </td>
 </tr>
 <tr>
 <td> January 1 </td>
 <td> GOOG </td>
 <td> 100 </td>
 <td> 100 </td>
 </tr>
 <tr>
 <td> January 1 </td>
 <td> AAPL </td>
 <td> 200 </td>
 <td> 200 </td>
 </tr>
 <tr>
 <td> January 2 </td>
 <td> GOOG </td>
 <td> 300 </td>
 <td> 300 </td>
 </tr>
 <tr>
 <td> January 2 </td>
 <td> AAPL </td>
 <td> 400 </td>
 <td> 400 </td>
 </tr>
 <tr>
 <td> January 3 </td>
 <td> GOOG </td>
 <td> 500 </td>
 <td> 500 </td>
 </tr>
 </tbody>
 </table>

<p>When you create a group that includes all the available dimensions, the result is identical to the original data. <strong>This is still an aggregation,</strong> just not an interesting one, since every aggregation gives the same result. In Data Studio, if you make a table and show every dimension, you&#39;re still able to set the aggregation type but it won&#39;t do anything.</p>

<p><a name="aggregation-in-data-studio"> </a></p>

<h2 id="aggregation_in" data-text="Aggregation in Data Studio" tabindex="-1">Aggregation in Data Studio</h2>

<p>There are several ways to apply an aggregation method to your data in Data Studio:</p>

<p><strong>In the data source.</strong> A field&#39;s default aggregation determines how that metric is displayed in charts. See <a href="#default-aggregation">Default aggregation</a> for more information.</p>

<p><strong>In a chart</strong>. Report editors can override the default aggregation and apply a different one to the metric on a chart by chart basis. Learn how to <a href="/data-studio/edit-fields-in-your-reports">add and edit data in charts</a>.</p>

<p><strong>In a calculated field</strong>. You can use specific aggregation functions within a calculated field formula to produce aggregated metrics. <a href="/data-studio/function-list">See the list of functions</a>.</p>

<p><a name="default-aggregation"> </a></p>

<h3 id="default_aggregation" data-text="Default aggregation" tabindex="-1">Default aggregation</h3>

<p>You can apply the following default aggregations to fields in data sources.</p>

<table> <thead>
 <tr>
 <th scope="col" width="25%"> Aggregation Method </th>
 <th scope="col" xwidth="25%"> Abbreviation </th>
 <th scope="col"> Description </th>
 </tr>
 </thead>
 <tbody>
 <tr>
 <td> Sum </td>
 <td> SUM </td>
 <td> The field values are added together. </td>
 </tr>
 <tr>
 <td> Average </td>
 <td> AVG </td>
 <td> The field values are averaged. </td>
 </tr>
 <tr>
 <td> Count </td>
 <td> CT </td>
 <td> Each field value is counted. </td>
 </tr>
 <tr>
 <td> Count Distinct </td>
 <td> CTD </td>
 <td> Only unique field values are counted. </td>
 </tr>
 <tr>
 <td> Min </td>
 <td> MIN </td>
 <td> The field displays the minimum value. </td>
 </tr>
 <tr>
 <td> Max </td>
 <td> MAX </td>
 <td> The field displays the maximum value. </td>
 </tr>
 <tr>
 <td> Auto </td>
 <td> AUT </td>
 <td> You can't apply this method directly. The aggregation method is supplied by the underlying data set, or as the result of a calculated field. <p> You can't change the Auto aggregation method. </p> </td>
 </tr>
 <tr>
 <td> None </td>
 <td> </td>
 <td> <p> No aggregation is applied. The field is treated as a dimension, even if it contains numeric data. </p>
 <aside class="note">
  <b>Note</b> This method only appears in the data source. The default aggregation for metrics in reports is Sum.
</aside>
</td>
 </tr>
 </tbody>
 </table>

<p><a name="change-the-aggregation-method"> </a></p>

<h4 id="change_the_aggregation_method" data-text="Change the aggregation method" tabindex="-1"><strong>Change the aggregation method</strong></h4>

<p>To change the field&#39;s aggregation method, edit the data source, then use the <strong>Default aggregation</strong> drop-down menu..</p>

<p><a name="auto-aggregation"> </a></p>

<h3 id="auto_aggregation" data-text="Auto aggregation" tabindex="-1">Auto aggregation</h3>

<p>Some data sources, such as Google Analytics and Google Ads, show Auto as the only available aggregation type for metrics. These data sets are already aggregated, reducing a potentially massive list of numbers to single values. The aggregations used can be simple, like sum or count, or more complex, like percentile. You can&#39;t change Auto aggregated metrics to a different aggregation type, since doing so would require Data Studio to have access to the raw, unaggregated data.</p>

<p>You&#39;ll also see Auto aggregation applied to calculated fields based on other data sources, such as Sheets. In this case, the aggregation is a direct result of using an aggregation function in the formula, such as <code translate="no" dir="ltr">AVG(Price)</code>. Again, you can&#39;t change the Auto aggregation here, because that would conflict with the output of the AVG function.</p>

  

  
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
