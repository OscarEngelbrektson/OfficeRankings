import pandas as pd
from trueskill import Rating, rate_1vs1

def calculate_player_ratings(game_outcomes):
    ratings_df = pd.DataFrame()

    game_types = game_outcomes.Game.unique()

    for game in game_types:
        outcomes = game_outcomes[game_outcomes.Game == game]

        player_games_df = pd.concat([outcomes['Winner'], outcomes['Honorable opponent']])
        players = player_games_df.unique()
        
        # Get games per player df
        games_per_player = player_games_df.value_counts()
        games_per_player_df = pd.DataFrame({
            "Player": games_per_player.index,
            "Games played": games_per_player.values,
            })

        # Compute player rankings
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

        df = df.merge(
            games_per_player_df,
            how = "left",
            on="Player",
            validate="1:1",
        ).sort_values(
            by="Rating",
            ascending=False,
        )

        ratings_df = pd.concat([ratings_df, df])
    
    return ratings_df.reset_index()

def display_rating(rating):
    return int(max((rating.mu - 3 * rating.sigma) * 100, 0))