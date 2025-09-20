import * as React from 'react';
import { TierSelector } from "./TierSelector"
import { PtPredictPlayer } from '../types'

type PtCardProps = {
    card: PtPredictPlayer,
    index: number,
}

export const PtCard = ({ card, index }: PtCardProps) => {

    const ptCard = card
    const currentActivePtCard = ptCard.PtPredicts[0];

    return (
        <div className="my-4 card-list-row">
            <div>{currentActivePtCard.CardTitle}</div>
            <TierSelector ptCardIndex={index} />
        </div>
    )

}