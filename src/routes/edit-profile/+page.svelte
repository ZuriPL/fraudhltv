<script>
	import supabase from '$lib/supabase';
	import user from '$lib/user';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let nameInput, bioInput, playerSelect, teamSelect, countrySelect;

	let log;

	async function submitHandler(e) {
		// return

		let { error } = await supabase
			.from('users')
			.update({
				bio: bioInput.value,
				name: nameInput.value,
				flag: countrySelect.value,
				player: playerSelect.value,
				team: teamSelect.value
			})
			.eq('user_id', $user.user_id);

		if (error) og.textContent = error.message;
		else goto(`/profile/${$user.name}`);
	}

	let countryList = [];
	let playersList = ['player'];
	let teamsList = ['team'];
	let mounted;

	async function getData(object) {
		let res = await fetch(`/${object}.json`);
		let list = await res.json();

		list.sort();

		return list;
	}

	onMount(async () => {
		let res = await fetch('https://restcountries.com/v3.1/all');
		let data = await res.json();

		countryList = data.map((country) => {
			return {
				name: country.name.common,
				code: country.cca2
			};
		});
		countryList.sort((a, b) => {
			const nameA = a.name.toUpperCase();
			const nameB = b.name.toUpperCase();
			if (nameA < nameB) {
				return -1;
			}
			if (nameA > nameB) {
				return 1;
			}
			return 0;
		});

		teamsList = await getData('teams');
		playersList = await getData('players');

		(await playersList) && (await teamsList) && (mounted = true);
	});

	$: {
		(async (_) => {
			if (!mounted) return;
			teamSelect.value = $user?.team;
			countrySelect.value = $user?.flag;
			playerSelect.value = $user?.player;
		})();
	}
</script>

<svelte:head>
	<title>Update Your Account</title>
</svelte:head>

<main>
	<form on:submit|preventDefault={submitHandler}>
		<h1>Update Your Account</h1>
		<hr />
		<div class="grid">
			<div>
				<label for="name" class="input-label">Username</label>
				<input
					maxlength="40"
					value={$user?.name}
					bind:this={nameInput}
					type="text"
					name="name"
					id="name"
					autocomplete="nickname"
					required
				/>
			</div>
			<div>
				<a href="/edit-profile/update-email">Change email</a>
				<a href="/edit-profile/update-password">Change password</a>
			</div>
		</div>
		<hr />
		<div class="grid2">
			<label class="textarea-label">
				Write your bio
				<textarea name="bio" cols="30" value={$user?.bio} bind:this={bioInput} />
			</label>
			<label class="select-label">
				Choose your country
				<select name="flag" bind:this={countrySelect}>
					<option value="" selected disabled hidden>--- Please choose an option ---</option>
					{#each countryList as country}
						<option value={country.code}>{country.name}</option>
					{/each}
				</select>
			</label>
			<label class="select-label">
				Choose your favourite player
				<select name="player" bind:this={playerSelect}>
					<option value="" selected disabled hidden>--- Please choose an option ---</option>
					{#each playersList as player}
						<option value={player}>{player}</option>
					{/each}
				</select>
			</label>
			<label class="select-label">
				Choose your favourite team
				<select name="team" bind:this={teamSelect}>
					<option value="" selected disabled hidden>--- Please choose an option ---</option>
					{#each teamsList as team}
						<option value={team}>{team}</option>
					{/each}
				</select>
			</label>
		</div>
		<hr />
		<p class="log" bind:this={log} />
		<button>Update</button>
	</form>
</main>

<style>
	main {
		color: var(--text-color);
	}
	input,
	textarea,
	select {
		display: block;
		width: 100%;
		background-color: transparent;
		border: 1px solid var(--border-clr);
		font-size: 16px;
		color: var(--text-color);
	}
	.grid input {
		width: calc(50% - 0.5rem);
	}
	select {
		background-color: var(--bg-primary);
	}
	button {
		padding: 0.75rem 0;
		width: calc(calc(800px - 4rem) / 3);
		border: none;
		background-color: var(--button-clr);
		color: var(--btn-text-color);
		font-size: 1rem;
		font-weight: 600;
		margin: 0 auto;
		display: block;
	}
	.grid > div > a {
		all: unset;
		font-weight: 600;
		display: block;
		margin-top: 0.5rem;
		color: var(--link-color);
		cursor: pointer;
	}
	.log {
		margin-top: -0.5rem;
		margin-bottom: 0.5rem;
		color: red;
		font-size: 0.9rem;
		font-weight: 500;
	}
	button:hover {
		background-color: var(--button-hover);
	}
	main {
		width: 100%;
		display: flex;
		align-items: center;
		flex-direction: column;
		gap: 0.5rem;
	}
	form {
		width: calc(100% - 2rem);
		max-width: 800px;
		background-color: var(--bg-primary);
		padding: 1rem;
	}
	.grid {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		gap: 0.5rem;
	}
	.grid2 {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: repeat(3, 1fr);
		gap: 1rem;
	}
	.textarea-label {
		grid-row: 1 / span 3;
		grid-column: 1 / span 2;
		width: 100%;
		height: 100%;
	}
	textarea {
		width: 100%;
		height: 100%;
		resize: none;
	}
	.grid2 > .select-label {
		grid-column: 3 / span 1;
	}
	.grid label {
		margin-bottom: 0.25rem;
		display: block;
	}
	.grid2 label {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}
	hr {
		margin: 1.5rem 0;
		border: 1px solid var(--border-clr);
	}
	h1 {
		margin-bottom: 1rem;
		grid-column: span 2;
	}
</style>
