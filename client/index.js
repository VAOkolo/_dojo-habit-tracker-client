function setFormMessage(formElement, type, message, colour) {
    const messageElement = formElement.querySelector('.form__message');
    messageElement.textContent = message;
    messageElement.style.color = colour
    messageElement.classList.remove('form__message--success', 'form__message--error')
    messageElement.classList.add('.form__message--${type}')
}

function setInputError(inputElement, message) {
    inputElement.classList.add('form__input--error');
    inputElement.parentElement.querySelector('.form__input-error-message').textContent = message
}

function clearInputError(inputElement) {
    inputElement.classList.remove('form__input--error');
    inputElement.parentElement.querySelector('.form__input-error-message').textContent = "";
}

// async function requestLogin(e){
//     e.preventDefault();
//     try {
//         const options = {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//                 username: e.target[0].value,
//                 email: e.target[1].value,
//                 password: e.target[2].value
//             })
//         }
//         const r = await fetch(`http://localhost:3001/auth/login`, options)
//         const data = await r.json()
//         console.log(data)
//         if (!data.success) { throw new Error('Login not authorised'); }
//         login(data.token);
//         console.log("SUCCCESS MY AMIGO")
//     } catch (err) {
//         console.warn(err);
//     }
// }

document.addEventListener("DOMContentLoaded", () =>{
    const loginForm = document.querySelector('#login');
    const createAccountForm = document.querySelector('#signup');

    document.querySelector('#linkCreateAccount').addEventListener('click', (e) =>{
        e.preventDefault();
        loginForm.classList.add('form--hidden');
        createAccountForm.classList.remove('form--hidden');
    })

    document.querySelector('#linkLogin').addEventListener('click', (e) =>{
        e.preventDefault();
        loginForm.classList.remove('form--hidden');
        createAccountForm.classList.add('form--hidden');
    })

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        try {
            console.log("123")
            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: e.target[0].value,
                    password: e.target[1].value
                })
            }
            const r = await fetch(`http://localhost:3001/auth/login`, options)
            const data = await r.json()
            console.log(data)
            // const data_stringify = JSON.parse(data.err)
            // console.log(data_stringify)
            console.log("21")
            if (data.err) {
                 console.log("INSIDE ERROR")
                 const data_stringify = JSON.parse(JSON.stringify(data));
                 console.log(data_stringify)
                 console.log("BEFORE SIUU")
                 if(data_stringify.err == "No user with this email"){
                    console.log("SIUU")
                    setFormMessage(loginForm, 'error', 'No user with this email', 'red')
                }
                else if(data_stringify.err == "Incorrect password"){
                    console.log("SIUU")
                    setFormMessage(loginForm, 'error', 'Incorrect password', 'red')
                }
            }
        
            console.log("******")
            console.log(data)
            console.log("******")
            if (!data.success) { throw new Error('Login not authorised'); }
            login(data.token);
            setFormMessage(loginForm, 'error', 'Successful', 'green')
            setTimeout(()=>{
                location.assign('track.html')
            }, 3000);

        } catch (err) {
            console.log(err)
            console.warn(err);
            // setFormMessage(loginForm, 'error', 'Invalid username/password combination')
        }
    });

    createAccountForm.addEventListener('submit', async (e) =>{
        e.preventDefault()
        try{
            console.log("ASDS")
            const email_input = e.target[0].value;
            const username_input = e.target[1].value;
            const password_input = e.target[2].value;
            const confirm_input = e.target[3].value;
            if (password_input !== confirm_input){
                setFormMessage(createAccountForm, 'error', 'Passwords must match', 'red')
                { throw Error("Passwords must match") }
            }
            const r = await fetch("http://localhost:3001/auth/register", {
            method: "POST",
            body: JSON.stringify({
                username: username_input,
                email: email_input,
                password: password_input
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
            });
            const data = await r.json()
            if (data.err){ throw Error(data.err) }
            console.log("success")
            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: email_input,
                    password: password_input
                })
            }
            const signin = await fetch(`http://localhost:3001/auth/login`, options)
            const data_login = await signin.json()
            console.log(data_login)
            login(data_login.token);
            setFormMessage(createAccountForm, 'error', 'Successful', 'green')
            setTimeout(()=>{
                location.assign('track.html')
            }, 3000);

        } catch (err) {
                console.warn(err);
    }
      });

    document.querySelectorAll('.form__input').forEach(inputElement =>{
        inputElement.addEventListener("blur", (e) =>{
            if (e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 10){
                setInputError(inputElement, "Username must be at least 10 characters in length");
            }
        })

        inputElement.addEventListener("input", (e) =>{
            clearInputError(inputElement);
        })
    })
})
