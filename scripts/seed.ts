import dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

import mongoose from 'mongoose';
import connectDB from '../lib/mongodb';
import { seedUsers } from './seedUsers';
import { seedProducts } from './seedProducts';
import { seedOrders } from './seedOrders';

async function runAllSeeders() {
  console.log('\n🌱 Database seeding started...\n');
  const startTime = Date.now();

  try {
    await connectDB();

    await seedUsers();    // First: create users (customers)
    await seedProducts(); // Second: create products
    await seedOrders();   // Third: create orders (needs users & products)

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`\n✅ Seeding completed in ${duration}s\n`);

  } catch (error) {
    console.error('\n❌ Seeding failed:', error);
    throw error;
  } finally {
    await mongoose.connection.close();
  }
}

runAllSeeders()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });