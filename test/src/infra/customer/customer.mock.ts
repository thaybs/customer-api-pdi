import { AddressValidation } from 'src/api/customer/dto/address-validation'
import { CreateCustomerValidation } from 'src/api/customer/dto/create-customer-dto'
import { GetCustomerByIdValidation } from 'src/api/customer/dto/get-customer-by-id-dto'
import { UpdateCustomerValidation } from 'src/api/customer/dto/update-customer-dto'
import { Customer } from 'src/domain/customer/entities/Customer'

export const mockAddressParams: AddressValidation = {
  postalCode: '12345123',
  street: 'Rua das Flores',
  number: 42,
  neighborhood: 'Centro',
  city: 'Cidadezinha',
}

export const mockCustomerParams = {
  id: '7ada6eeb-fc6e-402e-bcfa-45a9497e6b9e',
  name: 'João das Couves',
  document: '12345678910',
  email: 'email@email.com',
  phone: '21-987654321',
  address: mockAddressParams,
  active: true,
}

const { id, name, document, email, phone, address, active } = mockCustomerParams

export const mockCustomer: Customer = {
  id: '7ada6eeb-fc6e-402e-bcfa-45a9497e6b9e',
  ...mockCustomerParams,
  active: true,
  createdAt: new Date(),
  updatedAt: new Date(),
}

export const idMockCustomer: GetCustomerByIdValidation = {
  id: '7ada6eeb-fc6e-402e-bcfa-45a9497e6b9e',
}

export const createMockCustomer: CreateCustomerValidation = {
  name,
  document,
  email,
  phone,
  address,
  active,
}

export const updateMockCustomer: UpdateCustomerValidation = {
  id,
  name,
  document,
  email,
  phone,
  address,
  active: true,
}
