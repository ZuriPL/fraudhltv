<nav>
    <a class="logo-anchor" href="/"><img src="/favicon.png" alt="Logo"></a>
    <div class="scroll-wrapper">
        <a href="/">News</a>
        <a href="/rankings">Rankings</a>
        <a href="/matches">Matches</a>
        <a href="/forums">Forums</a>
        <a href="/fantasy">Fantasy</a>
    </div>
    {#if $user}
        <button class="menu-btn">
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="currentColor" d="M7,10L12,15L17,10H7Z" />
            </svg>
            <div class="popup">
                <div class="flex header">
                    <a href="/profile"><h2>{'zuriii'}</h2></a>
                    <a href="/logout">Log out</a>
                </div>
                <button class="hoverable">Profile settings </button>
                <div class="site-controls">
                    <div class="flex hoverable">Theme <input type="checkbox" id="theme-toggle"></div>
                </div>
                <a href="/new" class="flex hoverable">New Post</a>
            </div>
        </button>
    {:else}
        <a href="/signin" class="signin-link">Sign in</a>
    {/if}
</nav>

<script>
    import user from '$lib/user'
</script>

<style>
    .signin-link {
        color: var(--link-color) !important;
        font-size: 0.9rem;
        border-left: 1px solid #838a92;
        padding: 0 16px;
        flex: 0;
        display: grid;
        place-items: center;
        flex-shrink: 0;
        flex-basis: auto;
    }
    .popup {
        display: none;
        position: absolute;
        right: 0;
        bottom: 0;
        transform: translateY(100%);
        width: 350px;
        background-color: #2d3844;
        z-index: 2;
        color: var(--text-color);
        cursor: initial;
        border: 1px solid #495867;
    }
    .site-controls {
        padding: 0 !important;
        margin: 0;
    }
    .popup button {
        background-color: transparent;
        text-align: left;
        padding: 0;
        border: none;
        color: inherit;
        display: block;
        width: 100%;
        color: var(--link-color);
        font-weight: 600;
    }
    .hoverable:hover {
        background-color: #45515f;
    }
    .popup > div, .popup > button, .popup > a {
        padding: 0.75rem 0.5rem;
        border-top: 1px solid #495867;
    }
    .site-controls > div {
        padding: 0.75rem 0.5rem;
    }
    .header {
        background-color: #364250;
        font-weight: 500;
        font-size: 12px !important;
        border-top: none !important;
    }
    h2 {
        font-size: 1rem !important;
    }
    .flex {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .menu-btn:focus-within .popup {
        display: block;

        display: grid;
        place-items: center;
    }
    nav {
        height: 3rem;
        background-color: #2d3844;
        display: flex;
        align-items: stretch;
        color: #929a9e;
        padding: 0 calc(calc(100vw - 800px) / 2);
    }
    .scroll-wrapper {
        display: flex;
        align-items: stretch;
        overflow-x: overlay;
        overflow-y: hidden;
        width: 100%;
    }
    .scroll-wrapper::-webkit-scrollbar {
        height: 4px;
        background-color: transparent;
    }
    .scroll-wrapper::-webkit-scrollbar-thumb {
        border-radius: 50px;
        background-color: var(--link-color);
    }
    img {
        height: 100%;
        aspect-ratio: 1 / 1;
    }
    .logo-anchor {
        width: 3rem;
        flex-shrink: 0 !important;
    }
    .scroll-wrapper > a:not(.logo-anchor), nav > button {
        display: block;
        color: #929a9e;
        text-decoration: none;
        font-weight: 500;
        flex: 1;
        padding: 0 24px;
        display: grid;
        place-items: center;
        border: none;
        border-left: 1px solid #838a92;
    }
    .scroll-wrapper > a:not(.logo-anchor):hover {
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