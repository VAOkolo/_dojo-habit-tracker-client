async function requestLogin(e){
    e.preventDefault();
    try {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username_input,
                email: email_input,
                password: password_input
            })
        }
        const r =  fetch(`http://localhost:3001/auth/login`, options)
        const data = await r.json()
        if (err) { throw new Error('Login not authorised'); }
        login(data.token);
    } catch (err) {
        console.log("****")
        console.log(data)
        console.log("****")
        console.warn(err);
    }
}

async function requestRegistration(e) {
    e.preventDefault();
    try {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(new FormData(e.target)))
        }
        const r = await fetch(`http://localhost:3000/auth/register`, options)
        const data = await r.json()
        if (data.err){ throw Error(data.err) }
        requestLogin(e);
    } catch (err) {
        console.warn(err);
    }
}

function login(token){
    const user = jwt_decode(token);
    localStorage.setItem("token", token);
    localStorage.setItem("username", user.username);
    localStorage.setItem("userEmail", user.email);
    console.log("SUCESS")
}

function logout(){
    localStorage.clear();
    location.assign = 'index.html';
}

function currentUser(){
    const username = localStorage.getItem('username')
    return username;
}
