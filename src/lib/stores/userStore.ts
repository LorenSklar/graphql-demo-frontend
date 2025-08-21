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
  currentEncouragementIndex: number;
  currentContentType: 'hint' | 'solution' | 'encouragement' | null; // Which type is currently visible
  encouragementState: 'struggle' | 'persistence' | 'achievement'; // Which type of encouragement to show
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
    currentHintIndex: 0,
    currentSolutionIndex: 0,
    currentEncouragementIndex: 0,
    currentContentType: null,
    encouragementState: 'struggle', // Default to struggle
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
        currentHintIndex: 0,
        currentSolutionIndex: 0,
        currentEncouragementIndex: 0,
        currentContentType: null,
        encouragementState: 'struggle' // Reset to struggle for new exercise
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
        currentHintIndex: 0,
        currentSolutionIndex: 0,
        currentEncouragementIndex: 0,
        currentContentType: null,
        encouragementState: 'struggle' // Reset to struggle for new exercise
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
    userStore.update(state => {
      let newEncouragementState = state.lesson.encouragementState;
      
      if (passed) {
        // Passed regex
        if (state.lesson.queryAttempts > 0) {
          // Passed after failure - persistence
          newEncouragementState = 'persistence';
        } else {
          // Passed without failure - achievement
          newEncouragementState = 'achievement';
        }
      } else {
        // Failed regex - struggle
        newEncouragementState = 'struggle';
      }
      
      return {
        ...state,
        lesson: {
          ...state.lesson,
          passedRegex: passed,
          encouragementState: newEncouragementState
        }
      };
    });
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

  // Hints, solutions, and encouragement - unified toggle system
  showNextHint() {
    userStore.update(state => {
      const currentType = state.lesson.currentContentType;
      
      // If nothing showing OR different type showing
      if (currentType !== 'hint') {
        return {
          ...state,
          lesson: {
            ...state.lesson,
            currentContentType: 'hint'
          }
        };
      }
      
      // If hint is showing, advance
      if (state.lesson.currentHintIndex >= 2) {
        // On last item - cycle back to first
        return {
          ...state,
          lesson: {
            ...state.lesson,
            currentHintIndex: 0
          }
        };
      } else {
        // Advance to next
        return {
          ...state,
          lesson: {
            ...state.lesson,
            currentHintIndex: state.lesson.currentHintIndex + 1
          }
        };
      }
    });
  },

  showNextSolution() {
    userStore.update(state => {
      const currentType = state.lesson.currentContentType;
      
      // If nothing showing OR different type showing
      if (currentType !== 'solution') {
        return {
          ...state,
          lesson: {
            ...state.lesson,
            currentContentType: 'solution'
          }
        };
      }
      
      // If solution is showing, advance
      if (state.lesson.currentSolutionIndex >= 2) {
        // On last item - cycle back to first
        return {
          ...state,
          lesson: {
            ...state.lesson,
            currentSolutionIndex: 0
          }
        };
      } else {
        // Advance to next
        return {
          ...state,
          lesson: {
            ...state.lesson,
            currentSolutionIndex: state.lesson.currentSolutionIndex + 1
          }
        };
      }
    });
  },

  showNextEncouragement() {
    userStore.update(state => {
      const currentType = state.lesson.currentContentType;
      
      // If nothing showing OR different type showing
      if (currentType !== 'encouragement') {
        return {
          ...state,
          lesson: {
            ...state.lesson,
            currentContentType: 'encouragement'
          }
        };
      }
      
      // If encouragement is showing, advance
      if (state.lesson.currentEncouragementIndex >= 2) {
        // On last item - cycle back to first
        return {
          ...state,
          lesson: {
            ...state.lesson,
            currentEncouragementIndex: 0
          }
        };
      } else {
        // Advance to next
        return {
          ...state,
          lesson: {
            ...state.lesson,
            currentEncouragementIndex: state.lesson.currentEncouragementIndex + 1
          }
        };
      }
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
        currentHintIndex: 0,
        currentSolutionIndex: 0,
        currentEncouragementIndex: 0,
        currentContentType: null,
        encouragementState: 'struggle' // Reset to struggle for new exercise
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
        currentHintIndex: 0,
        currentSolutionIndex: 0,
        currentEncouragementIndex: 0,
        currentContentType: null,
        confidenceLevel: -1,
        sourceState: -1,
        encouragementState: 'struggle' // Reset to struggle for new lesson
      }
    }));
  }
};
