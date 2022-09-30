<script>
	import GoHome from '$lib/gohome.svelte';
	import timeAgo from '$lib/timeAgo';

	export let data;
</script>

<svelte:head>
	<title>CS:GO Tier 50 Forums</title>
</svelte:head>

{#if import.meta.env['VITE_MODE'] === 'dev'}
	<div class="spacer">
		<main>
			<div class="flex header"><span>Topic</span><span>Author</span><span>Created: </span></div>
			{#each data.data as post}
				<a href={`/forum/post/${post.slug}`} class="flex"
					><span>{post.title}</span><span>{post.author.name}</span><span
						>{timeAgo(post.created_at)}</span
					></a
				>
			{/each}
		</main>
	</div>
{:else}
	<GoHome msg="This page is under construction" />
{/if}

<style>
	.flex {
		display: flex;
		align-items: center;
		background-color: var(--bg-primary);
		padding: 1rem;
		gap: 2rem;
		border-top: 1px solid var(--border-clr);
	}
	.flex > span:first-child {
		margin-right: auto;
	}
	.flex > span {
		min-width: 7rem;
	}
	main {
		width: calc(100% - 2rem);
		max-width: 800px;
		margin: 0 1rem;
		display: block;
		box-shadow: var(--list-shadow);
	}
	.spacer {
		max-width: calc(800px + 2rem);
		width: 100%;
		margin: 0 auto;
	}
	a {
		all: unset;
		cursor: pointer;
	}
	a:hover {
		background-color: var(--bg-hover);
	}
	span {
		display: block;
	}
	.header.flex {
		background-color: var(--bg-header);
		font-weight: 700;
		font-size: 1.1rem;
		border: none;
	}
</style>
