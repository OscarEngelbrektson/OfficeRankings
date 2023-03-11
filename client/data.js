let dfToObjList = df => Object.keys(df.index).map(i => Object.fromEntries(Object.keys(df).map(k => [k, df[k][i]])))

const LAMBDA_URL = 'https://lne6kwcwxzlg5fskrfnkkt4lj40lssgc.lambda-url.eu-north-1.on.aws/ratings'
export let getPlayerRatings = async () => {
    // let response = await fetch(LAMBDA_URL, {cache: 'no-cache'})
    // let playerRatingsDf = await response.json()

    let playerRatingsDf = JSON.parse(`{"index":{"0":0,"1":1,"2":2,"3":0,"4":1,"5":2},"Game":{"0":"Ping pong","1":"Ping pong","2":"Ping pong","3":"Chess","4":"Chess","5":"Chess"},"Player":{"0":"John","1":"Oscar","2":"Oskar Christiansen","3":"John","4":"Oscar","5":"Oskar Christiansen"},"Rating":{"0":1420,"1":1441,"2":28,"3":1461,"4":953,"5":0}}`)

    return dfToObjList(playerRatingsDf)
}

export let getData = async () => {
    // let response = await fetch(LAMBDA_URL, {cache: 'no-cache'})
    // let playerRatingsDf = await response.json()

    let json_resp = '{"ratings": {"index": {"0": 1, "1": 0, "2": 2, "3": 0, "4": 1, "5": 2, "6": 0, "7": 1}, "Game": {"0": "Ping pong", "1": "Ping pong", "2": "Ping pong", "3": "Chess", "4": "Chess", "5": "Chess", "6": "Super Smash", "7": "Super Smash"}, "Player": {"0": "Oscar", "1": "John", "2": "Oskar Christiansen", "3": "John", "4": "Oscar", "5": "Oskar Christiansen", "6": "Jim", "7": "John"}, "Rating": {"0": 1440, "1": 1420, "2": 27, "3": 1461, "4": 953, "5": 0, "6": 788, "7": 0}, "Games played": {"0": 6, "1": 7, "2": 1, "3": 4, "4": 3, "5": 1, "6": 1, "7": 1}}, "commentary": {"Ping pong": ["comment1", "comment2", "comment3"]}}'

    let { ratings, commentary } = JSON.parse(json_resp)


    return {
        ratings: dfToObjList(ratings),
        commentary
    }
}
