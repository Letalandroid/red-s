const Mongoose = require("mongoose");
const { Schema, model } = Mongoose;
const bcrypt = require("bcryptjs");

const reds_Schema = new Schema(
  {
    user: String,
    password: String
  },
  { versionKey: false }
);

// Encriptar contraseña
reds_Schema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSaltSync(10);
  return await bcrypt.hash(password, salt);
}

reds_Schema.methods.matchPassword = async function (password) {
  return await bcrypt.compareSync(password, this.password);
}

// Crear un modelo
const ex = Mongoose.model("users", reds_Schema);

module.exports = ex;
