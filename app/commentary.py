# -*- coding: utf-8 -*-
"""Module to generate commentary based on game outcomes."""

import numpy as np
import pandas as pd
from typing import Dict, List

def generate_titles(
        game_outcomes: pd.DataFrame,
        player_ratings: pd.DataFrame,
    )->Dict[str, List[str]]:

    games = game_outcomes.Game.unique()
    titles = {}
    
    for game in games:
        game_ratings = player_ratings[player_ratings.Game == game]
        titles[game] = generate_game_title(game_ratings)
    return titles

def generate_game_title(game_ratings):
    return clean_whitespace(TITLE_FORMAT.format(
        leader = game_ratings.iloc[0].Player,
        second = game_ratings.iloc[1].Player
    ))

def generate_commentary(
        game_outcomes: pd.DataFrame,
        player_ratings: pd.DataFrame,
    )->Dict[str, List[str]]:
    '''Generate 3 comments per sport.

    :params game_outcomes: dataframe containing all game outcomes.
    :return: Dict with sport as key and array containing 3 comments as values per key.
    '''
    games = game_outcomes.Game.unique()
    commentaries = {}

    for game in games:
        commentaries[game] = list(map(
            lambda generate : generate(
                game_outcomes[game_outcomes.Game == game],
                player_ratings[player_ratings.Game == game],
                game
            ),
            get_commentary_functions()
        ))

    return commentaries

def get_commentary_functions():
    return [
        leader_comment,
        latest_win_comment,
        highest_activity_comment
    ]

def leader_comment(game_outcomes, game_ratings, game):
    return clean_whitespace(LEADER_COMMENT_FORMAT.format(
        leader = game_ratings.iloc[0].Player,
        second = game_ratings.iloc[1].Player
    ))

def latest_win_comment(game_outcomes, game_ratings, game):
    latest_game = game_outcomes.sort_values('Timestamp', ascending=False).iloc[0]

    return clean_whitespace(LATEST_WIN_COMMENT_FORMAT.format(
        winner = latest_game.Winner,
        second = latest_game['Honorable opponent'],
        game = game
    ))

def highest_activity_comment(game_outcomes, game_ratings, game):
    time_now = pd.Timestamp.now() 
    last_period = time_now - pd.DateOffset(weeks=1)

    period_game_outcomes = game_outcomes[game_outcomes.Timestamp > last_period]

    period_player_games = pd.concat([period_game_outcomes['Winner'], period_game_outcomes['Honorable opponent']])
    player_with_most_games = period_player_games.value_counts().index[0]

    return clean_whitespace(HIGHEST_ACTIVITY_COMMENT.format(
        player = player_with_most_games,
        game = game
    ))

TITLE_FORMAT = """
    {leader} leading, {second} tight second
"""

LEADER_COMMENT_FORMAT = """
    {leader} a clear leader, 
    key question is whether 
    {second} can catch up
"""

LATEST_WIN_COMMENT_FORMAT = """
    {winner} just beat {second}
    in a nerve-racking game of {game} -
    his rating growing rapidly, 
    albeit from a low base
"""

HIGHEST_ACTIVITY_COMMENT = """
    {player}'s {game}
    activity at the office
    is experiencing strong growth,
    driven by fundamental trends of 
    'nothing better to do tbh'
"""

def clean_whitespace(str):
    return str.replace("\n", "").replace("\t", "").strip()