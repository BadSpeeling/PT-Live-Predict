import * as React from 'react';
import { TierSelector } from "./TierSelector"
import { CardPrediction } from '../types'

type PtCardProps = {
    card: CardPrediction,
    index: number,
}

export const PtCard = ({ card, index }: PtCardProps) => {

    const liveUpdateID = card.PtCardPredictions.map(p => p.LiveUpdateID).reduce((maxLiveUpdate, currentLiveUpdate) => Math.max(maxLiveUpdate,currentLiveUpdate))

    const currentActivePtCard = card.PtCardPredictions.find(p => p.LiveUpdateID == liveUpdateID);

    return (
        <div className="my-4 card-list-row">
            <div>{currentActivePtCard?.CardTitle}</div>
            <TierSelector ptCardIndex={index} />
        </div>
    )

}