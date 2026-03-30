import { PtCardPrediction } from '../../types/component'
import { AppData, GridMode } from '../../types'

export const countTiers = (tiers: number[]) => {

    const tierCounts = [...Array(6).keys()].map(_ => 0);

    for (const tier of tiers) {
        tierCounts[tier] += 1;
    }

    return tierCounts;

}

export const getGridData = (appData: AppData) => {
    switch (appData.pageState.GridMode) {
        case GridMode.PtCard:
            return appData.loadedData.PtCards;
        case GridMode.ResultingTier:
            return appData.loadedData.PtCardsResultingTier;
    }
}

export const getActiveRecordCount = (appData: AppData) => {
    switch (appData.pageState.GridMode) {
        case GridMode.PtCard:
            return appData.loadedData.PtCardCount;
        case GridMode.ResultingTier:
            return appData.loadedData.PtCardResultingTierCount;
    }
}

export const dateToString = (date: Date) => {
    return `${date.getFullYear()}-${dateToStringHelper(date.getMonth()+1)}-${dateToStringHelper(date.getDate())}`
}

const dateToStringHelper = (dateSegment: number) => {
    return dateSegment < 10 ? "0"+dateSegment.toString() : dateSegment.toString();
}