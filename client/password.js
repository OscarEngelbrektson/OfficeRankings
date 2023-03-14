const PASSWORD = String.fromCharCode(68 - 3) + String.fromCharCode(3 * 30 + 7) + String.fromCharCode((1 << 2 << 2 << 2) + 33)
export let verifyPassword = () => {
    if (isPassword(localStorage.password)) {
        return true
    } else {
        let input = prompt('Please enter the password (not case sensitive)')
        if (input && isPassword(input)) {
            localStorage.password = input
            return true
        } else {
            let tryAgain = confirm('Wrong password, please try again (see slide poster on 7th floor)')
            return tryAgain ? verifyPassword() : false
        }
    }
}

let isPassword = input => input.toLowerCase() === PASSWORD.toLowerCase()