import supabase from '$lib/supabase';

export async function load({ params }) {
	let { data } = await supabase.from('users').select().eq('name', params.name).single();
	return data;
}
