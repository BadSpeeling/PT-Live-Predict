import * as React from 'react';
import { AppContext } from './AppContext'
import { Tier, PostPtPredictRequest, PostPtPredictResponse } from '../types'
import { PtCard as PtCardValues } from '../types/component'

type TierSelectorProps = {
    ptCard: PtCardValues,
}

export const TierSelector = ({ ptCard }: TierSelectorProps) => {

    const context = React.useContext(AppContext);
    const tiers = [Tier.Iron, Tier.Bronze, Tier.Silver, Tier.Gold, Tier.Diamond, Tier.Perfect];
    const [selectedIndex, setSelectedIndex] = React.useState(ptCard.PredictedTier);

    const setSelectedIndexHandler = async (selectedTier: number) => {
        setSelectedIndex(selectedTier);

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
        const postPtCardPredictResponse = await postPtCardPredictResponseRaw.json() as PostPtPredictResponse;

        if (postPtCardPredictResponse.RequestSucceeded) {
            const updatedPtCards = context.ptCards.map((currPtCard) => {
                if (ptCard.CardID === currPtCard.CardID) {
                    
                    return {
                        ...currPtCard,
                        PredictedTier: selectedIndex
                    } as PtCardValues

                }
                else {
                    return currPtCard;
                }
            });

            context.setPtCards(updatedPtCards);

        }
        else {            
            alert('Could not save prediction!')
            setSelectedIndex(ptCard.PredictedTier);
        }

    }

    const tierOptions = tiers.map((tier, index) => {
        return (
            <div key={index} onClick={() => { setSelectedIndexHandler(index)}} className={`${index === selectedIndex ? "ptCardPredictSelection" : ""} inline-block bg-cover cursor-pointer card-tier-selector ${Tier[tier].toString().toLowerCase()}`}></div>
        )
    })

    return (
        <div className="tier-selector flex justify-around">
            {tierOptions}
        </div>
    )

}