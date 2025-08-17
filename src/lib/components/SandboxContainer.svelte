<!-- src/lib/components/SandboxContainer.svelte -->
 
<script>
  export let exercise = null;
  export let onQueryAttempt = () => {};
  export let onRegexCheck = () => {};

  let queryText = '';

  function handleExecute() {
    onQueryAttempt();
    
    // Simple regex validation stub - you'll replace this with real logic
    const hasBasicQuery = queryText.trim().length > 0;
    onRegexCheck(hasBasicQuery);
  }
</script>

<div class="sandbox-container-stub">
  <h3>SandboxContainer (TODO)</h3>
  <p>Will contain: GraphQLEditor + ExecuteButton + GraphQLConsole</p>
  <p>Current exercise: {exercise?.inquiry || 'Loading...'}</p>
  
  <div class="editor-stub">
    <label>GraphQL Query Editor (stub):</label>
    <textarea 
      bind:value={queryText}
      placeholder="Enter your GraphQL query here..."
      rows="6"
    ></textarea>
  </div>
  
  <div class="controls-stub">
    <button on:click={handleExecute}>Execute Query</button>
  </div>
  
  <div class="console-stub">
    <label>Console Output (stub):</label>
    <div class="console-output">
      {#if queryText.trim()}
        <div class="mock-result">
          Query executed: {queryText.slice(0, 50)}{queryText.length > 50 ? '...' : ''}
        </div>
      {:else}
        <div class="placeholder">Execute a query to see results...</div>
      {/if}
    </div>
  </div>
</div>

<style>
  .sandbox-container-stub {
    padding: 1.5rem;
    background: #f8f9fa;
    border: 2px dashed #dee2e6;
    border-radius: 0.5rem;
  }

  .sandbox-container-stub h3 {
    color: #6c757d;
    margin-bottom: 1rem;
    text-align: center;
  }

  .sandbox-container-stub p {
    color: #6c757d;
    margin-bottom: 1rem;
    text-align: center;
  }

  .editor-stub {
    margin: 1rem 0;
  }

  .editor-stub label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #495057;
  }

  .editor-stub textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: 0.875rem;
  }

  .controls-stub {
    text-align: center;
    margin: 1rem 0;
  }

  .controls-stub button {
    padding: 0.75rem 1.5rem;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    font-weight: 500;
  }

  .controls-stub button:hover {
    background: #0056b3;
  }

  .console-stub label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #495057;
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

  .mock-result {
    color: #4ec9b0;
  }

  .placeholder {
    color: #808080;
    font-style: italic;
  }
</style>