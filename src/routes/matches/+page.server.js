export async function load({}) {
	let teams = [8780830, 8779256, 8783012];
	let teamsMatches = [];

	for (let i = 0; i < teams.length; i++) {
		let res = await fetch(`https://play.esea.net/api/teams/${teams[i]}/matches?page_size=50`);
		let data = await res.json();
		teamsMatches = teamsMatches.concat(
			data.data
				.filter((match) => match.id)
				.map((match) => {
					if (match.map.id) match.map = match.map.id;
					return match;
				})
		);
	}

	return { data: teamsMatches };
}
