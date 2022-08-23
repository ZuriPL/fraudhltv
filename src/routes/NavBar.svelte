<nav>
    <a class="logo-anchor" href="/"><img src="/favicon.png" alt="Logo"></a>
    <a href="/">News</a>
    <a href="/matches">Matches</a>
    <a href="/forums">Forums</a>
    <a href="/fantasy">Fantasy</a>
    <button class="menu-btn">
        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path fill="currentColor" d="M7,10L12,15L17,10H7Z" />
        </svg>
        <div class="popup"></div>
    </button>
</nav>

<style>
    .popup {
        display: none;
        position: absolute;
        right: 0;
        bottom: 0;
        transform: translateY(100%);
        height: 100px;
        width: 100px;
        background-color: red;
    }
    .menu-btn:focus-within .popup {
        display: block;
    }
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
    nav > a:not(.logo-anchor), nav > button {
        display: block;
        color: #929a9e;
        text-decoration: none;
        font-weight: 500;
        flex: 1;
        display: grid;
        place-items: center;
        border: none;
        border-left: 1px solid #838a92;
    }
    nav > a:not(.logo-anchor):hover {
        background-color: #45515f;
        color: #afbcd4;
    }
    .menu-btn {
        position: relative;
        cursor: pointer;
        flex: 0 !important;
        padding-inline: 1rem;
        background-color: transparent;
    }
</style>