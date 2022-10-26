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

export async function load() {
	const { data, error } = await supabase
		.from('ranking')
		.select('*')
		.order('id', { ascending: true });

	for (let i = 0; i < data.length; i++) {
		let players = [];
		for (let j = 0; j < data[i].players.length; j++) {
			players.push({
				name: data[i].players[j],
				img: data[i].players_img[j],
				nat: data[i].players_nat[j]
			});
		}
		data[i].players = players;
		delete data[i].players_nat;
		delete data[i].players_img;
	}
	console.log(data);

	const update = formatDate(new Date(data[0].timestamp));

	return { data, update };
}
