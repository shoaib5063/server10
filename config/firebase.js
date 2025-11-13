import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Firebase Admin SDK
const initializeFirebase = () => {
  try {
    // Check if Firebase credentials are provided
    if (!process.env.FIREBASE_PROJECT_ID || 
        !process.env.FIREBASE_PRIVATE_KEY || 
        !process.env.FIREBASE_CLIENT_EMAIL ||
        process.env.FIREBASE_PRIVATE_KEY.includes('Your private key here')) {
      console.warn('⚠️  Firebase Admin credentials not configured. Authentication will not work.');
      console.warn('📝 Please follow FIREBASE_ADMIN_SETUP.md to configure Firebase Admin SDK.');
      return;
    }

    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        }),
      });
      console.log('✅ Firebase Admin initialized successfully');
    }
  } catch (error) {
    console.error('❌ Firebase Admin initialization error:', error.message);
    console.warn('📝 Please check your Firebase credentials in server/.env');
  }
};

initializeFirebase();

export default admin;
