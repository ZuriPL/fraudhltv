<script>
	export let data;
	let { data: postData, comments: commentsData } = data;

	import Comments from './Comments.svelte';
	import { setContext } from 'svelte';

	setContext('comments', commentsData);
</script>

<svelte:head>
	<title>Forum thread: {postData?.title} | FraudHLTV</title>
</svelte:head>

<main>
	<div class="spacer">
		<div class="header">{postData?.title}<span>{postData.author.name}</span></div>

		<div class="post-content">
			{postData?.text}
		</div>

		<div class="footer">
			<span>{postData.created_at}</span>
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

	<div class="comments-spacer">
		<Comments />
	</div>
</main>

<style>
	button {
		all: unset;
		cursor: default;
		color: var(--link-color);
		font-weight: 600;
		display: flex;
		align-items: center;
		gap: 0.25rem;
		cursor: pointer;
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
	}
	.comments-spacer {
		max-width: 800px;
		width: calc(100% - 2rem);
	}
	.spacer > * {
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
