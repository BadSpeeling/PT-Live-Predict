import { GetPtCardPredictsRequest, GetPtCardResultingTierRequest, PostPtPredictRequest, PostPtPredictResponse, GetPtCardPredictsResponse, GetPtCardResultingTierResponse, Position, GridMode } from '../../types'

import { PtCard } from '../../types/data'
import { getErrorMessage, mapPtCards, mapPtCardsResultingTier, ptCardPredictsToPtCardRequest, ptCardResultingTierToPtCardRequest, ptPredictRequestToFirebase } from './converters'
import { getFirebaseClient } from './base'

export const getPtPredictPlayers = async (requestBody: GetPtCardPredictsRequest, isLocalHostFlag: boolean) => {

    const firebaseClient = await getFirebaseClient(isLocalHostFlag);

    const getPtCardsRequest = ptCardPredictsToPtCardRequest(requestBody);
    
    let ptCards: PtCard[]; 
    
    try {
        ptCards = await firebaseClient.getPtCards(getPtCardsRequest);
    }
    catch (e) {
        throw Error("Failure getting PtCards for PtCardPredicts: " + getErrorMessage(e));
    }

    let ptCardCount: number;

    try {
        ptCardCount = await firebaseClient.getPtCardsCount(requestBody);
    }
    catch (e) {
        throw Error("Failure getting total record count for PtCardPredicts: " + getErrorMessage(e));
    }

    return { 
        PtCards: mapPtCards(ptCards, firebaseClient.currentUser.uid),
        PtCardCount: ptCardCount,
    } as GetPtCardPredictsResponse;

}

export const getPtCardsResultingTier = async (requestBody: GetPtCardResultingTierRequest, isLocalHostFlag: boolean) => {

    const firebaseClient = await getFirebaseClient(isLocalHostFlag);

    const getPtCardsRequest = ptCardResultingTierToPtCardRequest(requestBody);

    let ptCards: PtCard[]; 
    
    try {
        ptCards = await firebaseClient.getPtCards(getPtCardsRequest);
    }
    catch (e) {
        throw Error("Failure getting PtCards for PtCardsResultingTier: " + getErrorMessage(e));
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

    const firebaseClient = await getFirebaseClient(isLocalHostFlag);

    const postPtPredictRequest = ptPredictRequestToFirebase(requestBody);

    try {
        await firebaseClient.postPtPredict(postPtPredictRequest);
    }
    catch (e) {
        throw Error("Failure posting PtPredict: " + getErrorMessage(e));
    }

}