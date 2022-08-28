<main>
    {#if import.meta.env['VITE_MODE'] === 'dev'}
        <div></div>
    {:else}
        <p>nothing to see here yet</p>
    {/if}
</main>