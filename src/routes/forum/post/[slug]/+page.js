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
	const { data, error } = await supabase
		.from('forum-posts')
		.select('*, author ( name )')
		.eq('slug', params.slug)
		.single();

	data.created_at = formatDate(new Date(data.created_at));

	const { data: comments } = await supabase
		.from('forum-comments')
		.select()
		.eq('host_thread', data.id);

	return { data, comments };
}
