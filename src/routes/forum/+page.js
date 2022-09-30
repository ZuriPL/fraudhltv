import supabase from '$lib/supabase';

export async function load() {
	const { data, error } = await supabase.from('forum-posts').select('*, author ( name )');

	return { data };
}
