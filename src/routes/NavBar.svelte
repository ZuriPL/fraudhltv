<script>
	import supabase from '$lib/supabase';
	import { beforeNavigate } from '$app/navigation';
	import user from '$lib/user';

	let popup, button;
	let favicon = '';

	$: favicon = $user?.preferred_theme === 'light' ? '_light' : '';

	let fakeEvent = { composedPath: (_) => [] };

	function toggleMenu(e = fakeEvent) {
		if (e.composedPath().includes(popup)) return;
		popup?.classList?.toggle('show');
	}

	function closeMenu(e = fakeEvent) {
		if (e.composedPath().includes(button)) return;
		popup?.classList?.remove('show');
	}

	beforeNavigate((_) => closeMenu());

	async function handleTheme(e) {
		document.body.classList.remove('auto');
		document.body.classList.remove('light');
		document.body.classList.remove('dark');
		document.body.classList.add(e.target.value);

		$user.preferred_theme = e.target.value;
		await supabase
			.from('users')
			.update({ preferred_theme: e.target.value })
			.eq('user_id', $user.user_id);
	}
</script>

<nav>
	<a class="logo-anchor" href="/"><img src="/favicon{favicon}.png" alt="Logo" /></a>
	<div class="scroll-wrapper">
		<a data-sveltekit-prefetch href="/">News</a>
		<a data-sveltekit-prefetch href="/ranking">Rankings</a>
		<a data-sveltekit-prefetch href="/forum">Forums</a>
		<a data-sveltekit-prefetch href="/fantasy">Fantasy</a>
	</div>
	{#if $user}
		<button class="menu-btn" on:click={toggleMenu} bind:this={button}>
			<svg style="width:24px;height:24px" viewBox="0 0 24 24">
				<path fill="currentColor" d="M7,10L12,15L17,10H7Z" />
			</svg>

			<!--  stop propagation, callback is noop -->
			<div class="popup" bind:this={popup} on:click={(_) => 0}>
				<div class="top-section item">
					<a data-sveltekit-prefetch href="/profile/{$user?.name}">{$user?.name}</a>
					<button class="logout" on:click={(_) => supabase.auth.signOut()}>Log out</button>
				</div>
				<a href="/edit-profile" class="item separator"> Edit profile </a>
				<label on:input={handleTheme} class="item">
					Theme <select name="theme-toggle" id="theme-toggle" value={$user.preferred_theme}>
						<option value="auto">System preference</option>
						<option value="light">Light mode</option>
						<option value="dark">Dark mode</option>
					</select>
				</label>
				{#if $user.role === 'writer' || $user.role === 'admin'}
					<a href="/new-post" class="item new-post separator"
						><svg style="width:24px;height:auto" viewBox="0 0 24 24">
							<path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
						</svg>New post</a
					>
				{/if}
			</div>
		</button>
	{:else}
		<a href="/signin" class="signin-link">Sign in</a>
	{/if}
</nav>

<svelte:window on:click={closeMenu} />

<style>
	.separator {
		border-top: 1px solid var(--border-clr);
	}
	.item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 8px;
	}
	.item:hover {
		background-color: var(--bg-hover);
	}
	.new-post {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		font-size: 1rem;
	}
	.signin-link {
		color: var(--link-color) !important;
		font-size: 0.85rem;
		border-left: 1px solid var(--border-clr);
		padding: 0 16px;
		flex: 0;
		display: grid;
		place-items: center;
		flex-shrink: 0;
		flex-basis: auto;
	}
	.popup {
		display: none;
		position: absolute;
		right: 0;
		bottom: 0;
		transform: translateY(100%);
		width: 350px;
		background-color: var(--bg-primary);
		z-index: 2;
		color: var(--text-color);
		cursor: initial;
		border: 1px solid var(--border-clr);
		font-size: 0.85rem;
	}
	:global(.popup.show) {
		display: block !important;
	}
	.top-section {
		font-size: 1rem;
		background-color: var(--bg-header) !important;
	}
	.logout {
		all: unset;
		color: var(--link-color);
		font-weight: 600;
		cursor: pointer;
		font-size: 0.85rem;
	}
	nav {
		height: 3rem;
		background-color: var(--bg-primary);
		display: flex;
		align-items: stretch;
		color: #929a9e;
		padding: 0 calc(calc(100vw - 800px) / 2);
		margin-bottom: 1.5rem;
		box-shadow: var(--list-shadow);
	}
	.scroll-wrapper {
		display: flex;
		align-items: stretch;
		overflow-x: overlay;
		overflow-y: hidden;
		width: 100%;
	}
	img {
		height: 100%;
		aspect-ratio: 1 / 1;
	}
	.logo-anchor {
		width: 3rem;
		flex-shrink: 0 !important;
	}
	.scroll-wrapper > a:not(.logo-anchor),
	nav > button {
		display: block;
		color: var(--text-color);
		text-decoration: none;
		font-weight: 500;
		flex: 1;
		padding: 0 20px;
		font-size: 0.95rem;
		display: grid;
		place-items: center;
		border: none;
		border-left: 1px solid #838a92;
	}
	.scroll-wrapper > a:not(.logo-anchor):hover {
		background-color: var(--bg-hover);
	}
	.menu-btn {
		position: relative;
		cursor: pointer;
		flex: 0 !important;
		padding-inline: 1rem;
		background-color: transparent;
	}
</style>
