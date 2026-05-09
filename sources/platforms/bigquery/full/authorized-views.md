# BigQuery Authorized Views

- Source ID: `SRC-BIGQUERY-AUTHORIZED-VIEWS`
- URL: https://cloud.google.com/bigquery/docs/authorized-views
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

  
    
    
    
    <h1 id="authorized-views" data-text="Authorized views" tabindex="-1">Authorized views</h1>
    

<p>This document describes how to create authorized views and authorized
materialized views in BigQuery. As a data administrator, you can create
an <em>authorized view</em> to share a subset of data in a dataset to specific users
and groups (principals). Principals can view the data you share and run queries
on it, but they can&#39;t access the source dataset directly.</p>

<h3 id="view_types" data-text="View types" tabindex="-1">View types</h3>

<p>A logical view is the default view type for BigQuery, and
a materialized view is a precomputed view that periodically caches the results
of a query for increased performance and efficiency.</p>

<p>An authorized view for a logical view is called an authorized view, but an
authorized view for a materialized view is called an
<em>authorized materialized view</em>.</p>

<p>If a logical view relies on <a href="/bigquery/docs/materialized-views-intro#use_cases">a large or computationally expensive query</a>, then you can create a materialized view
instead. To understand the use cases of logical and materialized view, see
<a href="/bigquery/docs/logical-materialized-view-overview">Overview of logical and materialized views</a>.</p>

<h3 id="high-level_steps_for_creating_authorized_views" data-text="High-level steps for creating authorized views" tabindex="-1">High-level steps for creating authorized views</h3>

<p>To create and share a view, review these high-level steps, which are the same
for authorized logical views and authorized materialized views.</p>
<aside class="note"><strong>Note:</strong><span> You can also <a href="#share-all-views">share all views in a dataset</a>.</span></aside>


<ul>
<li>Create a dataset to contain your source data.</li>
<li>Run a query to load data into a destination table in the source dataset.</li>
<li>Create a dataset to contain your authorized view.</li>
<li>Create an authorized view from a SQL query that restricts the columns
that your data analysts can see in the query results.</li>
<li>Grant your data analysts permission to run query jobs.</li>
<li>Grant your data analysts access to the dataset that contains the authorized
view.</li>
<li>Grant the authorized view access to the source dataset.</li>
</ul>



<h2 id="alternatives" data-text="Alternatives" tabindex="-1">Alternatives</h2>

<p>Although authorized views are flexible and scalable, one of the following
methods might better apply to your use case:</p>

<ul>
<li>Set row-level policies on a table.</li>
<li>Set column-level policies on a table.</li>
<li>Store data in a separate table.</li>
<li>Share all views in a dataset (authorized datasets).</li>
</ul>

<h3 id="use_row-level_or_column-level_security_or_separate_tables" data-text="Use row-level or column-level security, or separate tables" tabindex="-1">Use row-level or column-level security, or separate tables</h3>

<p>By setting row-level access policies on a table, or by creating a separate table
to hold sensitive data, a data administrator can restrict a user&#39;s ability
to view that data. Storing data in a separate table isolates the data and
removes the ability to see how many rows exist in the table.</p>

<p>In addition, by creating and applying policy tags, a data administrator can
restrict the user&#39;s ability to view columns in a table.</p>

<p>Storing data in a separate table is the most secure but least flexible method.
Setting row-level policies is flexible and secure, while sharing authorized
views is flexible and provides the best performance.</p>

<p>To compare these methods in detail, see the following resources:</p>

<ul>
<li><a href="/bigquery/docs/row-level-security-intro#comparison_of_authorized_views_row-level_security_and_separate_tables">Comparison of authorized views, row-level security, and separate tables</a></li>
<li><a href="/bigquery/docs/row-level-security-intro">Introduction to row-level security</a></li>
<li><a href="/bigquery/docs/row-level-security-intro#example_use_cases">Example use cases for row-level security</a></li>
<li><a href="/bigquery/docs/column-level-security-intro">Introduction to column-level access control</a></li>
</ul>

<h3 id="share-all-views" data-text="Share all views in a dataset" tabindex="-1">Share all views in a dataset</h3>

<p>If you want to give a collection of views access to a dataset without having to
authorize each individual view, you can group the views together into a dataset,
and then give the dataset that contains the views access to the dataset that
contains the data.</p>

<p>You can then give principals access to the dataset
containing the group of views, or to individual views in the dataset, as
needed. A dataset that has access to another dataset is called an
<em>authorized dataset</em>. The dataset that authorizes another dataset to access its
data is called the <em>shared dataset</em>.</p>

<!-- This is a shared file used in the following pages:
   /bigquery/quotas#dataset_limits
   /bigquery/docs/authorized-views#quotas_and_limits.
   /bigquery/docs/authorized-datasets#authorized_datasets -->
<p>
  A dataset's access control list can have up to 2,500 total authorized
      resources, including
      <a href="/bigquery/docs/authorized-views">authorized views</a>,
      <a href="/bigquery/docs/authorized-datasets">authorized datasets</a>,
      and
      <a href="/bigquery/docs/authorized-functions">authorized functions</a>.

      If you exceed this limit due to a large number of authorized views, consider grouping the
      views into authorized datasets.

      As a best practice, group related views into authorized datasets when you design new
      BigQuery architectures, especially multi-tenant architectures.
</p>

<p>For more information, see <a href="/bigquery/docs/authorized-datasets">Authorized datasets</a>
and <a href="/bigquery/docs/authorized-datasets#authorize_a_dataset">Authorize a dataset</a>.</p>

<h2 id="limitations" data-text="Limitations" tabindex="-1">Limitations</h2>

<ul>
<li>When you make an authorized view or authorized materialized view in another
dataset, the source data dataset and authorized view dataset must be in
the same regional <a href="/bigquery/docs/locations">location</a>.</li>
<li>When you delete an authorized view, it can take up to 24 hours to remove
the authorized view from the list of views. During this time, you cannot access
the authorized view, but the deleted authorized view can appear in the list of
views, and counts against the <a href="/bigquery/quotas#dataset_limits">authorized view
limit</a>. This limit can prevent the creation of
additional authorized views if the new authorized view would exceed that limit.</li>
</ul>

<h2 id="before_you_begin" data-text="Before you begin" tabindex="-1">Before you begin</h2>

<p><a href="#required_permissions">Grant Identity and Access Management (IAM) roles</a>
that give users the necessary permissions
to query the authorized views or authorized materialized views that you share.</p>

<h3 id="vpcsc-and-views" data-text="Authorized views and VPC Service Controls" tabindex="-1">Authorized views and VPC Service Controls</h3>

<p>When using authorized views in a VPC Service Controls perimeter, ingress rules
allowing principals access to the project containing the view must also include
access to any projects that contain the source data from which the view is
accessing data. The principal does not need Identity and Access Management permissions on the
source data projects, but the ingress rule must permit access to
BigQuery in the data source project in addition to the project
containing the view.</p>

<h3 id="required_permissions" data-text="Required roles" tabindex="-1">Required roles</h3>

<p>To create or update an authorized view, you need permissions to the dataset that
contains the view and to the dataset that provides access to the view.</p>

<p>You also need to grant users or groups access to the project and dataset that
contain the view.</p>
<aside class="note"><strong>Note:</strong><span> You can&#39;t change the SQL query of an authorized view unless you&#39;re a data
owner.</span></aside>
<h4 id="admin_permissions_on_the_dataset_that_contains_the_view" data-text="Admin permissions on the dataset that contains the view" tabindex="-1">Admin permissions on the dataset that contains the view</h4>

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

<h4 id="admin_permissions_on_the_second_dataset_that_gives_access_to_the_view" data-text="Admin permissions on the second dataset that gives access to the view" tabindex="-1">Admin permissions on the second dataset that gives access to the view</h4>

<p>To update dataset properties, you need the following IAM permissions:</p>

<ul>
<li><code translate="no" dir="ltr">bigquery.datasets.update</code></li>
<li><code translate="no" dir="ltr">bigquery.datasets.setIamPolicy</code> (only required when updating dataset access
controls in the Google Cloud console)</li>
</ul>

<p>The <code translate="no" dir="ltr">roles/bigquery.dataOwner</code> predefined IAM role includes the
permissions that you need to update dataset properties.</p>

<p>Additionally, if you have the <code translate="no" dir="ltr">bigquery.datasets.create</code> permission, you can
update properties of the datasets that you create.</p>

<p>For more information on IAM roles and permissions in
BigQuery, see <a href="/bigquery/access-control">Predefined roles and permissions</a>.</p>

<h4 id="user_permissions_on_the_project_and_dataset_for_the_view" data-text="User permissions on the project and dataset for the view" tabindex="-1">User permissions on the project and dataset for the view</h4>

<p>To share an authorized view with users or groups, you must grant the users or
groups the following IAM permissions:</p>

<ul>
<li>The <code translate="no" dir="ltr">roles/bigquery.jobUser</code> IAM role to the project
that contains the authorized view. This role grants the <code translate="no" dir="ltr">bigquery.jobs.create</code>
permission which is required to run query jobs against the view.</li>
<li>The <code translate="no" dir="ltr">roles/bigquery.dataViewer</code> IAM role to the
dataset that contains the authorized view. This role grants the
<code translate="no" dir="ltr">bigquery.tables.getData</code> which is required to query the view.</li>
</ul>

<h2 id="work_with_authorized_views" data-text="Work with authorized views" tabindex="-1">Work with authorized views</h2>

<p>The following sections describe how to work with authorized views and authorized
materialized views.</p>

<h3 id="create_an_authorized_view" data-text="Create an authorized view" tabindex="-1">Create an authorized view</h3>

<p>To create an authorized view, choose one of the following options. For complete
steps to authorize, share, and delete an authorized view, see the
tutorial <a href="/bigquery/docs/create-authorized-views">Create an authorized view</a>.</p>
<div class="ds-selector-tabs" data-ds-scope="code-sample">
<section><h3 id="console" data-text=" Console " tabindex="-1"> Console </h3><ol>
<li><p>Go to the <strong>BigQuery</strong> page.</p>

<p><a href="https://console.cloud.google.com/bigquery" target="console" class="button button-primary">Go to BigQuery</a> </p></li>
<li><p>In the query editor, type the query that you want to base the
authorized view on.</p></li>
<li><p>Click <strong>Save</strong> <span aria-label="and then">></span> <strong>Save view</strong>.</p></li>
<li><p>In the <strong>Save view</strong> dialog, do the following:</p>

<ol>
<li><p>For <strong>Project</strong>, type the project in which to save the view.</p></li>
<li><p>For <strong>Dataset</strong>, type the dataset in which to save the view. This
must be a different dataset than the dataset used in the source
query.</p></li>
<li><p>For <strong>Table</strong>, type the name of the view.</p></li>
<li><p>Click <strong>Save</strong>.</p></li>
</ol></li>
<li><p>Grant
<a href="#user_permissions_on_the_project_and_dataset_for_the_view">necessary permissions</a>
to users who can use the authorized view.</p></li>
<li><p>In the <strong>Explorer</strong> pane, select the dataset used in the source query.</p></li>
<li><p>In the <strong>Details</strong> pane, click <strong>Sharing</strong> <span aria-label="and then">></span>
<strong>Authorize views</strong>.</p></li>
<li><p>In the <strong>Authorized views</strong> pane, for <strong>Authorized view</strong>, type
the fully qualified name of the view, in the format
<var translate="no">PROJECT_ID</var>.<var translate="no">DATASET_ID</var>.<var translate="no">VIEW_NAME</var>.</p></li>
<li><p>Click <strong>Add authorization</strong>.</p></li>
</ol></section>
<section><h3 id="terraform" data-text="Terraform" tabindex="-1">Terraform</h3><p>To authenticate to BigQuery, set up Application Default
Credentials. For more information, see
<a href="/bigquery/docs/authentication#client-libs">Set up authentication for client libraries</a>.</p>
<aside class="note"><strong>Note:</strong><span> To create BigQuery objects using Terraform, you must
enable the <a href="/resource-manager/reference/rest">Cloud Resource Manager API</a>.</span></aside>







  
  














  



<div class="github-docwidget-gitinclude-code">

  
    
  
  



















  




  



  


  <div></div><devsite-code><pre suppresswarning="suppresswarning" translate="no" class="lang-terraform devsite-click-to-copy"
       track-metadata-position="terraform-google-modules/terraform-docs-samples/bigquery/bigquery_authorized_view_tutorial/main.tf/HEAD/bigquery_authorized_view_tutorial"
       
       data-code-snippet="true"
       
       data-github-includecode-link="https://github.com/terraform-google-modules/terraform-docs-samples/blob/HEAD/bigquery/bigquery_authorized_view_tutorial/main.tf"
       track-metadata-snippet-file-url="https://github.com/terraform-google-modules/terraform-docs-samples/blob/HEAD/bigquery/bigquery_authorized_view_tutorial/main.tf"
       
       
       feedback-context="{&#34;language&#34;: &#34;terraform&#34;, &#34;region_tag&#34;: &#34;bigquery_authorized_view_tutorial&#34;, &#34;snippet_file_url&#34;: &#34;https://github.com/terraform-google-modules/terraform-docs-samples/blob/HEAD/bigquery/bigquery_authorized_view_tutorial/main.tf&#34;}"
       feedback-product="1634365"
       feedback-bucket="data-analytics"
       
       
       language="terraform"
       
       
       
       
       data-github-path="terraform-google-modules/terraform-docs-samples/bigquery/bigquery_authorized_view_tutorial/main.tf"
       
       
       data-git-revision="HEAD"
       
       
       data-region-tag="bigquery_authorized_view_tutorial"
       track-metadata-region-tag="bigquery_authorized_view_tutorial"
       
       
       
        dir="ltr" is-upgraded><code translate="no" dir="ltr"># Creates an authorized view.

# Create a dataset to contain the view.
resource &quot;google_bigquery_dataset&quot; &quot;view_dataset&quot; {
  dataset_id  = &quot;view_dataset&quot;
  description = &quot;Dataset that contains the view&quot;
  location    = &quot;us-west1&quot;
}

# Create the view to authorize.
resource &quot;google_bigquery_table&quot; &quot;movie_view&quot; {
  project     = google_bigquery_dataset.view_dataset.project
  dataset_id  = google_bigquery_dataset.view_dataset.dataset_id
  table_id    = &quot;movie_view&quot;
  description = &quot;View to authorize&quot;

  view {
    query          = &quot;SELECT item_id, avg(rating) FROM `movie_project.movie_dataset.movie_ratings` GROUP BY item_id ORDER BY item_id;&quot;
    use_legacy_sql = false
  }
}


# Authorize the view to access the dataset
# that the query data originates from.
resource &quot;google_bigquery_dataset_access&quot; &quot;view_authorization&quot; {
  project    = &quot;movie_project&quot;
  dataset_id = &quot;movie_dataset&quot;

  view {
    project_id = google_bigquery_table.movie_view.project
    dataset_id = google_bigquery_table.movie_view.dataset_id
    table_id   = google_bigquery_table.movie_view.table_id
  }
}

# Specify the IAM policy for principals that can access
# the authorized view. These users should already
# have the roles/bigqueryUser role at the project level.
data &quot;google_iam_policy&quot; &quot;principals_policy&quot; {
  binding {
    role = &quot;roles/bigquery.dataViewer&quot;
    members = [
      &quot;group:example-group@example.com&quot;,
    ]
  }
}

# Set the IAM policy on the authorized  view.
resource &quot;google_bigquery_table_iam_policy&quot; &quot;authorized_view_policy&quot; {
  project     = google_bigquery_table.movie_view.project
  dataset_id  = google_bigquery_table.movie_view.dataset_id
  table_id    = google_bigquery_table.movie_view.table_id
  policy_data = data.google_iam_policy.principals_policy.policy_data
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
</div>
<h3 id="manage_users_or_groups_for_authorized_views" data-text="Manage users or groups for authorized views" tabindex="-1">Manage users or groups for authorized views</h3>

<p>After authorizing a view, you can maintain access to it by completing the
following tasks for a dataset, table, or view:</p>

<ul>
<li>View the access policy.</li>
<li>Grant access.</li>
<li>Revoke access.</li>
<li>Deny access.</li>
</ul>

<p>For more information, see
<a href="/bigquery/docs/control-access-to-resources-iam">Control access to resources using IAM</a>.</p>

<h3 id="remove_authorization_to_a_view" data-text="Remove authorization to a view" tabindex="-1">Remove authorization to a view</h3>
<aside class="note"><strong>Note:</strong><span> If you remove a view, wait 24 hours before reusing the view name, or use
a unique name. For more information, see
<a href="#quotas_and_limits">Quotas and limits</a>.</span></aside>
<p>To remove authorization to a view, select one of the following options:</p>
<div class="ds-selector-tabs" data-ds-scope="code-sample">
<section><h3 id="console_1" data-text=" Console " tabindex="-1"> Console </h3><ol>
<li><p>Go to the BigQuery page in the Google Cloud console.</p>

<p><a href="https://console.cloud.google.com/bigquery" target="console" class="button button-primary">Go to BigQuery</a> </p></li>
<li><p>In the left pane, click <span class="material-icons" aria-hidden="true" translate="no">explore</span> <strong>Explorer</strong>:</p>

<p><img alt="Highlighted button for the Explorer pane." src="/static/bigquery/images/explorer-tab.png" class="screenshot" width="80%"></p>

<p>If you don&#39;t see the left pane, click <span class="material-icons" aria-hidden="true" translate="no">last_page</span> <strong>Expand left pane</strong> to open the pane.</p></li>
<li><p>In the <strong>Explorer</strong> pane, expand your project, click <strong>Datasets</strong>, and
then select a dataset.</p></li>
<li><p>Click <strong>Overview <span aria-label="and then">></span> Tables</strong>, and then select a table.</p></li>
<li><p>Click <span class="material-icons" aria-hidden="true" translate="no">person_add</span>
<strong>Sharing</strong> <span aria-label="and then">></span> <strong>Authorize views</strong>.</p></li>
<li><p>Click <span class="material-icons" aria-hidden="true" translate="no">delete</span>
to <strong>Remove authorization</strong>.</p></li>
<li><p>Click <strong>Close</strong>.</p></li>
</ol></section>
<section><h3 id="bq" data-text=" bq " tabindex="-1"> bq </h3><p>To remove authorization from a view, use the <code translate="no" dir="ltr">bq rm</code> command. Enter
the <code translate="no" dir="ltr">table_id</code> for the view you want to remove authorization from.</p>

<div></div><devsite-code><pre class="devsite-click-to-copy notranslate" dir="ltr" is-upgraded syntax="Bash"><span class="devsite-syntax-w">    </span>bq<span class="devsite-syntax-w"> </span>rm<span class="devsite-syntax-w"> </span><span class="devsite-syntax-se">\</span>
<span class="devsite-syntax-w">    </span><var translate="no">project_id:dataset:table_id</var>
<span class="devsite-syntax-w">    </span></pre></devsite-code></section>
<section><h3 id="api" data-text=" API " tabindex="-1"> API </h3><p>Call the <a href="/bigquery/docs/reference/rest/v2/tables/delete"><code translate="no" dir="ltr">tables.delete</code></a>
method and use the <code translate="no" dir="ltr">projectID</code>,<code translate="no" dir="ltr">datasetID</code>, and <code translate="no" dir="ltr">tableID</code> properties to
remove the authorized view for your dataset. For more information, see
<a href="/bigquery/docs/reference/rest/v2/tables">Tables</a>.</p></section>
</div>
<h2 id="quotas_and_limits" data-text="Quotas and limits" tabindex="-1">Quotas and limits</h2>

<ul>
<li>Authorized views are subject to dataset limits. For more information, see
<a href="/bigquery/quotas#dataset_limits">Dataset limits</a>.</li>
<li>If you remove an authorized view, it can take up to 24 hours for all
references to the view to be removed from the system. To avoid errors,
either wait 24 hours before reusing the name of a removed view, or create a
unique name for your view.</li>
</ul>

<h2 id="advanced_topics" data-text="Advanced topics" tabindex="-1">Advanced topics</h2>

<p>The following sections describe advanced methods of using authorized views.</p>

<h3 id="combine_row-level_security_with_authorized_views" data-text="Combine row-level security with authorized views" tabindex="-1">Combine row-level security with authorized views</h3>

<p>The data displayed in a logical view or a materialized view is filtered
according to the underlying source table&#39;s row-level access policies.</p>

<p>For details about how row-level security interacts with materialized views, see
<a href="/bigquery/docs/using-row-level-security-with-features#logical_materialized_and_authorized_views">Use row-level security with other BigQuery features</a>.</p>

<h3 id="combine_column-level_security_with_authorized_views" data-text="Combine column-level security with authorized views" tabindex="-1">Combine column-level security with authorized views</h3>

<p>The impact of column-level security on views is independent of whether or not
the view is an authorized view.</p>

<p>For a detailed description of how permissions are applied, see
<a href="/bigquery/docs/column-level-security-intro#views">Query views</a> for column-level
security.</p>

<h3 id="use-analytics-hub" data-text="Use BigQuery sharing with authorized views" tabindex="-1">Use BigQuery sharing with authorized views</h3>

<p>BigQuery sharing (formerly Analytics Hub) is a data exchange platform with the following
capabilities:</p>

<ul>
<li>Lets you share data and insights at scale across organizational boundaries.</li>
<li>Uses a robust security and privacy framework.</li>
<li>Supports publishing a BigQuery dataset, called a
<em>shared dataset</em>, and its associated authorized views and authorized datasets,
to a set of subscribers.</li>
</ul>

<p>A <em>linked dataset</em> is a read-only BigQuery dataset that serves as
a pointer or reference to a shared dataset. Subscribing to a
Sharing <em>listing</em> creates a linked dataset in your project
but not a copy of the dataset, so subscribers can read the data but cannot add
or update objects within it.</p>

<p>Materialized views that refer to tables in the linked dataset are
<a href="/bigquery/docs/analytics-hub-introduction#limitations">not supported</a>.</p>

<p>For more information, see
<a href="/bigquery/docs/analytics-hub-introduction">Introduction to Sharing</a>.</p>

<h2 id="whats_next" data-text="What's next" tabindex="-1">What's next</h2>

<ul>
<li>For a tutorial on creating an authorized view, see
<a href="/bigquery/docs/create-authorized-views">Create an authorized view</a>.</li>
<li>To create a logical view, see <a href="/bigquery/docs/views">Create logical views</a>.</li>
<li>To create a materialized view, which supports other types of access control,
see <a href="/bigquery/docs/materialized-views-create#access_control">Create materialized views</a>.</li>
<li>To get view metadata, see
<a href="/bigquery/docs/view-metadata">Getting information about views</a>.</li>
<li>To manage views, see <a href="/bigquery/docs/managing-views">Manage views</a>.</li>
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
