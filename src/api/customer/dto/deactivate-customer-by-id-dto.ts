import { Prop } from '@nestjs/mongoose'
import { IsBoolean, IsNotEmpty, IsUUID, Validate } from 'class-validator'

export class DeactivateCustomerValidation {
  @IsNotEmpty()
  @IsUUID('4', { message: 'Invalid UUID format' })
  id: string
}
