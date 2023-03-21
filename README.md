# BookOverflow

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
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

[Click here]<http://TDT4140-29.idi.ntnu.no:8108/health> to check the status of the Typesense server

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
