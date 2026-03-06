import { PtCard } from '../../types/component'
import { AppData, GridMode } from '../../types'

export const sortPtCardList = (cardPredictions: PtCard[]) => {

    return cardPredictions.sort((a: PtCard, b: PtCard) => {
        const overallDiff = b.CardValue - a.CardValue;

        if (overallDiff != 0) {
            return overallDiff;
        }

        return b.CardID - a.CardID;

    })

}

export const countTiers = (tiers: number[]) => {

    const tierCounts = [...Array(6).keys()].map(_ => 0);

    for (const tier of tiers) {
        tierCounts[tier] += 1;
    }

    return tierCounts;

}

export const getActiveData = (appData: AppData) => {
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