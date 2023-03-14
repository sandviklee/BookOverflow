// import { db } from '../firebase/firebase.js'
// import { collection, query, where, getDocs } from 'firebase/firestore'
// import { bookFields, authorFields, reviewFields, errorMessage } from '../javascripts/AddData.js'

const AddData = require('../javascripts/AddData')
const authorCollection = ''
const correctBookObject = ''

test('incorrect collection for book', () => {
    //validate returnerer 0
    expect(AddData.validateData(authorCollection, correctBookObject)).toBe(0)
    //sjekk at error message
    expect(AddData.errorMessage).toMatch(/Wrong collection for a book/)
})

// test('incorrect fields in book object', () => {
//     //validate returnerer 0
//     expect(validateData(bookCollection, incorrectBookObject)).toBe(0)
//     //sjekk at error message
//     expect(errorMessage).toMatch(/Wrong collection for a book/)
// })

// test('args equal null', () => {
//     //validate returnerer 0
//     expect(validateData("", "")).toBe(0)
//     //sjekk at error message
//     expect(errorMessage).toMatch(/Wrong collection for a book/)
// })

// test('check correct book data and return 1', () => {
//     //validate returnerer 1
//     expect(validateData(bookCollection, correctBookObject)).toBe(1)
//     //errorMessage skal være tom
//     expect(errorMessage).toHaveLength(0)
// })