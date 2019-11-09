<script>
  import { getContext } from "svelte";

  let { key: value } = getContext("context-child");

  let num = 1;
  const updateMe = () => {
    num *= 2;
  };

  $: {
    console.log("num updated in bracket thingy", num);
  }
</script>

<h1>Context Child Secret Note: {value}</h1>
<button on:click={updateMe}>Update [{num}]</button>
