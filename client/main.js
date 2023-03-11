import { getData } from './data.js'
import { ResultsSlide, AgendaSlide } from './components.js'

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

let main = async () => {
    let { ratings, commentary, titles } = await getData()
    // console.log(ratings)

    let app = $('#app')
  
    let gameTypes = ratings.map(x => x.Game).filter(uniqueValues)
    gameTypes = gameTypes.filter(g => g == 'Ping pong')
  
    // app.innerHTML = `
    //     ${AgendaSlide(gameTypes)}
    //     ${gameTypes.map(game => ResultsSlide(ratings, game))}
    //     ${ResultsSlide(ratings, 'all')}
    // `

    app.innerHTML = `
        ${gameTypes.map(game => ResultsSlide(ratings.filter(x => x.Game == game), game, commentary, titles[game]))}
    `
    // renderTable(ratings, 'Ping pong')
    // renderDropdown(ratings)
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