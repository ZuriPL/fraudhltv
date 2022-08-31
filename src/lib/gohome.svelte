<script>
    export let msg
</script>

<div>
    <h1>{msg}</h1>
    <a href="/">Go home</a>
</div>

<style>
    h1 {
        font-size: 2.25rem;
    }
    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: var(--text-color);
        width: calc(100% - 2rem);
        max-width: 800px;
        background-color: #2d3844;
        padding: 1rem;
        margin: 1rem auto;
    }
    a {
        margin-top: 0.5rem;
    }
</style>