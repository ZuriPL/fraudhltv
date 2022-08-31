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