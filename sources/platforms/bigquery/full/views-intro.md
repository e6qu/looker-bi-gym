# BigQuery Introduction To Logical Views

- Source ID: `SRC-BIGQUERY-VIEWS-INTRO`
- URL: https://cloud.google.com/bigquery/docs/views-intro
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
    
    
    
      
        
  <a href="https://docs.cloud.google.com/bigquery/docs/introduction"
      
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
  <devsite-actions hidden data-nosnippet><devsite-feature-tooltip
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
  
    
  

  <devsite-toc class="devsite-nav"
    depth="2"
    devsite-toc-embedded
    >
  </devsite-toc>
  
    
  <div class="devsite-article-body clearfix
  devsite-no-page-title">

  
    
    
    
    <h1 id="introduction-to-logical-views" data-text="Introduction to logical views" tabindex="-1">Introduction to logical views</h1>
    

<p>This document provides an overview of BigQuery support for logical
views. A view is a virtual table defined by a SQL query. The default type of view for
BigQuery is a <em>logical view</em>. Query results contain only the data from the tables and fields specified in the query that defines the view.</p>

<p>The query that defines a view is run each time the view is queried.</p>

<p>Common use cases for views include the following:</p>

<ul>
<li>Provide a reusable name for a complex query or a limited set of data that you
can then <a href="/bigquery/docs/authorized-views">authorize</a> other users to access.
After you create a view, a user can then
<a href="/bigquery/docs/running-queries">query</a> the view as they would a table.</li>
<li>Abstract and store calculation and join logic in a common object
to simplify query use.</li>
<li>Provide access to a subset of data and calculation logic without providing
access to the base tables.</li>
<li>Optimize queries with high computation cost and small dataset results for
<a href="/bigquery/docs/materialized-views-intro#use_cases">several use cases</a>.</li>
</ul>

<p>You can also use views in other contexts:</p>

<ul>
<li>As a data source for a visualization tool such as
<a href="/looker/docs">Data Studio</a>.</li>
<li>As a means of sharing data to subscribers of
<a href="/bigquery/docs/analytics-hub-introduction">BigQuery sharing (formerly Analytics
Hub)</a>.</li>
</ul>

<p>For a comparison of logical, materialized views, and authorized views, see
<a href="/bigquery/docs/logical-materialized-view-overview">Overview of logical and materialized views</a>.</p>

<h2 id="view_limitations" data-text="Logical views limitations" tabindex="-1">Logical views limitations</h2>

<p>BigQuery views are subject to the following limitations:</p>

<ul>
<li>Views are read-only. For example, you can&#39;t run queries that insert, update,
or delete data.</li>
<li>If your view references tables from remote <a href="/bigquery/docs/locations">locations</a>,
you must enable <a href="/bigquery/docs/global-queries">global queries</a>
before you create the view.</li>
<li>A reference inside of a view must be qualified with a dataset. The default
dataset doesn&#39;t affect a view body.</li>
<li>You cannot use the <code translate="no" dir="ltr">TableDataList</code> JSON API method to retrieve data from a
view. For more information, see
<a href="/bigquery/docs/reference/rest/v2/tabledata/list">Tabledata: list</a>.</li>
<li>You cannot mix GoogleSQL and legacy SQL queries when using views.
A GoogleSQL query cannot reference a view defined using
legacy SQL syntax.</li>
<li>You cannot reference
<a href="/bigquery/docs/parameterized-queries">query parameters</a> in views.</li>
<li>The schemas of the underlying tables are stored with the view when the view
is created. If columns are added, deleted, or modified after the view is
created, the view isn&#39;t automatically updated and the reported schema
will remain inaccurate until the view SQL definition is changed or the view
is recreated. Even though the reported schema may be inaccurate, all
submitted queries produce accurate results.</li>
<li>You cannot automatically update a legacy SQL view to GoogleSQL
syntax. To modify the query used to define a view, you can use the
following:
<ul>
<li>The <a href="/bigquery/docs/updating-views#update-sql"><strong>Edit query</strong></a> option in the Google Cloud console</li>
<li>The <a href="/bigquery/docs/reference/bq-cli-reference#bq_update"><code translate="no" dir="ltr">bq update --view</code></a> command in the bq command-line tool</li>
<li>The <a href="/bigquery/docs/reference/libraries">BigQuery Client libraries</a></li>
<li>The <a href="/bigquery/docs/reference/rest/v2/tables/update">update</a> or
 <a href="/bigquery/docs/reference/rest/v2/tables/patch">patch</a> API methods.</li>
</ul></li>
<li>You cannot include a temporary user-defined function or a temporary table
in the SQL query that defines a view.</li>
<li>You cannot reference a view in a <a href="/bigquery/docs/querying-wildcard-tables">wildcard table</a>
query.</li>
<li>Logical views cannot inherit or explicitly define
<a href="/bigquery/docs/reference/standard-sql/data-types#parameterized_data_types">parameterized data types</a>,
such as <code translate="no" dir="ltr">STRING(n)</code>, as parameterized data types are only supported for base
table columns and script variables.</li>
</ul>

<h2 id="view_quotas" data-text="Logical views quotas" tabindex="-1">Logical views quotas</h2>

<p>For information on quotas and limits that apply to views, see <a href="/bigquery/quotas#view_limits">View
limits</a>. SQL queries used to define views are also
subject to the quotas on <a href="/bigquery/quotas#query_jobs">query jobs</a>.</p>

<h2 id="view_pricing" data-text="Logical views pricing" tabindex="-1">Logical views pricing</h2>

<p>BigQuery uses logical views by default, not
<a href="/bigquery/docs/materialized-views-intro">materialized views</a>.
Because views are not materialized by default, the query that defines the view
is run each time the view is queried. Queries are billed according to the total
amount of data in all table fields referenced directly or indirectly by the top-level
query.</p>

<ul>
<li>For general query pricing, see <a href="https://cloud.google.com/bigquery/pricing#on_demand_pricing">On-demand compute pricing</a>.</li>
<li>For pricing associated with materialized views, see
<a href="/bigquery/docs/materialized-views-intro#materialized_views_pricing">Materialized views pricing</a>.</li>
</ul>

<h2 id="view_security" data-text="Logical views security" tabindex="-1">Logical views security</h2>

<p>To control access to views in BigQuery, see
<a href="/bigquery/docs/authorized-views">Authorized views</a>.</p>

<h2 id="whats_next" data-text="What's next" tabindex="-1">What's next</h2>

<ul>
<li>For information on creating views, see <a href="/bigquery/docs/views">Creating views</a>.</li>
<li>For information on creating an authorized view, see
<a href="/bigquery/docs/authorized-views">Creating authorized views</a>.</li>
<li>For information on getting view metadata, see
<a href="/bigquery/docs/view-metadata">Getting information about views</a>.</li>
<li>For more information on managing views, see
<a href="/bigquery/docs/managing-views">Managing views</a>.</li>
</ul>


  
  

  
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
