import mongoose from 'mongoose';
require('dotenv').config()

const MONGO_URI = process.env.MONGO_URI as string;


export const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            tlsAllowInvalidCertificates: true
        });
        console.log('Database Connection Established');
    } catch (err: unknown) {
        console.error('Failed to Connet Database', err);
    }
};