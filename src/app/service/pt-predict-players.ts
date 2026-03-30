import { GetPtCardPredictsRequest, GetPtCardResultingTierRequest, PostPtPredictRequest, PostPtPredictResponse, GetPtCardPredictsResponse, GetPtCardResultingTierResponse, Position, GridMode } from '../../types'
import FirebaseClient from '../../lib/firebase/FirebaseClient'

import { PtCardPrediction, PtCardResultingTier } from '../../types/component'
import { PtCard } from '../../types/data'
import { extractPositionFromCardTitle, getErrorMessage } from './utils'
import { PtCardPredictsToPtCardRequest, PtCardResultingTierToPtCardRequest, PtPredictRequestToFirebase } from './converters'

export const getPtPredictPlayers = async (requestBody: GetPtCardPredictsRequest, isLocalHostFlag: boolean) => {

    const firebaseClient = new FirebaseClient(isLocalHostFlag);
    await firebaseClient.initialize();

    const getPtCardsRequest = PtCardPredictsToPtCardRequest(requestBody);
    
    let ptCards: PtCard[]; 
    
    try {
        ptCards = await firebaseClient.getPtCards(getPtCardsRequest);
    }
    catch (e) {
        throw Error("Failure getting PtCards for PtCardPredicts: " + getErrorMessage(e));
    }

    if (ptCards.length == 0) {
        throw Error("No ptCardPredicts loaded");
    }

    let ptCardCount: number;

    try {
        ptCardCount = await firebaseClient.getPtCardsCount(requestBody);
    }
    catch (e) {
        throw Error("Failure getting total record count for PtCardPredicts: " + getErrorMessage(e));
    }

    return { 
        PtCards: mapPtCards(ptCards, (firebaseClient.currentUser?.uid ?? "").toString()),
        PtCardCount: ptCardCount,
    } as GetPtCardPredictsResponse;

}

export const getPtCardsResultingTier = async (requestBody: GetPtCardResultingTierRequest, isLocalHostFlag: boolean) => {

    const firebaseClient = new FirebaseClient(isLocalHostFlag);
    await firebaseClient.initialize();

    const getPtCardsRequest = PtCardResultingTierToPtCardRequest(requestBody);

    let ptCards: PtCard[]; 
    
    try {
        ptCards = await firebaseClient.getPtCards(getPtCardsRequest);
    }
    catch (e) {
        throw Error("Failure getting PtCards for PtCardsResultingTier: " + getErrorMessage(e));
    }

    if (ptCards.length == 0) {
        throw Error("No ptCardsResultingTier loaded");
    }

    let ptCardCount: number;

    try {
        ptCardCount = await firebaseClient.getPtCardsCount(requestBody);
    }
    catch (e) {
        throw Error("Failure getting total record count for PtCardsResultingTier: " + getErrorMessage(e));
    }

    return { 
        PtCardsResultingTier: mapPtCardsResultingTier(ptCards, (firebaseClient.currentUser?.uid ?? "").toString()),
        PtCardCount: ptCardCount,
    } as GetPtCardResultingTierResponse;

}

export const postPtPredict = async (requestBody: PostPtPredictRequest, isLocalHostFlag: boolean) => {

    const firebaseClient = new FirebaseClient(isLocalHostFlag);
    await firebaseClient.initialize();

    const postPtPredictRequest = PtPredictRequestToFirebase(requestBody);

    try {
        await firebaseClient.postPtPredict(postPtPredictRequest);
    }
    catch (e) {
        throw Error("Failure posting PtPredict: " + getErrorMessage(e));
    }

}

const mapPtCards = (ptCards: PtCard[], userID: string) => {
    return ptCards.map(r => mapPtCard(r, userID));
}

const mapPtCard = (ptCard: PtCard, userID: string) => {
    
    const position = getPosition(ptCard);

    return {
        PtCardID: ptCard.PtCardID,
        CardID: ptCard.CardID,
        LiveUpdateID: ptCard.LiveUpdateID,
        CardTitle: `${position} ${ptCard.FirstName} ${ptCard.LastName} ${ptCard.Franchise}`,
        CardValue: ptCard.CardValue,
        Position: ptCard.Position,
        PredictedTier: ptCard.PtPredicts ? filterForUser(ptCard.PtPredicts, userID) : undefined,
    } as PtCardPrediction    

}

const mapPtCardsResultingTier = (ptCards: PtCard[], userID: string) => {
    return ptCards.map(r => mapPtCardResultingTier(r, userID));
}

const mapPtCardResultingTier = (ptCard: PtCard, userID: string) => {
    
    const position = getPosition(ptCard);

    const getPredictedTiers = () => {
        if (ptCard.PtPredicts) {
            return Object.values(ptCard.PtPredicts);
        }
        else {
            return [] as number[];
        }
    }

    return {
        PtCardID: ptCard.PtCardID,
        CardID: ptCard.CardID,
        LiveUpdateID: ptCard.LiveUpdateID,
        CardTitle: `${position} ${ptCard.FirstName} ${ptCard.LastName} ${ptCard.Franchise}`,
        CardValue: ptCard.CardValue,
        Position: ptCard.Position,
        PredictedTiers: getPredictedTiers(),
        ResultingTier: ptCard.ResultingTier,
        ResultingCardValue: ptCard.ResultingCardValue,
        PreviousTier: ptCard.tier,
    } as PtCardResultingTier    
}

const getPosition = (ptCard: PtCard) => {
    if (ptCard.Position === 1) {        
        return extractPositionFromCardTitle(ptCard.CardTitle)
    }
    else {
        return Position[ptCard.Position];
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