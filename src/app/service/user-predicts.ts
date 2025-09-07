import { GetPtCardPredictsRequest, GetPtCardPredictsResponse, PostPtCardPredictRequest, PostPtCardPredictResponse, PredictSearchType, PtCardPredict, GetPtCardPredictsQueryResult } from '../../types'
import { getUserPredictsScript, insertUserPredictsScript, updateUserPredictsScript } from '../database/scripts'
import { getDatabase } from '../database/database'
import { getPtCardData } from '../../lib/firebase/data'

// const db = new DatabaseDriver('./pt-live-predict.db');
// db.openDatabase();

export const getUserPredicts = async (requestBody: GetPtCardPredictsRequest) => {

    getPtCardData(true);

    // const script = getUserPredictsScript([],[],[],[],false,false,false,1,10,'');
    
    // const db = await getDatabase();
    
    // //const getUserPredictsQueryResult = await db.getAll<GetPtCardPredictsQueryResult>(script);
    // const getUserPredictsQueryResult = await db.all<GetPtCardPredictsQueryResult[]>(script);

    // db.close();

    const userCardPredicts = [] as PtCardPredict[]

    // let cardPredictionToAdd = null as null | PtCardPredict;

    // for (const curCardPredict of getUserPredictsQueryResult) {

    //     if (cardPredictionToAdd != null && curCardPredict.CardID !== cardPredictionToAdd.CardID) {
    //         userCardPredicts.push(cardPredictionToAdd);
    //         cardPredictionToAdd = null;
    //     }

    //     if (cardPredictionToAdd === null) {
    //         cardPredictionToAdd = {
    //             CardID: curCardPredict.CardID,
    //             UserPredicts: []
    //         };
    //     }

    //     cardPredictionToAdd.UserPredicts.push(curCardPredict)

    // }

    // if (cardPredictionToAdd) userCardPredicts.push(cardPredictionToAdd);   
        
    return {UserCardPredicts: userCardPredicts} as GetPtCardPredictsResponse;

}

export const postUserPredict = async (requestBody: PostPtCardPredictRequest) => {

    const db = await getDatabase();
    let ptCardPredictID: number = -1;

    if (!requestBody.PtCardPredictID) {
        const insertScript = insertUserPredictsScript(requestBody.PtCardID, requestBody.PredictedTier, requestBody.UserID);
        const insertResult = await db.run(insertScript.replace('--',''))

        if (insertResult.lastID) {
            ptCardPredictID = insertResult.lastID;
        }
        else {
            throw Error("PtCard insert failed");
        }
    }
    else {
        const updateScript = updateUserPredictsScript(requestBody.PtCardPredictID, requestBody.PredictedTier);
        await db.exec(updateScript);
        ptCardPredictID = requestBody.PtCardPredictID;
    }

    return {
        PtCardPredictID: ptCardPredictID,
        PtCardID: requestBody.PtCardID,
        CardID: requestBody.CardID,
    } as PostPtCardPredictResponse

}
