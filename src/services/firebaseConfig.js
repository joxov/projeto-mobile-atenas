import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBlUqD7UJ0jzON3loj7_jpPlDa4j46rpUM",
  authDomain: "atenas-agenda.firebaseapp.com",
  projectId: "atenas-agenda",
  storageBucket: "atenas-agenda.firebasestorage.app",
  messagingSenderId: "1019527133958",
  appId: "1:1019527133958:web:d260b7984f2003c5783c87",
  measurementId: "G-5L4S9B7SDL",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
