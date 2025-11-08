import * as React from 'react';
import { TierSelector } from "./TierSelector"
import { CardPrediction } from '../types'

type PtCardProps = {
    cardPrediction: CardPrediction,
}

export const PtCard = ({ cardPrediction }: PtCardProps) => {

    const ptCardPrediction = cardPrediction.ActivePtCardPrediction;

    return (
        <div className="border inline-block ptcard p-4 my-4">
            <div className="card-rating-wrapper">
                <div className="inline-flex items-center justify-center border border-black rounded-full w-[35px] h-[35px] text-center">{ptCardPrediction.CardValue}</div>
            </div>
            <div className="card-image-wrapper m-auto"><img className="m-auto block" src="/batter-silhoutte.jpg" height="200" width="150"/></div>
            <div className="text-center">{ptCardPrediction?.CardTitle}</div>
            <div>
                { ptCardPrediction && <TierSelector ptCardPrediction={ptCardPrediction} /> }
            </div>
        </div>
    )

}