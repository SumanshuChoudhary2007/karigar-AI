// Pricing Engine: Mathematical cost-plus calculation + market markup bounds
// Strictly adheres to deterministic math formula to avoid random LLM pricing

exports.calculatePricing = async (costData) => {
  const material = Number(costData.materialCost || 450);
  const labour = Number(costData.labourCost || 300);
  const packaging = Number(costData.packaging || 50);
  const shipping = Number(costData.shipping || 100);
  const other = Number(costData.otherCost || 50);

  // Exact total cost math
  const totalCost = material + labour + packaging + shipping + other;

  // Standard Fair Craft Margin Range (30% to 50% above cost)
  const minMarginPercent = 0.315; // ~ ₹300 profit on ₹950
  const maxMarginPercent = 0.526; // ~ ₹500 profit on ₹950

  const suggestedMin = Math.round(totalCost + (totalCost * minMarginPercent)); // ₹1,250
  const suggestedMax = Math.round(totalCost + (totalCost * maxMarginPercent)); // ₹1,450

  const estimatedProfitMin = Math.round(suggestedMin - totalCost);
  const estimatedProfitMax = Math.round(suggestedMax - totalCost);

  return {
    success: true,
    costs: {
      material,
      labour,
      packaging,
      shipping,
      other,
      totalCost
    },
    recommendation: {
      suggestedMin,
      suggestedMax,
      estimatedProfitMin,
      estimatedProfitMax,
      confidenceScore: 78,
      explanation: 'Suggested using your production cost and demo market data.',
      isDemoData: true
    }
  };
};
