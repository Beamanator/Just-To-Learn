<script>
  import Dog, { changeName } from "./Dog.svelte";
  import ContextChild from "./ContextChild.svelte";

  let count = 0;

  const incrementCount = () => {
    count++;
    changeName("red");
  };

  // context stuff
  import { setContext } from "svelte";
  setContext("context-key", { key: "value2" });
</script>

<style>
  h1 {
    color: purple;
  }
</style>

<h1>Hello World!</h1>
<button on:click={incrementCount}>Count: {count}</button>

<Dog />

<ContextChild />
