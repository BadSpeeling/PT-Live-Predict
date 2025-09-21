import * as React from 'react';
import { AppContext } from './AppContext'
import { Tier, PostPtPredictRequest, PostPtPredictResponse, PtPredict, PtPredictPlayer } from '../types'

type TierSelectorProps = {
    ptCardIndex: number,
}

export const TierSelector = ({ptCardIndex}: TierSelectorProps) => {

    const context = React.useContext(AppContext);
    const tiers = [Tier.Iron, Tier.Bronze, Tier.Silver, Tier.Gold, Tier.Diamond, Tier.Perfect];
    const currentLivePtCard = context.ptPredictPlayers[ptCardIndex].PtPredicts[0];
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

        const updatedPtCardsPredicts = context.ptPredictPlayers.map((ptCard) => {
            if (postPtCardPredictResponse.CardID === ptCard.CardID) {
                const ptCardPredict = context.ptPredictPlayers[ptCardIndex];
                const updatedPtCardPredict = ptCardPredict.PtPredicts.map((userPredict) => {
                    if (userPredict.PtCardID === postPtCardPredictResponse.PtCardID) {
                        return {
                            ...userPredict,
                            PredictedTier: selectedTier,
                            PtPredictID: postPtCardPredictResponse.PtPredictID
                        } as PtPredict
                    }
                    else {
                        return userPredict;
                    }
                });
                
                return {
                    ...ptCard,
                    PtPredicts: updatedPtCardPredict
                } as PtPredictPlayer

            }
            else {
                return ptCard;
            }
        });

        context.setPtPredictPlayers(updatedPtCardsPredicts);

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