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

	async function deletef(id) {
		if (confirm('Do you want to delete this comment?')) {
			await supabase.from('forum-comments').update({ is_deleted: true, text: '' }).eq('id', id);

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

		const { data: id } = await supabase
			.from('forum-comments')
			.insert({
				host_thread: $page.data.data.id,
				text: commentInput.value,
				author: $user.id,
				replies_to: $replyto
			})
			.select('id')
			.single();

		await supabase.from('notifications').insert({
			by: $user.id,
			for: replies.filter((el) => el.id === $replyto)[0].author.id,
			type: 'comment',
			post: $page.data.data.id,
			fragment: id.id
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
	<input type="checkbox" id="reply-{reply.id}" style="display: none;" />
	<div class="block" id={reply?.id}>
		<label for="reply-{reply.id}" class="flex header">
			<a href={`#${reply?.id}`}>#{reply?.num}</a>
			{#if reply.is_deleted}
				<span style="font-style: italic;">[deleted]</span>
			{:else}
				<span class="author-info">
					{#if reply?.author?.player}
						<span>
							<svg style="width:12px;height:12px" viewBox="0 0 24 24">
								<path
									fill="currentColor"
									d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"
								/>
							</svg>
							{reply.author.player}
						</span>
						<div style="border-left: 2px solid rgba(146,154,158,.75); height:12px;" />
					{/if}
					{#if reply?.author?.team}
						<span>
							<svg style="width:12px;height:12px" viewBox="0 0 24 24">
								<path
									fill="currentColor"
									d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"
								/>
							</svg>
							{reply.author.team}
						</span>
						<div style="border-left: 2px solid rgba(146,154,158,.75); height:12px;" />
					{/if}
					<span>
						<img
							src="https://flagcdn.com/w20/{reply?.author?.flag?.toLowerCase()}.png"
							alt="{reply?.author?.flag} flag"
						/>
						<a href="/profile/{reply?.author?.name}">{reply?.author?.name}</a>
					</span>
				</span>
			{/if}
		</label>
		<div class="main">
			{#if reply.is_deleted}
				<span style="font-style: italic;">[deleted]</span>
			{:else}
				<pre>{reply?.text}</pre>
			{/if}
		</div>
		<div class="flex footer">
			<span>{reply?.created_at}</span>
			{#if (reply?.author?.id === $user?.id || $user?.role === 'admin') && !reply.is_deleted}
				<button class="red" on:click={(_) => deletef(reply?.id)}>
					<svg style="width:16px;height:16px" viewBox="0 0 24 24">
						<path
							fill="currentColor"
							d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"
						/>
					</svg>
				</button>
			{/if}
			{#if !reply.is_deleted && $user && !$user?.is_banned}
				<button on:click={() => replytof(reply?.id)}
					><svg style="width:16px;height:16px" viewBox="0 0 24 24">
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
			{@const a = commentInput?.focus()}
			<form on:submit|preventDefault={replyf}>
				<div class="comment-input">
					<div class="flex header">Replying to #{reply?.num}</div>
					<textarea bind:this={commentInput} placeholder="Write your comment here" />
				</div>
				<button>Reply</button>
			</form>
			<div />
		{/if}
	</div>
{/each}

<style>
	:target {
		outline: 1px solid var(--link-color);
		scroll-margin-top: 0.75rem;
	}
	input:checked + .block > .header {
		background-color: var(--bg-hover);
	}
	input:checked + .block + .wrapper :global(:is(.block, .wrapper)) {
		display: none;
	}
	pre {
		white-space: pre-wrap;
	}
	.author-info {
		display: flex;
		gap: 0.5rem;
		align-items: center;
	}
	.author-info > span {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		white-space: nowrap;
	}
	.author-info img {
		border: 1px solid black;
		height: 12px;
		width: 18px;
		display: block;
	}
	.block > .header:hover {
		background-color: var(--bg-hover);
	}
	.red {
		color: #c52216;
	}
	.wrapper::after {
		content: '';
		position: absolute;
		left: 0.5rem;
		top: -10.5rem;
		bottom: 0;
		width: 1px;
		background-color: var(--border-clr);
	}
	.block::after,
	.comment-input::after {
		content: '';
		top: 2rem;
		left: -0.5rem;
		position: absolute;
		width: 0.5rem;
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
		left: -0.5rem;
		width: 1px;
		height: 1300000vh;
		background-color: var(--bg-secondary);
		z-index: 1;
	}
	.header {
		height: 2rem;
		background-color: var(--bg-header);
		overflow: hidden;
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
		margin-top: 0.75rem;
		overflow-wrap: break-word;
		box-shadow: var(--list-shadow);
	}
	.block > :not(:last-child),
	.comment-input > .header {
		padding: 0.5rem 0.75rem;
	}
	.block > :not(.header) {
		border-top: 1px solid var(--border-clr);
	}
	.block > :not(.main),
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
	.footer {
		position: relative;
	}
	.footer > * {
		padding: 0.5rem 0.75rem;
	}
	.wrapper {
		padding-left: 1rem;
		position: relative;
		overflow: clip;
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
