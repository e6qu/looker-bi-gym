# BigQuery Create Logical Views

- Source ID: `SRC-BIGQUERY-VIEWS`
- URL: https://cloud.google.com/bigquery/docs/views
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

  
    
    
    
    <h1 id="create-logical-views" data-text="Create logical views" tabindex="-1">Create logical views</h1>
    

<p>This document describes how to create logical views in BigQuery.</p>

<p>You can create a logical view in the following ways:</p>

<ul>
<li>Using the Google Cloud console.</li>
<li>Using the bq command-line tool&#39;s <code translate="no" dir="ltr">bq mk</code> command.</li>
<li>Calling the <a href="/bigquery/docs/reference/v2/tables/insert"><code translate="no" dir="ltr">tables.insert</code></a>
API method.</li>
<li>Using the client libraries.</li>
<li>Submitting a <a href="/bigquery/docs/data-definition-language#create_view_statement"><code translate="no" dir="ltr">CREATE VIEW</code></a>
data definition language (DDL) statement.</li>
</ul>

<h2 id="view_limitations" data-text="View limitations" tabindex="-1">View limitations</h2>

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

<p>For information about quotas and limits that apply to views, see <a href="/bigquery/quotas#view_limits">View limits</a>.</p>

<h2 id="before_you_begin" data-text="Before you begin" tabindex="-1">Before you begin</h2>

<p>Grant Identity and Access Management (IAM) roles that give users the necessary permissions to perform each task in this document.</p>

<h3 id="required_permissions" data-text="Required permissions" tabindex="-1">Required permissions</h3>

<p>Views are treated as table resources in BigQuery, so creating a
view requires the same permissions as creating a table. You must also have
permissions to query any tables that are referenced by the view&#39;s SQL query.</p>

<p>To create a view, you need the <code translate="no" dir="ltr">bigquery.tables.create</code> IAM
permission. The <code translate="no" dir="ltr">roles/bigquery.dataEditor</code> predefined IAM role
includes the permissions that you need to create a view.</p>

<p>Additionally, if you have the <code translate="no" dir="ltr">bigquery.datasets.create</code> permission, you can
create views in the datasets that you create. To create a view for data that you
don&#39;t own, you must have <code translate="no" dir="ltr">bigquery.tables.getData</code> permission for that table.</p>

<p>For more information on IAM roles and permissions in
BigQuery, see <a href="/bigquery/docs/access-control">Predefined roles and
permissions</a>.</p>
<aside class="note"><strong>Note:</strong><span> To create or update an <a href="/bigquery/docs/authorized-views">authorized view</a>
or a view in an <a href="/bigquery/docs/authorized-datasets#create_or_update_view">authorized dataset</a>,
you need additional permissions. For more information, see
<a href="/bigquery/docs/authorized-views#required_permissions">required permissions for authorized views</a>
and
<a href="/bigquery/docs/authorized-datasets#permissions_datasets">required permissions for views in authorized datasets</a>.</span></aside>
<h2 id="view_naming" data-text="View naming" tabindex="-1">View naming</h2>



<p>When you create a view in BigQuery, the view name must
be unique per dataset. The view name can:</p>

<ul>
<li>Contain characters with a total of up to 1,024 UTF-8 bytes.</li>
<li>Contain Unicode characters in category L (letter), M (mark), N (number),
Pc (connector, including underscore), Pd (dash), Zs (space). For more
information, see
<a href="https://wikipedia.org/wiki/Unicode_character_property#General_Category" class="external">General Category</a>.</li>
</ul>

<p>The following are all examples of valid view names:
<code translate="no" dir="ltr">view 01</code>, <code translate="no" dir="ltr">ग्राहक</code>, <code translate="no" dir="ltr">00_お客様</code>, <code translate="no" dir="ltr">étudiant-01</code>.</p>

<p>Caveats:</p>

<ul>
<li>Table names are case-sensitive by default. <code translate="no" dir="ltr">mytable</code> and <code translate="no" dir="ltr">MyTable</code> can
coexist in the same dataset, unless they are part of a <a href="/bigquery/docs/reference/standard-sql/data-definition-language#creating_a_case-insensitive_dataset">dataset with
case-sensitivity turned off</a>.</li>
<li>Some view names and view name prefixes are reserved. If
you receive an error saying that your view name or prefix is
reserved, then select a different name and try again.</li>
<li><p>If you include multiple dot operators (<code translate="no" dir="ltr">.</code>) in a sequence, the duplicate
operators are implicitly stripped.</p>

<p>For example, this:
<code translate="no" dir="ltr">project_name....dataset_name..table_name</code></p>

<p>Becomes this:
<code translate="no" dir="ltr">project_name.dataset_name.table_name</code></p></li>
</ul>

<h2 id="creating_a_view" data-text="Create a view" tabindex="-1">Create a view</h2>



<p>You can create a view by composing a SQL query that is used to define the data
accessible to the view. The SQL query must consist of a <code translate="no" dir="ltr">SELECT</code> statement.
Other statement types (such as DML statements) and
<a href="/bigquery/docs/multi-statement-queries">multi-statement queries</a> aren&#39;t allowed
in view queries, with the exception of the <code translate="no" dir="ltr">@@session_id</code>
<a href="/bigquery/docs/reference/system-variables">system variable</a>.</p>

<p>To create a view:</p>
<div class="ds-selector-tabs" data-ds-scope="code-sample">
<section><h3 id="console" data-text=" Console " tabindex="-1"> Console </h3><ol>
<li><p>In the Google Cloud console, go to the <strong>BigQuery</strong> page.</p>

<p><a href="https://console.cloud.google.com/bigquery" target="console" class="button button-primary">Go to BigQuery</a> </p></li>
<li><p>Click <span class="material-icons" aria-hidden="true" translate="no">add_box</span> <strong>SQL query</strong>.</p></li>
<li><p>In the query editor, enter a valid SQL query.</p>

<p>Alternatively, you can <a href="/bigquery/docs/work-with-saved-queries#open_a_saved_query_version_as_a_new_query">open a saved query</a>.</p></li>
<li><p>Click <img alt src="/static/bigquery/images/save-bigquery-console.png" class="inline-icon">
<strong>Save <span aria-label="and then">></span> Save view</strong>.</p>

<p><img src="/static/bigquery/images/save-view-button.png" alt="Save view." title="Save view button in
Cloud console" class="screenshot"> </p></li>
<li><p>In the <strong>Save view</strong> dialog:</p>

<ul>
<li>In the <strong>Project</strong> menu, select a project to store the view.</li>
<li>In the <strong>Dataset</strong> menu, select a dataset or create a new dataset to
store the view. The destination dataset for a saved view must be in
the same <a href="/bigquery/docs/dataset-locations">region</a> as the source.</li>
<li>In the <strong>Table</strong> field, enter the name of the view.</li>
<li>Click <strong>Save</strong>.</li>
</ul></li>
</ol>
<aside class="note"><strong>Note:</strong><span> When you create a view using Google Cloud console, you cannot add a
label, description, or expiration time. You can add these optional
properties when you create a view using the API or bq command-line tool. After you
create a view using the Google Cloud console, you can add an expiration,
description, and labels. For more information, see
<a href="/bigquery/docs/updating-views">Updating views</a>.</span></aside></section>
<section><h3 id="sql" data-text=" SQL " tabindex="-1"> SQL </h3><p>Use the
<a href="/bigquery/docs/reference/standard-sql/data-definition-language#create_view_statement"><code translate="no" dir="ltr">CREATE VIEW</code> statement</a>.
The following
example creates a view named <code translate="no" dir="ltr">usa_male_names</code> from the USA names
public dataset:</p>

<p></p>

<ol>
<li><p>In the Google Cloud console, go to the <strong>BigQuery</strong> page.</p>

<p><a href="https://console.cloud.google.com/bigquery" target="console" class="button button-primary">Go to BigQuery</a> </p></li>
<li><p>In the query editor, enter the following statement:</p>

<div></div><devsite-code><pre class="devsite-click-to-copy notranslate" dir="ltr" is-upgraded syntax="GoogleSQL"><span class="devsite-syntax-k">CREATE</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">VIEW</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">mydataset</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">usa_male_names</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-k">name</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">number</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">SELECT</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">name</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-n">number</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">FROM</span>
<span class="devsite-syntax-w">    </span>&#96;<span class="devsite-syntax-n">bigquery</span><span class="devsite-syntax-o">-</span><span class="devsite-syntax-k">public</span><span class="devsite-syntax-o">-</span><span class="devsite-syntax-k">data</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">usa_names</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">usa_1910_current</span>&#96;
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">WHERE</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-n">gender</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'M'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-n">number</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">DESC</span>
<span class="devsite-syntax-p">);</span></pre></devsite-code>

<p></p></li>
<li><p>Click <span class="material-icons" aria-hidden="true" translate="no">play_circle</span> <strong>Run</strong>.</p>

<p></p></li>
</ol>

<p>For more information about how to run queries, see <a href="/bigquery/docs/running-queries#queries">Run an interactive query</a>.</p></section>
<section><h3 id="bq" data-text=" bq " tabindex="-1"> bq </h3><p>Use the <a href="/bigquery/docs/reference/bq-cli-reference#bq_mk"><code translate="no" dir="ltr">bq mk</code> command</a>
with the <code translate="no" dir="ltr">--view</code> flag. For GoogleSQL queries,
add the <code translate="no" dir="ltr">--use_legacy_sql</code> flag and set it to <code translate="no" dir="ltr">false</code>. Some optional
parameters include <code translate="no" dir="ltr">--add_tags</code>, <code translate="no" dir="ltr">--expiration</code>, <code translate="no" dir="ltr">--description</code>, and
<code translate="no" dir="ltr">--label</code>. For a full list of parameters, see the
<a href="/bigquery/docs/reference/bq-cli-reference#bq_mk"><code translate="no" dir="ltr">bq mk</code> command</a>
reference.</p>

<p>If your query references external user-defined function (UDF) resources
stored in Cloud Storage or in local files, use the
<code translate="no" dir="ltr">--view_udf_resource</code> flag to specify those resources. The
<code translate="no" dir="ltr">--view_udf_resource</code> flag is not demonstrated here. For more information about
using UDFs, see
<a href="/bigquery/docs/user-defined-functions">UDFs</a>.</p>

<p>If you are creating a view in a project other than your default project,
specify the project ID using the <code translate="no" dir="ltr">--project_id</code> flag.</p>
<aside class="note"><strong>Note:</strong><span> The dataset that contains your view and the dataset that contains the
tables referenced by the view must be in the same <a href="/bigquery/docs/dataset-locations">location</a>.</span></aside>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="Bash">bq<span class="devsite-syntax-w"> </span>mk<span class="devsite-syntax-w"> </span><span class="devsite-syntax-se">\</span>
--use_legacy_sql<span class="devsite-syntax-o">=</span><span class="devsite-syntax-nb">false</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-se">\</span>
--view_udf_resource<span class="devsite-syntax-o">=</span><var translate="no">PATH_TO_FILE</var><span class="devsite-syntax-w"> </span><span class="devsite-syntax-se">\</span>
--expiration<span class="devsite-syntax-o">=</span><var translate="no">INTEGER</var><span class="devsite-syntax-w"> </span><span class="devsite-syntax-se">\</span>
--description<span class="devsite-syntax-o">=</span><span class="devsite-syntax-s2">"<var translate="no">DESCRIPTION</var>"</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-se">\</span>
--label<span class="devsite-syntax-o">=</span><var translate="no">KEY_1:VALUE_1</var><span class="devsite-syntax-w"> </span><span class="devsite-syntax-se">\</span>
--add_tags<span class="devsite-syntax-o">=</span><var translate="no">KEY_2:VALUE_2</var><span class="devsite-syntax-o">[</span>,...<span class="devsite-syntax-o">]</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-se">\</span>
--view<span class="devsite-syntax-o">=</span><span class="devsite-syntax-s1">'<var translate="no">QUERY</var>'</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-se">\</span>
--project_id<span class="devsite-syntax-o">=</span><var translate="no">PROJECT_ID</var><span class="devsite-syntax-w"> </span><span class="devsite-syntax-se">\</span>
<var translate="no">DATASET</var>.<var translate="no">VIEW</var></pre></devsite-code>

<p>Replace the following:</p>

<ul>
<li><code translate="no" dir="ltr"><var translate="no">PATH_TO_FILE</var></code> is the URI or local file system path
to a code file to be loaded and evaluated immediately as a UDF resource
used by the view. Repeat the flag to specify multiple files.</li>
<li><code translate="no" dir="ltr"><var translate="no">INTEGER</var></code> sets the lifetime (in seconds) for
the view. If <code translate="no" dir="ltr"><var translate="no">INTEGER</var></code> is <code translate="no" dir="ltr">0</code>, the view doesn&#39;t
expire. If you don&#39;t include the <code translate="no" dir="ltr">--expiration</code> flag, BigQuery
creates the view with the dataset&#39;s default table lifetime.</li>
<li><code translate="no" dir="ltr"><var translate="no">DESCRIPTION</var></code> is a description of the view in quotes.</li>
<li><code translate="no" dir="ltr"><var translate="no">KEY_1:VALUE_1</var></code> is the key-value pair that
represents a
<a href="/bigquery/docs/labels">label</a>.
Repeat the <code translate="no" dir="ltr">--label</code> flag to specify multiple labels.</li>
<li><code translate="no" dir="ltr"><var translate="no">KEY_2:VALUE_2</var></code> is the key-value pair that
represents a
<a href="/bigquery/docs/labels">tag</a>.
Add multiple tags under the same flag with commas between key:value pairs.</li>
<li><code translate="no" dir="ltr"><var translate="no">QUERY</var></code> is a valid query.</li>
<li><code translate="no" dir="ltr"><var translate="no">PROJECT_ID</var></code> is your project ID (if you don&#39;t have
a default project configured).</li>
<li><code translate="no" dir="ltr"><var translate="no">DATASET</var></code> is a dataset in your project.</li>
<li><code translate="no" dir="ltr"><var translate="no">VIEW</var></code> is the name of the view that you want to
create.</li>
</ul>

<p>Examples:</p>

<p>Enter the following command to create a view named <code translate="no" dir="ltr">myview</code> in
<code translate="no" dir="ltr">mydataset</code> in your default project. The expiration time is set to
3600 seconds (1 hour), the description is set to <code translate="no" dir="ltr">This is my view</code>, and the
label is set to <code translate="no" dir="ltr">organization:development</code>. The query used to create the view
queries data from the <a href="https://console.cloud.google.com/bigquery?p=bigquery-public-data&amp;d=usa_names&amp;page=dataset">USA Name Data public dataset</a>.</p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="scdoc" syntax-guessed><code translate="no" dir="ltr">bq mk \
--use_legacy_sql=false \
--expiration 3600 \
--description "This is my view" \
--label organization:development \
--view \
'SELECT
  name,
  number
FROM
  <span class="devsite-syntax-sb">`bigquery-public-data.usa_names.usa_1910_current`</span>
WHERE
  gender = "M"
ORDER BY
  number DESC' \
mydataset.myview
</code></pre></devsite-code>
<p>Enter the following command to create a view named <code translate="no" dir="ltr">myview</code> in
<code translate="no" dir="ltr">mydataset</code> in <code translate="no" dir="ltr">myotherproject</code>. The description is set to
<code translate="no" dir="ltr">This is my view</code>, the label is set to <code translate="no" dir="ltr">organization:development</code>,
and the view&#39;s expiration is set to the dataset&#39;s default table
expiration.
The query used to create the view
queries data from the <a href="https://console.cloud.google.com/bigquery?p=bigquery-public-data&amp;d=usa_names&amp;page=dataset">USA Name Data public dataset</a>.</p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="scdoc" syntax-guessed><code translate="no" dir="ltr">bq mk \
--use_legacy_sql=false \
--description "This is my view" \
--label organization:development \
--project_id myotherproject \
--view \
'SELECT
  name,
  number
FROM
  <span class="devsite-syntax-sb">`bigquery-public-data.usa_names.usa_1910_current`</span>
WHERE
  gender = "M"
ORDER BY
  number DESC' \
mydataset.myview
</code></pre></devsite-code>
<p>After the view is created, you can update the view&#39;s
expiration, description, and labels. For more information, see
<a href="/bigquery/docs/updating-views">Updating views</a>.</p></section>
<section><h3 id="terraform" data-text="Terraform" tabindex="-1">Terraform</h3><p>Use the
<a href="https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/bigquery_table"><code translate="no" dir="ltr">google_bigquery_table</code></a>
resource.</p>
<aside class="note"><strong>Note:</strong><span> To create BigQuery objects using Terraform, you must
enable the <a href="/resource-manager/reference/rest">Cloud Resource Manager API</a>.</span></aside>
<p>To authenticate to BigQuery, set up Application Default
Credentials. For more information, see
<a href="/bigquery/docs/authentication#client-libs">Set up authentication for client libraries</a>.</p>

<p>The following example creates a view named <code translate="no" dir="ltr">myview</code>:</p>








  
  














  



<div class="github-docwidget-gitinclude-code">

  
    
  
  



















  




  



  


  <div></div><devsite-code><pre suppresswarning="suppresswarning" translate="no" class="lang-terraform devsite-click-to-copy"
       track-metadata-position="terraform-google-modules/terraform-docs-samples/bigquery/bigquery_create_view/main.tf/HEAD/bigquery_create_view"
       
       data-code-snippet="true"
       
       data-github-includecode-link="https://github.com/terraform-google-modules/terraform-docs-samples/blob/HEAD/bigquery/bigquery_create_view/main.tf"
       track-metadata-snippet-file-url="https://github.com/terraform-google-modules/terraform-docs-samples/blob/HEAD/bigquery/bigquery_create_view/main.tf"
       
       
       feedback-context="{&#34;language&#34;: &#34;terraform&#34;, &#34;region_tag&#34;: &#34;bigquery_create_view&#34;, &#34;snippet_file_url&#34;: &#34;https://github.com/terraform-google-modules/terraform-docs-samples/blob/HEAD/bigquery/bigquery_create_view/main.tf&#34;}"
       feedback-product="1634365"
       feedback-bucket="data-analytics"
       
       
       language="terraform"
       
       
       
       
       data-github-path="terraform-google-modules/terraform-docs-samples/bigquery/bigquery_create_view/main.tf"
       
       
       data-git-revision="HEAD"
       
       
       data-region-tag="bigquery_create_view"
       track-metadata-region-tag="bigquery_create_view"
       
       
       
        dir="ltr" is-upgraded><code translate="no" dir="ltr">resource &quot;google_bigquery_dataset&quot; &quot;default&quot; {
  dataset_id                      = &quot;mydataset&quot;
  default_partition_expiration_ms = 2592000000  # 30 days
  default_table_expiration_ms     = 31536000000 # 365 days
  description                     = &quot;dataset description&quot;
  location                        = &quot;US&quot;
  max_time_travel_hours           = 96 # 4 days

  labels = {
    billing_group = &quot;accounting&quot;,
    pii           = &quot;sensitive&quot;
  }
}

resource &quot;google_bigquery_table&quot; &quot;default&quot; {
  dataset_id = google_bigquery_dataset.default.dataset_id
  table_id   = &quot;myview&quot;

  view {
    query          = &quot;SELECT global_id, faa_identifier, name, latitude, longitude FROM `bigquery-public-data.faa.us_airports`&quot;
    use_legacy_sql = false
  }

}</code></pre></devsite-code>
</div>




























<p>To apply your Terraform configuration in a Google Cloud project, complete the steps in the
   following sections.</p>
<h2 id="prepare-cloud-shell" data-text="Prepare Cloud Shell" tabindex="-1">Prepare Cloud Shell</h2>
<ol>
  <li>Launch <a href="https://shell.cloud.google.com/">Cloud Shell</a>.</li>
  <li>
    <p>Set the default Google Cloud project
      where you want to apply your Terraform configurations.
    </p>
    <p>You only need to run this command once per project, and you can run it in any directory.</p>
    <div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded>export GOOGLE_CLOUD_PROJECT=<var translate="no">PROJECT_ID</var></pre></devsite-code>
    <p>Environment variables are overridden if you set explicit values in the Terraform
      configuration file.</p>
  </li>
</ol>
<h2 id="prepare-the-directory" data-text="Prepare the directory" tabindex="-1">Prepare the directory</h2>
<p>Each Terraform configuration file must have its own directory (also
called a <em>root module</em>).</p>
<ol>
  <li>
    In <a href="https://shell.cloud.google.com/">Cloud Shell</a>, create a directory and a new
    file within that directory. The filename must have the
    <code translate="no" dir="ltr">.tf</code> extension&mdash;for example <code translate="no" dir="ltr">main.tf</code>. In this
    tutorial, the file is referred to as <code translate="no" dir="ltr">main.tf</code>.
    <div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded>mkdir <var translate="no">DIRECTORY</var> && cd <var translate="no">DIRECTORY</var> && touch main.tf</pre></devsite-code>
  </li>
  <li>
    <p>If you are following a tutorial, you can copy the sample code in each section or step.</p>
    <p>Copy the sample code into the newly created <code translate="no" dir="ltr">main.tf</code>.</p>
    <p>Optionally, copy the code from GitHub. This is recommended
      when the Terraform snippet is part of an end-to-end solution.
    </p>
  </li>
  <li>Review and modify the sample parameters to apply to your environment.</li>
  <li>Save your changes.</li>
  <li>
    Initialize Terraform. You only need to do this once per directory.
    <div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded>terraform init</pre></devsite-code>
    <p>Optionally, to use the latest Google provider version, include the <code translate="no" dir="ltr">-upgrade</code>
      option:
    </p>
    <div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded>terraform init -upgrade</pre></devsite-code>
  </li>
</ol>
<h2 id="apply-the-changes" data-text="Apply the changes" tabindex="-1">Apply the changes</h2>
<ol>
  <li>
    Review the configuration and verify that the resources that Terraform is going to create or
    update match your expectations:
    <div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded>terraform plan</pre></devsite-code>
    <p>Make corrections to the configuration as necessary.</p>
  </li>
  <li>
    Apply the Terraform configuration by running the following command and entering <code translate="no" dir="ltr">yes</code>
    at the prompt:
    <div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded>terraform apply</pre></devsite-code>
    <p>Wait until Terraform displays the "Apply complete!" message.</p>
  </li>
  <li><a href="https://console.cloud.google.com/">Open your Google Cloud project</a> to view
    the results. In the Google Cloud console, navigate to your resources in the UI to make sure
    that Terraform has created or updated them.
  </li>
</ol>
<aside class="note"><b>Note:</b> Terraform samples typically assume that the required APIs are
  enabled in your Google Cloud project.
</aside></section>
<section><h3 id="api" data-text=" API " tabindex="-1"> API </h3><p>Call the <a href="/bigquery/docs/reference/v2/tables/insert"><code translate="no" dir="ltr">tables.insert</code></a> method
with a <a href="/bigquery/docs/reference/v2/tables">table resource</a> that
contains a <code translate="no" dir="ltr">view</code> property.</p></section>
<section><h3 id="go" data-text=" Go " tabindex="-1"> Go </h3>









  
  
  
  
  







  
  
    
  




  



  









  
    
  



  


<section>
  
  
    
    <p>
      
        
          Before trying this sample, follow the <span class="notranslate">Go</span> setup instructions in the
          <a href="/bigquery/docs/quickstarts/quickstart-client-libraries"
             track-metadata-region-tag="bigquery_create_view" track-metadata-snippet-file-url="https://github.com/GoogleCloudPlatform/golang-samples/blob/bdc987b4624a0939603bb9f0a74eb2b815aa6577/bigquery/snippets/table/bigquery_create_view.go"
             track-type="clientLibrariesQuickstart"
             track-name="go"
             track-metadata-position="bigquery_create_view">BigQuery quickstart using
            client libraries</a>.
        
      
      
  For more information, see the
  <a href="https://godoc.org/cloud.google.com/go/bigquery"
     track-metadata-region-tag="bigquery_create_view" track-metadata-snippet-file-url="https://github.com/GoogleCloudPlatform/golang-samples/blob/bdc987b4624a0939603bb9f0a74eb2b815aa6577/bigquery/snippets/table/bigquery_create_view.go"
     track-type="clientLibrariesUsage"
     track-name="clientLibrariesLink"
     track-metadata-lang="go">BigQuery <span class="notranslate">Go</span> API
    reference documentation</a>.
  
    </p>
    <p>
      To authenticate to BigQuery, set up Application Default Credentials.
      For more information, see
      
        <a href="/bigquery/docs/authentication#client-libs" track-metadata-region-tag="bigquery_create_view" track-metadata-snippet-file-url="https://github.com/GoogleCloudPlatform/golang-samples/blob/bdc987b4624a0939603bb9f0a74eb2b815aa6577/bigquery/snippets/table/bigquery_create_view.go">Set up authentication for client libraries</a>.
      
    </p>
      






    
  
  
  
  






  
  














  



<div class="github-docwidget-gitinclude-code">

  
    
  
  











  









  




  



  


  <div></div><devsite-code><pre suppresswarning="suppresswarning" translate="no" class="devsite-click-to-copy" track-metadata-position="GoogleCloudPlatform/golang-samples/bigquery/snippets/table/bigquery_create_view.go/bdc987b4624a0939603bb9f0a74eb2b815aa6577/bigquery_create_view" data-code-snippet="true" data-github-includecode-link="https://github.com/GoogleCloudPlatform/golang-samples/blob/bdc987b4624a0939603bb9f0a74eb2b815aa6577/bigquery/snippets/table/bigquery_create_view.go" track-metadata-snippet-file-url="https://github.com/GoogleCloudPlatform/golang-samples/blob/bdc987b4624a0939603bb9f0a74eb2b815aa6577/bigquery/snippets/table/bigquery_create_view.go" feedback-context="{&#34;language&#34;: &#34;go&#34;, &#34;region_tag&#34;: &#34;bigquery_create_view&#34;, &#34;snippet_file_url&#34;: &#34;https://github.com/GoogleCloudPlatform/golang-samples/blob/bdc987b4624a0939603bb9f0a74eb2b815aa6577/bigquery/snippets/table/bigquery_create_view.go&#34;}" feedback-product="1634365" feedback-bucket="data-analytics" language="go" data-github-path="GoogleCloudPlatform/golang-samples/bigquery/snippets/table/bigquery_create_view.go" data-git-revision="bdc987b4624a0939603bb9f0a74eb2b815aa6577" data-region-tag="bigquery_create_view" track-metadata-region-tag="bigquery_create_view" dir="ltr" is-upgraded syntax="Go"><code translate="no" dir="ltr"><span class="devsite-syntax-kn">import</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span>
<span class="devsite-syntax-w">	</span><span class="devsite-syntax-s">"context"</span>
<span class="devsite-syntax-w">	</span><span class="devsite-syntax-s">"fmt"</span>

<span class="devsite-syntax-w">	</span><span class="devsite-syntax-s">"cloud.google.com/go/bigquery"</span>
<span class="devsite-syntax-p">)</span>

<span class="devsite-syntax-c1">// createView demonstrates creation of a BigQuery logical view.</span>
<span class="devsite-syntax-kd">func</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nx">createView</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-nx">projectID</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nx">datasetID</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nx">tableID</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">string</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">error</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">{</span>
<span class="devsite-syntax-w">	</span><span class="devsite-syntax-c1">// projectID := "my-project-id"</span>
<span class="devsite-syntax-w">	</span><span class="devsite-syntax-c1">// datasetID := "mydatasetid"</span>
<span class="devsite-syntax-w">	</span><span class="devsite-syntax-c1">// tableID := "mytableid"</span>
<span class="devsite-syntax-w">	</span><span class="devsite-syntax-nx">ctx</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-o">:=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nx">context</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-nx">Background</span><span class="devsite-syntax-p">()</span>

<span class="devsite-syntax-w">	</span><span class="devsite-syntax-nx">client</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nx">err</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-o">:=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nx">bigquery</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-nx">NewClient</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-nx">ctx</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nx">projectID</span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-w">	</span><span class="devsite-syntax-k">if</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nx">err</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-o">!=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kc">nil</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">{</span>
<span class="devsite-syntax-w">		</span><span class="devsite-syntax-k">return</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nx">fmt</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-nx">Errorf</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-s">"bigquery.NewClient: %v"</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nx">err</span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-w">	</span><span class="devsite-syntax-p">}</span>
<span class="devsite-syntax-w">	</span><span class="devsite-syntax-k">defer</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nx">client</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-nx">Close</span><span class="devsite-syntax-p">()</span>

<span class="devsite-syntax-w">	</span><span class="devsite-syntax-nx">meta</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-o">:=</span><span class="devsite-syntax-w"> </span>&amp;<span class="devsite-syntax-nx">bigquery</span><span class="devsite-syntax-p">.</span><a class="devsite-xref-link" href="https://docs.cloud.google.com/go/docs/reference/cloud.google.com/go/bigquery/latest/index.html#cloud_google_com_go_bigquery_TableMetadata" track-metadata-region-tag="bigquery_create_view" track-metadata-snippet-file-url="https://github.com/GoogleCloudPlatform/golang-samples/blob/bdc987b4624a0939603bb9f0a74eb2b815aa6577/bigquery/snippets/table/bigquery_create_view.go" track-metadata-xref-lang="GO" track-metadata-xref-library="cloud.google.com/go/bigquery" track-metadata-xref-link-text="TableMetadata" track-name="xrefLink" track-type="exampleCode"><span class="devsite-syntax-nx">TableMetadata</span></a><span class="devsite-syntax-p">{</span>
<span class="devsite-syntax-w">		</span><span class="devsite-syntax-c1">// This example shows how to create a view of the shakespeare sample dataset, which</span>
<span class="devsite-syntax-w">		</span><span class="devsite-syntax-c1">// provides word frequency information.  This view restricts the results to only contain</span>
<span class="devsite-syntax-w">		</span><span class="devsite-syntax-c1">// results for works that contain the "king" in the title, e.g. King Lear, King Henry V, etc.</span>
<span class="devsite-syntax-w">		</span><span class="devsite-syntax-nx">ViewQuery</span><span class="devsite-syntax-p">:</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s">"SELECT word, word_count, corpus, corpus_date FROM `bigquery-public-data.samples.shakespeare` WHERE corpus LIKE '%king%'"</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">	</span><span class="devsite-syntax-p">}</span>
<span class="devsite-syntax-w">	</span><span class="devsite-syntax-k">if</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nx">err</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-o">:=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nx">client</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-nx">Dataset</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-nx">datasetID</span><span class="devsite-syntax-p">).</span><span class="devsite-syntax-nx">Table</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-nx">tableID</span><span class="devsite-syntax-p">).</span><span class="devsite-syntax-nx">Create</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-nx">ctx</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nx">meta</span><span class="devsite-syntax-p">);</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nx">err</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-o">!=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kc">nil</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">{</span>
<span class="devsite-syntax-w">		</span><span class="devsite-syntax-k">return</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nx">err</span>
<span class="devsite-syntax-w">	</span><span class="devsite-syntax-p">}</span>
<span class="devsite-syntax-w">	</span><span class="devsite-syntax-k">return</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kc">nil</span>
<span class="devsite-syntax-p">}</span>
</code></pre></devsite-code>
</div>



























  
  
</section>


  
  
  
  
  
  
  
  
  
  
</section>
<section><h3 id="java" data-text=" Java " tabindex="-1"> Java </h3>









  
  
  
  
  







  
  
  
    
  




  



  







  
    
  



  


<section>
  
  
    
    <p>
      
        
          Before trying this sample, follow the <span class="notranslate">Java</span> setup instructions in the
          <a href="/bigquery/docs/quickstarts/quickstart-client-libraries"
             track-metadata-region-tag="bigquery_create_view" track-metadata-snippet-file-url="https://github.com/googleapis/java-bigquery/blob/main/samples/snippets/src/main/java/com/example/bigquery/CreateView.java"
             track-type="clientLibrariesQuickstart"
             track-name="java"
             track-metadata-position="bigquery_create_view">BigQuery quickstart using
            client libraries</a>.
        
      
      
  For more information, see the
  <a href="/java/docs/reference/google-cloud-bigquery/latest/overview"
     track-metadata-region-tag="bigquery_create_view" track-metadata-snippet-file-url="https://github.com/googleapis/java-bigquery/blob/main/samples/snippets/src/main/java/com/example/bigquery/CreateView.java"
     track-type="clientLibrariesUsage"
     track-name="clientLibrariesLink"
     track-metadata-lang="java">BigQuery <span class="notranslate">Java</span> API
    reference documentation</a>.
  
    </p>
    <p>
      To authenticate to BigQuery, set up Application Default Credentials.
      For more information, see
      
        <a href="/bigquery/docs/authentication#client-libs" track-metadata-region-tag="bigquery_create_view" track-metadata-snippet-file-url="https://github.com/googleapis/java-bigquery/blob/main/samples/snippets/src/main/java/com/example/bigquery/CreateView.java">Set up authentication for client libraries</a>.
      
    </p>
      






    
  
  
  
  






  
  














  



<div class="github-docwidget-gitinclude-code">

  
    
  
  











  









  




  



  


  <div></div><devsite-code><pre suppresswarning="suppresswarning" translate="no" class="devsite-click-to-copy" track-metadata-position="googleapis/java-bigquery/samples/snippets/src/main/java/com/example/bigquery/CreateView.java/main/bigquery_create_view" data-code-snippet="true" data-github-includecode-link="https://github.com/googleapis/java-bigquery/blob/main/samples/snippets/src/main/java/com/example/bigquery/CreateView.java" track-metadata-snippet-file-url="https://github.com/googleapis/java-bigquery/blob/main/samples/snippets/src/main/java/com/example/bigquery/CreateView.java" feedback-context="{&#34;language&#34;: &#34;java&#34;, &#34;region_tag&#34;: &#34;bigquery_create_view&#34;, &#34;snippet_file_url&#34;: &#34;https://github.com/googleapis/java-bigquery/blob/main/samples/snippets/src/main/java/com/example/bigquery/CreateView.java&#34;}" feedback-product="1634365" feedback-bucket="data-analytics" language="java" data-github-path="googleapis/java-bigquery/samples/snippets/src/main/java/com/example/bigquery/CreateView.java" data-git-revision="main" data-region-tag="bigquery_create_view" track-metadata-region-tag="bigquery_create_view" dir="ltr" is-upgraded syntax="Java"><code translate="no" dir="ltr"><span class="devsite-syntax-kn">import</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nn">com.google.cloud.bigquery.<a class="devsite-xref-link" href="https://docs.cloud.google.com/java/docs/reference/google-cloud-bigquery/latest/com.google.cloud.bigquery.BigQuery.html" track-metadata-region-tag="bigquery_create_view" track-metadata-snippet-file-url="https://github.com/googleapis/java-bigquery/blob/main/samples/snippets/src/main/java/com/example/bigquery/CreateView.java" track-metadata-xref-lang="JAVA" track-metadata-xref-library="com.google.cloud.bigquery" track-metadata-xref-link-text="BigQuery" track-name="xrefLink" track-type="exampleCode">BigQuery</span></a><span class="devsite-syntax-p">;</span>
<span class="devsite-syntax-kn">import</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nn">com.google.cloud.bigquery.<a class="devsite-xref-link" href="https://docs.cloud.google.com/java/docs/reference/google-cloud-bigquery/latest/com.google.cloud.bigquery.BigQueryException.html" track-metadata-region-tag="bigquery_create_view" track-metadata-snippet-file-url="https://github.com/googleapis/java-bigquery/blob/main/samples/snippets/src/main/java/com/example/bigquery/CreateView.java" track-metadata-xref-lang="JAVA" track-metadata-xref-library="com.google.cloud.bigquery" track-metadata-xref-link-text="BigQueryException" track-name="xrefLink" track-type="exampleCode">BigQueryException</span></a><span class="devsite-syntax-p">;</span>
<span class="devsite-syntax-kn">import</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nn">com.google.cloud.bigquery.<a class="devsite-xref-link" href="https://docs.cloud.google.com/java/docs/reference/google-cloud-bigquery/latest/com.google.cloud.bigquery.BigQueryOptions.html" track-metadata-region-tag="bigquery_create_view" track-metadata-snippet-file-url="https://github.com/googleapis/java-bigquery/blob/main/samples/snippets/src/main/java/com/example/bigquery/CreateView.java" track-metadata-xref-lang="JAVA" track-metadata-xref-library="com.google.cloud.bigquery" track-metadata-xref-link-text="BigQueryOptions" track-name="xrefLink" track-type="exampleCode">BigQueryOptions</span></a><span class="devsite-syntax-p">;</span>
<span class="devsite-syntax-kn">import</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nn">com.google.cloud.bigquery.<a class="devsite-xref-link" href="https://docs.cloud.google.com/java/docs/reference/google-cloud-bigquery/latest/com.google.cloud.bigquery.TableId.html" track-metadata-region-tag="bigquery_create_view" track-metadata-snippet-file-url="https://github.com/googleapis/java-bigquery/blob/main/samples/snippets/src/main/java/com/example/bigquery/CreateView.java" track-metadata-xref-lang="JAVA" track-metadata-xref-library="com.google.cloud.bigquery" track-metadata-xref-link-text="TableId" track-name="xrefLink" track-type="exampleCode">TableId</span></a><span class="devsite-syntax-p">;</span>
<span class="devsite-syntax-kn">import</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nn">com.google.cloud.bigquery.<a class="devsite-xref-link" href="https://docs.cloud.google.com/java/docs/reference/google-cloud-bigquery/latest/com.google.cloud.bigquery.TableInfo.html" track-metadata-region-tag="bigquery_create_view" track-metadata-snippet-file-url="https://github.com/googleapis/java-bigquery/blob/main/samples/snippets/src/main/java/com/example/bigquery/CreateView.java" track-metadata-xref-lang="JAVA" track-metadata-xref-library="com.google.cloud.bigquery" track-metadata-xref-link-text="TableInfo" track-name="xrefLink" track-type="exampleCode">TableInfo</span></a><span class="devsite-syntax-p">;</span>
<span class="devsite-syntax-kn">import</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nn">com.google.cloud.bigquery.<a class="devsite-xref-link" href="https://docs.cloud.google.com/java/docs/reference/google-cloud-bigquery/latest/com.google.cloud.bigquery.ViewDefinition.html" track-metadata-region-tag="bigquery_create_view" track-metadata-snippet-file-url="https://github.com/googleapis/java-bigquery/blob/main/samples/snippets/src/main/java/com/example/bigquery/CreateView.java" track-metadata-xref-lang="JAVA" track-metadata-xref-library="com.google.cloud.bigquery" track-metadata-xref-link-text="ViewDefinition" track-name="xrefLink" track-type="exampleCode">ViewDefinition</span></a><span class="devsite-syntax-p">;</span>

<span class="devsite-syntax-c1">// Sample to create a view</span>
<span class="devsite-syntax-kd">public</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kd">class</span> <span class="devsite-syntax-nc">CreateView</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">{</span>

<span class="devsite-syntax-w">  </span><span class="devsite-syntax-kd">public</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kd">static</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">void</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">main</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">String</span><span class="devsite-syntax-o">[]</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">args</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">{</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-c1">// TODO(developer): Replace these variables before running the sample.</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-n">String</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">datasetName</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-o">=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s">"MY_DATASET_NAME"</span><span class="devsite-syntax-p">;</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-n">String</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">tableName</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-o">=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s">"MY_TABLE_NAME"</span><span class="devsite-syntax-p">;</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-n">String</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">viewName</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-o">=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s">"MY_VIEW_NAME"</span><span class="devsite-syntax-p">;</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-n">String</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">query</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-o">=</span>
<span class="devsite-syntax-w">        </span><span class="devsite-syntax-n">String</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-na">format</span><span class="devsite-syntax-p">(</span>
<span class="devsite-syntax-w">            </span><span class="devsite-syntax-s">"SELECT TimestampField, StringField, BooleanField FROM %s.%s"</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">datasetName</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">tableName</span><span class="devsite-syntax-p">);</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-n">createView</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">datasetName</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">viewName</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">query</span><span class="devsite-syntax-p">);</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-p">}</span>

<span class="devsite-syntax-w">  </span><span class="devsite-syntax-kd">public</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kd">static</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">void</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">createView</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">String</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">datasetName</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">String</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">viewName</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">String</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">query</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">{</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">try</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">{</span>
<span class="devsite-syntax-w">      </span><span class="devsite-syntax-c1">// Initialize client that will be used to send requests. This client only needs to be created</span>
<span class="devsite-syntax-w">      </span><span class="devsite-syntax-c1">// once, and can be reused for multiple requests.</span>
<span class="devsite-syntax-w">      </span><a class="devsite-xref-link" href="https://docs.cloud.google.com/java/docs/reference/google-cloud-bigquery/latest/com.google.cloud.bigquery.BigQuery.html" track-metadata-region-tag="bigquery_create_view" track-metadata-snippet-file-url="https://github.com/googleapis/java-bigquery/blob/main/samples/snippets/src/main/java/com/example/bigquery/CreateView.java" track-metadata-xref-lang="JAVA" track-metadata-xref-library="com.google.cloud.bigquery" track-metadata-xref-link-text="BigQuery" track-name="xrefLink" track-type="exampleCode"><span class="devsite-syntax-n">BigQuery</span></a><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">bigquery</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-o">=</span><span class="devsite-syntax-w"> </span><a class="devsite-xref-link" href="https://docs.cloud.google.com/java/docs/reference/google-cloud-bigquery/latest/com.google.cloud.bigquery.BigQueryOptions.html" track-metadata-region-tag="bigquery_create_view" track-metadata-snippet-file-url="https://github.com/googleapis/java-bigquery/blob/main/samples/snippets/src/main/java/com/example/bigquery/CreateView.java" track-metadata-xref-lang="JAVA" track-metadata-xref-library="com.google.cloud.bigquery" track-metadata-xref-link-text="BigQueryOptions" track-name="xrefLink" track-type="exampleCode"><span class="devsite-syntax-n">BigQueryOptions</span></a><span class="devsite-syntax-p">.</span><span class="devsite-syntax-na">getDefaultInstance</span><span class="devsite-syntax-p">().</span><span class="devsite-syntax-na">getService</span><span class="devsite-syntax-p">();</span>

<span class="devsite-syntax-w">      </span><a class="devsite-xref-link" href="https://docs.cloud.google.com/java/docs/reference/google-cloud-bigquery/latest/com.google.cloud.bigquery.TableId.html" track-metadata-region-tag="bigquery_create_view" track-metadata-snippet-file-url="https://github.com/googleapis/java-bigquery/blob/main/samples/snippets/src/main/java/com/example/bigquery/CreateView.java" track-metadata-xref-lang="JAVA" track-metadata-xref-library="com.google.cloud.bigquery" track-metadata-xref-link-text="TableId" track-name="xrefLink" track-type="exampleCode"><span class="devsite-syntax-n">TableId</span></a><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">tableId</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-o">=</span><span class="devsite-syntax-w"> </span><a class="devsite-xref-link" href="https://docs.cloud.google.com/java/docs/reference/google-cloud-bigquery/latest/com.google.cloud.bigquery.TableId.html" track-metadata-region-tag="bigquery_create_view" track-metadata-snippet-file-url="https://github.com/googleapis/java-bigquery/blob/main/samples/snippets/src/main/java/com/example/bigquery/CreateView.java" track-metadata-xref-lang="JAVA" track-metadata-xref-library="com.google.cloud.bigquery" track-metadata-xref-link-text="TableId" track-name="xrefLink" track-type="exampleCode"><span class="devsite-syntax-n">TableId</span></a><span class="devsite-syntax-p">.</span><span class="devsite-syntax-na">of</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">datasetName</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">viewName</span><span class="devsite-syntax-p">);</span>

<span class="devsite-syntax-w">      </span><a class="devsite-xref-link" href="https://docs.cloud.google.com/java/docs/reference/google-cloud-bigquery/latest/com.google.cloud.bigquery.ViewDefinition.html" track-metadata-region-tag="bigquery_create_view" track-metadata-snippet-file-url="https://github.com/googleapis/java-bigquery/blob/main/samples/snippets/src/main/java/com/example/bigquery/CreateView.java" track-metadata-xref-lang="JAVA" track-metadata-xref-library="com.google.cloud.bigquery" track-metadata-xref-link-text="ViewDefinition" track-name="xrefLink" track-type="exampleCode"><span class="devsite-syntax-n">ViewDefinition</span></a><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">viewDefinition</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-o">=</span>
<span class="devsite-syntax-w">          </span><a class="devsite-xref-link" href="https://docs.cloud.google.com/java/docs/reference/google-cloud-bigquery/latest/com.google.cloud.bigquery.ViewDefinition.html" track-metadata-region-tag="bigquery_create_view" track-metadata-snippet-file-url="https://github.com/googleapis/java-bigquery/blob/main/samples/snippets/src/main/java/com/example/bigquery/CreateView.java" track-metadata-xref-lang="JAVA" track-metadata-xref-library="com.google.cloud.bigquery" track-metadata-xref-link-text="ViewDefinition" track-name="xrefLink" track-type="exampleCode"><span class="devsite-syntax-n">ViewDefinition</span></a><span class="devsite-syntax-p">.</span><span class="devsite-syntax-na">newBuilder</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">query</span><span class="devsite-syntax-p">).</span><span class="devsite-syntax-na">setUseLegacySql</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-kc">false</span><span class="devsite-syntax-p">).</span><span class="devsite-syntax-na">build</span><span class="devsite-syntax-p">();</span>

<span class="devsite-syntax-w">      </span><span class="devsite-syntax-n">bigquery</span><span class="devsite-syntax-p">.</span><a class="devsite-xref-link" href="https://docs.cloud.google.com/java/docs/reference/google-cloud-bigquery/latest/com.google.cloud.bigquery.BigQuery.html#com_google_cloud_bigquery_BigQuery_create_com_google_cloud_bigquery_DatasetInfo_com_google_cloud_bigquery_BigQuery_DatasetOption____" track-metadata-region-tag="bigquery_create_view" track-metadata-snippet-file-url="https://github.com/googleapis/java-bigquery/blob/main/samples/snippets/src/main/java/com/example/bigquery/CreateView.java" track-metadata-xref-lang="JAVA" track-metadata-xref-library="com.google.cloud.bigquery" track-metadata-xref-link-text="create" track-name="xrefLink" track-type="exampleCode"><span class="devsite-syntax-na">create</span></a><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">TableInfo</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-na">of</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">tableId</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">viewDefinition</span><span class="devsite-syntax-p">));</span>
<span class="devsite-syntax-w">      </span><span class="devsite-syntax-n">System</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-na">out</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-na">println</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-s">"View created successfully"</span><span class="devsite-syntax-p">);</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-p">}</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">catch</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><a class="devsite-xref-link" href="https://docs.cloud.google.com/java/docs/reference/google-cloud-bigquery/latest/com.google.cloud.bigquery.BigQueryException.html" track-metadata-region-tag="bigquery_create_view" track-metadata-snippet-file-url="https://github.com/googleapis/java-bigquery/blob/main/samples/snippets/src/main/java/com/example/bigquery/CreateView.java" track-metadata-xref-lang="JAVA" track-metadata-xref-library="com.google.cloud.bigquery" track-metadata-xref-link-text="BigQueryException" track-name="xrefLink" track-type="exampleCode"><span class="devsite-syntax-n">BigQueryException</span></a><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">e</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">{</span>
<span class="devsite-syntax-w">      </span><span class="devsite-syntax-n">System</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-na">out</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-na">println</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-s">"View was not created. \n"</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-o">+</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">e</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-na">toString</span><span class="devsite-syntax-p">());</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-p">}</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-p">}</span>
<span class="devsite-syntax-p">}</span></code></pre></devsite-code>
</div>



























  
  
</section>


  
  
  
  
  
  
  
  
  
  
</section>
<section><h3 id="node.js" data-text=" Node.js " tabindex="-1"> Node.js </h3>









  
  
  
  
  







  
  
  
    
  




  



  







  
    
  



  


<section>
  
  
    
    <p>
      
        
          Before trying this sample, follow the <span class="notranslate">Node.js</span> setup instructions in the
          <a href="/bigquery/docs/quickstarts/quickstart-client-libraries"
             track-metadata-region-tag="bigquery_create_view" track-metadata-snippet-file-url="https://github.com/googleapis/nodejs-bigquery/blob/6438df629e9adb707338bd53959c7c10e0ae2936/samples/createView.js"
             track-type="clientLibrariesQuickstart"
             track-name="nodejs"
             track-metadata-position="bigquery_create_view">BigQuery quickstart using
            client libraries</a>.
        
      
      
  For more information, see the
  <a href="https://googleapis.dev/nodejs/bigquery/latest/index.html"
     track-metadata-region-tag="bigquery_create_view" track-metadata-snippet-file-url="https://github.com/googleapis/nodejs-bigquery/blob/6438df629e9adb707338bd53959c7c10e0ae2936/samples/createView.js"
     track-type="clientLibrariesUsage"
     track-name="clientLibrariesLink"
     track-metadata-lang="nodejs">BigQuery <span class="notranslate">Node.js</span> API
    reference documentation</a>.
  
    </p>
    <p>
      To authenticate to BigQuery, set up Application Default Credentials.
      For more information, see
      
        <a href="/bigquery/docs/authentication#client-libs" track-metadata-region-tag="bigquery_create_view" track-metadata-snippet-file-url="https://github.com/googleapis/nodejs-bigquery/blob/6438df629e9adb707338bd53959c7c10e0ae2936/samples/createView.js">Set up authentication for client libraries</a>.
      
    </p>
      






    
  
  
  
  






  
  














  



<div class="github-docwidget-gitinclude-code">

  
    
  
  











  









  




  



  


  <div></div><devsite-code><pre suppresswarning="suppresswarning" translate="no" class="devsite-click-to-copy" track-metadata-position="googleapis/nodejs-bigquery/samples/createView.js/6438df629e9adb707338bd53959c7c10e0ae2936/bigquery_create_view" data-code-snippet="true" data-github-includecode-link="https://github.com/googleapis/nodejs-bigquery/blob/6438df629e9adb707338bd53959c7c10e0ae2936/samples/createView.js" track-metadata-snippet-file-url="https://github.com/googleapis/nodejs-bigquery/blob/6438df629e9adb707338bd53959c7c10e0ae2936/samples/createView.js" feedback-context="{&#34;language&#34;: &#34;nodejs&#34;, &#34;region_tag&#34;: &#34;bigquery_create_view&#34;, &#34;snippet_file_url&#34;: &#34;https://github.com/googleapis/nodejs-bigquery/blob/6438df629e9adb707338bd53959c7c10e0ae2936/samples/createView.js&#34;}" feedback-product="1634365" feedback-bucket="data-analytics" language="nodejs" data-github-path="googleapis/nodejs-bigquery/samples/createView.js" data-git-revision="6438df629e9adb707338bd53959c7c10e0ae2936" data-region-tag="bigquery_create_view" track-metadata-region-tag="bigquery_create_view" dir="ltr" is-upgraded syntax="JavaScript"><code translate="no" dir="ltr"><span class="devsite-syntax-c1">// Import the Google Cloud client library and create a client</span>
<span class="devsite-syntax-kd">const</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">{</span><span class="devsite-syntax-nx">BigQuery</span><span class="devsite-syntax-p">}</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-o">=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nx">require</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-s1">'<a class="devsite-xref-link" href="https://docs.cloud.google.com/nodejs/docs/reference/bigquery/latest/overview.html" track-metadata-region-tag="bigquery_create_view" track-metadata-snippet-file-url="https://github.com/googleapis/nodejs-bigquery/blob/6438df629e9adb707338bd53959c7c10e0ae2936/samples/createView.js" track-metadata-xref-lang="NODEJS" track-metadata-xref-library="@google-cloud/bigquery" track-metadata-xref-link-text="@google-cloud/bigquery" track-name="xrefLink" track-type="exampleCode">@google-cloud/bigquery</a>'</span><span class="devsite-syntax-p">);</span>
<span class="devsite-syntax-kd">const</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nx">bigquery</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-o">=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-ow">new</span><span class="devsite-syntax-w"> </span><a class="devsite-xref-link" href="https://docs.cloud.google.com/nodejs/docs/reference/bigquery/latest/bigquery/bigquery.html" track-metadata-region-tag="bigquery_create_view" track-metadata-snippet-file-url="https://github.com/googleapis/nodejs-bigquery/blob/6438df629e9adb707338bd53959c7c10e0ae2936/samples/createView.js" track-metadata-xref-lang="NODEJS" track-metadata-xref-library="@google-cloud/bigquery" track-metadata-xref-link-text="BigQuery" track-name="xrefLink" track-type="exampleCode"><span class="devsite-syntax-nx">BigQuery</span></a><span class="devsite-syntax-p">();</span>

<span class="devsite-syntax-k">async</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kd">function</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nx">createView</span><span class="devsite-syntax-p">()</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">{</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-c1">// Creates a new view named "my_shared_view" in "my_dataset".</span>

<span class="devsite-syntax-w">  </span><span class="devsite-syntax-cm">/**</span>
<span class="devsite-syntax-cm">   * TODO(developer): Uncomment the following lines before running the sample.</span>
<span class="devsite-syntax-cm">   */</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-c1">// const myDatasetId = "my_table"</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-c1">// const myTableId = "my_table"</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-c1">// const projectId = "bigquery-public-data";</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-c1">// const sourceDatasetId = "usa_names"</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-c1">// const sourceTableId = "usa_1910_current";</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-kd">const</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nx">myDataset</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-o">=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">await</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nx">bigquery</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-nx">dataset</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-nx">myDatasetId</span><span class="devsite-syntax-p">);</span>

<span class="devsite-syntax-w">  </span><span class="devsite-syntax-c1">// For all options, see https://cloud.google.com/bigquery/docs/reference/v2/tables#resource</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-kd">const</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nx">options</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-o">=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">{</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-nx">view</span><span class="devsite-syntax-o">:</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-sb">`SELECT name </span>
<span class="devsite-syntax-sb">    FROM \`</span><span class="devsite-syntax-si">${</span><span class="devsite-syntax-nx">projectId</span><span class="devsite-syntax-si">}</span><span class="devsite-syntax-sb">.</span><span class="devsite-syntax-si">${</span><span class="devsite-syntax-nx">sourceDatasetId</span><span class="devsite-syntax-si">}</span><span class="devsite-syntax-sb">.</span><span class="devsite-syntax-si">${</span><span class="devsite-syntax-nx">sourceTableId</span><span class="devsite-syntax-si">}</span><span class="devsite-syntax-sb">\`</span>
<span class="devsite-syntax-sb">    LIMIT 10`</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-p">};</span>

<span class="devsite-syntax-w">  </span><span class="devsite-syntax-c1">// Create a new view in the dataset</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-kd">const</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">[</span><span class="devsite-syntax-nx">view</span><span class="devsite-syntax-p">]</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-o">=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">await</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nx">myDataset</span><span class="devsite-syntax-p">.</span><a class="devsite-xref-link" href="https://docs.cloud.google.com/nodejs/docs/reference/bigquery/latest/bigquery/dataset.html" track-metadata-region-tag="bigquery_create_view" track-metadata-snippet-file-url="https://github.com/googleapis/nodejs-bigquery/blob/6438df629e9adb707338bd53959c7c10e0ae2936/samples/createView.js" track-metadata-xref-lang="NODEJS" track-metadata-xref-library="@google-cloud/bigquery" track-metadata-xref-link-text="createTable" track-name="xrefLink" track-type="exampleCode"><span class="devsite-syntax-nx">createTable</span></a><span class="devsite-syntax-p">(</span><span class="devsite-syntax-nx">myTableId</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nx">options</span><span class="devsite-syntax-p">);</span>

<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nx">console</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-nx">log</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-sb">`View </span><span class="devsite-syntax-si">${</span><span class="devsite-syntax-nx">view</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-nx">id</span><span class="devsite-syntax-si">}</span><span class="devsite-syntax-sb"> created.`</span><span class="devsite-syntax-p">);</span>
<span class="devsite-syntax-p">}</span></code></pre></devsite-code>
</div>



























  
  
</section>


  
  
  
  
  
  
  
  
  
  
</section>
<section><h3 id="python" data-text=" Python " tabindex="-1"> Python </h3>









  
  
  
  
  







  
  
  
    
  




  



  







  
    
  



  


<section>
  
  
    
    <p>
      
        
          Before trying this sample, follow the <span class="notranslate">Python</span> setup instructions in the
          <a href="/bigquery/docs/quickstarts/quickstart-client-libraries"
             track-metadata-region-tag="bigquery_create_view" track-metadata-snippet-file-url="https://github.com/googleapis/python-bigquery/blob/079b6a162f6929bf801366d92f8daeb3318426c4/samples/snippets/view.py"
             track-type="clientLibrariesQuickstart"
             track-name="python"
             track-metadata-position="bigquery_create_view">BigQuery quickstart using
            client libraries</a>.
        
      
      
  For more information, see the
  <a href="/python/docs/reference/bigquery/latest"
     track-metadata-region-tag="bigquery_create_view" track-metadata-snippet-file-url="https://github.com/googleapis/python-bigquery/blob/079b6a162f6929bf801366d92f8daeb3318426c4/samples/snippets/view.py"
     track-type="clientLibrariesUsage"
     track-name="clientLibrariesLink"
     track-metadata-lang="python">BigQuery <span class="notranslate">Python</span> API
    reference documentation</a>.
  
    </p>
    <p>
      To authenticate to BigQuery, set up Application Default Credentials.
      For more information, see
      
        <a href="/bigquery/docs/authentication#client-libs" track-metadata-region-tag="bigquery_create_view" track-metadata-snippet-file-url="https://github.com/googleapis/python-bigquery/blob/079b6a162f6929bf801366d92f8daeb3318426c4/samples/snippets/view.py">Set up authentication for client libraries</a>.
      
    </p>
      






    
  
  
  
  






  
  














  



<div class="github-docwidget-gitinclude-code">

  
    
  
  











  









  




  



  


  <div></div><devsite-code><pre suppresswarning="suppresswarning" translate="no" class="devsite-click-to-copy" track-metadata-position="googleapis/python-bigquery/samples/snippets/view.py/079b6a162f6929bf801366d92f8daeb3318426c4/bigquery_create_view" data-code-snippet="true" data-github-includecode-link="https://github.com/googleapis/python-bigquery/blob/079b6a162f6929bf801366d92f8daeb3318426c4/samples/snippets/view.py" track-metadata-snippet-file-url="https://github.com/googleapis/python-bigquery/blob/079b6a162f6929bf801366d92f8daeb3318426c4/samples/snippets/view.py" feedback-context="{&#34;language&#34;: &#34;python&#34;, &#34;region_tag&#34;: &#34;bigquery_create_view&#34;, &#34;snippet_file_url&#34;: &#34;https://github.com/googleapis/python-bigquery/blob/079b6a162f6929bf801366d92f8daeb3318426c4/samples/snippets/view.py&#34;}" feedback-product="1634365" feedback-bucket="data-analytics" language="python" data-github-path="googleapis/python-bigquery/samples/snippets/view.py" data-git-revision="079b6a162f6929bf801366d92f8daeb3318426c4" data-region-tag="bigquery_create_view" track-metadata-region-tag="bigquery_create_view" dir="ltr" is-upgraded syntax="Python"><code translate="no" dir="ltr"><span class="devsite-syntax-kn">from</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nn">google.cloud</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kn">import</span> <a class="devsite-xref-link" href="https://docs.cloud.google.com/python/docs/reference/bigquery/latest" track-metadata-region-tag="bigquery_create_view" track-metadata-snippet-file-url="https://github.com/googleapis/python-bigquery/blob/079b6a162f6929bf801366d92f8daeb3318426c4/samples/snippets/view.py" track-metadata-xref-lang="PYTHON" track-metadata-xref-library="google.cloud.bigquery" track-metadata-xref-link-text="bigquery" track-name="xrefLink" track-type="exampleCode"><span class="devsite-syntax-n">bigquery</span></a>

<span class="devsite-syntax-n">client</span> <span class="devsite-syntax-o">=</span> <a class="devsite-xref-link" href="https://docs.cloud.google.com/python/docs/reference/bigquery/latest" track-metadata-region-tag="bigquery_create_view" track-metadata-snippet-file-url="https://github.com/googleapis/python-bigquery/blob/079b6a162f6929bf801366d92f8daeb3318426c4/samples/snippets/view.py" track-metadata-xref-lang="PYTHON" track-metadata-xref-library="google.cloud.bigquery" track-metadata-xref-link-text="bigquery" track-name="xrefLink" track-type="exampleCode"><span class="devsite-syntax-n">bigquery</span></a><span class="devsite-syntax-o">.</span><a class="devsite-xref-link" href="https://docs.cloud.google.com/python/docs/reference/bigquery/latest/google.cloud.bigquery.client.Client.html" track-metadata-region-tag="bigquery_create_view" track-metadata-snippet-file-url="https://github.com/googleapis/python-bigquery/blob/079b6a162f6929bf801366d92f8daeb3318426c4/samples/snippets/view.py" track-metadata-xref-lang="PYTHON" track-metadata-xref-library="google.cloud.bigquery" track-metadata-xref-link-text="Client" track-name="xrefLink" track-type="exampleCode"><span class="devsite-syntax-n">Client</span></a><span class="devsite-syntax-p">()</span>

<span class="devsite-syntax-n">view_id</span> <span class="devsite-syntax-o">=</span> <span class="devsite-syntax-s2">"my-project.my_dataset.my_view"</span>
<span class="devsite-syntax-n">source_id</span> <span class="devsite-syntax-o">=</span> <span class="devsite-syntax-s2">"my-project.my_dataset.my_table"</span>
<span class="devsite-syntax-n">view</span> <span class="devsite-syntax-o">=</span> <a class="devsite-xref-link" href="https://docs.cloud.google.com/python/docs/reference/bigquery/latest" track-metadata-region-tag="bigquery_create_view" track-metadata-snippet-file-url="https://github.com/googleapis/python-bigquery/blob/079b6a162f6929bf801366d92f8daeb3318426c4/samples/snippets/view.py" track-metadata-xref-lang="PYTHON" track-metadata-xref-library="google.cloud.bigquery" track-metadata-xref-link-text="bigquery" track-name="xrefLink" track-type="exampleCode"><span class="devsite-syntax-n">bigquery</span></a><span class="devsite-syntax-o">.</span><a class="devsite-xref-link" href="https://docs.cloud.google.com/python/docs/reference/bigquery/latest/google.cloud.bigquery.table.Table.html" track-metadata-region-tag="bigquery_create_view" track-metadata-snippet-file-url="https://github.com/googleapis/python-bigquery/blob/079b6a162f6929bf801366d92f8daeb3318426c4/samples/snippets/view.py" track-metadata-xref-lang="PYTHON" track-metadata-xref-library="google.cloud.bigquery" track-metadata-xref-link-text="Table" track-name="xrefLink" track-type="exampleCode"><span class="devsite-syntax-n">Table</span></a><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">view_id</span><span class="devsite-syntax-p">)</span>

<span class="devsite-syntax-c1"># The source table in this example is created from a CSV file in Google</span>
<span class="devsite-syntax-c1"># Cloud Storage located at</span>
<span class="devsite-syntax-c1"># `gs://cloud-samples-data/bigquery/us-states/us-states.csv`. It contains</span>
<span class="devsite-syntax-c1"># 50 US states, while the view returns only those states with names</span>
<span class="devsite-syntax-c1"># starting with the letter 'W'.</span>
<a class="devsite-xref-link" href="https://docs.cloud.google.com/python/docs/reference/bigquery/latest/google.cloud.bigquery.dataset.AccessEntry.html#google_cloud_bigquery_dataset_AccessEntry_view" track-metadata-region-tag="bigquery_create_view" track-metadata-snippet-file-url="https://github.com/googleapis/python-bigquery/blob/079b6a162f6929bf801366d92f8daeb3318426c4/samples/snippets/view.py" track-metadata-xref-lang="PYTHON" track-metadata-xref-library="google.cloud.bigquery" track-metadata-xref-link-text="view" track-name="xrefLink" track-type="exampleCode"><span class="devsite-syntax-n">view</span></a><span class="devsite-syntax-o">.</span><a class="devsite-xref-link" href="https://docs.cloud.google.com/python/docs/reference/bigquery/latest/google.cloud.bigquery.table.Table.html#google_cloud_bigquery_table_Table_view_query" track-metadata-region-tag="bigquery_create_view" track-metadata-snippet-file-url="https://github.com/googleapis/python-bigquery/blob/079b6a162f6929bf801366d92f8daeb3318426c4/samples/snippets/view.py" track-metadata-xref-lang="PYTHON" track-metadata-xref-library="google.cloud.bigquery" track-metadata-xref-link-text="view_query" track-name="xrefLink" track-type="exampleCode"><span class="devsite-syntax-n">view_query</span></a> <span class="devsite-syntax-o">=</span> <span class="devsite-syntax-sa">f</span><span class="devsite-syntax-s2">"SELECT name, post_abbr FROM `</span><span class="devsite-syntax-si">{</span><span class="devsite-syntax-n">source_id</span><span class="devsite-syntax-si">}</span><span class="devsite-syntax-s2">` WHERE name LIKE 'W%'"</span>

<span class="devsite-syntax-c1"># Make an API request to create the view.</span>
<span class="devsite-syntax-n">view</span> <span class="devsite-syntax-o">=</span> <span class="devsite-syntax-n">client</span><span class="devsite-syntax-o">.</span><a class="devsite-xref-link" href="https://docs.cloud.google.com/python/docs/reference/bigquery/latest/google.cloud.bigquery.client.Client.html#google_cloud_bigquery_client_Client_create_table" track-metadata-region-tag="bigquery_create_view" track-metadata-snippet-file-url="https://github.com/googleapis/python-bigquery/blob/079b6a162f6929bf801366d92f8daeb3318426c4/samples/snippets/view.py" track-metadata-xref-lang="PYTHON" track-metadata-xref-library="google.cloud.bigquery" track-metadata-xref-link-text="create_table" track-name="xrefLink" track-type="exampleCode"><span class="devsite-syntax-n">create_table</span></a><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">view</span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-nb">print</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-sa">f</span><span class="devsite-syntax-s2">"Created </span><span class="devsite-syntax-si">{</span><a class="devsite-xref-link" href="https://docs.cloud.google.com/python/docs/reference/bigquery/latest/google.cloud.bigquery.dataset.AccessEntry.html#google_cloud_bigquery_dataset_AccessEntry_view" track-metadata-region-tag="bigquery_create_view" track-metadata-snippet-file-url="https://github.com/googleapis/python-bigquery/blob/079b6a162f6929bf801366d92f8daeb3318426c4/samples/snippets/view.py" track-metadata-xref-lang="PYTHON" track-metadata-xref-library="google.cloud.bigquery" track-metadata-xref-link-text="view" track-name="xrefLink" track-type="exampleCode"><span class="devsite-syntax-n">view</span></a><span class="devsite-syntax-o">.</span><span class="devsite-syntax-n">table_type</span><span class="devsite-syntax-si">}</span><span class="devsite-syntax-s2">: </span><span class="devsite-syntax-si">{</span><span class="devsite-syntax-nb">str</span><span class="devsite-syntax-p">(</span><a class="devsite-xref-link" href="https://docs.cloud.google.com/python/docs/reference/bigquery/latest/google.cloud.bigquery.dataset.AccessEntry.html#google_cloud_bigquery_dataset_AccessEntry_view" track-metadata-region-tag="bigquery_create_view" track-metadata-snippet-file-url="https://github.com/googleapis/python-bigquery/blob/079b6a162f6929bf801366d92f8daeb3318426c4/samples/snippets/view.py" track-metadata-xref-lang="PYTHON" track-metadata-xref-library="google.cloud.bigquery" track-metadata-xref-link-text="view" track-name="xrefLink" track-type="exampleCode"><span class="devsite-syntax-n">view</span></a><span class="devsite-syntax-o">.</span><span class="devsite-syntax-n">reference</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-si">}</span><span class="devsite-syntax-s2">"</span><span class="devsite-syntax-p">)</span></code></pre></devsite-code>
</div>



























  
  
</section>


  
  
  
  
  
  
  
  
  
  
</section>
</div>
<p>After you create the view, you <a href="/bigquery/docs/running-queries">query</a> it like
you query a table.</p>

<h2 id="view_security" data-text="View security" tabindex="-1">View security</h2>

<p>To control access to views in BigQuery, see
<a href="/bigquery/docs/authorized-views">Authorized views</a>.</p>

<h2 id="whats_next" data-text="What's next" tabindex="-1">What's next</h2>

<ul>
<li>For information about creating an authorized view, see
<a href="/bigquery/docs/authorized-views">Creating authorized views</a>.</li>
<li>For information about getting view metadata, see
<a href="/bigquery/docs/view-metadata">Getting information about views</a>.</li>
<li>For more information about managing views, see <a href="/bigquery/docs/managing-views">Managing views</a>.</li>
</ul>


  
  

  
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
