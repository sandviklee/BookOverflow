/* eslint-disable */

// Start Typesense server with `npm run typesenseServer`
// Then run `npm run populateTypesenseIndex` or `node populateTypesenseIndex.js`


const Typesense = require('typesense');

module.exports = (async () => {
  

  const typesense_client = new Typesense.Client({
    nodes: [
      {
        host: 'localhost',
        port: '8108',
        protocol: 'http',
      },
    ],
    apiKey: 'gruppe29apikey',
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

  console.log('Populating index in Typesense');

  try {
    await typesense_client.collections('books').delete();
    console.log('Deleting existing collection: books');
  } catch (error) {
    // Do nothing
  }

  console.log('Creating schema: ');
  console.log(JSON.stringify(schema, null, 2));
  await typesense_client
    .collections()
    .create(schema);

  console.log('Adding records: ');

  try {
    var fs = require('fs/promises');

    const booksInJsonl = await fs.readFile('./data/books.jsonl');
    const returnData = await typesense_client
      .collections('books')
      .documents()
      .import(booksInJsonl);
    // console.log(returnData);
    console.log('Done indexing.');

    var lines = returnData.split('\n');
    var wrapped = "[" + lines.join(',') + "]";
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
