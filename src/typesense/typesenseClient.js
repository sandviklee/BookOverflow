// import Typesense from "typesense";
import Typesense from "typesense"

export const adminKey = "OVDlEoP7Ix6oaZ4LAYL7an7qRhJtREV9";

const typesenseURL = "TDT4140-29.idi.ntnu.no";
const typesensePort = "8108";
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
      host: typesenseConfig.typesenseURL,
      port: typesenseConfig.typesensePort,
      protocol: "http",
    },
  ],
  apiKey: typesenseConfig.searchKey,
  additionalSearchParameters: {
    query_by: "title,author",
  },
  connectionTimeoutSeconds: 2,
});

export async function useTopList(number) {
  let searchParameters = {
    q: "*",
    query_by: "title",
    sort_by: "avgRating:desc",
    limit_hits: number,
  };
  result = await listClient
    .collections("books")
    .documents()
    .search(searchParameters)
    .then(function (searchResults) {
      console.log(searchResults);
    });
    return { result }
}
