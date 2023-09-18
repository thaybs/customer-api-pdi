import { IProduct } from 'src/domain/IProduct'

export type ICreateProductsParams = {
  name: string
  description?: string
  active: boolean
}

export type ICreateProductsResponse = IProduct
