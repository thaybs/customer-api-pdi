import { Test, TestingModule } from '@nestjs/testing'
import { CustomerModule } from 'src/infra/modules/customer/customer.module'

describe('CustomerModule', () => {
  let module: TestingModule

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [CustomerModule],
    }).compile()
  })

  it('should be defined', () => {
    expect(module).toBeDefined()
  })
})
