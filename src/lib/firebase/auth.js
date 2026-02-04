import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged as _onAuthStateChanged,
  onIdTokenChanged as _onIdTokenChanged,
  createUserWithEmailAndPassword
} from "firebase/auth";

import { getFirebaseClient } from "./clientApp";

export function onAuthStateChanged(cb) {
  const { auth } = getFirebaseClient();
  return _onAuthStateChanged(auth, cb);
}

export function onIdTokenChanged(cb) {
  const { auth } = getFirebaseClient();
  return _onIdTokenChanged(auth, cb);
}

export async function signInWithGoogle() {
  const { auth } = getFirebaseClient();
  const provider = new GoogleAuthProvider();

  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error("Error signing in with Google", error);
  }
}

export async function signOut() {
  const { auth } = getFirebaseClient();
  try {
    return auth.signOut();
  } catch (error) {
    console.error("Error signing out with Google", error);
  }
}

export const createAccount = (email, password) => {
  
  const { auth } = getFirebaseClient();
  
  createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
          console.log(userCredentials);
      })
      .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode + ' ' + errorMessage);
      });
}