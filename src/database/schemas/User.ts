import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    discordId: { type: String, required: true, unique: true },
    username: { type: String, default: '' },
  },
  { timestamps: true },
)

const UserModel = mongoose.model('User', UserSchema)

export default UserModel
