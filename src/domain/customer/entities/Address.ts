import { ApiProperty } from '@nestjs/swagger'

export class Address {
  @ApiProperty()
  postalCode: string

  @ApiProperty()
  street: string

  @ApiProperty()
  number: number

  @ApiProperty()
  neighborhood: string

  @ApiProperty()
  city: string
}
