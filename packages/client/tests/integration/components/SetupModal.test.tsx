import { beforeAll, describe, expect, test } from 'vitest'
import { render, screen, waitFor, resetDom, cleanup } from '../helpers'
import { Navbar, SearchModal, SetupModal, WeatherTemperature, WeatherStats, Forecast } from '@components'
import { Box, useDisclosure } from '@chakra-ui/react'
import userEvent from '@testing-library/user-event'
import { fetchForecastByQuery } from '@services'

const AppWithNavbar = ({ data }) => {
  const {
    isOpen: searchIsOpen,
    onClose: closeSearch,
    onOpen: openSearch
  } = useDisclosure()

  const {
    isOpen: setupIsOpen,
    onClose: closeSetup,
    onOpen: openSetup
  } = useDisclosure()

  return (
    <Box as='main' className='weather-card'>
      <Navbar openSearch={openSearch} openSetup={openSetup} />
      <WeatherTemperature data={data} py='48px' />
      <WeatherStats data={data} pb='32px' />
      <Forecast data={data} pb='32px' />
      <SetupModal isOpen={setupIsOpen} onClose={closeSetup} />
      <SearchModal isOpen={searchIsOpen} onClose={closeSearch} />
    </Box>
  )
}

const openDialog = async () => {
  const dialog = document.querySelector('#chakra-modal-setup')
  if (!dialog) {
    const btn = screen.getByRole('button', { name: 'cog icon' })
    await userEvent.click(btn)
  }
}

const closeDialog = async () => {
  await userEvent.click(screen.getByRole('button', { name: 'Close' }))
  await waitFor(() => {
    expect(document.querySelector('#chakra-modal-search')).toBeNull()
  })
}

const selectOptionTest = (unitName: string, optionsArray: string[][]) => {
  test('Can select radio option', async () => {
    await openDialog()

    const oppositeUnit =
      unitName === optionsArray[1][0] ? optionsArray[0][0] : optionsArray[1][0]
    // similar to -> `const oppositeUnit = unitName === 'Fahrenheit' ? 'Celsius' : 'Fahrenheit'`

    const radio1 = screen.getByRole('radio', { name: oppositeUnit })
    const radio2 = screen.getByRole('radio', { name: unitName })
    expect(radio1).toBeChecked()
    expect(radio2).not.toBeChecked()
    await userEvent.click(radio2)
    expect(radio1).not.toBeChecked()
    expect(radio2).toBeChecked()

    await closeDialog()
  }, 10000)
}

const radioTestSuite = async (options: string[][], cbTests: (expectedUnit: string) => void) => {
  const opts = options.reverse() // reverse to test the opposite unit first
  describe('Changing speed unit', () => {
    describe.each(opts)('Switch to -> %s (%s)', (unitName, expectedUnit) => {
      selectOptionTest(unitName, options)
      describe.concurrent(`Unit changes to "${expectedUnit}"`, async () => {
        cbTests(expectedUnit)
      })
    })
  })
}

const temperatureArray = [
  ['Celsius', '°C'], // option 1
  ['Fahrenheit', '°F'] // option 2
]

const speedArray = [
  ['Kilómetros por hora', 'km/h'],
  ['Millas por hora', 'mi/h']
]

const pressureArray = [
  ['Milibar', 'mb'],
  ['Pulgadas de mercurio', 'inHg']
]

beforeAll(async () => {
  resetDom()
  cleanup()
  const data = await fetchForecastByQuery({ query: 'New York' })
  render(<AppWithNavbar data={data} />)
})

describe('<SetupModal />', () => {
  test('Can be opened', async () => {
    await openDialog()
    expect(await screen.findByRole('dialog')).toBeTruthy()
  })

  describe('Can be closed', () => {
    test('by pressing close icon', async () => {
      await openDialog()
      expect(await screen.findByRole('dialog')).toBeTruthy()

      await userEvent.click(screen.getByRole('button', { name: 'Close' }))
      await waitFor(() => {
        expect(document.querySelector('#chakra-modal-search')).toBeNull()
      })
    }, 10000)

    test('by pressing ESC', async () => {
      await openDialog()
      expect(await screen.findByRole('dialog')).toBeTruthy()

      await userEvent.keyboard('{Escape}')
      await waitFor(() => {
        expect(document.querySelector('#chakra-modal-search')).toBeNull()
      })
    }, 10000)

    test('by clicking outside of the modal', async () => {
      await openDialog()
      expect(await screen.findByRole('dialog')).toBeTruthy()

      const el = document.querySelector('.chakra-modal__content-container')
      expect(el).toBeTruthy()
      if (el) await userEvent.click(el)

      await waitFor(() => {
        expect(document.querySelector('#chakra-modal-search')).toBeNull()
      })
    }, 10000)
  })
})

describe.concurrent('Radio Options', () => {
  radioTestSuite(temperatureArray, expectedUnit => {
    test('#temperature shows expected unit', async () => {
      const text = document.querySelector('#temperature')?.textContent
      expect(text).toContain(expectedUnit)
    })

    test('#feels-like shows expected unit', async () => {
      const text = document.querySelector('#feels-like')?.textContent
      expect(text).toContain(expectedUnit)
    })

    test('#forecast-section shows expected unit', async () => {
      const selector =
        '#forecast-section > ul > li:nth-child(1) > p > span:nth-child(3)'
      const text = document.querySelector(selector)?.textContent
      expect(text).toContain(expectedUnit)
    })
  })

  radioTestSuite(speedArray, expectedUnit => {
    test('#weather-data-stack shows expected unit', async () => {
      const selector = '#weather-data-stack > span:nth-child(3) > li > span'
      const text = document.querySelector(selector)?.textContent
      expect(text).toContain(expectedUnit)
    })
  })

  radioTestSuite(pressureArray, expectedUnit => {
    test('#weather-data-stack shows expected unit', async () => {
      const selector = '#weather-data-stack > span:nth-child(4) > li > span'
      const text = document.querySelector(selector)?.textContent
      expect(text).toContain(expectedUnit)
    })
  })
})
