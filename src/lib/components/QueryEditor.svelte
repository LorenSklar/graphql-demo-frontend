<script lang="ts">
  export let queryText: string = '';
  export let onQueryChange: (query: string) => void;
  export let placeholder: string = 'Write your GraphQL query here...';
  export let rows: number = 6;
  
  function handleInput(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    onQueryChange(target.value);
  }
</script>

<div class="query-editor-container">
  <textarea
    id="query-editor"
    value={queryText}
    on:input={handleInput}
    {placeholder}
    {rows}
    class="query-editor"
  ></textarea>
</div>

<style>
  .query-editor-container {
    margin-bottom: 20px;
  }
  
  .query-editor {
    width: 100%;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: 14px;
    padding: 12px;
    border: 2px solid #ddd;
    border-radius: 6px;
    resize: vertical;
    min-height: 120px;
  }
  
  .query-editor:focus {
    outline: none;
    border-color: #007acc;
    box-shadow: 0 0 0 3px rgba(0, 122, 204, 0.1);
  }
  
  .query-editor::placeholder {
    color: #999;
    font-style: italic;
  }
</style>
