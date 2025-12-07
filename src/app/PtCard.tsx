import * as React from 'react';
import { TierSelector } from "./TierSelector"
import { PtCard as PtCardValues } from '../types/component'

type PtCardProps = {
    ptCard: PtCardValues,
}

export const PtCard = ({ ptCard }: PtCardProps) => {

    return (
        <div className="border inline-block ptcard p-4 my-4">
            <div className="card-rating-wrapper">
                <div className="inline-flex items-center justify-center border border-black rounded-full w-[35px] h-[35px] text-center">{ptCard.CardValue}</div>
            </div>
            <div className="card-image-wrapper m-auto"><img className="m-auto block" src="/batter-silhoutte.jpg" height="200" width="150"/></div>
            <div className="text-center">{ptCard.CardTitle}</div>
            <div>
                <TierSelector ptCard={ptCard} />
            </div>
        </div>
    )

}