import { Position } from './index'

export interface PtCard {
    PtCardID: number,
    CardID: number,
    LiveUpdateID: number,
    CardTitle: string,
    CardValue: number,
    Position: Position,
    PredictedTier?: number,
}