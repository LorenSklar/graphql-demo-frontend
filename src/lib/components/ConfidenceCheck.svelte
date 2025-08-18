<!-- src/lib/components/ConfidenceCheck.svelte -->
 
<script>
  import { ThumbsDown, ThumbsUp } from 'lucide-svelte';
  
  export let conceptName = '';
  export let nextConceptName = '';
  export let onExploring = () => {};
  export let onReady = () => {};
  export let onBrowseTopics = () => {};
</script>

<div class="confidence-check">
  <p class="confidence-question">How confident do you feel about {conceptName}? Ready for {nextConceptName || 'the next concept'}?</p>
  
  <div class="confidence-actions">
    <button on:click={onExploring} class="exploring-btn">
      <ThumbsDown size="20" />
      <span>Still exploring</span>
    </button>
    <button on:click={onReady} class="ready-btn">
      <ThumbsUp size="20" />
      <span>Got it! What's next?</span>
    </button>
  </div>
  
  <!-- Browse all topics button -->
  <div class="browse-topics-section">
    <button class="browse-topics-btn" on:click={onBrowseTopics}>
      Browse all topics
    </button>
  </div>
</div>

<style>
  .confidence-check {
    text-align: center;
    margin-top: 1rem;
  }

  .confidence-question {
    color: #374151;
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
    font-weight: normal;
    margin: 0 0 1.5rem 0;
  }

  .confidence-actions {
    display: flex;
    gap: 1.5rem;
    justify-content: center;
    margin-bottom: 1.5rem;
  }

  .confidence-actions button {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem;
    border: 2px solid #e5e7eb;
    border-radius: 12px;
    background: white;
    cursor: pointer;
    font-weight: 500;
    min-width: 120px;
    transition: all 0.2s;
  }

  .exploring-btn {
    color: #6b7280;
  }

  .exploring-btn:hover {
    border-color: #d1d5db;
    background: #f9fafb;
  }

  .ready-btn {
    color: #059669;
    border-color: #10b981;
  }

  .ready-btn:hover {
    border-color: #059669;
    background: #f0fdf4;
  }

  .browse-topics-section {
    padding-top: 1rem;
    border-top: 1px solid #e5e7eb;
  }

  .browse-topics-btn {
    color: #6b7280;
    background: none;
    border: 1px solid #e5e7eb;
    padding: 0.75rem 1.5rem;
    border-radius: 12px;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.2s;
  }

  .browse-topics-btn:hover {
    background-color: #f9fafb;
    border-color: #d1d5db;
    color: #374151;
  }
</style>