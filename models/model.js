import mongoose from "mongoose";
const Mschema = new mongoose.Schema({
     name: String,
     email: {
          type: String,
          unique: true,
          required: true
     },
     password: {
          type: String,
          select: false,
          required: true
     },
     Gender: String,
     createdAT: {
          type: Date,
          default: Date.now,
     }
})
export const User = mongoose.model("User", Mschema)

