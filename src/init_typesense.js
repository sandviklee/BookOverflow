/* eslint-disable */

// Start Typesense server with `npm run typesenseServer`
// Then run `npm run populateTypesenseIndex` or `node populateTypesenseIndex.js`

const Typesense = require("typesense");
const collection = require("firebase/firestore");
const getDocs = require("firebase/firestore");

const initializeApp = require("firebase/app");
const getFirestore = require("firebase/firestore");

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

module.exports = (async () => {
  const typesense_client = new Typesense.Client({
    nodes: [
      {
        host: "localhost",
        port: "8108",
        protocol: "http",
      },
    ],
    apiKey: "gruppe29apikey",
  });

  const schema = {
    name: 'books',
    fields: [
      { name: 'title', type: 'string' },
      { name: 'authors', type: 'string[]', facet: true },

      { name: 'publication_year', type: 'int32', facet: true },
      { name: 'ratings_count', type: 'int32' },
      { name: 'average_rating', type: 'float', facet: true },

      // Only fields that need to be searched / filtered by need to be specified in the collection's schema
      // The documents you index can still contain other additional fields.
      //  These fields not mentioned in the schema, will be returned as is as part of the search results.
      // { name: 'image_url', type: 'string' },
    ],
    default_sorting_field: 'average_rating',
  };

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
      { name: "published", type: "object", facet: true },

      // Only fields that need to be searched / filtered by need to be specified in the collection's collection
      // The documents you index can still contain other additional fields.
      //  These fields not mentioned in the collection, will be returned as is as part of the search results.
      // { name: 'image_url', type: 'string' },
    ],
    default_sorting_field: "avgRating",
  };

  console.log("Populating index in Typesense");

  try {
    await typesense_client.collections("books").delete();
    console.log("Deleting existing collection: books");
  } catch (error) {
    // Do nothing
  }

  console.log("Creating collection: ");
  console.log(JSON.stringify(schema, null, 2));
  await typesense_client.collections().create(schema);

  console.log("Adding records: ");

  try {
    var fs = require("fs/promises");

    const querySnapshot = await getDocs.getDocs(
      collection.collection(db, "books")
    );

    querySnapshot.forEach((doc) => {

      let data = '{"title":' + doc.id + ',"authors":[' + doc.data().author.name + '],"publication_year": 2007,"id":"9999","average_rating":' + doc.data().avgRating + ',"image_url":""' + doc.data().image_url + ',"ratings_count:' + 1000000 + '}';
      const book = {
        id: doc.id,
        title: doc.data().title,
        author: doc.data().author,
        avgRating: doc.data().avgRating,
        genres: doc.data().genres,
        image_url: doc.data().image_url,
        published: doc.data().published,
      };
      fs.appendFile(
        "data/firebasebooks.jsonl",
        JSON.stringify(book) + "\n",
        function (err) {
          if (err) {
            console.log(err);
          }
        }
      );
      console.log("HEI JON ANTA");
    });

    const booksInJsonl = await fs.readFile("./data/books.jsonl"); // bytt ut med Firestore read

    // console.log(booksInJsonl)

    const returnData = await typesense_client
      .collections("books")
      .documents()
      .import(booksInJsonl, {action: 'upsert'});
    // console.log(returnData);
    console.log("Done indexing.");

    var lines = returnData.split("\n");
    var wrapped = "[" + lines.join(",") + "]";
    var returnObject = JSON.parse(wrapped);
    // console.log(returnObject);

    const failedItems = returnObject.filter((item) => item.success === false);
    if (failedItems.length > 0) {
      throw new Error(
        `Error indexing items ${JSON.stringify(failedItems, null, 2)}`
      );
    }

    return returnData;
  } catch (error) {
    console.log(error);
  }
})();
