export let Slide = ({title = 'Title', preTitle = '', footNote = '', content = ''}) => {
    return `
        <div class="slide">
            <div class="title">
                <span class="pre-title">${preTitle ? preTitle + ' | ' : ''}</span>${title}</div>
            <div class="footnote">${footNote}</div>
            <div class="content">${content}</div>
            <div class="copyright">
                Copyright &#169; John Rapp Farnes & Oscar Engelbrektsson
            </div>
        </div>
    `
}

export let ResultsSlide = (ratings, filter='all') => {
    let footNote = `
        <div>
            Note: Self reported scores, may not reflect actual skill
        </div>
        <div>
            Source: BCG STK proprietary Google forms rating system (TM); BCG analysis
        </div>
    `

    let content = `
        <div class="table-container">
            ${RankingTable(ratings, filter)}
        </div>
        <div class="flow-arrow">
            <div class="arrow">
                <div class="top"></div>
                <div class="bottom"></div>
            </div>
        </div>
        <div class="commentary-container">
            <div class="heading">Commentary</div>
            <ul class="bullet-points">
                <li>John Rapp Farnes a clear leader, key question is whether Oscar Engelbrektsson can catch up</li>
                <li>Teif Alsadi just beat Oskar Christiansen in a nerve-racking game of Ping pong, his rating growing rapidly, albeit from a low base</li>
                <li>Erik Eriksson's Ping pong activity at the office is experiencing strong growth, driven by fundamental trends of BD work and 'nothing better to do tbh'</li>
            </ul>
        </div>
    `

    return Slide({
        title: 'John Rapp Farnes leading, Oscar Engelbrektsson tight second',
        preTitle: filter != 'all' ? filter : '',
        footNote: footNote,
        content: content
    })
}

export let RankingTable = (ratings, filter='all') => {
    if (filter != 'all') {
        ratings = ratings.filter(x => x.Game == filter)
    }
    return `
        <table class="ranking-table">
            <tr>
                <th><div>Rank</div></th>
                <th><div>Player</div></th>
                <th><div>Rating</div></th>
            </tr>
            ${ratings.map(i => `
                <tr>
                    <td>
                        <div class="number-ball">${i.index + 1}</div>
                    </td>
                    <td>${i.Player}</td>
                    <td>${i.Rating}</td>
                </tr>
            `).join('')}
        </table>
    `
}

// let renderTable = (ratings, filter='all') => {
//     let table = $('#ranking-table')

//     if (filter != 'all') {
//         ratings = ratings.filter(x => x.Game == filter)
//     }

//     // ratings = ratings.filter(removeColumn('index'))

//     table.innerHTML = `
        
//     `
    
//     // table.innerHTML = `
//     //     <tr>
//     //         ${Object.keys(ratings[0]).map(key => `
//     //             <th>${key}</th>
//     //         `).join('')}
//     //     </tr>
//     //     ${ratings.map(item => `
//     //         <tr>
//     //             ${Object.values(item).map(value => `
//     //                 <td>${value}</td>
//     //             `).join('')}
//     //         </tr>
//     //     `).join('')}
//     // `
// }