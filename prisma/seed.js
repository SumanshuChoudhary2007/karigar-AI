const { PrismaClient } = require('@prisma/client');

let bcrypt;
try {
  bcrypt = require('bcryptjs');
} catch (e) {
  try {
    bcrypt = require('../server/node_modules/bcryptjs');
  } catch (err) {
    bcrypt = {
      hash: async (pass) => '$2a$10$e8pYh8H9n4u9K8w2xY.gUeQ2a8fK0u0m0a0u0m0a0u0m0a0u0m0a'
    };
  }
}

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding Karigar AI Database in XAMPP MySQL...');

  // Password for demo users: "password123"
  const hashedPassword = await bcrypt.hash('password123', 10);

  // 1. Create Artisan User (Gurpreet)
  const artisanUser = await prisma.user.upsert({
    where: { phone: '9876543210' },
    update: {},
    create: {
      phone: '9876543210',
      password: hashedPassword,
      name: 'Gurpreet Kaur',
      role: 'ARTISAN',
      artisan: {
        create: {
          craft: 'Phulkari',
          location: 'Punjab',
          experience: 12,
          salesTotal: 38400.0,
          ordersTotal: 24,
          story: {
            create: {
              rawStory: 'I have been doing Phulkari embroidery for 12 years learned from my mother in Patiala.',
              aiEnhancedStory: 'Master craftswoman Gurpreet carries forward a 12-year generational legacy of traditional Punjabi Phulkari silk hand embroidery. Each piece reflects centuries-old heritage patterns passed down through women artisans in Patiala.',
              heritage: 'Patiala Traditional Silk Thread Embroidery'
            }
          }
        }
      }
    },
    include: { artisan: true }
  });

  const artisanId = artisanUser.artisan ? artisanUser.artisan.id : 'artisan-id-1';

  // 2. Create Buyer Users
  const buyerUser1 = await prisma.user.upsert({
    where: { phone: '9123456789' },
    update: {},
    create: {
      phone: '9123456789',
      password: hashedPassword,
      name: 'Punjab Handicrafts Co',
      role: 'BUYER',
      buyer: {
        create: {
          companyName: 'Punjab Handicraft Retailer',
          location: 'Punjab',
          businessType: 'Retailer'
        }
      }
    },
    include: { buyer: true }
  });

  const buyerUser2 = await prisma.user.upsert({
    where: { phone: '9811223344' },
    update: {},
    create: {
      phone: '9811223344',
      password: hashedPassword,
      name: 'Delhi Gift Enterprises',
      role: 'BUYER',
      buyer: {
        create: {
          companyName: 'Delhi Gift Company',
          location: 'Delhi',
          businessType: 'Wholesaler'
        }
      }
    },
    include: { buyer: true }
  });

  // 3. Create Seed Products
  const productsData = [
    {
      title: 'Handmade Phulkari Cotton Bag',
      category: 'Handicraft / Bags',
      material: 'Pure Cotton & Silk Thread',
      craft: 'Phulkari',
      description: 'Handcrafted cotton tote bag featuring traditional Punjabi Phulkari floral embroidery in vibrant silk threads. Durable handles with inner zip pocket.',
      images: [
        { originalUrl: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&auto=format&fit=crop', cleanedUrl: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&auto=format&fit=crop', isPrimary: true }
      ],
      translations: [
        { language: 'en', title: 'Handmade Phulkari Cotton Bag', description: 'Handcrafted cotton tote bag featuring traditional Punjabi Phulkari floral embroidery in vibrant silk threads.' },
        { language: 'hi', title: 'हस्तनिर्मित फुलकारी कॉटन बैग', description: 'पारंपरिक पंजाबी फुलकारी रेशमी धागों की कढ़ाई वाला हाथ से बना कॉटन का थैला।' },
        { language: 'pa', title: 'ਹੱਥ ਨਾਲ ਬਣਿਆ ਫੁਲਕਾਰੀ ਕੱਪੜੇ ਦਾ ਬੈਗ', description: 'ਪਰੰਪਰਾਗਤ ਪੰਜਾਬੀ ਫੁਲਕਾਰੀ ਕਢਾਈ ਨਾਲ ਤਿਆਰ ਕੀਤਾ ਗਿਆ ਕਪਾਹ ਦਾ ਬੈਗ।' }
      ],
      cost: { materialCost: 450, labourCost: 300, packaging: 50, shipping: 100, otherCost: 50, totalCost: 950 },
      recommendation: { suggestedMin: 1250, suggestedMax: 1450, estimatedProfitMin: 300, estimatedProfitMax: 500, confidenceScore: 78, explanation: 'Suggested using your production cost and demo market data.', isDemoData: true }
    },
    {
      title: 'Authentic Punjabi Jutti',
      category: 'Footwear',
      material: 'Genuine Leather & Zari',
      craft: 'Punjabi Jutti',
      description: 'Handcrafted traditional Punjabi leather footwear embroidered with rich golden Zari motifs and padded inner lining.',
      images: [
        { originalUrl: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&auto=format&fit=crop', cleanedUrl: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&auto=format&fit=crop', isPrimary: true }
      ],
      translations: [
        { language: 'en', title: 'Authentic Punjabi Jutti', description: 'Handcrafted traditional Punjabi leather footwear embroidered with golden Zari.' },
        { language: 'hi', title: 'प्रामाणिक पंजाबी जूती', description: 'सुनहरे ज़री के साथ हस्तनिर्मित पारंपरिक पंजाबी चमड़े की जूती।' },
        { language: 'pa', title: 'ਅਸਲੀ ਪੰਜਾਬੀ ਜੁੱਤੀ', description: 'ਸੁਨਹਿਰੀ ਜ਼ਰੀ ਕਢਾਈ ਵਾਲੀ ਪਰੰਪਰਾਗਤ ਪੰਜਾਬੀ ਚਮੜੇ ਦੀ ਜੁੱਤੀ।' }
      ],
      cost: { materialCost: 600, labourCost: 400, packaging: 60, shipping: 120, otherCost: 40, totalCost: 1220 },
      recommendation: { suggestedMin: 1650, suggestedMax: 1950, estimatedProfitMin: 430, estimatedProfitMax: 730, confidenceScore: 82, explanation: 'High retail buyer demand in footwear seasonal market.', isDemoData: true }
    },
    {
      title: 'Handwoven Silk Dupatta',
      category: 'Textile',
      material: 'Pure Chanderi Silk',
      craft: 'Handloom Weaving',
      description: 'Lightweight handwoven silk dupatta accented with traditional geometric borders and tassels.',
      images: [
        { originalUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop', cleanedUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop', isPrimary: true }
      ],
      translations: [
        { language: 'en', title: 'Handwoven Silk Dupatta', description: 'Lightweight handwoven silk dupatta with border accent.' },
        { language: 'hi', title: 'हथकरघा सिल्क दुपट्टा', description: 'सुंदर बॉर्डर के साथ हाथ से बुना हुआ रेशमी दुपट्टा।' },
        { language: 'pa', title: 'ਹੱਥ ਨਾਲ ਬੁਣਿਆ ਰੇਸ਼ਮੀ ਦੁਪੱਟਾ', description: 'ਖੂਬਸੂਰਤ ਬਾਰਡਰ ਵਾਲਾ ਹੱਥ ਨਾਲ ਬੁਣਿਆ ਰੇਸ਼ਮੀ ਦੁਪੱਟਾ।' }
      ],
      cost: { materialCost: 500, labourCost: 350, packaging: 50, shipping: 100, otherCost: 50, totalCost: 1050 },
      recommendation: { suggestedMin: 1400, suggestedMax: 1650, estimatedProfitMin: 350, estimatedProfitMax: 600, confidenceScore: 80, explanation: 'Based on craft material and handloom market indices.', isDemoData: true }
    }
  ];

  for (const item of productsData) {
    const createdProduct = await prisma.product.create({
      data: {
        artisanId,
        title: item.title,
        category: item.category,
        material: item.material,
        craft: item.craft,
        description: item.description,
        images: { create: item.images },
        translations: { create: item.translations },
        cost: { create: item.cost },
        recommendation: { create: item.recommendation }
      }
    });

    console.log(`✓ Product created: ${createdProduct.title}`);
  }

  // 4. Create Buyer Requirements
  const req1 = await prisma.buyerRequirement.create({
    data: {
      buyerId: buyerUser1.buyer ? buyerUser1.buyer.id : 'buyer-id-1',
      productName: 'Handmade Bags',
      quantity: 500,
      budgetPerUnit: 1500,
      deliveryDays: 30,
      location: 'Punjab'
    }
  });

  await prisma.buyerRequirement.create({
    data: {
      buyerId: buyerUser2.buyer ? buyerUser2.buyer.id : 'buyer-id-2',
      productName: 'Textile Bags & Scarves',
      quantity: 200,
      budgetPerUnit: 1400,
      deliveryDays: 20,
      location: 'Delhi'
    }
  });

  console.log('✅ Database Seeding Complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
