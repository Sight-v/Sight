import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    pictureUrl: {
      type: String,
      default: "https://cdn.discordapp.com/attachments/1055907531622465648/1056987909359685692/default_pfp.png",
    },
    location: String,
    occupation: String,
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
