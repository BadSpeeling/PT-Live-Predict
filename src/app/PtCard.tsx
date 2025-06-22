import * as React from 'react';
//import { AppContext } from './appContext'
import { TierSelector } from "./TierSelector"
import {PtCardPredict} from '../types'

type PtCardProps = {
    card: PtCardPredict,
    index: number,
}

export const PtCard = ({ card, index }: PtCardProps) => {

    const ptCard = card
    const currentActivePtCard = ptCard.UserPredicts[0];

    return (
        <div className="my-4 card-list-row">
            <div>{currentActivePtCard.CardTitle}</div>
            <TierSelector ptCardIndex={index} />
        </div>
    )

}