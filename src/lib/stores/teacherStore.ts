import { writable, get } from 'svelte/store';
import { config } from '$lib/config';
import jsYaml from 'js-yaml';

// Types for guidance data
export interface Encouragement {
  text: string;
}

export interface GuidanceData {
  encouragements: {
    struggle: string[];
    persistence: string[];
    achievement: string[];
  };
}

export interface TeacherState {
  data: GuidanceData | null;
  loading: boolean;
  error: string | null;
}

// Create the store
export const teacherStore = writable<TeacherState>({
  data: null,
  loading: true,
  error: null
});

// Load guidance data
export async function loadGuidanceData() {
  teacherStore.update(state => ({ ...state, loading: true, error: null }));

  try {
    // First, try to load from bundled YAML file
    const teacherResponse = await fetch('/data/teacher.yaml');

    if (teacherResponse.ok) {
      const teacherYaml = await teacherResponse.text();
      const guidanceData = jsYaml.load(teacherYaml) as any;

      const data: GuidanceData = {
        encouragements: {
          struggle: guidanceData.encouragements.struggle || [],
          persistence: guidanceData.encouragements.persistence || [],
          achievement: guidanceData.encouragements.achievement || []
        }
      };

      teacherStore.set({ data, loading: false, error: null });
      console.log('Loaded guidance data from YAML file');

      // TODO: Check localStorage for user guidance preferences
      // const localPreferences = localStorage.getItem('userGuidancePreferences');

    } else {
      throw new Error('Failed to load teacher YAML file');
    }

    // Ping backend to warm it up for when needed
    // TODO: Backend guidance endpoint not implemented yet
    // try {
    //   const response = await fetch(`${config.backendUrl}/content`, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({
    //       query: `
    //         query GetGuidance {
    //           guidance {
    //             encouragements {
    //               struggle
    //               persistence
    //               achievement
    //               }
    //             }
    //           }
    //         `,
    //       variables: { id: "lesson-1a1" }
    //     })
    //   });

    //   if (response.ok) {
    //     const result = await response.json();
    //     if (!result.errors) {
    //       // TODO: Merge API data with local preferences
    //       console.log('Backend API is available and warmed up for guidance');
    //     }
    //   }
    // } catch (error) {
    //   console.log('Backend API not available, using YAML guidance data');
    // }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to load guidance data';
    teacherStore.set({ data: null, loading: false, error: errorMessage });
    console.error('Error loading guidance data:', error);
  }
}

// Helper functions to get random encouragements
export function getRandomEncouragement(type: 'struggle' | 'persistence' | 'achievement'): string {
  const state = get(teacherStore);
  if (!state.data) return '';

  const encouragements = state.data.encouragements[type];
  if (!encouragements || encouragements.length === 0) return '';

  const randomIndex = Math.floor(Math.random() * encouragements.length);
  return encouragements[randomIndex];
}

// Get random encouragement for each type
export function getRandomStruggleEncouragement(): string {
  return getRandomEncouragement('struggle');
}

export function getRandomPersistenceEncouragement(): string {
  return getRandomEncouragement('persistence');
}

export function getRandomAchievementEncouragement(): string {
  return getRandomEncouragement('achievement');
}
