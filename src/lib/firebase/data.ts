import { getAuthenticatedAppForUser } from './serverApp'
import { getFirestore, getDocs, query, collection } from "firebase/firestore";
import { PtPredictPlayer, PtCard, PtPredict } from "../../types"

export async function getPtPredict (isLocalHostFlag: boolean) {

    const { firebaseDB } = await getFirestoreDB(isLocalHostFlag);

    const getPtCardQuery = query(
        collection(firebaseDB, "PtCard")
    )

    const querySnapshot = await getDocs(getPtCardQuery);
    const ptCardPredicts = [] as PtPredictPlayer[]
    
    querySnapshot.forEach((ptCardDoc) => {
        const data: PtCard = ptCardDoc.data() as PtCard
        ptCardPredicts.push(createPtPredict(data))
    })

    return ptCardPredicts;

}

function createPtPredict(ptCardDoc: PtCard) {
    return {
        CardID: ptCardDoc.CardID,
        UserPredicts: [
            {
                PtCardID: ptCardDoc.PtCardID,
                CardID: ptCardDoc.CardID,
                LiveUpdateID: ptCardDoc.LiveUpdateID,
                CardTitle: ptCardDoc.CardTitle,
                CardValue: ptCardDoc.CardValue,
                Position: ptCardDoc.Position,
            }
        ] as PtPredict[]
    } as PtPredictPlayer
}

async function getFirestoreDB (isLocalHostFlag: boolean) {

    const { firebaseServerApp, currentUser } = await getAuthenticatedAppForUser(isLocalHostFlag);

    const firebaseDB = getFirestore(firebaseServerApp);

    return { firebaseDB, currentUser };
  
}