import timeAgo from '$lib/timeAgo';
import supabase from '$lib/supabase';

export async function load() {
	const { data: news } = await supabase.from('osts').select(`title, slug, flag, created_at`);

	news.forEach((el) => {
		el.timeAgo = timeAgo(el.created_at);
	});
	// console.log(news);

	return { news };
}
