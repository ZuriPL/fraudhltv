import supabase from '$lib/supabase';

function formatDate(date) {
	let res =
		date.getDate().toString().padStart(2, '0') +
		'/' +
		(date.getMonth() + 1).toString().padStart(2, '0') +
		'/' +
		date.getFullYear() +
		' - ' +
		date.getHours() +
		':' +
		date.getMinutes().toString().padStart(2, '0');

	return res;
}

export async function load({ params }) {
	let { data } = await supabase.from('users').select().eq('name', params.name).single();

	data.created_at = formatDate(new Date(data?.created_at)).split(' ')[0].replace(/\/+/g, '-');

	let { data: posts } = await supabase
		.from('forum-posts')
		.select('title, text, id')
		.eq('author', data.id)
		.range(0, 4)
		.order('created_at', { ascending: false });

	let { data: comments } = await supabase
		.from('forum-comments')
		.select('text, replies_to ( * ), host_thread ( id, text), created_at')
		.eq('is_deleted', false)
		.eq('author', data.id)
		.range(0, 4)
		.order('created_at', { ascending: false });

	for (let i = 0; i < comments.length; i++) {
		const res = await supabase
			.from('forum-comments')
			.select('id', { count: 'exact', head: true })
			.eq('host_thread', comments[i].host_thread.id)
			.lte('created_at', comments[i].created_at);

		comments[i].num = res.count;
	}

	data.posts = posts;
	data.comments = comments;

	return data;
}
