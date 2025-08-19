<!-- src/lib/components/ExerciseNavigation.svelte -->
 
<script>
  export let currentExercise = 1;
  export let totalExercises = 1;
  export let completedExercises = 0;
</script>

<div class="exercise-navigation">
  <div class="progress-circles">
    {#each Array(totalExercises) as _, index}
      <div class="progress-circle {index < currentExercise ? 'completed' : 'incomplete'}">
      </div>
    {/each}
  </div>
</div>

<style>
  .exercise-navigation {
    padding: 0.75rem;
    text-align: center;
    margin-top: 0.25rem;
  }

  .progress-circles {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  .progress-circle {
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    border: 2px solid #000;
    transition: all 0.2s ease;
  }

  .progress-circle.completed {
    background-color: #000;
  }

  .progress-circle.incomplete {
    background-color: transparent;
  }

  /* Mobile optimization */
  @media (max-width: 640px) {
    .progress-circles {
      gap: 0.25rem;
    }
    
    .progress-circle {
      width: 0.875rem;
      height: 0.875rem;
      border-width: 1.5px;
    }
  }
</style>