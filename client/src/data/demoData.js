export const INITIAL_PRODUCTS = [
  {
    id: 'prod-101',
    title: 'Handmade Phulkari Cotton Bag',
    category: 'Handicraft / Bags',
    material: 'Cotton & Silk Thread',
    craft: 'Phulkari',
    description: 'Handcrafted cotton tote bag featuring traditional Punjabi Phulkari floral embroidery in vibrant silk threads. Durable handles with inner zip pocket.',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&auto=format&fit=crop',
    cleanedImage: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&auto=format&fit=crop',
    cost: { materialCost: 450, labourCost: 300, packaging: 50, shipping: 100, otherCost: 50, totalCost: 950 },
    recommendation: { suggestedMin: 1250, suggestedMax: 1450, estimatedProfitMin: 300, estimatedProfitMax: 500, confidenceScore: 78, explanation: 'Suggested using your production cost and demo market data.', isDemoData: true },
    translations: {
      en: { title: 'Handmade Phulkari Cotton Bag', description: 'Handcrafted cotton tote bag featuring traditional Punjabi Phulkari floral embroidery in vibrant silk threads.' },
      hi: { title: 'हस्तनिर्मित फुलकारी कॉटन बैग', description: 'पारंपरिक पंजाबी फुलकारी रेशमी धागों की कढ़ाई वाला हाथ से बना कॉटन का थैला।' },
      pa: { title: 'ਹੱਥ ਨਾਲ ਬਣਿਆ ਫੁਲਕਾਰੀ ਕੱਪੜੇ ਦਾ ਬੈਗ', description: 'ਪਰੰਪਰਾਗਤ ਪੰਜਾਬੀ ਫੁਲਕਾਰੀ ਕਢਾਈ ਨਾਲ ਤਿਆਰ ਕੀਤਾ ਗਿਆ ਕਪਾਹ ਦਾ ਬੈਗ।' }
    }
  },
  {
    id: 'prod-102',
    title: 'Authentic Punjabi Jutti',
    category: 'Footwear',
    material: 'Genuine Leather & Zari',
    craft: 'Punjabi Jutti',
    description: 'Handcrafted traditional Punjabi leather footwear embroidered with golden Zari motifs and cushioned inner sole.',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&auto=format&fit=crop',
    cleanedImage: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&auto=format&fit=crop',
    cost: { materialCost: 600, labourCost: 400, packaging: 60, shipping: 120, otherCost: 40, totalCost: 1220 },
    recommendation: { suggestedMin: 1650, suggestedMax: 1950, estimatedProfitMin: 430, estimatedProfitMax: 730, confidenceScore: 82, explanation: 'High demand in ethnic wedding retail category.', isDemoData: true }
  },
  {
    id: 'prod-103',
    title: 'Handwoven Silk Dupatta',
    category: 'Textile',
    material: 'Pure Chanderi Silk',
    craft: 'Handloom Weaving',
    description: 'Lightweight handwoven silk dupatta accented with traditional geometric borders and hand-knotted tassels.',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop',
    cleanedImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop',
    cost: { materialCost: 500, labourCost: 350, packaging: 50, shipping: 100, otherCost: 50, totalCost: 1050 },
    recommendation: { suggestedMin: 1400, suggestedMax: 1650, estimatedProfitMin: 350, estimatedProfitMax: 600, confidenceScore: 80, explanation: 'Based on silk weaving craft benchmarks.', isDemoData: true }
  },
  {
    id: 'prod-104',
    title: 'Eco Bamboo Storage Basket',
    category: 'Home Decor',
    material: 'Natural Bamboo & Cane',
    craft: 'Bamboo Weaving',
    description: 'Sturdy eco-friendly storage basket woven by hand using natural sustainable bamboo strands.',
    image: 'https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=600&auto=format&fit=crop',
    cleanedImage: 'https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=600&auto=format&fit=crop',
    cost: { materialCost: 150, labourCost: 150, packaging: 30, shipping: 70, otherCost: 20, totalCost: 420 },
    recommendation: { suggestedMin: 650, suggestedMax: 850, estimatedProfitMin: 230, estimatedProfitMax: 430, confidenceScore: 85, explanation: 'Eco-friendly sustainable craft market benchmark.', isDemoData: true }
  },
  {
    id: 'prod-105',
    title: 'Terracotta Handpainted Water Pot',
    category: 'Pottery',
    material: 'Natural Clay & Organic Pigments',
    craft: 'Terracotta Pottery',
    description: 'Traditional earthen clay pot handpainted with organic ethnic patterns for naturally cool drinking water.',
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=600&auto=format&fit=crop',
    cleanedImage: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=600&auto=format&fit=crop',
    cost: { materialCost: 100, labourCost: 120, packaging: 50, shipping: 80, otherCost: 30, totalCost: 380 },
    recommendation: { suggestedMin: 550, suggestedMax: 700, estimatedProfitMin: 170, estimatedProfitMax: 320, confidenceScore: 76, explanation: 'Calculated using artisan pottery benchmarks.', isDemoData: true }
  }
];

export const DEMO_BUYERS = [
  {
    id: 'b-1',
    companyName: 'Punjab Handicraft Retailer',
    businessType: 'Retailer',
    needs: '500 handmade bags',
    budget: '₹1,000 – ₹1,500',
    location: 'Punjab',
    matchScore: 92,
    reasons: [
      'Product match (Phulkari Bag)',
      'Budget range (₹1,250 – ₹1,450 / unit)',
      'Quantity (500 pcs capacity)',
      'Location (Punjab)'
    ],
    contactPhone: '+91 91234 56789'
  },
  {
    id: 'b-2',
    companyName: 'Delhi Gift Company',
    businessType: 'Wholesaler',
    needs: '200 textile bags',
    budget: '₹1,200 – ₹1,400',
    location: 'Delhi',
    matchScore: 84,
    reasons: [
      'Product category match',
      'High repeat orders rating',
      'Fast 15-day payment terms'
    ],
    contactPhone: '+91 98112 23344'
  }
];

export const DEMO_ORDERS = [
  {
    id: 'ord-1024',
    orderNumber: '#KAR1024',
    buyerName: 'Punjab Handicraft Retailer',
    productTitle: '500 Phulkari Bags',
    totalAmount: 650000.0,
    status: 'Picked Up',
    date: '14 Sep 2026',
    trackingId: 'TRK-PK-984210',
    expectedDelivery: '19 Sep 2026',
    currentStep: 4,
    timeline: [
      { step: 1, label: 'Order Placed', completed: true, date: '14 Sep 10:00 AM' },
      { step: 2, label: 'Artisan Confirmed', completed: true, date: '14 Sep 02:30 PM' },
      { step: 3, label: 'Packed', completed: true, date: '15 Sep 05:00 PM' },
      { step: 4, label: 'Picked Up', completed: true, current: true, date: '16 Sep 09:15 AM' },
      { step: 5, label: 'In Transit', completed: false, date: 'Estimated 17 Sep' },
      { step: 6, label: 'Delivered', completed: false, date: 'Estimated 19 Sep' }
    ]
  },
  {
    id: 'ord-1023',
    orderNumber: '#KAR1023',
    buyerName: 'Delhi Gift Company',
    productTitle: '200 Punjabi Juttis',
    totalAmount: 330000.0,
    status: 'Delivered',
    date: '02 Sep 2026',
    trackingId: 'TRK-DL-441092',
    expectedDelivery: '07 Sep 2026',
    currentStep: 6,
    timeline: [
      { step: 1, label: 'Order Placed', completed: true },
      { step: 2, label: 'Artisan Confirmed', completed: true },
      { step: 3, label: 'Packed', completed: true },
      { step: 4, label: 'Picked Up', completed: true },
      { step: 5, label: 'In Transit', completed: true },
      { step: 6, label: 'Delivered', completed: true, current: true }
    ]
  }
];
