import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create test users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'admin@example.com',
        firstName: 'Admin',
        lastName: 'User',
        username: 'admin',
        role: 'admin',
        status: 'active',
        emailVerified: true,
      },
    }),
    prisma.user.create({
      data: {
        email: 'john@example.com',
        firstName: 'John',
        lastName: 'Doe',
        username: 'johndoe',
        role: 'user',
        status: 'active',
        emailVerified: true,
        loginCount: 5,
        lastLoginAt: new Date(),
      },
    }),
    prisma.user.create({
      data: {
        email: 'jane@example.com',
        firstName: 'Jane',
        lastName: 'Smith',
        username: 'janesmith',
        role: 'user',
        status: 'active',
        emailVerified: false,
      },
    }),
  ]);

  console.log(`✅ Created ${users.length} users`);
  console.log(
    'Users created:',
    users.map((u) => u.email)
  );
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
