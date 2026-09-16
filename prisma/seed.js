const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Karigar AI Database Initialized for Production...');
  console.log('✅ Ready for real artisan and buyer user registrations!');
}

main()
  .catch((e) => {
    console.error('❌ Database Setup Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
