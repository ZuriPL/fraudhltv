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

		<div class="footer">{postData.created_at}</div>
	</div>

	<Comments />
</main>

<style>
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
		font-size: 14px;
		margin: auto 0;
	}
	.footer {
		border-top: 1px solid var(--border-clr);
		font-size: 12px;
	}
	:global(img) {
		width: 100%;
		display: block;
	}
	.spacer {
		max-width: 800px;
		background-color: var(--bg-primary);
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
