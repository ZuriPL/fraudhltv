<svelte:head>
    <title>CS:GO Tier 50 Matches</title>
</svelte:head>

<main>
    <!-- {#each matches as match}
        <p>{JSON.stringify(match)}</p>  
    {/each} -->
</main>

<script>
    export let data;

    let { data: matches } = data

    console.log(matches)
</script>