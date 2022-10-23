<script>
	import GoHome from '$lib/gohome.svelte';
	import timeAgo from '$lib/timeAgo';
	import supabase from '$lib/supabase';
	import user from '$lib/user';
	import { invalidateAll } from '$app/navigation';

	export let data;

	let titleInput, contentInput;

	async function createNew() {
		const { data, error } = await supabase.from('forum-posts').insert({
			title: titleInput.value,
			text: contentInput.value,
			author: $user.id
		});

		if (error) {
			log.textContent = 'There was an error creating the post. Please try again';
		} else {
			log.textContent = 'Post created succefully';
		}

		invalidateAll();

		titleInput.value = '';
		contentInput.value = '';
	}

	let log;
</script>

<svelte:head>
	<title>CS:GO Tier 50 Forums</title>
</svelte:head>

{#if import.meta.env['VITE_MODE'] === 'dev' || $user.role === 'admin'}
	<div class="spacer">
		<main>
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
			</table>
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
	table td {
		border-top: 1px solid var(--border-clr);
	}
	table tr:hover {
		background-color: var(--bg-hover);
	}
	table th {
		padding: 1rem;
		padding-left: 3rem;
		background-color: var(--bg-header);
	}
	table {
		background-color: var(--bg-primary);
		border-collapse: collapse;
	}
	table tr :is(td, th) {
		white-space: nowrap;
		text-align: left;
	}

	table a {
		padding: 1rem;
		padding-left: 3rem !important;
		width: 100%;
		display: block;
	}
	table td:first-child a {
		padding-left: 1rem !important;
	}
	th:first-child {
		padding-left: 1rem;
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
	/* .flex {
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
	} */
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
	a {
		all: unset;
		cursor: pointer;
	}
	/* a:hover {
		background-color: var(--bg-hover);
	} */
	/* span {
		display: block;
	} */
	/* .header.flex {
		background-color: var(--bg-header);
		font-weight: 700;
		font-size: 1.1rem;
		border: none;
	} */
</style>
