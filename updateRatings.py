import json

from db import get_game_outcomes, write_player_ratings
from player_ratings import calculate_player_ratings

def lambda_handler(event, context):
    game_outcomes = get_game_outcomes()
    
    print(game_outcomes)

    player_ratings = calculate_player_ratings(game_outcomes)

    print(player_ratings)

    write_player_ratings(player_ratings)

    # TODO implement
    return {
        'statusCode': 200,
        'body': player_ratings.to_json()
    }


lambda_handler(0,0)
