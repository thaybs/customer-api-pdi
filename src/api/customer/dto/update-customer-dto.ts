import { Type } from 'class-transformer'
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUUID,
  Length,
  Matches,
  MinLength,
  ValidateNested,
} from 'class-validator'
import { IsCPF } from 'class-validator-cpf'
import { AddressValidation } from './address-validation'

export class UpdateCustomerValidation {
  id: string

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @Matches(/^[A-Za-z0-9 ]+$/, { message: 'No special characters allowed' })
  name: string

  @IsCPF()
  @IsNotEmpty()
  document: string

  @IsEmail()
  email: string

  @IsString()
  @Length(10, 11)
  phone: string

  @ValidateNested()
  @Type(() => AddressValidation)
  address: AddressValidation

  @IsBoolean()
  active: true
}
