<script lang="ts">
  export let queryResult: any = null;
  export let isLoading: boolean = false;
  export let error: string | null = null;
  
  function formatResponse(data: any): string {
    try {
      return JSON.stringify(data, null, 2);
    } catch {
      return String(data);
    }
  }
  
  function getResponseClass(): string {
    if (error) return 'response-error';
    if (queryResult?.error) return 'response-error';
    return 'response-success';
  }
</script>

<div class="response-section">
  {#if isLoading}
    <div class="loading-state">
      <div class="spinner"></div>
      <p>Executing query...</p>
    </div>
  {:else if error}
    <div class="response-display response-error">
      <strong>Error:</strong> {error}
    </div>
  {:else if queryResult}
    <div class="response-display {getResponseClass()}">
      {#if queryResult.error}
        <strong>GraphQL Error:</strong>
        <pre>{formatResponse(queryResult.error)}</pre>
      {:else if queryResult.data}
        <strong>Data:</strong>
        <pre>{formatResponse(queryResult.data)}</pre>
      {:else}
        <pre>{formatResponse(queryResult)}</pre>
      {/if}
    </div>
  {:else}
    <p class="no-response">No query executed yet</p>
  {/if}
</div>

<style>
  .response-section {
    padding: 0;
    margin-top: 0;
  }
  
  .loading-state {
    display: flex;
    align-items: center;
    gap: 12px;
    color: #666;
  }
  
  .spinner {
    width: 20px;
    height: 20px;
    border: 2px solid #ddd;
    border-top: 2px solid #007acc;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  .response-display {
    padding: 15px;
    border-radius: 4px;
    overflow-x: auto;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: 13px;
    line-height: 1.4;
  }
  
  .response-success {
    background: #2d2d2d;
    color: #f8f8f2;
    border-left: 4px solid #4caf50;
  }
  
  .response-error {
    background: #ffebee;
    color: #c62828;
    border-left: 4px solid #f44336;
  }
  
  .response-display pre {
    margin: 8px 0 0 0;
    white-space: pre-wrap;
    word-break: break-word;
  }
  
  .no-response {
    color: #666;
    font-style: italic;
    margin: 0;
  }
</style>
