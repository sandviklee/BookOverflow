import Typesense from "typesense";

const typesense_client = new Typesense.Client({
  nodes: [
    {
      host: "localhost",
      port: "8108",
      protocol: "http",
    },
  ],
  apiKey: "gruppe29apikey",
  additionalSearchParameters: {
    query_by: "title,author",
  },
  connectionTimeoutSeconds: 2,
});

async function getTopList(number) {
  let searchParameters = {
    q: "*",
    query_by: "title",
    sort_by: "avgRating:desc",
    limit_hits: number,
  };

  await typesense_client
    .collections("books")
    .documents()
    .search(searchParameters)
    .then(function (searchResults) {
      console.log(searchResults);
    });
}
