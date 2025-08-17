<script lang="ts">
  // Default values - will be overridden by backend data
  const defaults = {
    subjectId: 1,
    domainId: 1, 
    clusterId: 1
  };

  // Lookup tables - will eventually come from backend
  const subjects: Record<number, string> = { 1: "GraphQL" };
  const domains: Record<number, string> = { 1: "Queries" };
  const clusters: Record<number, string> = { 1: "Single Field Queries" };

  // Start with defaults, will update when props change
  let displayData = {
    subjectId: defaults.subjectId,
    domainId: defaults.domainId,
    clusterId: defaults.clusterId
  };

  // Update when props change (eventually from backend)
  $: if (true) {
    displayData = { ...defaults };
  }
</script>

<div class="curriculum-navigation">
  <!-- Curriculum hierarchy -->
  <div class="curriculum-hierarchy">
    <div class="hierarchy-item subject">
      <span class="label">Subject:</span>
      <span class="value">{subjects[displayData.subjectId]}</span>
    </div>
    <div class="hierarchy-item domain">
      <span class="label">Domain:</span>
      <span class="value">{domains[displayData.domainId]}</span>
    </div>
    <div class="hierarchy-item cluster">
      <span class="label">Topic:</span>
      <span class="value">{clusters[displayData.clusterId]}</span>
    </div>
  </div>
</div>

<style>
  .curriculum-navigation {
    margin-bottom: 2rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  }

  .curriculum-hierarchy {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    padding: 1.5rem;
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
    border-radius: 0.75rem;
    border: 1px solid #e2e8f0;
  }

  .hierarchy-item {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .hierarchy-item .label {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    color: #64748b;
    letter-spacing: 0.05em;
  }

  .hierarchy-item .value {
    font-size: 1rem;
    font-weight: 600;
    color: #1e293b;
  }

  .hierarchy-item.subject .value {
    color: #dc2626;
  }

  .hierarchy-item.domain .value {
    color: #2563eb;
  }

  .hierarchy-item.cluster .value {
    color: #059669;
  }
</style>
