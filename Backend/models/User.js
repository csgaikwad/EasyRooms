import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userEmail: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  isOwner: Boolean,
  properties: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PropertyDetails' }]
});

userSchema.index({ userEmail: 1 }, { unique: true });

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
