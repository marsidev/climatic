import { beforeAll, describe, expect, test } from 'vitest'
import { render, screen, waitFor, resetDom, cleanup } from '../helpers'
import { Navbar, SearchModal, SetupModal } from '@components'
import { Box, useDisclosure } from '@chakra-ui/react'
import userEvent from '@testing-library/user-event'

const AppWithNavbar = () => {
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
      <SetupModal isOpen={setupIsOpen} onClose={closeSetup} />
      <SearchModal isOpen={searchIsOpen} onClose={closeSearch} />
    </Box>
  )
}

const openDialog = async () => {
  const dialog = document.querySelector('#chakra-modal-search')
  if (!dialog) {
    const btn = screen.getByRole('button', { name: 'search icon' })
    await userEvent.click(btn)
  }
}

beforeAll(() => {
  resetDom()
  cleanup()
  render(<AppWithNavbar />)
})

test('<Navbar /> renders as expected', () => {
  expect(screen.getByRole('main')).toBeTruthy()
  expect(screen.getByRole('navigation')).toBeTruthy()
})

describe('<SearchModal />', () => {
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

  describe('Type and Search', () => {
    beforeAll(async () => {
      await openDialog()
    })

    test('input is initially focused', async () => {
      expect(await screen.findByRole('dialog')).toBeTruthy()

      await waitFor(() => {
        expect(screen.getByRole('textbox')).toHaveFocus()
      })
    })

    test('can type a custom location', async () => {
      await userEvent.type(screen.getByRole('textbox'), 'madrid')
      expect(screen.getByDisplayValue('madrid')).toBeInTheDocument()
    })

    test('it shows search results', async () => {
      await waitFor(() => {
        expect(document.querySelector('.search-item')).toBeTruthy()
      })

      const heading = document.querySelector('#search-heading')
      await waitFor(() => {
        expect(heading?.textContent).toContain('resultados')
      })
    }, 10000)
  })
})
