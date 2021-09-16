export function authHeader() {
    // return authorization header with jwt token
    console.log("inside auth-header")
    let user = JSON.parse(localStorage.getItem('user'));
    console.log(`inside auth-header: ${user}`)
    if (user != "") {
        return { 'Authorization': `'${user}'`};
    } else {
        return {};
    }
}