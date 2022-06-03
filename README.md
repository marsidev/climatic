## Climatic
Monorepo project that shows the current weather data and weather forecast for next 7 days. <br />
Created from scratch to participate in a 14-days hackathon hosted by [midudev](https://www.github.com/midudev).

## Hackathon
- The hackathon goal was build a weather web app (*mobile-first* or *mobile-only*) in two weeks using a weather API from [RapidAPI](https://rapidapi.com).
- It was announced in this [Twitch stream](https://www.twitch.tv/videos/1488279878) at **2022/05/19**.
- There was 38 project entries. The first 19 were reviewed at **2022/06/02** in this [Twitch stream](https://www.twitch.tv/videos/1315914232).
- Climatic was picked as the 4th best project in the first review, but was not elegible for any prize.
- The last commit before the project revision can be found [here](https://github.com/marsidev/climatic/tree/5d42530432663b8d30fe57047ee51e742d508851).

## 🚀 Preview
App preview before deadline and project review: <br />
<div style="display:flex; flex-direction:column; text-align:center; align-items:center; gap:1em;">
  <div style="display:flex; gap:1em; justify-content:center;">
    <img src="preview/preview-1.png" alt="Preview of Climatic on an iPhone 12 PRO MAX" width="35%"/>
    <img src="preview/preview-2.png" alt="Preview of Climatic on an iPad PRO 11" width="55%"/>
  </div>
  <img src="preview/preview-3.png" alt="Preview of Climatic on a Mackbook Air" width="90%"/>
</div>

- Screenshots provided by [webmobilefirst](https://www.webmobilefirst.com/en/).

### Links
<a href="https://climatic.onrender.com" target="_blank" title="Climatic">Demo</a>
<br />
<a href="https://climatic-production.up.railway.app" target="_blank" title="Climatic">Mirror</a>

## 🛠️ Tech
- [fastify](https://github.com/fastify/fastify)
- [node-cache](https://github.com/node-cache/node-cache)
- [react](https://github.com/facebook/react)
- [vite](https://github.com/vitejs/vite)
- [chakra-ui](https://github.com/chakra-ui/chakra-ui)
- [zustand](https://github.com/pmndrs/zustand)
- [swr](https://github.com/vercel/swr)
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

## 🤝 Contributing
Contributions, issues and feature requests are welcome!
Feel free to check [issues page](https://github.com/marsidev/climatic/issues).
