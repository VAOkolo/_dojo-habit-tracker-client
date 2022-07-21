const renderDom = require('./helpers')

let dom;
let document;


describe('index.html', () => {
    beforeEach( async () => {
        dom = await renderDom('client/viewnotes.html')
        document = await dom.window.document;
    })

    test('it has a form for adding habits', () => {
        let form = document.getElementById('note-form')
        // console.log(header)
        expect(form).toBeTruthy()
    })

    test('has list of habits that can be deleted', () => {
        let container = document.getElementById('note-container')
        expect(container).toBeTruthy()
    })

})
