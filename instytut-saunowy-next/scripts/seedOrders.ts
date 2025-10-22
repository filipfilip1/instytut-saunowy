import dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

import mongoose from 'mongoose';
import Order from '../lib/models/Order';
import Product from '../lib/models/Product';
import User from '../lib/models/User';
import connectDB from '../lib/mongodb';

// Helper functions
const randomItem = <T>(arr: readonly T[]): T => arr[Math.floor(Math.random() * arr.length)];

const randomDate = (daysAgo: number): Date => {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * daysAgo));
  date.setHours(Math.floor(Math.random() * 24));
  date.setMinutes(Math.floor(Math.random() * 60));
  return date;
};

const sampleNames = [
  'Jan Kowalski', 'Anna Nowak', 'Piotr Wiśniewski', 'Maria Wójcik',
  'Krzysztof Kamiński', 'Katarzyna Lewandowska', 'Tomasz Zieliński',
  'Agnieszka Szymańska', 'Marek Woźniak', 'Magdalena Dąbrowska'
];

const sampleCities = [
  { city: 'Warszawa', zipCode: '00-001' },
  { city: 'Kraków', zipCode: '30-001' },
  { city: 'Wrocław', zipCode: '50-001' },
  { city: 'Poznań', zipCode: '60-001' },
  { city: 'Gdańsk', zipCode: '80-001' },
  { city: 'Łódź', zipCode: '90-001' },
];

const sampleStreets = [
  'ul. Kwiatowa 15/2',
  'ul. Słoneczna 8',
  'al. Główna 123',
  'ul. Parkowa 45A',
  'ul. Leśna 7/12',
  'ul. Miła 33',
];

const statuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'] as const;
const paymentMethods = ['Przelew', 'Karta kredytowa', 'BLIK', 'PayPal', 'Płatność przy odbiorze'];

const generateTrackingNumber = (): string => {
  const prefix = randomItem(['DPD', 'InPost', 'DHL', 'UPS', 'Poczta']);
  const number = Math.floor(100000000000 + Math.random() * 900000000000);
  return `${prefix}${number}`;
};

export async function seedOrders(): Promise<void> {
  const products = await Product.find({ isActive: true });

  if (products.length === 0) {
    console.log('⚠️  No products found - run seed:products first');
    return;
  }

  const users = await User.find({ role: 'customer' });
  await Order.deleteMany({});

  const orders = [];

  // Generate 20 sample orders
  for (let i = 0; i < 20; i++) {
    const useRegisteredUser = users.length > 0 && Math.random() > 0.3;
    const name = randomItem(sampleNames);
    const email = useRegisteredUser && users[i % users.length]
      ? users[i % users.length].email
      : `${name.toLowerCase().replace(' ', '.')}@example.com`;

    const location = randomItem(sampleCities);
    const status = randomItem(statuses);

    // Random number of products (1-4)
    const itemCount = Math.floor(Math.random() * 4) + 1;
    const orderItems = [];
    let total = 0;

    for (let j = 0; j < itemCount; j++) {
      const product: any = randomItem(products);

      // Select random variants
      const variantSelections: Record<string, string> = {};
      product.variants.forEach((variant: any) => {
        const availableOptions = variant.options.filter((opt: any) => opt.stock > 0);
        if (availableOptions.length > 0) {
          const selectedOption: any = randomItem(availableOptions);
          variantSelections[variant.id] = selectedOption.id;
        }
      });

      // Calculate the price
      let pricePerItem = product.basePrice;
      product.variants.forEach((variant: any) => {
        const selectedOptionId = variantSelections[variant.id];
        if (selectedOptionId) {
          const option = variant.options.find((opt: any) => opt.id === selectedOptionId);
          if (option?.priceModifier) {
            pricePerItem += option.priceModifier;
          }
        }
      });

      const quantity = Math.floor(Math.random() * 2) + 1;
      total += pricePerItem * quantity;

      orderItems.push({
        productId: product._id.toString(),
        productName: product.name,
        variantSelections,
        quantity,
        pricePerItem,
      });
    }

    const customCreatedAt = randomDate(60);

    const orderData: any = {
      items: orderItems,
      shippingAddress: {
        name,
        email,
        phone: `+48 ${Math.floor(100000000 + Math.random() * 900000000)}`,
        street: randomItem(sampleStreets),
        city: location.city,
        zipCode: location.zipCode,
        country: 'Polska',
      },
      total,
      status,
      paymentMethod: randomItem(paymentMethods),
      paymentStatus: status === 'pending' ? 'pending' : 'paid',
    };

    if (status === 'shipped' || status === 'delivered') {
      orderData.trackingNumber = generateTrackingNumber();
    }

    if (useRegisteredUser && users.length > 0) {
      orderData.userId = users[i % users.length]._id;
    } else {
      orderData.guestEmail = email;
    }

    const order = await Order.create(orderData);

    // Set timestamps manually 
    await Order.updateOne(
      { _id: order._id },
      { $set: { createdAt: customCreatedAt, updatedAt: customCreatedAt } }
    );

    order.createdAt = customCreatedAt;
    order.updatedAt = customCreatedAt;

    orders.push(order);
  }

  console.log(`🛒 Seeded ${orders.length} orders`);
}

// If run directly
if (require.main === module) {
  (async () => {
    try {
      await connectDB();
      await seedOrders();
      await mongoose.connection.close();
      process.exit(0);
    } catch (error) {
      console.error('❌ Seeding failed:', error);
      await mongoose.connection.close();
      process.exit(1);
    }
  })();
}