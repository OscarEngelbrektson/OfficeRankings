import { getPlayerRatings } from './data.js'
import { ResultsSlide, AgendaSlide } from './components.js'

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

let main = async () => {
    let ratings = await getPlayerRatings()

    let app = $('#app')
  
    let gameTypes = ratings.map(x => x.Game).filter(uniqueValues)
    app.innerHTML = `
        ${AgendaSlide(gameTypes)}
        ${gameTypes.map(game => ResultsSlide(ratings, game))}
        ${ResultsSlide(ratings, 'all')}
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