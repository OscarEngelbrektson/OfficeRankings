let dfToObjList = df => Object.keys(df.index).map(i => Object.fromEntries(Object.keys(df).map(k => [k, df[k][i]])))

const LAMBDA_URL = 'https://lne6kwcwxzlg5fskrfnkkt4lj40lssgc.lambda-url.eu-north-1.on.aws/ratings'
export let getPlayerRatings = async () => {
    // let response = await fetch(LAMBDA_URL, {cache: 'no-cache'})
    // let playerRatingsDf = await response.json()

    let playerRatingsDf = JSON.parse(`{"index":{"0":0,"1":1,"2":2,"3":0,"4":1,"5":2},"Game":{"0":"Ping pong","1":"Ping pong","2":"Ping pong","3":"Chess","4":"Chess","5":"Chess"},"Player":{"0":"John","1":"Oscar","2":"Oskar Christiansen","3":"John","4":"Oscar","5":"Oskar Christiansen"},"Rating":{"0":1420,"1":1441,"2":28,"3":1461,"4":953,"5":-91}}`)

    return dfToObjList(playerRatingsDf)
}