<nav>
    <div class="scroll-wrapper">
        <a class="logo-anchor" href="/"><img src="/favicon.png" alt="Logo"></a>
        <a href="/">News</a>
        <a href="/rankings">Rankings</a>
        <a href="/matches">Matches</a>
        <a href="/forums">Forums</a>
        <a href="/fantasy">Fantasy</a>
    </div>
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
                <div class="flex hoverable">
                    Language <select>
                        <option value="Polish">Polish</option>
                        <option value="English">English</option>
                        <option value="Finnish">Finnish</option>
                        <option value="Russian">Russian</option>
                        <option value="French">French</option>
                    </select>
                </div>
            </div>
            <a href="/new" class="flex hoverable">New Post</a>
        </div>
    </button>
</nav>

<style>
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
    select, option {
        background-color: #2d3844;
        color: var(--text-color);
        width: 25ch;
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
    img {
        height: 100%;
        aspect-ratio: 1 / 1;
    }
    .logo-anchor {
        width: 3rem;
    }
    .scroll-wrapper > a:not(.logo-anchor), nav > button {
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