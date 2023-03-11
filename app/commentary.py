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

    return comment

def latest_win_comment(game_outcomes):

    return comment

def highest_activity_comment(game_outcomes):

    return comment