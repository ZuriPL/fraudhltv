<script>
	export let data;

	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	$: {
		if ($page?.url?.hash?.includes('type=recovery')) {
			goto(`/edit-profile/update-password/finish${$page.url.hash}`);
		}
	}
	let counter = 0;
</script>

<svelte:head>
	<title>FraudHLTV News</title>
</svelte:head>

<main>
	{#if data?.newsToday?.length !== 0}
		<div class="carousel">
			<a class="banner-link" href="/post/{data?.newsToday[counter]?.slug}">
				<img src={data?.newsToday[counter]?.image} alt="banner" />
			</a>
			<div class="controls">
				{#each data?.newsToday.map((el) => el?.image) as img, idx}
					<div active={idx == counter} on:click={(_) => (counter = idx)} />
				{/each}
			</div>
			<button
				class="left"
				on:click={(_) => (counter == 0 ? (counter = data?.newsToday.length - 1) : counter--)}
			>
				<svg style="width:24px;height:24px" viewBox="0 0 24 24">
					<path
						fill="currentColor"
						d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"
					/>
				</svg>
			</button>
			<button
				class="right"
				on:click={(_) => (counter == data?.newsToday.length - 1 ? (counter = 0) : counter++)}
			>
				<svg style="width:24px;height:24px" viewBox="0 0 24 24">
					<path
						fill="currentColor"
						d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"
					/>
				</svg>
			</button>
		</div>
	{/if}
	<h1 class="welcome">Welcome to FraudHLTV</h1>

	{#if data?.newsToday.length !== 0}
		<div class="news">
			<h1>Today's news</h1>
			<div class="list">
				{#each data?.newsToday as article}
					<a data-sveltekit-prefetch href="/post/{article?.slug}" class="article">
						<img
							src="https://flagcdn.com/w20/{article?.flag.toLowerCase()}.png"
							alt="{article?.flag} flag"
						/>
						<p class="article-title">{article?.title}</p>
						<p class="article-date">{article?.timeAgo}</p>
					</a>
				{/each}
			</div>
		</div>
	{/if}

	<div class="news">
		<h1>{data?.newsToday.length !== 0 ? 'Previous' : 'All'} news</h1>
		<div class="list">
			{#each data?.otherNews as article}
				<a data-sveltekit-prefetch href="/post/{article?.slug}" class="article">
					<img
						src="https://flagcdn.com/w20/{article?.flag.toLowerCase()}.png"
						alt="{article?.flag} flag"
					/>
					<p class="article-title">{article?.title}</p>
					<p class="article-date">{article?.timeAgo}</p>
				</a>
			{/each}
		</div>
		<a href="/archive">See more</a>
	</div>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100vw;
		gap: 1.5rem;
	}
	.welcome {
		color: var(--text-color);
		font-size: 3rem;
		height: 150px;
		display: grid;
		cursor: default;
		place-items: center;
		text-align: center;
	}
	.carousel {
		display: none;
		width: calc(100% - 2rem);
		max-width: 800px;
		position: relative;
		overflow: hidden;
	}
	.carousel img {
		display: block;
		max-width: 800px;
		width: 100%;
		aspect-ratio: 8 / 3;
		object-fit: cover;
	}
	.carousel > .controls {
		display: flex;
		gap: 0.5rem;
		left: 50%;
		transform: translateX(-50%);
		bottom: 0;
		padding: 0.5rem 1rem;
		background-color: rgb(0, 0, 0, 75%);
		position: absolute;
	}
	.controls > div {
		width: 12px;
		height: 12px;
		border: 1px solid white;
		border-radius: 100%;
		position: relative;
	}
	.controls > div[active='true']::after {
		content: '';
		position: absolute;
		inset: 3px;
		background-color: white;
	}
	.carousel > button {
		all: unset;
		position: absolute;
		display: grid;
		place-items: center;
		top: 50%;
		transform: translateY(-50%);
		padding: 1rem 0.25rem;
		background-color: rgb(0, 0, 0, 75%);
	}
	.carousel > button:hover {
		background-color: rgb(0, 0, 0, 90%);
	}
	.carousel > button.left {
		left: 0;
	}
	.carousel > button.right {
		right: 0;
	}
	:global(.show-carousel) .carousel {
		display: block;
	}
	:global(.show-carousel) .carousel ~ .welcome {
		display: none;
	}
	.news {
		max-width: 800px;
		width: calc(100% - 2rem);
	}
	.news > h1 {
		font-weight: 500;
		color: var(--text-color);
		margin-bottom: 0.5rem;
		font-size: 1.125rem;
		font-weight: 600;
	}
	.list {
		box-shadow: var(--list-shadow);
	}
	.article {
		color: var(--text-color);
		text-decoration: none;
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 0.5rem 1rem;
		background-color: var(--bg-primary);
		border-bottom: 1px solid var(--border-clr);
	}
	.article:hover {
		background-color: var(--bg-hover);
	}
	.article:last-child {
		border: none;
		margin-left: auto;
	}
	.article > img {
		width: 20px;
		aspect-ratio: 3/2;
		outline: 1px solid black;
	}
	.article-title {
		font-weight: 600;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	.article-date {
		font-size: 0.75rem;
		color: var(--border-clr);
		margin-left: auto;
		white-space: nowrap;
	}
</style>
