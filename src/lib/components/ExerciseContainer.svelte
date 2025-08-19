<!-- src/lib/components/ExercisePanel.svelte -->

<script>
  import { lessonStore } from '$lib/stores/lessonStore';
  import { userStore, userActions } from '$lib/stores/userStore';
  import ExerciseResourceBar from './ExerciseResourceBar.svelte';
  import SandboxInterface from './SandboxInterface.svelte';
  import ExerciseNavigation from './ExerciseNavigation.svelte';
  import InquiryDisplay from './InquiryDisplay.svelte';

  // Reactive declarations to get current state
  $: lessonData = $lessonStore;
  $: userData = $userStore;
  $: currentExercise = lessonData?.data?.exercises?.[userData.lesson?.currentExerciseIndex];
  $: currentConceptIndex = userData?.lesson?.currentConceptIndex || 0;
  $: currentConcept = lessonData?.data?.concepts?.[currentConceptIndex];
  $: completedExercises = userData.lesson.currentExerciseIndex; // Exercises completed so far

  function handleBrowseTopics() {
    // TODO: Navigate back to curriculum
    console.log('Browse all topics');
  }
</script>

<div class="exercise-container">
  {#if lessonData?.data && currentExercise}

    <!-- Resource Bar -->
    <ExerciseResourceBar 
      resources={[]}
      generalHintsUsed={userData.lesson.currentHintIndex >= 0 ? userData.lesson.currentHintIndex + 1 : 0}
      totalGeneralHints={currentConcept?.generalHints?.length || 0}
      solutionHintsUsed={userData.lesson.currentSolutionIndex >= 0 ? userData.lesson.currentSolutionIndex + 1 : 0}
      totalSolutionHints={currentExercise?.solutions?.length || 0}
      onUseGeneralHint={userActions.showNextHint}
      onUseSolutionHint={userActions.showNextSolution}
    />

    <!-- Exercise Inquiry -->
    <InquiryDisplay 
      exerciseInquiry={currentExercise.inquiry || ''}
      currentHint={userData.lesson.currentHintIndex >= 0 ? currentConcept?.generalHints?.[userData.lesson.currentHintIndex]?.text || '' : ''}
      currentSolution={userData.lesson.currentSolutionIndex >= 0 ? currentConcept?.generalHints?.[userData.lesson.currentSolutionIndex]?.text || '' : ''}
    />

    <SandboxInterface 
      exercise={currentExercise}
      onQueryAttempt={userActions.addQueryAttempt}
      onRegexCheck={userActions.setRegexPassed}
    />

    <ExerciseNavigation 
      currentExercise={userData.lesson.currentExerciseIndex + 1}
      totalExercises={lessonData.data?.exercises?.length || 1}
      completedExercises={completedExercises}
    />

  {:else}
    <div class="loading">Loading exercise...</div>
  {/if}
</div>

<style>
  .exercise-container {
    max-width: 900px;
    margin: 0 auto;
    padding: 0.75rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    background-color: white;
  }

  .loading {
    min-height: 50vh;
    text-align: center;
    padding: 2rem;
    color: #64748b;
  }
</style>