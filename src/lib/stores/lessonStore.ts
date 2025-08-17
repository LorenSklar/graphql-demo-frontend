import { writable } from 'svelte/store';

// Types based on the YAML structure
export interface Hint {
  id: string;
  text: string;
  type: string;
  tag: string;
  triggerPattern?: string;
}

export interface Concept {
  id: string;
  type: string;
  name: string;
  inquiry: string;
  objective: string;
  generalHints: Hint[];
  optionalHints: Hint[];
  reflectionPrompts: string[];
  reflectionTargets: string[];
  foundationIds: string[];
  extensionIds: string[];
  exerciseIds: string[];
  resourceIds: string[];
}

export interface Exercise {
  id: string;
  type: string;
  inquiry: string;
  prefillEditor?: boolean;
  initialCode?: string;
  solutions: string[];
  minimalAnswerPattern: string;
  difficultyScore: number;
  suggestedNextExerciseIds: string[];
  suggestedPrevExerciseIds: string[];
}

export interface Lesson {
  concepts: Concept[];
  exercises: Exercise[];
}

// Store with loading state management
export interface LessonState {
  data: Lesson | null;
  loading: boolean;
  error: string | null;
}

// Create the store with initial state
export const lessonStore = writable<LessonState>({
  data: null,
  loading: true,
  error: null
});

// Load lesson data from backend via GraphQL
export async function loadLessonData() {
  lessonStore.update(state => ({ ...state, loading: true, error: null }));
  
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/content`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query GetLesson($id: String!) {
            lesson(id: $id) {
              id
              type
              name
              inquiry
              objective
              generalHints {
                id
                text
                type
                tag
              }
              exerciseIds
            }
            exercises {
              id
              type
              inquiry
              prefillEditor
              initialCode
              solutions
              minimalAnswerPattern
              difficultyScore
              suggestedNextExerciseIds
              suggestedPrevExerciseIds
            }
          }
        `,
        variables: { id: "lesson-1a1" }
      })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    
    if (result.errors) {
      throw new Error('Unable to load lesson data from server');
    }
    
    const lessonData = result.data.lesson;
    const allExercises = result.data.exercises;
    
    if (!lessonData) {
      throw new Error('Lesson not found');
    }
    
    // Filter exercises to only include those for this lesson
    const lessonExercises = allExercises.filter((exercise: Exercise) => 
      lessonData.exerciseIds.includes(exercise.id)
    );
    
    // Transform GraphQL response to match our Lesson interface
    const lesson: Lesson = {
      concepts: [lessonData],
      exercises: lessonExercises
    };
    
    lessonStore.set({ data: lesson, loading: false, error: null });
    return lesson;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to load lesson data';
    lessonStore.set({ data: null, loading: false, error: errorMessage });
    throw error;
  }
}

// Helper function to get current concept
export function getCurrentConcept(lesson: Lesson | null) {
  return lesson?.concepts?.[0] || null;
}

// Helper function to get exercise by ID
export function getExerciseById(lesson: Lesson | null, exerciseId: string) {
  return lesson?.exercises?.find(ex => ex.id === exerciseId) || null;
}
