import { getAuthenticatedAppForUser } from './serverApp'
import { getFirestore, getDocs, query, collection, QuerySnapshot, DocumentData } from "firebase/firestore";
import { PtCard } from "../../types"
import { User } from 'firebase/auth';
import { Firestore } from 'firebase/firestore';

export default class FirebaseClient {

    firestore?: Firestore;
    currentUser?: User | null;
    isLocalHostFlag: boolean;    

    constructor (isLocalHostFlag: boolean) {
        this.isLocalHostFlag = isLocalHostFlag;        
    }

    async initialize () {

        const { firebaseServerApp, currentUser } = await getAuthenticatedAppForUser(this.isLocalHostFlag);
        const firestore = getFirestore(firebaseServerApp);

        this.firestore = firestore;
        this.currentUser = currentUser;

    }

    #validateClient () {
        if (!this.firestore) {
            throw Error("Firestore has not been initialized!")
        }

        if (!this.currentUser) {
            throw new Error("The user has not been authentication yet!")
        }
    }

    #snapshotConverter <T> (snapshot: QuerySnapshot<DocumentData, DocumentData>) {
        
        const firestoreData: T[] = []

        snapshot.forEach((doc) => {
            firestoreData.push(doc.data() as T)            
        })

        return firestoreData;

    }

    async getPtCards () {

        this.#validateClient();

        const getPtCardQuery = query(
            collection(this.firestore!, "PtCard")
        )

        const ptCardSnapshot = await getDocs(getPtCardQuery);
        return this.#snapshotConverter<PtCard>(ptCardSnapshot);

    }

}