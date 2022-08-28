<main>
    <form on:submit|preventDefault="{loginHandle}">
        <h1>Create an account</h1>
        <div class="grid">
            <div>
                <label for="name">Username</label>
                <input bind:this="{nameInput}" type="text" name="name" id="name" autocomplete="nickname">
            </div>
            <div>
                <label for="email">Email</label>
                <input bind:this="{emailInput}" type="email" name="email" id="email" autocomplete="email">
            </div>
            <div>
                <label for="password">Password</label>
                <input bind:this="{passwordInput}" type="password" name="password" id="password" autocomplete="current-password">
            </div>
            <div>
                <label for="confirm-password">Confirm password</label>
                <input bind:this="{confirmPasswordInput}" type="password" name="confirm-password" id="confirm-password" autocomplete="current-password">
            </div>
        </div>
        <hr>
        <div class="row">
            <label for="flag">
                Choose your country
                <select name="flag" id="flag">
                    <option value="">123</option>
                    <option value="">123</option>
                    <option value="">123</option>
                </select>
            </label>
            <label for="player">
                Choose your favourite player
                <select name="player" id="player">
                    <option value="">123</option>
                    <option value="">123</option>
                    <option value="">123</option>
                </select>
            </label>
            <label for="team">
                Choose your favourite team
                <select name="team" id="team">
                    <option value="">123</option>
                    <option value="">123</option>
                    <option value="">123</option>
                </select>
            </label>
        </div>
        <button>Sign up</button>
    </form>
</main>

<script>
    import supabase from '$lib/supabase'
    import { goto } from '$app/navigation'

    let emailInput, passwordInput, nameInput, confirmPasswordInput

    async function loginHandle() {
        if (passwordInput.value !== confirmPasswordInput.value) return;

        let { user, error } = await supabase.auth.signUp({
            email: emailInput.value,
            password: passwordInput.value,
            options: {
                data: {
                    name: nameInput.value,
                    role: 'regular',
                    link: ''
                }
            }
        })

        if (user) return goto('/')

        console.log(error)
    }
</script>

<style>
    input {
        display: block;
        width: 100%;
        background-color: transparent;
        border: 1px solid #495867;
        font-size: 16px;
        color: var(--text-color);
    }
    button {
        padding: 0.75rem 4rem;
        border: none;
        background-color: #435971;
        color: var(--text-color);
        font-size: 1rem;
        font-weight: 600;
        grid-column: 1 / span 2;
        margin-top: 1.5rem;
    }
    main {
        width: 100%;
        display: flex;
        justify-content: center;
    }
    form {
        width: 800px;
        background-color: #2d3844;
        margin-top: 2rem;
        padding: 16px;
    }
    .grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
    }
    .row {
        display: flex;
        align-items: center;
        justify-content: stretch;
        gap: 1rem;
    }
    select {
        width: 100%;
    }
    .grid label {
        margin-bottom: 0.25rem;
        display: block;
    }
    .row label {
        width: 100%;
    }
    hr {
        margin: 1.5rem 0;
    }
    h1 {
        margin-bottom: 1rem;
        grid-column: span 2;
    }
</style>