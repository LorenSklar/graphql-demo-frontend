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
      <span class="text">Previous</span>
      <span class="arrow">&lt;</span>
    </button>
    
    <div class="exercise-counter">
      Exercise {currentExercise} / {totalExercises}
    </div>
    
    <button 
      on:click={onNext}
      disabled={!canGoNext}
      class="nav-button next"
    >
      <span class="text">Next</span>
      <span class="arrow">&gt;</span>
    </button>
  </div>
</div>

<style>
  .exercise-navigation {
    padding: 0.75rem;
    text-align: center;
    margin-top: 0.25rem;
  }

  .nav-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.75rem;
  }

  .exercise-counter {
    font-weight: 600;
    color: #374151;
    font-size: 1rem;
  }

  .nav-button {
    padding: 0.75rem 1.25rem;
    border: 1px solid #dee2e6;
    border-radius: 0.75rem;
    background: white;
    cursor: pointer;
    font-weight: 500;
    min-width: 8.75rem;
  }

  /* Mobile first - smaller buttons */
  .nav-button {
    padding: 0.5rem 0.75rem;
    min-width: 3rem;
    font-size: 0.875rem;
  }

  /* Larger screens - bigger buttons */
  @media (min-width: 768px) {
    .nav-button {
      padding: 0.75rem 1.25rem;
      min-width: 8.75rem;
      font-size: 1rem;
    }
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

  /* Mobile first - show arrows, hide text */
  .nav-button .text {
    display: none;
  }

  .nav-button .arrow {
    display: inline;
  }

  /* Larger screens - show text, hide arrows */
  @media (min-width: 768px) {
    .nav-button .text {
      display: inline;
    }
    
    .nav-button .arrow {
      display: none;
    }
  }
</style>