<script>
	import user from '$lib/user';
	import supabase from '$lib/supabase';
	import { invalidateAll } from '$app/navigation';
	export let data;

	console.log(data);

	async function ban() {
		if (confirm(`Are you sure you want to ban: ${data?.name}`)) {
			await supabase.from('users').update({ is_banned: true }).eq('id', data.id);

			invalidateAll();
		}
	}
</script>

<svelte:head>
	<title>{data.name}'s profile | FraudHLTV</title>
</svelte:head>

<main>
	<div class="flex first">
		<img src="https://flagcdn.com/w320/{data?.flag.toLowerCase()}.png" alt="{data?.flag} flag" />
		<h2>{data?.name}</h2>
		{#if $user?.name == data?.name}
			<a href="/edit-profile" class="edit">Edit profile</a>
		{/if}
		{#if $user?.role === 'admin' && $user?.name !== data?.name && !data.is_banned}
			<button
				on:click={ban}
				class="edit"
				style="background-color: #c52216; color: var(--btn-text-color-light)">Ban this user</button
			>
		{/if}
	</div>
	<div class="tags flex">
		{#if $user?.role !== 'regular'}
			<p style="text-transform: capitalize;">{data?.role}</p>
		{/if}
		<p>ID: {data?.id}</p>
		<p>Joined: {data?.created_at}</p>
		{#if data.player}
			<p class="flex">
				<svg style="width:auto;height:0.9rem;" viewBox="0 0 24 24">
					<path
						fill="currentColor"
						d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"
					/>
				</svg>
				{data?.player}
			</p>
		{/if}
		{#if data.team}
			<p>
				<svg style="width:auto;height:0.9rem;" viewBox="0 0 24 24">
					<path
						fill="currentColor"
						d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"
					/>
				</svg>
				{data?.team}
			</p>
		{/if}
	</div>
	<div class="forum-activity">
		<div class="column">
			<p class="label">Forum posts</p>
			{#if data.posts.length > 0}
				{#each data.posts as post}
					<div>
						<a data-sveltekit-prefetch href="/forum/post/{post.id}">
							<p class="title">{post.title}</p>
							<p class="content">{post.text}</p>
						</a>
					</div>
				{/each}
			{:else}
				<p class="empty-msg">No posts</p>
			{/if}
		</div>
		<div class="column">
			<p class="label">Forum comments</p>
			{#if data.comments.length > 0}
				{#each data.comments as comment}
					<div>
						<a
							data-sveltekit-reload
							data-sveltekit-prefetch
							href="/forum/post/{comment.host_thread.id}#{comment.num}"
						>
							<p class="title">{comment?.text}</p>
							<p class="content">
								Replies to: {comment?.replies_to
									? comment?.replies_to?.text
									: comment?.host_thread?.text}
							</p>
						</a>
					</div>
				{/each}
			{:else}
				<p class="empty-msg">No comments</p>
			{/if}
		</div>
	</div>
	{#if data.bio}
		<p class="label label--bio">Bio:</p>
		<pre class="bio">{data?.bio}</pre>
	{/if}
</main>

<style>
	.title {
		font-weight: bold;
		font-size: 18px;
		color: var(--link-color);
	}
	.content {
		font-size: 12px;
		height: 2.5ex;
		max-width: 100%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.column > div {
		background-color: var(--bg-header);
		box-shadow: var(--list-shadow);
		margin-top: 0.5rem;
	}
	.column > div:hover {
		background-color: var(--bg-hover);
	}
	.column a {
		color: var(--text-color);
		padding: 0.5rem 0.5rem;
		display: block;
	}
	.empty-msg {
		display: grid;
		place-items: center start;
		flex-grow: 1;
	}
	.column {
		min-width: 200px;
		min-height: 70px;
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		flex-basis: calc(50% - 0.5rem);
	}
	.forum-activity {
		display: flex;
		flex-wrap: wrap;
		align-items: stretch;
		width: 100%;
		gap: 1rem;
	}
	main {
		background-color: var(--bg-primary);
		width: calc(100% - 2rem);
		max-width: calc(800px - 1rem);
		margin: 0 auto;
		padding: 1rem;
	}
	.tags > p,
	.edit {
		background-color: var(--bg-header);
		border-radius: 100px;
		padding: 0.25rem 0.75rem;
		font-size: 0.9rem;
		box-shadow: var(--list-shadow);
	}
	img {
		height: 1.5rem;
		width: 2.25rem;
		outline: 1px solid black;
	}
	.flex {
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}
	.tags.flex {
		gap: 0.75rem;
		flex-wrap: wrap;
		margin-bottom: 1.5rem;
	}
	h2 {
		font-size: 1.5rem;
	}
	.first {
		margin-bottom: 1rem;
		gap: 0.5rem;
	}
	.label {
		font-weight: 700;
		margin-bottom: 0.25rem;
	}
	.label--bio {
		margin-top: 1.5rem;
	}
	.bio {
		background-color: var(--bg-header);
		box-shadow: var(--list-shadow);
		padding: 0.75rem;
		white-space: pre-wrap;
	}
	.edit {
		border: none;
		margin-left: auto;
		background-color: var(--button-clr);
		color: var(--btn-text-color);
	}
	.edit:hover {
		background-color: var(--button-hover);
	}
</style>
