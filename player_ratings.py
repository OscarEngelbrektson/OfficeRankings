import pandas as pd
from trueskill import Rating, rate_1vs1

def calculate_player_ratings(game_outcomes):
    ratings_df = pd.DataFrame()

    game_types = game_outcomes.Game.unique()

    for game in game_types:
        outcomes = game_outcomes[game_outcomes.Game == game]

        players = pd.concat([outcomes['Winner'], outcomes['Honorable opponent']]).unique()

        player_ratings = {}

        for player in players:
            player_ratings[player] = Rating()

        for i, outcome in outcomes.iterrows():
            pA = outcome['Winner']
            pB = outcome['Honorable opponent']

            player_ratings[pA], player_ratings[pB] = rate_1vs1(player_ratings[pA], player_ratings[pB])

        df = pd.DataFrame({
            'Game': game,
            'Player': player_ratings.keys(),
            'Rating': list(map(display_rating, player_ratings.values())),
        })

        ratings_df = pd.concat([ratings_df, df])
    
    return ratings_df.reset_index()

def display_rating(rating):
    return int(round(rating.mu - 3 * rating.sigma, 2) * 100)