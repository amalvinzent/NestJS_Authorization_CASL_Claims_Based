import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { AbiltiyModule } from 'src/ability/abiltiy.module'

@Module({
  imports: [AbiltiyModule],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
