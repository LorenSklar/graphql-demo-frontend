<!-- src/lib/components/ConfidenceCheck.svelte -->
 
<script lang="ts">
  import { ThumbsDown, ThumbsUp, Brain } from 'lucide-svelte';
  
  export let conceptName = '';
  export let nextConceptName = '';
  export let onNeedHelp = () => {}; // Thumbs down - need foundation help
  export let onStillExploring = () => {}; // Brain - more exercises
  export let onReadyForReflection = () => {}; // Thumbs up - ready for reflection
  export let onBrowseTopics = () => {};
  
  let selectedConfidence = 'neutral'; // Default to neutral
  
  function selectConfidence(type: 'thumbs-down' | 'neutral' | 'thumbs-up') {
    selectedConfidence = type;
    // Handle the action based on confidence level
    if (type === 'thumbs-down') onNeedHelp();
    else if (type === 'neutral') onStillExploring();
    else if (type === 'thumbs-up') onReadyForReflection();
  }
</script>

<div class="confidence-check">
  <p class="confidence-question">How confident do you feel about {conceptName}?</p>
  
  <div class="confidence-actions">
    <button 
      class="thumbs-down-btn {selectedConfidence === 'thumbs-down' ? 'selected' : ''}"
      on:click={() => selectConfidence('thumbs-down')}
    >
      <ThumbsDown size="20" />
      <span>What am I doing wrong?</span>
    </button>
    
    <button 
      class="neutral-btn {selectedConfidence === 'neutral' ? 'selected' : ''}"
      on:click={() => selectConfidence('neutral')}
    >
      <Brain size="20" />
      <span>Still exploring</span>
    </button>
    
    <button 
      class="thumbs-up-btn {selectedConfidence === 'thumbs-up' ? 'selected' : ''}"
      on:click={() => selectConfidence('thumbs-up')}
    >
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
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    padding: 1.5rem;
    background-color: white;
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
    gap: 1rem;
    justify-content: center;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
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
    min-width: 140px;
    transition: all 0.2s;
  }

  .thumbs-down-btn {
    color: #dc2626;
    border-color: #fecaca;
  }

  .thumbs-down-btn:hover {
    border-color: #fca5a5;
    background: #fef2f2;
  }

  .neutral-btn {
    color: #2563eb;
    border-color: #93c5fd;
    background: white;
    border-width: 2px;
  }

  .neutral-btn:hover {
    border-color: #3b82f6;
    background: #dbeafe;
  }

  .thumbs-up-btn {
    color: #059669;
    border-color: #10b981;
  }

  .thumbs-up-btn:hover {
    border-color: #059669;
    background: #f0fdf4;
  }

  /* Selected state styles */
  .thumbs-down-btn.selected {
    background: #fef2f2;
    border-color: #dc2626;
    border-width: 3px;
  }

  .neutral-btn.selected {
    background: #dbeafe;
    border-color: #2563eb;
    border-width: 3px;
  }

  .thumbs-up-btn.selected {
    background: #dcfce7;
    border-color: #059669;
    border-width: 3px;
  }

  /* Hover overrides selected state */
  .confidence-actions:hover .thumbs-down-btn.selected:not(:hover) {
    background: white !important;
    border-color: #fecaca !important;
    border-width: 2px !important;
  }

  .confidence-actions:hover .neutral-btn.selected:not(:hover) {
    background: white !important;
    border-color: #93c5fd !important;
    border-width: 2px !important;
  }

  .confidence-actions:hover .thumbs-up-btn.selected:not(:hover) {
    background: white !important;
    border-color: #10b981 !important;
    border-width: 2px !important;
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