<svelte:head>
    <title>CS:GO Tier 50 News</title>
</svelte:head>

<main>
    <div class="news">
        <h1>All news</h1>
        <form on:submit|preventDefault="{search}">
            <input type="search" name="searchbox" id="searchbox" placeholder="Search..." aria-label="Search articles">
            <button type="submit"><svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="currentColor" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
            </svg></button>
        </form>
        <div class="list">
            {#each news as article}
                <a href="/post/{article?.slug}" class="article">
                    <img src="https://flagcdn.com/w320/{article?.flag.toLowerCase()}.png" alt="{article?.flag} flag">
                    <p class="article-title">{article?.title}</p>
                    <p class="article-date">{article?.timeAgo}</p>
                </a>
            {/each}
        </div>
    </div>
</main>

<script>
    export let data

    let { news } = data

    function search(e) {
        if (e.srcElement[0].value === '') return { news } = data
        news = data.news.filter(el => el.title.toLowerCase().includes(e.srcElement[0].value.toLowerCase()))
    }
</script>

<style>
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100vw;
        gap: 1.5rem;
        padding-top: 1.5rem;
    }
    .news {
        max-width: 800px;
        width: calc(100% - 2rem);
    }
    form {
        margin-bottom: 0.5rem;
        display: flex;
        align-items: stretch;
        height: 32px;
        gap: 0.5rem;
        border: 1px solid var(--border-clr);
        width: fit-content;
        padding: 0.25rem;
        color: var(--text-color);
    }
    form > button, form > input {
        all: unset;
    }
    form > button {
        border-left: 1px solid var(--border-clr);
        padding-left: 0.25rem;
        color: var(--border-clr);
    }
    form > button:hover path {
        fill: var(--link-color);
    }
    .news > h1 {
        font-weight: 500;
        color: var(--text-color);
        margin-bottom: 0.5rem;
        font-size: 1.125rem;
        font-weight: 600;
    }
    .article {
        color: var(--text-color);
        text-decoration: none;
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 0.5rem 1rem;
        background-color: var(--bg-primary);
        border-bottom: 1px solid var(--border-clr);
    }
    .article:hover {
        background-color: var(--bg-hover);
    }
    .article:last-child {
        border: none;
    }
    .article > img {
        width: 20px;
        aspect-ratio: 3/2;
    }
    .article-title {
        font-weight: 600;
    }
    .article-date {
        font-size: 0.75rem;
        color: var(--border-clr);
        margin-left: auto;
    }
    .article:last-child {
        margin-left: auto;
    }
</style>