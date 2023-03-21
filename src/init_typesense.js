/* eslint-disable */

// Start Typesense server with `npm run typesenseServer`
// Then run `npm run populateTypesenseIndex` or `node populateTypesenseIndex.js`

const Typesense = require("typesense");
const collection = require("firebase/firestore");
const getDocs = require("firebase/firestore");

const initializeApp = require("firebase/app");
const getFirestore = require("firebase/firestore");
// const { typesenseConfig } = require("./typesense/typesenseClient");

const adminKey = "OVDlEoP7Ix6oaZ4LAYL7an7qRhJtREV9";
const typesenseURL = "TDT4140-29.idi.ntnu.no";
const typesensePort = 8108;
const typesenseURLwithPort = typesenseURL + ":" + typesensePort;
const typesenseHealth = "http://TDT4140-29.idi.ntnu.no:8108/health";
const searchKey = "eJ1tiTcH7NFixXyUONF0rEsQHQPpI62R";

const firebaseConfig = {
  apiKey: "AIzaSyBcPMAVJdmJ3yWADip0ymhN1VatVjUOuZE",
  authDomain: "bookoverflow-561d1.firebaseapp.com",
  projectId: "bookoverflow-561d1",
  storageBucket: "bookoverflow-561d1.appspot.com",
  messagingSenderId: "948092198327",
  appId: "1:948092198327:web:a5cf5eadb4623626671c32",
  measurementId: "G-YW0HE6YYVP",
};
// Initialize Firebase
const app = initializeApp.initializeApp(firebaseConfig);
const db = getFirestore.getFirestore(app);

// Set this to true to reset - deletes collections
const resetFlag = true;

module.exports = (async () => {
  const typesenseAdminClient = new Typesense.Client({
    nodes: [
      {
        host: "TDT4140-29.idi.ntnu.no",
        port: 8108,
        protocol: "http",
      },
    ],
    apiKey: "h2SvzHG1U9QFjxM8jNctIxgzfvshec3e479zdsjaDzdNfR8t",
  });

  console.log("Checking server health", typesenseHealth);
  const healthResponse = await typesenseAdminClient.health.retrieve();
  console.log(healthResponse);

  const bookCollection = {
    name: "books",
    enable_nested_fields: true,
    fields: [
      { name: "id", type: "string" },
      { name: "title", type: "string", facet: true },
      { name: "author", type: "object", facet: true },
      { name: "avgRating", type: "float" },
      { name: "genres", type: "string[]", facet: true, optional: true },
      { name: "image_url", type: "string", index: false, optional: true },
      { name: "published", type: "int32", facet: true },

      // Only fields that need to be searched / filtered by need to be specified in the collection's collection
      // The documents you index can still contain other additional fields.
      //  These fields not mentioned in the collection, will be returned as is as part of the search results.
      // { name: 'image_url', type: 'string' },
    ],
    default_sorting_field: "avgRating",
  };

  const authorsCollection = {
    name: "authors",
    enable_nested_fields: true,
    fields: [
      { name: "id", type: "string" },
      { name: "name", type: "string", facet: true },

      { name: "books", type: "object[]", facet: true },
      { name: "image_url", type: "string", index: false, optional: true },
      { name: "born", type: "int32", facet: true },

      // Only fields that need to be searched / filtered by need to be specified in the collection's collection
      // The documents you index can still contain other additional fields.
      //  These fields not mentioned in the collection, will be returned as is as part of the search results.
      // { name: 'image_url', type: 'string' },
    ],
    default_sorting_field: "born",
  };

  // console.log("Populating index in Typesense");

  if (resetFlag) {
    try {
      await typesenseAdminClient.collections("books").delete();
      console.log("Deleting existing collection: books");
      await typesenseAdminClient.collections("authors").delete();
      console.log("Deleting existing collection: authors");
    } catch (error) {
      // Do nothing
      console.error(error);
    }
  }

  try {
    console.log("Creating collection: ", bookCollection.name);
    let response = await typesenseAdminClient
      .collections()
      .create(bookCollection);
    console.log(response.name);
  } catch (error) {
    console.error(error);
  }
  try {
    console.log("Creating collection: ", authorsCollection.name);
    let response = await typesenseAdminClient
      .collections()
      .create(authorsCollection);
    console.log(response.name);
  } catch (error) {
    console.error(error);
  }

  try {
    console.log("Adding records: ");
    // var fs = require("fs/promises");

    const querySnapshotBooks = await getDocs.getDocs(
      collection.collection(db, "books")
    );
    // console.log(querySnapshotBooks)
    let bookDocuments = [];
    querySnapshotBooks.forEach((doc) => {
      // let data = "{ id: " + doc.id + " }\n";
      const book = {
        id: doc.id,
        title: doc.data().title,
        author: doc.data().author,
        avgRating: doc.data().avgRating,
        genres: doc.data().genres,
        image_url: doc.data().image_url,
        published: doc.data().published.seconds,
      };
      bookDocuments.push(book);
    });
    const querySnapshotAuthors = await getDocs.getDocs(
      collection.collection(db, "author")
    );
    // console.log(querySnapshotAuthors)
    let authorDocuments = [];
    querySnapshotAuthors.forEach((doc) => {
      // let data = "{ id: " + doc.id + " }\n";
      // console.log(doc.data().born);
      const author = {
        id: doc.id,
        name: doc.data().name,
        books: doc.data().books,
        image_url: doc.data().image_url,
        born: doc.data().born.seconds,
      };
      // console.log("Adding author ", author);
      authorDocuments.push(author);
    });
    // console.log(authorDocuments);
    // const booksInJsonl = await fs.readFile("./data/firebasebooks.jsonl"); // bytt ut med Firestore read

    // console.log(booksInJsonl)

    const returnDataBooks = await typesenseAdminClient
      .collections("books")
      .documents()
      .import(bookDocuments, { action: "upsert" });
    console.log("Done indexing books.");
    // console.log(returnDataBooks);
    // var linesBooks = returnDataBooks.split("\n");
    // var wrappedBooks = "[" + linesBooks.join(",") + "]";
    // var returnObjectBooks = JSON.parse(wrappedBooks);
    // console.log(returnObject);

    let failedBooks = returnDataBooks.filter((item) => item.success === false);
    if (failedBooks.length > 0) {
      throw new Error(
        `Error indexing books ${JSON.stringify(failedBooks, null, 2)}`
      );
    } else {
      console.log("Success")
    }
    const returnDataAuthors = await typesenseAdminClient
      .collections("authors")
      .documents()
      .import(authorDocuments, { action: "upsert" });
    console.log("Done indexing authors.");
    // console.log(returnDataAuthors);

    // var lines = returnDataAuthors.split("\n");
    // var wrapped = "[" + lines.join(",") + "]";
    // var returnObjectAuthors = JSON.parse(wrapped);
    // console.log(returnObject);

    let failedAuthors = returnDataAuthors.filter(
      (item) => item.success === false
    );
    if (failedAuthors.length > 0) {
      throw new Error(
        `Error indexing authors ${JSON.stringify(failedAuthors, null, 2)}`
      );
    } else {
      console.log("Success")
    }

    // return returnData;
  } catch (error) {
    console.log(error);
    console.log(error.importResults);
  }
})();
