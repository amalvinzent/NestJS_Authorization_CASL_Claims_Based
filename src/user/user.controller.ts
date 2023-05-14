import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ForbiddenException
} from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { AbilityFactory, Action } from 'src/ability/ability.factory'
import { User } from './entities/user.entity'
import { ForbiddenError } from '@casl/ability'

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly abilityFActory: AbilityFactory
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    const user = { id: 1, isAdmin: false }
    const ability = this.abilityFActory.defineAbility(user)

    try {
      ForbiddenError.from(ability).throwUnlessCan(Action.Create, User)
      return this.userService.create(createUserDto)
    } catch (err) {
      if (err instanceof ForbiddenError) {
        throw new ForbiddenException(err.message)
      }
    }
  }

  @Get()
  findAll() {
    return this.userService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = { id: 1, isAdmin: false }
    const ability = this.abilityFActory.defineAbility(user)
    try {
      ForbiddenError.from(ability).throwUnlessCan(Action.Update, User)
      return this.userService.update(+id, updateUserDto)
    } catch (err) {
      if (err instanceof ForbiddenError) {
        throw new ForbiddenException(err.message)
      }
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id)
  }
}
