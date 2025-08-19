import { writable, get } from 'svelte/store';
import { lessonStore } from './lessonStore';

export interface LessonState {
  currentExerciseIndex: number;
  currentConceptIndex: number;
  currentLessonId: string;
  passedRegex: boolean;
  queryAttempts: number;
  currentHintIndex: number;
  currentSolutionIndex: number;
  confidenceLevel: -1 | 0 | 1; // -1: need help, 0: still exploring, 1: ready for reflection
  sourceState: -1 | 1; // -1: need help, +1: completed reflection (for TeacherGuidance)
}

export interface UserState {
  lesson: LessonState;
  // Future: user preferences, motivation, achievements, etc.
  // preferences: UserPreferences;
  // motivation: MotivationState;
  // achievements: AchievementState;
}

// Create the store with initial state
export const userStore = writable<UserState>({
  lesson: {
    currentExerciseIndex: 0,
    currentConceptIndex: 0,
    currentLessonId: "lesson-1a1",
    passedRegex: false,
    queryAttempts: 0,
    currentHintIndex: -1,
    currentSolutionIndex: -1,
    confidenceLevel: 0, // Default to still exploring (show exercises)
    sourceState: -1 // Default to -1 (need help)
  }
});

// User actions
export const userActions = {
  // Exercise navigation
  goToNextExercise() {
    userStore.update(state => ({
      ...state,
      lesson: {
        ...state.lesson,
        currentExerciseIndex: state.lesson.currentExerciseIndex + 1,
        passedRegex: false,
        queryAttempts: 0,
        currentHintIndex: -1,
        currentSolutionIndex: -1
      }
    }));
  },

  goToPreviousExercise() {
    userStore.update(state => ({
      ...state,
      lesson: {
        ...state.lesson,
        currentExerciseIndex: Math.max(0, state.lesson.currentExerciseIndex - 1),
        passedRegex: false,
        queryAttempts: 0,
        currentHintIndex: -1,
        currentSolutionIndex: -1
      }
    }));
  },

  // Confidence and reflection
  setConfidenceLevel(level: -1 | 0 | 1) {
    userStore.update(state => ({
      ...state,
      lesson: {
        ...state.lesson,
        confidenceLevel: level
      }
    }));
  },

  setSourceState(source: -1 | 1) {
    userStore.update(state => ({
      ...state,
      lesson: {
        ...state.lesson,
        sourceState: source
      }
    }));
  },

  // Legacy support - can remove later
  setReadyForNext(ready: boolean) {
    userStore.update(state => ({
      ...state,
      lesson: {
        ...state.lesson,
        confidenceLevel: ready ? 1 : -1
      }
    }));
  },

  // Query validation
  setRegexPassed(passed: boolean) {
    userStore.update(state => ({
      ...state,
      lesson: {
        ...state.lesson,
        passedRegex: passed
      }
    }));
  },

  addQueryAttempt() {
    userStore.update(state => ({
      ...state,
      lesson: {
        ...state.lesson,
        queryAttempts: state.lesson.queryAttempts + 1
      }
    }));
  },

  // Hints and solutions
  showNextHint() {
    userStore.update(state => {
      // Cycle: -1 → 0 → 1 → 2 → -1
      let nextIndex;
      if (state.lesson.currentHintIndex === -1) {
        nextIndex = 0;
      } else if (state.lesson.currentHintIndex === 2) {
        nextIndex = -1;
      } else {
        nextIndex = state.lesson.currentHintIndex + 1;
      }
      return {
        ...state,
        lesson: {
          ...state.lesson,
          currentHintIndex: nextIndex
        }
      };
    });
  },

  showNextSolution() {
    userStore.update(state => {
      // Cycle: -1 → 0 → 1 → 2 → -1
      let nextIndex;
      if (state.lesson.currentSolutionIndex === -1) {
        nextIndex = 0;
      } else if (state.lesson.currentSolutionIndex === 2) {
        nextIndex = -1;
      } else {
        nextIndex = state.lesson.currentSolutionIndex + 1;
      }
      return {
        ...state,
        lesson: {
          ...state.lesson,
          currentSolutionIndex: nextIndex
        }
      };
    });
  },

  // Reset for new exercise
  resetForExercise() {
    userStore.update(state => ({
      ...state,
      lesson: {
        ...state.lesson,
        hasPassedRegex: false,
        queryAttempts: 0,
        currentHintIndex: -1,
        currentSolutionIndex: -1
      }
    }));
  },

  // Lesson management
  setCurrentLesson(lessonId: string) {
    userStore.update(state => ({
      ...state,
      lesson: {
        ...state.lesson,
        currentLessonId: lessonId,
        currentExerciseIndex: 0,
        currentConceptIndex: 0,
        passedRegex: false,
        queryAttempts: 0,
        currentHintIndex: -1,
        currentSolutionIndex: -1,
        confidenceLevel: -1,
        sourceState: -1
      }
    }));
  }
};
