const matchingService = require('../services/matchingService');

exports.getBuyers = async (req, res) => {
  const result = await matchingService.findBuyerMatches();
  res.json(result);
};

exports.createRequirement = async (req, res) => {
  const { productName, quantity, budgetPerUnit, deliveryDays, location } = req.body;
  const requirement = {
    id: `req-${Date.now()}`,
    productName: productName || 'Handmade Bags',
    quantity: Number(quantity || 500),
    budgetPerUnit: Number(budgetPerUnit || 1500),
    deliveryDays: Number(deliveryDays || 30),
    location: location || 'Punjab'
  };

  const matches = await matchingService.findArtisanMatchesForRequirement(requirement);

  res.status(201).json({
    success: true,
    requirement,
    matches: matches.matches
  });
};
