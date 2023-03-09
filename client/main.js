import { getPlayerRatings } from './data.js'

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

let main = async () => {
    let ratings = await getPlayerRatings()

    renderTable(ratings, 'Ping pong')
    renderDropdown(ratings)
}

let removeColumn = colName => o => delete o[colName] && o
let renderTable = (ratings, filter='all') => {
    let table = $('#ranking_table')

    if (filter != 'all') {
        ratings = ratings.filter(x => x.Game == filter)
    }

    // ratings = ratings.filter(removeColumn('index'))

    table.innerHTML = `
        <tr>
            <th>Rank</th>
            <th>Player</th>
            <th>Rating</th>
        </tr>
        ${ratings.map(i => `
            <tr>
                <td>${i.index + 1}</td>
                <td>${i.Player}</td>
                <td>${i.Rating}</td>
            </tr>
        `).join('')}
    `
    
    // table.innerHTML = `
    //     <tr>
    //         ${Object.keys(ratings[0]).map(key => `
    //             <th>${key}</th>
    //         `).join('')}
    //     </tr>
    //     ${ratings.map(item => `
    //         <tr>
    //             ${Object.values(item).map(value => `
    //                 <td>${value}</td>
    //             `).join('')}
    //         </tr>
    //     `).join('')}
    // `
}

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