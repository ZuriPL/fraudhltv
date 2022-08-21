
<script>
    import NavBar from './NavBar.svelte'
</script>

<NavBar/>
<slot></slot>
<style>
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800&display=swap');

    :global(*) {
        margin: 0;
        font-family: 'Open Sans', sans-serif;
    }
    :global(body) {
        background-color: #1b1f23;
        color: white;
    }
    :global(.hidden) {
        display: none;
    }
    :root {
        --text-color: #929a9e;
    }
</style>