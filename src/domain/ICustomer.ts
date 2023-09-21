export interface ICustomer {
  id: string
  name: string
  document: string
  email: string
  phone: string
  address: IAddress
  active: boolean
  createdAt?: Date
  deletedAt?: Date
}

export interface IAddress {
  postalCode: string
  street: string
  number: string
  neighborhood: string
  city: string
}
