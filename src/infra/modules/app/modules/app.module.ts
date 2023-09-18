import { Module } from '@nestjs/common'
import { AppService } from '../../product/services/app.service'
import { AppController } from '../controllers/app.controller'

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
