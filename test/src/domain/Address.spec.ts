import 'reflect-metadata'

import { validate } from 'class-validator'
import { Address } from 'src/domain/Address'

describe('Address', () => {
  it('should not accept invalid data', async () => {
    const address = new Address()
    address.street = ''
    address.city = 'City'
    address.postalCode = '12345-6782'
    address.neighborhood = ''
    address.number = 10

    const errors = await validate(address)
    expect(errors.length).toBeGreaterThan(0)
  })

  it('should accept valid data', async () => {
    const address = new Address()
    address.street = 'Rua das Rosas'
    address.city = 'Cidade'
    address.postalCode = '12345672'
    address.neighborhood = 'Bairro'
    address.number = 10

    const errors = await validate(address)
    expect(errors.length).toEqual(0)
  })
})
