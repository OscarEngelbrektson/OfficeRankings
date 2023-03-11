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

    let json_resp = `
    {"ratings": {"index": {"0": 0, "1": 2, "2": 1, "3": 3, "4": 0, "5": 1, "6": 2, "7": 0, "8": 1}, "Game": {"0": "Ping pong", "1": "Ping pong", "2": "Ping pong", "3": "Ping pong", "4": "Chess", "5": "Chess", "6": "Chess", "7": "Super Smash", "8": "Super Smash"}, "Player": {"0": "John", "1": "Oscar", "2": "Erik", "3": "Oskar Christiansen", "4": "John", "5": "Oscar", "6": "Oskar Christiansen", "7": "Jim", "8": "John"}, "Rating": {"0": 1616, "1": 1531, "2": 715, "3": 0, "4": 1461, "5": 953, "6": 0, "7": 788, "8": 0}, "Games played": {"0": 9, "1": 7, "2": 2, "3": 2, "4": 4, "5": 3, "6": 1, "7": 1, "8": 1}}, "commentary": {"Ping pong": ["John Rapp Farnes a clear leader,     key question is whether     Oscar Engelbrektsson can catch up", "Teif Alsadi just beat Oskar Christiansen     in a nerve-racking game of Ping pong -     his rating growing rapidly,      albeit from a low base", "Erik Eriksson's Ping pong activity at the office     is experiencing strong growth,     driven by fundamental trends of      'nothing better to do tbh'"]}, "titles": {"Ping pong": "John Rapp Farnes leading, Oscar Engelbrektsson tight second"}}
    `

    let { ratings, commentary, titles } = JSON.parse(json_resp)


    return {
        ratings: dfToObjList(ratings),
        commentary,
        titles
    }
}
