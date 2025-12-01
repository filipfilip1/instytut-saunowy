import dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

import mongoose from 'mongoose';
import User from '../lib/models/User';
import connectDB from '../lib/mongodb';

const sampleCustomers = [
  {
    name: 'Jan Kowalski',
    email: 'jan.kowalski@example.com',
    role: 'customer' as const,
    image: null,
  },
  {
    name: 'Anna Nowak',
    email: 'anna.nowak@example.com',
    role: 'customer' as const,
    image: null,
  },
  {
    name: 'Piotr Wiśniewski',
    email: 'piotr.wisniewski@example.com',
    role: 'customer' as const,
    image: null,
  },
  {
    name: 'Maria Wójcik',
    email: 'maria.wojcik@example.com',
    role: 'customer' as const,
    image: null,
  },
  {
    name: 'Krzysztof Kamiński',
    email: 'krzysztof.kaminski@example.com',
    role: 'customer' as const,
    image: null,
  },
  {
    name: 'Katarzyna Lewandowska',
    email: 'katarzyna.lewandowska@example.com',
    role: 'customer' as const,
    image: null,
  },
  {
    name: 'Tomasz Zieliński',
    email: 'tomasz.zielinski@example.com',
    role: 'customer' as const,
    image: null,
  },
  {
    name: 'Agnieszka Szymańska',
    email: 'agnieszka.szymanska@example.com',
    role: 'customer' as const,
    image: null,
  },
  {
    name: 'Marek Woźniak',
    email: 'marek.wozniak@example.com',
    role: 'customer' as const,
    image: null,
  },
  {
    name: 'Magdalena Dąbrowska',
    email: 'magdalena.dabrowska@example.com',
    role: 'customer' as const,
    image: null,
  },
];

export async function seedUsers(): Promise<void> {
  console.log('👥 Seeding users...');

  const createdUsers = [];

  for (const customerData of sampleCustomers) {
    const existingUser = await User.findOne({ email: customerData.email });

    if (!existingUser) {
      const user = await User.create(customerData);
      createdUsers.push(user);
    } else {
      console.log(`   ⏭️  Skipping ${customerData.email} (already exists)`);
    }
  }

  console.log(`✅ Created ${createdUsers.length} new customers`);
  console.log(`📊 Total customers in DB: ${await User.countDocuments({ role: 'customer' })}`);
}

// If run directly
if (require.main === module) {
  (async () => {
    try {
      await connectDB();
      await seedUsers();
      await mongoose.connection.close();
      console.log('\n✅ Done!\n');
      process.exit(0);
    } catch (error) {
      console.error('❌ Seeding failed:', error);
      await mongoose.connection.close();
      process.exit(1);
    }
  })();
}
