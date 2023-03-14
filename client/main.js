import { getData } from './data.js'
import { ResultsSlide, Slide, AgendaSlide } from './components.js'
import { $ } from './framework.js'
import { verifyPassword } from './password.js'

const SUPPORTED_GAMES = [
    'Ping pong',
    'Foosball'
]
const INACTIVE_GAMES = [
    'Tennis',
    'Padel',
    'Super smash',
    'Fifa',
    'Chess',
]

let main = async () => {
    let app = $('#app')
    app.innerHTML = render_empty()

    let response = getData()

    if (verifyPassword()) {
        let { ratings, commentary, titles } = await response

        app.innerHTML = render_app({ ratings, commentary, titles })
    }
}

let render_empty = () => `
    ${AgendaSlide(SUPPORTED_GAMES, INACTIVE_GAMES)}
    ${SUPPORTED_GAMES.map(
        game => Slide({ preTitle: game, title: 'STK Ranked is loading, hang tight for the latest results...' })
    ).join('')}
`

let render_app = ({ ratings, commentary, titles }) => `
    ${AgendaSlide(SUPPORTED_GAMES, INACTIVE_GAMES)}
    ${SUPPORTED_GAMES.map(
        (game, i) => ResultsSlide(ratings.filter(x => x.Game == game), game, commentary, titles[game], i + 1)
    ).join('')}
`


document.addEventListener('DOMContentLoaded', main);