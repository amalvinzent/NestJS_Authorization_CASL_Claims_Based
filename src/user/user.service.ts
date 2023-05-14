import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {
    return 'added'
  }

  findAll() {
    return `found`
  }

  findOne(id: number) {
    return `found one`
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `updated`
  }

  remove(id: number) {
    return `deleted`
  }
}
