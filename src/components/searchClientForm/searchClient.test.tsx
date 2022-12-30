import { cleanup, render, screen } from '@testing-library/react'
import { describe, it, afterEach, expect, vi, beforeAll, afterAll } from 'vitest'
import userEvent from '@testing-library/user-event'

import { Client } from '@/types'
import { server } from '@/mocks/server'
import { SearchClientForm } from './SearchClientForm'

const user = userEvent.setup()

const handleSearchData = vi.fn((client: Client) => client)

describe('search client form', () => {
  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

  afterAll(() => server.close())

  afterEach(() => {
    cleanup()
    server.resetHandlers()
  })

  it('should render and catch the titile', () => {
    render(<SearchClientForm setClientData={() => null} />)
    screen.getByLabelText('calendar illustration')
  })

  it('should write in the input', async () => {
    render(<SearchClientForm setClientData={() => null} />)
    const input = screen.getByPlaceholderText('Ingresa tu número de cédula')
    expect(input.value).toBe('')

    await user.type(input, '1234567890')
    expect(input.value).toBe('1234567890')
  })

  it('should show error if the cedula not is valid', async () => {
    render(<SearchClientForm setClientData={() => null} />)
    const input = screen.getByPlaceholderText('Ingresa tu número de cédula')
    await user.type(input, '1234567')
    await user.click(screen.getByRole('button'))

    screen.getByText('Cédula no valida')
  })

  it('should send a valid cedula and show the client data', async () => {
    render(<SearchClientForm setClientData={handleSearchData} />)
    const input = screen.getByPlaceholderText('Ingresa tu número de cédula')
    await user.type(input, '1757646805')

    const btnSubmit = screen.getByLabelText('btn submit search user form')
    await user.click(btnSubmit)

    expect(handleSearchData).toHaveBeenCalledOnce()
    // expect(handleSearchData).toHaveBeenCalledWith(clientDataMock)
  })

  it('should show error if the client is not fund', async () => {
    render(<SearchClientForm setClientData={() => null} />)
    const input = screen.getByPlaceholderText('Ingresa tu número de cédula')
    await user.type(input, '1234567890')

    const btnSubmit = screen.getByLabelText('btn submit search user form')
    await user.click(btnSubmit)

    screen.getByText('Error al buscar el cliente')
  })

  it('should navigate to client register page', async () => {
    render(<SearchClientForm setClientData={() => null} />)
    const link = screen.getByText('Registra tus datos')
    await user.click(link)

    expect(window.location.pathname).toBe('/client/register')
  })
})
