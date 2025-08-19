import { writable } from 'svelte/store';
import { config } from '$lib/config';
import jsYaml from 'js-yaml';

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
  prefillEditorText?: string;
  solutions: string[];
  minimalAnswerPattern: string;
  difficultyScore: number;
  suggestedNextExerciseIds: string[];
  suggestedPrevExerciseIds: string[];
}

export interface Resource {
  id: string;
  type: string;
  title: string;
  typeEnum: string;
  url: string;
}

export interface Lesson {
  concepts: Concept[];
  exercises: Exercise[];
  resources: Resource[];
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

// Load lesson data with layered approach
export async function loadLessonData() {
  lessonStore.update(state => ({ ...state, loading: true, error: null }));
  
  try {
    // First, try to load from bundled YAML files
    const lessonResponse = await fetch('/data/lesson1a1.yaml');
    const domainsResponse = await fetch('/data/domains.yaml');
    const clustersResponse = await fetch('/data/clusters.yaml');
    
    if (lessonResponse.ok && domainsResponse.ok && clustersResponse.ok) {
      const lessonYaml = await lessonResponse.text();
      const domainsYaml = await domainsResponse.text();
      const clustersYaml = await clustersResponse.text();
      
      // Parse YAML to get lesson data
      const lessonData = jsYaml.load(lessonYaml) as any;
      const domainsData = jsYaml.load(domainsYaml) as any;
      const clustersData = jsYaml.load(clustersYaml) as any;
      
      // Transform to match our Lesson interface
      const lesson: Lesson = {
        concepts: lessonData.concepts || [],
        exercises: lessonData.exercises || [],
        resources: lessonData.resources || []
      };
      
      lessonStore.set({ data: lesson, loading: false, error: null });
      console.log('Loaded lesson data from YAML files');
      
      // TODO: Check localStorage for user progress
      // const localProgress = localStorage.getItem('userProgress');
      
    } else {
      throw new Error('Failed to load YAML files');
    }
    
    // Ping backend to warm it up for when needed
    try {
      const response = await fetch(`${config.backendUrl}/content`, {
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
                prefillEditorText
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
      
      if (response.ok) {
        const result = await response.json();
        
        if (!result.errors) {
          // TODO: Merge API data with local progress
          console.log('Backend API is available and warmed up');
        }
      }
    } catch (error) {
      // API not available - that's okay, we have YAML data
      console.log('Backend API not available, using YAML lesson data');
    }
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to load lesson data';
    lessonStore.set({ data: null, loading: false, error: errorMessage });
    console.error('Error loading lesson data:', error);
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
