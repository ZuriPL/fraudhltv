<script>
	import replyto from './store';
	import supabase from '$lib/supabase';
	import user from '$lib/user';
	import { page } from '$app/stores';
	import { invalidateAll } from '$app/navigation';

	export let id = null;
	let commentInput;

	function replytof(x) {
		$replyto = x;
		commentInput?.focus();
	}

	const select = (id) => {
		return (el) => {
			return el.replies_to === id;
		};
	};

	async function replyf() {
		const { data, error } = await supabase
			.from('forum-comments')
			.insert({ host_thread: 1, text: commentInput.value, author: $user.id, replies_to: $replyto });

		await invalidateAll();
		commentInput.value = '';
		$replyto = null;
	}

	let replies = [];
	$: replies = $page.data.comments.filter(select(id));
</script>

{#each replies as reply}
	<div class="block">
		<div class="flex header">
			<a href={`#${reply?.id}`}>#{reply?.id}</a>
			<span>{reply?.author?.name}</span>
		</div>
		<div class="main">{reply?.text}</div>
		<div class="flex footer">
			<span>{reply?.created_at}</span>
			{#if reply?.author?.id === $user?.id}
				<button class="delete">
					<svg style="width:16px;height:auto" viewBox="0 0 24 24">
						<path
							fill="currentColor"
							d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"
						/>
					</svg>
				</button>
			{/if}
			<button on:click={() => replytof(reply?.id)}
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
		<svelte:self id={reply?.id} />
		{#if reply?.id === $replyto}
			<form on:submit|preventDefault={replyf}>
				<div class="comment-input">
					<div class="flex header">Replying to #{reply?.id}</div>
					<textarea bind:this={commentInput} placeholder="Write your comment here" />
				</div>
				<button>Reply</button>
			</form>
		{/if}
	</div>
{/each}

{#if false}
	<div class="comment-input">
		<div class="flex header">Replying to the original post</div>
		<textarea placeholder="Write your comment here" />
	</div>
	<button>Reply</button>
{/if}

<style>
	.delete {
		color: #c52216;
	}
	.wrapper::after {
		content: '';
		position: absolute;
		left: 0.5rem;
		top: -0.75rem;
		bottom: 0;
		width: 1px;
		background-color: var(--border-clr);
	}
	.block::after,
	.comment-input::after {
		content: '';
		top: 2rem;
		left: -0.75rem;
		position: absolute;
		width: 0.75rem;
		background-color: var(--border-clr);
		height: 1px;
	}
	:global(.comments-spacer) > .block::after {
		height: 0px;
	}
	.wrapper:-moz-only-whitespace::after {
		top: 0;
	}
	.header {
		height: 2rem;
	}
	.comment-input ~ button {
		padding: 0.5rem 0.75rem;
		border: none;
		background-color: var(--button-clr);
		color: var(--btn-text-color);
		font-size: 1rem;
		display: block;
		font-size: 14px;
		box-shadow: none;
		margin-bottom: 0.75rem;
		box-shadow: var(--list-shadow);
	}
	.comment-input ~ button:hover {
		background-color: var(--button-hover);
	}
	.comment-input {
		margin-bottom: 0.75rem;
		box-shadow: var(--list-shadow);
		position: relative;
	}
	textarea {
		resize: vertical;
		width: 100%;
		height: 10ex;
		background-color: var(--bg-primary);
		border: none;
		border-top: 1px solid var(--border-clr);
		color: var(--text-color);
		padding: 0.5rem;
	}
	.block {
		border: var(--border-clr);
		width: 100%;
		background-color: var(--bg-primary);
		margin-bottom: 0.75rem;
		box-shadow: var(--list-shadow);
		position: relative;
	}
	.block > div:not(:last-child),
	.comment-input > .header {
		padding: 0.5rem 0.75rem;
	}
	.block > div:not(.header) {
		border-top: 1px solid var(--border-clr);
	}
	.block > div:not(.main),
	.comment-input > .header {
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
		padding-left: 1.25rem;
		position: relative;
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
