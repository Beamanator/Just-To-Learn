<!-- To understand more about differences between
    <script>... and <script context="module">,
    read docs:
    https://svelte.dev/docs#script_context_module
 -->

<script context="module">
  let name = "";

  export const changeName = newName => {
    console.log(name, newName);
    name = newName;

    // can't access variables in regular scripts
    // testChange();
  };
</script>

<script>
  //   let name;
  $: console.log("name", name);

  //   const testChange = () => {
  //     console.log("here?");
  //   };
</script>

<style>
  h1 {
    color: purple;
  }
</style>

<h1 id="dogName">The dog name is {name || 'Idk'}!</h1>
<button>Change name!</button>
