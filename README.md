## About the project
Climatic is a monorepo app that shows the current weather data and weather forecast for next days. <br />
Created from scratch to participate in a [Hackathon](https://www.twitch.tv/videos/1488279878) hosted by [midudev](https://www.github.com/midudev) and [RapidAPI](https://rapidapi.com).

## 🛠️ Tech
- [fastify](https://github.com/fastify/fastify)
- [node-cache](https://github.com/node-cache/node-cache)
- [react](https://github.com/facebook/react)
- [vite](https://github.com/vitejs/vite)
- [chakra-ui](https://github.com/chakra-ui/chakra-ui)
- [zustand](https://github.com/pmndrs/zustand)
- [isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch)
- [typescript](https://github.com/microsoft/TypeScript)
- [eslint](https://github.com/eslint/eslint)
- [pnpm](https://github.com/pnpm/pnpm)

## ✨ Getting Started

### Clone the project using one of these ways:
1. [Fork](https://github.com/marsidev/climatic/fork) the repository

2. Clone the repository locally
```bash
git clone https://github.com/marsidev/climatic
cd climatic
```

### Install dependencies
```bash
pnpm install
```

### Set environment variables
Create an `.env` file in the root of your project and add the following values:
```bash
RAPIDAPI_KEY=
APP_URL=
```

To get your `RAPIDAPI_KEY` you need to subscribe to [weatherapi](https://rapidapi.com/weatherapi/api/weatherapi-com/). <br />
`APP_URL` is optional. If present, will be used as origin url for [cors](https://github.com/fastify/fastify-cors).

### Run the project
```bash
pnpm dev
```

Open [https://localhost:3000](https://localhost:3000) with your browser to see the result.

## 🚀 Preview
[Main link](https://climatic-production.up.railway.app) <br />
[Mirror link](https://climatic.onrender.com)

## 🤝 Contributing
Contributions, issues and feature requests are welcome!
Feel free to check [issues page](https://github.com/marsidev/climatic/issues).
