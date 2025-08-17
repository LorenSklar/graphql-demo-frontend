<script lang="ts">
  import { lessonStore } from '../stores/lessonStore';
  import QueryEditor from './QueryEditor.svelte';
  import ExecuteButton from './ExecuteButton.svelte';
  import ResponseDisplay from './ResponseDisplay.svelte';
  import { config } from '../config';
  import { onMount } from 'svelte';
  
  export let exercise: any = null;
  export let onQueryAttempt: () => void = () => {};
  export let onRegexCheck: (passed: boolean) => void = () => {};

    onMount(() => {
    console.log('Backend URL used at runtime:', config.backendUrl);
    // Prefill with exercise initial code if available
    if (exercise?.initialCode) {
      queryText = exercise.initialCode;
    }
  });
  
  let queryText = '';
  
  function handleQueryChange(query: string) {
    queryText = query;
  }
  
  async function executeQuery() {
    if (!queryText.trim()) return;
    
    // Call user actions
    onQueryAttempt();
    
    try {
      const response = await fetch(`${config.backendUrl}/sandbox`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: queryText })
      });
      
      const result = await response.json();
      
      // Display result in console
      const resultDiv = document.getElementById('query-result');
      if (resultDiv) {
        resultDiv.innerHTML = `
          <h4>Query Result:</h4>
          <pre>${JSON.stringify(result, null, 2)}</pre>
        `;
      }
      
      // Check regex pattern if exercise has one
      if (exercise?.minimalAnswerPattern) {
        const regex = new RegExp(exercise.minimalAnswerPattern);
        const passed = regex.test(queryText);
        onRegexCheck(passed);
        
        // Log to Vercel function logs
        console.log('Exercise validation:', {
          query: queryText,
          pattern: exercise.minimalAnswerPattern,
          passed: passed,
          result: result
        });
      }
      
    } catch (error) {
      console.error('Query execution error:', error);
      onRegexCheck(false);
    }
  }
</script>

<div class="sandbox">
  <h2>GraphQL Sandbox</h2>
  
  <div class="sandbox-container">
    <!-- Exercise Info Above Editor -->
    {#if exercise?.inquiry}
      <div class="exercise-header">
        <h3>Exercise</h3>
        <p class="exercise-inquiry">{exercise.inquiry}</p>
        {#if exercise.minimalAnswerPattern}
          <p class="exercise-pattern">Pattern: <code>{exercise.minimalAnswerPattern}</code></p>
        {/if}
      </div>
    {/if}
    
    <div class="left-panel">
      <h3>GraphQL Editor</h3>
      <QueryEditor 
        {queryText}
        onQueryChange={handleQueryChange}
      />
    </div>
    
    <div class="center-panel">
      <h3>Actions</h3>
      <div class="button-container">
        <ExecuteButton 
          onExecute={executeQuery}
          isLoading={false}
          disabled={!queryText.trim()}
        />
      </div>
    </div>
    
          <div class="right-panel">
        <h3>Console</h3>
        <div class="console-output">
          <div class="query-result" id="query-result">
            <p class="console-placeholder">Execute a query to see results...</p>
          </div>
        </div>
      </div>
  </div>
</div>

<style>
  .sandbox {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }
  
  h2 {
    text-align: center;
    margin-bottom: 30px;
    color: #333;
  }
  
  h3 {
    margin: 0 0 15px 0;
    color: #333;
    font-size: 18px;
    font-weight: 600;
  }
  
  .exercise-header {
    grid-column: 1 / -1;
    background: #f8f9fa;
    padding: 1.5rem;
    border-radius: 0.5rem;
    margin-bottom: 1.5rem;
    border: 1px solid #dee2e6;
  }

  .exercise-header h3 {
    margin: 0 0 0.5rem 0;
    color: #495057;
  }

  .exercise-inquiry {
    color: #495057;
    margin: 0 0 0.5rem 0;
    font-size: 1rem;
  }

  .exercise-pattern {
    color: #6c757d;
    margin: 0;
    font-size: 0.9rem;
  }

  .exercise-pattern code {
    background: #e9ecef;
    padding: 0.2rem 0.4rem;
    border-radius: 0.25rem;
    font-family: monospace;
  }

  .sandbox-container {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: 30px;
    align-items: start;
  }
  
  .left-panel, .right-panel {
    display: flex;
    flex-direction: column;
  }
  
  .center-panel {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 10px;
  }
  
  .button-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 120px;
  }
  
  .right-panel {
    min-height: 200px;
  }

  .console-output {
    background: #1e1e1e;
    color: #d4d4d4;
    padding: 1rem;
    border-radius: 0.25rem;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: 0.875rem;
    min-height: 100px;
  }

  .exercise-info h4 {
    color: #4ec9b0;
    margin-bottom: 0.5rem;
  }

  .pattern-info {
    color: #808080;
    font-size: 0.8rem;
    margin-bottom: 1rem;
  }

  .console-placeholder {
    color: #808080;
    font-style: italic;
    text-align: center;
    margin: 2rem 0;
  }
  
  /* Mobile responsive */
  @media (max-width: 768px) {
    .sandbox-container {
      grid-template-columns: 1fr;
      gap: 20px;
    }
    
    .center-panel {
      order: 0; 
      justify-content: center;
      padding: 20px 0;
    }
    
    .sandbox {
      padding: 15px;
    }
  }
</style>
