const Game = require('../models/Game.model');

// Crear un nuevo juego (solo admin)
exports.createGame = async (req, res) => {
  const { name, category, image } = req.body;
  try {
    const newGame = new Game({ name, category, image });
    await newGame.save();
    res.status(201).json(newGame);
  } catch (error) {
    res.status(500).json({ error: 'Error creating game' });
  }
};

// Obtener todos los juegos
exports.getAllGames = async (req, res) => {
  try {
    const games = await Game.find().sort({ votes: -1 });
    res.json(games);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching games' });
  }
};

// Editar juego
exports.editGame = async (req, res) => {
  const { id } = req.params;
  const { name, category, image } = req.body;
  try {
    const game = await Game.findByIdAndUpdate(id, { name, category, image }, { new: true });
    res.json(game);
  } catch (error) {
    res.status(500).json({ error: 'Error editing game' });
  }
};

// Eliminar juego
exports.deleteGame = async (req, res) => {
  const { id } = req.params;
  try {
    await Game.findByIdAndDelete(id);
    res.json({ message: 'Game deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting game' });
  }
};


// Función para manejar la votación
exports.voteGame = async (req, res) => {
  try {
    const gameId = req.params.id;
    const userId = req.user._id; // Suponiendo que el ID del usuario se obtiene de la sesión o el token

    const game = await Game.findById(gameId);
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    // Verificar si el usuario ya ha votado
    if (game.votes.users.includes(userId)) {
      return res.status(400).json({ message: 'You have already voted for this game' });
    }

    // Verificar si el usuario tiene votos disponibles (en el modelo de usuario)
    const user = await User.findById(userId);
    if (!user || user.votes.length >= 5) {
      return res.status(400).json({ message: 'Maximum votes reached' });
    }

    // Incrementar votos y añadir el usuario a la lista de votantes
    game.votes.count += 1;
    game.votes.users.push(userId);
    await game.save();

    // Opcional: Añadir el juego al historial de votos del usuario
    user.votes.push(gameId);
    await user.save();

    res.status(200).json(game);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


