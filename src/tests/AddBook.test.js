// import { db } from '../firebase/firebase.js'
// import { collection, query, where, getDocs, Timestamp } from "firebase/firestore";

const addBook = require('../javascripts/AddBook')

test('teste', () => {
  expect('data').toMatch(/data/)
  expect(addBook.addBook()).toBe(0)
})

//Bok mal
// const bookTemplate1 = {
//   title: "Matilda",
//   author: "Roald Dahl", //sjekker author mot database og henter id-en der
//   avgRating: 3,
//   awards: [],
//   blurb: "Matilda is a little girl who is far too good to be true. At age five-and-a-half she's knocking off double-digit multiplication problems and blitz-reading Dickens. Even more remarkably, her classmates love her even though she's a super-nerd and the teacher's pet. But everything is not perfect in Matilda's world.../n/nFor starters she has two of the most idiotic, self-centered parents who ever lived. Then there's the large, busty nightmare of a school principal, Miss ('The') Trunchbull, a former hammer-throwing champion who flings children at will, and is approximately as sympathetic as a bulldozer. Fortunately for Matilda, she has the inner resources to deal with such annoyances: astonishing intelligence, saintly patience, and an innate predilection for revenge.",
//   genres: ["Childrens", "Fiction", "Classics", "Fantasy", "Middle", 
//     "Grade", "Young", "Adult", "Humor", "Magic", "School"
//     ],
//   image_url: "",
//   published: Timestamp.fromDate(new Date("October 1, 1988"))

// }

// const authorTemplate1 = {
//   awards: [], //liste
//   books: [], //skal inneholde objekter
//   born: Timestamp.fromDate(new Date("September 13, 1916")),
//   name: {
//     first: "Roald",
//     last: "Dahl"
//   }
// }

// const authorTemplate2 = {
//   awards: [], //liste
//   books: [], //skal inneholde objekter (title og id)
//   born: Timestamp.fromDate(new Date("May 24, 1969")),
//   name: {
//     first: "Erlend",
//     last: "Loe"
//   }
// }



//query for å finne Matilda boken
// const queryMatilda = query(collection(db, "books"), 
//   where("title", "==", "Matilda"),
//   where("author", )
// );

// describe('MyBook', () => {
//   test.todo('Antall som heter Matilda av Roald Dahl == 1', () => {
//     //kjøre AddBook funksjonen med Matilda boken som input

//     //Hente bøker utifra queryMatilda
//     //count antall bøker som med title=Matilda og author=Roald Dahl
//   })

// })

// test('blir en book lagt til riktig i databasen', () => {
//   //kjør query mot databasen for å hente Matilda
  
//   //Tell hvor mange bøker som kom etter søket med count 
//   const  = await getCountFromServer(coll);




//     const q = query(collection(db, "cities"), where("capital", "==", true));
//     const querySnapshot = await getDocs(q);
//     querySnapshot.forEach((doc) => {
//     // doc.data() is never undefined for query doc snapshots
//     console.log(doc.id, " => ", doc.data());
//     });

//     const allBooks = doc(db, 'books');
//     const docSnap = await getDocs(allBooks);
// })



// const q = query(collection(db, "cities"), where("capital", "==", true));

// const querySnapshot = await getDocs(q);
// querySnapshot.forEach((doc) => {
//   // doc.data() is never undefined for query doc snapshots
//   console.log(doc.id, " => ", doc.data());
// });
