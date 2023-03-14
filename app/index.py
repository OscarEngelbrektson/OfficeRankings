import sys
import json

from commentary import generate_commentary, generate_titles
from db import get_game_outcomes, write_player_ratings, get_player_ratings
from player_ratings import calculate_player_ratings

from tiny_router import TinyLambdaRouter

app = TinyLambdaRouter()

HEADERS = {"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Credentials": True}


@app.route("/")
def index(ev, cxt, kwargs):
    return "welcome to the index page!! <3"


@app.route("/ratings", methods=["GET"])
def get_ratings(ev, cxt, kwargs):
    player_ratings = get_player_ratings()
    return player_ratings.to_json()


@app.route("/ratings_and_commentary", methods=["GET"])
def get_ratings_and_commentary(ev, cxt, kwargs):
    player_ratings = get_player_ratings()

    game_outcomes = get_game_outcomes()

    commentary = generate_commentary(game_outcomes, player_ratings)

    return json.dumps(
        {
            "ratings": json.loads(player_ratings.to_json()),
            "commentary": commentary,
            "titles": generate_titles(game_outcomes, player_ratings),
        }
    )


@app.route("/update_ratings", methods=["POST", "GET"])
def update_ratings(ev, cxt, kwargs):
    game_outcomes = get_game_outcomes()
    player_ratings = calculate_player_ratings(game_outcomes)
    write_player_ratings(player_ratings)

    return player_ratings.to_json()


@app.route("/outcomes", methods=["GET"])
def get_outcomes(ev, cxt, kwargs):
    game_outcomes = get_game_outcomes()

    print(game_outcomes)

    return game_outcomes.to_json()


def lambda_handler(event, context):
    try:
        return {"statusCode": 200, "body": app.run(event, context), "headers": HEADERS}

    except Exception as e:
        return {"statusCode": 500, "body": str(e)}
