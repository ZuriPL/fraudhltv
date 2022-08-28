<form on:submit|preventDefault="{loginHandle}">
    <input bind:this="{emailInput}" placeholder="email" type="email" name="email" id="email" autocomplete="email">
    <input bind:this="{passwordInput}" placeholder="password" type="password" name="password" id="password" autocomplete="current-password">
    <button>Login</button>
</form>

<script>
    import supabase from '$lib/supabase'

    let emailInput, passwordInput

    async function loginHandle() {
        await supabase.auth.signInWithPassword({
            email: emailInput.value,
            password: passwordInput.value,
        })
    }
</script>