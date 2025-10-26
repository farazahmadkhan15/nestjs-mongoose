import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { compare, hash } from 'bcrypt'
import { plainToClass } from 'class-transformer'

import { AppLogger } from '../../shared/logger/logger.service'
import { RequestContext } from '../../shared/request-context/request-context.dto'
import { CreateUserInput } from '../dtos/user-create-input.dto'
import { UserOutput } from '../dtos/user-output.dto'
import { UpdateUserInput } from '../dtos/user-update-input.dto'
import { User } from '../entities/user.entity'
import { UserRepository } from '../repositories/user.repository'

@Injectable()
export class UserService {
  constructor(
    private repository: UserRepository,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(UserService.name)
  }

  async createUser(
    ctx: RequestContext,
    input: CreateUserInput,
  ): Promise<UserOutput> {
    this.logger.log(ctx, `${this.createUser.name} was called`)

    const hashedPassword = await hash(input.password, 10)

    this.logger.log(ctx, `calling ${UserRepository.name}.create`)
    const user = await this.repository.create({
      ...input,
      password: hashedPassword,
    })

    return plainToClass(UserOutput, user, {
      excludeExtraneousValues: true,
    })
  }

  async validateUsernamePassword(
    ctx: RequestContext,
    username: string,
    pass: string,
  ): Promise<UserOutput> {
    this.logger.log(ctx, `${this.validateUsernamePassword.name} was called`)

    this.logger.log(ctx, `calling ${UserRepository.name}.findOne`)
    const user = await this.repository.findOne({ username })
    if (!user)
      throw new UnauthorizedException()

    const isMatch = await compare(pass, user.password)
    if (!isMatch)
      throw new UnauthorizedException()

    return plainToClass(UserOutput, user, {
      excludeExtraneousValues: true,
    })
  }

  async getUsers(
    ctx: RequestContext,
    limit: number,
    offset: number,
  ): Promise<{ count: number, users: UserOutput[] }> {
    this.logger.log(ctx, `${this.getUsers.name} was called`)

    this.logger.log(ctx, `calling ${UserRepository.name}.find and count`)
    const [users, count] = await Promise.all([
      this.repository.find({}, offset, limit),
      this.repository.count({}),
    ])

    const usersOutput = plainToClass(UserOutput, users, {
      excludeExtraneousValues: true,
    })

    return { count, users: usersOutput }
  }

  async findById(ctx: RequestContext, id: string): Promise<UserOutput> {
    this.logger.log(ctx, `${this.findById.name} was called`)

    this.logger.log(ctx, `calling ${UserRepository.name}.findOne`)
    const user = await this.repository.findOne({ _id: id })

    return plainToClass(UserOutput, user, {
      excludeExtraneousValues: true,
    })
  }

  async getUserById(ctx: RequestContext, id: string): Promise<UserOutput> {
    this.logger.log(ctx, `${this.getUserById.name} was called`)

    this.logger.log(ctx, `calling ${UserRepository.name}.getById`)
    const user = await this.repository.getById(id)

    return plainToClass(UserOutput, user, {
      excludeExtraneousValues: true,
    })
  }

  async findByUsername(
    ctx: RequestContext,
    username: string,
  ): Promise<UserOutput> {
    this.logger.log(ctx, `${this.findByUsername.name} was called`)

    this.logger.log(ctx, `calling ${UserRepository.name}.findOne`)
    const user = await this.repository.findOne({ username })

    return plainToClass(UserOutput, user, {
      excludeExtraneousValues: true,
    })
  }

  async updateUser(
    ctx: RequestContext,
    userId: string,
    input: UpdateUserInput,
  ): Promise<UserOutput> {
    this.logger.log(ctx, `${this.updateUser.name} was called`)

    this.logger.log(ctx, `calling ${UserRepository.name}.getById`)
    const user = await this.repository.getById(userId)

    // Hash the password if it exists in the input payload.
    if (input.password) {
      input.password = await hash(input.password, 10)
    }

    // merges the input (2nd line) to the found user (1st line)
    const updateUser: User = {
      ...user,
      ...input,
    }

    this.logger.log(ctx, `calling ${UserRepository.name}.update`)
    const updatedUser = await this.repository.update(updateUser)
    if (!updatedUser) {
      throw new NotFoundException()
    }

    return plainToClass(UserOutput, updatedUser, {
      excludeExtraneousValues: true,
    })
  }
}
