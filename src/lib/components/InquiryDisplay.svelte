<script lang="ts">
  import { teacherStore, getRandomEncouragement } from '$lib/stores/teacherStore';
  import { userStore } from '$lib/stores/userStore';
  
  export let exerciseInquiry: string = "";
  export let currentHint: string = "";
  export let currentSolution: string = "";
  
  // Get current state from stores
  $: lessonData = $userStore;
  $: teacherData = $teacherStore;
  $: currentContentType = lessonData?.lesson?.currentContentType;
  $: encouragementState = lessonData?.lesson?.encouragementState;
  
  // Get encouragement text based on current state
  $: currentEncouragement = currentContentType === 'encouragement' && encouragementState 
    ? getRandomEncouragement(encouragementState)
    : '';
</script>

<div class="inquiry-display">
  <!-- Exercise Inquiry Container -->
  {#if exerciseInquiry}
    <div class="inquiry-container">
      <h2 class="inquiry-question">{exerciseInquiry}</h2>
    </div>
  {/if}
</div>

<style>
  .inquiry-display {
    margin-bottom: 0.125rem;
    margin-top: 1.5rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  }

  .inquiry-container {
    margin-bottom: 0.5rem;
  }

  .inquiry-question {
    font-size: 1.125rem;
    font-weight: 600;
    color: #1e293b;
    line-height: 1.2;
    margin: 0;
  }

  .exercise-hint, .exercise-solution, .exercise-encouragement {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
    padding: 0.5rem;
    border-radius: 0.25rem;
  }

  .exercise-hint {
    background-color: #fef2f2;
    border-left: 4px solid #f59e0b;
  }

  .exercise-solution {
    background-color: #d1fae5;
    border-left: 4px solid #10b981;
  }

  .exercise-encouragement {
    background-color: #fdf2f8;
    border-left: 4px solid #ec4899;
  }

  .hint-label, .solution-label, .encouragement-label {
    font-weight: 600;
    font-size: 0.875rem;
    flex-shrink: 0;
  }

  .hint-label {
    color: #92400e;
  }

  .solution-label {
    color: #065f46;
  }

  .encouragement-label {
    color: #831843;
  }

  .hint-text, .solution-text, .encouragement-text {
    color: #451a03;
    line-height: 1.6;
    font-size: 1rem;
  }

  .solution-text {
    color: #064e3b;
  }

  .encouragement-text {
    color: #500724;
  }
</style>
