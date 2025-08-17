<!-- src/lib/components/ConfidenceCheck.svelte -->
 
<script>
  export let conceptName = '';
  export let nextConceptName = '';
  export let onExploring = () => {};
  export let onReady = () => {};
  export let onBrowseTopics = () => {};
</script>

<div class="confidence-check-stub">
  <h3>Confidence Check (TODO)</h3>
  <p>How confident do you feel about {conceptName}? Ready for {nextConceptName || 'the next concept'}?</p>
  
  <div class="confidence-actions">
    <button on:click={onExploring} class="exploring-btn">
      👎 Still exploring
    </button>
    <button on:click={onReady} class="ready-btn">
      👍 Got it!
    </button>
  </div>
  
  <!-- Browse all topics button -->
  <div class="browse-topics-section">
    <button class="browse-topics-btn" on:click={onBrowseTopics}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
      </svg>
      <span>Browse all topics</span>
    </button>
  </div>
</div>

<style>
  .confidence-check-stub {
    padding: 2rem;
    background: #f8f9fa;
    border: 2px dashed #dee2e6;
    border-radius: 0.5rem;
    text-align: center;
  }

  .confidence-check-stub h3 {
    color: #6c757d;
    margin-bottom: 1rem;
  }

  .confidence-check-stub p {
    color: #6c757d;
    margin-bottom: 1.5rem;
  }

  .confidence-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-bottom: 1.5rem;
  }

  .confidence-actions button {
    padding: 0.75rem 1.5rem;
    border: 1px solid #dee2e6;
    border-radius: 0.25rem;
    background: white;
    cursor: pointer;
    font-weight: 500;
  }

  .exploring-btn:hover {
    background: #f8d7da;
    border-color: #f5c6cb;
  }

  .ready-btn:hover {
    background: #d4edda;
    border-color: #c3e6cb;
  }

  .browse-topics-section {
    padding-top: 1.5rem;
    border-top: 1px solid #e2e8f0;
  }

  .browse-topics-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: #64748b;
    background: none;
    border: 1px solid #e2e8f0;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.2s;
  }

  .browse-topics-btn:hover {
    background-color: #f8fafc;
    border-color: #cbd5e1;
    color: #475569;
  }
</style>