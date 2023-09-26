import * as mongoose from 'mongoose'
import { DATABASE_CONNECTION } from 'src/infra/crosscutting/constants'

export const databaseProviders = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(
        'mongodb+srv://customer-api:customerpass0@cluster0.n0wxypo.mongodb.net/?retryWrites=true&w=majority',
      ),
  },
]
