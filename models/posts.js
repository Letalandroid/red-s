const Mongoose = require("mongoose");
const { Schema, model } = Mongoose;

const postSchema = new Schema(
  {
    title: String,
    description: String,
    user: String
  },
  { versionKey: false }
);

// Crear un modelo
const newPost = Mongoose.model("posts", postSchema);

module.exports = newPost;
