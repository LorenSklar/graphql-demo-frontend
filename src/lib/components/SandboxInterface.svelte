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
    console.log('Config object:', config);
    console.log('Backend URL used at runtime:', config?.backendUrl);
    // Prefill with exercise initial code if available
    if (exercise?.prefillEditor) {
      queryText = exercise.prefillEditorText;
    }
  });
  
  // Watch for exercise changes and update queryText
  $: if (exercise?.initialCode && exercise.initialCode !== queryText) {
    queryText = exercise.initialCode;
  }
  
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
  <div class="sandbox-container">
    
    <div class="left-panel">
      <h3>GraphQL Editor</h3>
      <QueryEditor 
        {queryText}
        onQueryChange={handleQueryChange}
      />
      <div class="button-container">
        <ExecuteButton 
          onExecute={executeQuery}
          isLoading={false}
          disabled={!queryText.trim()}
        />
      </div>
    </div>
    
    <div class="right-panel">
      <h3>GraphQL Console</h3>
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
    width: 100%;
    margin: 0.5rem 0 0 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  }
  

  
  h3 {
    margin: 0 0 8px 0;
    color: #333;
    font-size: 16px;
    font-weight: 600;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  }
  


  .sandbox-container {
    gap: 20px;
  }
  
  .left-panel, .right-panel {
  }
  
  .button-container {
    margin-top: 12px;
    text-align: center;
  }
  
  .right-panel {
    min-height: 80px;
  }

  .console-output {
    background: #1e1e1e;
    color: #d4d4d4;
    padding: 0.75rem;
    border-radius: 0.25rem;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: 0.85rem;
    min-height: 80px;
    border: 1px solid #e2e8f0;
  }



  .console-placeholder {
    color: #808080;
    font-style: italic;
    text-align: center;
    margin: 0.5rem 0;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  }
  
  /* Mobile responsive */
  @media (max-width: 768px) {
    .sandbox-container {
    }
    
    .left-panel, .right-panel {
      width: 100%;
    }
    
    .left-panel {
      margin-bottom: 20px;
    }
    
    .button-container {
      margin-top: 8px;
    }
  }
</style>
