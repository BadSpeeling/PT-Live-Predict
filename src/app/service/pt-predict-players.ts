import { GetPtCardPredictsRequest, PostPtPredictRequest, PostPtPredictResponse, GetPtCardPredictsResponse, Position, GridMode } from '../../types'
import FirebaseClient from '../../lib/firebase/FirebaseClient'
import PtPredictDataFormatter from '../../lib/PtPredictDataFormatter'

import { PtCard } from '../../types/component'
import { PtCard as PtCardRecord } from '../../types/data'
import { extractPositionFromCardTitle, getError } from './utils'

export const getPtPredictPlayers = async (requestBody: GetPtCardPredictsRequest, isLocalHostFlag: boolean) => {

    const firebaseClient = new FirebaseClient(isLocalHostFlag);
    await firebaseClient.initialize();

    const ptCards = await firebaseClient.getPtCards(requestBody);
    
    if (ptCards.length == 0) {
        throw Error("No ptCards loaded");
    }

    const ptCardCount = await firebaseClient.getPtCardsCount(requestBody);

    return { 
        PtCards: mapPtCards(ptCards, (firebaseClient.currentUser?.uid ?? "").toString(), requestBody.GridMode),
        PtCardCount: ptCardCount,
    } as GetPtCardPredictsResponse;

}

export const postUserPredict = async (requestBody: PostPtPredictRequest, isLocalHostFlag: boolean) => {

    const firebaseClient = new FirebaseClient(isLocalHostFlag);
    await firebaseClient.initialize();

    await firebaseClient.postPtPredict(requestBody);
    
}

const mapPtCards = (ptCardRecords: PtCardRecord[], userID: string, gridMode: GridMode) => {
    return ptCardRecords.map(r => mapPtCard(r, userID, gridMode));
}

const mapPtCard = (ptCardRecord: PtCardRecord, userID: string, gridMode: GridMode) => {
    
    let position = '';

    const getPredictedTiers = () => {
        
        if (ptCardRecord.PtPredicts) {
            switch (gridMode) {
                case GridMode.PtCard:
                    return filterForUser(ptCardRecord.PtPredicts, userID);
                case GridMode.ResultingTier:
                default:
                    return Object.values(ptCardRecord.PtPredicts);
            }
        }
        else {
            return [] as number[];
        }
    }

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
        PredictedTiers: getPredictedTiers(),
    } as PtCard    
}

const filterForUser = (ptPredicts: {[key: string]: number}, userID: string) => {
    
    if (typeof ptPredicts[userID] !== 'undefined') {
        return [ptPredicts[userID]];
    }
    else {
        return [];
    }

}