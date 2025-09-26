import { PtCard, PtPredict, CardPrediction, PtCardPrediction } from '../types'

export default class PtPredictDataFormatter {

    ptCards: PtCard[]
    ptPredictsMap: {[key: number]: PtPredict} = {};
    cardPredictionMap: {[key: number]: CardPrediction}

    constructor (ptCards: PtCard[], ptPredicts: PtPredict[]) {
        this.ptCards = ptCards;
        this.ptPredictsMap = this.#createPtPredictMap(ptPredicts);
        this.cardPredictionMap = {}
    }

    getCardPredictions () {

        this.ptCards.forEach(ptCard => {
 
            if (!this.#hasCardBeenAdded(ptCard)) {
                this.#addCardPrediction(ptCard);
            }

            this.#addPtCardPrediction(ptCard);            

        })

        const cardPredictions = this.#convertCardPredictionMapToArray();
        return cardPredictions;

    }

    #convertCardPredictionMapToArray () {
        
        const cardPtPredicts: CardPrediction[] = []

        for (const [_,ptPredictPlayer] of Object.entries(this.cardPredictionMap)) {
            cardPtPredicts.push(ptPredictPlayer);
        }

        return cardPtPredicts;

    }

    #hasCardBeenAdded (ptCard: PtCard) {
        return this.cardPredictionMap[ptCard.CardID]
    }
    
    #addCardPrediction (ptCard: PtCard) {
        this.cardPredictionMap[ptCard.CardID] = this.#createCardPrediction(ptCard);
    }

    #createPtPredictMap(ptPredicts: PtPredict[]) {

        const ptPredictsMap: {[key: number]: PtPredict} = {};

        ptPredicts.forEach(ptPredict => {
            ptPredictsMap[ptPredict.PtCardID] = ptPredict;
        })

        return ptPredictsMap;

    }

    #addPtCardPrediction(ptCard: PtCard) {
        const ptPredict = this.ptPredictsMap[ptCard.PtCardID];
        const ptCardPrediction = this.#createPtCardPrediction(ptCard, ptPredict);

        this.#addPtCardPredictionHelper(ptCard, ptCardPrediction);
    }
    
    #addPtCardPredictionHelper(ptCard: PtCard, ptPredictPtCard: PtCardPrediction) {
        const ptPredictPlayer = this.cardPredictionMap[ptCard.CardID];
        ptPredictPlayer.PtCardPredictions.push(ptPredictPtCard);
    }

    #createCardPrediction (ptCard: PtCard) {

        return {
            CardID: ptCard.CardID,
            PtCardPredictions: []
        } as CardPrediction

    }

    #createPtCardPrediction (ptCard: PtCard, ptPredict?: PtPredict) {

        return {
            PtPredictID: ptPredict?.PtPredictID,
            PtCardID: ptCard.PtCardID,
            CardID: ptCard.CardID,
            LiveUpdateID: ptCard.LiveUpdateID,
            CardTitle: ptCard.CardTitle,
            CardValue: ptCard.CardValue,
            Position: ptCard.Position,
            PredictedTier: ptPredict?.PredictedTier,
        } as PtCardPrediction

    }

}