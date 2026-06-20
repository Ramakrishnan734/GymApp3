import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBHk_mUWt1FQFrDGzvtjAANGcVcK3WSiRw",
  authDomain: "gym-app-63c01.firebaseapp.com",
  projectId: "gym-app-63c01",
  storageBucket: "gym-app-63c01.firebasestorage.app",
  messagingSenderId: "586348421329",
  appId: "1:586348421329:web:542e2ff23914b8a2d165f0",
  measurementId: "G-VKTBQMHZ4S"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
