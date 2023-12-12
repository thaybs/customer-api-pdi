import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsOptional, IsString } from 'class-validator'
import { IsCPF } from 'class-validator-cpf'
import { Customer } from 'src/domain/customer/entities/Customer'
import { IPaginate, IPagination } from 'src/infra/crosscutting/interfaces/IPagination'

export class ListCustomerDto extends IPagination {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  name?: string

  @IsCPF()
  @IsOptional()
  @ApiProperty({ required: false })
  document?: string

  @IsOptional()
  @ApiProperty({ required: false })
  active?: boolean
}

export class ListCustomerResponse extends IPaginate {
  @ApiProperty({ type: [Customer] })
  data: Customer[]
}
