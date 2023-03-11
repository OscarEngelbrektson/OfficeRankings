import pandas as pd

from db import get_game_outcomes
from index import get_ratings

#print(get_game_outcomes())

print(get_ratings_and_commentary(0,0,0))




# from player_ratings import calculate_player_ratings

# game_outcomes = pd.read_json('''
#     {"Timestamp":{"0":"3\/7\/2023 14:27:50","1":"3\/7\/2023 18:12:09","2":"3\/8\/2023 14:40:04","3":"3\/8\/2023 14:40:15","4":"3\/8\/2023 14:42:44","5":"3\/7\/2023 14:27:50","6":"3\/7\/2023 14:27:50","7":"3\/7\/2023 14:27:50","8":"3\/7\/2023 14:27:50","9":"3\/7\/2023 14:27:50","10":"3\/7\/2023 14:27:50"},"Winner":{"0":"John","1":"John","2":"John","3":"John","4":"John","5":"Oscar","6":"John","7":"Oscar","8":"John","9":"Oscar","10":"John"},"Honorable opponent":{"0":"Oscar","1":"Oscar","2":"Oskar Christiansen","3":"Oskar Christiansen","4":"Oscar","5":"John","6":"Oscar","7":"John","8":"Oscar","9":"John","10":"Oscar"},"Game":{"0":"Ping pong","1":"Ping pong","2":"Chess","3":"Ping pong","4":"Ping pong","5":"Ping pong","6":"Ping pong","7":"Ping pong","8":"Chess","9":"Chess","10":"Chess"}}
# ''')

# game_outcomes = game_outcomes[game_outcomes.Game == 'Chess']

# for i in range(1,10):
#     game_outcomes = game_outcomes.append(game_outcomes.iloc[0])


# ratings = calculate_player_ratings(game_outcomes)