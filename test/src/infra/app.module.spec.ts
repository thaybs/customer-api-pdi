import { Test, TestingModule } from '@nestjs/testing'
import { AppModule } from 'src/infra/modules/app/app.module'

describe('CustomerModule', () => {
  let module: TestingModule

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()
  })

  it('should be defined', () => {
    expect(module).toBeDefined()
  })
})
