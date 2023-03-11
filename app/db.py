import gspread
import pandas as pd

def get_game_outcomes():
    sheet = get_google_sheet().get_worksheet(GAME_OUTCOMES_SHEET_NR)
    return sheet_to_df(sheet)

def write_player_ratings(player_ratings):
    sheet = get_google_sheet().get_worksheet(PLAYER_RATINGS_SHEET_NR)
    df_to_sheet(sheet, player_ratings)

def get_player_ratings():
    sheet = get_google_sheet().get_worksheet(PLAYER_RATINGS_SHEET_NR)
    return sheet_to_df(sheet)

GAME_OUTCOMES_SHEET_NR = 0
PLAYER_RATINGS_SHEET_NR = 1

AUTH_KEY_FILE_NAME = '../gdrive_api_key.json'
GOOGLE_SHEET_NAME = 'Game outcome (Responses)'

def get_google_sheet():
    gc = gspread.service_account(filename=AUTH_KEY_FILE_NAME)
    return gc.open(GOOGLE_SHEET_NAME)

def sheet_to_df(sheet):
    return pd.DataFrame(sheet.get_all_records())

def df_to_sheet(sheet, df):
    sheet.update([df.columns.values.tolist()] + df.values.tolist())