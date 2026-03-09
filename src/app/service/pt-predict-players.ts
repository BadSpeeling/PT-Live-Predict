import { GetPtCardPredictsRequest, GetPtCardResultingTierRequest, PostPtPredictRequest, PostPtPredictResponse, GetPtCardPredictsResponse, GetPtCardResultingTierResponse, Position, GridMode } from '../../types'
import FirebaseClient from '../../lib/firebase/FirebaseClient'
import PtPredictDataFormatter from '../../lib/PtPredictDataFormatter'

import { PtCard, PtCardResultingTier } from '../../types/component'
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
        PtCards: mapPtCards(ptCards, (firebaseClient.currentUser?.uid ?? "").toString()),
        PtCardCount: ptCardCount,
    } as GetPtCardPredictsResponse;

}

export const getPtCardsResultingTier = async (requestBody: GetPtCardResultingTierRequest, isLocalHostFlag: boolean) => {

    const firebaseClient = new FirebaseClient(isLocalHostFlag);
    await firebaseClient.initialize();

    const ptCards = await firebaseClient.getPtCards(requestBody);
    
    if (ptCards.length == 0) {
        throw Error("No ptCardsResultingTier loaded");
    }

    const ptCardCount = await firebaseClient.getPtCardsCount(requestBody);

    return { 
        PtCardsResultingTier: mapPtCardsResultingTier(ptCards, (firebaseClient.currentUser?.uid ?? "").toString()),
        PtCardCount: ptCardCount,
    } as GetPtCardResultingTierResponse;

}

export const postUserPredict = async (requestBody: PostPtPredictRequest, isLocalHostFlag: boolean) => {

    const firebaseClient = new FirebaseClient(isLocalHostFlag);
    await firebaseClient.initialize();

    await firebaseClient.postPtPredict(requestBody);
    
}

const mapPtCards = (ptCardRecords: PtCardRecord[], userID: string) => {
    return ptCardRecords.map(r => mapPtCard(r, userID));
}

const mapPtCard = (ptCardRecord: PtCardRecord, userID: string) => {
    
    const position = getPosition(ptCardRecord);

    return {
        PtCardID: ptCardRecord.PtCardID,
        CardID: ptCardRecord.CardID,
        LiveUpdateID: ptCardRecord.LiveUpdateID,
        CardTitle: `${position} ${ptCardRecord.FirstName} ${ptCardRecord.LastName} ${ptCardRecord.Franchise}`,
        CardValue: ptCardRecord.CardValue,
        Position: ptCardRecord.Position,
        PredictedTier: ptCardRecord.PtPredicts ? filterForUser(ptCardRecord.PtPredicts, userID) : undefined,
    } as PtCard    

}

const mapPtCardsResultingTier = (ptCardRecords: PtCardRecord[], userID: string) => {
    return ptCardRecords.map(r => mapPtCardResultingTier(r, userID));
}

const mapPtCardResultingTier = (ptCardRecord: PtCardRecord, userID: string) => {
    
    const position = getPosition(ptCardRecord);

    const getPredictedTiers = () => {
        if (ptCardRecord.PtPredicts) {
            return Object.values(ptCardRecord.PtPredicts);
        }
        else {
            return [] as number[];
        }
    }

    return {
        PtCardID: ptCardRecord.PtCardID,
        CardID: ptCardRecord.CardID,
        LiveUpdateID: ptCardRecord.LiveUpdateID,
        CardTitle: `${position} ${ptCardRecord.FirstName} ${ptCardRecord.LastName} ${ptCardRecord.Franchise}`,
        CardValue: ptCardRecord.CardValue,
        Position: ptCardRecord.Position,
        PredictedTiers: getPredictedTiers(),
        ResultingTier: ptCardRecord.ResultingTier,
        ResultingCardValue: ptCardRecord.ResultingCardValue,
        PreviousTier: ptCardRecord.tier,
    } as PtCardResultingTier    
}

const getPosition = (ptCardRecord: PtCardRecord) => {
    if (ptCardRecord.Position === 1) {        
        return extractPositionFromCardTitle(ptCardRecord.CardTitle)
    }
    else {
        return Position[ptCardRecord.Position];
    }
}

const filterForUser = (ptPredicts: {[key: string]: number}, userID: string) => {
    
    if (typeof ptPredicts[userID] !== 'undefined') {
        return ptPredicts[userID];
    }
    else {
        return undefined;
    }

}