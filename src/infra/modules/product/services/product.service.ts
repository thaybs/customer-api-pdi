import { Injectable } from '@nestjs/common'
import { ICreateProductsParams } from 'src/api/product/ICreateProduct'

@Injectable()
export default class ProductService {
  async create(product: ICreateProductsParams) {
    return product
  }
}
