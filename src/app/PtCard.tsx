import * as React from 'react';
import { TierSelector } from "./TierSelector"
import { CardPrediction } from '../types'

type PtCardProps = {
    cardPrediction: CardPrediction,
}

export const PtCard = ({ cardPrediction }: PtCardProps) => {

    const currentLiveUpdateID = cardPrediction.PtCardPredictions.map(p => p.LiveUpdateID).reduce((maxLiveUpdate, currentLiveUpdate) => Math.max(maxLiveUpdate,currentLiveUpdate))
    const ptCardPrediction = cardPrediction.PtCardPredictions.find(p => p.LiveUpdateID == currentLiveUpdateID);

    return (
        <div className="my-4 card-list-row">
            <div>{ptCardPrediction?.CardTitle}</div>
            { ptCardPrediction && <TierSelector ptCardPrediction={ptCardPrediction} /> }
        </div>
    )

}