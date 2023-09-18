import { Body, Controller, Inject, Post } from '@nestjs/common'
import { ICreateProductsParams } from 'src/api/product/ICreateProduct'
import { IProduct } from 'src/domain/IProduct'
import { TYPES } from 'src/infra/crosscutting/TYPES'
import ProductService from 'src/infra/modules/product/services/product.service'

@Controller('products')
export class ProductController {
  constructor(
    @Inject(TYPES.ProductService)
    private readonly ProductService: ProductService,
  ) {}
  private products = []

  @Post()
  async create(@Body() params: ICreateProductsParams): Promise<IProduct> {
    return
  }
}
