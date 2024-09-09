const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    votes: {
      count: { type: Number, default: 0 },
      users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    },
  },
  {
    timestamps: true, //para una base de datos que se va a actualizar o modificar te crea un campo con una fecha de actualizacion y creacion
  }
);

module.exports = mongoose.model("Game", GameSchema);

//votes: { type: Number, default: 0 },
