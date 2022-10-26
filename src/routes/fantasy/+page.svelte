<script>
	import GoHome from '$lib/gohome.svelte';
</script>

<svelte:head>
	<title>FraudHLTV Fantasy</title>
</svelte:head>

<main>
	{#if import.meta.env['VITE_MODE'] === 'dev'}
		<div />
	{:else}
		<GoHome msg="This page is under construction" />
	{/if}
</main>
