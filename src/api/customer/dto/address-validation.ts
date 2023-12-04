import { IsString, IsNotEmpty, IsNumber, Matches } from 'class-validator'

export class AddressValidation {
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{5}-\d{3}$|^\d{8}$/, { message: 'Invalid postal code' })
  postalCode: string

  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Za-z0-9 ]+$/, { message: 'No special characters allowed' })
  street: string

  @IsNumber()
  @IsNotEmpty()
  number: number

  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Za-z0-9 ]+$/, { message: 'No special characters allowed' })
  neighborhood: string

  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Za-z0-9 ]+$/, { message: 'No special characters allowed' })
  city: string
}
