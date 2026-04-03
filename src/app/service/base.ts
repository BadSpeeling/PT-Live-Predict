import FirebaseClient from '../../lib/firebase/FirebaseClient'
import { getAuthenticatedAppForUser } from '../../lib/firebase/serverApp'
import { getError } from './converters';

export const getFirebaseClient = async (isLocalHostFlag: boolean) => {

    const {firebaseServerApp, currentUser} = await getAuthenticatedAppForUser(isLocalHostFlag);

    if (currentUser === null) {
        throw new Error("The user has not been authentication yet!")
    } 

    const client = new FirebaseClient(firebaseServerApp, currentUser);

    if (client.firestore === null) {
        throw Error("Firestore has not been initialized!");
    }

    return client;

}

export const writeErrorLog = async (e: unknown, errorType: string, requestBody: any, isLocalHostFlag: boolean) => {

    const firebaseClient = await getFirebaseClient(isLocalHostFlag);

    const error = getError(e, errorType, JSON.stringify(requestBody));
    firebaseClient.postErrorLog(error);

}