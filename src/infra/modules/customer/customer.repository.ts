import { CustomerDocument } from '../database/mongoose/customer/schema/customer.schema'
import MongooseRepository from '../database/mongoose/mongoose.repository'

export default class CustomerRepository extends MongooseRepository<CustomerDocument> {}
