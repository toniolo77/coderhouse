import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  facebookId: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  picture: { type: String, required: true },
});

export const UserModel = mongoose.model("User", userSchema);
