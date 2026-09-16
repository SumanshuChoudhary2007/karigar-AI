const express = require('express');
const router = express.Router();
const buyerController = require('../controllers/buyerController');

router.get('/', buyerController.getBuyers);
router.post('/requirements', buyerController.createRequirement);

module.exports = router;
