<script lang="ts">
  export let onExecute: () => void;
  export let isLoading: boolean = false;
  export let disabled: boolean = false;
  export let buttonText: string = 'Run';
  export let loadingText: string = 'Running...';
</script>

<button 
  on:click={onExecute}
  disabled={disabled || isLoading}
  class="execute-btn"
>
  {#if isLoading}
    <span class="spinner"></span>
    {loadingText}
  {:else}
    <span class="play-icon">▶</span>
    {buttonText}
  {/if}
</button>

<style>
  .execute-btn {
    background: #28a745;
    color: white;
    border: none;
    padding: 10px 16px;
    border-radius: 12px;
    font-size: 15px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    cursor: pointer;
    transition: all 0.2s ease;
    min-height: 40px;
    min-width: 70px;
    gap: 6px;
  }
  
  .play-icon {
    font-size: 12px;
    line-height: 1;
  }
  
  .spinner {
    width: 16px;
    height: 16px;
    border: 2px solid transparent;
    border-top: 2px solid currentColor;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  .execute-btn:hover:not(:disabled) {
    background: #218838;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .execute-btn:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .execute-btn:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
  
  .execute-btn:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 122, 204, 0.3);
  }
</style>
