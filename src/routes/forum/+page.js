import supabase from '$lib/supabase';

export async function load({ url }) {
	const { data } = await supabase
		.from('forum-posts')
		.select('*, author ( name )')
		.range(url.searchParams.get('num') ?? 0, (url.searchParams.get('num') ?? 0) + 9)
		.order('created_at', { ascending: false });

	const length = (await supabase.from('forum-posts').select('id', { count: 'exact', head: true }))
		.count;

	return { data, length };
}
