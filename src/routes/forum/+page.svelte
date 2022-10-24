<script>
	import GoHome from '$lib/gohome.svelte';
	import timeAgo from '$lib/timeAgo';
	import supabase from '$lib/supabase';
	import user from '$lib/user';
	import { page } from '$app/stores';
	import { invalidateAll } from '$app/navigation';

	export let data;

	let titleInput, contentInput;

	async function createNew() {
		if (titleInput.value.length === 0 || contentInput.value.length === 0)
			return (log.textContent = 'Fields may not be empty');

		const { data, error } = await supabase.from('forum-posts').insert({
			title: titleInput.value,
			text: contentInput.value,
			author: $user?.id
		});

		if (error) {
			log.textContent = 'There was an error creating the post. Please try again';
		} else {
			log.textContent = 'Post created succefully';
		}

		setTimeout((_) => {
			log.textContent = '';
		}, 5000);

		invalidateAll();

		titleInput.value = '';
		contentInput.value = '';
	}

	let log;

	function forward() {
		history.replaceState(null, '', `/forum?page=${+$page.url.searchParams.get('page') + 10}`);
		invalidateAll();
	}
	function backward() {
		let num = +$page.url.searchParams.get('page') - 10;
		if (+$page.url.searchParams.get('page') < 10) num = 0;
		history.replaceState(null, '', `/forum?page=${num}`);
		invalidateAll();
	}
</script>

<svelte:head>
	<title>CS:GO Tier 50 Forums</title>
</svelte:head>

{#if import.meta.env['VITE_MODE'] === 'dev' || ($user && $user?.role === 'admin')}
	<div class="spacer">
		<main>
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
		{#if $user}
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
{:else}
	<GoHome msg="This page is under construction" />
{/if}

<style>
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
	}
	main {
		width: calc(100% - 2rem);
		margin: 0 1rem;
		max-width: 800px;
		display: block;
		box-shadow: var(--list-shadow);
	}
	.spacer {
		max-width: calc(800px + 2rem);
		width: 100%;
		margin: 0 auto;
	}
</style>
