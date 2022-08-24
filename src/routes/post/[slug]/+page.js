import { marked } from 'marked';
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
	let res = await fetch(
		`https://fraudhltv.herokuapp.com/api/posts/?filters[slug][$eq]=${params.slug}&populate=*`
	); // find by slug

	let data = await res.json();
	let news = data.data[0].attributes;

	news.article = marked.parse(news.article);
	news.createdAt = formatDate(new Date(news.createdAt));

	return news;
}

export const prerender = true;
