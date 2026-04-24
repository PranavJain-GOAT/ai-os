const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding data...');

  const passwordHash = await bcrypt.hash('Admin@12345', 10);
  const devPasswordHash = await bcrypt.hash('Dev@12345', 10);
  const clientPasswordHash = await bcrypt.hash('Client@12345', 10);

  // Users
  const admin = await prisma.user.upsert({
    where: { email: 'admin@aistack.com' },
    update: {},
    create: {
      email: 'admin@aistack.com',
      password: passwordHash,
      name: 'System Admin',
      role: 'ADMIN',
      isEmailVerified: true
    }
  });

  const developer = await prisma.user.upsert({
    where: { email: 'dev@aistack.com' },
    update: {},
    create: {
      email: 'dev@aistack.com',
      password: devPasswordHash,
      name: 'AI Developer',
      role: 'DEVELOPER',
      isEmailVerified: true
    }
  });

  const client = await prisma.user.upsert({
    where: { email: 'client@aistack.com' },
    update: {},
    create: {
      email: 'client@aistack.com',
      password: clientPasswordHash,
      name: 'Business Client',
      role: 'CLIENT',
      isEmailVerified: true
    }
  });

  // Seed Products
  await prisma.product.deleteMany({});
  
  const p1 = await prisma.product.create({
    data: {
      title: 'Customer Support Bot',
      description: 'An AI chatbot for customer support trained on your documents.',
      price: 299.00,
      developerId: developer.id,
      features: ['24/7 Availability', 'Multilingual', 'Custom Knowledge Base'],
      images: ['https://via.placeholder.com/600x400?text=Customer+Support'],
      status: 'APPROVED'
    }
  });

  const p2 = await prisma.product.create({
    data: {
      title: 'Image Background Remover',
      description: 'Automatically remove the background from images using computer vision.',
      price: 49.00,
      developerId: developer.id,
      features: ['Batch processing', 'High accuracy', 'API access'],
      images: ['https://via.placeholder.com/600x400?text=BG+Remover'],
      status: 'APPROVED'
    }
  });

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
