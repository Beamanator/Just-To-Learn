<script>
  import { getContext } from "svelte";

  let myThing = getContext("context-key");

  console.log("in context", myThing);

  let num = 1;
  const updateMe = () => {
    num *= 2;
  };

  $: {
    console.log("num updated in bracket thingy", num);
  }
</script>

<h1>Context Child</h1>
<button on:click={updateMe}>Update [{num}]</button>
