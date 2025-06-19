import { GetPtCardPredictsRequest, GetPtCardPredictsResponse, PostPtCardPredictRequest, PostPtCardPredictResponse, PredictSearchType, PtCardPredict, GetPtCardPredictsQueryResult } from '../../types'
import { ptCardsData } from '../data'

export const getUserPredicts = (requestBody: GetPtCardPredictsRequest) => {

    const getUserPredictsQueryResult = ptCardsData as GetPtCardPredictsQueryResult[];
    getUserPredictsQueryResult.sort()

    const userCardPredicts = [] as PtCardPredict[]

    let cardPredictionToAdd = null as null | PtCardPredict;

    for (const curCardPredict of getUserPredictsQueryResult) {

        if (cardPredictionToAdd != null && curCardPredict.CardID !== cardPredictionToAdd.CardID) {
            userCardPredicts.push(cardPredictionToAdd);
            cardPredictionToAdd = null;
        }

        if (cardPredictionToAdd === null) {
            cardPredictionToAdd = {
                CardID: curCardPredict.CardID,
                UserPredicts: []
            };
        }

        cardPredictionToAdd.UserPredicts.push(curCardPredict)

    }

    if (cardPredictionToAdd) userCardPredicts.push(cardPredictionToAdd);   
    return {UserCardPredicts: userCardPredicts} as GetPtCardPredictsResponse;

}

export const postUserPredict = (requestBody: PostPtCardPredictRequest) => {

    if (!requestBody.PtCardPredictID) {
        const insertID = -1
        return {
            PostPtCardPredictID: insertID,
        }
    }
    else {
        //do the update
        return {
            PostCArdPredictID: requestBody.PtCardPredictID,
        }        
    }

}