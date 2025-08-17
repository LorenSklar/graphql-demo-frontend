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

  let currentLesson;
  let userData;

  const unsubscribeUser = userStore.subscribe((user) => {
    userData = user;
  });

  onMount(async () => {
    // Load lesson data
    currentLesson = await loadLessonData();
  });

  // Reactive declarations
  $: currentExercise = currentLesson?.exercises?.[userData?.currentExerciseIndex];
  $: currentConcept = currentLesson?.concepts?.[0]; // Get first concept from array

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
  {#if currentLesson && userData && currentExercise && currentConcept}
    
    <CourseHeader 
      conceptName={currentConcept.name}
      currentExercise={userData.currentExerciseIndex + 1}
      totalExercises={currentLesson.exercises.length}
      onBrowseTopics={handleBrowseTopics}
    />
    
    <InquiryDisplay 
      conceptInquiry={currentConcept.inquiry || ''}
      currentHint={userData.currentHintIndex >= 0 ? currentConcept.generalHints?.[userData.currentHintIndex]?.text || '' : ''}
      currentSolution={userData.currentSolutionIndex >= 0 ? currentConcept.solutions?.[userData.currentSolutionIndex] || '' : ''}
    />

    {#if userData.readyForNext}
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
      nextConceptName={currentLesson.nextConcept?.name}
      onExploring={handleConfidenceExploring}
      onReady={handleConfidenceReady}
      onBrowseTopics={handleBrowseTopics}
    />

  {:else}
    <div class="loading">
      <p>Loading lesson...</p>
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