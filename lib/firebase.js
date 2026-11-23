
import { initializeApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBltocjQ7LXUtWsybvUfHigHmt10MfaYy0",
  authDomain: "quiz-creator-19fd9.firebaseapp.com",
  databaseURL: "https://quiz-creator-19fd9-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "quiz-creator-19fd9",
  storageBucket: "quiz-creator-19fd9.firebasestorage.app",
  messagingSenderId: "191605732404",
  appId: "1:191605732404:web:5c1893f6357765459a8661"
};

const app = getApps().length === 0
  ? initializeApp(firebaseConfig)
  : getApps()[0];

const db = getDatabase(app);

export { db };
