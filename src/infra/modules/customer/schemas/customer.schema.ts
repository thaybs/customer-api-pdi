import * as mongoose from 'mongoose'
import { Schema } from 'mongoose'

export const CustomerSchema = new mongoose.Schema(
  {
    id: { type: String, primary: true, generated: 'uuid' },
    name: { type: String, required: true },
    document: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: [
      new Schema(
        {
          postalCode: { type: String, required: false },
          street: { type: String, required: false },
          number: { type: String, required: false },
          neighborhood: { type: String, required: false },
          city: { type: String, required: false },
        },
        {
          _id: false,
        },
      ),
    ],
    active: { type: Boolean, required: true },
    createdAt: { type: Date, required: false },
    deletedAt: { type: Date, required: false },
    updatedAt: { type: Date, required: false },
  },
  {
    versionKey: false,
    timestamps: true,
  },
)
