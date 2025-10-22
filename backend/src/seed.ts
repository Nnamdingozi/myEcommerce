// prisma/seed.ts


import { PrismaClient, ProductStatus } from '../prisma/src/generated/prisma'; 
import bcrypt from 'bcrypt';


const prisma = new PrismaClient();


// --- Main Seeding Function ---
async function main() {
  console.log(`🌱 Start seeding ...`);


  // --- 1. Seed Countries ---
  console.log('Seeding countries...');
  await prisma.country.upsert({ where: { code: '+234' }, update: {}, create: { code: '+234', countryName: 'Nigeria', continentName: 'Africa' } });
  // ... (add the rest of your countries)
  console.log('Countries seeded successfully.');


  // --- 2. Seed Categories ---
  console.log('Seeding categories...');
  await prisma.category.createMany({
    data: [
      { categoryName: 'Electronics' },
      { categoryName: 'Resin Arts' },
      { categoryName: 'Clothings' },
      { categoryName: 'Shoes' },
      { categoryName: 'Wrist Watches' },
      { categoryName: 'Accessories' },
      { categoryName: 'Stationeries' },
    ],
    skipDuplicates: true,
  });
  console.log('Categories seeded successfully.');


  // --- 3. Seed Users ---
  console.log('Seeding users...');
  const hashedPassword = await bcrypt.hash('Example1@pw', 10);
  const user = await prisma.user.upsert({
    where: { email: 'example@gmail.com' },
    update: {},
    create: {
      username: 'joerald',
      email: 'example@gmail.com',
      phone: '090090090000',
      password: hashedPassword,
      countryCode: '+234',
    },
  });
  console.log(`User '${user.username}' seeded successfully.`);


  // --- 4. Seed Merchants ---
  console.log('Seeding merchants...');
  const merchant = await prisma.merchant.upsert({
    where: { email: 'finias@gmail.com' },
    update: {},
    create: {
      merchantName: 'Finias',
      email: 'finias@gmail.com',
      countryCode: '+234',
    },
  });
  console.log(`Merchant '${merchant.merchantName}' seeded successfully.`);


  // --- 5. Seed Products ---
  console.log('Seeding products...');
  const electronicsCategory = await prisma.category.findFirst({ where: { categoryName: 'Electronics' } });
  const resinArtCategory = await prisma.category.findFirst({ where: { categoryName: 'Resin Arts' } });
  const clothingsCategory = await prisma.category.findFirst({ where: { categoryName: 'Clothings' } });
  // ... fetch other categories as needed ...


  if (electronicsCategory && resinArtCategory && clothingsCategory) {
    await prisma.product.createMany({
      data: [
        {
          name: 'iPhone 15 pro max',
          merchantId: merchant.id,
          price: 123456.90,
          status: ProductStatus.AVAILABLE,
          categoryId: electronicsCategory.id,
          description: "Meet next Gen iphone product with cutting edge Technology",
          imageUrl: '/images/iphone.avif'
        },
        {
            name: 'Corporate Gown',
            merchantId: merchant.id,
            price: 7000.90,
            status: ProductStatus.AVAILABLE,
            categoryId: clothingsCategory.id,
            description: "Elegant Gown. Perfect for official assignments",
            imageUrl: '/images/red-gown.jpg'
        },
        // ... add the rest of your products here ...
      ],
      skipDuplicates: true,
    });
    console.log('Products seeded successfully.');
  } else {
    console.warn('Could not find all necessary categories, skipping product seeding.');
  }


  // ✅ FIX: The duplicated block has been removed. This is the single, correct block.
  // --- 6. Seed Cart (Example) ---
  console.log('Seeding cart items...');
  const gownProduct = await prisma.product.findFirst({ where: { name: 'Corporate Gown' } });


  if (user && gownProduct) {
    // Manual "Find-Then-Act" Pattern
    const existingCartItem = await prisma.cart.findFirst({
      where: {
        userId: user.id,
        productId: gownProduct.id,
      },
    });


    if (existingCartItem) {
      console.log(`Cart item for product "${gownProduct.name}" already exists. Incrementing quantity.`);
      await prisma.cart.update({
        where: { id: existingCartItem.id },
        data: { quantity: { increment: 1 } },
      });
    } else {
      console.log(`Creating new cart item for product "${gownProduct.name}".`);
      await prisma.cart.create({
        data: {
          userId: user.id,
          productId: gownProduct.id,
          quantity: 2,
        },
      });
    }
    console.log('Cart item seeded successfully.');
  }


  console.log(`🌱 Seeding finished.`);
} // ✅ End of the main() function


// ✅ FIX: The main execution block was missing.
// This is the standard pattern to execute an async function in a script.
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
