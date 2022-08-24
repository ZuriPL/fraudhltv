import timeAgo from '$lib/timeAgo';

export async function load({ fetch }) {
	let res = await fetch(`http://127.0.0.1:1337/api/posts?populate=*`);
	let data = await res.json();
	let news = data.data;

	news.forEach((el) => {
		el.attributes.timeAgo = timeAgo(new Date(el.attributes.createdAt));
	});

	const date = new Date();

	let newsToday = news
		.filter(
			(el) =>
				new Date(el.attributes.createdAt).getFullYear() === date.getFullYear() &&
				new Date(el.attributes.createdAt).getMonth() === date.getMonth() &&
				new Date(el.attributes.createdAt).getDate() === date.getDate()
		)
		.reverse();

	let otherNews = news
		.filter(
			(el) =>
				new Date(el.attributes.createdAt).getFullYear() !== date.getFullYear() ||
				new Date(el.attributes.createdAt).getMonth() !== date.getMonth() ||
				new Date(el.attributes.createdAt).getDate() !== date.getDate()
		)
		.slice(0, 10)
		.reverse();

	return { newsToday, otherNews };
}
