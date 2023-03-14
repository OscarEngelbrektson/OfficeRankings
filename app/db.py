import gspread
import pandas as pd

def get_game_outcomes():
    sheet = get_google_sheet()[GAME_OUTCOMES_SHEET_NR]
    # sheet = get_google_sheet().get_worksheet(GAME_OUTCOMES_SHEET_NR)
    return sheet_to_df(sheet).astype(GAME_OUTCOMES_DTYPES)

def write_player_ratings(player_ratings):
    sheet = get_google_sheet()[PLAYER_RATINGS_SHEET_NR]
    # sheet = get_google_sheet().get_worksheet(PLAYER_RATINGS_SHEET_NR)
    df_to_sheet(sheet, player_ratings)

def get_player_ratings():
    sheet = get_google_sheet()[PLAYER_RATINGS_SHEET_NR]
    # sheet = get_google_sheet().get_worksheet(PLAYER_RATINGS_SHEET_NR)
    return sheet_to_df(sheet)

GAME_OUTCOMES_SHEET_NR = 0
PLAYER_RATINGS_SHEET_NR = 1

GAME_OUTCOMES_DTYPES = {
    'Timestamp': 'datetime64[ns]',
    'Winner': 'string',
    'Honorable opponent': 'string',
    'Game': 'string',
}
PLAYER_RATINGS_DTYPES = {
    'index': 'int64',
    'Game': 'object',
    'Player': 'object',
    'Rating': 'int64',
    'Games played': 'int64'     
}

AUTH_KEY_FILE_NAME = 'app/utils/gdrive_api_key.json'
GOOGLE_SHEET_NAME = 'Game outcome (Responses)'

cached_google_sheet = None
def get_google_sheet():
    global cached_google_sheet
    if cached_google_sheet is None:
        cached_google_sheet = fetch_google_sheet()

    return cached_google_sheet

def fetch_google_sheet():
    gc = gspread.service_account(filename=AUTH_KEY_FILE_NAME)
    return gc.open(GOOGLE_SHEET_NAME).worksheets()
    # return gc.open(GOOGLE_SHEET_NAME)

def sheet_to_df(sheet, **df_args):
    return pd.DataFrame(sheet.get_all_records(), **df_args)

def df_to_sheet(sheet, df):
    sheet.clear()
    sheet.update([df.columns.values.tolist()] + df.values.tolist())