import * as React from 'react';
import { AppContext } from './AppContext'
import { Tier, PostPtPredictRequest, PostPtPredictResponse, PtCardPrediction, CardPrediction } from '../types'

type TierSelectorProps = {
    ptCardPrediction: PtCardPrediction,
}

export const TierSelector = ({ ptCardPrediction }: TierSelectorProps) => {

    const context = React.useContext(AppContext);
    const tiers = [Tier.Iron, Tier.Bronze, Tier.Silver, Tier.Gold, Tier.Diamond, Tier.Perfect];
    const [selectedIndex, setSelectedIndex] = React.useState(ptCardPrediction.PredictedTier);

    const setSelectedIndexHandler = async (selectedTier: number) => {
        setSelectedIndex(selectedTier);

        const options = {
            method: "POST",
            headers: {
                'Content-Type':"application/json"
            },
            body: JSON.stringify({
                PtPredictID: ptCardPrediction.PtPredictID,
                PtCardID: ptCardPrediction.PtCardID,
                CardID: ptCardPrediction.CardID,
                PredictedTier: selectedTier,
                LiveUpdateID: ptCardPrediction.LiveUpdateID
            } as PostPtPredictRequest)
        }
        const postPtCardPredictResponseRaw = await fetch('/api/pt-card-predict', options)
        const postPtCardPredictResponse = await postPtCardPredictResponseRaw.json() as PostPtPredictResponse;

        const updatedCardPrediction = context.cardPredictions.map((currCardPrediction) => {
            if (postPtCardPredictResponse.CardID === currCardPrediction.CardID) {
                
                const updatedPtCardPrediction = currCardPrediction.PtCardPredictions.map((currPtCardPrediction) => {                    
                    if (currPtCardPrediction.PtCardID === postPtCardPredictResponse.PtCardID) {
                        return {
                            ...currPtCardPrediction,
                            PredictedTier: selectedTier,
                            PtPredictID: postPtCardPredictResponse.PtPredictID
                        } as PtCardPrediction
                    }
                    else {
                        return currPtCardPrediction;
                    }
                });
                
                return {
                    ...currCardPrediction,
                    PtCardPredictions: updatedPtCardPrediction,
                    ActivePtCardPrediction: {
                        ...currCardPrediction.ActivePtCardPrediction,
                        PredictedTier: selectedTier,
                        PtPredictID: postPtCardPredictResponse.PtPredictID
                    }
                } as CardPrediction

            }
            else {
                return currCardPrediction;
            }
        });

        context.setCardPredictions(updatedCardPrediction);

    }

    const tierOptions = tiers.map((tier, index) => {
        return (
            <div key={index} onClick={() => { setSelectedIndexHandler(index)}} className={`${index === selectedIndex ? "ptCardPredictSelection" : ""} inline-block bg-cover cursor-pointer card-tier-selector mr-4 ${Tier[tier].toString().toLowerCase()}`}></div>
        )
    })

    return (
        <div className="">
            {tierOptions}
        </div>
    )

}