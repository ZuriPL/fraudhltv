<script>
	import Comments from './Comments.svelte';
	import replyto from './store';
	import user from '$lib/user';
	import supabase from '$lib/supabase';
	import { invalidateAll, goto } from '$app/navigation';

	export let data;
	let postData = data.data;

	let commentInput;
	let replied;

	async function replyf() {
		if (replied === true) return;
		replied = true;

		await supabase.from('forum-comments').insert({
			host_thread: postData.id,
			text: commentInput.value,
			author: $user.id,
			replies_to: null
		});

		await invalidateAll();

		$replyto = null;
		commentInput.value = '';
		replied = false;
	}

	async function deletef() {
		if (confirm('Do you want to delete this post?')) {
			await supabase.from('forum-comments').delete().eq('host_thread', postData.id);
			await supabase.from('forum-posts').delete().eq('id', postData.id);
			goto('/forum');
		}
	}
</script>

<svelte:head>
	<title>Forum thread: {postData?.title} | FraudHLTV</title>
</svelte:head>

<main>
	<div class="spacer">
		<div class="header">
			{postData?.title}<span
				><a href="/profile/{postData?.author?.name}">{postData?.author?.name}</a></span
			>
		</div>

		<pre class="post-content">{postData?.text}</pre>

		<div class="footer">
			<span>{postData?.created_at}</span>
			{#if postData?.author?.id === $user?.id || $user?.role === 'admin'}
				<button class="delete" on:click={deletef}>
					<svg style="width:16px;height:auto" viewBox="0 0 24 24">
						<path
							fill="currentColor"
							d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"
						/>
					</svg>
				</button>
			{/if}
			{#if $user}
				<button on:click={(_) => commentInput.focus()}
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

	<div class="comments-spacer">
		<Comments />

		<form on:submit|preventDefault={replyf}>
			<div class="comment-input">
				<div class="flex-header">Replying to the original post</div>
				<textarea bind:this={commentInput} placeholder="Write your comment here" />
			</div>
			<button>Reply</button>
		</form>
	</div>
</main>

<style>
	.flex-header {
		height: 2rem;
		display: flex;
		align-items: center;
		width: 100%;
		padding: 0.5rem 0.75rem;
		font-size: 12px;
		background-color: var(--bg-header);
	}
	form {
		width: 100%;
		margin-top: 0.75rem;
	}
	form > button {
		padding: 0.5rem 0.75rem;
		border: none;
		background-color: var(--button-clr);
		color: var(--btn-text-color);
		font-size: 1rem;
		display: block;
		font-size: 14px;
		margin-block: 0.75rem;
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
	.delete {
		color: #c52216;
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
	.header {
		background-color: var(--bg-header);
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid var(--border-clr);
		font-weight: bold;
		font-size: 1.25rem;
	}
	.header > span {
		font-weight: initial;
		font-size: 12px;
		margin: auto 0;
	}
	.footer {
		border-top: 1px solid var(--border-clr);
		font-size: 12px;
		display: flex;
	}
	.footer > :first-child {
		margin-right: auto;
	}
	:global(img) {
		width: 100%;
		display: block;
	}
	.spacer {
		max-width: 800px;
		background-color: var(--bg-primary);
		width: calc(100% - 2rem);
		box-shadow: var(--list-shadow);
		z-index: 1;
	}
	.comments-spacer {
		max-width: 800px;
		width: calc(100% - 2rem);
		isolation: isolate;
		z-index: 0;
	}
	.spacer > *:not(.footer),
	.footer > * {
		padding: 0.5rem 0.75rem;
	}
	main {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		align-items: center;
		width: 100vw;
	}
	.post-content > :global(*) {
		margin-bottom: 1rem;
	}
</style>
