<script>
    import user from '$lib/user'
    export let data
</script>

<main>
    <div class="flex first">
        <img src="https://flagcdn.com/w320/{data?.flag.toLowerCase()}.png" alt="{data?.flag} flag">
        <h2>{data?.name}</h2>
        {#if $user?.name == data?.name}
            <a href="/edit-profile" class="edit">Edit profile</a>
        {/if}
    </div>
    <div class="tags flex">
        <p>ID: {data?.id}</p>
        <p>Joined: {data?.created_at}</p>
        {#if $user?.role !== 'regular'}
            <p style="text-transform: capitalize;">{data?.role}</p>
        {/if}
        {#if data.player}
            <p class="flex">
                <svg style="width:auto;height:0.9rem;" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
                </svg>
                {data?.player}
            </p>
        {/if}
        {#if data.team}
            <p>
                <svg style="width:auto;height:0.9rem;" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
                </svg>
                {data?.team}
            </p>
        {/if}

    </div>
    <p class="label">Bio: </p>
    <p class="bio">{data?.bio}</p>
</main>

<style>
    main {
        background-color: var(--bg-primary);
        width: calc(100% - 2rem);
        max-width: 800px;
        margin: 0 auto;
        padding: 1rem;
    }
    .tags > p, .edit {
        background-color: var(--bg-header);
        border-radius: 100px;
        padding: 0.25rem 0.75rem;
        font-size: 0.9rem;
        box-shadow: var(--list-shadow);
    }
    img {
        height: 1.5rem;
        aspect-ratio: 3/2;
        outline: 1px solid black;
    }
    .flex {
        display: flex;
        align-items: center;
        gap: 0.25rem;
    }
    .tags.flex {
        gap: 0.75rem;
        flex-wrap: wrap;
        margin-bottom: 1.5rem;
    }
    h2 {
        font-size: 1.5rem;
    }
    .first {
        margin-bottom: 1rem;
        gap: 0.5rem;
    }
    .label {
        font-weight: 700;
        margin-bottom: 0.25rem;
    }
    .bio {
        background-color: var(--bg-header);
        box-shadow: var(--list-shadow);
        padding: 0.75rem;
    }
    .edit {
        border: none;
        margin-left: auto;
        background-color: var(--button-clr);
        color: var(--btn-text-color);
    }
    .edit:hover {
        background-color: var(--button-hover);
    }
</style>