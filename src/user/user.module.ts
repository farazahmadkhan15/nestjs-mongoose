import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { JwtAuthStrategy } from '../auth/strategies/jwt-auth.strategy'
import { SharedModule } from '../shared/shared.module'

import { UserController } from './controllers/user.controller'
import { User, UserSchema } from './entities/user.entity'
import { UserRepository } from './repositories/user.repository'
import { UserAclService } from './services/user-acl.service'
import { UserService } from './services/user.service'

@Module({
  controllers: [UserController],
  exports: [UserService],
  imports: [SharedModule, MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [UserService, JwtAuthStrategy, UserAclService, UserRepository],
})
export class UserModule {}
