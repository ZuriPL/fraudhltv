<svelte:head>
    <title>Sign up for FraudHLTV</title>
</svelte:head>

<main>
    <form on:submit|preventDefault="{submitHandler}">
        <h1>Create an account</h1>
        <hr>
        <div class="grid">
            <div>
                <label for="name" class="input-label">Username</label>
                <input maxlength="40" bind:this="{nameInput}" type="text" name="name" id="name" autocomplete="nickname" required>
            </div>
            <div>
                <label for="email" class="input-label">Email</label>
                <input bind:this="{emailInput}" type="email" name="email" id="email" autocomplete="email" required>
            </div>
            <div>
                <label for="password" class="input-label">Password</label>
                <input bind:this="{passwordInput}" type="password" name="password" id="password" autocomplete="current-password" required>
            </div>
            <div>
                <label for="confirm-password" class="input-label">Confirm password</label>
                <input bind:this="{confirmPasswordInput}" type="password" name="confirm-password" id="confirm-password" autocomplete="current-password" required>
            </div>
        </div>
        <hr>
        <div class="grid2">
            <label class="textarea-label">
                Write your bio
                <textarea name="bio" cols="30" bind:this="{bioInput}"></textarea>
            </label>
            <label class="select-label">
                Choose your country
                <select name="flag" bind:this="{countrySelect}" required>
                    <option value="">--- Please choose an option ---</option>
                    {#each countryList as country}        
                        <option value="{country.code}">{country.name}</option>
                    {/each}
                </select>
            </label>
            <label class="select-label">
                Choose your favourite player
                <select name="player" bind:this="{playerSelect}" required>
                    <option value="">--- Please choose an option ---</option>
                    {#each countryList as country}        
                        <option value="{country.code}">{country.name}</option>
                    {/each}
                </select>
            </label>
            <label class="select-label">
                Choose your favourite team
                <select name="team" bind:this="{teamSelect}" required>
                    <option value="">--- Please choose an option ---</option>
                    {#each countryList as country}        
                        <option value="{country.code}">{country.name}</option>
                    {/each}
                </select>
            </label>
        </div>
        <hr>
        <button>Sign up</button>
    </form>
    <a href="/signin">Have an account? Sign in here</a>
</main>

<script>
    import supabase from '$lib/supabase'
    import { goto } from '$app/navigation'
    import { onMount } from 'svelte'

    let emailInput, passwordInput, nameInput, confirmPasswordInput, bioInput, playerSelect, teamSelect, countrySelect

    async function submitHandler(e) {
        if (passwordInput.value !== confirmPasswordInput.value) return;

        let { data: { user }, error} = await supabase.auth.signUp({
            email: emailInput.value,
            password: passwordInput.value,
            options: {
                data: {
                    name: nameInput.value,
                    role: 'regular',
                    bio: bioInput.value,
                    player: playerSelect.value,
                    team: teamSelect.value,
                    flag: countrySelect.value
                }
            }
        })

        if (user) return await goto('/')
        
        console.log(error)
    }

    let countryList = []

    onMount(async () => {
        const res = await fetch('https://restcountries.com/v3.1/all');
        const data = await res.json();

        countryList = data.map((country) => {
                return {
                    name: country.name.common,
                    code: country.cca2
                }
            });
        countryList.sort((a, b) => {
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });
    });
</script>

<style>
    main {
        color: var(--text-color);
    }
    input, textarea, select {
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
        background-color: #435971;
        color: var(--text-color);
        font-size: 1rem;
        font-weight: 600;
        margin: 0 auto;
        display: block;
    }
    button:hover {
        background-color: #59728e;
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
        background-color: #2d3844;
        padding: 1rem;
    }
    .grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
    }
    .grid2 {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(3, 1fr);
        gap: 1rem;
    }
    .textarea-label {
        grid-row: 1 / span 3;
        grid-column: 1 / span 2;
        width: 100%;
        height: 100%;
    }
    textarea {
        width: 100%;
        height: 100%;
        resize: none;
    }
    .grid2 > .select-label {
        grid-column: 3 / span 1;
    }
    option {
        color: black;
    }
    .grid label {
        margin-bottom: 0.25rem;
        display: block;
    }
    .grid2 label {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }
    hr {
        margin: 1.5rem 0;
        border: 1px solid #495867;
    }
    h1 {
        margin-bottom: 1rem;
        grid-column: span 2;
    }
</style>