// son los validadores, por aqui pasa lo que queramos y si no tiene estas validaciones pues saltara el error.
// son regex - que contenga mayusculas y minusculas por ejemplo

const User = require("../models/User.model");

const validateEmail = (username) => {
  const regex =
    /^[\p{L}!#-'*+\-/\d=?^-~]+(.[\p{L}!#-'*+\-/\d=?^-~])*@[^@\s]{2,}$/;
  // si pasa los parametros de la validacion de arriba, return lo transforma en string para email y en minuscula
  return regex.test(String(username).toLowerCase());
};

const validatePassword = (password) => {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(String(password));
};

// en este caso es asincrona porque tiene que hacer una peticion
const usedEmail = async (username) => {
  const users = await User.find({ username: username });
  return users.length;
};

module.exports = { validateEmail, validatePassword, usedEmail };
