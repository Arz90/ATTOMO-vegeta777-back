const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');
const { voteGame } = require('../controllers/gameController.js');
const { protect } = require('../middlewares/authMiddleware.js');

router.post('/', gameController.createGame);
router.get('/', gameController.getAllGames);
router.put('/:id', gameController.editGame);
router.delete('/:id', gameController.deleteGame);
router.post('/:id/vote', protect, voteGame);



module.exports = router;
