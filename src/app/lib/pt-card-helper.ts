import { PtCard } from '../../types/component'

export const sortPtCardList = (cardPredictions: PtCard[]) => {

    return cardPredictions.sort((a: PtCard, b: PtCard) => {
        const overallDiff = b.CardValue - a.CardValue;

        if (overallDiff != 0) {
            return overallDiff;
        }

        return b.CardID - a.CardID;

    })

}