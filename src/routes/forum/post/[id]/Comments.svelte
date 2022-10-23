<script>
	import replyto from './store';
	import supabase from '$lib/supabase';
	import user from '$lib/user';
	import { page } from '$app/stores';
	import { invalidateAll } from '$app/navigation';

	export let id = null;
	let commentInput;
	let replied = false;

	function replytof(x) {
		$replyto = x;
		commentInput?.focus();
	}

	async function deletef(x) {
		if (confirm('Do you want to delete this comment?')) {
			await supabase.from('forum-comments').update({ is_deleted: true }).eq('id', x);

			invalidateAll();
		}
	}

	const select = (id) => {
		return (el) => {
			return el.replies_to === id;
		};
	};

	async function replyf() {
		if (commentInput.value === '') return alert('Reply needs to have actual content');
		if (replied === true) return;
		replied = true;

		await supabase.from('forum-comments').insert({
			host_thread: $page.data.data.id,
			text: commentInput.value,
			author: $user.id,
			replies_to: $replyto
		});

		await invalidateAll();

		commentInput.value = '';
		$replyto = null;
		replied = false;
	}

	let replies = [];
	$: replies = $page.data.comments.filter(select(id));
</script>

{#each replies as reply}
	<div class="block" id={reply.num}>
		<div class="flex header">
			<a href={`#${reply?.num}`}>#{reply?.num}</a>
			{#if reply.is_deleted}
				<span style="font-style: italic;">[deleted]</span>
			{:else}
				<a href="/profile/{reply?.author?.name}">{reply?.author?.name}</a>
			{/if}
		</div>
		<div class="main">
			{#if reply.is_deleted}
				<span style="font-style: italic;">[deleted]</span>
			{:else}
				<span>{reply?.text}</span>
			{/if}
		</div>
		<div class="flex footer">
			<span>{reply?.created_at}</span>
			{#if (reply?.author?.id === $user?.id || $user?.role === 'admin') && !reply.is_deleted}
				<button class="delete" on:click={(_) => deletef(reply?.id)}>
					<svg style="width:16px;height:auto" viewBox="0 0 24 24">
						<path
							fill="currentColor"
							d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"
						/>
					</svg>
				</button>
			{/if}
			{#if !reply.is_deleted}
				<button on:click={() => replytof(reply?.id)}
					><svg style="width:16px;height:auto" viewBox="0 0 24 24">
						<path
							fill="currentColor"
							d="M10,9V5L3,12L10,19V14.9C15,14.9 18.5,16.5 21,20C20,15 17,10 10,9Z"
						/>
					</svg>Reply</button
				>
			{/if}
		</div>
	</div>
	<div class="wrapper">
		<svelte:self id={reply?.id} />
		{#if reply?.id === $replyto}
			{#if $user}
				{@const a = commentInput?.focus()}
				<form on:submit|preventDefault={replyf}>
					<div class="comment-input">
						<div class="flex header">Replying to #{reply?.num}</div>
						<textarea bind:this={commentInput} placeholder="Write your comment here" />
					</div>
					<button>Reply</button>
				</form>
				<div />
			{:else}
				<div class="msg">Please log in</div>
			{/if}
		{/if}
	</div>
{/each}

<style>
	.block > .header:hover {
		background-color: var(--bg-hover);
	}
	.msg {
		padding: 1rem;
		font-size: 1rem;
		font-weight: bold;
		background-color: var(--bg-primary);
		margin-top: 1rem;
	}
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
	:global(.comments-spacer) .wrapper > :nth-last-child(2):not(form)::before,
	.comment-input::before {
		content: '';
		position: absolute;
		top: calc(2rem + 1px);
		left: -0.75rem;
		width: 1px;
		height: 100vh;
		background-color: var(--bg-secondary);
		z-index: 1;
	}
	.header {
		height: 2rem;
		background-color: var(--bg-header);
	}
	.comment-input ~ button {
		padding: 0.5rem 0.75rem;
		border: none;
		background-color: var(--button-clr);
		color: var(--btn-text-color);
		font-size: 1rem;
		display: block;
		font-size: 14px;
		margin-block: 0.75rem;
	}
	.comment-input ~ button:hover {
		background-color: var(--button-hover);
	}
	.comment-input {
		position: relative;
		border-top: 0.75rem solid var(--bg-secondary);
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
		position: relative;
		z-index: 1;
		border-top: 0.75rem solid var(--bg-secondary);
		overflow-wrap: break-word;
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
		overflow-y: clip;
		overflow-clip-margin: 0.75rem;
	}
	.flex {
		display: flex;
		align-items: center;
		width: 100%;
	}
	.flex > :first-child {
		margin-right: auto;
	}
</style>
