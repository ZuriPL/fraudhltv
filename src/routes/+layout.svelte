<script>
	import NavBar from './NavBar.svelte';
	import Footer from './Footer.svelte';
	import { afterNavigate } from '$app/navigation';
	import supabase from '$lib/supabase';
	import user from '$lib/user';
	import { onMount } from 'svelte';

	afterNavigate((_) => {
		document.body.classList.add('show-carousel');
	});

	function setTheme(theme) {
		document.body.classList.remove('auto');
		document.body.classList.remove('light');
		document.body.classList.remove('dark');
		if (theme) document.body.classList.add(theme);
	}

	onMount(() => {
		supabase.auth.getSession().then(async ({ data }) => {
			try {
				let { data: userData } = await supabase
					.from('users')
					.select()
					.eq('user_id', data?.session?.user?.id)
					?.single();
				$user = userData;
				setTheme($user?.preferred_theme);
			} catch {}
		});

		supabase.auth.onAuthStateChange(async (event, session) => {
			try {
				let { data: userData } = await supabase
					.from('users')
					.select()
					.eq('user_id', session?.user?.id)
					?.single();
				$user = userData;
				setTheme($user?.preferred_theme);
			} catch {}
		});
	});
</script>

<NavBar />
<slot />
<Footer />

<style>
	@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800&display=swap');

	:global(*) {
		margin: 0;
		font-family: 'Open Sans', sans-serif;
		box-sizing: border-box;
	}
	:global(a) {
		text-decoration: none;
		color: var(--link-color);
		font-weight: 600;
	}
	:global(.hidden) {
		display: none;
	}
	:global(select) {
		background-color: var(--bg-primary);
		border: 1px solid var(--border-clr);
		color: var(--text-color);
	}
	:global(option) {
		color: var(--text-color);
		background-color: var(--bg-primary);
	}
	:root {
		--text-color-dark: #b9bdbf;
		--btn-text-color-dark: #b9bdbf;
		--header-color-dark: white;
		--link-color-dark: #87a3bf;
		--bg-secondary-dark: #1b1f23;
		--bg-header-dark: #364250;
		--bg-primary-dark: #2d3844;
		--bg-hover-dark: #45515f;
		--border-clr-dark: #61666b;
		--button-clr-dark: #435971;
		--button-hover-dark: #59728e;
		--list-shadow-dark: 0 1px 1px 0 rgb(0 0 0 / 50%);

		--text-color-light: #353535;
		--btn-text-color-light: #fff;
		--link-color-light: #2d6da3;
		--header-color-light: black;
		--bg-secondary-light: #e5e7ea;
		--bg-header-light: #f6f6f9;
		--bg-primary-light: #ffffff;
		--bg-hover-light: #ededef;
		--border-clr-light: #cccccc;
		--button-clr-light: #2d6da3;
		--button-hover-light: #1f5582;
		--list-shadow-light: 0 1px 2px 0 rgb(50 50 50 / 40%);
	}
	:global(body) {
		background-color: var(--bg-secondary);
		color: var(--text-color);
		overflow-x: hidden;
		height: 100vh;
		display: flex;
		flex-direction: column;

		--button-clr: var(--button-clr-dark);
		--button-hover: var(--button-hover-dark);
		--text-color: var(--text-color-dark);
		--btn-text-color: var(--btn-text-color-dark);
		--link-color: var(--link-color-dark);
		--bg-secondary: var(--bg-secondary-dark);
		--bg-header: var(--bg-header-dark);
		--bg-primary: var(--bg-primary-dark);
		--bg-hover: var(--bg-hover-dark);
		--border-clr: var(--border-clr-dark);
		--list-shadow: var(--list-shadow-dark);
		--header-color: var(--header-color-dark);
	}
	@media (prefers-color-scheme: dark) {
		:global(body) {
			--button-clr: var(--button-clr-dark);
			--list-shadow: var(--list-shadow-dark);
			--button-hover: var(--button-hover-dark);
			--text-color: var(--text-color-dark);
			--btn-text-color: var(--btn-text-color-dark);
			--link-color: var(--link-color-dark);
			--bg-secondary: var(--bg-secondary-dark);
			--bg-header: var(--bg-header-dark);
			--bg-primary: var(--bg-primary-dark);
			--bg-hover: var(--bg-hover-dark);
			--border-clr: var(--border-clr-dark);
			--header-color: var(--header-color-dark);
		}
	}

	@media (prefers-color-scheme: light) {
		:global(body) {
			--button-clr: var(--button-clr-light);
			--list-shadow: var(--list-shadow-light);
			--button-hover: var(--button-hover-light);
			--text-color: var(--text-color-light);
			--btn-text-color: var(--btn-text-color-light);
			--link-color: var(--link-color-light);
			--bg-secondary: var(--bg-secondary-light);
			--bg-header: var(--bg-header-light);
			--bg-primary: var(--bg-primary-light);
			--bg-hover: var(--bg-hover-light);
			--border-clr: var(--border-clr-light);
			--header-color: var(--header-color-light);
		}
	}
	:global(body.light) {
		--button-clr: var(--button-clr-light);
		--list-shadow: var(--list-shadow-light);
		--button-hover: var(--button-hover-light);
		--text-color: var(--text-color-light);
		--btn-text-color: var(--btn-text-color-light);
		--link-color: var(--link-color-light);
		--bg-secondary: var(--bg-secondary-light);
		--bg-header: var(--bg-header-light);
		--bg-primary: var(--bg-primary-light);
		--bg-hover: var(--bg-hover-light);
		--border-clr: var(--border-clr-light);
		--header-color: var(--header-color-light);
	}
	:global(body.dark) {
		--button-clr: var(--button-clr-dark);
		--list-shadow: var(--list-shadow-dark);
		--button-hover: var(--button-hover-dark);
		--btn-text-color: var(--btn-text-color-dark);
		--link-color: var(--link-color-dark);
		--bg-secondary: var(--bg-secondary-dark);
		--bg-header: var(--bg-header-dark);
		--bg-primary: var(--bg-primary-dark);
		--bg-hover: var(--bg-hover-dark);
		--border-clr: var(--border-clr-dark);
		--header-color: var(--header-color-dark);
	}
</style>
