import { ApiProperty } from '@nestjs/swagger'
import { Address } from './Address'

export class Customer {
  @ApiProperty()
  id: string

  @ApiProperty()
  name: string

  @ApiProperty()
  document: string

  @ApiProperty()
  email: string

  @ApiProperty()
  phone: string

  @ApiProperty({ type: Address })
  address: Address

  @ApiProperty()
  active: boolean = true

  @ApiProperty()
  createdAt?: Date = new Date()

  @ApiProperty()
  updatedAt?: Date | null
}
