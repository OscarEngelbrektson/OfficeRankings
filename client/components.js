import { registerOnClick, scrollToId } from "./framework.js"

export let Slide = ({ title = 'Title', preTitle = '', footNote = '', sticker = '', content = '', slideNr = 1, slideId = '' }) => {
    return `
        <div class="slide default-slide" ${slideId ? `id="${slideId}"` : ''}>
            <div class="slide-inner">
                <div class="slide-title">
                    <span class="pre-title">${preTitle ? preTitle + ' | ' : ''}</span>${title}
                </div>
                <div class="footnote">${footNote}</div>
                <div class="content">${content}</div>
                <div class="copyright">
                    Copyright &#169; John R & Oscar E at the Stockholm office
                </div>
                <div class="slide-nr">${slideNr}</div>
                ${sticker ? `
                    <div class="sticker">${sticker}</div>
                ` : ''}
            </div>
        </div>
    `
}

export let ResultsSlide = (ratings, game, commentary, title, slideNr) => {
    let footNote = `
        <div>
            Note: Self reported scores, may not reflect actual skill
        </div>
        <div>
            Source: Proprietary STK Ranked Google forms rating system&trade;; John & Oscar analysis
        </div>
    `

    let content = `
        <div class="table-container">
            ${RankingTable(ratings, game)}
        </div>
        <div class="flow-arrow">
            ${GreenArrow()}
        </div>
        <div class="commentary-container">
            <div class="heading">Commentary</div>
            <ul class="bullet-points">
                ${commentary[game].map(comment => `
                    <li>${comment}</li>
                `).join('')}
            </ul>
        </div>
    `

    return Slide({
        title: title,
        preTitle: game,
        footNote: footNote,
        sticker: 'Indicative',
        content: content,
        slideNr: slideNr,
        slideId: resultSlideId(game)
    })
}

export let RankingTable = (ratings, game) => {
    // ratings = ratings.concat(ratings)
    // ratings = ratings.concat(ratings)
    // ratings = ratings.concat(ratings)
    // ratings = ratings.concat(ratings)
    // ratings = ratings.concat(ratings)
    return `
        <table class="ranking-table">
            <tr>
                <th><div>Rank</div></th>
                <th><div>Player</div></th>
                <th><div>Rating</div></th>
                <th><div># games</div></th>
            </tr>
            ${ratings.map((player, i) => `
                <tr>
                    <td>
                        <div class="number-ball">${i + 1}</div>
                    </td>
                    <td>${player.Player}</td>
                    <td>${player.Rating}</td>
                    <td>${player['Games played']}</td>
                </tr>
            `).join('')}
        </table>
    `
}

export let AgendaSlide = (gameTypes, inactiveGameTypes) => {
    let title = 'Office leaderboards'

    let onClick = game => registerOnClick(e => scrollToId(resultSlideId(game)))

    let content = `
        ${gameTypes.map(game => `
            <div class="agenda-item clickable" onclick="${onClick(game)}">
                ${GreenArrow()}
                <div class="item-title">${game}</div>
            </div>
        `).join('')}
        ${inactiveGameTypes.map(game => `
            <div class="agenda-item inactive">
                ${GreenArrow()}
                <div class="item-title">${game}</div>
            </div>
        `).join('')}
        <div class="agenda-item inactive dot3">
            ${GreenArrow()}
            <div class="item-title">... more to come</div>
        </div>
    `

    return `
        <div class="slide">
            <div class="one-third agenda-bg">
                <div class="img-overlay"></div>
                <div class="slide-title">${title}</div>
            </div>
            <div class="two-thirds">
                <div class="two-thirds-inner">${content}</div>
            </div>
            <div class="copyright">
                Copyright &#169; John Rapp Farnes & Oscar Engelbrektsson
            </div>
        </div>
    `
}

export let GreenArrow = () => `
    <div class="green-arrow">
        <div class="top"></div>
        <div class="bottom"></div>
    </div>
`

let resultSlideId = game => `result-slide-${game.replace(' ', '-').toLowerCase()}`