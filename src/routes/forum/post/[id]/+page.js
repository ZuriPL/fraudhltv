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
	let toDelete = [];

	function scan(id = null) {
		const arr = comments.filter((el) => el.replies_to === id);
		let res = [];

		arr.forEach((el) => {
			res.push(scan(el.id));
			if (el.is_deleted && !res.includes(false)) toDelete.push(el.id);
			res = [];
		});

		if (!res.includes(false) && arr.filter((el) => !el.is_deleted).length === 0) return true;

		return false;
	}

	const { data } = await supabase
		.from('forum-posts')
		.select('*, author ( id, name, player, team, flag )')
		.eq('id', params.id)
		.single();

	data.created_at = formatDate(new Date(data.created_at));

	let { data: comments } = await supabase
		.from('forum-comments')
		.select('*, author ( id, name, player, team, flag )')
		.eq('host_thread', data.id)
		.order('created_at', { ascending: true });

	let n = 1;
	comments.forEach((comment) => {
		comment.num = n;
		n++;
	});

	comments.forEach((el) => {
		el.created_at = formatDate(new Date(el.created_at));
	});

	scan();
	comments = comments.filter((el) => !toDelete.includes(el.id));

	return { data, comments };
}
