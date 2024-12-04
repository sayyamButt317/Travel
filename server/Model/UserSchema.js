import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, auto: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  registrationDate: { type: Date, default: Date.now },
});

export const User = mongoose.model("User", userSchema);
export default User;