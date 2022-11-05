interface ResponseData {
	ping: string
}

export const config = {
	runtime: 'experimental-edge'
}

const handler = (req: Request) => {
	// res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=86400')
	// return res.status(200).json({ hello: 'vercel' })
	return new Response(`Hello, from ${req.url} I'm now an Edge Function!`)
}

export default handler
