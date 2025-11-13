import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Car from './models/Car.js';

dotenv.config();

const sampleCars = [
  {
    carName: 'Tesla Model 3',
    description: 'Luxury electric sedan with autopilot, premium interior, and long range battery. Perfect for city driving and long trips with zero emissions.',
    category: 'Electric',
    rentPrice: 8500,
    location: 'Dhaka, Bangladesh',
    imageUrl: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80',
    providerName: 'Karim Ahmed',
    providerEmail: 'karim@example.com',
    availabilityStatus: 'Available'
  },
  {
    carName: 'BMW X5',
    description: 'Spacious luxury SUV with premium leather seats, advanced safety features, and powerful engine. Ideal for family trips and outdoor adventures.',
    category: 'SUV',
    rentPrice: 12000,
    location: 'Chittagong, Bangladesh',
    imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80',
    providerName: 'Fatima Rahman',
    providerEmail: 'fatima@example.com',
    availabilityStatus: 'Available'
  },
  {
    carName: 'Mercedes-Benz C-Class',
    description: 'Elegant sedan with sophisticated design, comfortable ride, and cutting-edge technology. Perfect for business travel and special occasions.',
    category: 'Luxury',
    rentPrice: 15000,
    location: 'Sylhet, Bangladesh',
    imageUrl: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80',
    providerName: 'Rashid Khan',
    providerEmail: 'rashid@example.com',
    availabilityStatus: 'Available'
  },
  {
    carName: 'Honda Civic',
    description: 'Reliable and fuel-efficient sedan with modern features and comfortable interior. Great for daily commuting and city driving.',
    category: 'Sedan',
    rentPrice: 5000,
    location: 'Dhaka, Bangladesh',
    imageUrl: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800&q=80',
    providerName: 'Nadia Islam',
    providerEmail: 'nadia@example.com',
    availabilityStatus: 'Available'
  },
  {
    carName: 'Toyota RAV4',
    description: 'Versatile compact SUV with excellent fuel economy, spacious cargo area, and all-wheel drive capability. Perfect for weekend getaways.',
    category: 'SUV',
    rentPrice: 7500,
    location: 'Rajshahi, Bangladesh',
    imageUrl: 'https://images.unsplash.com/photo-1581540222194-0def2dda95b8?w=800&q=80',
    providerName: 'Imran Hossain',
    providerEmail: 'imran@example.com',
    availabilityStatus: 'Available'
  },
  {
    carName: 'Audi A4',
    description: 'Premium sedan with sporty performance, luxurious interior, and advanced driver assistance systems. Ideal for those who appreciate quality.',
    category: 'Luxury',
    rentPrice: 13000,
    location: 'Khulna, Bangladesh',
    imageUrl: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80',
    providerName: 'Ayesha Begum',
    providerEmail: 'ayesha@example.com',
    availabilityStatus: 'Available'
  },
  {
    carName: 'Ford Mustang',
    description: 'Iconic American muscle car with powerful V8 engine, sporty design, and thrilling performance. Perfect for an unforgettable driving experience.',
    category: 'Luxury',
    rentPrice: 14000,
    location: 'Dhaka, Bangladesh',
    imageUrl: 'https://images.unsplash.com/photo-1584345604476-8ec5f5e8e8b6?w=800&q=80',
    providerName: 'Tariq Mahmud',
    providerEmail: 'tariq@example.com',
    availabilityStatus: 'Available'
  },
  {
    carName: 'Nissan Leaf',
    description: 'Affordable electric hatchback with impressive range, modern technology, and eco-friendly operation. Great for environmentally conscious drivers.',
    category: 'Electric',
    rentPrice: 6000,
    location: 'Barisal, Bangladesh',
    imageUrl: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80',
    providerName: 'Sabrina Akter',
    providerEmail: 'sabrina@example.com',
    availabilityStatus: 'Available'
  },
  {
    carName: 'Volkswagen Golf',
    description: 'Compact and practical hatchback with excellent handling, comfortable interior, and great fuel efficiency. Perfect for urban driving.',
    category: 'Hatchback',
    rentPrice: 5500,
    location: 'Comilla, Bangladesh',
    imageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80',
    providerName: 'Fahim Ahmed',
    providerEmail: 'fahim@example.com',
    availabilityStatus: 'Available'
  },
  {
    carName: 'Jeep Wrangler',
    description: 'Rugged off-road SUV with removable top, 4x4 capability, and adventurous spirit. Ideal for outdoor enthusiasts and trail exploration.',
    category: 'SUV',
    rentPrice: 11000,
    location: 'Cox\'s Bazar, Bangladesh',
    imageUrl: 'https://images.unsplash.com/photo-1606220838315-056192d5e927?w=800&q=80',
    providerName: 'Mehedi Hassan',
    providerEmail: 'mehedi@example.com',
    availabilityStatus: 'Available'
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing cars
    await Car.deleteMany({});
    console.log('🗑️  Cleared existing cars');

    // Insert sample cars
    const cars = await Car.insertMany(sampleCars);
    console.log(`✅ Added ${cars.length} sample cars to database`);

    console.log('\n📋 Sample Cars Added:');
    cars.forEach((car, index) => {
      console.log(`${index + 1}. ${car.carName} - $${car.rentPrice}/day - ${car.location}`);
    });

    console.log('\n🎉 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
