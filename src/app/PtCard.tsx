import * as React from 'react';
import { TierSelector } from "./TierSelector"
import { CardPrediction } from '../types'

type PtCardProps = {
    card: CardPrediction,
    index: number,
}

export const PtCard = ({ card, index }: PtCardProps) => {

    const currentActivePtCard = card.PtCardPredictions[0];

    return (
        <div className="my-4 card-list-row">
            <div>{currentActivePtCard.CardTitle}</div>
            <TierSelector ptCardIndex={index} />
        </div>
    )

}