<!-- src/routes/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { lessonStore, loadLessonData } from '$lib/stores/lessonStore';
  import { userStore, userActions } from '$lib/stores/userStore';
  import CourseHeader from '$lib/components/CourseHeader.svelte';
  import InquiryDisplay from '$lib/components/InquiryDisplay.svelte';
  import ExerciseContainer from '$lib/components/ExerciseContainer.svelte';
  import ConfidenceCheck from '$lib/components/ConfidenceCheck.svelte';
  import ReflectionStub from '$lib/components/ReflectionStub.svelte';


  // Auto-subscription to stores
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

  // Event handlers
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
    
    {#if userData.lesson.readyForNext}
      <ReflectionStub onClose={handleReflectionClose} />
    {:else}
      <ExerciseContainer />
      
      <ConfidenceCheck 
        conceptName={currentConcept.name}
        nextConceptName="Multiple Fields"
        onExploring={handleConfidenceExploring}
        onReady={handleConfidenceReady}
        onBrowseTopics={handleBrowseTopics}
      />
    {/if}

  {:else}
    <div class="loading">
      <p>Initializing...</p>
    </div>
  {/if}
</main>

<style>
  main {
    min-height: 100vh;
    background: white;
    max-width: 900px;
    margin: 0 auto;
    padding: 0.75rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  }

  .loading {
    min-height: 50vh;
  }

  .loading p {
    font-size: 1.1rem;
    color: #666;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  }

  .error {
    min-height: 50vh;
  }

  .error h3 {
    color: #dc2626;
    margin-bottom: 1rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  }

  .error p {
    color: #666;
    margin-bottom: 1.5rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  }

  .error button {
    padding: 0.5rem 1rem;
    background: #2563eb;
    color: white;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  }

  .error button:hover {
    background: #1d4ed8;
  }

  .learning-workspace {
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    padding: 1rem;
    margin-top: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

</style>