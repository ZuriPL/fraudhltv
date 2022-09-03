import fs from 'fs';

let players = fs.readFileSync('./players.json');

players = JSON.parse(players.toString());

players = players.map((player) => player.id);

fs.writeFileSync('players.json', JSON.stringify(players));
