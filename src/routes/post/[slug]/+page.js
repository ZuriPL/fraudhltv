import { marked } from 'marked';
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
	// asign data to news
	const { data: news } = await supabase
		.from('Posts')
		.select(`title, article, created_at, image, author ( name, link)`) // perform a `join`
		.eq('slug', params.slug) // select the article based on the slug
		.single();

	news.article = marked.parse(news.article);
	news.createdAt = formatDate(new Date(news.created_at));

	return news;
}

export const prerender = true;
