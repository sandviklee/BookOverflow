
//Skl
//B25.1 Lag krav og tester for valideringsfunksjonen. -input fra bruker -validering -output til firestore
//Lage en test som tester en funksjon som sjekker 

/*
Lage en test som sjekker at en funksjon klarer å
sjekke at data er på riktig format og slikt
Krav:
- Alle fields må fylles ut for collection man skal
legge noe til i databasen
- Data som legges til må ha riktig data type for
at all data skal legges inn i databasen
- 

*/
import { db } from '../firebase/firebase.js'
import { collection, query, where, getDocs } from "firebase/firestore";

//Bok mal
const bookTemplate = {
  title: "Matilda",
  author: {
    id: "",
    name: "Roald Dahl"
  },
  avgRating: 3,
  awards: [],
  blurb: "Matilda is a little girl who is far too good to be true. At age five-and-a-half she's knocking off double-digit multiplication problems and blitz-reading Dickens. Even more remarkably, her classmates love her even though she's a super-nerd and the teacher's pet. But everything is not perfect in Matilda's world.../n/nFor starters she has two of the most idiotic, self-centered parents who ever lived. Then there's the large, busty nightmare of a school principal, Miss ("The") Trunchbull, a former hammer-throwing champion who flings children at will, and is approximately as sympathetic as a bulldozer. Fortunately for Matilda, she has the inner resources to deal with such annoyances: astonishing intelligence, saintly patience, and an innate predilection for revenge.",
  genres: ["Childrens", "Fiction", "Classics", "Fantasy", "Middle", 
    "Grade", "Young", "Adult", "Humor", "Magic", "School"
    ],
  image_url: "",
  published: Timestamp.fromDate(new Date("October 1, 1988"))

}

//query for å finne Matilda boken
const queryMatilda = query(collection(db, "books"), 
  where("title", "==", "Matilda"),
  where("author", )
);

describe('MyBook', () => {
  test.todo('Antall som heter Matilda av Roald Dahl == 1', () => {
    //kjøre AddBook funksjonen med Matilda boken som input

    //Hente bøker utifra queryMatilda
    //count antall bøker som med title=Matilda og author=Roald Dahl
  })

})
test('blir en book lagt til riktig i databasen', () => {
  //kjør query mot databasen for å hente Matilda
  
  //Tell hvor mange bøker som kom etter søket med count 
  const  = await getCountFromServer(coll);




    const q = query(collection(db, "cities"), where("capital", "==", true));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
    });

    const allBooks = doc(db, 'books');
    const docSnap = await getDocs(allBooks);
})



const q = query(collection(db, "cities"), where("capital", "==", true));

const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
});

//B25.2 Lag valideringsfunksjon

//B25.A - Når en bruker med riktig tilgang prøver å legge til data med 
//feil oppsett vil den få feilmelding og data blir 
//ikke lagt til, mens data med riktig oppsett 
//blir lagt inn i databasen