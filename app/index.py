import sys
import json

from commentary import generate_commentary, generate_title
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

@app.route('/test')
def index(ev, cxt, kwargs):
    return json.dumps({'test': 2})

@app.route('/test2')
def index(ev, cxt, kwargs):
    return {'test': 2}

@app.route('/ratings', methods=['GET'])
def get_ratings(ev, cxt, kwargs):
    player_ratings = get_player_ratings()
    return player_ratings.to_json()

@app.route('/ratings_and_commentary', methods=['GET'])
def get_ratings_and_commentary(ev, cxt, kwargs):
    player_ratings = get_player_ratings()

    game_outcomes = get_game_outcomes()
   
    commentary = generate_commentary(game_outcomes)
    
    return json.dumps({
        "ratings": json.loads(player_ratings.to_json()),
        "commentary": commentary,
        "title": generate_title()
    })

@app.route('/update_ratings')
# @app.route('/update', methods=['POST'])
def update_ratings(ev, cxt, kwargs):
    game_outcomes = get_game_outcomes()
    player_ratings = calculate_player_ratings(game_outcomes)
    write_player_ratings(player_ratings)

    return player_ratings.to_json()

@app.route('/outcomes', methods=['GET'])
def get_outcomes(ev, cxt, kwargs):
    game_outcomes = get_game_outcomes()

    print(game_outcomes)

    return game_outcomes.to_json()

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