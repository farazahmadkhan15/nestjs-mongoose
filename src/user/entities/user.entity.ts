import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema({ collection: 'users', timestamps: true })
export class User {
  _id?: string

  @Prop({ maxlength: 100, required: true })
  name: string

  @Prop({ required: true })
  password: string

  @Prop({ maxlength: 200, required: true, unique: true })
  username: string

  @Prop({ required: true, type: [String] })
  roles: string[]

  @Prop({ default: false, required: true })
  isAccountDisabled: boolean

  @Prop({ maxlength: 200, required: true, unique: true })
  email: string

  createdAt?: Date

  updatedAt?: Date
}

export const UserSchema = SchemaFactory.createForClass(User)
