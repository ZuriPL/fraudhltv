export async function load() {
	let teams = [8780830];
	let teamsMatches = [];
	teams.forEach((team) => {
		let res = await fetch(`https://play.esea.net/api/teams/${team}/matches?page_size=50`);
		let data = await res.json();
		teamsMatches.push(data.data);
	});

	return teamsMatches;
}
