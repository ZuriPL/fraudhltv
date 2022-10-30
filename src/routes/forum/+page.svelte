<script>
	import timeAgo from '$lib/timeAgo';
	import supabase from '$lib/supabase';
	import user from '$lib/user';
	import { page } from '$app/stores';
	import { invalidateAll, goto } from '$app/navigation';

	export let data;

	let titleInput, contentInput;

	async function createNew() {
		if (titleInput.value.length === 0 || contentInput.value.length === 0)
			return (log.textContent = 'Fields may not be empty');

		const { data, error } = await supabase
			.from('forum-posts')
			.insert({
				title: titleInput.value,
				text: contentInput.value,
				author: $user?.id
			})
			.select()
			.single();

		await invalidateAll();

		if (error) {
			log.textContent = 'There was an error creating the post. Please try again';
		} else {
			log.textContent = 'Post created succefully';
			goto(`/forum/post/${data.id}`);
		}

		setTimeout((_) => {
			log.textContent = '';
		}, 5000);

		titleInput.value = '';
		contentInput.value = '';
	}

	let log;

	function forward() {
		history.replaceState(
			null,
			'',
			`/forum?page=${Math.min(data.data.length, +$page.url.searchParams.get('page') + 10)}`
		);
		invalidateAll();
	}
	function backward() {
		history.replaceState(
			null,
			'',
			`/forum?page=${Math.max(0, +$page.url.searchParams.get('page') - 10)}`
		);
		invalidateAll();
	}
</script>

<svelte:head>
	<title>FraudHLTV Forum</title>
</svelte:head>

<div class="spacer">
	<main>
		{#if $user?.is_banned}
			<div class="msg">
				<p style="margin-bottom: 1rem;">You have been banned from participating in the forums</p>
				<p>
					You're still able to view a post, but you're unable to create new threads and comments
				</p>
			</div>
		{/if}
		{#if !$user}
			<div class="msg">
				<p>You need to be logged in to comment and post new threads</p>
			</div>
		{/if}
		<div class="table-wrapper">
			<table>
				<thead>
					<tr>
						<th>Topic</th>
						<th>Author</th>
						<th>Created</th>
					</tr>
				</thead>
				<tbody>
					{#each data.data as post}
						<tr>
							<td><a href="forum/post/{post.id}">{post.title}</a></td>
							<td><a href="forum/post/{post.id}">{post.author.name}</a></td>
							<td><a href="forum/post/{post.id}">{timeAgo(post.created_at)}</a></td>
						</tr>
					{/each}
				</tbody>
				<tfoot>
					<tr>
						<td colspan="3">
							<div>
								<p>
									Showing results {+$page.url.searchParams.get('page') +
										1}-{+$page.url.searchParams.get('page') + data.data.length} of {data.length}
								</p>
								<div class="button-wrapper">
									<button on:click={backward}>
										<svg style="width:24px;height:auto" viewBox="0 0 24 24">
											<path
												fill="currentColor"
												d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"
											/>
										</svg>
									</button>
									<button on:click={forward}>
										<svg style="width:24px;height:auto" viewBox="0 0 24 24">
											<path
												fill="currentColor"
												d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"
											/>
										</svg>
									</button>
								</div>
							</div>
						</td>
					</tr>
				</tfoot>
			</table>
		</div>
	</main>
	{#if $user && !$user.is_banned}
		<h2>Create new post</h2>
		<form on:submit|preventDefault={createNew}>
			<label>
				Title
				<input bind:this={titleInput} type="text" />
			</label>
			<label>
				Content
				<textarea bind:this={contentInput} name="new" cols="30" rows="10" />
			</label>
			<button>Post</button>
			<p class="log" bind:this={log} />
		</form>
	{/if}
</div>

<style>
	.msg {
		background-color: var(--bg-primary);
		padding: 1rem;
		margin-bottom: 2rem;
		box-shadow: var(--list-shadow);
	}
	.button-wrapper {
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}
	table tfoot .button-wrapper button {
		all: unset;
		color: var(--link-color);
		height: 24px;
	}
	table tfoot .button-wrapper button:hover {
		cursor: pointer;
	}
	tfoot td {
		padding: 0;
	}
	tfoot td > div {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 12px;
		padding: 0.25rem 1rem;
	}
	.table-wrapper {
		width: 100%;
		overflow-x: auto;
		box-shadow: var(--list-shadow);
	}
	table {
		background-color: var(--bg-primary);
		border-collapse: collapse;
		font-size: 14px;
	}
	table tbody td {
		border-top: 1px solid var(--border-clr);
	}
	table tfoot {
		border-top: 1px solid var(--border-clr);
	}
	table th {
		background-color: var(--bg-header);
		padding: 0.75rem 1rem;
		padding-left: 3rem;
		color: var(--text-color) !important;
		font-weight: 700;
	}
	table tr :is(td, th) {
		white-space: nowrap;
		text-align: left;
	}
	table tbody tr:hover {
		background-color: var(--bg-hover);
	}
	table a {
		padding: 0.75rem 1rem;
		display: block;
		color: var(--text-color);
	}
	table td:first-child a,
	table th {
		padding-left: 1rem !important;
		font-weight: 600;
		color: var(--link-color);
		padding-right: 2rem;
	}
	table tr :is(td, th):first-child {
		width: 100%;
	}
	h2 {
		padding-left: 1rem;
		margin-top: 1.25rem;
		margin-bottom: 0.25rem;
	}
	input,
	textarea {
		display: block;
		width: 100%;
		background-color: transparent;
		border: 1px solid var(--border-clr);
		font-size: 16px;
		color: var(--text-color);
		resize: none;
		margin-bottom: 0.5rem;
	}
	button {
		padding: 0.75rem 0;
		width: calc(calc(800px - 4rem) / 3);
		border: none;
		background-color: var(--button-clr);
		color: var(--text-color);
		font-size: 1rem;
		font-weight: 600;
		margin: 0 auto;
		display: block;
		margin-top: 1.5rem;
	}
	button:hover {
		background-color: var(--button-hover);
	}
	form {
		width: calc(100% - 2rem);
		margin: 0 1rem;
		max-width: 800px;
		background-color: var(--bg-primary);
		padding: 1rem;
		box-shadow: var(--list-shadow);
	}
	main {
		width: calc(100% - 2rem);
		margin: 0 1rem;
		max-width: 800px;
		display: block;
	}
	.spacer {
		max-width: calc(800px + 2rem);
		width: 100%;
		margin: 0 auto;
	}
</style>
