<script>
    // export let replies = [
    //     {
    //         text: 'Repluy 1',
    //         replies: []
    //     },
    //     {
    //         text: 'reply 2',
    //         replies: [
    //             {
    //                 text: 'another reply',
    //                 replies: []
    //             }
    //         ]
    //     }
    // ]

    let data = [
        {
            text: '1',
            id: 1,
            replies_to: 0,
        },
        {
            text: '2',
            id: 2,
            replies_to: 0
        },
        {
            text: 'reply',
            id: 3,
            replies_to: 1
        },
        {
            text: 'next',
            id: 4,
            replies_to: 3
        }
    ]

    const checkId = (id => {
        return (el) => {
            return el.id === id
        }
    })

    let replies = data.filter(checkId(0))
    console.log(replies) 
    console.log(checkId(0)) 
</script>

<style>
    .block {
        margin: 1rem;
        background-color: red;
        margin-left: 3rem;
    }
    .outer {
        background-color: blue;
    }
</style>

<div class="outer">
    {#each replies as reply}
        <div class="block">
            {reply.text}

            <svelte:self replies={reply.replies}/>
        </div>
    {/each}
</div>