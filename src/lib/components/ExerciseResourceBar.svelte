<!-- src/lib/components/ExerciseResourceBar.svelte -->
 
<script lang="ts">
  import { Video, BookOpen, FileText, Lightbulb, Eye, Heart } from 'lucide-svelte';
  import { teacherStore, getRandomEncouragement } from '$lib/stores/teacherStore';
  
  interface Resource {
    type: string;
  }
  
  export let resources: Resource[] = [];
  export let currentHintIndex = -1;
  export let totalGeneralHints = 0;
  export let currentSolutionIndex = -1;
  export let totalSolutionHints = 0;
  export let currentContentType: 'hint' | 'solution' | 'encouragement' | null = null;
  export let currentHint = '';
  export let currentSolution = '';
  export let onUseGeneralHint = () => {};
  export let onUseSolutionHint = () => {};
  export let onUseEncouragement = () => {};
  
  // Get content from stores
  $: teacherData = $teacherStore;
  $: currentHint = currentContentType === 'hint' ? `Hint ${currentHintIndex + 1} content` : '';
  $: currentSolution = currentContentType === 'solution' ? `Solution ${currentSolutionIndex + 1} content` : '';
  $: currentEncouragement = currentContentType === 'encouragement' ? getRandomEncouragement('struggle') : '';
  
  // Reactive resource buttons that update when props change
  $: resourceButtons = [
    {
      id: 'watch',
      label: 'Watch',
      icon: Video,
      color: 'coral',
      available: resources.some(r => r.type === 'video'),
      action: () => console.log('Open video resource')
    },
    {
      id: 'read',
      label: 'Read',
      icon: BookOpen, 
      color: 'blue',
      available: resources.some(r => r.type === 'article'),
      action: () => console.log('Open reading resource')
    },
    {
      id: 'docs',
      label: 'Docs',
      icon: FileText,
      color: 'green', 
      available: resources.some(r => r.type === 'documentation'),
      action: () => console.log('Open documentation resource')
    },
    {
      id: 'hint',
      label: 'Hint',
      icon: Lightbulb,
      color: 'yellow',
      available: totalGeneralHints > 0,
      count: currentContentType === 'hint' ? `(${currentHintIndex + 1}/${totalGeneralHints})` : '',
      action: onUseGeneralHint
    },
    {
      id: 'solution',
      label: 'Solution',
      icon: Eye,
      color: 'purple',
      available: totalSolutionHints > 0,
      count: currentContentType === 'solution' ? `(${currentSolutionIndex + 1}/${totalSolutionHints})` : '',
      action: onUseSolutionHint
    },
    {
      id: 'encouragement',
      label: 'Encourage',
      icon: Heart,
      color: 'pink',
      available: true, // Always available for encouragement
      action: onUseEncouragement
    }
  ];
</script>

<div class="resource-bar">
  <div class="resource-group">
    {#each resourceButtons.slice(0, 3) as resource}
      <div class="resource-item">
        <button 
          class="resource-button {resource.color}" 
          class:disabled={!resource.available}
          on:click={resource.action}
          disabled={!resource.available}
        >
          <svelte:component this={resource.icon} size="16" />
          <span class="label">{resource.label}</span>
          {#if resource.count}
            <span class="count">{resource.count}</span>
          {/if}
        </button>
        
        <!-- Display content below button -->
        {#if resource.id === 'hint' && currentContentType === 'hint' && currentHint}
          <div class="content-display hint">
            <span class="content-label">💡 Hint:</span>
            <span class="content-text">{currentHint}</span>
          </div>
        {/if}
        
        {#if resource.id === 'solution' && currentContentType === 'solution' && currentSolution}
          <div class="content-display solution">
            <span class="content-label">✅ Solution:</span>
            <span class="content-text">{currentSolution}</span>
          </div>
        {/if}
        
        {#if resource.id === 'encouragement' && currentContentType === 'encouragement' && currentEncouragement}
          <div class="content-display encouragement">
            <span class="content-label">❤️ Encouragement:</span>
            <span class="content-text">{currentEncouragement}</span>
          </div>
        {/if}
      </div>
    {/each}
  </div>
  
  <div class="resource-group">
    {#each resourceButtons.slice(3) as resource}
      <div class="resource-item">
        <button 
          class="resource-button {resource.color}" 
          class:disabled={!resource.available}
          on:click={resource.action}
          disabled={!resource.available}
        >
          <svelte:component this={resource.icon} size="16" />
          <span class="label">{resource.label}</span>
          {#if resource.count}
            <span class="count">{resource.count}</span>
          {/if}
        </button>
        
        <!-- Display content below button -->
        {#if resource.id === 'hint' && currentContentType === 'hint' && currentHint}
          <div class="content-display hint">
            <span class="content-label">💡 Hint:</span>
            <span class="content-text">{currentHint}</span>
          </div>
        {/if}
        
        {#if resource.id === 'solution' && currentContentType === 'solution' && currentSolution}
          <div class="content-display solution">
            <span class="content-label">✅ Solution:</span>
            <span class="content-text">{currentSolution}</span>
          </div>
        {/if}
        
        {#if resource.id === 'encouragement' && currentContentType === 'encouragement' && currentEncouragement}
          <div class="content-display encouragement">
            <span class="content-label">❤️ Encouragement:</span>
            <span class="content-text">{currentEncouragement}</span>
          </div>
        {/if}
      </div>
    {/each}
  </div>
</div>

<style>
  .resource-bar {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
    justify-content: center;
  }

  .resource-group {
    display: flex;
    gap: 0.75rem;
  }

  .resource-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }

  .resource-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    border: none;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .resource-button:hover:not(.disabled) {
    transform: translateY(-1px);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  }

  .resource-button.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Coral - Watch */
  .resource-button.coral {
    background: #fef2f2;
    color: #dc2626;
    border: 1px solid #fecaca;
  }

  .resource-button.coral:hover:not(.disabled) {
    background: #fee2e2;
    border-color: #fca5a5;
  }

  /* Blue - Read */
  .resource-button.blue {
    background: #eff6ff;
    color: #2563eb;
    border: 1px solid #bfdbfe;
  }

  .resource-button.blue:hover:not(.disabled) {
    background: #dbeafe;
    border-color: #93c5fd;
  }

  /* Green - Docs */
  .resource-button.green {
    background: #f0fdf4;
    color: #16a34a;
    border: 1px solid #bbf7d0;
  }

  .resource-button.green:hover:not(.disabled) {
    background: #dcfce7;
    border-color: #86efac;
  }

  /* Yellow - Hint */
  .resource-button.yellow {
    background: #fffbeb;
    color: #d97706;
    border: 1px solid #fde68a;
  }

  .resource-button.yellow:hover:not(.disabled) {
    background: #fef3c7;
    border-color: #fcd34d;
  }

  /* Purple - Solution */
  .resource-button.purple {
    background: #faf5ff;
    color: #9333ea;
    border: 1px solid #d8b4fe;
  }

  .resource-button.purple:hover:not(.disabled) {
    background: #f3e8ff;
    border-color: #c084fc;
  }

  /* Pink - Encouragement */
  .resource-button.pink {
    background: #fdf2f8;
    color: #9d174d;
    border: 1px solid #fbcfe8;
  }

  .resource-button.pink:hover:not(.disabled) {
    background: #f9a8d4;
    border-color: #f472b6;
  }

  .icon {
    font-size: 1rem;
  }

  .label {
    font-weight: 500;
  }

  .count {
    font-size: 0.75rem;
    opacity: 0.8;
    margin-left: 0.25rem;
  }

  .content-display {
    width: 100%;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    background-color: #f0f9eb; /* Light green background for hints/solutions */
    border: 1px solid #a7f3d0; /* Green border */
    margin-top: 0.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  }

  .content-display.hint {
    background-color: #f0f9eb; /* Light green background for hints */
    border-color: #a7f3d0; /* Green border */
  }

  .content-display.solution {
    background-color: #f0f9eb; /* Light green background for solutions */
    border-color: #a7f3d0; /* Green border */
  }

  .content-display.encouragement {
    background-color: #fdf2f8; /* Light pink background for encouragement */
    border-color: #fbcfe8; /* Pink border */
  }

  .content-label {
    font-weight: 600;
    color: #16a34a; /* Green color for labels */
    margin-right: 0.5rem;
  }

  .content-text {
    font-size: 0.875rem;
    color: #374151; /* Dark gray color for text */
    line-height: 1.4;
  }
</style>