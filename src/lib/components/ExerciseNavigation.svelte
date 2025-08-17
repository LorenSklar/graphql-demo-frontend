<!-- src/lib/components/ExerciseNavigation.svelte -->
 
<script>
  export let canGoPrevious = false;
  export let canGoNext = false;
  export let onPrevious = () => {};
  export let onNext = () => {};
</script>

<div class="exercise-navigation-stub">
  <h3>ExerciseNavigation (TODO)</h3>
  
  <div class="nav-buttons">
    <button 
      on:click={onPrevious}
      disabled={!canGoPrevious}
      class="nav-button previous"
    >
      ← Previous Exercise
    </button>
    
    <div class="nav-status">
      <span class="status-text">
        {#if !canGoPrevious && !canGoNext}
          Single exercise
        {:else if !canGoPrevious}
          First exercise
        {:else if !canGoNext}
          Complete current to continue
        {:else}
          Navigate exercises
        {/if}
      </span>
    </div>
    
    <button 
      on:click={onNext}
      disabled={!canGoNext}
      class="nav-button next"
    >
      Next Exercise →
    </button>
  </div>
</div>

<style>
  .exercise-navigation-stub {
    padding: 1.5rem;
    background: #f8f9fa;
    border: 2px dashed #dee2e6;
    border-radius: 0.5rem;
    text-align: center;
  }

  .exercise-navigation-stub h3 {
    color: #6c757d;
    margin-bottom: 1rem;
  }

  .nav-buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  }

  .nav-button {
    padding: 0.75rem 1.25rem;
    border: 1px solid #dee2e6;
    border-radius: 0.25rem;
    background: white;
    cursor: pointer;
    font-weight: 500;
    min-width: 140px;
  }

  .nav-button:hover:not(:disabled) {
    background: #e9ecef;
    border-color: #adb5bd;
  }

  .nav-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .nav-button.next:not(:disabled) {
    background: #28a745;
    color: white;
    border-color: #28a745;
  }

  .nav-button.next:hover:not(:disabled) {
    background: #218838;
    border-color: #1e7e34;
  }

  .nav-status {
    flex: 1;
    text-align: center;
  }

  .status-text {
    color: #6c757d;
    font-size: 0.875rem;
    font-style: italic;
  }
</style>