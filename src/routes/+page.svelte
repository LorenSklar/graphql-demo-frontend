<script lang="ts">
  import { onDestroy } from 'svelte';
  import { lessonStore } from '$lib/stores/lessonStore';
  import SandboxInterface from '../lib/components/SandboxInterface.svelte';

  let currentLesson;

  const unsubscribe = lessonStore.subscribe((lesson) => {
    currentLesson = lesson;
  });

  onDestroy(() => {
    unsubscribe();
  });
</script>

<main>
  {#if currentLesson}
    <SandboxInterface lessonData={currentLesson} />
  {:else}
    <p>Loading lesson...</p>
  {/if}
</main>

<style>
  main {
    min-height: 100vh;
    background: #fafafa;
  }
</style>
