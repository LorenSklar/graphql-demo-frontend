<!-- src/lib/components/ExercisePanel.svelte -->

<script>
  import { lessonStore } from '$lib/stores/lessonStore';
  import { userStore, userActions } from '$lib/stores/userStore';
  import ExerciseResourceBar from './ExerciseResourceBar.svelte';
  import SandboxContainer from './SandboxContainer.svelte';
  import ExerciseNavigation from './ExerciseNavigation.svelte';

  // Reactive declarations to get current state
  $: lessonData = $lessonStore;
  $: userData = $userStore;
  $: currentExercise = lessonData?.exercises?.[userData.currentExerciseIndex];
  $: currentConceptIndex = userData?.currentConceptIndex || 0;
  $: currentConcept = lessonData?.concepts?.[currentConceptIndex];

  function handleBrowseTopics() {
    // TODO: Navigate back to curriculum
    console.log('Browse all topics');
  }

  function handlePreviousExercise() {
    if (userData.currentExerciseIndex > 0) {
      userActions.goToPreviousExercise();
    }
  }

  function handleNextExercise() {
    if (userData.passedRegex && userData.currentExerciseIndex < lessonData.exercises.length - 1) {
      userActions.goToNextExercise();
    }
  }
</script>

<div class="exercise-container">
  {#if lessonData && currentExercise}
    <ExerciseResourceBar 
      resources={lessonData.resources}
      generalHintsUsed={Math.max(0, userData.currentHintIndex + 1)}
      totalGeneralHints={currentConcept?.generalHints?.length || 0}
      solutionHintsUsed={Math.max(0, userData.currentSolutionIndex + 1)}
      totalSolutionHints={currentExercise?.solutions?.length || 0}
      onUseGeneralHint={userActions.showNextHint}
      onUseSolutionHint={userActions.showNextSolution}
    />

    <SandboxContainer 
      exercise={currentExercise}
      onQueryAttempt={userActions.addQueryAttempt}
      onRegexCheck={userActions.setRegexPassed}
    />

    <ExerciseNavigation 
      canGoPrevious={userData.currentExerciseIndex > 0}
      canGoNext={userData.passedRegex && userData.currentExerciseIndex < lessonData.exercises.length - 1}
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