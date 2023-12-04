import { Prop } from '@nestjs/mongoose'
import { IsBoolean, IsNotEmpty, IsUUID, Validate } from 'class-validator'

export class DeactivateCustomerValidation {
  id: string

  @IsNotEmpty()
  @IsBoolean()
  active: boolean
}
