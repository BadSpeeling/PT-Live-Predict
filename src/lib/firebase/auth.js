import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged as _onAuthStateChanged,
  onIdTokenChanged as _onIdTokenChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
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

export const ptPredictingSignupWithEmailAndPassword = (email, password) => {
  
  const { auth } = getFirebaseClient();
  return createUserWithEmailAndPassword(auth, email, password)

}

export const ptPredictingSigninWithEmailAndPassword = (email, password) => {

  const { auth } = getFirebaseClient();
  return signInWithEmailAndPassword(auth, email, password);

}

export const ptPredictingPasswordReset = (email) => {

  const { auth } = getFirebaseClient();

  sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log('Reset sent!');
        // Password reset email sent!
        // ..
      })
      .catch((error) => {
        console.log('Reset failed!');
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });

}