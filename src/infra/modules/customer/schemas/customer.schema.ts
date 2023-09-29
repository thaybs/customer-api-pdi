import * as mongoose from 'mongoose'
import { AddressSchema } from './address.schema'

export const CustomerSchema = new mongoose.Schema(
  {
    id: String,
    name: { type: String, required: true },
    document: { type: String, required: true },
    email: { type: String, required: false },
    phone: { type: String, required: false },
    address: AddressSchema,
    active: { type: Boolean, required: true },
    createdAt: { type: Date, required: false },
    deletedAt: { type: Date, required: false },
  },
  {
    // Excluir _id e __v de todas as consultas
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (doc, ret) => {
        delete ret._id
        delete ret.__v
      },
    },
  },
)
