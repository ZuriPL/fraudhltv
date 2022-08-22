export async function load({ params, fetch }) {
	let res = await fetch(`http://127.0.0.1:1337/api/posts/${params.id}?populate=*`);
	let data = await res.json();
	let news = data.data.attributes;
	return news;
}
