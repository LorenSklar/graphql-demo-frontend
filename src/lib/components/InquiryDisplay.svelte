<script lang="ts">
  export let conceptInquiry: string = "";
  export let currentHint: string = "";
  export let currentSolution: string = "";
</script>

<div class="inquiry-display">
  <!-- Inquiry Container -->
  <div class="inquiry-container">
    {#if conceptInquiry}
      <div class="inquiry-container">
        <h2 class="inquiry-question">{conceptInquiry}</h2>
      </div>
    {/if}
  </div>

  <!-- Current Hint (only shown when requested) -->
  {#if currentHint}
    <div class="concept-hint">
      <span class="hint-label">💡 Hint:</span>
      <span class="hint-text">{currentHint}</span>
    </div>
  {/if}

  <!-- Current Solution (only shown when requested) -->
  {#if currentSolution}
    <div class="concept-solution">
      <span class="solution-label">✅ Solution:</span>
      <span class="solution-text">{currentSolution}</span>
    </div>
  {/if}
</div>

<style>
  .inquiry-display {
    margin-bottom: 2rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  }

  .inquiry-container {
    background: white;
    padding: 1.5rem;
    border-radius: 0.5rem;
    border: 1px solid #e2e8f0;
    margin-bottom: 1.5rem;
  }

  .concept-inquiry {
    margin: 0;
  }

  .inquiry-question {
    font-size: 1.5rem;
    font-weight: 600;
    color: #1e293b;
    line-height: 1.3;
    margin: 0;
  }

  .concept-hint, .concept-solution {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    margin-bottom: 1rem;
    padding: 1rem;
    border-radius: 0.5rem;
  }

  .concept-hint {
    background-color: #fef3c7;
    border-left: 4px solid #f59e0b;
  }

  .concept-solution {
    background-color: #d1fae5;
    border-left: 4px solid #10b981;
  }

  .hint-label, .solution-label {
    font-weight: 600;
    font-size: 0.875rem;
    flex-shrink: 0;
  }

  .hint-label {
    color: #92400e;
  }

  .solution-label {
    color: #065f46;
  }

  .hint-text, .solution-text {
    color: #451a03;
    line-height: 1.6;
    font-size: 1rem;
  }

  .solution-text {
    color: #064e3b;
  }
</style>
