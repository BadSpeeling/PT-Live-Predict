import { getAuthenticatedAppForUser } from './serverApp'
import { getFirestore, getDocs, query, collection, QuerySnapshot, DocumentData, Query, Timestamp } from "firebase/firestore";
import { PtCard, PtPredict } from "../../types/data"
import { User } from 'firebase/auth';
import { Firestore, doc, setDoc, orderBy, where } from 'firebase/firestore';
import { PostPtPredictRequest, PostErrorLogRequest } from '../../types'
import { randomUUID } from 'crypto'

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

        const ptCardRef = doc(this.firestore!, "PtCard", postRequest.PtCardID.toString(), "PtPredicts", userID);
        const ptPredict: PtPredict = {
            UserID: userID,
            PredictedTier: postRequest.PredictedTier,
        }
        
        await setDoc(ptCardRef, ptPredict, {merge: true})

    }

    async postErrorLog (postRequest: PostErrorLogRequest) {

        this.#validateClient();

        const guid = randomUUID();
        const errorLogRef = doc(this.firestore!, "ErrorLog", guid);

        try {
            await setDoc(errorLogRef, {
                ErrorType: postRequest.ErrorType,
                ErrorMsg: postRequest.ErrorMsg,
                ErrorStack: postRequest.ErrorStack,
                ErrorRequestBody: postRequest.ErrorRequestBody,
                Timestamp: Timestamp.fromDate(new Date()),
            })
        }
        catch (error) {
            if (error instanceof Error) {
                console.log('Could not write error log: ' + error.message);
            }
            else {
                console.log('Could not write error log');
            }
        }

    }

}