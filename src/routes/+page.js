import timeAgo from '$lib/timeAgo';
import supabase from '$lib/supabase';

export async function load() {
	const { data: news } = await supabase.from('posts').select();

	news.forEach((el) => {
		el.timeAgo = timeAgo(el.created_at);
	});

	const date = new Date();

	let newsToday = news
		.filter(
			(el) =>
				new Date(el.created_at).getFullYear() === date.getFullYear() &&
				new Date(el.created_at).getMonth() === date.getMonth() &&
				new Date(el.created_at).getDate() === date.getDate()
		)
		.reverse();

	let otherNews = news
		.filter(
			(el) =>
				new Date(el.created_at).getFullYear() !== date.getFullYear() ||
				new Date(el.created_at).getMonth() !== date.getMonth() ||
				new Date(el.created_at).getDate() !== date.getDate()
		)
		.slice(0, 10)
		.reverse();

	return { newsToday, otherNews };
}
