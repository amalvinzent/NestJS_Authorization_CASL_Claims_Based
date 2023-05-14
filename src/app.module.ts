import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './user/user.module'
import { AbiltiyModule } from './ability/abiltiy.module'

@Module({
  imports: [UserModule, AbiltiyModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
