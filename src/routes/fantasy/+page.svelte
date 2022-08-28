<svelte:head>
    <title>CS:GO Tier 50 Fantasy</title>
</svelte:head>

<main>
    {#if import.meta.env['VITE_MODE'] === 'dev'}
        <div></div>
    {:else}
        <p>nothing to see here yet</p>
    {/if}
</main>