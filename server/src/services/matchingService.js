// B2B Market Linkage Matching Engine (Embeddings / vector similarity mock)

exports.findBuyerMatches = async (productOrArtisan) => {
  await new Promise((resolve) => setTimeout(resolve, 400));

  // Structured B2B Buyer matches matching the prompt specifications
  return {
    success: true,
    matches: [
      {
        id: 'buyer-match-1',
        buyerName: 'Punjab Handicraft Retailer',
        businessType: 'Retailer',
        location: 'Punjab',
        needs: '500 handmade bags',
        budget: '₹1,000 – ₹1,500',
        matchScore: 92,
        reasons: [
          'Product type match (Phulkari Tote)',
          'Budget alignment (₹1,250 – ₹1,450 / unit)',
          'Quantity capacity (500 pcs batch)',
          'Same regional location (Punjab)'
        ],
        contactPhone: '+91 91234 56789',
        verifiedBuyer: true
      },
      {
        id: 'buyer-match-2',
        buyerName: 'Delhi Gift Company',
        businessType: 'Wholesaler',
        location: 'Delhi',
        needs: '200 textile bags',
        budget: '₹1,200 – ₹1,400',
        matchScore: 84,
        reasons: [
          'Handicraft textile category match',
          'High buyer repeat rating',
          'Fast 15-day payment cycle'
        ],
        contactPhone: '+91 98112 23344',
        verifiedBuyer: true
      }
    ]
  };
};

exports.findArtisanMatchesForRequirement = async (requirement) => {
  await new Promise((resolve) => setTimeout(resolve, 400));

  return {
    success: true,
    matches: [
      {
        id: 'artisan-match-1',
        artisanName: 'Gurpreet Handicrafts',
        craft: 'Phulkari',
        capacity: '600 / month',
        pricePerUnit: '₹1,300 / unit',
        location: 'Punjab',
        matchScore: 92,
        experience: '12 years',
        verifiedArtisan: true
      },
      {
        id: 'artisan-match-2',
        artisanName: 'Patiala Weavers Cluster',
        craft: 'Handloom Cotton',
        capacity: '400 / month',
        pricePerUnit: '₹1,250 / unit',
        location: 'Punjab',
        matchScore: 88,
        experience: '15 years',
        verifiedArtisan: true
      },
      {
        id: 'artisan-match-3',
        artisanName: 'Amritsar Crafts Cooperative',
        craft: 'Zari Embroidery',
        capacity: '350 / month',
        pricePerUnit: '₹1,400 / unit',
        location: 'Punjab',
        matchScore: 81,
        experience: '8 years',
        verifiedArtisan: true
      }
    ]
  };
};
