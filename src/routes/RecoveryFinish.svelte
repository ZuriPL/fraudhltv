<svelte:head>
    <title>Change your password</title>
</svelte:head>

<main>

    <form on:submit|preventDefault="{submitHandler}">
        <h1>Change your password</h1>
        <hr>
        <div class="row">
            <label>
                New password
                <input type="password" bind:this="{passwordInput}" autocomplete="new-password" required>
            </label>
            <label>
                Confirm new password
                <input type="password" bind:this="{confirmPasswordInput}" autocomplete="new-password" required>
            </label>
        </div>
        <hr>
        <p class="log" bind:this="{log}"></p>
        <button>Update</button>
    </form>
</main>

<script>
    export let accessToken
    import supabase from '$lib/supabase'

    let passwordInput, confirmPasswordInput
    
    let log

    async function submitHandler(e) {
        if (passwordInput.value !== confirmPasswordInput.value) return log.textContent = "Passwords don't match"
        
        const { error, data } = await supabase.auth.updateUser(accessToken, {
            password: passwordInput.value,
        })
        
        if (error) log.textContent = error.message
        console.log(error)
    }
</script>

<style>
    main {
        color: var(--text-color);
    }
    label {
        min-width: calc(400px - 1.5rem);
        flex-grow: 1;
    }
    input {
        display: block;
        width: 100%;
        background-color: transparent;
        border: 1px solid var(--border-clr);
        font-size: 16px;
        color: var(--text-color);
    }
    button {
        padding: 0.75rem 0;
        width: calc(calc(800px - 4rem) / 3);
        border: none;
        background-color: var(--button-clr);
        color: var(--btn-text-color);
        font-size: 1rem;
        font-weight: 600;
        margin: 0 auto;
        display: block;
    }
    .log {
        margin-top: -0.5rem;
        margin-bottom: 0.5rem;
        color: red;
        font-size: 0.9rem;
        font-weight: 500;
    }
    button:hover {
        background-color: var(--button-hover);
    }
    main {
        width: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        gap: 0.5rem;
    }
    form {
        width: calc(100% - 2rem);
        max-width: 800px;
        background-color: var(--bg-primary);
        padding: 1rem;
    }
    .row {
        display: flex;
        justify-content: stretch;
        gap: 1rem;
        flex-wrap: wrap;
    }
    hr {
        margin: 1.5rem 0;
        border: 1px solid var(--border-clr);
    }
    h1 {
        margin-bottom: 1rem;
        grid-column: span 2;
    }
</style>