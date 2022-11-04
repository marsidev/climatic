import { beforeAll, describe, expect, test } from 'vitest'
import { App } from '@components'
import { cleanup, render, resetDom, screen, waitFor } from '../helpers'

beforeAll(() => {
	resetDom()
	cleanup()
	render(<App />)
})

test('The skeleton layout is not in the DOM (data loaded)', async () => {
	await waitFor(() => {
		expect(document.querySelector('.app-skeleton')).toBeNull()
	})
})

describe.concurrent('Sections', () => {
	test('DOM has a <nav /> element', () => {
		const el = screen.getByRole('navigation')
		expect(el).toBeDefined()
	})

	test('DOM has a <header /> element', () => {
		const el = screen.getByRole('banner')
		expect(el).toBeDefined()
	})

	test('DOM has #location-name', () => {
		const el = document.querySelector('#location-name')
		expect(el).toBeDefined()

		const text = el?.textContent
		expect(text).toBe('Barcelona, 🇪🇸')
	})

	test('DOM show the current temperature', () => {
		const el = document.querySelector('#temperature')
		expect(el).toBeDefined()
	})

	test('DOM has #weather-data-stack', () => {
		const el = document.querySelector('#weather-data-stack')
		expect(el).toBeDefined()
	})

	test('DOM has #forecast-section', () => {
		const el = document.querySelector('#forecast-section')
		expect(el).toBeDefined()
	})

	test('DOM has #astro-section', () => {
		const el = document.querySelector('#astro-section')
		expect(el).toBeDefined()
	})

	test('DOM has a <footer /> element', () => {
		const el = screen.findByRole('contentinfo')
		expect(el).toBeDefined()
	})
})
