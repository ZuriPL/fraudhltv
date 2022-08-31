<svelte:head>
    <title>CS:GO Tier 50 Matches</title>
</svelte:head>

<main>
    {#if import.meta.env['VITE_MODE'] === 'dev'}
        <h2>History</h2>
        {#each matchesHistory as match}
        <div>
            <p>{match.id}, {match.result}, {match.home.name}, {match.score}, {match.away.name}, {match.map}</p>  
        </div>
        {/each}
        <h2>Pending</h2>
        {#each matchesPending as match}
        <div>
            <p>{match.id}, {match.home.name} vs {match.away.name}</p>  
        </div>
        {/each}
        <h2>Live</h2>
        {#each matchesLive as match}
        <div>
            <p>{match.id}, {match.home.name}, vs {match.away.name}, {match.map}</p>  
        </div>
        {/each}
    {:else}
        <GoHome msg="This page is under construction" />
    {/if}
</main>

<script>
    import GoHome from '$lib/gohome.svelte'

    export let data;

    let { matchesHistory, matchesLive, matchesPending } = data
</script>