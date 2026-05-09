# Looker Studio Calculated Fields

- Source ID: `SRC-LOOKER-STUDIO-CALCULATED-FIELDS`
- URL: https://docs.cloud.google.com/data-studio/add-edit-and-troubleshoot-calculated-fields
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
      Add, edit, and troubleshoot calculated fields<devsite-actions hidden data-nosnippet><devsite-feature-tooltip
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

  
    
    
    


<p>This page guides you through the following processes:</p>

<ul>
<li><a href="#create-a-calculated-field-in-your-data-source">Create a calculated field in your data source</a></li>
<li><a href="#edit-a-calculated-field-in-your-data-source">Edit a calculated field in your data source</a></li>
<li><a href="#create-a-chart-specific-calculated-field">Create a chart-specific calculated field</a></li>
<li><a href="#edit-a-chart-specific-calculated-field">Edit a chart-specific calculated field</a></li>
<li><a href="#reuse-a-chart-specific-calculated-field">Reuse a chart-specific calculated field</a></li>
<li><a href="#troubleshoot-calculated-fields">Troubleshoot calculated fields</a></li>
<li><a href="#related-resources">Related resources</a></li>
</ul>

<p><a name="create-a-calculated-field-in-your-data-source"> </a></p>

<h2 id="create_a_calculated_field_in_your_data_source" data-text="Create a calculated field in your data source" tabindex="-1">Create a calculated field in your data source</h2>
<aside class="note"><strong>Note:</strong><span> You must have edit rights to the data source to create and edit calculated fields.</span></aside>
<p>Calculated fields in data sources are available in any report that uses that data source. To create a calculated field, follow these steps:</p>

<ol>
<li><a href="/data-studio/edit-a-data-source">Edit the data source</a>.</li>
<li>Click <img alt=""Create new" button" src="/static/data-studio/images/icaddcirclegoogblue2xweb48dp-2017-11-03.png" width="24"> <strong>ADD A FIELD</strong>.</li>
<li>Select <strong>Add calculated field.</strong></li>
<li>Enter a <strong>Name</strong> value for this field:
<ol>
<li>This is the default name that appears in your reports. You can change this for individual charts by editing the name in the dimension and metric picker.</li>
<li>The field name must be unique.</li>
<li>You can&#39;t use a reserved keyword as the field name.</li>
</ol></li>
<li><p>Enter a value for <strong>Formula</strong> :</p>

<ol>
<li>To select a dimension, metric, or function, start typing its name.
<ol>
<li>If you have multiple fields with similar names, or fields that duplicate part of a function name, for example, <strong>Date</strong> and <strong>Date2</strong>, type part of the name, and then scroll through the list and select the field that you want.</li>
<li>You can also click a field in the <strong>Available Fields</strong> list to add it to the formula editor.</li>
</ol></li>
<li>On the bottom right, click <strong>SAVE</strong> (or <strong>UPDATE</strong> if you are editing an existing field).</li>
<li>Adjust the <strong>Type</strong>, <strong>Aggregation</strong>, and <strong>Show As</strong> options, as appropriate.</li>
</ol>

<p>Alternatively, you can create a calculated field in your data source from a report by following these steps:</p></li>
<li><p>Create or <a href="/data-studio/edit-a-report">edit your report</a>.</p></li>
<li><p>Click <img alt src="/static/data-studio/images/icaddcirclegoogblue2xweb48dp-2017-11-03.png" width="24"> <strong>Add a field</strong>.</p></li>
<li><p>Select <strong>Add calculated field.</strong></p></li>
<li><p>Enter a <strong>Name</strong> value for this field:</p>

<ol>
<li>This is the default name that appears in your reports. You can change this for individual charts by editing the name in the dimension and metric picker.</li>
<li>The field name must be unique.</li>
<li>You can&#39;t use a reserved keyword as the field name.</li>
</ol></li>
<li><p>Enter a value for <strong>Formula</strong> :</p>

<ol>
<li>To select a dimension, metric, or function, start typing its name.
<ol>
<li>If you have multiple fields with similar names, or fields that duplicate part of a function name, for example, <strong>Date</strong> and <strong>Date2</strong>, type part of the name, and then scroll through the list and select the field that you want.</li>
<li>You can also click a field in the <strong>Available Fields</strong> list to add it to the formula editor.</li>
</ol></li>
<li>On the bottom right, click <strong>SAVE</strong> (or <strong>UPDATE</strong> if you are editing an existing field).</li>
<li>Adjust the <strong>Type</strong>, <strong>Aggregation</strong>, and <strong>Show As</strong> options, as appropriate.</li>
</ol></li>
</ol>

<blockquote>
<p>Learn more about <a href="/data-studio/about-calculated-fields">what you can do with calculated fields</a> and the difference between calculated fields that are <a href="https://support-con/looker-studio/answer/6299685#data-source-vs-chart-specific-calculated-fields">created in a data source versus chart-specific calculated fields</a>.</p>
</blockquote>

<p><a name="edit-a-calculated-field-in-your-data-source"> </a></p>

<h2 id="edit_a_calculated_field_in_your_data_source" data-text="Edit a calculated field in your data source" tabindex="-1">Edit a calculated field in your data source</h2>

<p>Calculated fields appear in the data source with an <strong>fx</strong> symbol. To edit the formula, click <strong>fx</strong> next to the field name. This opens the formula editor, where you can adjust the field as needed.</p>

<p><img alt="On the Edit Connection menu field list, a user selects the fx icon to open the formula editor for the calculated field called My Calculated Field." src="/static/data-studio/images/edit-calculated-field-2016-04-11.png" style="max-width:700px"></p>

<p><a name="create-a-chart-specific-calculated-field"> </a></p>

<h2 id="create_a_chart-specific_calculated_field" data-text="Create a chart-specific calculated field" tabindex="-1">Create a chart-specific calculated field</h2>

<p>Chart-specific calculated fields exist only in the chart in which you create them.</p>

<p>To create a chart-specific calculated field, follow these steps:</p>

<ol>
<li><p>Create or <a href="/data-studio/edit-a-report">edit your report</a>.</p></li>
<li><p><a href="/data-studio/add-charts-and-controls-to-your-report">Add a new chart</a> or select an existing chart.</p></li>
<li><p>In the <strong>Setup</strong> tab of the <strong>Properties</strong> panel, click <strong>+ Add dimension</strong> or <strong>+</strong> <strong>Add metric</strong>, depending on the kind of calculated field that you want to create.</p></li>
<li><p>Click <strong>+</strong> <strong>ADD FIELD</strong>.</p></li>
<li><p>Enter a field name.</p></li>
<li><p>Enter your formula.</p>

<blockquote>
<p>You can use the same operators and functions as data source calculated fields. However, you can&#39;t reference other chart-specific calculated fields. You can use chart-specific calculated fields with <a href="/data-studio/how-blends-work">blended data</a>.</p>
</blockquote></li>
<li><p>Click <strong>APPLY</strong>.</p></li>
<li><p>Adjust the <strong>Type</strong>, <strong>Aggregation</strong>, <a href="/data-studio/format-fields-in-reports"><strong>Display Format,</strong></a> and <strong>Show As</strong> options, as appropriate.</p></li>
</ol>
<aside class="special"><strong>Important:</strong><span> Custom value formatting is chart-specific and cannot be applied when creating or editing calculated fields in your data source. <a name="edit-a-chart-specific-calculated-field"> </a></span></aside>
<h2 id="edit_a_chart-specific_calculated_field" data-text="Edit a chart-specific calculated field" tabindex="-1">Edit a chart-specific calculated field</h2>

<p>Chart-specific calculated fields appear in the <strong>Setup</strong> tab of the chart&#39;s <strong>Properties</strong> panel.</p>

<p>When you hover your cursor over the field type next to the field name, an <strong>fx</strong> symbol will appear. To edit the formula, click <strong>fx.</strong> This brings up the formula editor, where you can adjust the field as needed.</p>

<p><a name="reuse-a-chart-specific-calculated-field"> </a></p>

<h2 id="reuse_a_chart-specific_calculated_field" data-text="Reuse a chart-specific calculated field" tabindex="-1">Reuse a chart-specific calculated field</h2>

<p>Chart-specific calculated fields only exist in the chart in which you create them. You can&#39;t directly reuse chart-specific calculated field, or reference it in other calculated fields.</p>

<p>However, you can copy a chart containing chart-specific calculated fields. The copy will contain any calculated fields defined in the original. You can then edit them as needed in the new chart.</p>

<p><a name="troubleshoot-calculated-fields"> </a></p>

<h2 id="troubleshoot_calculated_fields" data-text="Troubleshoot calculated fields" tabindex="-1">Troubleshoot calculated fields</h2>

<p>If there is an error in a calculated field formula, you&#39;ll see a warning message, and you won&#39;t be able to save the field. Here are a few reasons why a formula might be rejected:</p>

<table> <tbody>
 <tr>
 <th width="50%"> Error message or reason </th>
 <th> <strong> Possible Solutions </strong> </th>
 </tr>
 <tr>
 <td> <strong> Invalid field name. </strong> <p> A valid field name automatically appears as a green or blue chip in the formula editor. </p> </td>
 <td> Check the spelling and any special characters in the field name. </td>
 </tr>
 <tr>
 <td> <strong> Invalid function name. </strong> <p> A valid function automatically appears in uppercase green letters in the formula editor. </p> </td>
 <td> <a href="/data-studio/function-list"> Check the spelling </a> of the function name. </td>
 </tr>
 <tr>
 <td> <strong> Missing quotes. </strong> <p> Literal strings must be quoted with matched pairs of single or double quotes. </p> </td>
 <td> Make sure all string literals are properly quoted. </td>
 </tr>
 <tr>
 <td> <strong> Mismatched parentheses. </strong> <p> When nesting functions, a closing parentheses may have been missed. </p> </td>
 <td> Make sure that you have the same number of opening parentheses as closing parentheses, and that they are in the right spots. </td>
 </tr>
 <tr>
 <td> <strong> Function argument type mismatch. </strong> <p> Functions expect arguments to be of a particular type. If there's a mismatch, it can cause an error. For example, trying to use a Date function on a Text dimension will create a function argument type mismatch. </p> </td>
 <td> Choose the correct input values. You can possibly use <a href="/data-studio/cast"> CAST() </a> to change the input value type. </td>
 </tr>
 <tr>
 <td> <strong> Re-aggregating metrics is not supported. </strong> <p> Aggregation functions can't be applied to already aggregated data. This includes most metrics that are found in Google Analytics and Google Ads. For example, <em> <span class="notranslate"> Sessions </span> </em> is already aggregated as a sum in your data set, so the formula SUM( <em> <span class="notranslate"> Sessions </span> </em> ) will produce an error. </p> </td>
 <td> This limitation comes from the underlying data set. Any solution will involve changing how the data appears there, if possible. </td>
 </tr>
 <tr>
 <td> <strong> An expression can have either metrics or dimensions, but not both. </strong> <p> You can't mix dimensions and metrics in function arguments. </p> </td>
 <td> Make sure you are using the appropriate function for your data. For example, use <a href="/data-studio/concat"> CONCAT() </a> to append text to a Text field, instead of using +. </td>
 </tr>
 <tr>
 <td> <strong> Metric expressions and aggregations are not allowed in this expression. </strong> <p> You're creating a new chart-specific calculated dimension, but the result of the formula you've provided would create a metric. </p> </td>
 <td> Try creating the new field as a metric instead. </td>
 </tr>
 </tbody>
 </table>

<p><a name="related-resources"> </a></p>

<h2 id="related_resources" data-text="Related resources" tabindex="-1">Related resources</h2>

<ul>
<li><a href="/data-studio/model-your-data">Dimensions and metrics</a></li>
<li><a href="/data-studio/format-fields-in-reports">Format fields in reports</a></li>
<li><a href="/data-studio/add-data-to-a-report">Create a data source</a></li>
<li><a href="/data-studio/about-calculated-fields">About calculated fields</a></li>
<li><a href="/data-studio/create-a-custom-group">Create a custom group</a></li>
<li><a href="/data-studio/create-a-custom-bin">Create a custom bin</a></li>
</ul>

  

  
    <devsite-hats-survey class="nocontent" data-nosnippet
      hats-id="mwETRvWii0eU5NUYprb0Y9z5GVbc"
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
