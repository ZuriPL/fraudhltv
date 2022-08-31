<script>
    export let data
</script>

<svelte:head>
    <title>{data?.title} | FraudHLTV</title>
    <meta name="twitter:title" content="{data?.title} | FraudHLTV" />
    <meta name="twitter:site" content="@fraudhltv" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content="{data?.image}" />
</svelte:head>

<main>    
    <article>
        <h1 class="article-title">{data?.title}</h1>

        <div class="info">
            <div class="writer-info">
                <svg style="width:16px;height:auto" viewBox="0 0 24 24">
                    <path fill="#5f6971" d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
                </svg>
                <a href="/profile/{data?.author?.name}">{data?.author?.name}</a>
            </div>
            <p class="article-info">{data?.createdAt}</p>
        </div>
        
        <div class="article-content">
            {@html data?.article}
        </div>
    </article>
</main>

<style>
    .info {
        display: flex;
        justify-content: space-between;
        font-size: 0.8rem;
        margin-bottom: 0.75rem;
    }
    :global(img) {
        width: 100%;
        display: block;
    }
    .writer-info {
        display: flex;
        align-items: center;
        gap: 0.25rem;
    }
    article {
        max-width: 800px;
        background-color: var(--bg-primary);
        width: calc(100% - 2rem);
        padding: 1rem 2rem;
    }
    main {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        align-items: center;
        width: 100vw;
    }
    .article-content > :global(*) {
        margin-bottom: 1rem;
    }
    .article-title {
        font-size: 2.5rem;
        letter-spacing: -1px;
        text-transform: uppercase;
        color: white;
    }
    article :global(p) {
        color: var(--text-color);
    }
</style>