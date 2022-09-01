<script>
    export let data
    console.log(data)
</script>

<h2>Testing</h2>
<p>Name: {data?.name}</p>
<p>Joined: {data?.created_at}</p>
<p>Role: {data?.role}</p>
<p>Flag: {data?.flag}</p>
<p>Fav player: {data?.player}</p>
<p>Fav team: {data?.team}</p>
<p>Bio: {data?.bio}</p>
