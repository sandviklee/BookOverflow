// import Typesense from "typesense";
import Typesense from "typesense"
import { db } from "../firebase/firebase";
import { getDocs, collection } from "@firebase/firestore";

export const adminKey = "OVDlEoP7Ix6oaZ4LAYL7an7qRhJtREV9";

const typesenseURL = "TDT4140-29.idi.ntnu.no";
const typesensePort = 8108;
const typesenseURLwithPort = "http://TDT4140-29.idi.ntnu.no:8108";
const typesenseHealth = "http://TDT4140-29.idi.ntnu.no:8108/health";
const searchKey = "eJ1tiTcH7NFixXyUONF0rEsQHQPpI62R";

export const typesenseConfig = {
  searchKey: searchKey,
  url: typesenseURL,
  port: typesensePort,
  urlWithPort: typesenseURLwithPort,
  healthURL: typesenseHealth,
};

export const listClient = new Typesense.Client({
  nodes: [
    {
      host: typesenseURL,
      port: typesensePort,
      protocol: "http",
    },
  ],
  apiKey: searchKey,
  additionalSearchParameters: {
    query_by: "title,author",
  },
  connectionTimeoutSeconds: 2,
});

function extractDocuments(result) {
  let output = []
  result.forEach(element => {
    output.push(element.document)
  });
  return output
}

export async function useClientCheckHealth() {
  const health = await listClient.health.retrieve()
  return health.ok
}

export async function useBookList(number, query, sort) {
  let searchParameters = {
    q: "*",
    query_by: query,
    sort_by: sort,
    limit_hits: number,
  };
  result = await listClient
    .collections("books")
    .documents()
    .search(searchParameters)
    .then(function (searchResults) {
      console.log(searchResults);
    });
    const hits = extractDocuments(result.hits)
    return { hits }
}

export async function useBookTopList(number) {
  let searchParameters = {
    q: "*",
    query_by: "title",
    sort_by: "avgRating:desc",
    limit_hits: number,
  };
  const result = await listClient
    .collections("books")
    .documents()
    .search(searchParameters)
    // .then(function (searchResults) {
    //   console.log(searchResults);
    // });
    const hits = extractDocuments(result.hits)
    return { hits }
}

export async function useTypesenseUpdate() {
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
}
