<script>
  import { onMount, onDestroy, beforeUpdate, afterUpdate } from "svelte";
  export let myCount = 0;

  onMount(async () => {
    console.log("Lifecycles mounted!");

    return () => {
      console.log("another destroy callback here!");
    };
  });
  onDestroy(() => {
    console.log("Lifecycles destroyed");
  });
  beforeUpdate(() => {
    console.log("before update?");
  });
  afterUpdate(() => {
    console.log("after update?");
  });
</script>

<p>Lifecycles are here... prop({myCount})</p>
