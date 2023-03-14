// import { db } from '../firebase/firebase.js'
// import { collection, query, where, getDocs } from "firebase/firestore";
// import { ref } from 'vue'

//mal for fields i collections
// const bookFields = ref(['author', 'avgRating', 'awards', 'blurb', 'genres', 'image_url', 'published', 'title'])
// const authorFields = ref(['awards', 'books', 'name'])
// const reviewFields = ref([])

let errorMessage = 'Wrong collection for a book'
module.exports.errorMessage = errorMessage

module.exports.validateData = function validateData(oneCollection, dataObject) {
    //Sjekke oneCollection name mot databasen
    console.log(typeof oneCollection)
    console.log(typeof dataObject)
    console.log(typeof errorMessage)
    //Sjekke at dataObject inneholder alle fields i oneCollection
    return 0
}



//exporterer for å bruke dem i AddData.test også
// export {
//     bookFields,
//     authorFields,
//     reviewFields,
//     errorMessage
// }

// const oneBook = {
//     title: "Hello world!",
//     author: {
//         id: "",
//         name: ""
//     },
//     avgRating: 3,
//     awards: [],
//     blurb: "",
//     genres: [],
//     image_url: "",
//     published: Timestamp.fromDate(new Date(""))

//     booleanExample: true,
//     numberExample: 3.14159265,
//     dateExample: Timestamp.fromDate(new Date("December 10, 1815")),
//     arrayExample: [5, true, "hello"],
//     nullExample: null,
//     objectExample: {
//         a: 5,
//         b: {
//             nested: "foo"
//         }
//     }    
// }

// const oneAuthor = {
//     id: "",
//     name: {
//         first: "",
//         last: ""
//     },
//     books: [],
//     born: Timestamp.fromDate(new Date("")),
//     awards: []
// }
// await setDoc(doc(db, "data", "one"), docData);

