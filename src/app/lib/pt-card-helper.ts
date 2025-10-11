import { CardPrediction } from '../../types'

export const sortPtCardList = (cardPredictions: CardPrediction[]) => {

    return cardPredictions.sort((a: CardPrediction, b: CardPrediction) => {
        const overallDiff = b.ActivePtCardPrediction.CardValue - a.ActivePtCardPrediction.CardValue;

        if (overallDiff != 0) {
            return overallDiff;
        }

        return b.ActivePtCardPrediction.CardID - a.ActivePtCardPrediction.CardID;

    })

}