import { Controller, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { HealthCheck, HealthCheckService, MongooseHealthIndicator } from '@nestjs/terminus'

@Controller('health')
@ApiTags('health')
export class HealthController {
  constructor(private health: HealthCheckService, private mongooseHealth: MongooseHealthIndicator) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([async () => this.mongooseHealth.pingCheck('mongoose')])
  }
}
