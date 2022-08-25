
<script>
    import NavBar from './NavBar.svelte'

    import { afterNavigate } from "$app/navigation";
    afterNavigate(_ => {
        document.body.classList.add('show-carousel')
    })
</script>

<svelte:window on:DOMContentLoaded="{_ => document.body.classList.add('show-carousel')}"/>

<NavBar/>
<slot></slot>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800&display=swap');

    :global(*) {
        margin: 0;
        font-family: 'Open Sans', sans-serif;
        box-sizing: border-box;
    }
    :global(a) {
        text-decoration: none;
        color: var(--link-color);
        font-weight: 600;
    }
    :global(body) {
        background-color: #1b1f23;
        color: white;
    }
    :global(.hidden) {
        display: none;
    }
    :root {
        --text-color: #b9bdbf;
        --link-color: #87a3bf;
    }
</style>