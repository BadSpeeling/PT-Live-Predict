import { GetPtCardPredictsRequest, GetPtCardPredictsResponse, PostPtCardPredictRequest, PostPtCardPredictResponse, PredictSearchType, PtCardPredict, GetPtCardPredictsQueryResult } from '../../types'
import { ptCardsData } from '../data'
import { getUserPredictsScript } from '../database/scripts'
import { DatabaseDriver } from '../database/database'

import sqlite3 from 'sqlite3'
import { open, Database } from 'sqlite'

// const db = new DatabaseDriver('./pt-live-predict.db');
// db.openDatabase();

export const getUserPredicts = async (requestBody: GetPtCardPredictsRequest) => {

    const script = getUserPredictsScript([],[],[],[],false,false,false,1,10,'');
    //const getUserPredictsQueryResult = await db.getAll<GetPtCardPredictsQueryResult>(script);
    //const getUserPredictsQueryResult = ptCardsData as GetPtCardPredictsQueryResult[];

        const db = await open({
            filename: './pt-live-predict.db',
            //filename: this.server,
            driver: sqlite3.Database
        });

        const getUserPredictsQueryResult = await db.all<GetPtCardPredictsQueryResult[]>(script);

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
