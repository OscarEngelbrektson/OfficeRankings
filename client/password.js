const PASSWORD = String.fromCharCode(100-3)+String.fromCharCode(3*30+7)+String.fromCharCode((1<<2<<2<<2)+33)
export let verifyPassword = () => {
    if (localStorage.password == PASSWORD) {
        return true
    } else {
        let input = prompt('Please enter the password :)')
        if (input === PASSWORD) {
            localStorage.password = input
            return true
        } else {
            let tryAgain = confirm('Wrong password, please try again (see slide poster on 7th floor)')
            return tryAgain ? verifyPassword() : false
        }
    } 
}