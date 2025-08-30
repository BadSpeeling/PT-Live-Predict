// enforces that this code can only be called on the server
// https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#keeping-server-only-code-out-of-the-client-environment
import "server-only";

import { cookies } from "next/headers";
import { initializeServerApp, initializeApp } from "firebase/app";

import { getAuth, connectAuthEmulator } from "firebase/auth";
import { firebaseConfig } from "./firebaseConfig";

// Returns an authenticated client SDK instance for use in Server Side Rendering
// and Static Site Generation
export async function getAuthenticatedAppForUser(isLocalHostFlag) {
  const authIdToken = (await cookies()).get("__session")?.value;

  // Your web app's Firebase configuration
  const serverFirebaseConfig = {
    ...firebaseConfig,
    apiKey: process.env.NEXT_PUBLIC_APIKEY,    
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
    appId: process.env.NEXT_PUBLIC_APPID
  };

  // Firebase Server App is a new feature in the JS SDK that allows you to
  // instantiate the SDK with credentials retrieved from the client & has
  // other affordances for use in server environments.
  const firebaseServerApp = initializeServerApp(
    // https://github.com/firebase/firebase-js-sdk/issues/8863#issuecomment-2751401913
    initializeApp(serverFirebaseConfig),
    {
      authIdToken,
    }
  );

  const auth = getAuth(firebaseServerApp);
  if (isLocalHostFlag) {
    connectAuthEmulator(auth, "http://127.0.0.1:9099");
  }
  await auth.authStateReady();

  return { firebaseServerApp, currentUser: auth.currentUser };
}