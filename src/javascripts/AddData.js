import

const oneBook = ref()

const oneBook = {
    title: "Hello world!",
    author: {
        id: "",
        name: ""
    },
    avgRating: 3,
    awards: [],
    blurb: "",
    genres: [],
    image_url: "",
    published: Timestamp.fromDate(new Date(""))

    booleanExample: true,
    numberExample: 3.14159265,
    dateExample: Timestamp.fromDate(new Date("December 10, 1815")),
    arrayExample: [5, true, "hello"],
    nullExample: null,
    objectExample: {
        a: 5,
        b: {
            nested: "foo"
        }
    }    
}

const oneAuthor = {
    id: "",
    name: {
        first: "",
        last: ""
    },
    books: [],
    born: Timestamp.fromDate(new Date("")),
    awards: []
}
await setDoc(doc(db, "data", "one"), docData);

