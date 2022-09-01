import fs from 'fs';

let res = await fetch(
	'https://liquipedia.net/counterstrike/api.php?action=query&format=json&prop=links&list=&meta=&continue=&titles=Portal%3ATeams&pllimit=max'
);
let data = await res.json();

let teams = data.query.pages['12078'].links;

teams = teams.map((team) => team.title);

fs.writeFileSync('teams.json', JSON.stringify(teams));

console.log(JSON.stringify(teams));
