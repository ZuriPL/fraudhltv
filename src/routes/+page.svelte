<svelte:head>
    <title>CS:GO Tier 50 News</title>
</svelte:head>
<main>
    <div class="carousel">
        <a class="banner-link" href="/post/{newsToday[counter]?.id}">
            <img src="http://localhost:1337{newsToday[counter]?.attributes.image.data.attributes.url}" alt="banner">
        </a>
        <div class="controls">
            {#each newsToday.map(el => el?.attributes.image.data.attributes.url) as img, idx}
                <div active="{idx == counter}" on:click="{_ => counter = idx}"/>
            {/each}
        </div>  
        <button class="left" on:click="{_ => counter == 0 ? counter = newsToday.length - 1 : counter--}">
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="currentColor" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
            </svg>
        </button>
        <button class="right" on:click="{_ => counter ==  newsToday.length - 1 ? counter = 0 : counter++}">
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="currentColor" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
            </svg>
        </button>
    </div>

    <div class="news">
        <h2>Today's news</h2>
        <div class="list">
            {#each newsToday as article}
                <a href="/post/{article?.id}" class="article">
                    <img src="https://www.hltv.org/img/static/flags/30x20/{article?.attributes.flag}.gif" alt="{article?.attributes.flag} flag">
                    <p class="article-title">{article?.attributes.title}</p>
                    <p class="article-date">{article?.attributes.date}</p>
                </a>
                {/each}
        </div>
    </div>
    <div class="news">
        <h2>Previous news</h2>
        <div class="list">
            {#each newsOther as article}
            <a href="/post/{article?.id}" class="article">
                <img src="https://www.hltv.org/img/static/flags/30x20/{article?.attributes.flag}.gif" alt="{article?.attributes.flag} flag">
                <p class="article-title">{article?.attributes.title}</p>
                <p class="article-date">{article?.attributes.date}</p>
                </a>
            {/each}
        </div>
        <a href="/archive">See more</a>
    </div>
</main>

<style>
    .controls > div {
        width: 12px;
        height: 12px;
        border: 1px solid white;
        border-radius: 100%;
        position: relative;
    }
    .controls > div[active="true"]::after {
        content: '';
        position: absolute;
        inset: 3px;
        background-color: white;
    }
    .carousel > button {
        all: unset;
        position: absolute;
        display: grid;
        place-items: center;
        top: 50%;
        transform: translateY(-50%);
        padding: 1rem 0.25rem;
        background-color: rgb(0, 0, 0, 75%);
    }
    .carousel > button:hover {
        background-color: rgb(0, 0, 0, 90%);
    }
    .carousel > button.left {
        left: 0;
    }
    .carousel > button.right {
        right: 0;
    }
    .carousel > .controls {
        display: flex;
        gap: 0.5rem;
        left: 50%;
        transform: translateX(-50%);
        bottom: 0;
        padding: 0.5rem 1rem;
        background-color: rgb(0, 0, 0, 75%);
        position: absolute;
    }
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100vw;
        gap: 1.5rem;
    }
    .carousel {
        width: calc(100% - 2rem);
        max-width: 800px;
        position: relative;
        margin-top: 1.5rem;
        overflow: hidden;
    }
    .carousel img {
        display: block;
        max-width: 800px;
        width: 100%;
        aspect-ratio: 8 / 3;
        object-fit: cover;
    }
    .news {
        max-width: 800px;
        width: calc(100% - 2rem);
    }
    .news > h2 {
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
        background-color: #2d3844;
        border-bottom: 1px solid #495867;
    }
    .article:hover {
        background-color: #45515f;
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
        color: #838a92;
        margin-left: auto;
    }
    .article:last-child {
        margin-left: auto;
    }
</style>

<script>
    // function formatDate(date) {
    //     let res =
    //         date.getDate() +
    //         '/' +
    //         (date.getMonth() + 1) +
    //         '/' +
    //         date.getFullYear() +
    //         ' - ' +
    //         date.getHours() +
    //         ':' +
    //         date.getMinutes();

    //     return res;
    // }
    let counter = 0    

    let newsToday = [];
    (async () => {
        let res = await fetch('http://127.0.0.1:1337/api/posts?populate=*');
        newsToday = (await res.json()).data;
    })();

    let newsOther = [];
    $: newsOther = newsToday.concat(newsToday)
</script>