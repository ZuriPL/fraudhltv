<script>
	export let data;
	import GoHome from '$lib/gohome.svelte';
	import user from '$lib/user';

	const ranking = data.data;

	let panel;

	function admin1() {
		panel.classList.toggle('hide');
	}
</script>

<svelte:head>
	<title>FraudHLTV Rankings</title>
</svelte:head>

<main>
	{#if import.meta.env['VITE_MODE'] === 'dev' || $user?.role === 'admin'}
		<h1>CS:GO Fraud Ranking by FraudHLTV</h1>
		<p class="update-text">Last updated: {data.update}</p>
		{#each ranking as team}
			<details open={team.id === 1 ? 'true' : undefined}>
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
								/><span>{player.name}</span></span
							>
						</div>
					{/each}
				</div>
			</details>
		{/each}
		{#if $user?.role === 'admin'}
			<button on:click={admin1}>edit</button>
			<div class="panel" bind:this={panel}>123</div>
		{/if}
	{:else}
		<GoHome msg="This page is under construction" />
	{/if}
</main>

<style>
	:global(.hide) {
		display: none;
	}
	.green {
		color: #009900;
	}
	.red {
		color: #ff1a1a;
	}
	.expanded {
		display: flex;
		gap: 1rem;
		box-sizing: border-box;
		align-items: stretch;
		width: 100%;
		background-color: var(--bg-primary);
		border-top: 1px solid var(--border-clr);
		padding: 0.5rem 0.75rem;
	}
	.expanded > div {
		width: 20%;
		position: relative;
		margin-bottom: calc(1ex + 0.5rem);
	}
	.expanded > div > img {
		max-width: 100%;
		display: block;
		margin-bottom: 0.25rem;
	}

	.expanded > div > span {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		max-width: 100% !important;
		transform: translateY(100%);
		display: flex;
		align-items: center;
		gap: 0.25rem;
		justify-content: center;
		font-size: 14px;
		overflow-x: hidden;
	}
	.expanded > div > span > img {
		width: 16px;
		height: 10px;
		border: 1px solid black;
	}
	@media screen and (max-width: 600px) {
		.expanded > div > span > img {
			display: none;
		}
	}
	.wrapper span {
		font-size: 10px;
		margin-right: 0.3rem;
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
		line-height: 0.85;
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
		height: 30px;
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
