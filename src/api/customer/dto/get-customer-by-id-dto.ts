import { Prop } from '@nestjs/mongoose'
import { IsNotEmpty, IsUUID, Validate } from 'class-validator'

export class GetCustomerByIdValidation {
  @IsNotEmpty()
  @IsUUID('4', { message: 'Invalid UUID format' })
  id: string
}
