import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const createPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

const usersData = [
  {
    id: 1,
    username: 'alice',
    password: 'alicewonder123',
    name: 'Alice',
    email: 'alice@gmail.com',
  },
  {
    id: 2,
    username: 'bob',
    password: 'bobsquare123',
    name: 'Bob',
    email: 'bob@gmail.com',
  },
  {
    id: 3,
    username: 'charlie',
    password: 'charliecircle123',
    name: 'Charlie',
    email: 'charlie@gmail.com',
  },
  {
    id: 4,
    username: 'david',
    password: 'davidtriangle123',
    name: 'David',
    email: 'david@gmail.com',
  },
];

const seed = async (users) => {
  console.info('Seeding users...');
  for (const user of users) {
    user.password = await createPassword(user.password);
    await prisma.user.upsert({
      where: { id: user.id },
      update: user,
      create: user,
    });
  }
};

seed(usersData)
  .then(() => {
    console.info('Seeding Complete!');
  })
  .catch((e) => {
    console.error('Seeding Failed!');
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('Disconnected from database');
  });
