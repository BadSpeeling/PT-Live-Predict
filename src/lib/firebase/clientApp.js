"use client";

import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "./firebaseConfig";

export function getFirebaseClient () {

    let clientAuth;
    let firebaseApp;

    if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {

        const useEmulator = false;

        // Your web app's Firebase configuration
        const clientFirebaseConfig = {
            ...firebaseConfig,
            apiKey: process.env.NEXT_PUBLIC_APIKEY,    
            messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
            appId: process.env.NEXT_PUBLIC_APPID
        };

        firebaseApp = initializeApp(clientFirebaseConfig);
        clientAuth = getAuth(firebaseApp);
        
        if (useEmulator) {
            connectAuthEmulator(clientAuth, 'http://127.0.0.1:9099')
        }

    }
    else {
        // Use automatic initialization
        // https://firebase.google.com/docs/app-hosting/firebase-sdks#initialize-with-no-arguments
        firebaseApp = initializeApp()
        clientAuth = getAuth(firebaseApp);
    }

    return { auth: clientAuth, db: getFirestore(firebaseApp)}

}