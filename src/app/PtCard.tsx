import * as React from 'react';
import { TierSelector } from "./TierSelector"
import { PtCard as PtCardValues } from '../types/component'
import { Tier } from '../types/index'

type PtCardProps = {
    ptCard: PtCardValues,
}

export const PtCard = ({ ptCard }: PtCardProps) => {

    return (
        <div className="border-2 rounded-xl inline-block pt-card p-4 my-4">
            <div className="card-rating-wrapper">
                <div className="inline-flex items-center justify-center border border-black rounded-full w-[35px] h-[35px] text-center">{ptCard.CardValue}</div>
            </div>
            <div className="card-image-wrapper m-auto"><img className="m-auto block card-image" src={ptCard.Position === 1 ? "/pitcher-silhoutte.jpg" : "/batter-silhoutte.jpg"} /></div>
            <div className="text-center">{ptCard.CardTitle}</div>
            <div className="text-xs py-1">Selected Tier: {ptCard.PredictedTier || ptCard.PredictedTier === 0 ? Tier[ptCard.PredictedTier] : "None"}</div>
            <TierSelector ptCard={ptCard} />
        </div>
    )

}