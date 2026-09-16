const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');

router.post('/transcribe', aiController.transcribe);
router.post('/enhance-image', aiController.enhanceImage);
router.post('/catalog', aiController.generateCatalog);
router.post('/pricing', aiController.calculatePricing);
router.post('/match', aiController.matchBuyers);

module.exports = router;
