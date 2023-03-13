import { getData } from './data.js'
import { ResultsSlide, Slide } from './components.js'

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const SUPPORTED_GAMES = [
    'Ping pong',
    'Foosball'
]
let main = async () => {
    let app = $('#app')
   
    app.innerHTML = `
        ${Slide({ title: 'Loading...' })}
    `

    let { ratings, commentary, titles } = await getData()
  
    let gameTypes = ratings
        .map(x => x.Game).filter(uniqueValues)
        .filter(g => SUPPORTED_GAMES.includes(g))

    app.innerHTML = `
        ${gameTypes.map(
            (game, i) => ResultsSlide(ratings.filter(x => x.Game == game), game, commentary, titles[game], i + 1)
        ).join('')}
    `
    // app.innerHTML = `
    //     ${AgendaSlide(gameTypes)}
    //     ${gameTypes.map(game => ResultsSlide(ratings, game))}
    //     ${ResultsSlide(ratings, 'all')}
    // `
}

let removeColumn = colName => o => delete o[colName] && o


let uniqueValues = (value, index, self) => self.indexOf(value) === index
let renderDropdown = (ratings) => {
    let select = $('select#dropdown')

    let gameTypes = ratings.map(x => x.Game).filter(uniqueValues)

    select.innerHTML = `
        <option value="all">All</option>
        ${gameTypes.map(game => `
            <option value="${game}">
                ${game}
            </option>
        `).join('')}
    `

    select.addEventListener('change', () => renderTable(ratings, select.value));
} 

document.addEventListener('DOMContentLoaded', main);