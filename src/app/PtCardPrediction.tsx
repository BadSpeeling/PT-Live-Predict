import * as React from 'react';
import { TierSelector } from "./TierSelector"
import { PtCardPrediction as PtCardPredictionData } from '../types/component'
import { Tier } from '../types/index'

type PtCardPredictionProps = {
    ptCardPrediction: PtCardPredictionData,
}

export const PtCardPrediction = ({ ptCardPrediction }: PtCardPredictionProps) => {

    return (
        <div className="border-2 rounded-xl inline-block pt-card p-4 my-4">
            <div className="card-rating-wrapper">
                <div className="inline-flex items-center justify-center border border-black rounded-full w-[35px] h-[35px] text-center">{ptCardPrediction.CardValue}</div>
            </div>
            <div className="card-image-wrapper m-auto"><img className="m-auto block card-image" src={ptCardPrediction.Position === 1 ? "/pitcher-silhoutte.jpg" : "/batter-silhoutte.jpg"} /></div>
            <div className="text-center">{ptCardPrediction.CardTitle}</div>
            <div className="text-xs py-1">Selected Tier: {ptCardPrediction.PredictedTier >= 0 ? Tier[ptCardPrediction.PredictedTier] : "None"}</div>
            <TierSelector ptCard={ptCardPrediction} />
        </div>
    )

}