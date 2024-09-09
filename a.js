exports.voteGame = async (req, res) => {
    try {
      const gameId = req.params.id;
      const userId = req.user._id; // Suponiendo que el ID del usuario se obtiene de la sesión o el token
  
      const game = await Game.findById(gameId);
      if (!game) {
        return res.status(404).json({ message: 'Game not found' });
      }
  
      // Verificar si el usuario ya ha votado
      if (game.votes.includes(userId)) {
        return res.status(400).json({ message: 'You have already voted for this game' });
      }
  
      // Incrementar votos y añadir el usuario a la lista de votantes
      game.votes += 1;
      game.votes.push(userId);
      await game.save();
  
      res.status(200).json(game);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
  

  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Method",
      "GET"
    ); /* header del html de respuesta */
    /* Metodos que permitimos hacer a alguien, en este caso como el usuario solo va a poder hacer un GET de info no ponemos el resto (DELETE, POST, etc.*/
    res.header("Access-Control-Allow-Credentials", "true");
    /* CREDENCIALES con el TOKEN. si no aparece esto nunca podríamos atacar al token, que va dentro del header de respuesta que recibimos. Con esto permitimos la conexion con el token */
    res.header("Access-Control-Allow-Headers", "Content-Type");
    /* Permitimos los header del tipo content-type */
    next(); /* le decimos que pase a la siguiente función, que no se quede aquí */
  });
  