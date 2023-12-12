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
import { ApiProperty } from '@nestjs/swagger'

export class UpdateCustomerValidation {
  id: string

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @Matches(/^[A-Za-z0-9 ]+$/, { message: 'No special characters allowed' })
  @ApiProperty()
  name: string

  @IsCPF()
  @IsNotEmpty()
  @ApiProperty()
  document: string

  @IsEmail()
  @ApiProperty()
  email: string

  @IsString()
  @Length(10, 11)
  @ApiProperty()
  phone: string

  @ValidateNested()
  @Type(() => AddressValidation)
  @ApiProperty({ type: () => AddressValidation })
  address: AddressValidation

  @IsBoolean()
  @ApiProperty()
  active: true
}
