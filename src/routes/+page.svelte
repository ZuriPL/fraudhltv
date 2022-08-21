<svelte:head>
    <title>CS:GO Tier 50 News</title>
</svelte:head>
<main>
    <div class="carousel">
        <img src="{image}" alt="banner">
        <div class="controls">
            {#each news.map(el => el.img) as img, idx}
                <div active="{idx == counter}" on:click="{_ => counter = idx}"/>
            {/each}
            <!-- {news.map(el => el.img).length} -->
        </div>  
        <button class="left" on:click="{_ => counter == 0 ? counter = news.length - 1 : counter--}">⬅</button>
        <button class="right" on:click="{_ => counter ==  news.length - 1 ? counter = 0 : counter++}">➡</button>
    </div>

    <div class="news">
        <h2>Today's news</h2>
        <div class="list">
            {#each news as article}
                <a href="{article.link}" class="article">
                    <img src="https://www.hltv.org/img/static/flags/30x20/{article.flag}.gif" alt="{article.flag} flag">
                    <p class="article-title">{article.title}</p>
                    <p class="article-comments">{article.commentsNum} comments</p>
                </a>
            {/each}
        </div>
    </div>
    <div class="news">
        <h2>Previous news</h2>
        <div class="list">
            {#each news as article}
                <a href="{article.link}" class="article">
                    <img src="https://www.hltv.org/img/static/flags/30x20/{article.flag}.gif" alt="{article.flag} flag">
                    <p class="article-title">{article.title}</p>
                    <p class="article-comments">{article.commentsNum} comments</p>
                </a>
            {/each}
        </div>
    </div>
</main>

<style>
    .controls > div {
        width: 8px;
        height: 8px;
        border: 1px solid white;
        border-radius: 100%;
        position: relative;
    }
    .controls > div[active="true"]::after {
        content: '';
        position: absolute;
        inset: 2px;
        background-color: white;
    }
    .carousel > button {
        all: unset;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
    }
    .carousel > button.left {
        left: 0;
    }
    .carousel > button.right {
        right: 0;
    }
    .carousel > .controls {
        display: flex;
        gap: 0.25rem;
        left: 50%;
        transform: translateX(-50%);
        bottom: 0;
        padding: 0.5rem 1rem;
        background-color: rgb(0, 0, 0, 80%);
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
    }
    .carousel > img {
        display: block;
        width: 100%;
        height: 100%;
    }
    .news {
        max-width: 800px;
        width: calc(100% - 2rem);
        padding: 0 1rem;
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
    .article-comments {
        font-size: 0.75rem;
        color: #838a92;
        margin-left: auto;
    }
    .article:last-child {
        margin-left: auto;
    }
    .carousel {
        margin-top: 1.5rem;
    }
</style>

<script>
    let counter = 0
    let news = [
        {
            title: 'Test1',
            flag: 'PL',
            commentsNum: 12,
            link: '/post/1',
            img: 'https://img-cdn.hltv.org/gallerypicture/VRt95V-yzaFsJhYUxqw1F8.png?ixlib=java-2.1.0&w=500&s=5642cb822ca66ea684c080f1f946e6d0'
        },
        {
            title: 'Test2',
            flag: 'EU',
            commentsNum: 13,
            link: '/post/2',
            img: 'https://img-cdn.hltv.org/gallerypicture/J--URvt7Fis8tk1jUS4XaD.png?ixlib=java-2.1.0&w=500&s=88fefdf4d9cfebffcc2019f04f674fab'
        }
    ]    
    let image
    $: image = news[counter].img
</script>