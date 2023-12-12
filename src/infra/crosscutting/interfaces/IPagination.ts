import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber } from 'class-validator'

export class IPaginate {
  @ApiProperty()
  page: number
  @ApiProperty()
  pageSize: number
}

export class IPagination {
  @IsNotEmpty()
  @ApiProperty()
  page: number

  @IsNotEmpty()
  @ApiProperty()
  pageSize: number
}
