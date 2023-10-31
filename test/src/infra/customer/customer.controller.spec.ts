import 'reflect-metadata'

import { Test, TestingModule } from '@nestjs/testing'
import { CreateCustomerUseCase } from 'src/app/customer/create-customer-use-case'
import { ListCustomerUseCase } from 'src/app/customer/list-customers-use-case'
import { CustomerController } from 'src/infra/modules/customer/customer.controller'
import { AuthService } from 'src/auth/auth.service'
import { customerProviders } from 'src/infra/modules/customer/customer.providers'
import { DatabaseModule } from 'src/infra/modules/database/database.module'
import { createMockCustomer, mockCustomer } from './customer.mock'
import { CustomerService } from 'src/infra/modules/customer/customer.service'

describe('CustomerController', () => {
  let customerController: CustomerController
  let createCustomerUseCase: CreateCustomerUseCase
  let listCustomerUseCase: ListCustomerUseCase

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [CustomerController],
      providers: [AuthService, CustomerService, CreateCustomerUseCase, ListCustomerUseCase, ...customerProviders],
    }).compile()

    customerController = module.get<CustomerController>(CustomerController)
    createCustomerUseCase = module.get<CreateCustomerUseCase>(CreateCustomerUseCase)
    listCustomerUseCase = module.get<ListCustomerUseCase>(ListCustomerUseCase)
  })

  describe('findAll', () => {
    it('should return an array of customers', async () => {
      jest.spyOn(listCustomerUseCase, 'execute').mockResolvedValueOnce([mockCustomer])

      const listCustomers = await customerController.findAll()

      expect(listCustomers).toEqual([mockCustomer])
    })
  })

  describe('create', () => {
    it('should create a new customer', async () => {
      jest.spyOn(createCustomerUseCase, 'execute').mockImplementation(() => Promise.resolve(mockCustomer))

      const createdCustomer = await customerController.create(createMockCustomer)

      expect(createdCustomer).toBe(mockCustomer)
      expect(createdCustomer.name).toBe(createMockCustomer.name)
      expect(createdCustomer.document).toBe(createMockCustomer.document)
      expect(createdCustomer.email).toBe(createMockCustomer.email)
      expect(createdCustomer.phone).toBe(createMockCustomer.phone)
      expect(createdCustomer.active).toBe(createMockCustomer.active)
      expect(createdCustomer.address).toBe(createMockCustomer.address)
      expect(createdCustomer.address.city).toBe(createMockCustomer.address.city)
      expect(createdCustomer.address.street).toBe(createMockCustomer.address.street)
      expect(createdCustomer.address.number).toBe(createMockCustomer.address.number)
      expect(createdCustomer.address.neighborhood).toBe(createMockCustomer.address.neighborhood)
      expect(createdCustomer.address.postalCode).toBe(createMockCustomer.address.postalCode)
    })
  })
})
