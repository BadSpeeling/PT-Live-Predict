import * as React from 'react';
import { AppContext } from './AppContext'
import { Tier, PostPtPredictRequest, PostPtPredictResponse, PtCardPrediction, CardPrediction } from '../types'

type TierSelectorProps = {
    ptCardIndex: number,
}

export const TierSelector = ({ptCardIndex}: TierSelectorProps) => {

    const context = React.useContext(AppContext);
    const tiers = [Tier.Iron, Tier.Bronze, Tier.Silver, Tier.Gold, Tier.Diamond, Tier.Perfect];
    const currentLivePtCard = context.cardPredictions[ptCardIndex].PtCardPredictions[0];
    const [selectedIndex, setSelectedIndex] = React.useState(currentLivePtCard.PredictedTier);

    const setSelectedIndexHandler = async (selectedTier: number) => {
        setSelectedIndex(selectedTier);

        const options = {
            method: "POST",
            headers: {
                'Content-Type':"application/json"
            },
            body: JSON.stringify({
                PtPredictID: currentLivePtCard.PtPredictID,
                PtCardID: currentLivePtCard.PtCardID,
                CardID: currentLivePtCard.CardID,
                PredictedTier: selectedTier,
                LiveUpdateID: currentLivePtCard.LiveUpdateID
            } as PostPtPredictRequest)
        }
        const postPtCardPredictResponseRaw = await fetch('/api/pt-card-predict', options)
        const postPtCardPredictResponse = await postPtCardPredictResponseRaw.json() as PostPtPredictResponse;

        const updatedCardPrediction = context.cardPredictions.map((ptCard) => {
            if (postPtCardPredictResponse.CardID === ptCard.CardID) {
                const cardPrediction = context.cardPredictions[ptCardIndex];
                const updatedPtCardPrediction = cardPrediction.PtCardPredictions.map((userPredict) => {
                    if (userPredict.PtCardID === postPtCardPredictResponse.PtCardID) {
                        return {
                            ...userPredict,
                            PredictedTier: selectedTier,
                            PtPredictID: postPtCardPredictResponse.PtPredictID
                        } as PtCardPrediction
                    }
                    else {
                        return userPredict;
                    }
                });
                
                return {
                    ...ptCard,
                    PtCardPredictions: updatedPtCardPrediction
                } as CardPrediction

            }
            else {
                return ptCard;
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