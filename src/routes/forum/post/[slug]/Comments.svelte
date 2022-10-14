<script>
	import { getContext } from 'svelte';

	export let id = null;

	const data = getContext('comments');

	const select = (id) => {
		return (el) => {
			return el.replies_to === id;
		};
	};

	let replies = data.filter(select(id));
</script>

<div class="outer">
	{#each replies as reply}
		<div class="block">
			{reply.text}

			<svelte:self id={reply.id} />
		</div>
	{/each}
</div>

<style>
	.block {
		margin: 1rem;
		background-color: red;
		margin-left: 3rem;
	}
	.outer {
		background-color: blue;
	}
</style>
