import mongoose, { Document, Schema } from 'mongoose'
import { Customer } from 'src/domain/Customer'
import { v4 as uuidv4 } from 'uuid'
import { CUSTOMER_MODEL } from 'src/infra/crosscutting/constants'

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

export const CustomerModel = mongoose.model(CUSTOMER_MODEL, CustomerSchema)

export type CustomerDocument = Document & Customer
