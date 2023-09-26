import * as mongoose from 'mongoose'

export const AddressSchema = new mongoose.Schema({
  postalCode: { type: String, required: true },
  street: { type: String, required: true },
  number: { type: String, required: true },
  neighborhood: { type: String, required: true },
  city: { type: String, required: true },
})
