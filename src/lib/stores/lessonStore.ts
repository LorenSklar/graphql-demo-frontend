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

// Create the store with initial state
export const lessonStore = writable<Lesson | null>(null);

// Load lesson data from YAML (for now, hardcoded - will be replaced with backend call)
export async function loadLessonData() {
  try {
    // TODO: Replace with actual backend call to /content
    // For now, using hardcoded data that matches lesson1a1.yaml structure
    
    const mockLesson: Lesson = {
      concepts: [
        {
          id: "concept-uuid-1a1",
          type: "Concept",
          name: "Single Field Query",
          inquiry: "How do I request information using GraphQL?",
          objective: "Discover how to write a basic GraphQL query for a single field",
          generalHints: [
            {
              id: "hint-uuid-1a1-1a",
              text: "Replace the word in { curly braces } with a different word. Some words receive data in response and others receive an error message. For now, both are ok.",
              type: "GENERAL_HINT",
              tag: "exploration"
            }
          ],
          optionalHints: [],
          reflectionPrompts: [
            "What did you notice about how the server responds to different requests?",
            "What words and symbols are required? Optional? Different than Python?"
          ],
          reflectionTargets: [],
          foundationIds: [],
          extensionIds: ["concept-uuid-1a2"],
          exerciseIds: ["exercise-uuid-1a1-1", "exercise-uuid-1a1-2", "exercise-uuid-1a1-3", "exercise-uuid-1a1-4"],
          resourceIds: ["resource-uuid-1a1-1", "resource-uuid-1a1-2", "resource-uuid-1a1-3"]
        }
      ],
      exercises: [
        {
          id: "exercise-uuid-1a1-1",
          type: "Exercise",
          inquiry: "Hit run and see what happens. Then try changing 'ping' to any word you want and run it again.",
          prefillEditor: true,
          initialCode: "query {\n  ping\n}",
          solutions: [
            "What is the format for a GraphQL query? Where might you look that up?",
            "Start with the keyword query and add { }",
            "Now add a field name: { marco }"
          ],
          minimalAnswerPattern: "(query\\s*)?\\{.*\\w+.*\\}",
          difficultyScore: 1,
          suggestedNextExerciseIds: ["exercise-uuid-1a1-2"],
          suggestedPrevExerciseIds: []
        },
        {
          id: "exercise-uuid-1a1-2",
          type: "Exercise",
          inquiry: "Write a query to ask for a different field. Try 'sun'. What other field names work?",
          prefillEditor: false,
          initialCode: "",
          solutions: [
            "What did the last query look like? Can you recreate it with a different word?",
            "Start the keyword query then add { }",
            "Now add a field name: { sun }"
          ],
          minimalAnswerPattern: "(query\\s*)?\\{.*\\w+.*\\}",
          difficultyScore: 1,
          suggestedNextExerciseIds: ["exercise-uuid-1a1-3"],
          suggestedPrevExerciseIds: ["exercise-uuid-1a1-1"]
        }
      ]
    };

    lessonStore.set(mockLesson);
    return mockLesson;
  } catch (error) {
    console.error('Failed to load lesson data:', error);
    lessonStore.set(null);
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
