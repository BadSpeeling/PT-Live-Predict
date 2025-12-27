import { GetPtCardPredictsRequest, PostPtPredictRequest, PostPtPredictResponse, GetPtCardPredictsResponse, Position } from '../../types'
import FirebaseClient from '../../lib/firebase/FirebaseClient'
import PtPredictDataFormatter from '../../lib/PtPredictDataFormatter'

import { PtCard } from '../../types/component'
import { PtCard as PtCardRecord } from '../../types/data'
import { extractPositionFromCardTitle } from '@/lib/utils'

export const getPtPredictPlayers = async (requestBody: GetPtCardPredictsRequest, isLocalHostFlag: boolean) => {

    const firebaseClient = new FirebaseClient(isLocalHostFlag);
    await firebaseClient.initialize();

    const ptCards = await firebaseClient.getPtCards(requestBody.TeamFilter, requestBody.LatestLiveUpdateID);

    return { 
        PtCards: mapPtCards(ptCards, (firebaseClient.currentUser?.uid ?? "").toString()),
    } as GetPtCardPredictsResponse;

}

export const postUserPredict = async (requestBody: PostPtPredictRequest, isLocalHostFlag: boolean) => {

    const firebaseClient = new FirebaseClient(isLocalHostFlag);
    await firebaseClient.initialize();

    let requestSucceded = false;

    try {
        await firebaseClient.postPtPredict(requestBody);
        requestSucceded = true;
    }
    catch (e) {
        //log?
    }

    return {
        RequestSucceeded: requestSucceded
    } as PostPtPredictResponse;

}

const mapPtCards = (ptCardRecords: PtCardRecord[], userID: string) => {
    return ptCardRecords.map(r => mapPtCard(r, userID));
}

const mapPtCard = (ptCardRecord: PtCardRecord, userID: string) => {
    
    let position = '';

    if (ptCardRecord.Position === 1) {        
        position = extractPositionFromCardTitle(ptCardRecord.CardTitle)
    }
    else {
        position = Position[ptCardRecord.Position];
    }
    
    return {
        PtCardID: ptCardRecord.PtCardID,
        CardID: ptCardRecord.CardID,
        LiveUpdateID: ptCardRecord.LiveUpdateID,
        CardTitle: `${position} ${ptCardRecord.FirstName} ${ptCardRecord.LastName} ${ptCardRecord.Franchise}`,
        CardValue: ptCardRecord.CardValue,
        Position: ptCardRecord.Position,
        PredictedTier: ptCardRecord.PtPredicts ? filterForUser(ptCardRecord.PtPredicts, userID): undefined,
    } as PtCard    
}

const filterForUser = (ptPredicts: {[key: string]: number}, userID: string) => {
    
    if (typeof ptPredicts[userID] !== 'undefined') {
        return ptPredicts[userID];
    }
    else {
        return undefined;
    }

}