import { getApps, getApp, initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_API_KEY ,
  authDomain:import.meta.env.VITE_AUTH_DOMAIN,
  projectId:import.meta.env.VITE_PROJECT_ID ,
  storageBucket:import.meta.env.VITE_STORAGE_BUCKET ,
  messagingSenderId: import.meta.env.VITE_MESSAGE_SENDER_ID, 
  appId:import.meta.env.VITE_APP_ID
};

// Initialize Firebase
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };