import * as React from 'react';
import { AppContext } from './AppContext'
import { Tier, PostPtPredictRequest, PostPtPredictResponse } from '../types'
import { PtCard as PtCardValues } from '../types/component'
import { toast } from 'react-toastify';

type TierSelectorProps = {
    ptCard: PtCardValues,
}

export const TierSelector = ({ ptCard }: TierSelectorProps) => {

    const context = React.useContext(AppContext);
    const predictedTier = ptCard.PredictedTier;
    const [selectedTier, setSelectedTier] = React.useState(predictedTier);

    const setSelectedTierHandler = async (selectedTier: number) => {

        setSelectedTier(selectedTier);

        const updatedPtCards = context.loadedData.PtCards.map((currPtCard) => {
            if (ptCard.CardID === currPtCard.CardID) {
                
                return {
                    ...currPtCard,
                    PredictedTier: selectedTier
                } as PtCardValues

            }
            else {
                return currPtCard;
            }
        });

        context.setLoadedData({
            ...context.loadedData,
            PtCards: updatedPtCards
        });

        const options = {
            method: "POST",
            headers: {
                'Content-Type':"application/json"
            },
            body: JSON.stringify({
                PtCardID: ptCard.PtCardID,
                PredictedTier: selectedTier,
            } as PostPtPredictRequest)
        }
        const postPtCardPredictResponseRaw = await fetch('/api/pt-card-predict', options)
        
        if (postPtCardPredictResponseRaw.status !== 200) {
            toast('Could not save prediction!')
        }
             
    }

    const tierOptions = [...Array(6).keys()].map((tier) => {
        return (
            <div key={tier} onClick={() => { setSelectedTierHandler(tier)}} className={`${tier === selectedTier ? "pt-card-predict-selection" : ""} inline-block bg-cover cursor-pointer card-tier-selector ${Tier[tier].toString().toLowerCase()}`}></div>
        )
    })

    return (
        <div className="card-tier-selector-wrapper flex justify-between">
            {tierOptions}
        </div>
    )

}