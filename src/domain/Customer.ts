import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsBoolean,
  IsDate,
  IsUUID,
  ValidateNested,
  MinLength,
  MaxLength,
  Length,
} from 'class-validator'
import { Type } from 'class-transformer'
import { Address } from './Address'

export class Customer {
  @IsUUID()
  id: string

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string

  @IsString()
  @IsNotEmpty()
  @MinLength(11)
  @MaxLength(14)
  document: string

  @IsString()
  @IsEmail()
  email: string

  @IsString()
  @Length(10, 11)
  phone: string

  @ValidateNested()
  @Type(() => Address)
  address: Address

  @IsBoolean()
  active: boolean

  @IsDate()
  createdAt: Date

  @IsDate()
  deletedAt?: Date
}
