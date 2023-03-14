import { getData } from './data.js'
import { ResultsSlide, Slide, AgendaSlide } from './components.js'
import { $ } from './framework.js'

const SUPPORTED_GAMES = [
    'Ping pong',
    'Foosball'
]
const INACTIVE_GAMES = [
    'Tennis',
    'Padel',
    'Super smash',
    'Fifa',
]

let main = async () => {
    let app = $('#app')

    app.innerHTML = `
        ${AgendaSlide(SUPPORTED_GAMES, INACTIVE_GAMES)}
        ${SUPPORTED_GAMES.map(
            game => Slide({ preTitle: game, title: 'STK Ranked is loading, hang tight for latest results...' })
        ).join('')}
    `
    let { ratings, commentary, titles } = await getData()
  
    // let gameTypes = ratings
    //     .map(x => x.Game).filter(uniqueValues)
    //     .filter(g => SUPPORTED_GAMES.includes(g))

    app.innerHTML = `
        ${AgendaSlide(SUPPORTED_GAMES, INACTIVE_GAMES)}
        ${SUPPORTED_GAMES.map(
            (game, i) => ResultsSlide(ratings.filter(x => x.Game == game), game, commentary, titles[game], i + 1)
        ).join('')}
    `

    // onHashChange()

    // app.innerHTML = `
    //     ${AgendaSlide(gameTypes)}
    //     ${gameTypes.map(game => ResultsSlide(ratings, game))}
    //     ${ResultsSlide(ratings, 'all')}
    // `
}

document.addEventListener('DOMContentLoaded', main);

// window.addEventListener('hashchange', onHashChange);