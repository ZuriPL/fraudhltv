import fs from 'fs';

let res = await fetch(
	'https://liquipedia.net/counterstrike/api.php?action=query&format=json&prop=links&list=&meta=&continue=&titles=Portal%3ATeams&pllimit=max'
);
let data = await res.json();

let teams1 = data.query.pages['12078'].links;

res = await fetch(
	'https://liquipedia.net/counterstrike/api.php?action=query&format=json&prop=links&list=&titles=Portal%3ATeams&pllimit=max&plcontinue=12078%7C0%7CSpirit_of_Amiga'
);
data = await res.json();

let teams2 = data.query.pages['12078'].links;

teams2 = teams2.filter((link) => link.ns == 0);

const teams = teams1.map((team) => team.title).concat(teams2.map((team) => team.title));

fs.writeFileSync('teams.json', JSON.stringify(teams));

console.log(JSON.stringify(teams));
