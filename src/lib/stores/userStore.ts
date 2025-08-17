import { writable } from 'svelte/store';

export interface UserState {
  currentExerciseIndex: number;
  readyForNext: boolean;
  passedRegex: boolean;
  queryAttempts: number;
  currentHintIndex: number;
  currentSolutionIndex: number;
}

// Create the store with initial state
export const userStore = writable<UserState>({
  currentExerciseIndex: 0,
  readyForNext: false,
  passedRegex: false,
  queryAttempts: 0,
  currentHintIndex: -1,
  currentSolutionIndex: -1
});

// User actions
export const userActions = {
  // Exercise navigation
  goToNextExercise() {
    userStore.update(state => ({
      ...state,
      currentExerciseIndex: state.currentExerciseIndex + 1,
      passedRegex: false,
      queryAttempts: 0,
      currentHintIndex: -1,
      currentSolutionIndex: -1
    }));
  },

  goToPreviousExercise() {
    userStore.update(state => ({
      ...state,
      currentExerciseIndex: Math.max(0, state.currentExerciseIndex - 1),
      passedRegex: false,
      queryAttempts: 0,
      currentHintIndex: -1,
      currentSolutionIndex: -1
    }));
  },

  // Confidence and reflection
  setReadyForNext(ready: boolean) {
    userStore.update(state => ({
      ...state,
      readyForNext: ready
    }));
  },

  // Query validation
  setRegexPassed(passed: boolean) {
    userStore.update(state => ({
      ...state,
      passedRegex: passed
    }));
  },

  addQueryAttempt() {
    userStore.update(state => ({
      ...state,
      queryAttempts: state.queryAttempts + 1
    }));
  },

  // Hints and solutions
  showNextHint() {
    userStore.update(state => ({
      ...state,
      currentHintIndex: state.currentHintIndex + 1
    }));
  },

  showNextSolution() {
    userStore.update(state => ({
      ...state,
      currentSolutionIndex: state.currentSolutionIndex + 1
    }));
  },

  // Reset for new exercise
  resetForExercise() {
    userStore.update(state => ({
      ...state,
      passedRegex: false,
      queryAttempts: 0,
      currentHintIndex: -1,
      currentSolutionIndex: -1
    }));
  }
};
