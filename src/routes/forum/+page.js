import supabase from '$lib/supabase';

export async function load({ url }) {
	console.log();

	const { data, error } = await supabase
		.from('forum-posts')
		.select('*, author ( name )')
		.range(url.searchParams.get('page') ?? 0, (url.searchParams.get('page') ?? 0) + 9)
		.order('created_at', { ascending: false });

	const length = (await supabase.from('forum-posts').select('id', { count: 'exact', head: true }))
		.count;

	return { data, length };
}
