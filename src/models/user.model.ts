import { Schema, model, Document } from 'mongoose'
import bcrypt from 'bcrypt'
import config from 'config'

export interface UserDocument extends Document {
  email: string
  name: string
  password: string
  createdAt: Date
  updatedAt: Date
  comparePassword: (candidatePassword: string) => Promise<boolean>
}

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
},
{ timestamps: true })

// Hash the user password before save it
userSchema.pre('save', async function (next) {
  const user = this as UserDocument
  const saltWorkFactor = config.get<number>('saltWorkFactor')

  if (!user.isModified('password')) {
    return next()
  }

  const salt = await bcrypt.genSalt(saltWorkFactor)
  const hash = await bcrypt.hashSync(user.password, salt)

  user.password = hash

  return next()
})

userSchema.methods.comparePassword =
  async function (candidatePassword: string): Promise<boolean> {
    const user = this as UserDocument
    return await bcrypt.compare(candidatePassword, user.password).catch(e => false)
  }

const UserModel = model('User', userSchema)

export default UserModel
