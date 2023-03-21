/* eslint-disable linebreak-style */
// Initialize Typesense, requires installing Typesense dependencies:
// https://github.com/typesense/typesense-js
const Typesense = require("typesense");

const functions = require("firebase-functions");

// Typesense API keys are stored in functions config variables
const TYPESENSE_ADMIN_API_KEY = "OVDlEoP7Ix6oaZ4LAYL7an7qRhJtREV9"; // we hardcode this shit bby
// const TYPESENSE_SEARCH_API_KEY = functions.config().typesense.search_api_key;

const typesenseURL = "TDT4140-29.idi.ntnu.no";
const typesensePort = "8108";
// const typesenseURLwithPort = new URL(typesensePort, typesenseURL);
// const typesenseHealth = "http://" + typesenseURL + ":" + typesensePort + "/health";

const client = new Typesense.Client({
  nodes: [
    {
      host: typesenseURL,
      port: typesensePort,
      protocol: "http",
    },
  ],
  apiKey: TYPESENSE_ADMIN_API_KEY,
  connectionTimeoutSeconds: 2,
});

exports.onBookCreate = functions.firestore
    .document("/books/{bookID}")
    .onCreate((snapshot, context) => {
    // Grab the document id as id value.
      const id = context.params.bookID;
      const {title, author, avgRating, genres, image_url, published} =
      snapshot.data();
      const document = {
        id,
        title,
        author,
        avgRating,
        genres,
        image_url,
        published,
      };

      // Index the document in books collection
      return client.collections("books").documents().create(document);
    });

exports.onBookUpdate = functions.firestore
    .document("books/{bookID}")
    .onUpdate((change, context) => {
    // Grab the changed value
      const {id, author, avgRating, genres, image_url, published} =
      change.after.data();
      const document = {id, author, avgRating, genres, image_url, published};
      return client.collections("books").documents(id).update(document);
    });

exports.onBookDelete = functions.firestore
    .document("books/{bookID}")
    .onDelete((snap, context) => {
    // Get the document id
      const id = context.params.bookID;

      return client.collections("books").documents(id).delete();
    });
