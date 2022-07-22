const renderDOM = require ('./helpers')

let dom;
let document;


const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

describe('index.html', () =>{
    beforeEach(async() =>{
        dom = await renderDOM('./client/index.html');
        document = await dom.window.document;
    })

    test('it has a form', () =>{
        let loginForm = document.querySelector('form');
        expect(loginForm).toBeTruthy()
        // expect(header.textContent).toContain('JavaScript in the Browser');
    })

    test ('it has an input for email at login' ,() =>{
        let inputEmail = document.querySelector("#loginEmail")
        expect(inputEmail).toBeTruthy()
    })

    test ('it has an input for email at login' ,() =>{
        let inputPassword = document.querySelector("#loginPassword")
        expect(inputPassword).toBeTruthy()
    })

    test ('it has an input for email at signup' ,() =>{
        let inputEmail = document.querySelector("#signupEmail")
        expect(inputEmail).toBeTruthy()
    })

    test ('it has an input for password at signup' ,() =>{
        let inputPassword = document.querySelector("#signupPassword")
        expect(inputPassword).toBeTruthy()
    })

    test ('it has an input for confirming password at signup' ,() =>{
        let inputConfirm = document.querySelector("#confirmPassword")
        expect(inputConfirm).toBeTruthy()
    })

    test ('it has an input for username at signup' ,() =>{
        let inputUsername = document.querySelector("#signupUsername")
        expect(inputUsername).toBeTruthy()
    })

    test ('form has a submit button', () =>{
        let submit = document.querySelector(".form__button")
        expect(submit).toBeTruthy()
    })

    test('renderLoginForm', () => {
        const h1 = document.querySelector('h1')
        expect(h1.textContent).toBe('Login')
    })


    test('it returns an error message when email is not in the mongodb database', () =>{
        const form = document.querySelector('#login')
        const message = document.querySelector('.form__message')
        const emailInput = document.querySelector('#loginEmail')
        emailInput.value = 'dojo1@getgmail.com'
        form.dispatchEvent(new dom.window.Event('submit'))
        expect(message.innerHTML).toContain('No user with this email')
    })

    test('it returns a error message when password and confirm password do not match', () =>{
        const form = document.querySelector('#signup')
        const message = document.querySelector('.form__message')
        console.log(message)
        const passwordInput = document.querySelector('#signupPassword')
        const confirmInput = document.querySelector('#confirmPassword')
        passwordInput.value = '123'
        confirmInput.value = '1234'
        form.dispatchEvent(new dom.window.Event('submit'))
        const message2 = document.querySelector('.form__message')
        console.log(message)
        expect(message2.innerHTML).toContain('Passwords must match')
    })

    describe('test event listener', () => {
    let sut;
    let events ={};
    beforeEach(() => {
        sut = new Dependency();
        events = {}
        document.addEventListener = jest.fn((event, callback) => {
            events[event] = callback;
    });
    
    document.removeEventListener = jest.fn((event, callback) => {
            delete events[event];
    });
    })
    test("It should pass", () => {
        const instanceMock = jest.spyOn(sut, "loaded");
        document.addEventListener = jest
            .fn()
            .mockImplementationOnce((event, callback) => {
            callback();
            });
        sut.setupEvents();
        expect(document.addEventListener).toBeCalledWith(
            "click",
            expect.any(Function)
        );
        expect(instanceMock).toBeCalledTimes(1);
    });
});
})
