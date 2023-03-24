# BookOverflow

BookOverflow is a project aspiring to function as an all in one media- and infocenter for books. With a broad collection of metadata for books and authors, reviews by both proffesionals and common users, different lists and everything one could want to know about the subject of books.  

## Recommended IDE Setup

We at BookOverflow Recommend using Visual studio code while opening the project.
Click here to read: [VSCode](https://code.visualstudio.com/)

## Project Setup

-   Download Node.js

Open project in VSCode and run the following commands in the terminal:
```sh
npm install

npm ci
```

## Typesense

Warning: To see the searchbox and use typesense on the application, you need to be on the NTNU network. 
This can be achieved by being on the network or using a VPN.

BookOverflow uses Typesense for search. Typesense can run as a local or remote server. Currently, we use the Virtual Machine at <http://TDT4140-29.idi.ntnu.no:8108> as our Typesense server.

##### Typesense Setup

To initialize Typesense server.
Warning: this currently deletes the collections and fetches everything from Firestore again.

```sh
npm run typesense-init
```

##### Typesense health check

Our typesense server needs to be checked regularly:
Click here: [TypesenseHealthCheck](http://TDT4140-29.idi.ntnu.no:8108/health), to check the status of the Typesense server

## Compile and run the Project

To compile and run our project:
```sh
npm run dev
```

## Compile and build the Project

To compile and build our project:
```sh
npm run build
```

## Unit testing/TDD with Vitest

To test our project, we use Vitest.
Learn about Vitest here:

[Guide](https://vitest.dev/guide/)

##### Install Vitest

How to install:
```sh
npm install -D vitest
```

##### Run Vitest

How to run vitest:
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
