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

let news = [
	{
		title: 'Test11',
		flag: 'PL',
		article: marked.parse(
			`Degster: "When people make jokes about me I take it personally.”\n\n![Image](https://pbs.twimg.com/media/FahX7ylXwAEaqFT?format=jpg&name=large)\n\n“My friend kept saying that I get no women. He had no clue I had date plans with his mother for that very evening.”\n\nIt’s been reported that degster also has date plans with the mother of fellow CS pro, Hades.`
		),
		writer: {
			name: 'zuriii',
			link: 'https://twitter.com/ZuriPOL'
		},
		date: formatDate(new Date('August 19, 1975 23:15')),
		link: '/post/0',
		image:
			'https://img-cdn.hltv.org/gallerypicture/VRt95V-yzaFsJhYUxqw1F8.png?ixlib=java-2.1.0&w=500&s=5642cb822ca66ea684c080f1f946e6d0'
	},
	{
		title: 'Test22',
		flag: 'EU',
		article: marked.parse(
			`Degster: "When people make jokes about me I take it personally.”\n\n![Image](https://pbs.twimg.com/media/FahX7ylXwAEaqFT?format=jpg&name=large)\n\n“My friend kept saying that I get no women. He had no clue I had date plans with his mother for that very evening.”\n\nIt’s been reported that degster also has date plans with the mother of fellow CS pro, Hades.`
		),
		writer: {
			name: 'zuriii',
			link: 'https://twitter.com/ZuriPOL'
		},
		date: formatDate(new Date('August 19, 1975 23:15')),
		link: '/post/1',
		image:
			'https://img-cdn.hltv.org/gallerypicture/J--URvt7Fis8tk1jUS4XaD.png?ixlib=java-2.1.0&w=500&s=88fefdf4d9cfebffcc2019f04f674fab'
	},
	{
		title: 'Test33',
		flag: 'CIS',
		article: marked.parse(
			`Degster: "When people make jokes about me I take it personally.”\n\n![Image](https://pbs.twimg.com/media/FahX7ylXwAEaqFT?format=jpg&name=large)\n\n“My friend kept saying that I get no women. He had no clue I had date plans with his mother for that very evening.”\n\nIt’s been reported that degster also has date plans with the mother of fellow CS pro, Hades.`
		),
		writer: {
			name: 'zuriii',
			link: 'https://twitter.com/ZuriPOL'
		},
		date: formatDate(new Date('August 19, 1975 23:15')),
		link: '/post/2',
		image: 'https://pbs.twimg.com/media/FahX7ylXwAEaqFT?format=jpg&name=large'
	}
];

export function load({ params }) {
	return news[params.id];
}
