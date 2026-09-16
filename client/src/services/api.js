import { INITIAL_PRODUCTS, DEMO_BUYERS, DEMO_ORDERS } from '../data/demoData';

const API_BASE = '/api';

async function safeFetch(url, options = {}) {
  try {
    const res = await fetch(`${API_BASE}${url}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      },
      ...options
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn(`[Karigar API Fallback] ${url} endpoint offline or error. Using client mock handler.`, err.message);
    return null;
  }
}

export const apiService = {
  login: async (phone, password, role = 'ARTISAN', name = '') => {
    const res = await safeFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ phone, password, role, name })
    });

    if (res && res.success) return res;

    // Client-side fallback login
    const isArtisan = role === 'ARTISAN' || phone === '9876543210';
    return {
      success: true,
      token: 'demo-jwt-token-12345',
      user: {
        id: isArtisan ? 'artisan-1' : 'buyer-1',
        phone: phone || '9876543210',
        name: name || (isArtisan ? 'Gurpreet Kaur' : 'Punjab Handicraft Retailer'),
        role: isArtisan ? 'ARTISAN' : 'BUYER',
        artisan: isArtisan ? { craft: 'Phulkari', location: 'Punjab', salesTotal: 38400, ordersTotal: 24, productCount: 8 } : null
      }
    };
  },

  googleLogin: async (role = 'ARTISAN', credential = null, email = '', name = '') => {
    const res = await safeFetch('/auth/google', {
      method: 'POST',
      body: JSON.stringify({ credential, role, email, name })
    });

    if (res && res.success) return res;

    return {
      success: true,
      token: 'google-jwt-token-998877',
      user: {
        id: 'google-artisan-1',
        phone: email || 'gurpreet.artisan@gmail.com',
        name: name ? `${name} (Google)` : 'Gurpreet Kaur (Google)',
        role: role,
        artisan: role === 'ARTISAN' ? { craft: 'Phulkari Embroidery', location: 'Punjab', salesTotal: 38400, ordersTotal: 24, productCount: 8 } : null
      }
    };
  },

  enhanceImage: async (imageUrl) => {
    const res = await safeFetch('/api/ai/enhance-image', {
      method: 'POST',
      body: JSON.stringify({ imageUrl })
    });

    if (res && res.success) return res;

    return {
      success: true,
      originalUrl: imageUrl,
      cleanedUrl: imageUrl,
      stepsCompleted: ['Photo cleaned', 'Background removed', 'Lighting improved']
    };
  },

  transcribeSpeech: async (audioData, languageCode = 'pa') => {
    const res = await safeFetch('/ai/transcribe', {
      method: 'POST',
      body: JSON.stringify({ audioData, languageCode })
    });

    if (res && res.success) return res;

    return {
      success: true,
      detectedLanguage: languageCode === 'pa' ? 'Punjabi' : languageCode === 'hi' ? 'Hindi' : 'English',
      transcript: 'Eh handmade Phulkari bag hai. Cotton fabric ton baneya hai.'
    };
  },

  generateCatalog: async (transcript, craftType = 'Phulkari', userInputs = {}) => {
    const res = await safeFetch('/ai/catalog', {
      method: 'POST',
      body: JSON.stringify({ transcript, craftType, userInputs })
    });

    if (res && res.success) return res;

    const titleEn = userInputs.title || 'Handmade Phulkari Cotton Bag';
    const descEn = userInputs.description || 'Short AI-generated professional description handcrafted with pure cotton fabric and vibrant silk floral embroidery.';

    return {
      success: true,
      title: titleEn,
      category: 'Handicraft / Bags',
      material: 'Cotton',
      craft: 'Phulkari',
      description: descEn,
      translations: {
        en: { title: titleEn, description: descEn },
        hi: { title: 'हस्तनिर्मित फुलकारी कॉटन बैग', description: 'पारंपरिक पंजाबी फुलकारी रेशमी धागों की कढ़ाई वाला हाथ से बना कॉटन का थैला।' },
        pa: { title: 'ਹੱਥ ਨਾਲ ਬਣਿਆ ਫੁਲਕਾਰੀ ਕੱਪੜੇ ਦਾ ਬੈਗ', description: 'ਪਰੰਪਰਾਗਤ ਪੰਜਾਬੀ ਫੁਲਕਾਰੀ ਕਢਾਈ ਨਾਲ ਤਿਆਰ ਕੀਤਾ ਗਿਆ ਕਪਾਹ ਦਾ ਬੈਗ।' }
      },
      disclaimer: 'AI-generated information. Please verify before publishing.'
    };
  },

  calculatePricing: async (costData) => {
    const res = await safeFetch('/ai/pricing', {
      method: 'POST',
      body: JSON.stringify(costData)
    });

    if (res && res.success) return res;

    const material = Number(costData.materialCost || 450);
    const labour = Number(costData.labourCost || 300);
    const packaging = Number(costData.packaging || 50);
    const shipping = Number(costData.shipping || 100);
    const other = Number(costData.otherCost || 50);
    const totalCost = material + labour + packaging + shipping + other;

    return {
      success: true,
      costs: { material, labour, packaging, shipping, other, totalCost },
      recommendation: {
        suggestedMin: 1250,
        suggestedMax: 1450,
        estimatedProfitMin: 300,
        estimatedProfitMax: 500,
        confidenceScore: 78,
        explanation: 'Suggested using your production cost and demo market data.',
        isDemoData: true
      }
    };
  },

  getProducts: async () => {
    const res = await safeFetch('/products');
    if (res && res.products) return res.products;
    return INITIAL_PRODUCTS;
  },

  getBuyers: async () => {
    const res = await safeFetch('/buyers');
    if (res && res.matches) return res.matches;
    return DEMO_BUYERS;
  },

  getOrders: async () => {
    const res = await safeFetch('/orders');
    if (res && res.orders) return res.orders;
    return DEMO_ORDERS;
  },

  createBuyerRequirement: async (reqData) => {
    const res = await safeFetch('/buyers/requirements', {
      method: 'POST',
      body: JSON.stringify(reqData)
    });

    if (res && res.success) return res;

    return {
      success: true,
      requirement: reqData,
      matches: [
        {
          id: 'artisan-m1',
          artisanName: 'Gurpreet Handicrafts',
          craft: 'Phulkari',
          capacity: '600 / month',
          pricePerUnit: '₹1,300 / unit',
          matchScore: 92,
          location: 'Punjab'
        },
        {
          id: 'artisan-m2',
          artisanName: 'Patiala Artisans Co-op',
          craft: 'Phulkari & Jutti',
          capacity: '400 / month',
          pricePerUnit: '₹1,250 / unit',
          matchScore: 88,
          location: 'Punjab'
        },
        {
          id: 'artisan-m3',
          artisanName: 'Amritsar Crafts',
          craft: 'Handloom Embroidery',
          capacity: '350 / month',
          pricePerUnit: '₹1,400 / unit',
          matchScore: 81,
          location: 'Punjab'
        }
      ]
    };
  }
};
