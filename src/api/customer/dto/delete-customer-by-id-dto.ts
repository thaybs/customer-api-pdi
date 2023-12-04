import { Prop } from '@nestjs/mongoose'
import { IsNotEmpty, IsUUID, Validate } from 'class-validator'

export class DeleteCustomerByIdValidation {
  @IsNotEmpty()
  @IsUUID('4', { message: 'Invalid UUID format' })
  id: string
}
