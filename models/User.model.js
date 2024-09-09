const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  votes: { type: Number, default: 5 },
  votedGames: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game' }],
},
{
    timestamps:true //para una base de datos que se va a actualizar o modificar te crea un campo con una fecha de actualizacion y creacion
}
);

module.exports = mongoose.model('User', UserSchema);
