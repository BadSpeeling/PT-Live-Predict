import * as React from 'react';
import { AppContext } from './AppContext'
import { Tier, PostPtCardPredictResponse } from '../types'

type TierSelectorProps = {
    ptCardIndex: number,
}

export const TierSelector = ({ptCardIndex}: TierSelectorProps) => {

    const context = React.useContext(AppContext);
    const tiers = [Tier.Iron, Tier.Bronze, Tier.Silver, Tier.Gold, Tier.Diamond, Tier.Perfect];
    const currentLivePtCard = context.ptCardsPredicts[ptCardIndex].UserPredicts[0];
    const [selectedIndex, setSelectedIndex] = React.useState(currentLivePtCard.PredictedTier);

    const setSelectedIndexHandler = async (selectedTier: number) => {
        setSelectedIndex(selectedTier);

        const options = {
            method: "POST",
            headers: {
                'Content-Type':"application/json"
            },
            body: JSON.stringify({
                PtCardPredictID: currentLivePtCard.PtCardPredictID,
                PtCardID: currentLivePtCard.PtCardID,
                CardID: currentLivePtCard.CardID,
                PredictedTier: selectedTier,
                SessionID: context.activeUser?.SessionID,
            })
        }
        const postPtCardPredictResponseRaw = await fetch('/api/pt-card-predict', options)
        const postPtCardPredictResponse = await postPtCardPredictResponseRaw.json() as PostPtCardPredictResponse;

        const updatedPtCardsPredicts = context.ptCardsPredicts.map((ptCard) => {
            if (postPtCardPredictResponse.CardID === ptCard.CardID) {
                const ptCardPredict = context.ptCardsPredicts[ptCardIndex];
                const updatedPtCardPredict = ptCardPredict.UserPredicts.map((userPredict) => {
                    if (userPredict.PtCardID === postPtCardPredictResponse.PtCardID) {
                        return {
                            ...userPredict,
                            PredictedTier: selectedTier,
                            PtCardPredictID: postPtCardPredictResponse.PtCardPredictID
                        }
                    }
                    else {
                        return userPredict;
                    }
                });
                
                return {
                    ...ptCard,
                    UserPredicts: updatedPtCardPredict
                }

            }
            else {
                return ptCard;
            }
        });

        context.setPtCardsPredicts(updatedPtCardsPredicts);

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