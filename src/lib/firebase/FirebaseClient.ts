import { getAuthenticatedAppForUser } from './serverApp'
import { getFirestore, getDocs, query, collection, QuerySnapshot, DocumentData, Query } from "firebase/firestore";
import { PtCard } from "../../types/data"
import { User } from 'firebase/auth';
import { Firestore, doc, setDoc, orderBy, where } from 'firebase/firestore';
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

    async getPtCards (teamName: string, latestLiveUpdateID: number) {

        this.#validateClient();

        const getPtCardQuery = query(
            collection(this.firestore!, "PtCard"),
            where("LiveUpdateID", "==", latestLiveUpdateID),
            where("Team", "==", teamName),
            orderBy("PtCardID"),
        )

        const ptCardSnapshot = await getDocs(getPtCardQuery);
        return this.#snapshotConverter<PtCard>(ptCardSnapshot);

    }

    async postPtPredict (postRequest: PostPtPredictRequest) {

        this.#validateClient();

        const userID = this.currentUser!.uid

        const ptCardRef = doc(this.firestore!, "PtCard", postRequest.PtCardID.toString());
        const PtPredicts: {[index:string]: number} = {}
        PtPredicts[userID] = postRequest.PredictedTier;

        await setDoc(ptCardRef, {
            PtPredicts
        }, {merge: true})

    }

}