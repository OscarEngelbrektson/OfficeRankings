# -*- coding: utf-8 -*-
"""Module to generate commentary based on game outcomes."""

import numpy as np
import pandas as pd
from typing import Dict, List

def generate_title():
    return {
        "Ping pong": 'John Rapp Farnes leading, Oscar Engelbrektsson tight second'
    }

def generate_commentary(
    game_outcomes: pd.DataFrame
    )->Dict[str, List[str]]:
    '''Generate 3 comments per sport.

    :params game_outcomes: dataframe containing all game outcomes.
    :return: Dict with sport as key and array containing 3 comments as values per key.
    '''

    game = 'Ping pong'

    commentary_arr = {"Ping pong": [
        leader_comment(game_outcomes, game),
        latest_win_comment(game_outcomes, game),
        highest_activity_comment(game_outcomes, game),
    ]}
    return commentary_arr

def leader_comment(game_outcomes, game):
    leader = 'John Rapp Farnes'
    second = 'Oscar Engelbrektsson'
    
    comment = """
    {leader} a clear leader, 
    key question is whether 
    {second} can catch up
    """.format(leader = leader, second = second)

    return clean_whitespace(comment)

def latest_win_comment(game_outcomes, game):
    winner = 'Teif Alsadi'
    second = 'Oskar Christiansen'

    comment = """{winner} just beat {second}
     in a nerve-racking game of {game} -
     his rating growing rapidly, 
     albeit from a low base
     """.format(winner = winner, second = second, game = game)

    return clean_whitespace(comment)

def highest_activity_comment(game_outcomes, game):
    player = 'Erik Eriksson'

    comment = """{player}'s Ping pong activity at the office
     is experiencing strong growth,
     driven by fundamental trends of 
     'nothing better to do tbh'
     """.format(player = player)

    return clean_whitespace(comment)

def clean_whitespace(str):
    return str.replace("\n", "").replace("\t", "").strip()