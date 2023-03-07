import json

import gspread
import pandas as pd

import trueskill

def lambda_handler(event, context):
    
    
    game_outcomes = get_game_outcomes()

    
    print(game_outcomes)

    for g in game_outcomes.Game.unique():
        g_outcomes = game_outcomes[game_outcomes.Game == g]
        print(pd.concat(g_outcomes['Player A'], g_outcomes['Player B']))
    #python_sheet = sheet.get_all_records()
    
    # TODO implement
    return {
        'statusCode': 200,
        'body': 'test!'
    }


def get_game_outcomes():
    scope = [
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/drive.file'
    ]
        
    key_file_name = 'gdrive_api_key.json'
    sheet_name = 'Game outcome (Responses)'

    gc = gspread.service_account(filename=key_file_name)
    sheet = gc.open(sheet_name).get_worksheet(0)

    return pd.DataFrame(sheet.get_all_records())

def display_rating(rating):
    return rating.mu - 3 * rating.sigma

#lambda_handler(0,0)
