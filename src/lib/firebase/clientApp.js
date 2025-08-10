"use client";

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { firebaseConfig } from "./firebaseConfig";

// Your web app's Firebase configuration
const clientFirebaseConfig = {
    ...firebaseConfig,
    apiKey: process.env.NEXT_PUBLIC_APIKEY,    
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
    appId: process.env.NEXT_PUBLIC_APPID
};

// Use automatic initialization
// https://firebase.google.com/docs/app-hosting/firebase-sdks#initialize-with-no-arguments
export const firebaseApp = initializeApp(clientFirebaseConfig);

export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);
