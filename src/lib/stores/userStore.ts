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
  readyForNext: boolean;
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
    readyForNext: false
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
  setReadyForNext(ready: boolean) {
    userStore.update(state => ({
      ...state,
      lesson: {
        ...state.lesson,
        readyForNext: ready
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
      const nextIndex = (state.lesson.currentHintIndex + 1) % 3;
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
      const nextIndex = (state.lesson.currentSolutionIndex + 1) % 3;
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
        readyForNext: false
      }
    }));
  }
};
