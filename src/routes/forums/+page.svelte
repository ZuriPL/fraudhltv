<svelte:head>
    <title>CS:GO Tier 50 Forums</title>
</svelte:head>

<main>
    {#if import.meta.env['VITE_MODE'] === 'dev'}
        <div></div>
    {:else}
        <GoHome msg="This page is under construction" />
    {/if}
</main>

<script>
    import GoHome from '$lib/gohome.svelte'
</script>