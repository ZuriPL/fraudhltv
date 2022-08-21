<nav>
    <h1 class="hidden">HLTV</h1>
    <a class="logo-anchor" href="/"><img src="favicon.png" alt="Logo"></a>
    <a href="/">News</a>
    <a href="/matches">Matches</a>
    <a href="/forums">Forums</a>
    <a href="/fantasy">Fantasy</a>
    <div class="menu-btn"><svg style="width:24px;height:24px" viewBox="0 0 24 24">
        <path fill="var(--text-color)" d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
    </svg></div>
</nav>

<style>
    nav {
        height: 3rem;
        background-color: #2d3844;
        display: flex;
        align-items: stretch;
        color: var(--text-color);
        padding: 0 calc(calc(100vw - 800px) / 2);
    }
    img {
        height: 100%;
        aspect-ratio: 1 / 1;
    }
    nav > a:not(.logo-anchor), nav > div {
        display: block;
        color: var(--text-color);
        text-decoration: none;
        flex: 1;
        display: grid;
        place-items: center;
        border-left: 1px solid #838a92;
    }
    nav > a:not(.logo-anchor):hover, nav > div:hover {
        background-color: #45515f;
        color: #afbcd4;
    }
    nav > div.menu-btn {
        flex: 0 !important;
        padding-inline: 1rem;
    }
</style>