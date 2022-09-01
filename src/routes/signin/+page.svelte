<svelte:head>
    <title>Sign up for FraudHLTV</title>
</svelte:head>

<main>
    {#if $user}
        <GoHome msg="You're already logged in" />
    {:else}
        <form on:submit|preventDefault="{submitHandler}">
            <h1>Log in</h1>
            <div class="row">
                <label>
                    Email
                    <input type="email" bind:this="{emailInput}" autocomplete="email" id="email" name="email" required>
                </label>
                <label>
                    Password
                    <input type="password" bind:this="{passwordInput}" autocomplete="current-password" name="password" id="password" required>
                </label>
            </div>
            <button>Log in</button>
        </form>
        <a href="/signup">No account? Create one here</a>
    {/if}
</main>

<script>
    import GoHome from '$lib/gohome.svelte'
    import supabase from '$lib/supabase'
    import { goto } from '$app/navigation'
    import user from '$lib/user'

    let emailInput, passwordInput

    async function submitHandler() {
        let { data: { user }, error } = await supabase.auth.signInWithPassword({
            email: emailInput.value,
            password: passwordInput.value,
        })

        if (user) return goto('/')

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
        color: var(--text-color);
        font-size: 16px;
    }
    .row {
        display: flex;
        justify-content: stretch;
        gap: 1rem;
        flex-wrap: wrap;
    }
    button {
        padding: 0.75rem 0;
        width: calc(calc(800px - 4rem) / 3);
        border: none;
        background-color: var(--button-clr);
        color: var(--btn-text-color);
        font-size: 1rem;
        font-weight: 600;
        margin: 1rem auto 0 auto;
        display: block;
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
        max-width: 800px;
        width: calc(100% - 2rem);
        background-color: var(--bg-primary);
        padding: 1rem;
    }
    h1 {
        margin-bottom: 1rem;
        color: var(--header-color);
        grid-column: span 2;
    }
</style>