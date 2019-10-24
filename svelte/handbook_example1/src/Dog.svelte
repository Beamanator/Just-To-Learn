<script>
    export let name;
</script>
<script context="module">
    export function changeName(name) {
        let h1 = document.querySelector('h1');
        console.log('change to?', name, h1)
        h1.innerText = name
    }
</script>

<style>
    h1 {
        color: purple;
    }
</style>

<h1>The dog name is {name || 'Idk!'}!</h1>
<button>Change name!</button>