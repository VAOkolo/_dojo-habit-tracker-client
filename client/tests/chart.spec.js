const renderDOM = require ('./helpers')

let dom;
let document;

describe('index.html', () =>{
    beforeEach(async() =>{
        dom = await renderDOM('./client/index.html');
        document = await dom.window.document;
    })

    test('it has a form', () =>{
        let chartForm = document.querySelector('form');
        expect(chartForm).toBeTruthy()
        // expect(header.textContent).toContain('JavaScript in the Browser');
    })

    test('it has a submit button', () =>{
        let submitButton= document.querySelector('button');
        expect(submitButton).toBeTruthy()
        expect(submitButton.type).toEqual('submit')
        // expect(header.textContent).toContain('JavaScript in the Browser');
    })

    

})
