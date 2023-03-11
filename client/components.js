export let Slide = ({title = 'Title', preTitle = '', footNote = '', sticker='', content = ''}) => {
    return `
        <div class="slide default-slide">
            <div class="slide-inner">
                <div class="slide-title">
                    <span class="pre-title">${preTitle ? preTitle + ' | ' : ''}</span>${title}
                </div>
                <div class="footnote">${footNote}</div>
                <div class="content">${content}</div>
                <div class="copyright">
                    Copyright &#169; John Rapp Farnes & Oscar Engelbrektsson
                </div>
                ${sticker ? `
                    <div class="sticker">${sticker}</div>
                ` : ''}
            </div>
        </div>
    `
}

export let ResultsSlide = (ratings, game, commentary) => {
    let footNote = `
        <div>
            Note: Self reported scores, may not reflect actual skill
        </div>
        <div>
            Source: Proprietary Google forms rating system (TM); John & Oscar analysis
        </div>
    `

    let content = `
        <div class="table-container">
            ${RankingTable(ratings, game)}
        </div>
        <div class="flow-arrow">
            <div class="green-arrow">
                <div class="top"></div>
                <div class="bottom"></div>
            </div>
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
        title: 'John Rapp Farnes leading, Oscar Engelbrektsson tight second',
        preTitle: game,
        footNote: footNote,
        sticker: 'Indicative',
        content: content
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
            ${ratings.map(i => `
                <tr>
                    <td>
                        <div class="number-ball">${i.index + 1}</div>
                    </td>
                    <td>${i.Player}</td>
                    <td>${i.Rating}</td>
                    <td>${i['Games played']}</td>
                </tr>
            `).join('')}
        </table>
    `
}

export let AgendaSlide = (gameTypes) => {
    let title = 'Contents of this document'

    let content = ''

    return `
        <div class="slide">
            <div class="one-third agenda-bg">
                <div class="img-overlay"></div>
                <div class="slide-title">
                    ${title}
                </div>
            </div>
            <div class="two-thirds">
                <div class="two-thirds-inner"></div>
            </div>
            <div class="copyright">
                Copyright &#169; John Rapp Farnes & Oscar Engelbrektsson
            </div>
        </div>
    `
}