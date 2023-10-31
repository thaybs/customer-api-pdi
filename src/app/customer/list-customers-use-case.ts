import { Injectable, Inject } from '@nestjs/common'
import { Model } from 'mongoose'
import { Customer } from 'src/domain/Customer'
import { CUSTOMER_MODEL } from 'src/infra/crosscutting/constants'

@Injectable()
export class ListCustomerUseCase {
  constructor(@Inject(CUSTOMER_MODEL) private readonly customerModel: Model<Customer>) {}
  execute(): Promise<Customer[]> {
    return this.customerModel.find().exec()
  }
}
