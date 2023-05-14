import { Injectable } from '@nestjs/common'
import { User } from 'src/user/entities/user.entity'
import {
  InferSubjects,
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType
} from '@casl/ability'

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete'
}

export type Subjects = InferSubjects<typeof User | 'all'>

export type AppAbilty = Ability<[Action, Subjects]>

Injectable()
export class AbilityFactory {
  defineAbility(user: User) {
    const { can, cannot, build } = new AbilityBuilder(
      Ability as AbilityClass<AppAbilty>
    )

    if (user.isAdmin) {
      can(Action.Manage, 'all')
    } else {
      can(Action.Read, 'all')
      cannot(Action.Create, 'all').because('only admin can create')
      cannot(Action.Update, 'all').because('only admin can update')
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>
    })
  }
}
