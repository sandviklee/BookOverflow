# BookOverflow

BookOverflow is a project aspiring to function as an all in one media- and infocenter for books. With a broad collection of metadata for books and authors, reviews by both proffesionals and common users, different lists and everything one could want to know about the subject of books.  

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/)

## Project Setup

Download Node.js

Open project in VSCode and run the following commands in the terminal:
```sh
npm install

npm ci
```

## Typesense

BookOverflow uses Typesense for search. Typesense can run as a local or remote server. Currently, we use the Virtual Machine at <http://TDT4140-29.idi.ntnu.no:8108> as our Typesense server.

### Typesense Setup

To initialize Typesense server.
Warning: this currently deletes the collections and fetches everything from Firestore again.

```sh
npm run typesense-init
```

### Typesense health check

Click here: <http://TDT4140-29.idi.ntnu.no:8108/health> to check the status of the Typesense server

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

## Unit testing/TDD with Vitest

[Guide](https://vitest.dev/guide/)

### Install Vitest

```sh
npm install -D vitest
```

### Run Vitest

```sh
npm test
```

or, run with fancy UI

```sh
npm run test-ui
```

or

```sh
npx vitest --ui 
```
