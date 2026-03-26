import { Position } from './index'

export interface PtCard {
    PtCardID: number,
    CardID: number,
    LiveUpdateID: number,
    CardTitle: string,
    CardValue: number,
    Position: Position,
    PredictedTier: number,
}

export interface PtCardResultingTier {
    PtCardID: number,
    CardID: number,
    LiveUpdateID: number,
    CardTitle: string,
    CardValue: number,
    Position: Position,
    PredictedTiers: number[],
    ResultingTier: number,
    ResultingCardValue: number,
    PreviousTier: number,
}