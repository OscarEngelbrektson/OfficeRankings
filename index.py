import sys

from db import get_game_outcomes, write_player_ratings, get_player_ratings
from player_ratings import calculate_player_ratings

from tiny_router import TinyLambdaRouter

app = TinyLambdaRouter()

HEADERS = {
    'Access-Control-Allow-Origin' : '*', 
    'Access-Control-Allow-Credentials' : True
}

@app.route('/')
def index(ev, cxt, kwargs):
    return 'welcome to the index page!! <3'

@app.route('/ratings', methods=['GET'])
def get_ratings(ev, cxt, kwargs):
    player_ratings = get_player_ratings()

    return player_ratings.to_json()

@app.route('/update_ratings')
# @app.route('/update', methods=['POST'])
def update_ratings(ev, cxt, kwargs):
    game_outcomes = get_game_outcomes()
    player_ratings = calculate_player_ratings(game_outcomes)
    write_player_ratings(player_ratings)

    return player_ratings.to_json()

def lambda_handler(event, context):
    try:
        return {
        'statusCode': 200,
        'body': app.run(event, context),
        'headers': HEADERS
    }
    
    except Exception as e:
      return {
        'statusCode': 500,
        'body': sys.exc_info()
    }