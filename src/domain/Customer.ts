import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsBoolean,
  IsDate,
  IsUUID,
  Length,
  ValidateNested,
  MinLength,
} from 'class-validator'
import { Type } from 'class-transformer'
import { Address } from './Address'

@Schema()
export class Customer {
  @Prop()
  @IsUUID()
  id: string

  @Prop()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string

  @Prop()
  @IsString()
  @IsNotEmpty()
  @Length(11, 14)
  document: string

  @Prop()
  @IsString()
  @IsEmail()
  email: string

  @Prop()
  @IsString()
  @Length(10, 11)
  phone: string

  @Prop()
  @ValidateNested()
  @Type(() => Address)
  address: Address

  @Prop()
  @IsBoolean()
  active: boolean

  @Prop()
  @IsDate()
  updatedAt: Date

  @Prop({ default: Date.now })
  @IsDate()
  createdAt: Date

  @Prop({ default: null })
  @IsDate()
  deletedAt: Date | null
}
