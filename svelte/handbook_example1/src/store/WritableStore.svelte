<script>
  import { get } from "svelte/store";
  import { username } from "./store.js";

  // useful for one-time reads:
  // let myUsername = get(username);

  // update username a few seconds later
  username.subscribe(newValue => {
    console.log("<store.svelte> username updated", newValue);
  });
  setTimeout(() => {
    username.set("New person");
  }, 1000);
</script>

<h3>My store username: {$username}</h3>
