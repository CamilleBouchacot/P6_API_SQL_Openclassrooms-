const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const stuffControllers = require('../controllers/stuff');

router.get('/', auth, stuffControllers.getAllStuff);
router.post('/', auth, stuffControllers.createThing);
router.get('/:id', auth, stuffControllers.getOneThing);
router.put('/:id', auth, stuffControllers.modifyThing);
router.delete('/:id', auth, stuffControllers.deleteThing);

module.exports = router;