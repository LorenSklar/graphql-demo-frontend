<!-- src/lib/components/TeacherGuidance.svelte -->
 
<script lang="ts">
  export let onReturnToExercise = () => {};
  export let onGoToFoundation = () => {};
  export let onGoToExtension = () => {};
  export let onBrowseTopics = () => {}; // New prop for browsing all topics
  export let sourceState: -1 | 1 = -1; // -1: need help, +1: completed reflection
  
  // Stubbed data - replace with real data later
  const foundationTopics = [
    "Basic GraphQL Syntax",
    "Query Structure", 
    "Field Selection",
    "Error Handling"
  ];
  
  const extensionTopics = [
    "Multiple Fields",
    "Nested Queries",
    "Variables",
    "Fragments"
  ];
  
  $: isFromNeedHelp = sourceState === -1;
  $: isFromReflection = sourceState === 1;
</script>

<div class="student-path">
  <div class="path-header">
    <h3>My Path</h3>
    {#if isFromNeedHelp}
      <p>Choose what would help strengthen your foundation.</p>
    {:else if isFromReflection}
      <p>What would you like to explore next?</p>
    {/if}
  </div>
  
  <div class="guidance-content">
    {#if isFromNeedHelp}
      <!-- Show only foundation topics when user needs help -->
      <div class="foundation-section">
        <h4>Foundation Topics</h4>
        <p>These will help strengthen your understanding:</p>
        <div class="topic-list">
          {#each foundationTopics as topic}
            <button class="topic-btn foundation" on:click={onGoToFoundation}>
              {topic}
            </button>
          {/each}
        </div>
      </div>
    {:else if isFromReflection}
      <!-- Show only extension topics when user completed reflection -->
      <div class="extension-section">
        <h4>Extension Topics</h4>
        <p>Ready to explore more advanced concepts?</p>
        <div class="topic-list">
          {#each extensionTopics as topic}
            <button class="topic-btn extension" on:click={onGoToExtension}>
              {topic}
            </button>
          {/each}
        </div>
      </div>
    {/if}
  </div>
  
  <div class="guidance-actions">
    <button class="return-btn" on:click={onReturnToExercise}>
      Return to Current Exercise
    </button>
    <button class="browse-btn" on:click={onBrowseTopics}>
      Browse All Topics
    </button>
  </div>
</div>

<style>
  .student-path {
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    padding: 1.5rem;
    background-color: white;
    margin-top: 1rem;
  }

  .path-header {
    text-align: center;
    margin-bottom: 1.5rem;
  }

  .path-header h3 {
    color: #1f2937;
    margin: 0 0 0.5rem 0;
    font-size: 1.25rem;
  }

  .path-header p {
    color: #6b7280;
    margin: 0;
  }

  .guidance-content {
    display: grid;
    gap: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .foundation-section, .extension-section {
    padding: 1rem;
    border-radius: 0.5rem;
    border: 1px solid #e5e7eb;
  }

  .foundation-section {
    background-color: #fef3c7;
    border-color: #f59e0b;
  }

  .extension-section {
    background-color: #d1fae5;
    border-color: #10b981;
  }

  .foundation-section h4, .extension-section h4 {
    margin: 0 0 0.5rem 0;
    color: #1f2937;
  }

  .foundation-section p, .extension-section p {
    margin: 0 0 1rem 0;
    color: #6b7280;
    font-size: 0.875rem;
  }

  .topic-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .topic-btn {
    padding: 0.5rem 1rem;
    border: 1px solid;
    border-radius: 0.375rem;
    background: white;
    cursor: pointer;
    font-size: 0.875rem;
    transition: all 0.2s;
  }

  .topic-btn.foundation {
    border-color: #f59e0b;
    color: #92400e;
  }

  .topic-btn.foundation:hover {
    background: #fef3c7;
  }

  .topic-btn.extension {
    border-color: #10b981;
    color: #065f46;
  }

  .topic-btn.extension:hover {
    background: #d1fae5;
  }

  .guidance-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
  }

  .return-btn, .browse-btn {
    padding: 0.75rem 1.5rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    background: white;
    cursor: pointer;
    transition: all 0.2s;
  }

  .return-btn {
    color: #2563eb;
    border-color: #93c5fd;
  }

  .return-btn:hover {
    background: #eff6ff;
  }

  .browse-btn {
    color: #059669;
    border-color: #10b981;
  }

  .browse-btn:hover {
    background: #f0fdf4;
  }
</style>
