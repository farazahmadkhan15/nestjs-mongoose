import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { User } from '../entities/user.entity'

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec()
    if (!user) {
      throw new NotFoundException()
    }

    return user
  }

  async findOne(filter: Partial<User>): Promise<User | null> {
    return this.userModel.findOne(filter).exec()
  }

  async find(filter: Partial<User> = {}, skip = 0, limit = 10): Promise<User[]> {
    return this.userModel.find(filter).skip(skip).limit(limit).exec()
  }

  async count(filter: Partial<User> = {}): Promise<number> {
    return this.userModel.countDocuments(filter).exec()
  }

  async create(user: Partial<User>): Promise<User> {
    // eslint-disable-next-line new-cap
    const createdUser = new this.userModel(user)
    return createdUser.save()
  }

  async update(user: User): Promise<User | null> {
    return this.userModel.findByIdAndUpdate(user._id, user, { new: true }).exec()
  }
}
