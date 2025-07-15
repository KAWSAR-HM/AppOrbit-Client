import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// ✅ Firebase Config from .env
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_FIREBASE_APPID,
};

// ✅ Initialize Firebase App
const app = initializeApp(firebaseConfig);

// ✅ Create Auth instance
const auth = getAuth(app);

// ✅ Export both
export { auth };
export default app;
