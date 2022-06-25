const Mongoose = require("mongoose");
const { Schema, model } = Mongoose;
const bcrypt = require("bcryptjs");

const reds_Schema = new Schema(
  {
    user: String,
    password: String,
    pass_repeat: String,
  },
  { versionKey: false }
);

// Encriptar contraseña
reds_Schema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

reds_Schema.methods.matchPassword = async (password) => {
  return await bcrypt.compare(password, this.password);
}

// Crear un modelo
const ex = Mongoose.model("users", reds_Schema);

module.exports = ex;
