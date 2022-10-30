import timeAgo from '$lib/timeAgo';
import supabase from '$lib/supabase';

export async function load() {
	const { data: news } = await supabase
		.from('posts')
		.select(`title, slug, flag, created_at`)
		.order('created_at', { ascending: false });

	news.forEach((el) => {
		el.timeAgo = timeAgo(el.created_at);
	});

	return { news };
}
