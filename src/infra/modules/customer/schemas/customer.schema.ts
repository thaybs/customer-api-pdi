import * as mongoose from 'mongoose'
import { Schema } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

export const CustomerSchema = new mongoose.Schema(
  {
    id: { type: String, primary: true, default: uuidv4 },
    name: { type: String, required: true, nullable: false },
    document: { type: String, required: true, nullable: false },
    email: { type: String, required: true, nullable: false },
    phone: { type: String, required: true, nullable: false },
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
    active: { type: Boolean, required: true, nullable: false },
    createdAt: { type: Date, required: false, nullable: false },
    deletedAt: { type: Date, required: false, nullable: true },
    updatedAt: { type: Date, required: false, nullable: true },
  },
  {
    versionKey: false,
    timestamps: true,
  },
)

CustomerSchema.method('toJSON', function () {
  const { _id, ...object } = this.toObject()
  return object
})
