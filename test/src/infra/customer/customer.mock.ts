import { AddressValidation } from 'src/api/customer/dto/address-validation'
import { CreateCustomerValidation } from 'src/api/customer/dto/create-customer-dto'
import { GetCustomerByIdValidation } from 'src/api/customer/dto/get-customer-by-id-dto'
import { Customer } from 'src/domain/customer/entities/Customer'

export const createMockAddress: AddressValidation = {
  postalCode: '12345123',
  street: 'Rua das Flores',
  number: 42,
  neighborhood: 'Centro',
  city: 'Cidadezinha',
}

export const createMockCustomer: CreateCustomerValidation = {
  name: 'João das Couves',
  document: '12345678910',
  email: 'email@email.com',
  phone: '21-987654321',
  address: createMockAddress,
}

export const mockCustomer: Customer = {
  id: '7ada6eeb-fc6e-402e-bcfa-45a9497e6b9e',
  ...createMockCustomer,
  active: true,
  createdAt: new Date(),
  updatedAt: new Date(),
}

export const idMockCustomer: GetCustomerByIdValidation = {
  id: '7ada6eeb-fc6e-402e-bcfa-45a9497e6b9e',
}
