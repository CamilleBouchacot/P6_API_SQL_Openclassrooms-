const express = require('express');
const router = express.Router();


const sauceControllers = require('../controllers/sauce');

router.get('/', sauceControllers.getAllSauces);
router.post('/', sauceControllers.createSauce);
router.get('/:id', sauceControllers.getOneSauce);
router.put('/:id', sauceControllers.modifySauce);
router.delete('/:id', sauceControllers.deleteSauce);

module.exports = router;