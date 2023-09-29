import * as mongoose from 'mongoose'
import 'dotenv/config'

import { DATABASE_CONNECTION } from 'src/infra/crosscutting/constants'

export const databaseProviders = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: (): Promise<typeof mongoose> => mongoose.connect(process.env.MONGO_URL),
  },
]
