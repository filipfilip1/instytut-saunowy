import 'dotenv/config';
import mongoose from 'mongoose';
import connectDB from '../lib/mongodb';
import { seedProducts } from './seedProducts';
import { seedOrders } from './seedOrders';

async function runAllSeeders() {
  console.log('\n🌱 Database seeding started...\n');
  const startTime = Date.now();

  try {
    await connectDB();

    await seedProducts();
    await seedOrders();

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