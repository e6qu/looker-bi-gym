# BigQuery INFORMATION_SCHEMA JOBS View

- Source ID: `SRC-BIGQUERY-JOBS`
- URL: https://cloud.google.com/bigquery/docs/information-schema-jobs
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

  
    
    
    
    <h1 id="jobs-view" data-text="JOBS view" tabindex="-1">JOBS view</h1>
    

<p>The <code translate="no" dir="ltr">INFORMATION_SCHEMA.JOBS</code> view contains near real-time metadata about all
BigQuery jobs in the current project.</p>
<aside class="note"><strong>Note:</strong><span> The view names <code translate="no" dir="ltr">INFORMATION_SCHEMA.JOBS</code> and <code translate="no" dir="ltr">INFORMATION_SCHEMA.JOBS_BY_PROJECT</code>
are synonymous and can be used interchangeably.</span></aside>
<h2 id="required_role" data-text="Required role" tabindex="-1">Required role</h2>















  
  
  

































  
  

  
  
    
    
    
    
    
    
      
      
        
        
      
      
    
    
    
    
    
  




  








  
  
  
  
  
  
    
    
    
    
  
    
    
    
    
      
      
      
      
      
      
        
        
          
          
          
          
        
        
      
      
      
      
      
    
  








  



  <p>
    
      To get the permission that
      you need to query the <code translate="no" dir="ltr">INFORMATION_SCHEMA.JOBS</code> view,
    
      ask your administrator to grant you the
    <a href="/iam/docs/roles-permissions/bigquery#bigquery.resourceViewer">BigQuery Resource Viewer </a> (<code translate="no" dir="ltr">roles/bigquery.resourceViewer</code>) IAM role on your project.
  

  

  
  
  For more information about granting roles, see <a href="/iam/docs/granting-changing-revoking-access">Manage access to projects, folders, and organizations</a>.
  
  </p>

  
    <p>
      
        This predefined role contains the
        <code translate="no" dir="ltr">bigquery.jobs.listAll</code>
        permission,
         which is required to
        query the <code translate="no" dir="ltr">INFORMATION_SCHEMA.JOBS</code> view.
      
    
  
  
    
      <p>
        You might also be able to get
          this permission
        with <a href="/iam/docs/creating-custom-roles">custom roles</a> or
        other <a href="/iam/docs/roles-overview#predefined">predefined roles</a>.
      </p>
      
      

  

 
























<p>For more information about BigQuery permissions, see
<a href="/bigquery/docs/access-control" track-type="article" track-name="internalLink" track-metadata-position="body">Access control with IAM</a>.</p>

<h2 id="schema" data-text="Schema" tabindex="-1">Schema</h2>

<p>The underlying data is partitioned by the <code translate="no" dir="ltr">creation_time</code> column and clustered
by <code translate="no" dir="ltr">project_id</code> and <code translate="no" dir="ltr">user_email</code>. The <code translate="no" dir="ltr">query_info</code> column contains
additional information about your query jobs.</p>

<p>The <code translate="no" dir="ltr">INFORMATION_SCHEMA.JOBS</code> view has the following schema:</p>


<table>
  <thead>
    <tr>
      <th width="35"><b>Column name</b></th>
      <th width="15"><b>Data type</b></th>
      <th width="50"><b>Value</b></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no" dir="ltr">bi_engine_statistics</code></td>
      <td><code translate="no" dir="ltr">RECORD</code></td>
      <td>
        If the project is configured to use the <a
        href="https://cloud.google.com/bigquery/docs/bi-engine-intro">BI
        Engine</a>, then this field contains <a
        href="https://cloud.google.com/bigquery/docs/reference/rest/v2/Job#bienginestatistics">BiEngineStatistics</a>.
        Otherwise <code translate="no" dir="ltr">NULL</code>.
      </td>
    </tr>
    <tr>
      <td><code translate="no" dir="ltr">cache_hit</code></td>
      <td><code translate="no" dir="ltr">BOOLEAN</code></td>
      <td>Whether the query results of this job were from a cache.
        If you have a <a href="/bigquery/docs/multi-statement-queries">multi-query statement
        job</a>, <code translate="no" dir="ltr">cache_hit</code> for your parent query is
        <code translate="no" dir="ltr">NULL</code>.
      </td>
    </tr>
    <tr>
      <td><code translate="no" dir="ltr">creation_time</code></td>
      <td><code translate="no" dir="ltr">TIMESTAMP</code></td>
      <td>
        (<i>Partitioning column</i>) Creation time of this job. Partitioning is
        based on the UTC time of this timestamp.</td>
    </tr>
    <tr>
      <td><code translate="no" dir="ltr">destination_table</code></td>
      <td><code translate="no" dir="ltr">RECORD</code></td>
      <td>
        Destination <a
        href="https://cloud.google.com/bigquery/docs/reference/rest/v2/TableReference">table</a>
        for results, if any.
      </td>
    </tr>
    
    <tr>
      <td><code translate="no" dir="ltr">dml_statistics</code></td>
      <td><code translate="no" dir="ltr">RECORD</code></td>
      <td>
        If the job is a query with a DML statement, the value is a record with the
        following fields:<br/>
        <ul>
          <li><code translate="no" dir="ltr">inserted_row_count</code>: The number of rows that were inserted.</li>
          <li><code translate="no" dir="ltr">deleted_row_count</code>: The number of rows that were deleted.</li>
          <li><code translate="no" dir="ltr">updated_row_count</code>: The number of rows that were updated.</li>
        </ul>
          For all other jobs, the value is <code translate="no" dir="ltr">NULL</code>.<br/>
          This column is present in the <code translate="no" dir="ltr">INFORMATION_SCHEMA.JOBS_BY_USER</code> and
          <code translate="no" dir="ltr">INFORMATION_SCHEMA.JOBS_BY_PROJECT</code> views.
      </td>
    </tr>
    
    <tr>
      <td><code translate="no" dir="ltr">end_time</code></td>
      <td><code translate="no" dir="ltr">TIMESTAMP</code></td>
      <td>The end time of this job, in milliseconds since the epoch. This field represents the
        time when the job enters the <code translate="no" dir="ltr">DONE</code> state.</td>
    </tr>
    <tr>
      <td><code translate="no" dir="ltr">error_result</code></td>
      <td><code translate="no" dir="ltr">RECORD</code></td>
      <td>
        Details of any errors as <a
        href="https://cloud.google.com/bigquery/docs/reference/rest/v2/ErrorProto">ErrorProto</a> objects.
      </td>
    </tr>
    
    <tr>
      <td><code translate="no" dir="ltr">job_creation_reason.code</code></td>
      <td><code translate="no" dir="ltr">STRING</code></td>
      <td>
        Specifies the high level reason why a job was created.<br>
        Possible values are:
        <ul>
          <li><code translate="no" dir="ltr">REQUESTED</code>: job creation was requested.</li>
          <li><code translate="no" dir="ltr">LONG_RUNNING</code>: the query request ran beyond a system defined timeout
            specified by the
            <a href=https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/jobs/query#queryrequest>timeoutMs
            field in the <code translate="no" dir="ltr">QueryRequest</code></a>. As a result it was considered a long running
            operation for which a job was created.</li>
          <li><code translate="no" dir="ltr">LARGE_RESULTS</code>: the results from the query cannot fit in the in-line
            response.</li>
          <li><code translate="no" dir="ltr">OTHER</code>: the system has determined that the query needs to be executed as a
            job.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><code translate="no" dir="ltr">job_id</code></td>
      <td><code translate="no" dir="ltr">STRING</code></td>
      <td>The ID of the job if a job was created. Otherwise, the query ID of a query using optional
        job creation mode. For example, <code translate="no" dir="ltr">bquxjob_1234</code>.</td>
    </tr>
    <tr>
      <td><code translate="no" dir="ltr">job_stages</code></td>
      <td><code translate="no" dir="ltr">RECORD</code></td>
      <td>
        <a href="https://cloud.google.com/bigquery/docs/reference/rest/v2/Job#ExplainQueryStage">Query
          stages</a> of the job.

        <p><b>Note</b>: This column's values are empty for queries that read from tables with
          row-level access policies. For more information, see <a
          href="/bigquery/docs/best-practices-row-level-security">best practices for row-level
          security in BigQuery.</a>
      </td>
    </tr>
    <tr>
      <td><code translate="no" dir="ltr">job_type</code></td>
      <td><code translate="no" dir="ltr">STRING</code></td>
      <td>
        The type of the job. Can be <code translate="no" dir="ltr">QUERY</code>, <code translate="no" dir="ltr">LOAD</code>, <code translate="no" dir="ltr">EXTRACT</code>,
        <code translate="no" dir="ltr">COPY</code>, or <code translate="no" dir="ltr">NULL</code>. A <code translate="no" dir="ltr">NULL</code> value indicates a background
        job.
      </td>
    </tr>
    <tr>
      <td><code translate="no" dir="ltr">labels</code></td>
      <td><code translate="no" dir="ltr">RECORD</code></td>
      <td>Array of labels applied to the job as key-value pairs.</td>
    </tr>
    <tr>
      <td><code translate="no" dir="ltr">parent_job_id</code></td>
      <td><code translate="no" dir="ltr">STRING</code></td>
      <td>ID of the parent job, if any.</td>
    </tr>
    <tr>
      <td><code translate="no" dir="ltr">priority</code></td>
      <td><code translate="no" dir="ltr">STRING</code></td>
      <td>The priority of this job. Valid values include <code translate="no" dir="ltr">INTERACTIVE</code> and
      <code translate="no" dir="ltr">BATCH</code>.</td>
    </tr>
    <tr>
      <td><code translate="no" dir="ltr">project_id</code></td>
      <td><code translate="no" dir="ltr">STRING</code></td>
      <td>(<i>Clustering column</i>) The ID of the project.</td>
    </tr>
    <tr>
      <td><code translate="no" dir="ltr">project_number</code></td>
      <td><code translate="no" dir="ltr">INTEGER</code></td>
      <td> The number of the project.</td>
    </tr>
    
    <tr>
      <td><code translate="no" dir="ltr">query</code></td>
      <td><code translate="no" dir="ltr">STRING</code></td>
      <td>SQL query text.</td>
    </tr>
    
    <tr>
      <td><code translate="no" dir="ltr">referenced_tables</code></td>
      <td><code translate="no" dir="ltr">RECORD</code></td>
      <td>
        Array of <code translate="no" dir="ltr">STRUCT</code> values
        that contain the following <code translate="no" dir="ltr">STRING</code> fields for each table referenced by the query:
        <code translate="no" dir="ltr">project_id</code>, <code translate="no" dir="ltr">dataset_id</code>, and <code translate="no" dir="ltr">table_id</code>. Only populated
        for query jobs that are not cache hits.
      </td>
    </tr>
    <tr>
      <td><code translate="no" dir="ltr">reservation_id</code></td>
      <td><code translate="no" dir="ltr">STRING</code></td>
      <td>
        Name of the primary reservation assigned to this job,
        in the format
        <code translate="no" dir="ltr">RESERVATION_ADMIN_PROJECT:RESERVATION_LOCATION.RESERVATION_NAME</code>.<br>
        In this output:
        <ul>
          <li><code translate="no" dir="ltr">RESERVATION_ADMIN_PROJECT</code>: the name of the Google Cloud project that
            administers the reservation</li>
          <li><code translate="no" dir="ltr">RESERVATION_LOCATION</code>: the location of the reservation</li>
          <li><code translate="no" dir="ltr">RESERVATION_NAME</code>: the name of the reservation</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><code translate="no" dir="ltr">edition</code></td>
      <td><code translate="no" dir="ltr">STRING</code></td>
      <td>The edition associated with the reservation assigned to this job. For more information about editions, see <a href="/bigquery/docs/editions-intro">Introduction to BigQuery editions</a>.</td>
    </tr>
    <tr>
      <td><code translate="no" dir="ltr">session_info</code></td>
      <td><code translate="no" dir="ltr">RECORD</code></td>
      <td>
        Details about the <a
        href="https://cloud.google.com/bigquery/docs/sessions-intro">session</a>
        in which this job ran, if any.
      </td>
    </tr>
    <tr>
      <td><code translate="no" dir="ltr">start_time</code></td>
      <td><code translate="no" dir="ltr">TIMESTAMP</code></td>
      <td>The start time of this job, in milliseconds since the epoch. This field represents the
        time when the job transitions from the <code translate="no" dir="ltr">PENDING</code> state to either
        <code translate="no" dir="ltr">RUNNING</code> or <code translate="no" dir="ltr">DONE</code>.</td>
    </tr>
    <tr>
      <td><code translate="no" dir="ltr">state</code></td>
      <td><code translate="no" dir="ltr">STRING</code></td>
      <td>
        Running state of the job. Valid states include <code translate="no" dir="ltr">PENDING</code>, <code translate="no" dir="ltr">RUNNING</code>, and
        <code translate="no" dir="ltr">DONE</code>.
      </td>
    </tr>
    <tr>
      <td><code translate="no" dir="ltr">statement_type</code></td>
      <td><code translate="no" dir="ltr">STRING</code></td>
      <td>
        The type of query statement. For example, <code translate="no" dir="ltr">DELETE</code>, <code translate="no" dir="ltr">INSERT</code>,
        <code translate="no" dir="ltr">SCRIPT</code>, <code translate="no" dir="ltr">SELECT</code>, or <code translate="no" dir="ltr">UPDATE</code>. See <a
        href="https://cloud.google.com/bigquery/docs/reference/auditlogs/rest/Shared.Types/BigQueryAuditMetadata.QueryStatementType">QueryStatementType</a>
        for list of valid values.
      </td>
    </tr>
    <tr>
      <td><code translate="no" dir="ltr">timeline</code></td>
      <td><code translate="no" dir="ltr">RECORD</code></td>
      <td><a
      href="https://cloud.google.com/bigquery/docs/reference/rest/v2/Job#QueryTimelineSample">Query
      timeline</a> of the job. Contains snapshots of query execution.</td>
    </tr>
    <tr>
      <td><code translate="no" dir="ltr">total_bytes_billed</code></td>
      <td><code translate="no" dir="ltr">INTEGER</code></td>
      <td>
        If the project is configured to use <a
        href="https://cloud.google.com/bigquery/pricing#analysis_pricing_models">on-demand
        pricing</a>, then this field contains the total bytes billed for the
        job. If the project is configured to use <a
        href="https://cloud.google.com/bigquery/pricing#analysis_pricing_models">flat-rate
        pricing</a>, then you are not billed for bytes and this field is
        informational only.

        <p><b>Note</b>: This column's values are empty for queries that read from tables with
          row-level access policies. For more information, see <a
          href="/bigquery/docs/best-practices-row-level-security">best practices for row-level
          security in BigQuery.</a>
      </td>
    </tr>
    <tr>
      <td><code translate="no" dir="ltr">total_bytes_processed</code></td>
      <td><code translate="no" dir="ltr">INTEGER</code></td>
      <td>
        <p>Total bytes processed by the job.

        <p><b>Note</b>: This column's values are empty for queries that read from tables with
          row-level access policies. For more information, see <a
          href="/bigquery/docs/best-practices-row-level-security">best practices for row-level
          security in BigQuery.</a>
      </td>
    </tr>
    <tr>
      <td><code translate="no" dir="ltr">total_modified_partitions</code></td>
      <td><code translate="no" dir="ltr">INTEGER</code></td>
      <td>
        The total number of partitions the job modified. This field is
        populated for <code translate="no" dir="ltr">LOAD</code> and <code translate="no" dir="ltr">QUERY</code> jobs.
      </td>
    </tr>
    <tr>
      <td><code translate="no" dir="ltr">total_slot_ms</code></td>
      <td><code translate="no" dir="ltr">INTEGER</code></td>
      <td>Slot milliseconds for the job over its entire duration in the <code translate="no" dir="ltr">RUNNING</code> state,
        including retries.</td>
    </tr>
    <tr>
      <td><code translate="no" dir="ltr">total_services_sku_slot_ms</code></td>
      <td><code translate="no" dir="ltr">INTEGER</code></td>
      <td>Total slot milliseconds for the job that runs on external services and is billed on the
        services SKU. This field is only populated for jobs that have external service costs, and is
        the total of the usage for costs whose billing method is <code translate="no" dir="ltr">"SERVICES_SKU"</code>.</td>
    </tr>
    <tr>
      <td><code translate="no" dir="ltr">transaction_id</code></td>
      <td><code translate="no" dir="ltr">STRING</code></td>
      <td>
        ID of the <a
        href="https://cloud.google.com/bigquery/docs/transactions">transaction</a>
        in which this job ran, if any.
      </td>
    </tr>
    <tr>
      <td><code translate="no" dir="ltr">user_email</code></td>
      <td><code translate="no" dir="ltr">STRING</code></td>
      <td>
        (<i>Clustering column</i>) Email address or service account of the user who
        ran the job.
      </td>
    </tr>
    <tr>
      <td><code translate="no" dir="ltr">principal_subject</code></td>
      <td><code translate="no" dir="ltr">STRING</code></td>
      <td>
        A string representation of the identity of the principal that ran the job.
      </td>
    </tr>
    <tr>
      <td><code translate="no" dir="ltr">query_info.resource_warning</code></td>
      <td><code translate="no" dir="ltr">STRING</code></td>
      <td>
        The warning message that appears if the resource usage during query processing is above the internal threshold of the system. <br/>A successful query job can have the <code translate="no" dir="ltr">resource_warning</code> field populated. With <code translate="no" dir="ltr">resource_warning</code>, you get additional data points to optimize your queries and to set up monitoring for performance trends of an equivalent set of queries by using <code translate="no" dir="ltr">query_hashes</code>.
      </td>
    </tr>
    <tr>
      <td><code translate="no" dir="ltr">query_info.query_hashes.normalized_literals</code></td>
      <td><code translate="no" dir="ltr">STRING</code></td>
      <td>
        Contains the hash value of the query. <code translate="no" dir="ltr">normalized_literals</code> is a hexadecimal
        <code translate="no" dir="ltr">STRING</code> hash that ignores comments, parameter values, UDFs, and literals.
        The hash value will differ when underlying views change, or if the query implicitly
        references columns, such as <code translate="no" dir="ltr">SELECT *</code>, and the table schema changes.
        <br/>
        This field appears for successful <a href="/bigquery/docs/reference/standard-sql/query-syntax">GoogleSQL</a> queries that are not cache hits.
      </td>
    </tr>
    <tr>
      <td><code translate="no" dir="ltr">query_info.performance_insights</code></td>
      <td><code translate="no" dir="ltr">RECORD</code></td>
      <td>
        <a href="https://cloud.google.com/bigquery/docs/reference/rest/v2/Job#PerformanceInsights">Performance insights</a> for the job.
      </td>
    </tr>
    <tr>
      <td><code translate="no" dir="ltr">query_info.optimization_details</code></td>
      <td><code translate="no" dir="ltr">STRUCT</code></td>
      <td>
        The <a href="/bigquery/docs/history-based-optimizations">history-based optimizations</a>
        for the job. Only the <code translate="no" dir="ltr">JOBS_BY_PROJECT</code> view has this column.
      </td>
    </tr>
    <tr>
      <td><code translate="no" dir="ltr">transferred_bytes</code></td>
      <td><code translate="no" dir="ltr">INTEGER</code></td>
      <td>Total bytes transferred for cross-cloud queries, such as BigQuery Omni cross-cloud transfer jobs.</td>
    </tr>
    <tr>
      <td><code translate="no" dir="ltr">materialized_view_statistics</code></td>
      <td><code translate="no" dir="ltr">RECORD</code></td>
      <td>
        <a href="/bigquery/docs/reference/rest/v2/Job#MaterializedViewStatistics">Statistics of
        materialized views</a> considered in a query job. (<a
        href="https://cloud.google.com/products#product-launch-stages">Preview</a>)
      </td>
    </tr>
    <tr>
      <td><code translate="no" dir="ltr">metadata_cache_statistics</code></td>
      <td><code translate="no" dir="ltr">RECORD</code></td>
      <td>
        <a href="/bigquery/docs/reference/rest/v2/Job#metadatacachestatistics">Statistics for metadata column index usage for tables</a> referenced in a query job.
      </td>
    </tr>
    <tr>
      <td><code translate="no" dir="ltr">search_statistics</code></td>
      <td><code translate="no" dir="ltr">RECORD</code></td>
      <td>
        <a href="/bigquery/docs/reference/rest/v2/Job#SearchStatistics">Statistics for a search
        query.</a>
      </td>
    </tr>
    <tr>
      <td><code translate="no" dir="ltr">query_dialect</code></td>
      <td><code translate="no" dir="ltr">STRING</code></td>
      <td>
      This field will be available sometime in May, 2025.
      The query dialect used for the job. Valid values include: <br>
      <ul>
        <li><code translate="no" dir="ltr">GOOGLE_SQL</code>: Job was requested to use GoogleSQL.</li>
        <li><code translate="no" dir="ltr">LEGACY_SQL</code>: Job was requested to use LegacySQL.</li>
        <li><code translate="no" dir="ltr">DEFAULT_LEGACY_SQL</code>: No query dialect was specified in the job request.
            BigQuery used the default value of LegacySQL.</li>
        <li><code translate="no" dir="ltr">DEFAULT_GOOGLE_SQL</code>: No query dialect was specified in the job request.
            BigQuery used the default value of GoogleSQL.</li>
      </ul>
      <p>For jobs submitted by users, this field is only populated for query jobs.
         The default selection of query dialect can be controlled by the
         <a href="/bigquery/docs/default-configuration#configuration-settings">configuration settings</a>.</p>
      <p>For background jobs, the value of this field isn't controlled by the default query dialect
         configuration settings, and doesn't impact jobs submitted by users. For some
         background jobs, the value is omitted.</p>
      </td>
    </tr>
    <tr>
      <td><code translate="no" dir="ltr">continuous</code></td>
      <td><code translate="no" dir="ltr">BOOLEAN</code></td>
      <td>Whether the job is a <a
        href="https://cloud.google.com/bigquery/docs/continuous-queries-introduction">continuous query</a>.</td>
    </tr>
    <tr>
      <td><code translate="no" dir="ltr">continuous_query_info.output_watermark</code></td>
      <td><code translate="no" dir="ltr">TIMESTAMP</code></td>
      <td>Represents the point up to which the continuous query has successfully processed data.</td>
    </tr>
    <tr>
      <td><code translate="no" dir="ltr">vector_search_statistics</code></td>
      <td><code translate="no" dir="ltr">RECORD</code></td>
      <td>
        <a href="/bigquery/docs/reference/rest/v2/Job#VectorSearchStatistics">Statistics for a vector
          search query.</a>
      </td>
    </tr>
    <tr>
      <td><code translate="no" dir="ltr">external_service_costs</code></td>
      <td><code translate="no" dir="ltr">RECORD</code></td>
      <td>
        An array of information about the external service costs for a query job.
      </td>
    </tr>
  </tbody>
</table>

<p>When you query <code translate="no" dir="ltr">INFORMATION_SCHEMA.JOBS</code> to find a summary cost
of query jobs, exclude the <code translate="no" dir="ltr">SCRIPT</code> statement type,
otherwise some values might be counted twice. The <code translate="no" dir="ltr">SCRIPT</code> row includes
summary values for all child jobs that were executed as part of this job.</p>

<p>For stability, we recommend that you explicitly list columns in your information schema queries instead of
using a wildcard (<code translate="no" dir="ltr">SELECT *</code>). Explicitly listing columns prevents queries from
breaking if the underlying schema changes.</p>

<h2 id="multi-statement_query_jobs" data-text="Multi-statement query jobs" tabindex="-1">Multi-statement query jobs</h2>

<p>A multi-statement query job is a query job that uses the <a href="/bigquery/docs/reference/standard-sql/procedural-language">procedural
language</a>.
Multi-statement query jobs often define variables with <code translate="no" dir="ltr">DECLARE</code> or have control
flow statements such as <code translate="no" dir="ltr">IF</code> or <code translate="no" dir="ltr">WHILE</code>. When you query
<code translate="no" dir="ltr">INFORMATION_SCHEMA.JOBS</code>, you might need to recognize the difference between a
multi-statement query job and other jobs. A multi-statement query job has the
following traits:</p>

<ul>
<li><code translate="no" dir="ltr">statement_type</code> = <code translate="no" dir="ltr">SCRIPT</code></li>
<li><code translate="no" dir="ltr">reservation_id</code> = <code translate="no" dir="ltr">NULL</code></li>
</ul>

<h3 id="child_jobs" data-text="Child jobs" tabindex="-1">Child jobs</h3>

<p>Each of a multi-statement query job&#39;s child jobs has a <code translate="no" dir="ltr">parent_job_id</code> pointing
to the multi-statement query job itself. This includes summary values for all
child jobs that were executed as part of this job.</p>

<p>If you query <code translate="no" dir="ltr">INFORMATION_SCHEMA.JOBS</code> to find a summary cost of query jobs,
then you should exclude the <code translate="no" dir="ltr">SCRIPT</code> statement type. Otherwise, some values such
as <code translate="no" dir="ltr">total_slot_ms</code> might be counted twice.</p>

<h2 id="data_retention" data-text="Data retention" tabindex="-1">Data retention</h2>

<p>This view displays running jobs along with job history for the past 180 days.
If a project migrates to an organization (either from having no organization or
from a different one), job information predating the migration date isn&#39;t
accessible through the <code translate="no" dir="ltr">INFORMATION_SCHEMA.JOBS</code> view, as the view only
retains data starting from the migration date.</p>

<h2 id="scope_and_syntax" data-text="Scope and syntax" tabindex="-1">Scope and syntax</h2>

<p>Queries against this view must include a <a href="/bigquery/docs/information-schema-intro#syntax">region qualifier</a>.
The following table explains the region scope for this view:</p>

<table>
  <tr>
    <th>View name</th>
    <th>Resource scope</th>
    <th>Region scope</th>
  </tr>
    <tr>
  <td><code translate="no" dir="ltr">[<var translate="no">PROJECT_ID</var>.]`region-<var translate="no">REGION</var>`.INFORMATION_SCHEMA.JOBS[_BY_PROJECT]</code></td>
  <td>Project level </td>
  <td><code translate="no" dir="ltr"><var translate="no">REGION</var></code></td>
  </tr>
</table>


Replace the following:
<ul>

<li>
  Optional: <code translate="no" dir="ltr"><var translate="no">PROJECT_ID</var></code>: the ID of your
  Google Cloud project. If not specified, the default project is used.
</li>


<li>
  <code translate="no" dir="ltr"><var translate="no">REGION</var></code>: any <a href="/bigquery/docs/locations">dataset region name</a>.
  For example, <code translate="no" dir="ltr">`region-us`</code>.</p>

<p><aside class="note"><b>Note:</b> You must use <a href="/bigquery/docs/information-schema-intro#region_qualifier">a region qualifier</a>
   to query <code translate="no" dir="ltr">INFORMATION_SCHEMA</code> views. The location of the query
   execution must match the region of the <code translate="no" dir="ltr">INFORMATION_SCHEMA</code> view.
   </aside>
</li>

</ul></p>

<h2 id="dry_run_query_estimates" data-text="Dry run query estimates" tabindex="-1">Dry run query estimates</h2>

<p>When you perform a dry run of a query that references the
<code translate="no" dir="ltr">INFORMATION_SCHEMA.JOBS</code> view, the estimated bytes processed might be
significantly higher than the actual bytes processed during query execution.</p>

<p>This overestimation occurs because the dry run calculation only accounts for
filters on the <code translate="no" dir="ltr">creation_time</code> partitioning column of the underlying data. It
doesn&#39;t account for filters on <a href="#schema">clustering columns</a>—like the implicit
<code translate="no" dir="ltr">project_id</code> filter or the <code translate="no" dir="ltr">user_email</code> filter—if specified in the <code translate="no" dir="ltr">WHERE</code> clause.
The actual data scanned can be significantly less than the dry run estimate,
especially for projects or users with fewer jobs.</p>

<p>If you don&#39;t specify a filter on <code translate="no" dir="ltr">creation_time</code>, partition pruning doesn&#39;t
occur, and the dry run estimate reflects a scan of all partitions of the
underlying data. However, data clustering might still reduce the actual bytes
processed compared to this estimate.</p>

<h2 id="examples" data-text="Examples" tabindex="-1">Examples</h2>




<p>To run the query against a project other than your default project, add the
project ID in the following format:
 <div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="Bash">&#96;<var translate="no">PROJECT_ID</var>&#96;.&#96;region-<var translate="no">REGION_NAME</var>&#96;.INFORMATION_SCHEMA.JOBS</pre></devsite-code>
Replace the following:</p>

<ul>
<li><code translate="no" dir="ltr"><var translate="no">PROJECT_ID</var></code>: the ID of the project.</li>
<li><code translate="no" dir="ltr"><var translate="no">REGION_NAME</var></code>: the region for your project.</li>
</ul>

<p>For example, <code translate="no" dir="ltr">&#96;myproject&#96;.&#96;region-us-central1&#96;.INFORMATION_SCHEMA.JOBS</code>.</p>
<aside class="note"><strong>Note:</strong><span> For maximum query efficiency, filter on the <code translate="no" dir="ltr">creation_time</code> column
whenever possible. This allows BigQuery to prune partitions,
which improves query performance and reduces costs.</span></aside>
<h3 id="compare_on-demand_job_usage_to_billing_data" data-text="Compare on-demand job usage to billing data" tabindex="-1">Compare on-demand job usage to billing data</h3>

<p>For projects using <a href="https://cloud.google.com/bigquery/pricing#on_demand_pricing">on-demand pricing</a>,
you can use the <code translate="no" dir="ltr">INFORMATION_SCHEMA.JOBS</code> view to review
compute charges over a given period.</p>

<p>For projects using <a href="https://cloud.google.com/bigquery/pricing#capacity_compute_analysis_pricing">capacity-based (slots) pricing</a>,
you can use the <a href="/bigquery/docs/information-schema-reservation-timeline"><code translate="no" dir="ltr">INFORMATION_SCHEMA.RESERVATIONS_TIMELINE</code></a>
to review compute charges over a given period.</p>

<p>The following query produces daily estimated aggregates of your billed TiB and the resulting
charges. The <a href="#limitations">limitations</a> section explains when these estimates
may not match your bill.</p>

<p>For this example only, the following additional variables must be set. They can be edited here for ease of use.</p>

<ul>
<li><code translate="no" dir="ltr"><var class="edit" scope="START_DATE" translate="no">START_DATE</var></code>: the earliest date to aggregate over (inclusive).</li>
<li><code translate="no" dir="ltr"><var class="edit" scope="END_DATE" translate="no">END_DATE</var></code>: the latest date to aggregate over (inclusive).</li>
<li><code translate="no" dir="ltr"><var class="edit" scope="PRICE_PER_TIB" translate="no">PRICE_PER_TIB</var></code>: the <a href="https://cloud.google.com/bigquery/pricing#on_demand_pricing">on-demand price
per TiB</a> used for bill estimates.</li>
</ul>

<div></div><devsite-code><pre class="devsite-click-to-copy notranslate" dir="ltr" is-upgraded syntax="GoogleSQL"><span class="devsite-syntax-k">CREATE</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">TEMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">FUNCTION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">isBillable</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">error_result</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ANY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">TYPE</span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-c1">-- You aren't charged for queries that return an error.</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">error_result</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">IS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-no">NULL</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-c1">-- However, canceling a running query might incur charges.</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">OR</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">error_result</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">reason</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'stopped'</span>
<span class="devsite-syntax-p">);</span>

<span class="devsite-syntax-c1">-- BigQuery hides the number of bytes billed on all queries against tables with</span>
<span class="devsite-syntax-c1">-- row-level security.</span>
<span class="devsite-syntax-k">CREATE</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">TEMP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">FUNCTION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">isMaybeUsingRowLevelSecurity</span><span class="devsite-syntax-p">(</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">job_type</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">STRING</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">tib_billed</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">FLOAT64</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">error_result</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ANY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">TYPE</span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">job_type</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'QUERY'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">AND</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">tib_billed</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">IS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-no">NULL</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">AND</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">isBillable</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">error_result</span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-p">);</span>

<span class="devsite-syntax-k">WITH</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">query_params</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">SELECT</span>
<span class="devsite-syntax-w">      </span><span class="devsite-syntax-kt">date</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'<var translate="no">START_DATE</var>'</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">start_date</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w">  </span><span class="devsite-syntax-c1">-- inclusive</span>
<span class="devsite-syntax-w">      </span><span class="devsite-syntax-kt">date</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'<var translate="no">END_DATE</var>'</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">end_date</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w">  </span><span class="devsite-syntax-c1">-- inclusive</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-p">),</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">usage_with_multiplier</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">SELECT</span>
<span class="devsite-syntax-w">      </span><span class="devsite-syntax-n">job_type</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">      </span><span class="devsite-syntax-n">error_result</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">      </span><span class="devsite-syntax-n">creation_time</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">      </span><span class="devsite-syntax-c1">-- Jobs are billed by end_time in PST8PDT timezone, regardless of where</span>
<span class="devsite-syntax-w">      </span><span class="devsite-syntax-c1">-- the job ran.</span>
<span class="devsite-syntax-w">      </span><span class="devsite-syntax-k">EXTRACT</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-kt">date</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">end_time</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">TIME</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ZONE</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'PST8PDT'</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">billing_date</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">      </span><span class="devsite-syntax-n">total_bytes_billed</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">/</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">1024</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">/</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">1024</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">/</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">1024</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">/</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">1024</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">total_tib_billed</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">      </span><span class="devsite-syntax-k">CASE</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">statement_type</span>
<span class="devsite-syntax-w">        </span><span class="devsite-syntax-k">WHEN</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'SCRIPT'</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">THEN</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">0</span>
<span class="devsite-syntax-w">        </span><span class="devsite-syntax-k">WHEN</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'CREATE_MODEL'</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">THEN</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">50</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">*</span><span class="devsite-syntax-w"> </span><var translate="no"><span class="devsite-syntax-n">PRICE_PER_TIB</span></var>
<span class="devsite-syntax-w">        </span><span class="devsite-syntax-k">ELSE</span><span class="devsite-syntax-w"> </span><var translate="no"><span class="devsite-syntax-n">PRICE_PER_TIB</span></var>
<span class="devsite-syntax-w">        </span><span class="devsite-syntax-k">END</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">multiplier</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n devsite-syntax-n-Quoted">`region-<var translate="no">REGION_NAME</var>`</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">INFORMATION_SCHEMA</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">JOBS</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">WHERE</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">statement_type</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err"><></span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'SCRIPT'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-k">SELECT</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">billing_date</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nf">sum</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">total_tib_billed</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">*</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">multiplier</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">estimated_charge</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nf">sum</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">total_tib_billed</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">estimated_usage_in_tib</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nf">countif</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">isMaybeUsingRowLevelSecurity</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">job_type</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">total_tib_billed</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">error_result</span><span class="devsite-syntax-p">))</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">jobs_using_row_level_security</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">usage_with_multiplier</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">query_params</span>
<span class="devsite-syntax-k">WHERE</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-mi">1</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">1</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-c1">-- Filter by creation_time for partition pruning.</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">AND</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">date</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">creation_time</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BETWEEN</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">date_sub</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">start_date</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">INTERVAL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">day</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AND</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">date_add</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">end_date</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">INTERVAL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">1</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">day</span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">AND</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">billing_date</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BETWEEN</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">start_date</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AND</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">end_date</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">AND</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">isBillable</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">error_result</span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-k">GROUP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">billing_date</span>
<span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">billing_date</span><span class="devsite-syntax-p">;</span></pre></devsite-code>

<h4 id="limitations" data-text="Limitations" tabindex="-1">Limitations</h4>

<ul>
<li><p>BigQuery <a href="/bigquery/docs/best-practices-row-level-security#limit-side-channel-attacks">hides some statistics</a>
for queries over tables with row-level security. The provided query counts
the number of jobs impacted as <code translate="no" dir="ltr">jobs_using_row_level_security</code>, but does not
have access to the billable usage.</p></li>
<li><p>BigQuery ML <a href="https://cloud.google.com/bigquery/pricing#ml_on_demand_pricing">pricing for on-demand queries</a> depends on the type of
model being created. <code translate="no" dir="ltr">INFORMATION_SCHEMA.JOBS</code> does not track which type of
model was created, so the provided query assumes all CREATE_MODEL statements
were creating the higher billed model types.</p></li>
<li><p>Apache Spark procedures use a <a href="/bigquery/docs/spark-procedures#pricing">similar pricing
model</a>, but charges are reported as
<a href="https://cloud.google.com/bigquery/pricing#capacity_compute_analysis_pricing">BigQuery Enterprise edition pay-as-you-go
SKU</a>.
<code translate="no" dir="ltr">INFORMATION_SCHEMA.JOBS</code> tracks this usage as <code translate="no" dir="ltr">total_bytes_billed</code>, but
cannot determine which SKU the usage represents.</p></li>
</ul>

<h3 id="calculate_average_slot_utilization" data-text="Calculate average slot utilization" tabindex="-1">Calculate average slot utilization</h3>

<p>The following example calculates average slot utilization for all queries over
the past 7 days for a given project. Note that this calculation is most
accurate for projects that have consistent slot usage throughout the week. If
your project does not have consistent slot usage, this number might be lower
than expected.</p>

<p>To run the query:</p>

<div></div><devsite-code><pre class="devsite-click-to-copy notranslate" dir="ltr" is-upgraded syntax="GoogleSQL"><span class="devsite-syntax-k">SELECT</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nf">SUM</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">total_slot_ms</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">/</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-mi">1000</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">*</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">60</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">*</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">60</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">*</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">24</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">*</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">7</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">avg_slots</span>
<span class="devsite-syntax-k">FROM</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n devsite-syntax-n-Quoted">`region-<var translate="no">REGION_NAME</var>`</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">INFORMATION_SCHEMA</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">JOBS</span>
<span class="devsite-syntax-k">WHERE</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-c1">-- Filter by the partition column first to limit the amount of data scanned.</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-c1">-- Eight days allows for jobs created before the 7 day end_time filter.</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">creation_time</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BETWEEN</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">TIMESTAMP_SUB</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-nf">CURRENT_TIMESTAMP</span><span class="devsite-syntax-p">(),</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">INTERVAL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">8</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">DAY</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AND</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">CURRENT_TIMESTAMP</span><span class="devsite-syntax-p">()</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">AND</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">job_type</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'QUERY'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">AND</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">statement_type</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">!=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'SCRIPT'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">AND</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">end_time</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BETWEEN</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">TIMESTAMP_SUB</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-nf">CURRENT_TIMESTAMP</span><span class="devsite-syntax-p">(),</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">INTERVAL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">7</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">DAY</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AND</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">CURRENT_TIMESTAMP</span><span class="devsite-syntax-p">();</span></pre></devsite-code>
<aside class="note"><strong>Note:</strong><span> <code translate="no" dir="ltr">INFORMATION_SCHEMA</code> view names are case-sensitive.</span></aside>
<p>The result is similar to the following:</p>

<div></div><devsite-code><pre translate="no" dir="ltr" is-upgraded>
+------------+
| avg_slots  |
+------------+
| 3879.1534  |
+------------+
</pre></devsite-code>

<p>You can check usage for a particular reservation with
<code translate="no" dir="ltr">WHERE reservation_id = &quot;…&quot;</code>. This can be helpful to determine percentage use
of a reservation over a period of time. For script jobs, the parent job also
reports the total slot usage from its children jobs. To avoid double counting,
use <code translate="no" dir="ltr">WHERE statement_type != &quot;SCRIPT&quot;</code> to exclude the parent job.</p>

<p>If instead you would like to check the average slot utilization for individual
jobs, use <code translate="no" dir="ltr">total_slot_ms / TIMESTAMP_DIFF(end_time, start_time, MILLISECOND)</code>.</p>

<h3 id="count_recent_active_queries_by_query_priority" data-text="Count recent active queries by query priority" tabindex="-1">Count recent active queries by query priority</h3>

<p>The following example displays the number of queries, grouped
by priority (interactive or batch) that were started within the last 7 hours:</p>

<div></div><devsite-code><pre class="devsite-click-to-copy notranslate" dir="ltr" is-upgraded syntax="GoogleSQL"><span class="devsite-syntax-k">SELECT</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">priority</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nf">COUNT</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-err">*</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">active_jobs</span>
<span class="devsite-syntax-k">FROM</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n devsite-syntax-n-Quoted">`region-<var translate="no">REGION_NAME</var>`</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">INFORMATION_SCHEMA</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">JOBS</span>
<span class="devsite-syntax-k">WHERE</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">creation_time</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">></span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">TIMESTAMP_SUB</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-nf">CURRENT_TIMESTAMP</span><span class="devsite-syntax-p">(),</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">INTERVAL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">7</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">hour</span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">AND</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">job_type</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'QUERY'</span>
<span class="devsite-syntax-k">GROUP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">priority</span><span class="devsite-syntax-p">;</span></pre></devsite-code>

<p>The result is similar to the following:</p>

<div></div><devsite-code><pre translate="no" dir="ltr" is-upgraded>
+-------------+-------------+
| priority    | active_jobs |
+-------------+-------------+
| INTERACTIVE |           2 |
| BATCH       |           3 |
+-------------+-------------+
</pre></devsite-code>

<p>The <code translate="no" dir="ltr">priority</code> field indicates whether a query is <code translate="no" dir="ltr">INTERACTIVE</code> or <code translate="no" dir="ltr">BATCH</code>.</p>

<h3 id="view_load_job_history" data-text="View load job history" tabindex="-1">View load job history</h3>

<p>The following example lists all users or service accounts that submitted a batch
load job for a given project. Because no time boundary is specified,
this query scans all available history.</p>

<div></div><devsite-code><pre class="devsite-click-to-copy notranslate" dir="ltr" is-upgraded syntax="GoogleSQL"><span class="devsite-syntax-k">SELECT</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">user_email</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">user</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nf">COUNT</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-err">*</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">num_jobs</span>
<span class="devsite-syntax-k">FROM</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n devsite-syntax-n-Quoted">`region-<var translate="no">REGION_NAME</var>`</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">INFORMATION_SCHEMA</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">JOBS</span>
<span class="devsite-syntax-k">WHERE</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">job_type</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'LOAD'</span>
<span class="devsite-syntax-k">GROUP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">user_email</span><span class="devsite-syntax-p">;</span></pre></devsite-code>
<aside class="note"><strong>Note:</strong><span> <code translate="no" dir="ltr">INFORMATION_SCHEMA</code> view names are case-sensitive.</span></aside>
<p>The result is similar to the following:
<div></div><devsite-code><pre translate="no" dir="ltr" is-upgraded>
+--------------+
| user         |
+--------------+
| abc@xyz.com  |
| xyz@xyz.com  |
| bob@xyz.com  |
+--------------+
</pre></devsite-code></p>

<h3 id="load-job-quota" data-text="Get the number of load jobs to determine the daily job quota used" tabindex="-1">Get the number of load jobs to determine the daily job quota used</h3>

<p>The following example returns the number of jobs by day, dataset, and table so
that you can determine how much of the daily job quota is used.</p>

<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><span class="devsite-syntax-k">SELECT</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-kt">DATE</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">creation_time</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">as</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">day</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-n">destination_table</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">project_id</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">as</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">project_id</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-n">destination_table</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">dataset_id</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">as</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">dataset_id</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-n">destination_table</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">table_id</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">as</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">table_id</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-nf">COUNT</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">job_id</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">load_job_count</span>
<span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">FROM</span>
<span class="devsite-syntax-w">   </span><span class="devsite-syntax-n devsite-syntax-n-Quoted">`region-<var translate="no">REGION_NAME</var>`</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">INFORMATION_SCHEMA</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">JOBS</span>
<span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">WHERE</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-n">creation_time</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BETWEEN</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">TIMESTAMP_SUB</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-nf">CURRENT_TIMESTAMP</span><span class="devsite-syntax-p">(),</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">INTERVAL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">8</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">DAY</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AND</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">CURRENT_TIMESTAMP</span><span class="devsite-syntax-p">()</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">AND</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">job_type</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">"LOAD"</span>
<span class="devsite-syntax-k">GROUP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">day</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-n">project_id</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-n">dataset_id</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-n">table_id</span>
<span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">day</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">DESC</span><span class="devsite-syntax-p">;</span></pre></devsite-code>
<aside class="note"><strong>Note:</strong><span> <code translate="no" dir="ltr">INFORMATION_SCHEMA</code> view names are case-sensitive.</span></aside>
<p>The result is similar to the following:</p>

<div></div><devsite-code><pre translate="no" dir="ltr" is-upgraded>
+-------------+------------+-------------+----------+-----------------+
|day          | project_id | dataset_id  | table_id | load_job_count  |
+-------------+------------+-------------+----------+-----------------+
| 2020-10-10  | my_project | dataset1    | orders   | 58              |
| 2020-10-10  | my_project | dataset1    | product  | 20              |
| 2020-10-10  | my_project | dataset1    | sales    | 11              |
+-------------+------------+-------------+----------+-----------------+
</pre></devsite-code>

<h3 id="get_the_last_few_failed_jobs" data-text="Get the last few failed jobs" tabindex="-1">Get the last few failed jobs</h3>

<p>The following example shows the last three failed jobs:</p>

<div></div><devsite-code><pre class="devsite-click-to-copy notranslate" dir="ltr" is-upgraded syntax="GoogleSQL"><span class="devsite-syntax-k">SELECT</span>
<span class="devsite-syntax-w">   </span><span class="devsite-syntax-n">job_id</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">creation_time</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">user_email</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">   </span><span class="devsite-syntax-n">error_result</span>
<span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n devsite-syntax-n-Quoted">`region-<var translate="no">REGION_NAME</var>`</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">INFORMATION_SCHEMA</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">JOBS_BY_PROJECT</span>
<span class="devsite-syntax-k">WHERE</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">error_result</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">reason</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">!=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">"Null"</span>
<span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">creation_time</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">DESC</span>
<span class="devsite-syntax-k">LIMIT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">3</span><span class="devsite-syntax-p">;</span></pre></devsite-code>

<p>The results should look similar to the following:
<div></div><devsite-code><pre translate="no" dir="ltr" is-upgraded>
+------------+--------------------------+------------------+-------------------------------------+
| job_id     | creation_time            | user_email       | error_result                        |
+------------+--------------------------+------------------+-------------------------------------+
| bquxjob_1  | 2020-10-10 00:00:00 UTC  | abc@example.com  | Column &#39;col1&#39; has mismatched type...|
| bquxjob_2  | 2020-10-11 00:00:00 UTC  | xyz@example.com  | Column &#39;col1&#39; has mismatched type...|
| bquxjob_3  | 2020-10-11 00:00:00 UTC  | bob@example.com  | Column &#39;col1&#39; has mismatched type...|
+------------+--------------------------+------------------+-------------------------------------+
</pre></devsite-code></p>

<h3 id="query_the_list_of_long_running_jobs" data-text="Query the list of long running jobs" tabindex="-1">Query the list of long running jobs</h3>

<p>The following example shows the list of long running jobs that are in
the <code translate="no" dir="ltr">RUNNING</code> or <code translate="no" dir="ltr">PENDING</code> state for more than 30 minutes:</p>

<div></div><devsite-code><pre class="devsite-click-to-copy notranslate" dir="ltr" is-upgraded syntax="GoogleSQL"><span class="devsite-syntax-k">SELECT</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">job_id</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">job_type</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">state</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">creation_time</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">start_time</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">user_email</span>
<span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n devsite-syntax-n-Quoted">`region-<var translate="no">REGION_NAME</var>`</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">INFORMATION_SCHEMA</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">JOBS</span>
<span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">WHERE</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">state</span><span class="devsite-syntax-err">!=</span><span class="devsite-syntax-s2">"DONE"</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AND</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">creation_time</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err"><=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">TIMESTAMP_SUB</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-nf">CURRENT_TIMESTAMP</span><span class="devsite-syntax-p">(),</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">INTERVAL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">30</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">MINUTE</span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">creation_time</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ASC</span><span class="devsite-syntax-p">;</span></pre></devsite-code>

<p>The result is similar to the following:</p>

<div></div><devsite-code><pre translate="no" dir="ltr" is-upgraded>
+-----------+----------+---------+--------------------------------+--------------------------------+------------------+
| job_id    | job_type | state   | creation_time                  | start_time                     | user_email       |
+-----------+----------+---------+--------------------------------+--------------------------------+------------------+
| bquxjob_1 | QUERY    | RUNNING | 2023-05-03 05:07:22.818000 UTC | 2023-05-03 05:07:22.905000 UTC | abc@example.com  |
| bquxjob_2 | QUERY    | PENDING | 2023-05-01 02:05:47.925000 UTC | 2023-05-01 02:05:47.998000 UTC | xyz@example.com  |
| bquxjob_3 | QUERY    | PENDING | 2023-05-01 02:05:47.925000 UTC | 2023-05-01 02:05:47.998000 UTC | abc@example.com  |
+-----------+----------+---------+--------------------------------+--------------------------------+------------------+
</pre></devsite-code>

<h3 id="optional-job-creation" data-text="Queries using optional job creation mode" tabindex="-1">Queries using optional job creation mode</h3>

<p>The following example shows a list of queries that were executed in optional job
creation mode for which BigQuery did not create jobs.</p>

<div></div><devsite-code><pre class="devsite-click-to-copy notranslate" dir="ltr" is-upgraded syntax="GoogleSQL"><span class="devsite-syntax-k">SELECT</span>
<span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">job_id</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-k">FROM</span>
<span class="devsite-syntax-w"> </span><span class="devsite-syntax-n devsite-syntax-n-Quoted">`region-<var translate="no">REGION_NAME</var>`</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">INFORMATION_SCHEMA</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">JOBS</span>
<span class="devsite-syntax-k">WHERE</span>
<span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">TIMESTAMP_TRUNC</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">creation_time</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">DAY</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2024-06-12'</span>
<span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AND</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">job_creation_reason</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">code</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">IS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-no">NULL</span>
<span class="devsite-syntax-k">LIMIT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">3</span><span class="devsite-syntax-p">;</span></pre></devsite-code>

<p>The results should look like the following:
<div></div><devsite-code><pre translate="no" dir="ltr" is-upgraded>
+-----------+
| job_id    |                                          |
+-----------+
| bquxjob_1 |
| bquxjob_2 |
| bquxjob_3 |
+-----------+
</pre></devsite-code></p>

<p>The following example shows information about a query that was executed in
optional job creation mode for which BigQuery did not create a
job.</p>

<div></div><devsite-code><pre class="devsite-click-to-copy notranslate" dir="ltr" is-upgraded syntax="GoogleSQL"><span class="devsite-syntax-k">SELECT</span>
<span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">job_id</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">statement_type</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">priority</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">cache_hit</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">job_creation_reason</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">code</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">job_creation_reason_code</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">total_bytes_billed</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">total_bytes_processed</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">total_slot_ms</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">state</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">error_result</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-k">message</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">error_result_message</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-k">FROM</span>
<span class="devsite-syntax-w"> </span><span class="devsite-syntax-n devsite-syntax-n-Quoted">`region-<var translate="no">REGION_NAME</var>`</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">INFORMATION_SCHEMA</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">JOBS</span>
<span class="devsite-syntax-k">WHERE</span>
<span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">TIMESTAMP_TRUNC</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">creation_time</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">DAY</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2024-06-12'</span>
<span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AND</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">job_id</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2Lm09bHxDEsoVK8zwzWJomLHU_Ud%1910479b151'</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-c1">-- queryId</span></pre></devsite-code>

<p><strong>Note</strong>: The <code translate="no" dir="ltr">job_id</code> field contains the <code translate="no" dir="ltr">queryId</code> of the query when a job was
not created for this query.</p>

<p>The results should look like the following:</p>

<div></div><devsite-code><pre translate="no" dir="ltr" is-upgraded>
+-----------+----------------+-------------+-----------+--------------------------+--------------------+---------------------+---------------+-------+----------------------+
| job_id    | statement_type | priority    | cache_hit | job_creation_reason_code | total_bytes_billed | total_bytes_processed | total_slot_ms | state | error_result_message |
+-----------+----------------+-------------+-----------+--------------------------+--------------------+---------------------+---------------+-------+----------------------+
| bquxjob_1 | SELECT         | INTERACTIVE | false     | null                     | 161480704          | 161164718             | 3106          | DONE  | null                 |
+-----------+----------------+-------------+-----------+--------------------------+--------------------+---------------------+---------------+-------+----------------------+
</pre></devsite-code>

<p>The following example shows a list of queries that were executed in optional
job creation mode for which BigQuery did create jobs.</p>

<div></div><devsite-code><pre class="devsite-click-to-copy notranslate" dir="ltr" is-upgraded syntax="GoogleSQL"><span class="devsite-syntax-k">SELECT</span>
<span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">job_id</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">job_creation_reason</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">code</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">job_creation_reason_code</span>
<span class="devsite-syntax-k">FROM</span>
<span class="devsite-syntax-w"> </span><span class="devsite-syntax-n devsite-syntax-n-Quoted">`region-<var translate="no">REGION_NAME</var>`</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">INFORMATION_SCHEMA</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">JOBS</span>
<span class="devsite-syntax-k">WHERE</span>
<span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">TIMESTAMP_TRUNC</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">creation_time</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">DAY</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'2024-06-12'</span>
<span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AND</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">job_creation_reason</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">code</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">IS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">NOT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-no">NULL</span>
<span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AND</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">job_creation_reason</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">code</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">!=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'REQUESTED'</span>
<span class="devsite-syntax-k">LIMIT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">3</span></pre></devsite-code>

<p>The results should look like the following:</p>

<div></div><devsite-code><pre translate="no" dir="ltr" is-upgraded>
+-----------+--------------------------+
| job_id    | job_creation_reason_code |
+-----------+--------------------------+
| bquxjob_1 | LARGE_RESULTS            |
| bquxjob_2 | LARGE_RESULTS            |
| bquxjob_3 | LARGE_RESULTS            |
+-----------+--------------------------+
</pre></devsite-code>

<h3 id="bytes_processed_per_user_identity" data-text="Bytes processed per user identity" tabindex="-1">Bytes processed per user identity</h3>

<p>The following example shows the total bytes billed for query jobs per user:</p>

<div></div><devsite-code><pre class="devsite-click-to-copy notranslate" dir="ltr" is-upgraded syntax="GoogleSQL"><span class="devsite-syntax-k">SELECT</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">user_email</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nf">SUM</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">total_bytes_billed</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">bytes_billed</span>
<span class="devsite-syntax-k">FROM</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n devsite-syntax-n-Quoted">`region-<var translate="no">REGION_NAME</var>`</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">INFORMATION_SCHEMA</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">JOBS</span>
<span class="devsite-syntax-k">WHERE</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">job_type</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'QUERY'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">AND</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">statement_type</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">!=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'SCRIPT'</span>
<span class="devsite-syntax-k">GROUP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">user_email</span><span class="devsite-syntax-p">;</span></pre></devsite-code>

<p><strong>Note</strong>: See the caveat for the <code translate="no" dir="ltr">total_bytes_billed</code> column in the
schema documentation for the <code translate="no" dir="ltr">JOBS</code> views.</p>

<p>The results should look like the following:</p>

<div></div><devsite-code><pre translate="no" dir="ltr" is-upgraded>
+---------------------+--------------+
| user_email          | bytes_billed |
+---------------------+--------------+
| bob@example.com     | 2847932416   |
| alice@example.com   | 1184890880   |
| charles@example.com | 10485760     |
+---------------------+--------------+
</pre></devsite-code>

<h3 id="aggregate-usage-project-level" data-text="Aggregate Connected Sheets usage by user at the project level" tabindex="-1">Aggregate Connected Sheets usage by user at the project level</h3>

<p>If you don&#39;t have organization-level permissions or only need to monitor a
specific project, run the following query to identify the top
Connected Sheets users within a project over the last 30 days. The
query aggregates the total number of queries, total bytes billed, and total slot
milliseconds for each user. This information is useful for understanding
adoption and for identifying top consumers of resources.</p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">user_email</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nf">COUNT</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-err">*</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">total_queries</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nf">SUM</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">total_bytes_billed</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">total_bytes_billed</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nf">SUM</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">total_slot_ms</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">total_slot_ms</span>
<span class="devsite-syntax-k">FROM</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-c1">-- This view queries the project you are currently running the query in.</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n devsite-syntax-n-Quoted">`region-<var translate="no">REGION_NAME</var>`</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">INFORMATION_SCHEMA</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">JOBS_BY_PROJECT</span>
<span class="devsite-syntax-k">WHERE</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-c1">-- Filter for jobs created in the last 30 days</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">creation_time</span><span class="devsite-syntax-w"> </span>&gt;<span class="devsite-syntax-err">=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">TIMESTAMP_SUB</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-nf">CURRENT_TIMESTAMP</span><span class="devsite-syntax-p">(),</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">INTERVAL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">30</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">DAY</span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-c1">-- Filter for jobs originating from Connected Sheets</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">AND</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">job_id</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">LIKE</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'sheets_dataconnector%'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-c1">-- Filter for completed jobs</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">AND</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">state</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'DONE'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">AND</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">statement_type</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">IS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-no">NULL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">OR</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">statement_type</span><span class="devsite-syntax-w"> &lt;&gt; </span><span class="devsite-syntax-s1">'SCRIPT'</span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-k">GROUP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">user_email</span>
<span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">total_bytes_billed</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">DESC</span>
<span class="devsite-syntax-k">LIMIT</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-mi">10</span><span class="devsite-syntax-p">;</span>
</code></pre></devsite-code>
<p>Replace <code translate="no" dir="ltr"><var translate="no">REGION_NAME</var></code> with the region for your project.
For example, <code translate="no" dir="ltr">region-us</code>.</p>
<aside class="note"><strong>Note:</strong><span> You must use a region qualifier to query <code translate="no" dir="ltr">INFORMATION_SCHEMA</code> views. The
location of the query execution must match the region of the
<code translate="no" dir="ltr">INFORMATION_SCHEMA</code> view.</span></aside>
<p>The result looks similar to the following:</p>

<div></div><devsite-code><pre translate="no" dir="ltr" is-upgraded>
+---------------------+---------------+--------------------+-----------------+
| user_email          | total_queries | total_bytes_billed | total_slot_ms   |
+---------------------+---------------+--------------------+-----------------+
| alice@example.com   | 152           | 12000000000        | 3500000         |
| bob@example.com     | 45            | 8500000000         | 2100000         |
| charles@example.com | 210           | 1100000000         | 1800000         |
+---------------------+---------------+--------------------+-----------------+
</pre></devsite-code>

<h3 id="find-job-log-project-level" data-text="Find job logs of Connected Sheets queries at the project-level" tabindex="-1">Find job logs of Connected Sheets queries at the project-level</h3>

<p>If you don&#39;t have organization-level permissions or only need to monitor a
specific project, run the following query to see a detailed log of all
Connected Sheets queries for the current project:</p>
<div></div><devsite-code><pre class="devsite-click-to-copy" translate="no" dir="ltr" is-upgraded syntax="GoogleSQL"><code translate="no" dir="ltr"><span class="devsite-syntax-k">SELECT</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">job_id</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">creation_time</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">user_email</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">total_bytes_billed</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">total_slot_ms</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">query</span>
<span class="devsite-syntax-k">FROM</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-c1">-- This view queries the project you are currently running the query in.</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n devsite-syntax-n-Quoted">`region-<var translate="no">REGION_NAME</var>.INFORMATION_SCHEMA.JOBS_BY_PROJECT`</span>
<span class="devsite-syntax-k">WHERE</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">creation_time</span><span class="devsite-syntax-w"> </span>&gt;<span class="devsite-syntax-err">=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">TIMESTAMP_SUB</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-nf">CURRENT_TIMESTAMP</span><span class="devsite-syntax-p">(),</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">INTERVAL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">30</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">DAY</span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">AND</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">job_id</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">LIKE</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'sheets_dataconnector%'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">AND</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">state</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'DONE'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">AND</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">statement_type</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">IS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-no">NULL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">OR</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">statement_type</span><span class="devsite-syntax-w"> &lt;&gt; </span><span class="devsite-syntax-s1">'SCRIPT'</span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">creation_time</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">DESC</span><span class="devsite-syntax-p">;</span>
</code></pre></devsite-code>
<p>Replace <code translate="no" dir="ltr"><var translate="no">REGION_NAME</var></code> with the region for your project.
For example, <code translate="no" dir="ltr">region-us</code>.</p>
<aside class="note"><strong>Note:</strong><span> You must use a region qualifier to query <code translate="no" dir="ltr">INFORMATION_SCHEMA</code> views. The
location of the query execution must match the region of the
<code translate="no" dir="ltr">INFORMATION_SCHEMA</code> view.</span></aside>
<p>The result looks similar to the following:</p>

<div></div><devsite-code><pre translate="no" dir="ltr" is-upgraded>
+---------------------------------+---------------------------------+------------------+--------------------+-----------------+---------------------------------+
| job_id                          | creation_time                   | user_email       | total_bytes_billed | total_slot_ms   |  query                          |
+---------------------------------+---------------------------------+------------------+--------------------+-----------------+---------------------------------+
| sheets_dataconnector_bquxjob_1  | 2025-11-06 00:26:53.077000 UTC  | abc@example.com  | 12000000000        | 3500000         |  SELECT ... FROM dataset.table1 |
| sheets_dataconnector_bquxjob_2  | 2025-11-06 00:24:04.294000 UTC  | xyz@example.com  | 8500000000         | 2100000         |  SELECT ... FROM dataset.table2 |
| sheets_dataconnector_bquxjob_3  | 2025-11-03 23:17:25.975000 UTC  | bob@example.com  | 1100000000         | 1800000         |  SELECT ... FROM dataset.table3 |
+---------------------------------+---------------------------------+------------------+--------------------+-----------------+---------------------------------+
</pre></devsite-code>

<h3 id="hourly_breakdown_of_bytes_processed" data-text="Hourly breakdown of bytes processed" tabindex="-1">Hourly breakdown of bytes processed</h3>

<p>The following example shows total bytes billed for query jobs, in hourly
intervals:</p>

<div></div><devsite-code><pre class="devsite-click-to-copy notranslate" dir="ltr" is-upgraded syntax="GoogleSQL"><span class="devsite-syntax-k">SELECT</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nf">TIMESTAMP_TRUNC</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">end_time</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">HOUR</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">time_window</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nf">SUM</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">total_bytes_billed</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">bytes_billed</span>
<span class="devsite-syntax-k">FROM</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n devsite-syntax-n-Quoted">`region-<var translate="no">REGION_NAME</var>`</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">INFORMATION_SCHEMA</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">JOBS</span>
<span class="devsite-syntax-k">WHERE</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">job_type</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'QUERY'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">AND</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">statement_type</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">!=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'SCRIPT'</span>
<span class="devsite-syntax-k">GROUP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">time_window</span>
<span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">time_window</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">DESC</span><span class="devsite-syntax-p">;</span></pre></devsite-code>

<p>The result is similar to the following:</p>

<div></div><devsite-code><pre translate="no" dir="ltr" is-upgraded>
+-------------------------+--------------+
| time_window             | bytes_billed |
+-------------------------+--------------+
| 2022-05-17 20:00:00 UTC | 1967128576   |
| 2022-05-10 21:00:00 UTC | 0            |
| 2022-04-15 17:00:00 UTC | 41943040     |
+-------------------------+--------------+
</pre></devsite-code>

<h3 id="query_jobs_per_table" data-text="Query jobs per table" tabindex="-1">Query jobs per table</h3>

<p>The following example shows how many times each table queried in <code translate="no" dir="ltr">my_project</code>
was referenced by a query job:</p>

<div></div><devsite-code><pre class="devsite-click-to-copy notranslate" dir="ltr" is-upgraded syntax="GoogleSQL"><span class="devsite-syntax-k">SELECT</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">t</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">project_id</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">t</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">dataset_id</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">t</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">table_id</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nf">COUNT</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-err">*</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">num_references</span>
<span class="devsite-syntax-k">FROM</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n devsite-syntax-n-Quoted">`region-<var translate="no">REGION_NAME</var>`</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">INFORMATION_SCHEMA</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">JOBS</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNNEST</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">referenced_tables</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">t</span>
<span class="devsite-syntax-k">GROUP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">t</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">project_id</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">t</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">dataset_id</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">t</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">table_id</span>
<span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">num_references</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">DESC</span><span class="devsite-syntax-p">;</span></pre></devsite-code>

<p>The result is similar to the following:</p>

<div></div><devsite-code><pre translate="no" dir="ltr" is-upgraded>
+------------+------------+----------+----------------+
| project_id | dataset_id | table_id | num_references |
+------------+------------+----------+----------------+
| my_project | dataset1   | orders   | 58             |
| my_project | dataset1   | products | 40             |
| other_proj | dataset1   | accounts | 12             |
+------------+------------+----------+----------------+
</pre></devsite-code>

<h3 id="legacy_sql_query_jobs_count_per_project" data-text="Legacy sql query jobs count per project" tabindex="-1">Legacy sql query jobs count per project</h3>

<p>The &#39;query_dialect&#39; field in the INFORMATION_SCHEMA has been available since May 2025.
The following example shows how many legacy sql query jobs are executed by
projects.</p>

<div></div><devsite-code><pre class="devsite-click-to-copy notranslate" dir="ltr" is-upgraded syntax="GoogleSQL"><span class="devsite-syntax-k">SELECT</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">project_id</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-c1">-- Implicitly defaulted to LegacySQL since the query dialect was not specified</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-c1">-- in the request.</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nf">COUNTIF</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">query_dialect</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'DEFAULT_LEGACY_SQL'</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">default_legacysql_query_jobs</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-c1">-- Explicitly requested LegacySQL.</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nf">COUNTIF</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">query_dialect</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'LEGACY_SQL'</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">legacysql_query_jobs</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-k">FROM</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n devsite-syntax-n-Quoted">`region-<var translate="no">REGION_NAME</var>`</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">INFORMATION_SCHEMA</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">JOBS</span>
<span class="devsite-syntax-k">WHERE</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">query_dialect</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'DEFAULT_LEGACY_SQL'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">OR</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">query_dialect</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'LEGACY_SQL'</span>
<span class="devsite-syntax-k">GROUP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">project_id</span>
<span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">default_legacysql_query_jobs</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">DESC</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">legacysql_query_jobs</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">DESC</span><span class="devsite-syntax-p">;</span></pre></devsite-code>

<h3 id="partitions-modified-by" data-text="Number of partitions modified by query and load jobs per table" tabindex="-1">Number of partitions modified by query and load jobs per table</h3>

<p>The following example shows the number of partitions modified by queries with
DML statements and load jobs, per table. Note that this query doesn&#39;t show
the <code translate="no" dir="ltr">total_modified_partitions</code> for copy jobs.</p>

<div></div><devsite-code><pre class="devsite-click-to-copy notranslate" dir="ltr" is-upgraded syntax="GoogleSQL"><span class="devsite-syntax-k">SELECT</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">destination_table</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">table_id</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nf">SUM</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">total_modified_partitions</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">total_modified_partitions</span>
<span class="devsite-syntax-k">FROM</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n devsite-syntax-n-Quoted">`region-<var translate="no">REGION_NAME</var>`</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">INFORMATION_SCHEMA</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">JOBS</span>
<span class="devsite-syntax-k">WHERE</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-kt">DATE</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">creation_time</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">"America/Los_Angeles"</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">CURRENT_DATE</span><span class="devsite-syntax-p">()</span>
<span class="devsite-syntax-k">GROUP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">table_id</span>
<span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">total_modified_partitions</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">DESC</span></pre></devsite-code>

<h3 id="average_number_of_slots_per_millisecond_used_by_a_job" data-text="Average number of slots per millisecond used by a job" tabindex="-1">Average number of slots per millisecond used by a job</h3>

<p>The following example shows how to calculate the average number of slots used by a job throughout the execution. This can be helpful when troubleshooting slow queries and comparing a slow execution of a query to a faster execution of the same query. Comparing this value with the total reservation size and the average number of concurrent jobs executed within the project or reservation can help you to understand whether multiple queries were competing for slots at the same time during the execution.</p>

<p>A higher average number of slots means more resources allocated to the job, which generally results in a faster execution.</p>

<div></div><devsite-code><pre class="devsite-click-to-copy notranslate" dir="ltr" is-upgraded syntax="GoogleSQL"><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">ROUND</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-nf">SAFE_DIVIDE</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">total_slot_ms</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-nf">TIMESTAMP_DIFF</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">end_time</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">start_time</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">MILLISECOND</span><span class="devsite-syntax-p">)),</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">1</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">as</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">avg_slots_per_ms</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n devsite-syntax-n-Quoted">`region-<var translate="no">REGION_NAME</var>`</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">INFORMATION_SCHEMA</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">JOBS_BY_PROJECT</span>
<span class="devsite-syntax-k">WHERE</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">job_id</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'<var translate="no">JOB_ID</var>'</span></pre></devsite-code>

<p>Replace <code translate="no" dir="ltr"><var translate="no">JOB_ID</var></code> with the <code translate="no" dir="ltr">job_id</code> you are investigating.</p>
<aside class="note"><strong>Note:</strong><span> <code translate="no" dir="ltr">INFORMATION_SCHEMA</code> view names are case-sensitive.</span></aside>
<p>The result will be similar to the following:</p>

<div></div><devsite-code><pre translate="no" dir="ltr" is-upgraded>
+------------------+
| avg_slots_per_ms |
+------------------+
|             17.0 |
+------------------+
</pre></devsite-code>

<h3 id="most_expensive_queries_by_project" data-text="Most expensive queries by project" tabindex="-1">Most expensive queries by project</h3>

<p>The following example lists the most expensive queries in <code translate="no" dir="ltr">my_project</code> by slot
usage time:</p>

<div></div><devsite-code><pre class="devsite-click-to-copy notranslate" dir="ltr" is-upgraded syntax="GoogleSQL"><span class="devsite-syntax-k">SELECT</span>
<span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">job_id</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">query</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">user_email</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">total_slot_ms</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n devsite-syntax-n-Quoted">`my_project`</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n devsite-syntax-n-Quoted">`region-<var translate="no">REGION_NAME</var>`</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">INFORMATION_SCHEMA</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">JOBS</span>
<span class="devsite-syntax-k">WHERE</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">EXTRACT</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-kt">DATE</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">creation_time</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">current_date</span><span class="devsite-syntax-p">()</span>
<span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">total_slot_ms</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">DESC</span>
<span class="devsite-syntax-k">LIMIT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">3</span></pre></devsite-code>

<p>You can also list the most expensive queries by data processed with the
following example:</p>

<div></div><devsite-code><pre class="devsite-click-to-copy notranslate" dir="ltr" is-upgraded syntax="GoogleSQL"><span class="devsite-syntax-k">SELECT</span>
<span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">job_id</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">query</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">user_email</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">total_bytes_processed</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n devsite-syntax-n-Quoted">`my_project`</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n devsite-syntax-n-Quoted">`region-<var translate="no">REGION_NAME</var>`</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">INFORMATION_SCHEMA</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">JOBS</span>
<span class="devsite-syntax-k">WHERE</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">EXTRACT</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-kt">DATE</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">creation_time</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">current_date</span><span class="devsite-syntax-p">()</span>
<span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">total_bytes_processed</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">DESC</span>
<span class="devsite-syntax-k">LIMIT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">3</span></pre></devsite-code>

<p>The result for either example is similar to the following:
<div></div><devsite-code><pre translate="no" dir="ltr" is-upgraded>
+-----------+---------------------------------+-----------------------+---------------+
| job_id    | query                           | user_email            | total_slot_ms |
+-----------+---------------------------------+-----------------------+---------------+
| bquxjob_1 | SELECT ... FROM dataset.table1  | bob@example.com       | 80,000        |
| bquxjob_2 | SELECT ... FROM dataset.table2  | alice@example.com     | 78,000        |
| bquxjob_3 | SELECT ... FROM dataset.table3  | charles@example.com   | 75,000        |
+-----------+---------------------------------+-----------------------+---------------+
</pre></devsite-code></p>

<h3 id="get_details_about_a_resource_warning" data-text="Get details about a resource warning" tabindex="-1">Get details about a resource warning</h3>

<p>If you get a <strong>Resources exceeded</strong> error message, you can inquire about the
queries in a time window:</p>

<div></div><devsite-code><pre class="devsite-click-to-copy notranslate" dir="ltr" is-upgraded syntax="GoogleSQL"><span class="devsite-syntax-k">SELECT</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">query</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">query_info</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">resource_warning</span>
<span class="devsite-syntax-k">FROM</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n devsite-syntax-n-Quoted">`region-<var translate="no">REGION_NAME</var>`</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">INFORMATION_SCHEMA</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">JOBS</span>
<span class="devsite-syntax-k">WHERE</span>
<span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">creation_time</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BETWEEN</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-s2">"2022-12-01"</span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AND</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">TIMESTAMP</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-s2">"2022-12-08"</span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AND</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">query_info</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">resource_warning</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">IS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">NOT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-no">NULL</span>
<span class="devsite-syntax-k">LIMIT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">3</span><span class="devsite-syntax-p">;</span></pre></devsite-code>

<h3 id="monitor_resource_warnings_grouped_by_date" data-text="Monitor resource warnings grouped by date" tabindex="-1">Monitor resource warnings grouped by date</h3>

<p>If you get a <strong>Resources exceeded</strong> error message, you can monitor the total
number of resource warnings grouped by date to know if there are any changes to
workload:</p>

<div></div><devsite-code><pre class="devsite-click-to-copy notranslate" dir="ltr" is-upgraded syntax="GoogleSQL"><span class="devsite-syntax-k">WITH</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">resource_warnings</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">SELECT</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">EXTRACT</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-kt">DATE</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">creation_time</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">creation_date</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">FROM</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-n devsite-syntax-n-Quoted">`region-<var translate="no">REGION_NAME</var>`</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">INFORMATION_SCHEMA</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">JOBS</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">WHERE</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-n">creation_time</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">>=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">TIMESTAMP_SUB</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-nf">CURRENT_TIMESTAMP</span><span class="devsite-syntax-p">(),</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">INTERVAL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">14</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">DAY</span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">AND</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">query_info</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">resource_warning</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">IS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">NOT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-no">NULL</span>
<span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-k">SELECT</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">creation_date</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nf">COUNT</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-mi">1</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">warning_counts</span>
<span class="devsite-syntax-k">FROM</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">resource_warnings</span>
<span class="devsite-syntax-k">GROUP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">creation_date</span>
<span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">creation_date</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">DESC</span><span class="devsite-syntax-p">;</span></pre></devsite-code>

<h3 id="estimate_slot_usage_and_cost_for_queries" data-text="Estimate slot usage and cost for queries" tabindex="-1">Estimate slot usage and cost for queries</h3>

<p>The following example computes the average slots and max slots for
each job by using <code translate="no" dir="ltr">estimated_runnable_units</code>.</p>

<p>The <code translate="no" dir="ltr">reservation_id</code> is <code translate="no" dir="ltr">NULL</code> if you don&#39;t have any reservations.</p>

<div></div><devsite-code><pre class="devsite-click-to-copy notranslate" dir="ltr" is-upgraded syntax="GoogleSQL"><span class="devsite-syntax-k">SELECT</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">project_id</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">job_id</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">reservation_id</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">EXTRACT</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-kt">DATE</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">creation_time</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">creation_date</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nf">TIMESTAMP_DIFF</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">end_time</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">start_time</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">SECOND</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">job_duration_seconds</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">job_type</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">user_email</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">total_bytes_billed</span><span class="devsite-syntax-p">,</span>

<span class="devsite-syntax-w">  </span><span class="devsite-syntax-c1">-- Average slot utilization per job is calculated by dividing total_slot_ms by the millisecond duration of the job</span>

<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nf">SAFE_DIVIDE</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">job</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">total_slot_ms</span><span class="devsite-syntax-p">,(</span><span class="devsite-syntax-nf">TIMESTAMP_DIFF</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">job</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">end_time</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">job</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">start_time</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">MILLISECOND</span><span class="devsite-syntax-p">)))</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">job_avg_slots</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">query</span><span class="devsite-syntax-p">,</span>

<span class="devsite-syntax-w">  </span><span class="devsite-syntax-c1">-- Determine the max number of slots used at ANY stage in the query.</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-c1">-- The average slots might be 55. But a single stage might spike to 2000 slots.</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-c1">-- This is important to know when estimating number of slots to purchase.</span>

<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">MAX</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-nf">SAFE_DIVIDE</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">unnest_job_stages</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">slot_ms</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-n">unnest_job_stages</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">end_ms</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">-</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">unnest_job_stages</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">start_ms</span><span class="devsite-syntax-p">))</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">jobstage_max_slots</span><span class="devsite-syntax-p">,</span>

<span class="devsite-syntax-w">  </span><span class="devsite-syntax-c1">-- Check if there's a job that requests more units of works (slots). If so you need more slots.</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-c1">-- estimated_runnable_units = Units of work that can be scheduled immediately.</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-c1">-- Providing additional slots for these units of work accelerates the query,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-c1">-- if no other query in the reservation needs additional slots.</span>

<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">MAX</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">unnest_timeline</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">estimated_runnable_units</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">estimated_runnable_units</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n devsite-syntax-n-Quoted">`region-<var translate="no">REGION_NAME</var>`</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">INFORMATION_SCHEMA</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">JOBS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">job</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">CROSS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">JOIN</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNNEST</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">job_stages</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">as</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">unnest_job_stages</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">CROSS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">JOIN</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNNEST</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">timeline</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">unnest_timeline</span>
<span class="devsite-syntax-k">WHERE</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-kt">DATE</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">creation_time</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BETWEEN</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">DATE_SUB</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-nf">CURRENT_DATE</span><span class="devsite-syntax-p">(),</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">INTERVAL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">7</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">DAY</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AND</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">CURRENT_DATE</span><span class="devsite-syntax-p">()</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">AND</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">project_id</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'my_project'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">AND</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">statement_type</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">!=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'SCRIPT'</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">OR</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">statement_type</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">IS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-no">NULL</span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-k">GROUP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">1</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-mi">2</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-mi">3</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-mi">4</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-mi">5</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-mi">6</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-mi">7</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-mi">8</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-mi">9</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-mi">10</span>
<span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">job_id</span><span class="devsite-syntax-p">;</span></pre></devsite-code>

<p>The result for example is similar to the following:
<div></div><devsite-code><pre translate="no" dir="ltr" is-upgraded>
+-----------+-----------+----------------+---------------+----------------------+----------+-----------------+--------------------+--------------+--------------------------------+--------------------+--------------------------+
|project_id | job_id    | reservation_id | creation_date | job_duration_seconds | job_type | user_email      | total_bytes_billed | job_avg_slots| query                          | jobstage_max_slots | estimated_runnable_units |
+-----------+-----------+----------------+---------------+----------------------+----------+-----------------+--------------------+--------------+--------------------------------+--------------------+--------------------------+
| project1  | bquxjob1  | reservation1   | 2020-10-10    | 160                  | LOAD     | abc@example.com | 161480704          | 2890         | SELECT ... FROM dataset.table1 | 2779.1534          | 1000                     |
| project1  | bquxjob2  | reservation2   | 2020-12-10    | 120                  | LOAD     | abc@example.com | 161480704          | 2890         | SELECT ... FROM dataset.table1 | 2779.1534          | 1000                     |
| project1  | bquxjob3  | reservation1   | 2020-12-10    | 120                  | LOAD     | abc@example.com | 161480704          | 2890         | SELECT ... FROM dataset.table1 | 1279.1534          | 998                     |
+-----------+-----------+----------------+---------------+----------------------+----------+-----------------+--------------------+--------------+--------------------------------+--------------------+--------------------------+
</pre></devsite-code></p>

<h3 id="view_performance_insights_for_queries" data-text="View performance insights for queries" tabindex="-1">View performance insights for queries</h3>

<p>The following example returns all query jobs that have performance insights from
your project in the last 30 days, along with a URL that links to the query
execution graph in the Google Cloud console.</p>

<div></div><devsite-code><pre class="devsite-click-to-copy notranslate" dir="ltr" is-upgraded syntax="GoogleSQL"><span class="devsite-syntax-k">SELECT</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n devsite-syntax-n-Quoted">`bigquery-public-data`</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">persistent_udfs</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">job_url</span><span class="devsite-syntax-p">(</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-n">project_id</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">||</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">':us.'</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">||</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">job_id</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">job_url</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">query_info</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">performance_insights</span>
<span class="devsite-syntax-k">FROM</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n devsite-syntax-n-Quoted">`region-<var translate="no">REGION_NAME</var>`</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">INFORMATION_SCHEMA</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">JOBS_BY_PROJECT</span>
<span class="devsite-syntax-k">WHERE</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-kt">DATE</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">creation_time</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">>=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">CURRENT_DATE</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">-</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">30</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-c1">-- scan 30 days of query history</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">AND</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">job_type</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'QUERY'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">AND</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">state</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'DONE'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">AND</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">error_result</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">IS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-no">NULL</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">AND</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">statement_type</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">!=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'SCRIPT'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">AND</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">EXISTS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-c1">-- Only include queries which had performance insights</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">1</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNNEST</span><span class="devsite-syntax-p">(</span>
<span class="devsite-syntax-w">      </span><span class="devsite-syntax-n">query_info</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">performance_insights</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">stage_performance_standalone_insights</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">WHERE</span>
<span class="devsite-syntax-w">      </span><span class="devsite-syntax-n">slot_contention</span>
<span class="devsite-syntax-w">      </span><span class="devsite-syntax-k">OR</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">insufficient_shuffle_quota</span>
<span class="devsite-syntax-w">      </span><span class="devsite-syntax-k">OR</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">bi_engine_reasons</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">IS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">NOT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-no">NULL</span>
<span class="devsite-syntax-w">      </span><span class="devsite-syntax-k">OR</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">high_cardinality_joins</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">IS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">NOT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-no">NULL</span>
<span class="devsite-syntax-w">      </span><span class="devsite-syntax-k">OR</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">partition_skew</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">IS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">NOT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-no">NULL</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">UNION</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ALL</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">1</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNNEST</span><span class="devsite-syntax-p">(</span>
<span class="devsite-syntax-w">      </span><span class="devsite-syntax-n">query_info</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">performance_insights</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">stage_performance_change_insights</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">WHERE</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">input_data_change</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">records_read_diff_percentage</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">IS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">NOT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-no">NULL</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-p">);</span></pre></devsite-code>

<h3 id="view_metadata_refresh_jobs" data-text="View metadata refresh jobs" tabindex="-1">View metadata refresh jobs</h3>

<p>The following example lists the metadata refresh jobs in last six hours:</p>

<div></div><devsite-code><pre class="devsite-click-to-copy notranslate" dir="ltr" is-upgraded syntax="GoogleSQL"><span class="devsite-syntax-k">SELECT</span>
<span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">*</span>
<span class="devsite-syntax-k">FROM</span>
<span class="devsite-syntax-w"> </span><span class="devsite-syntax-n devsite-syntax-n-Quoted">`region-<var translate="no">REGION_NAME</var>`</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">INFORMATION_SCHEMA</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">JOBS_BY_PROJECT</span>
<span class="devsite-syntax-k">WHERE</span>
<span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">job_id</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">LIKE</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'%metadata_cache_refresh%'</span>
<span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AND</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">creation_time</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">></span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">TIMESTAMP_SUB</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-nf">CURRENT_TIMESTAMP</span><span class="devsite-syntax-p">(),</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">INTERVAL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">6</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">HOUR</span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">start_time</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">desc</span>
<span class="devsite-syntax-k">LIMIT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">10</span><span class="devsite-syntax-p">;</span></pre></devsite-code>

<p>Replace <var translate="no">REGION_NAME</var> with your region.</p>

<h3 id="analyze_performance_over_time_for_identical_queries" data-text="Analyze performance over time for identical queries" tabindex="-1">Analyze performance over time for identical queries</h3>

<p>The following example returns the top 10 slowest jobs over the past 7 days that
have run the same query:</p>

<div></div><devsite-code><pre class="devsite-click-to-copy notranslate" dir="ltr" is-upgraded syntax="GoogleSQL"><span class="devsite-syntax-k">DECLARE</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">querytext</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">STRING</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">DEFAULT</span><span class="devsite-syntax-p">(</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">query</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n devsite-syntax-n-Quoted">`region-<var translate="no">REGION_NAME</var>`</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">INFORMATION_SCHEMA</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">JOBS</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">WHERE</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">job_id</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'<var translate="no">JOB_ID</var>'</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">LIMIT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">1</span>
<span class="devsite-syntax-p">);</span>

<span class="devsite-syntax-k">SELECT</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">start_time</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">end_time</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">project_id</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">job_id</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-nf">TIMESTAMP_DIFF</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">end_time</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">start_time</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">SECOND</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">run_secs</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">total_bytes_processed</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">/</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">POW</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-mi">1024</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">3</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">total_gigabytes_processed</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">query</span>
<span class="devsite-syntax-k">FROM</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n devsite-syntax-n-Quoted">`region-<var translate="no">REGION_NAME</var>`</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">INFORMATION_SCHEMA</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">JOBS</span>
<span class="devsite-syntax-k">WHERE</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">query</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">querytext</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">AND</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">total_bytes_processed</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">></span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">0</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">AND</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">creation_time</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">>=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">TIMESTAMP_SUB</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-nf">CURRENT_TIMESTAMP</span><span class="devsite-syntax-p">(),</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">INTERVAL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">7</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">DAY</span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">5</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">DESC</span>
<span class="devsite-syntax-k">LIMIT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">3</span><span class="devsite-syntax-p">;</span></pre></devsite-code>

<p>Replace <code translate="no" dir="ltr"><var translate="no">JOB_ID</var></code> with any
<code translate="no" dir="ltr">job_id</code> that ran the query you are analyzing.</p>

<h3 id="view_jobs_with_slot_contention_insights" data-text="View jobs with slot contention insights" tabindex="-1">View jobs with slot contention insights</h3>

<p>To view jobs with their slot contention insights, run the following query:</p>

<div></div><devsite-code><pre class="devsite-click-to-copy notranslate" dir="ltr" is-upgraded syntax="GoogleSQL"><span class="devsite-syntax-k">SELECT</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">job_id</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">creation_time</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">query_info</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">performance_insights</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-k">FROM</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n devsite-syntax-n-Quoted">`region-<var translate="no">REGION_NAME</var>`</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">INFORMATION_SCHEMA</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">JOBS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">j</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">UNNEST</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">query_info</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">performance_insights</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">stage_performance_standalone_insights</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">i</span>
<span class="devsite-syntax-k">WHERE</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">j</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">statement_type</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">!=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">"SCRIPT"</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">OR</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">j</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">statement_type</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">IS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-no">NULL</span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">AND</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">i</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">IS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">NOT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-no">NULL</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">AND</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">i</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">slot_contention</span></pre></devsite-code>

<p>The output shows different performance insights about jobs, including slot
contention:</p>

<div></div><devsite-code><pre translate="no" dir="ltr" is-upgraded>
+------------+-------------------------+-------------------------------------------------+----------------------------------------------------------------------------+
| job_id     | creation_time           | performance_insights.avg_previous_execution_ms  | performance_insightsstage_performance_standalone_insights.slot_contention  |
+------------+-------------------------+-------------------------------------------------+----------------------------------------------------------------------------+
| bquxjob_1  | 2025-08-08 00:00:00 UTC | null                                            | true                                                                       |
| bquxjob_2  | 2025-08-08 00:00:00 UTC | 42689                                           | true                                                                       |
| bquxjob_3  | 2025-08-08 00:00:00 UTC | 42896                                           | true                                                                       |
+------------+-------------------------+-------------------------------------------------+----------------------------------------------------------------------------+
</pre></devsite-code>

<h3 id="get_jobs_with_the_same_query_hash" data-text="Get jobs with the same query hash" tabindex="-1">Get jobs with the same query hash</h3>

<p>The following query returns the job IDs with the same query hash as a specific job:</p>

<div></div><devsite-code><pre class="devsite-click-to-copy notranslate" dir="ltr" is-upgraded syntax="GoogleSQL"><span class="devsite-syntax-k">SELECT</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">j</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">job_id</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">j</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">creation_time</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">j</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">query</span>
<span class="devsite-syntax-k">FROM</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n devsite-syntax-n-Quoted">`region-<var translate="no">REGION_NAME</var>`</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">INFORMATION_SCHEMA</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">JOBS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">j</span>
<span class="devsite-syntax-k">WHERE</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">j</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">job_id</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">!=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">"<var translate="no">JOB_IDENTIFIER</var>"</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-k">AND</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">j</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">query_info</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">query_hashes</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">normalized_literals</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">SELECT</span>
<span class="devsite-syntax-w">      </span><span class="devsite-syntax-n">sub</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">query_info</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">query_hashes</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">normalized_literals</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">FROM</span>
<span class="devsite-syntax-w">      </span><span class="devsite-syntax-n devsite-syntax-n-Quoted">`region-<var translate="no">REGION_NAME</var>`</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">INFORMATION_SCHEMA</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">JOBS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">sub</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">WHERE</span>
<span class="devsite-syntax-w">      </span><span class="devsite-syntax-n">sub</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">job_id</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">"<var translate="no">JOB_IDENTIFIER</var>"</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">LIMIT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">1</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span>
<span class="devsite-syntax-w">  </span><span class="devsite-syntax-n">j</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">creation_time</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">DESC</span><span class="devsite-syntax-p">;</span></pre></devsite-code>
<aside class="note"><strong>Note:</strong><span> <code translate="no" dir="ltr">INFORMATION_SCHEMA</code> view names are case-sensitive.</span></aside>
<p>The result is similar to the following:</p>

<div></div><devsite-code><pre translate="no" dir="ltr" is-upgraded>
+--------------+---------------------------+------------------------------------------------+
| job_id       |  creation_time            |  query                                         |
+--------------+---------------------------+------------------------------------------------+
| bquxjob_1    |  2019-10-10 00:00:00 UTC  |  SELECT ... FROM dataset.table1 WHERE x = "a"  |
| bquxjob_2    |  2019-10-10 00:00:01 UTC  |  SELECT ... FROM dataset.table1 WHERE x = "b"  |
| bquxjob_3    |  2019-10-10 00:00:02 UTC  |  SELECT ... FROM dataset.table1 WHERE x = "c"  |
+--------------+---------------------------+------------------------------------------------+
</pre></devsite-code>

<h3 id="view_average_concurrent_jobs_running_alongside_a_particular_job_in_the_same_project" data-text="View average concurrent jobs running alongside a particular job in the same project" tabindex="-1">View average concurrent jobs running alongside a particular job in the same project</h3>

<p>The following example demonstrates how to calculate the average number of jobs running at the same time as a specific query job in the same project.</p>

<p>This calculation helps determine if an increased number of concurrent jobs within the same project caused <a href="/bigquery/docs/query-insights#slot_contention">slot contention</a> problems. Gather this data when troubleshooting slow queries or comparing slow and fast query runs.</p>

<p>If there are far more concurrent queries running than expected, check if more jobs were started, queried data changed, or both.</p>

<div></div><devsite-code><pre class="devsite-click-to-copy notranslate" dir="ltr" is-upgraded syntax="GoogleSQL"><span class="devsite-syntax-k">WITH</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">job_metadata</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span>
<span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">creation_time</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">end_time</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">job_type</span>
<span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n devsite-syntax-n-Quoted">`region-<var translate="no">REGION_NAME</var>`</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">INFORMATION_SCHEMA</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">JOBS_BY_PROJECT</span>
<span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">WHERE</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">job_id</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'<var translate="no">JOB_ID</var>'</span>
<span class="devsite-syntax-c1">-- If you know the date the job was created, add the following line to speed up the query by providing the date in UTC:</span>
<span class="devsite-syntax-c1">-- AND DATE(creation_time) = '<var translate="no">YYYY-MM-DD</var>'</span>
<span class="devsite-syntax-p">),</span>
<span class="devsite-syntax-n">intervals</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span>
<span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">TIMESTAMP_ADD</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">creation_time</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">INTERVAL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">seconds_offset</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">SECOND</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">ts</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">job_type</span>
<span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">job_metadata</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">UNNEST</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-nf">GENERATE_ARRAY</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-mi">0</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">IF</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-nf">TIMESTAMP_DIFF</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">end_time</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">creation_time</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">SECOND</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">></span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">0</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">TIMESTAMP_DIFF</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">end_time</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">creation_time</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">SECOND</span><span class="devsite-syntax-p">),</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">1</span><span class="devsite-syntax-p">)))</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">as</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">seconds_offset</span>
<span class="devsite-syntax-p">),</span>
<span class="devsite-syntax-n">concurrent_jobs</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-p">(</span>
<span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">int</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">ts</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">COUNT</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-err">*</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">as</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">concurrent_jobs_count</span>
<span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">intervals</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">int</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">JOIN</span>
<span class="devsite-syntax-w"> </span><span class="devsite-syntax-n devsite-syntax-n-Quoted">`region-<var translate="no">REGION_NAME</var>`</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">INFORMATION_SCHEMA</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">JOBS_BY_PROJECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">j</span>
<span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ON</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">int</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">ts</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BETWEEN</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">j</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">creation_time</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">and</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">j</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">end_time</span>
<span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">WHERE</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">job_id</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">!=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'<var translate="no">JOB_ID</var>'</span>
<span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AND</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">j</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">job_type</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">int</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">job_type</span>
<span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">GROUP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">int</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">ts</span><span class="devsite-syntax-p">)</span>

<span class="devsite-syntax-k">SELECT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">ROUND</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-nf">AVG</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">concurrent_jobs_count</span><span class="devsite-syntax-p">),</span><span class="devsite-syntax-mi">1</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">as</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">average_concurrent_jobs</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">concurrent_jobs</span></pre></devsite-code>
<aside class="note"><strong>Note:</strong><span> The granularity for metadata aggregation is set to seconds. If you require a more precise granularity for shorter running jobs, replace <code translate="no" dir="ltr">SECOND</code> with <code translate="no" dir="ltr">MILLISECOND</code> in the query body for milliseconds sampling.</span></aside>
<p>Replace the following:</p>

<ul>
<li><p><code translate="no" dir="ltr"><var translate="no">JOB_ID</var></code>: the job ID of the query that you are analyzing</p></li>
<li><p><code translate="no" dir="ltr"><var translate="no">REGION_NAME</var></code>: the region for your project</p></li>
</ul>

<p>The result is similar to the following:
<div></div><devsite-code><pre translate="no" dir="ltr" is-upgraded>
+-------------------------+
| average_concurrent_jobs |
+-------------------------+
|                     2.8 |
+-------------------------+
</pre></devsite-code></p>

<h3 id="bytes-processed-export-jobs" data-text="Get bytes processed by extract jobs" tabindex="-1">Get bytes processed by extract jobs</h3>

<p>The following example computes the <code translate="no" dir="ltr">total_bytes_processed</code> value for
<code translate="no" dir="ltr">EXTRACT</code> job types. For information about quotas for extract jobs, see
<a href="/bigquery/docs/exporting-data#quota_policy">Quota policy for extract jobs</a>.
The total bytes processed can be used to monitor the
aggregate usage and verify that extract jobs stays below the 50 TiB per-day
limit:</p>

<div></div><devsite-code><pre class="devsite-click-to-copy notranslate" dir="ltr" is-upgraded syntax="GoogleSQL"><span class="devsite-syntax-k">SELECT</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-kt">DATE</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">creation_time</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">as</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">day</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-n">project_id</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">as</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">source_project_id</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-nf">SUM</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">total_bytes_processed</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">total_bytes_processed</span>
<span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">FROM</span>
<span class="devsite-syntax-w">   </span><span class="devsite-syntax-n devsite-syntax-n-Quoted">`region-<var translate="no">REGION_NAME</var>`</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">INFORMATION_SCHEMA</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">JOBS</span>
<span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">WHERE</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-n">creation_time</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BETWEEN</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">TIMESTAMP_SUB</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-nf">CURRENT_TIMESTAMP</span><span class="devsite-syntax-p">(),</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">INTERVAL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">8</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">DAY</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AND</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">CURRENT_TIMESTAMP</span><span class="devsite-syntax-p">()</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">AND</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">job_type</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">"EXTRACT"</span>
<span class="devsite-syntax-k">GROUP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">day</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-n">source_project_id</span>
<span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">day</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">DESC</span><span class="devsite-syntax-p">;</span></pre></devsite-code>

<h3 id="get-usage-copy-jobs" data-text="Get usage of copy jobs" tabindex="-1">Get usage of copy jobs</h3>

<p>For information about copy jobs, see <a href="/bigquery/docs/managing-tables#copy-table">Copy a table</a>.
The following example provides the usage of copy jobs:</p>

<div></div><devsite-code><pre class="devsite-click-to-copy notranslate" dir="ltr" is-upgraded syntax="GoogleSQL"><span class="devsite-syntax-k">SELECT</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-kt">DATE</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">creation_time</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">as</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">day</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-n">project_id</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">as</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">source_project_id</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-nf">CONCAT</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">destination_table</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">project_id</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-s2">":"</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-n">destination_table</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">dataset_id</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-s2">"."</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-n">destination_table</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">table_id</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">as</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">destination_table</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-nf">COUNT</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">job_id</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">copy_job_count</span>
<span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">FROM</span>
<span class="devsite-syntax-w">   </span><span class="devsite-syntax-n devsite-syntax-n-Quoted">`region-<var translate="no">REGION_NAME</var>`</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">INFORMATION_SCHEMA</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">JOBS</span>
<span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">WHERE</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-n">creation_time</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BETWEEN</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">TIMESTAMP_SUB</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-nf">CURRENT_TIMESTAMP</span><span class="devsite-syntax-p">(),</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">INTERVAL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">8</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">DAY</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AND</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">CURRENT_TIMESTAMP</span><span class="devsite-syntax-p">()</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">AND</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">job_type</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">"COPY"</span>
<span class="devsite-syntax-k">GROUP</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">day</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-n">source_project_id</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-n">destination_table</span>
<span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">day</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">DESC</span><span class="devsite-syntax-p">;</span></pre></devsite-code>

<h3 id="get-iceberg-storage-optimization-jobs" data-text="Get usage of Apache Iceberg managed tables storage optimization" tabindex="-1">Get usage of Apache Iceberg managed tables storage optimization</h3>

<p>The following example provides the usage of Iceberg managed table
storage optimization.</p>

<div></div><devsite-code><pre class="devsite-click-to-copy notranslate" dir="ltr" is-upgraded syntax="GoogleSQL"><span class="devsite-syntax-k">SELECT</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-n">job_id</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">reservation_id</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">edition</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-n">total_slot_ms</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">total_bytes_processed</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">state</span>
<span class="devsite-syntax-k">FROM</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n devsite-syntax-n-Quoted">`region-<var translate="no">REGION_NAME</var>`</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">INFORMATION_SCHEMA</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">JOBS</span>
<span class="devsite-syntax-k">WHERE</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">creation_time</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">></span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">TIMESTAMP_SUB</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-nf">CURRENT_TIMESTAMP</span><span class="devsite-syntax-p">(),</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-kt">INTERVAL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">6</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">HOUR</span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">AND</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">user_email</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">"bigquery-adminbot@system.gserviceaccount.com"</span>
<span class="devsite-syntax-w">    </span><span class="devsite-syntax-k">AND</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">query</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">LIKE</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s2">"CALL BQ.OPTIMIZE_STORAGE(%)"</span><span class="devsite-syntax-p">;</span></pre></devsite-code>

<h3 id="get-iceberg-export-table-metadata-jobs" data-text="Get usage of Iceberg managed table export table metadata" tabindex="-1">Get usage of Iceberg managed table export table metadata</h3>

<p>The following example provides the usage of Iceberg <code translate="no" dir="ltr">EXPORT TABLE METADATA FROM</code>.</p>

<div></div><devsite-code><pre class="devsite-click-to-copy notranslate" dir="ltr" is-upgraded syntax="GoogleSQL"><span class="devsite-syntax-k">SELECT</span>
<span class="devsite-syntax-w">   </span><span class="devsite-syntax-n">job_id</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">   </span><span class="devsite-syntax-n">user_email</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">   </span><span class="devsite-syntax-n">start_time</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">   </span><span class="devsite-syntax-n">end_time</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">   </span><span class="devsite-syntax-nf">TIMESTAMP_DIFF</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">end_time</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">start_time</span><span class="devsite-syntax-p">,</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">SECOND</span><span class="devsite-syntax-p">)</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">duration_seconds</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">   </span><span class="devsite-syntax-n">total_bytes_processed</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">   </span><span class="devsite-syntax-n">reservation_id</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">   </span><span class="devsite-syntax-k">CASE</span>
<span class="devsite-syntax-w">     </span><span class="devsite-syntax-k">WHEN</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">reservation_id</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">IS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-no">NULL</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">THEN</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'PAYG (On-demand)'</span>
<span class="devsite-syntax-w">     </span><span class="devsite-syntax-k">WHEN</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">reservation_id</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">!=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">''</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">THEN</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Reservation'</span>
<span class="devsite-syntax-w">     </span><span class="devsite-syntax-k">ELSE</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'Unknown'</span>
<span class="devsite-syntax-w">   </span><span class="devsite-syntax-k">END</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">AS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">compute_type</span><span class="devsite-syntax-p">,</span>
<span class="devsite-syntax-w">   </span><span class="devsite-syntax-n">query</span>
<span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">FROM</span>
<span class="devsite-syntax-w">   </span><span class="devsite-syntax-n devsite-syntax-n-Quoted">`region-<var translate="no">REGION_NAME</var>`</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">INFORMATION_SCHEMA</span><span class="devsite-syntax-p">.</span><span class="devsite-syntax-n">JOBS</span>
<span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">WHERE</span>
<span class="devsite-syntax-w">   </span><span class="devsite-syntax-n">job_type</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-err">=</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-s1">'QUERY'</span>
<span class="devsite-syntax-w">   </span><span class="devsite-syntax-k">AND</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">end_time</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">IS</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">NOT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-no">NULL</span>
<span class="devsite-syntax-w">   </span><span class="devsite-syntax-c1">-- Filter for queries containing the specified pattern (case-insensitive)</span>
<span class="devsite-syntax-w">   </span><span class="devsite-syntax-k">AND</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nf">REGEXP_CONTAINS</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-nf">LOWER</span><span class="devsite-syntax-p">(</span><span class="devsite-syntax-n">query</span><span class="devsite-syntax-p">),</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-n">r</span><span class="devsite-syntax-s2">"export table metadata from"</span><span class="devsite-syntax-p">)</span>
<span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">ORDER</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">BY</span>
<span class="devsite-syntax-w">   </span><span class="devsite-syntax-n">start_time</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">DESC</span>
<span class="devsite-syntax-w"> </span><span class="devsite-syntax-k">LIMIT</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-mi">3</span><span class="devsite-syntax-p">;</span></pre></devsite-code>

<h3 id="match_slot_usage_behavior_from_administrative_resource_charts" data-text="Match slot usage behavior from administrative resource charts" tabindex="-1">Match slot usage behavior from administrative resource charts</h3>

<p>To explore slot usage behavior similar to the information in administrative
resource charts, query the
<a href="/bigquery/docs/information-schema-jobs-timeline#charts_example"><code translate="no" dir="ltr">INFORMATION_SCHEMA.JOBS_TIMELINE</code> view</a>.</p>




  
  

  
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
