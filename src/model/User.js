import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    default: null,
  },
  id: {
    type: String,
    default: null,
  },
  password: {
    type: String,
  },
  nickname: {
    type: String,
    require: true,
    unique: true,
  },
  socialId: {
    type: String,
    unique: true,
  },
});

userSchema.virtual("userId").get(function () {
  return this._id.toHexString();
});
userSchema.set("toJSON", {
  virtuals: true,
});

export default mongoose.models.User || mongoose.model("User", userSchema);
// export default mongoose.model("User", userSchema);
