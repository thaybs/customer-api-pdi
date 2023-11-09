import { Prop } from '@nestjs/mongoose'
import { Type } from 'class-transformer'
import { IsEmail, IsNotEmpty, IsString, Length, Matches, MinLength, ValidateNested } from 'class-validator'
import { IsCPF } from 'class-validator-cpf'
import { AddressValidation } from './address-validation'

export class CreateCustomerValidation {
  @Prop()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @Matches(/^[A-Za-z0-9 ]+$/, { message: 'No special characters allowed' })
  name: string

  @Prop()
  @IsCPF()
  @IsNotEmpty()
  document: string

  @Prop()
  @IsEmail()
  email: string

  @Prop()
  @IsString()
  @Length(10, 11)
  phone: string

  @Prop()
  @ValidateNested()
  @Type(() => AddressValidation)
  address: AddressValidation
}
