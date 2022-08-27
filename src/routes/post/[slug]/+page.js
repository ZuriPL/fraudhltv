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

export async function load({ params, fetch }) {
	const { data, error } = await supabase.from('Posts').select().eq('slug', params.slug).single();
	// let res = await fetch(
	// 	`https://fraudhltv.herokuapp.com/api/posts/?filters[slug][$eq]=${params.slug}&populate=*`
	// ); // find by slug

	// let data = await res.json();
	// let news = data.data[0].attributes;

	let news = {
		title: 'test',
		flag: 'WORLD',
		createdAt: '01-01-2022 09:00',
		article: '# hello world',
		author: {
			data: {
				attributes: {
					username: 'zuriii',
					link: 'https://twitter.com/ZuriPOL'
				}
			}
		}
	};

	news = data;

	news.article = marked.parse(news.article);
	news.createdAt = formatDate(new Date(news.created_at));

	return news;
}

export const prerender = true;
