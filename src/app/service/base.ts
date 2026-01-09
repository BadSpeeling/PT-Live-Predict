import FirebaseClient from '../../lib/firebase/FirebaseClient'
import { getError } from './utils'

export const writeErrorLog = async (e: unknown, errorType: string, requestBody: any, isLocalHostFlag: boolean) => {
``
    const firebaseClient = new FirebaseClient(isLocalHostFlag);
    await firebaseClient.initialize();

    const error = getError(e, errorType, JSON.stringify(requestBody));
    firebaseClient.postErrorLog(error);

}