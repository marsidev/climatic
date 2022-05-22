## Definition
This is a [React](https://github.com/facebook/react) full-stack monorepo starter project which uses [Typescript](https://www.typescriptlang.org), [Vite](https://github.com/vitejs/vite), and [Fastify](https://github.com/fastify/fastify). Also uses [pnpm](https://pnpm.js.org/) as package manager.

## Getting Started
```bash
pnpm install
pnpm start
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
You can start editing the page by modifying `packages/client/src/App.tsx`.
A sample API route can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `packages/server/src/controllers/hello.ts`.

## Packages
The following packages are used in this project:
- Server:
  - [fastify v3](https://github.com/fastify/fastify)
  - [ts-node-dev](https://github.com/wclr/ts-node-dev)
  - [dotenv](https://github.com/motdotla/dotenv)
  - [cross-env](https://github.com/kentcdodds/cross-env)
 
- Client:
  - [react v18.1](https://github.com/facebook/react)
  - [vite v2.9](https://github.com/vitejs/vite)
  - [chakra-ui v2.0](https://github.com/chakra-ui/chakra-ui)
  - [isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch)

## Deploy
This project can be deployed to [Railway](https://railway.app) or any other platform which support NodeJS projects.
On production, the main entry point is the server `index.ts` which serves the client build using `@fastify/static`.

## Demo
[Railway demo](https://vite-fastify-starter-production.up.railway.app)