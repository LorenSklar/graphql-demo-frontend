<!-- src/lib/components/ReflectionStub.svelte -->
<script lang="ts">
  export let onClose: () => void = () => {};
  
  // Mock reflection prompts - you'll replace these with real data
  const reflectionPrompts = [
    "What did you notice about how the server responds to different GraphQL queries?",
    "What questions do you have about GraphQL so far?",
    "How confident do you feel about writing basic queries?"
  ];
  
  let responses = ['', '', ''];
  
  function handleSubmit() {
    // TODO: Save reflection responses
    console.log('Reflection responses:', responses);
    onClose();
  }
</script>

<div class="reflection-stub">
  <h3>Reflection Time! 🤔</h3>
  <p class="subtitle">Let's reflect on what you're learning</p>
  
  <div class="reflection-form">
    {#each reflectionPrompts as prompt, i}
      <div class="prompt-group">
        <label for="response-{i}">{prompt}</label>
        <textarea
          id="response-{i}"
          bind:value={responses[i]}
          rows="3"
          placeholder="Share your thoughts..."
        ></textarea>
      </div>
    {/each}
    
    <div class="actions">
      <button class="btn-secondary" on:click={onClose}>
        Back to Exercise
      </button>
      <button class="btn-primary" on:click={handleSubmit}>
        Submit Reflection
      </button>
    </div>
  </div>
</div>

<style>
  .reflection-stub {
    padding: 1rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.5rem;
    max-width: 600px;
    margin: 0 auto;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  }

  .reflection-stub h3 {
    color: #495057;
    margin-bottom: 0.25rem;
    text-align: center;
    font-size: 1.1rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  }

  .subtitle {
    color: #6c757d;
    margin-bottom: 1rem;
    text-align: center;
    font-size: 0.9rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  }

  .reflection-form {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .prompt-group {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .prompt-group label {
    font-weight: 500;
    color: #495057;
    font-size: 0.85rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  }

  .prompt-group textarea {
    padding: 0.5rem;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    font-size: 0.85rem;
    resize: vertical;
    min-height: 40px;
  }

  .prompt-group textarea:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }

  .actions {
    display: flex;
    gap: 0.75rem;
    justify-content: center;
    margin-top: 0.25rem;
  }

  .btn-primary, .btn-secondary {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.25rem;
    font-weight: 500;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 0.9rem;
  }

  .btn-primary {
    background: #007bff;
    color: white;
  }

  .btn-primary:hover {
    background: #0056b3;
  }

  .btn-secondary {
    background: #6c757d;
    color: white;
  }

  .btn-secondary:hover {
    background: #545b62;
  }
</style>
