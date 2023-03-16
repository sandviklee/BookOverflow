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

## Typesense Setup

Install Docker

To start Typesense server

```sh
npm run typesense
```

If you get an error message, try starting Docker or checking if typesense is already running in Docker

To initialize Typesense server

```sh
npm run typesense-init
```

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
