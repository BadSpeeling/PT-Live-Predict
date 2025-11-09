import { GetPtCardPredictsRequest, PostPtPredictRequest, PostPtPredictResponse, GetPtCardPredictsResponse } from '../../types'
import FirebaseClient from '../../lib/firebase/FirebaseClient'
import PtPredictDataFormatter from '../../lib/PtPredictDataFormatter'

export const getPtPredictPlayers = async (requestBody: GetPtCardPredictsRequest, isLocalHostFlag: boolean) => {

    const firebaseClient = new FirebaseClient(isLocalHostFlag);
    await firebaseClient.initialize();

    const ptCards = await firebaseClient.getPtCards(requestBody.TeamFilter, requestBody.LatestLiveUpdateID);
    const ptPredicts = await firebaseClient.getPtPredicts();
    
    const dataFormatter = new PtPredictDataFormatter(ptCards, ptPredicts, requestBody.LatestLiveUpdateID);
    const cardPredictions = dataFormatter.getCardPredictions();

    return { 
        CardPredictions: cardPredictions,
    } as GetPtCardPredictsResponse;

}

export const postUserPredict = async (requestBody: PostPtPredictRequest, isLocalHostFlag: boolean) => {

    const firebaseClient = new FirebaseClient(isLocalHostFlag);
    await firebaseClient.initialize();

    const postPtPredictResponse: PostPtPredictResponse = await firebaseClient.postPtPredict(requestBody);
    return postPtPredictResponse;

}
