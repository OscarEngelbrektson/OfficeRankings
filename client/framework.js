export const $ = document.querySelector.bind(document)
export const $$ = document.querySelectorAll.bind(document)

let LISTNERS_ARR = '$$ONCLICK_LISTENERS'
window[LISTNERS_ARR] = []
let listenerNr = -1
export let registerOnClick = (callback) => {
    listenerNr++
    
    window[LISTNERS_ARR].push(callback)
    return `window['${LISTNERS_ARR}'][${listenerNr}](this)`
}

// export let onHashChange = e => {
//     const { hash } = window.location;
//     scrollToId(hash)
// }

// export let setHashAndScrollToId = id => {
//     window.location.hash = '#' + id
// }

export let scrollToId = (id, offset = 10) => {
    const element = $('#' + id);
    window.scrollTo({
        top: element.offsetTop - offset,
        // behavior: "smooth"
    });
}