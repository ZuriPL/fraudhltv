<script>
	import userStore from '$lib/user';
	import supabase from '$lib/supabase';
	let heading, text, user;

	const unsubscribe = userStore.subscribe(async (value) => {
		if (!value) return;

		user = value;

		let { data, error } = await supabase.auth.resetPasswordForEmail(user.email);

		if (error) {
			heading.textContent = 'An error occured';
			text.textContent = error.message;
			return;
		}

		console.log(data);
		console.log(error);

		unsubscribe();
	});
</script>

<svelte:head>
	<title>Change your password</title>
</svelte:head>

<div>
	<h1 bind:this={heading}>Check your inbox</h1>
	<p bind:this={text}>
		We've sent you a recovery email to your current email addres: {user?.email}
	</p>
</div>

<style>
	h1 {
		font-size: 2.25rem;
		color: var(--header-color);
	}
	div {
		display: flex;
		flex-direction: column;
		align-items: center;
		color: var(--text-color);
		width: calc(100% - 2rem);
		max-width: 800px;
		background-color: var(--bg-primary);
		padding: 1rem;
		margin: 1rem auto;
	}
	p {
		margin-top: 0.5rem;
	}
</style>
