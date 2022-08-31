
<script>
    import NavBar from './NavBar.svelte'
    import { afterNavigate } from "$app/navigation";
    import supabase from '$lib/supabase'
    import user from '$lib/user'
    import { onMount } from 'svelte'

    afterNavigate(_ => {
        document.body.classList.add('show-carousel')
    })

    onMount(() => {
        supabase.auth.getSession().then(async ({ data }) => {
            $user = (await supabase.from('users').select().eq('user_id', data?.session?.user?.id)?.single())?.data
        })
        
        supabase.auth.onAuthStateChange(async (event, session) => {
            $user = (await supabase.from('users').select().eq('user_id', session?.user?.id)?.single())?.data
        })
    })
</script>

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
        background-color: var(--bg-secondary);
        color: var(--text-color);
        overflow-x: hidden;
    }
    :global(.hidden) {
        display: none;
    }
    :root {
        --text-color-dark: #b9bdbf;
        --link-color-dark: #87a3bf;
        --bg-secondary-dark: #1b1f23;
        --bg-primary-dark: #2d3844;
        --bg-hover-dark: #45515f;
        --border-clr-dark: #838a92;
        --button-clr-dark: #435971;
        --button-hover-dark: #59728e;

        --button-clr: var(--button-clr-dark);
        --button-hover: var(--button-hover-dark);
        --text-color: var(--text-color-dark);
        --link-color: var(--link-color-dark); 
        --bg-secondary: var(--bg-secondary-dark); 
        --bg-primary: var(--bg-primary-dark); 
        --bg-hover: var(--bg-hover-dark); 
        --border-clr: var(--border-clr-dark);
    }
</style>