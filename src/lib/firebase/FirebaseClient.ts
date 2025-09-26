import { getAuthenticatedAppForUser } from './serverApp'
import { getFirestore, getDocs, query, collection, QuerySnapshot, DocumentData } from "firebase/firestore";
import { PtCard, PtPredict } from "../../types"
import { User } from 'firebase/auth';
import { Firestore, doc, setDoc } from 'firebase/firestore';
import { randomUUID } from "crypto"
import { PostPtPredictRequest } from '../../types'

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

    async getPtPredicts () {

        this.#validateClient();

        const getPtPredictQuery = query(
            collection(this.firestore!, "PtPredict")
        )

        const ptPredictSnapshot = await getDocs(getPtPredictQuery);
        return this.#snapshotConverter<PtPredict>(ptPredictSnapshot);

    }

    async postPtPredict (postRequest: PostPtPredictRequest) {

        this.#validateClient();

        const ptPredictID = postRequest.PtPredictID ? postRequest.PtPredictID : randomUUID();

        const ptLivePredictRef = doc(this.firestore!, 'PtPredict', ptPredictID);
        const ptLivePredictDoc: PtPredict = {
            PtPredictID: ptPredictID,
            ...postRequest
        };

        setDoc(ptLivePredictRef, ptLivePredictDoc);
        return ptLivePredictDoc;

    }

}