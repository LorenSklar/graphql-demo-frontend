<!-- src/routes/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { lessonStore, loadLessonData } from '$lib/stores/lessonStore';
  import { userStore, userActions } from '$lib/stores/userStore';
  import CourseHeader from '$lib/components/CourseHeader.svelte';
  import InquiryDisplay from '$lib/components/InquiryDisplay.svelte';
  import ExerciseContainer from '$lib/components/ExerciseContainer.svelte';
  import ConfidenceCheck from '$lib/components/ConfidenceCheck.svelte';
  // TODO: Create these components
  // import ReflectionContainer from '$lib/components/ReflectionContainer.svelte';

  // Auto-subscription to stores (proper Svelte pattern)
  $: lessonData = $lessonStore;
  $: userData = $userStore;

  // Reactive declarations based on store state
  $: isLoading = lessonData.loading;
  $: lesson = lessonData.data;
  $: error = lessonData.error;
  $: currentExercise = lesson?.exercises?.[userData?.lesson?.currentExerciseIndex];
  $: currentConcept = lesson?.concepts?.[0];

  onMount(() => {
    // Store handles its own state management
    loadLessonData();
  });

  function handleConfidenceExploring() {
    // Thumbs down - still exploring, stay with exercises
    userActions.setReadyForNext(false);
  }

  function handleConfidenceReady() {
    // Thumbs up - ready, open reflection container
    userActions.setReadyForNext(true);
  }

  function handleReflectionClose() {
    // Close reflection container, go back to exercises
    userActions.setReadyForNext(false);
  }

  function handleBrowseTopics() {
    // TODO: Navigate back to curriculum
    console.log('Browse all topics');
  }
</script>

<main>
  {#if isLoading}
    <div class="loading">
      <p>Loading lesson...</p>
    </div>
  {:else if error}
    <div class="error">
      <h3>Unable to load lesson</h3>
      <p>Please check your connection and try again.</p>
      <button on:click={() => loadLessonData()}>Retry</button>
    </div>
  {:else if lesson && userData && currentExercise && currentConcept}
    
    <CourseHeader 
      conceptName={currentConcept.name}
      currentExercise={userData.lesson.currentExerciseIndex + 1}
      totalExercises={lesson.exercises.length}
      onBrowseTopics={handleBrowseTopics}
    />
    
    <InquiryDisplay 
      conceptInquiry={currentConcept.inquiry || ''}
      currentHint={userData.lesson.currentHintIndex >= 0 ? currentConcept.generalHints?.[userData.lesson.currentHintIndex]?.text || '' : ''}
      currentSolution={userData.lesson.currentSolutionIndex >= 0 ? currentConcept.generalHints?.[userData.lesson.currentSolutionIndex]?.text || '' : ''}
    />

    {#if userData.lesson.readyForNext}
      <!-- TODO: Create ReflectionContainer component -->
      <div class="stub-component">
        <h3>Reflection Container (TODO)</h3>
        <p>This will show reflection prompts when user is ready for next concept.</p>
        <button on:click={handleReflectionClose}>Back to Exercise</button>
      </div>
    {:else}
      <ExerciseContainer />
    {/if}

    <ConfidenceCheck 
      conceptName={currentConcept.name}
      nextConceptName="Multiple Fields"
      onExploring={handleConfidenceExploring}
      onReady={handleConfidenceReady}
      onBrowseTopics={handleBrowseTopics}
    />

  {:else}
    <div class="loading">
      <p>Initializing...</p>
    </div>
  {/if}
</main>

<style>
  main {
    min-height: 100vh;
    background: #fafafa;
    max-width: 900px;
    margin: 0 auto;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 50vh;
  }

  .loading p {
    font-size: 1.1rem;
    color: #666;
  }

  .error {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 50vh;
    text-align: center;
  }

  .error h3 {
    color: #dc2626;
    margin-bottom: 1rem;
  }

  .error p {
    color: #666;
    margin-bottom: 1.5rem;
  }

  .error button {
    padding: 0.5rem 1rem;
    background: #2563eb;
    color: white;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
  }

  .error button:hover {
    background: #1d4ed8;
  }

  .stub-component {
    padding: 2rem;
    background: #f8f9fa;
    border: 2px dashed #dee2e6;
    border-radius: 0.5rem;
    text-align: center;
  }

  .stub-component h3 {
    color: #6c757d;
    margin-bottom: 1rem;
  }

  .stub-component p {
    color: #6c757d;
    margin-bottom: 1rem;
  }
</style>