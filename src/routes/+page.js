import timeAgo from '$lib/timeAgo';
import supabase from '$lib/supabase';

export async function load({ fetch }) {
	const { data, error } = await supabase.from('Posts').select();
	// let res = await fetch(`https://fraudhltv.herokuapp.com/api/posts?populate=*`);
	// let data = await res.json();
	// let news = data.data;
	// let news = [
	// 	{
	// 		id: 1,
	// 		attributes: {
	// 			title: 'test',
	// 			flag: 'WORLD',
	// 			createdAt: new Date().toString(),
	// 			article: '# hello world',
	// 			slug: 'test',
	// 			image: {
	// 				data: {
	// 					attributes: {
	// 						url: '/'
	// 					}
	// 				}
	// 			}
	// 		}
	// 	},
	// 	{
	// 		id: 2,
	// 		attributes: {
	// 			title: 'test',
	// 			flag: 'WORLD',
	// 			createdAt: new Date('2022-02-02').toString(),
	// 			article: '# hello world',
	// 			slug: 'test',
	// 			image: {
	// 				data: {
	// 					attributes: {
	// 						url: '/'
	// 					}
	// 				}
	// 			}
	// 		}
	// 	}
	// ];

	let news = data;

	news.forEach((el) => {
		el.timeAgo = timeAgo(new Date(el.created_at));
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
