const renderDom = require('./helpers')

let dom;
let document;


describe('index.html', () => {
    beforeEach( async () => {
        dom = await renderDom('client/track.html')
        document = await dom.window.document;
    })

    test('it has a form for adding habits', () => {
        let form = document.getElementById('habit-form')
        // console.log(header)
        expect(form).toBeTruthy()
    })

    test('has list of habits that can be deleted', () => {
        let li = document.getElementById('habit-delete-container')
        expect(li).toBeTruthy()
    })

    test('main container for calendar', () => {
        let container = document.getElementById('container')
        expect(container).toBeTruthy()
    })

    test('main container for calendar', () => {
        let title = document.querySelector('title')
        expect(title.textContent).toEqual('Calendar App Vanilla JS')
    })

})
