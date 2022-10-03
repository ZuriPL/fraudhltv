<script>
    export let replies = [
        {
            text: 'Repluy 1',
            replies: []
        },
        {
            text: 'reply 2',
            replies: [
                {
                    text: 'another reply',
                    replies: []
                }
            ]
        }
    ]
    // export let replies;
</script>

<div>
    <div>
        {replies[0].text}
    </div>

    {#each replies as reply}
        <svelte:self replies={reply.replies}/>
    {/each}
</div>