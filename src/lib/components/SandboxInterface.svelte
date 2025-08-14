<script lang="ts">
  import { lessonStore } from '../stores/lessonStore';
  import QueryEditor from './QueryEditor.svelte';
  import ExecuteButton from './ExecuteButton.svelte';
  import ResponseDisplay from './ResponseDisplay.svelte';
  import { config } from '../config';
  import { onMount } from 'svelte';

  onMount(() => {
    console.log('Backend URL used at runtime:', config.backendUrl);
});
  
  let queryText = '';
  
  function handleQueryChange(query: string) {
    queryText = query;
  }
  
  async function executeQuery() {
    if (!queryText.trim()) return;
    
    lessonStore.update(state => ({ ...state, isLoading: true }));
    
    try {
      const response = await fetch(`${config.backendUrl}/sandbox`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: queryText })
      });
      
      const result = await response.json();
      lessonStore.update(state => ({ 
        ...state, 
        queryResult: result,
        isLoading: false 
      }));
      
      // Log the interaction
      await fetch(`${config.backendUrl}/log`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: queryText,
          result: result,
          timestamp: new Date().toISOString()
        })
      });
      
    } catch (error) {
      lessonStore.update(state => ({ 
        ...state, 
        queryResult: { error: error instanceof Error ? error.message : 'Unknown error' },
        isLoading: false 
      }));
    }
  }
</script>

<div class="sandbox">
  <h2>GraphQL Sandbox</h2>
  
  <div class="sandbox-container">
    <div class="left-panel">
      <h3>Editor</h3>
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
          isLoading={$lessonStore.isLoading}
          disabled={!queryText.trim()}
        />
      </div>
    </div>
    
    <div class="right-panel">
      <h3>Console</h3>
      <ResponseDisplay 
        queryResult={$lessonStore.queryResult}
        isLoading={$lessonStore.isLoading}
        error={null}
      />
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
  
  /* Mobile responsive */
  @media (max-width: 768px) {
    .sandbox-container {
      grid-template-columns: 1fr;
      gap: 20px;
    }
    
    .center-panel {
      order: 0; /* Keep natural order: Editor -> Actions -> Console */
      justify-content: center;
      padding: 20px 0;
    }
    
    .sandbox {
      padding: 15px;
    }
  }
</style>
