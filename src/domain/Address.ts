import { IsString, IsNotEmpty, IsNumber, Length } from 'class-validator'

export class Address {
  @IsString()
  @IsNotEmpty()
  @Length(8)
  postalCode: string

  @IsString()
  @IsNotEmpty()
  street: string

  @IsNumber()
  @IsNotEmpty()
  number: number

  @IsString()
  @IsNotEmpty()
  neighborhood: string

  @IsString()
  @IsNotEmpty()
  city: string
}
