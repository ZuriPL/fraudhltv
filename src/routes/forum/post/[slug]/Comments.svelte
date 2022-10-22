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

{#each replies as reply}
	<div class="block">
		<div class="flex header">
			<a href={`#${reply.id}`}>#{reply.id}</a>
			<span>{reply.author.name}</span>
		</div>
		<div class="main">{reply.text}</div>
		<div class="flex footer">
			<span>{reply.created_at}</span>
			<button
				><svg style="width:16px;height:auto" viewBox="0 0 24 24">
					<path
						fill="currentColor"
						d="M10,9V5L3,12L10,19V14.9C15,14.9 18.5,16.5 21,20C20,15 17,10 10,9Z"
					/>
				</svg>Reply</button
			>
		</div>
	</div>
	<div class="wrapper">
		<svelte:self id={reply.id} />
	</div>
{/each}

<style>
	.block {
		border: var(--border-clr);
		width: 100%;
		background-color: var(--bg-primary);
		margin-bottom: 0.75rem;
		box-shadow: var(--list-shadow);
	}
	.block > div:not(:last-child) {
		padding: 0.5rem 0.75rem;
	}
	.block > div:not(.header) {
		border-top: 1px solid var(--border-clr);
	}
	.block > div:not(.main) {
		font-size: 12px;
	}
	button {
		all: unset;
		cursor: default;
		color: var(--link-color);
		font-weight: 600;
		display: flex;
		align-items: center;
		gap: 0.25rem;
		cursor: pointer;
		border-left: 1px solid var(--border-clr);
	}
	.footer > * {
		padding: 0.5rem 0.75rem;
	}
	.wrapper {
		padding-left: 1rem;
	}
	.flex {
		display: flex;
		align-items: center;
		width: 100%;
	}
	.header {
		background-color: var(--bg-header);
	}
	.flex > :first-child {
		margin-right: auto;
	}
</style>
