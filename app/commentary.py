# -*- coding: utf-8 -*-
"""Module to generate commentary based on game outcomes."""

import numpy as np
import pandas as pd
from typing import Dict, List


def generate_commentary(
    game_outcomes: pd.DataFrame
    )->Dict[str, List[str]]:
    '''Generate 3 comments per sport.

    :params game_outcomes: dataframe containing all game outcomes.
    :return: Dict with sport as key and array containing 3 comments as values per key.
    '''

    commentary_arr = {"Ping pong": [
        "comment1",
        "comment2",
        "comment3",
    ]}
    return commentary_arr

def leader_comment(game_outcomes):
    
    comment = """
    John Rapp Farnes a clear leader, 
    key question is whether 
    Oscar Engelbrektsson can catch up
    """

    return comment

def latest_win_comment(game_outcomes):

    comment = """Teif Alsadi just beat Oskar Christiansen
     in a nerve-racking game of Ping pong, 
     his rating growing rapidly, 
     albeit from a low base
     """

    return comment

def highest_activity_comment(game_outcomes):

    comment = """Erik Eriksson's Ping pong activity at the office
     is experiencing strong growth,
     driven by fundamental trends of BD work
     and 'nothing better to do tbh'​"""

    return comment