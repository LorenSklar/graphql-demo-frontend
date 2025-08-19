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
  import StudentPath from '$lib/components/StudentPath.svelte';


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
    // Warm up backend API in background
    loadLessonData();
  });

  // Event handlers
  function handleNeedHelp() {
    // Thumbs down - need foundation help, show teacher guidance
    userActions.setSourceState(-1);
    userActions.setConfidenceLevel(-1);
  }

  function handleStillExploring() {
    // Brain - still exploring, go to next exercise
    userActions.setConfidenceLevel(0);
    if (lesson && userData.lesson.currentExerciseIndex < (lesson.exercises.length - 1)) {
      userActions.goToNextExercise();
    }
  }

  function handleReadyForReflection() {
    // Thumbs up - ready for reflection
    userActions.setConfidenceLevel(1);
  }

  function handleReflectionSubmit() {
    // Reflection submitted - show teacher guidance for next concept selection
    userActions.setSourceState(1);
    userActions.setConfidenceLevel(-1);
  }

  function handleReflectionClose() {
    // Close reflection, go back to exercises
    userActions.setConfidenceLevel(0);
  }

  function handleStudentPathClose() {
    // Close student path, go back to exercises
    userActions.setConfidenceLevel(0);
  }

  function handleReturnToExercise() {
    // Return to current exercise from teacher guidance
    userActions.setConfidenceLevel(0);
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
    
    {#if userData.lesson.confidenceLevel === 1}
      <ReflectionStub 
        onClose={handleReflectionClose} 
        onSubmit={handleReflectionSubmit}
      />
    {:else if userData.lesson.confidenceLevel === -1}
      <StudentPath 
        sourceState={userData.lesson.sourceState}
        onReturnToExercise={handleReturnToExercise}
        onBrowseTopics={handleBrowseTopics}
        onGoToFoundation={() => console.log('Go to foundation topic')}
        onGoToExtension={() => console.log('Go to extension topic')}
      />
    {:else}
      <ExerciseContainer />
      
      <ConfidenceCheck 
        conceptName={currentConcept.name}
        nextConceptName="Multiple Fields"
        onNeedHelp={handleNeedHelp}
        onStillExploring={handleStillExploring}
        onReadyForReflection={handleReadyForReflection}
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

</style>