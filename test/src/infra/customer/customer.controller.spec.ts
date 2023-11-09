import 'reflect-metadata'

import { Test, TestingModule } from '@nestjs/testing'
import { CreateCustomerUseCase } from 'src/app/customer/create-customer-use-case'
import { ListCustomerUseCase } from 'src/app/customer/list-customers-use-case'
import { CustomerController } from 'src/infra/modules/customer/customer.controller'
import { customerProviders } from 'src/infra/modules/customer/customer.providers'
import { DatabaseModule } from 'src/infra/modules/database/database.module'
import { createMockCustomer, mockCustomer } from './customer.mock'
import { AuthService } from 'src/infra/auth/auth.service'
import MongooseRepository from 'src/infra/modules/database/mongoose/mongoose.repository'
import { Model } from 'mongoose'
import { CustomerModel } from 'src/infra/modules/database/mongoose/customer/schema/customer.schema'

describe('CustomerController', () => {
  let customerController: CustomerController
  let createCustomerUseCase: CreateCustomerUseCase
  let listCustomerUseCase: ListCustomerUseCase

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [CustomerController],
      providers: [
        {
          provide: Model,
          useValue: CustomerModel,
        },
        AuthService,
        MongooseRepository,
        CreateCustomerUseCase,
        ListCustomerUseCase,
        ...customerProviders,
      ],
    }).compile()

    customerController = module.get<CustomerController>(CustomerController)
    createCustomerUseCase = module.get<CreateCustomerUseCase>(CreateCustomerUseCase)
    listCustomerUseCase = module.get<ListCustomerUseCase>(ListCustomerUseCase)
  })

  describe('findAll', () => {
    it('should return an array of customers', async () => {
      jest.spyOn(listCustomerUseCase, 'execute').mockResolvedValueOnce({ page: 1, pageSize: 10, data: [mockCustomer] })

      const listCustomers = await customerController.findAll({
        page: 1,
        pageSize: 10,
        filter: { name: '', document: '' },
      })
      expect(listCustomers).toEqual({ page: 1, pageSize: 10, data: [mockCustomer] })
    })
  })

  describe('create', () => {
    it('should create a new customer', async () => {
      jest.spyOn(createCustomerUseCase, 'execute').mockImplementation(() => Promise.resolve(mockCustomer))

      const createdCustomer = await customerController.create(createMockCustomer)

      expect(createdCustomer).toBe(mockCustomer)
    })
  })
})
