const express = require('express');
const router = express.Router();


const stuffControllers = require('../controllers/stuff');

router.get('/', stuffControllers.getAllStuff);
router.post('/', stuffControllers.createThing);
router.get('/:id', stuffControllers.getOneThing);
router.put('/:id', stuffControllers.modifyThing);
router.delete('/:id', stuffControllers.deleteThing);

module.exports = router;