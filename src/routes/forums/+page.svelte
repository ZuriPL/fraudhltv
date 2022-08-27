<svelte:head>
    <title>CS:GO Tier 50 Forums</title>
</svelte:head>

<script>
    import supabase from '$lib/supabase'

    async function main() {
        const { data, error } = await supabase.from('Posts').insert([
            {
				title: 'test',
				flag: 'WORLD',
				created_at: new Date(),
				article: '# hello world',
				slug: 'test',
				image: '/'
            }
        ])

        console.log(data)
        console.log(error)
    }
    main()
</script>