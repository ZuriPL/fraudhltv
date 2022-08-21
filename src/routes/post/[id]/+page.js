import { marked } from 'marked';

function formatDate(date) {
	let res =
		date.getDate() +
		'/' +
		(date.getMonth() + 1) +
		'/' +
		date.getFullYear() +
		' - ' +
		date.getHours() +
		':' +
		date.getMinutes();

	return res;
}

export function load({ params }) {
	return {
		title: 'Degster: “When people make jokes about me I take it personally.”',
		article: marked.parse(
			`Degster: "When people make jokes about me I take it personally.”\n\n![Image](https://pbs.twimg.com/media/FahX7ylXwAEaqFT?format=jpg&name=large)\n\n“My friend kept saying that I get no women. He had no clue I had date plans with his mother for that very evening.”\n\nIt’s been reported that degster also has date plans with the mother of fellow CS pro, Hades.`
		),
		articleInfo: formatDate(new Date('August 19, 1975 23:15')),
		writer: {
			name: 'zuriii',
			link: 'https://twitter.com/ZuriPOL'
		}
	};
}
