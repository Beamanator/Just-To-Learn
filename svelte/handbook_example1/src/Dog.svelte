<script>
  export let age;
</script>

<style>
  h1 {
    color: purple;
  }
</style>

<!-- https://svelte.dev/docs#script_context_module -->
<!-- <script context="module"></script> -->
<h1 id="dogName">The dog's age is {age || 'Idk'}!</h1>
