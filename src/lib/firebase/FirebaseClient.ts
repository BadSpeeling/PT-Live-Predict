import { Firestore, setDoc, orderBy, where, getFirestore, getDocs, query, collection, QuerySnapshot, DocumentData, Timestamp, doc, startAfter, limit, getCountFromServer, getDoc, QueryConstraint } from "firebase/firestore";
import { PtCard } from "../../types/data"
import { User } from 'firebase/auth';
import { GetPtCardRequest, PostPtPredictRequest, PostErrorLogRequest } from '../../types/firebase'
import { randomUUID } from 'crypto'

export default class FirebaseClient {

    firestore: Firestore;
    currentUser: User;

    constructor (firebaseServerApp: any, currentUser: User) {

        this.firestore = getFirestore(firebaseServerApp);
        this.currentUser = currentUser;

    }

    #snapshotConverter <T> (snapshot: QuerySnapshot<DocumentData, DocumentData>) {
        
        const firestoreData: T[] = []

        snapshot.forEach((doc) => {
            firestoreData.push(doc.data() as T)            
        })

        return firestoreData;

    }

    async getPtCards (request: GetPtCardRequest) {

        const navigationDirection = request.NavigationDirection ?? "desc"

        const queryConstraints = [
            where("LiveUpdateID", "==", request.LiveUpdateID),
        ] as QueryConstraint[]

        if (request.TeamFilter !== null) {
            queryConstraints.push(where("Team", "==", request.TeamFilter));
        }
        else if (request.TierFilter !== null) {
            queryConstraints.push(where("tier", "==", request.TierFilter));
        }
        else if (request.NameFilter !== null) {
            queryConstraints.push(where("FirstName", "==", request.NameFilter.FirstName));
            queryConstraints.push(where("LastName", "==", request.NameFilter.LastName));
        }

        queryConstraints.push(orderBy("CardValue", navigationDirection))

        if (request.LastPtCardID) {
            const anchorDocument = await getDoc(doc(this.firestore!, "PtCard", request.LastPtCardID.toString()));            
            queryConstraints.push(startAfter(anchorDocument));
        }

        queryConstraints.push(limit(request.PageSize));                
        const pageQuery = query(collection(this.firestore!, "PtCard"), ...queryConstraints);

        const ptCardSnapshot = await getDocs(pageQuery);
        const ptCards = this.#snapshotConverter<PtCard>(ptCardSnapshot);

        if (navigationDirection === 'asc') {
            ptCards.reverse()
        }

        return ptCards;

    }

    async getPtCardsCount (request: GetPtCardRequest) {

        const queryConstraints = [
            where("LiveUpdateID", "==", request.LiveUpdateID),
        ] as QueryConstraint[]

        if (request.TeamFilter !== null) {
            queryConstraints.push(where("Team", "==", request.TeamFilter));
        }
        else if (request.TierFilter !== null) {
            queryConstraints.push(where("tier", "==", request.TierFilter));
        }
        else if (request.NameFilter !== null) {
            queryConstraints.push(where("FirstName", "==", request.NameFilter.FirstName));
            queryConstraints.push(where("LastName", "==", request.NameFilter.LastName));
        }

        const countQuery = query(collection(this.firestore!, "PtCard"), ...queryConstraints);

        const snapshot = await getCountFromServer(countQuery);
        const ptCardCount = snapshot.data().count; 

        return ptCardCount;

    }

    async postPtPredict (postRequest: PostPtPredictRequest) {

        const userID = this.currentUser!.uid

        const ptCardRef = doc(this.firestore!, "PtCard", postRequest.PtCardID.toString());
        const PtPredicts: {[index:string]: number} = {}
        PtPredicts[userID] = postRequest.PredictedTier;

        await setDoc(ptCardRef, {
            PtPredicts
        }, {merge: true})

    }

    async postErrorLog (postRequest: PostErrorLogRequest) {

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