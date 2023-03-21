// import Typesense from "typesense";
import Typesense from "typesense"

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
