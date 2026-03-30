import { PtPlayerName, CardPagination } from './index'

export interface GetPtCardRequest {
    TeamFilter: string | null,
    TierFilter: number | null,
    NameFilter: PtPlayerName | null,
    CardPagination: CardPagination,
    LiveUpdateID: number,
    NavigationDirection: null | "asc" | "desc",
    LastPtCardID: null | number,
    PageSize: number,
}

export interface PostPtPredictRequest {
    PtCardID: number,
    PredictedTier: number,
}