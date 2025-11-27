import { auth } from "./firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export async function register(email, senha) {
  return await createUserWithEmailAndPassword(auth, email, senha);
}

export async function login(email, senha) {
  return await signInWithEmailAndPassword(auth, email, senha);
}

export async function logout() {
  return await signOut(auth);
}
