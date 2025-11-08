// IMPORTANT: This file should not be used in the client-side.
import * as admin from 'firebase-admin';

const getServiceAccount = () => {
    const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT;
    if (!serviceAccountJson) {
      if (process.env.NODE_ENV === 'production') {
        throw new Error('The FIREBASE_SERVICE_ACCOUNT environment variable was not found!');
      } else {
        // In development, it's okay to not have this for client-side only work.
        // The server action that needs it will throw the error.
        return null;
      }
    }
    try {
      return JSON.parse(serviceAccountJson);
    } catch (e) {
      throw new Error('Failed to parse FIREBASE_SERVICE_ACCOUNT JSON.');
    }
  };

let adminApp: admin.app.App | null = null;

export async function getAdminApp() {
  if (adminApp) {
    return adminApp;
  }
  
  const serviceAccount = getServiceAccount();

  if (!serviceAccount) {
    throw new Error('Firebase Admin SDK Service Account is not available. Cannot initialize server-side features.');
  }

  if (admin.apps.length === 0) {
    adminApp = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
  } else {
    adminApp = admin.app();
  }

  return adminApp;
}
