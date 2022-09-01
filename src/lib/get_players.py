from liquipediapy import counterstrike
import json

counterstrike_obj = counterstrike("appname")

players = counterstrike_obj.get_players()

json_object = json.dumps(players, indent=4)
 
with open("players.json", "w") as outfile:
    outfile.write(json_object)