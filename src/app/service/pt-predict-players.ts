import { GetPtCardPredictsRequest, PostPtPredictRequest, PostPtPredictResponse, PtCard, PtPredict } from '../../types'
import FirebaseClient from '../../lib/firebase/FirebaseClient'
import PtPredictDataFormatter from '../../lib/PtPredictDataFormatter'

export const getPtPredictPlayers = async (requestBody: GetPtCardPredictsRequest, isLocalHostFlag: boolean) => {

    const firebaseClient = new FirebaseClient(isLocalHostFlag);
    await firebaseClient.initialize();

    const ptCards = await firebaseClient.getPtCards();
    const ptPredicts = await firebaseClient.getPtPredicts();
    
    const dataFormatter = new PtPredictDataFormatter(ptCards, ptPredicts);
    const cardPredictions = dataFormatter.getCardPredictions();

    return cardPredictions;

}

export const postUserPredict = async (requestBody: PostPtPredictRequest, isLocalHostFlag: boolean) => {

    const firebaseClient = new FirebaseClient(isLocalHostFlag);
    await firebaseClient.initialize();

    const postPtPredictResponse: PostPtPredictResponse = await firebaseClient.postPtPredict(requestBody);
    return postPtPredictResponse;

}
