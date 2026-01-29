import mongoose, { Schema } from "mongoose";
import { unique } from "next/dist/build/utils";

const userSchema = new Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  gmail: { type: String, required: true, unique: true },
  imageUrl: { type: String, required: true },
  cartItem: ({ type: Object, default: {} }, { minimize: false }),
});

const User = mongoose.models.user || mongoose.model("user", userSchema);

export default User;
