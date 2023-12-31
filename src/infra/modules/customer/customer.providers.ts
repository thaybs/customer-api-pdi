import { Connection } from 'mongoose'
import { CUSTOMER_MODEL, DATABASE_CONNECTION, CUSTOMER_NAME } from 'src/infra/crosscutting/constants'
import { CustomerSchema } from '../database/mongoose/customer/schema/customer.schema'

export const customerProviders = [
  {
    provide: CUSTOMER_MODEL,
    useFactory: (connection: Connection) => connection.model(CUSTOMER_NAME, CustomerSchema),
    inject: [DATABASE_CONNECTION],
  },
]
