<script>
  import Dog from "./Dog.svelte";
  import ContextChild from "./ContextChild.svelte";
  import DerivedStore from "./store/DerivedStore.svelte";
  import WritableStore from "./store/WritableStore.svelte";
  import ReadableStore from "./store/ReadableStore.svelte";

  let count = 0;

  const incrementCount = () => {
    count++;
  };

  // change dog age after timeout
  let dogAge = 0;
  setTimeout(() => {
    dogAge = 7;
  }, 2000);

  // context stuff
  import { setContext } from "svelte";
  setContext("context-child", { key: "some val" });
</script>

<style>
  h1 {
    color: purple;
  }
</style>

<h1>Hello World!</h1>
<button on:click={incrementCount}>Count: {count}</button>

<ReadableStore />

<WritableStore />

<DerivedStore />

<Dog age={dogAge} />

<ContextChild />
