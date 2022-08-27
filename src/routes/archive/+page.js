import timeAgo from '$lib/timeAgo';

export async function load({ fetch }) {
	// let res = await fetch(`https://fraudhltv.herokuapp.com/api/posts?populate=*`);
	// let data = await res.json();
	// let news = data.data;

	let news = [
		{
			id: 1,
			attributes: {
				title: 'test',
				flag: 'WORLD',
				createdAt: '01-01-2022 09:00',
				article: '# hello world'
			}
		}
	];

	news.forEach((el) => {
		el.attributes.timeAgo = timeAgo(new Date(el.attributes.createdAt));
	});

	return { news };
}
