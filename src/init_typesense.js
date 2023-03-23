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
const resetFlag = false;
const createCollectionsFlag = false;

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
  if (createCollectionsFlag) {
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

    const combinedCollection = {
      name: "combined",
      enable_nested_fields: true,
      fields: [
        // Common fields
        { name: "id", type: "string" },
        { name: "type", type: "string", facet: true }, // Type of record
        { name: "image_url", type: "string", index: false, optional: true },
        { name: "avgRating", type: "float" },

        // Book fields
        { name: "title", type: "string", facet: true, optional: true },
        { name: "author", type: "object", facet: true, optional: true },
        { name: "genres", type: "string[]", facet: true, optional: true },
        { name: "published", type: "int32", facet: true, optional: true },

        // Author fields
        { name: "name", type: "string", facet: true, optional: true },
        { name: "books", type: "object[]", facet: true, optional: true },
        { name: "born", type: "int32", optional: true },

        // Only fields that need to be searched / filtered by need to be specified in the collection's collection
        // The documents you index can still contain other additional fields.
        //  These fields not mentioned in the collection, will be returned as is as part of the search results.
        // { name: 'image_url', type: 'string' },
      ],
      default_sorting_field: "avgRating",
    };
  }
    // console.log("Populating index in Typesense");

    if (resetFlag) {
      try {
        await typesenseAdminClient.collections("books").delete();
        console.log("Deleting existing collection: books");
      } catch (error) {
        // Do nothing
        console.error(error);
      }
      try {
        await typesenseAdminClient.collections("authors").delete();
        console.log("Deleting existing collection: authors");
      } catch (error) {
        console.error(error);
      }
      try {
        await typesenseAdminClient.collections("combined").delete();
        console.log("Deleting existing collection: combined");
      } catch (error) {
        console.error(error);
      }
    }

    // try {
    //   console.log("Creating collection: ", bookCollection.name);
    //   let response = await typesenseAdminClient
    //     .collections()
    //     .create(bookCollection);
    //   console.log(response.name);
    // } catch (error) {
    //   console.error(error);
    // }
    // try {
    //   console.log("Creating collection: ", authorsCollection.name);
    //   let response = await typesenseAdminClient
    //     .collections()
    //     .create(authorsCollection);
    //   console.log(response.name);
    // } catch (error) {
    //   console.error(error);
    // }
    if(createCollectionsFlag) {
    try {
      console.log("Creating collection: ", combinedCollection.name);
      let response = await typesenseAdminClient
        .collections()
        .create(combinedCollection);
      console.log(response.name);
    } catch (error) {
      console.error(error);
    }
  }
  try {
    console.log("Adding records: ");
    // var fs = require("fs/promises");

    const querySnapshotBooks = await getDocs.getDocs(
      collection.collection(db, "books")
    );
    const querySnapshotAuthors = await getDocs.getDocs(
      collection.collection(db, "author")
    );
    // console.log(querySnapshotBooks)
    let combinedDocuments = [];
    // let bookDocuments = [];
    querySnapshotBooks.forEach((doc) => {
      // let data = "{ id: " + doc.id + " }\n";
      const book = {
        id: doc.id,
        type: "book",
        title: doc.data().title,
        author: doc.data().author,
        avgRating: doc.data().avgRating,
        genres: doc.data().genres,
        image_url: doc.data().image_url,
        published: doc.data().published.seconds,
      };
      combinedDocuments.push(book);
      // bookDocuments.push(book);
    });
    // console.log(querySnapshotAuthors)
    let authorDocuments = [];
    querySnapshotAuthors.forEach((doc) => {
      // let data = "{ id: " + doc.id + " }\n";
      // console.log(doc.data().born);
      const author = {
        id: doc.id,
        type: "author",
        avgRating: doc.data().avgRating,
        name: doc.data().name,
        books: doc.data().books,
        image_url: doc.data().image_url,
        born: doc.data().born.seconds,
      };
      // console.log("Adding author ", author);
      combinedDocuments.push(author);
      // authorDocuments.push(author);
    });
    // console.log(authorDocuments);
    // const booksInJsonl = await fs.readFile("./data/firebasebooks.jsonl"); // bytt ut med Firestore read

    // console.log(booksInJsonl)

    // const returnDataBooks = await typesenseAdminClient
    //   .collections("books")
    //   .documents()
    //   .import(bookDocuments, { action: "upsert" });
    // console.log("Done indexing books.");
    // console.log(returnDataBooks);
    // var linesBooks = returnDataBooks.split("\n");
    // var wrappedBooks = "[" + linesBooks.join(",") + "]";
    // var returnObjectBooks = JSON.parse(wrappedBooks);
    // console.log(returnObject);

    // let failedBooks = returnDataBooks.filter((item) => item.success === false);
    // if (failedBooks.length > 0) {
    //   throw new Error(
    //     `Error indexing books ${JSON.stringify(failedBooks, null, 2)}`
    //   );
    // } else {
    //   console.log("Success");
    // }
    // const returnDataAuthors = await typesenseAdminClient
    //   .collections("authors")
    //   .documents()
    //   .import(authorDocuments, { action: "upsert" });
    // console.log("Done indexing authors.");
    const returnDataCombined = await typesenseAdminClient
      .collections("combined")
      .documents()
      .import(combinedDocuments, { action: "upsert" });
    console.log("Done indexing combined documents.");
    // console.log(returnDataAuthors);

    // var lines = returnDataAuthors.split("\n");
    // var wrapped = "[" + lines.join(",") + "]";
    // var returnObjectAuthors = JSON.parse(wrapped);
    // console.log(returnObject);

    let failedCombined = returnDataCombined.filter(
      (item) => item.success === false
    );
    if (failedCombined.length > 0) {
      throw new Error(
        `Error indexing authors ${JSON.stringify(failedCombined, null, 2)}`
      );
    } else {
      console.log("Success");
    }

    // return returnData;
  } catch (error) {
    console.error(error);
    console.error(error.importResults);
  }
})();
