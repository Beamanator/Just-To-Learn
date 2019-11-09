<script>
  import { count } from "./store";

  count.subscribe(newCount => {
    console.log("update count", newCount);
  });
</script>

<h3>readable store count: {$count}</h3>
