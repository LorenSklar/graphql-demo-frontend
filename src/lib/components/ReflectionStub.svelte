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
    padding: 2rem;
    background: #f8f9fa;
    border: 2px solid #dee2e6;
    border-radius: 0.5rem;
    max-width: 600px;
    margin: 0 auto;
  }

  .reflection-stub h3 {
    color: #495057;
    margin-bottom: 0.5rem;
    text-align: center;
    font-size: 1.5rem;
  }

  .subtitle {
    color: #6c757d;
    margin-bottom: 2rem;
    text-align: center;
    font-size: 1rem;
  }

  .reflection-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .prompt-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .prompt-group label {
    font-weight: 500;
    color: #495057;
    font-size: 0.9rem;
  }

  .prompt-group textarea {
    padding: 0.75rem;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    font-family: inherit;
    font-size: 0.9rem;
    resize: vertical;
  }

  .prompt-group textarea:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }

  .actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 1rem;
  }

  .btn-primary, .btn-secondary {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 0.25rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
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
