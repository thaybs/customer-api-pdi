import { array, boolean, number, object, string } from 'zod'

export const createCustomerSchema = object({
  name: string().min(3).max(255),
  document: string().min(11).max(14),
  email: string().email(),
  phone: string().max(12),
  address: array(
    object({
      postalCode: string().length(8),
      street: string().min(3).max(256),
      number: number(),
      neighborhood: string().min(2).max(256),
      city: string().min(3).max(30),
    }),
  ).optional(),
  active: boolean(),
})
