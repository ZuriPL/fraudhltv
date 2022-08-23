<nav>
    <a class="logo-anchor" href="/"><img src="/favicon.png" alt="Logo"></a>
    <a href="/">News</a>
    <a href="/matches">Matches</a>
    <a href="/forums">Forums</a>
    <a href="/fantasy">Fantasy</a>
    <div class="menu-btn"><svg style="width:24px;height:24px" viewBox="0 0 24 24">
        <path fill="currentColor" d="M7,10L12,15L17,10H7Z" />
    </svg></div>
</nav>

<style>
    nav {
        height: 3rem;
        background-color: #2d3844;
        display: flex;
        align-items: stretch;
        color: #929a9e;
        padding: 0 calc(calc(100vw - 800px) / 2);
    }
    img {
        height: 100%;
        aspect-ratio: 1 / 1;
    }
    .logo-anchor {
        width: 3rem;
    }
    nav > a:not(.logo-anchor), nav > div {
        display: block;
        color: #929a9e;
        text-decoration: none;
        font-weight: 500;
        flex: 1;
        display: grid;
        place-items: center;
        border-left: 1px solid #838a92;
    }
    nav > a:not(.logo-anchor):hover {
        background-color: #45515f;
        color: #afbcd4;
    }
    .menu-btn:hover {
        cursor: pointer;
    }
    nav > div.menu-btn {
        flex: 0 !important;
        padding-inline: 1rem;
    }
</style>