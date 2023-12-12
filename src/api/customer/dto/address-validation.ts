import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty, IsNumber, Matches } from 'class-validator'

export class AddressValidation {
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{5}-\d{3}$|^\d{8}$/, { message: 'Invalid postal code' })
  @ApiProperty()
  postalCode: string

  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Za-z0-9 ]+$/, { message: 'No special characters allowed' })
  @ApiProperty()
  street: string

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  number: number

  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Za-z0-9 ]+$/, { message: 'No special characters allowed' })
  @ApiProperty()
  neighborhood: string

  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Za-z0-9 ]+$/, { message: 'No special characters allowed' })
  @ApiProperty()
  city: string
}
