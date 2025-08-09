import { LiveUpdate, GetPtCardPredictsQueryResult } from '../types'

export const ptCardsData = [
    {
        "PtCardID": 3,
        "CardID": 6000,
        "LiveUpdateID": 2,
        "CardTitle": "Bryce Harper, Philadelphia Phillies",
        "CardValue": 100,
        "Position": 3,
        "PredictedTier": 5,
    },
    {
        "PtCardID": 1,
        "CardID": 6000,
        "LiveUpdateID": 1,
        "CardTitle": "Bryce Harper, Philadelphia Phillies",
        "CardValue": 100,
        "Position": 3,
        "PredictedTier": 5,
    },
    {
        "PtCardID": 4,
        "CardID": 6001,
        "LiveUpdateID": 2,
        "CardTitle": "Shohei Ohtani, Los Angeles Dodgers",
        "CardValue": 100,
        "Position": 10,
        "PredictedTier": 5,
    },
    {
        "PtCardID": 2,
        "CardID": 6001,
        "LiveUpdateID": 1,
        "CardTitle": "Shohei Ohtani, Los Angeles Dodgers",
        "CardValue": 100,
        "Position": 10,
        "PredictedTier": 5,
    },
    {
        "PtCardID": 5,
        "CardID": 6002,
        "LiveUpdateID": 2,
        "CardTitle": "Otto Kemp, Philadelphia Phillies",
        "CardValue": 40,
        "Position": 5,
        "PredictedTier": 0,
    },
    {
        "PtCardID": 7,
        "CardID": 6003,
        "LiveUpdateID": 2,
        "CardTitle": "Mackenzie Gore, Washington Nationals",
        "CardValue": 77,
        "Position": 1,
        "PredictedTier": 2,
    },
    {
        "PtCardID": 6,
        "CardID": 6003,
        "LiveUpdateID": 1,
        "CardTitle": "Mackenzie Gore, Washington Nationals",
        "CardValue": 68,
        "Position": 1,
        "PredictedTier": 1,
    }
] as GetPtCardPredictsQueryResult[]

export const liveUpdate = [
    {
        "LiveUpdateID": 1,
        "EffectiveDate": '2025-03-14'
    },
    {
        "LiveUpdateID": 2,
        "EffectiveDate": '2025-05-05'
    }
] as LiveUpdate[]