<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  export let count: number = 0
  const increment = () => {
    count += 1
    dispatch('count', count)
  }
</script>

<button on:click={increment}>
  <span data-testid="value">count is {count}</span>
</button>
