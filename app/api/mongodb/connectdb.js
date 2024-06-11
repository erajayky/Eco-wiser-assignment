const URI = process.env.MONGODB_URI;

import mongoose from 'mongoose';

const connectdb = async () => {
  try {
    await mongoose.connect(URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
};

export default connectdb;