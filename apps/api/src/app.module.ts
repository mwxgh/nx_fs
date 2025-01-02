import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ModulesModule } from './modules/modules.module'
import { SharedModule } from './shared/shared.module'

@Module({
  imports: [SharedModule, ModulesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
