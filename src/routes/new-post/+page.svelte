
<main>
    <form on:submit|preventDefault="{handleSubmit}">
        <h1>Make a new post</h1>
        <label>
            Title:
            <input type="text" bind:this="{titleInput}">
        </label>

        <label>
            Write the article
            <textarea cols="100" rows="30" bind:this="{articleInput}"></textarea>
        </label>

        <label>
            Set the country linked to the article
            <select name="flag-picker" id="flag-picker" bind:this="{flagSelect}">
                <option value="PL">Poland</option>
                <option value="DE">Russia</option>
                <option value="FI">Finland</option>
            </select>
        </label>
            
        <label>
            Pick the article image
            <input type="file" name="image-picker" id="image-picker" accept="image/*" bind:this="{imagePicker}">
        </label>

        <button>Post</button>
        <p bind:this="{log}"></p>
    </form>
</main>

<script>
    import supabase from '$lib/supabase'
    import user from '$lib/user'

    let titleInput, articleInput, flagSelect, imagePicker, log

    function slugify(text) {
        let slug = text.toLowerCase()
        slug = slug.replace(/ +/g, '-')
        return slug
    }

    async function handleSubmit() {
        const { data: imageData, error: imageError } = await supabase.storage
            .from('fraudhltv-pictures')
            .upload(`public/${imagePicker.files[0].name}`, imagePicker.files[0])

        if (imageError) return log.textContent = 'An error occured while sending the picture. The post may not have been created'; console.log(imageError);
        
        const { data, error } = await supabase.from('posts').insert([{ 
            title: titleInput.value,
            article: articleInput.value,
            flag: flagSelect.value,
            slug: slugify(titleInput.value),
            author: $user.id,
            image: supabase.storage.from('fraudhltv-pictures').getPublicUrl(imageData.path).publicURL
        }])
        if (error) return log.textContent = 'An error occured while creating the post. The post may not have been created'; console.log(error);
        
        log.textContent = 'Post created succesfully'
    }
</script>

<style>
    p {
        margin-top: 1rem;
    }
    h1 {
        font-size: 2.75rem;
        margin-bottom: 1rem;
    }
    form > * {
        display: block;
    }
    main {
        color: var(--text-color);
    }
    input:not([type="file"]), textarea, select {
        display: block;
        width: 100%;
        background-color: transparent;
        border: 1px solid #435971;
        font-size: 16px;
        color: var(--text-color);
    }
    input[type="file"] {
        display: block;
        font-size: 16px;
        
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
        margin-top: 2rem;
    }
    button:hover, ::file-selector-button:hover {
        background-color: #59728e;
    }
    ::file-selector-button {
        border: none;
        font-size: 1rem;
        color: var(--text-color);
        background-color: #435971;
        padding: 0.5rem 1rem;
        margin-right: 0.75rem;
    }
    main {
        width: 100%;
        display: flex;
        justify-content: center;
    }
    form {
        width: 800px;
        background-color: #2d3844;
        padding: 1rem;
    }
    textarea {
        resize: none;
    }
    select {
        width: 100%;
        background-color: transparent;
        color: var(--text-color);
    }
    option {
        color: black;
    }
    label {
        margin-bottom: 0.5rem;
    }
</style>