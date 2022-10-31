<script>
	import GoHome from '$lib/gohome.svelte';
	import supabase from '$lib/supabase';
	import { goto } from '$app/navigation';
	import user from '$lib/user';
	import HCaptcha from '../HCaptcha.svelte';

	let emailInput, passwordInput, captcha;
	let log;

	let captchaToken;

	const handleError = () => {
		captcha.reset();
		captchaToken = undefined;
	};

	const handleSuccess = (token) => {
		captchaToken = token.detail.token;
	};

	async function submitHandler() {
		let {
			data: { user },
			error
		} = await supabase.auth.signInWithPassword({
			email: emailInput.value,
			password: passwordInput.value,
			options: {
				captchaToken
			}
		});

		captcha.reset();
		captchaToken = undefined;

		if (user) return goto('/');

		log.textContent = error.message;
	}
</script>

<svelte:head>
	<title>Sign in to FraudHLTV</title>
</svelte:head>

<main>
	{#if $user}
		<GoHome msg="You're already logged in" />
	{:else}
		<form on:submit|preventDefault={submitHandler}>
			<h1>Log in</h1>
			<div class="row">
				<label>
					Email
					<input
						type="email"
						bind:this={emailInput}
						autocomplete="email"
						id="email"
						name="email"
						required
					/>
				</label>
				<label>
					Password
					<input
						type="password"
						bind:this={passwordInput}
						autocomplete="current-password"
						name="password"
						id="password"
						required
					/>
				</label>
				<HCaptcha
					sitekey="add2a870-e348-4ecc-b1a6-3654d2857fc8"
					on:success={handleSuccess}
					on:error={handleError}
					bind:this={captcha}
					reCaptchaCompa={false}
				/>
			</div>
			<p class="log" bind:this={log} />
			<button>Log in</button>
		</form>
		<a href="https://twitter.com/fraudhltv" target="_blank"
			>Forgot your password? DM us on twitter</a
		>
		<a href="/signup">No account? Create one here</a>
	{/if}
</main>

<style>
	main {
		color: var(--text-color);
	}
	label {
		min-width: calc(400px - 1.5rem);
		flex-grow: 1;
	}
	.log {
		color: red;
		margin-top: 0.5rem;
		font-size: 0.9rem;
		font-weight: 500;
	}
	input {
		display: block;
		width: 100%;
		background-color: transparent;
		border: 1px solid var(--border-clr);
		color: var(--text-color);
		font-size: 16px;
	}
	.row {
		display: flex;
		justify-content: stretch;
		gap: 1rem;
		flex-wrap: wrap;
	}
	button {
		padding: 0.75rem 0;
		width: calc(calc(800px - 4rem) / 3);
		border: none;
		background-color: var(--button-clr);
		color: var(--btn-text-color);
		font-size: 1rem;
		font-weight: 600;
		margin: 0.5rem auto 0 auto;
		display: block;
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
		max-width: 800px;
		width: calc(100% - 2rem);
		background-color: var(--bg-primary);
		padding: 1rem;
	}
	h1 {
		margin-bottom: 1rem;
		color: var(--header-color);
		grid-column: span 2;
	}
</style>
