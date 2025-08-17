<!-- src/lib/components/ExercisePanel.svelte -->

<script>
  import { lessonStore } from '$lib/stores/lessonStore';
  import { userStore, userActions } from '$lib/stores/userStore';
  import ExerciseResourceBar from './ExerciseResourceBar.svelte';
  import SandboxInterface from './SandboxInterface.svelte';
  import ExerciseNavigation from './ExerciseNavigation.svelte';

  // Reactive declarations to get current state
  $: lessonData = $lessonStore;
  $: userData = $userStore;
  $: currentExercise = lessonData?.data?.exercises?.[userData.lesson?.currentExerciseIndex];
  $: currentConceptIndex = userData?.lesson?.currentConceptIndex || 0;
  $: currentConcept = lessonData?.data?.concepts?.[currentConceptIndex];

  function handleBrowseTopics() {
    // TODO: Navigate back to curriculum
    console.log('Browse all topics');
  }

  function handlePreviousExercise() {
    if (userData.lesson.currentExerciseIndex > 0) {
      userActions.goToPreviousExercise();
    }
  }

  function handleNextExercise() {
    if (userData.lesson.passedRegex && userData.lesson.currentExerciseIndex < (lessonData.data?.exercises?.length || 0) - 1) {
      userActions.goToNextExercise();
    }
  }
</script>

<div class="exercise-container">
  {#if lessonData?.data && currentExercise}

    <ExerciseResourceBar 
      resources={[]}
      generalHintsUsed={userData.lesson.currentHintIndex >= 0 ? userData.lesson.currentHintIndex + 1 : 0}
      totalGeneralHints={currentConcept?.generalHints?.length || 0}
      solutionHintsUsed={userData.lesson.currentSolutionIndex >= 0 ? userData.lesson.currentSolutionIndex + 1 : 0}
      totalSolutionHints={currentExercise?.solutions?.length || 0}
      onUseGeneralHint={userActions.showNextHint}
      onUseSolutionHint={userActions.showNextSolution}
    />

    <SandboxInterface 
      exercise={currentExercise}
      onQueryAttempt={userActions.addQueryAttempt}
      onRegexCheck={userActions.setRegexPassed}
    />

    <ExerciseNavigation 
      canGoPrevious={userData.lesson.currentExerciseIndex > 0}
      canGoNext={userData.lesson.passedRegex && userData.lesson.currentExerciseIndex < (lessonData.data?.exercises?.length || 0) - 1}
      onPrevious={handlePreviousExercise}
      onNext={handleNextExercise}
    />

  {:else}
    <div class="loading">Loading exercise...</div>
  {/if}
</div>

<style>
  .exercise-container {
    max-width: 900px;
    margin: 0 auto;
    padding: 2rem;
    min-height: 100vh;
    background: #fafafa;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .loading {
    text-align: center;
    padding: 2rem;
    color: #64748b;
  }
</style>