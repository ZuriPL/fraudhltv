<script>
    export let data
</script>

<svelte:head>
    <title>{data.title} | FraudHLTV</title>
    <meta name="twitter:title" content="{data.title} | FraudHLTV" />
    <meta name="twitter:site" content="@fraudhltv" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content="{data.image}" />
</svelte:head>

<main>    
    <article>
        <h1 class="article-title">{data.title}</h1>

        <div class="info">
            <div class="writer-info">
                <svg style="width:12px;height:12px" viewBox="0 0 24 24">
                    <path fill="#5f6971" d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z" />
                </svg>
                <a target="_blank" href="{data.writer.link}">{data.writer.name}</a>
            </div>
            <p class="article-info">{data.date}</p>
        </div>
        
        <div class="article-content">
            {@html data.article}
        </div>
    </article>
</main>

<style>
    .info {
        display: flex;
        justify-content: space-between;
        font-size: 0.8rem;
        margin-bottom: 0.5rem;
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
        background-color: #2d3844;
        margin-top: 1.5rem;
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
    }
    article :global(p) {
        color: #b9bdbf;
    }
</style>