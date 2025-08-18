<!-- src/lib/components/ExerciseNavigation.svelte -->
 
<script>
  export let currentExercise = 1;
  export let totalExercises = 1;
  export let canGoPrevious = false;
  export let canGoNext = false;
  export let onPrevious = () => {};
  export let onNext = () => {};
</script>

<div class="exercise-navigation">
  <div class="nav-controls">
    <button 
      on:click={onPrevious}
      disabled={!canGoPrevious}
      class="nav-button previous"
    >
      &lt;&nbsp;&nbsp;Previous
    </button>
    
    <div class="exercise-counter">
      Exercise {currentExercise} / {totalExercises}
    </div>
    
    <button 
      on:click={onNext}
      disabled={!canGoNext}
      class="nav-button next"
    >
      Next&nbsp;&nbsp;&gt;
    </button>
  </div>
</div>

<style>
  .exercise-navigation {
    padding: 1rem;
    text-align: center;
    margin-top: 0.25rem;
  }

  .nav-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  }

  .exercise-counter {
    font-weight: 600;
    color: #374151;
    font-size: 1rem;
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
    border-radius: 12px;
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
    background: #007acc;
    color: white;
    border-color: #007acc;
  }

  .nav-button.next:hover:not(:disabled) {
    background: #005a9e;
    border-color: #005a9e;
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