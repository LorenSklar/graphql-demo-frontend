import { writable } from 'svelte/store';

// Types for our MVP lesson data
export interface Hint {
  text: string;
  type: 'GENERAL_HINT' | 'STARTER_CODE' | 'SOLUTION_HINT';
  stepNumber?: number;
}

export interface Exercise {
  exercise_id: string;
  inquiry: string;
  hints: Hint[];
  solution: string[];
  minimalAnswerPattern: string;
  difficultyScore: number;
}

export interface Concept {
  concept_id: string;
  concept_inquiry: string;
  concept_objective: string;
  exercise_ids: string[];
  resource_ids: string[];
}

export interface LessonState {
  concept: Concept | null;
  exercise: Exercise | null;
  currentHint: number;
  hints: Hint[];
  completed: boolean;
  userQuery: string;
  queryResult: any;
  isLoading: boolean;
}

// Create the store with initial state
export const lessonStore = writable<LessonState>({
  concept: null,
  exercise: null,
  currentHint: 0,
  hints: [],
  completed: false,
  userQuery: '',
  queryResult: null,
  isLoading: false
});

// Helper functions to update the store
export function setConcept(concept: Concept) {
  lessonStore.update(state => ({ ...state, concept }));
}

export function setExercise(exercise: Exercise) {
  lessonStore.update(state => ({ 
    ...state, 
    exercise,
    hints: exercise.hints,
    currentHint: 0
  }));
}

export function showNextHint() {
  lessonStore.update(state => ({
    ...state,
    currentHint: Math.min(state.currentHint + 1, state.hints.length - 1)
  }));
}

export function setUserQuery(query: string) {
  lessonStore.update(state => ({ ...state, userQuery: query }));
}

export function setQueryResult(result: any) {
  lessonStore.update(state => ({ ...state, queryResult: result, isLoading: false }));
}

export function setLoading(loading: boolean) {
  lessonStore.update(state => ({ ...state, isLoading: loading }));
}

export function markCompleted() {
  lessonStore.update(state => ({ ...state, completed: true }));
}
