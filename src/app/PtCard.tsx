import * as React from 'react';
import { TierSelector } from "./TierSelector"
import { CardPrediction } from '../types'

type PtCardProps = {
    cardPrediction: CardPrediction,
}

export const PtCard = ({ cardPrediction }: PtCardProps) => {

    const ptCardPrediction = cardPrediction.ActivePtCardPrediction;

    return (
        <div className="my-4 card-list-row">
            <div>{ptCardPrediction?.CardTitle}</div>
            <div className="inline-flex items-center justify-center border border-black rounded-full w-[35px] h-[35px] text-center">{ptCardPrediction.CardValue}</div>
            { ptCardPrediction && <TierSelector ptCardPrediction={ptCardPrediction} /> }
        </div>
    )

}