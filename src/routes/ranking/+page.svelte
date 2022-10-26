<script>
	export let data;
	import GoHome from '$lib/gohome.svelte';
	import user from '$lib/user';

	const ranking = data.data;
</script>

<svelte:head>
	<title>FraudHLTV Rankings</title>
</svelte:head>

<main>
	{#if import.meta.env['VITE_MODE'] === 'dev' || $user.role === 'admin'}
		<h1>CS:GO World Ranking by FraudHLTV</h1>
		<p class="update-text">Last updated: {data.update}</p>
		{#each ranking as team}
			<details>
				<summary>
					<span class="rank">#{team.id}</span>
					<img src={team.logo} alt="{team.name}'s logo" />
					<div class="wrapper">
						<p>{team.name}</p>
						{#each team.players as player}
							<span>{player.name}</span>
						{/each}
					</div>
					{#if team.delta > 0}
						<span class="green">
							+{team.delta}
						</span>
					{:else if team.delta < 0}
						<span class="red">
							{team.delta}
						</span>
					{:else}
						<span>-</span>
					{/if}
				</summary>
				<div class="expanded">
					{#each team.players as player}
						<div>
							<img src={player.img} alt="Photo of {player.name}" />
							<span
								><img
									src="https://flagcdn.com/w20/{player.nat.toLowerCase()}.png"
									aria-hidden="true"
									alt=""
								/>{player.name}</span
							>
						</div>
					{/each}
				</div>
			</details>
		{/each}
	{:else}
		<GoHome msg="This page is under construction" />
	{/if}
</main>

<style>
	.green {
		color: #009900;
	}
	.red {
		color: #ff1a1a;
	}
	.expanded {
		display: flex;
		gap: 1rem;
		align-items: stretch;
		width: 100%;
		background-color: var(--bg-primary);
		border-top: 1px solid var(--border-clr);
		padding: 0.5rem 0.75rem;
	}
	.expanded > div > img {
		display: block;
		width: 100%;
	}
	.expanded > div > span {
		display: flex;
		align-items: center;
		line-height: 0.9;
		gap: 0.25rem;
		font-size: 14px;
		justify-content: center;
		margin-top: 0.5rem;
	}
	.expanded > div > span > img {
		width: 16px;
		height: 10px;
		border: 1px solid black;
	}
	.wrapper span {
		font-size: 10px;
		margin-right: 0.25rem;
		color: #8c8c8c;
		transition: opacity 0.5s ease-out;
	}
	.wrapper {
		transition: transform 0.5s ease-out;
	}
	details[open] .wrapper {
		transform: translateY(5px);
	}
	details[open] .wrapper span {
		opacity: 0;
	}
	.wrapper p {
		font-size: 18px;
	}
	.wrapper {
		line-height: 0.8;
	}
	.rank {
		font-weight: bold;
	}
	.update-text {
		margin-bottom: 1rem;
	}
	summary {
		display: flex;
		cursor: pointer;
		gap: 1rem;
		background-color: var(--bg-primary);
		padding: 0.5rem 1rem;
		align-items: center;
	}
	summary:hover {
		background-color: var(--bg-hover);
	}
	summary img {
		height: 29px;
	}
	summary > :last-child {
		margin-left: auto;
	}
	details {
		margin-bottom: 0.75rem;
		box-shadow: var(--list-shadow);
	}
	main {
		max-width: calc(800px + 2rem);
		width: 100%;
		margin: 0 auto;
		padding: 1rem;
	}
</style>
