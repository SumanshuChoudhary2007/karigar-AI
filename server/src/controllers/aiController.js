const aiService = require('../services/aiService');
const catalogService = require('../services/catalogService');
const pricingService = require('../services/pricingService');
const matchingService = require('../services/matchingService');

exports.transcribe = async (req, res) => {
  try {
    const { audioData, languageCode } = req.body;
    const result = await catalogService.transcribeSpeech(audioData, languageCode);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Speech transcription failed' });
  }
};

exports.enhanceImage = async (req, res) => {
  try {
    const { imageUrl } = req.body;
    const result = await aiService.enhanceAndCleanImage(imageUrl);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Image processing failed' });
  }
};

exports.generateCatalog = async (req, res) => {
  try {
    const { transcript, craftType, userInputs } = req.body;
    const result = await catalogService.generateCatalog({ transcript, craftType, userInputs });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Catalog generation failed' });
  }
};

exports.calculatePricing = async (req, res) => {
  try {
    const costData = req.body;
    const result = await pricingService.calculatePricing(costData);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Pricing calculation failed' });
  }
};

exports.matchBuyers = async (req, res) => {
  try {
    const result = await matchingService.findBuyerMatches(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Buyer matching failed' });
  }
};
