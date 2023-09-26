import { Document } from 'mongoose'

export interface ICustomer extends Document {
  readonly id: string
  readonly name: string
  readonly document: string
  readonly email: string
  readonly phone: string
  readonly address: IAddress
  readonly active: boolean
  readonly createdAt: Date
  readonly deletedAt: Date
}

export interface IAddress {
  postalCode: string
  street: string
  number: number
  neighborhood: string
  city: string
}
