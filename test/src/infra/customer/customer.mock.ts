import { CreateCustomerParams } from 'src/api/customer/ICreateCustomer'
import { Address } from 'src/domain/Address'
import { Customer } from 'src/domain/Customer'

export const createMockAddress: Address = {
  postalCode: '12345123',
  street: 'Rua das Flores',
  number: 42,
  neighborhood: 'Centro',
  city: 'Cidadezinha',
}

export const createMockCustomer: CreateCustomerParams = {
  name: 'João das Couves',
  document: '12345678910',
  email: 'email@email.com',
  phone: '21-987654321',
  address: createMockAddress,
  active: true,
}

export const mockCustomer: Customer = {
  id: '7ada6eeb-fc6e-402e-bcfa-45a9497e6b9e',
  ...createMockCustomer,
  createdAt: new Date(),
}
