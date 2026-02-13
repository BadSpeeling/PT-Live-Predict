import { getAuthenticatedAppForUser } from './serverApp'
import { Firestore, setDoc, orderBy, where, getFirestore, getDocs, query, Query, collection, QuerySnapshot, DocumentData, Timestamp, doc, startAfter, limit } from "firebase/firestore";
import { PtCard } from "../../types/data"
import { User } from 'firebase/auth';
import { GetPtCardPredictsRequest, PostPtPredictRequest, PostErrorLogRequest } from '../../types'
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

    async getPtCards (request: GetPtCardPredictsRequest) {

        this.#validateClient();
        const navigationDirection = request.NavigationDirection ?? "desc"

        let pageQuery: Query<DocumentData, DocumentData>;

        if (request.LastPtCardID) {
            
            const anchorDocument = doc(this.firestore!, "PtCard", request.LastPtCardID.toString());
            
            pageQuery = query(collection(this.firestore!, "PtCard"),                
                where("LiveUpdateID", "==", request.LatestLiveUpdateID), 
                where("Team", "==", request.TeamFilter), 
                orderBy("CardValue", navigationDirection), 
                startAfter(anchorDocument),
                limit(10),                
            );

        }
        else {

            pageQuery = query(collection(this.firestore!, "PtCard"),                
                where("LiveUpdateID", "==", request.LatestLiveUpdateID), 
                where("Team", "==", request.TeamFilter), 
                orderBy("CardValue", navigationDirection), 
                limit(10),                
            );

        }

        const ptCardSnapshot = await getDocs(pageQuery);
        const ptCards = this.#snapshotConverter<PtCard>(ptCardSnapshot);

        if (navigationDirection === 'asc') {
            ptCards.reverse()
        }

        return ptCards;

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