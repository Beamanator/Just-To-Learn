<script>
	import Dog, { changeName } from './Dog.svelte';
	export let name;

	let count = 0;

	const incrementCount = () => {
		count++;
	}
</script>

<style>
	h1 {
		color: purple;
	}
</style>

<h1 on:click={() => changeName('Alex')}>Hello {name}!</h1>
<button on:click={incrementCount}>Count: {count}</button>

<Dog />