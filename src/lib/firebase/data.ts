import { getAuthenticatedAppForUser } from './serverApp'
import { getFirestore, connectFirestoreEmulator, getDocs, query, collection } from "firebase/firestore";

export async function getPtCardData (isLocalHostFlag: boolean) {

    const { firebaseDB } = await getFirestoreDB(isLocalHostFlag);

    const getPtCardQuery = query(
        collection(firebaseDB, "PtCard")
    )

    const querySnapshot = await getDocs(getPtCardQuery);
    querySnapshot.forEach((ptCardDoc) => {
        console.log(ptCardDoc.id, " => ", ptCardDoc.data());
    })

}

async function getFirestoreDB (isLocalHostFlag: boolean) {

    const { firebaseServerApp, currentUser } = await getAuthenticatedAppForUser(isLocalHostFlag);

    const firebaseDB = getFirestore(firebaseServerApp);
    if (isLocalHostFlag) {
        //connectFirestoreEmulator(firebaseDB, "127.0.0.1", 8080)
    }

    return { firebaseDB, currentUser };
  
}