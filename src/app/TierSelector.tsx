import * as React from 'react';
import { AppContext } from './appContext'
import { Tier } from '../types'

type TierSelectorProps = {
    ptCardIndex: number,
}

export const TierSelector = ({ptCardIndex}: TierSelectorProps) => {

    const context = React.useContext(AppContext);
    const tiers = [Tier.Iron, Tier.Bronze, Tier.Silver, Tier.Gold, Tier.Diamond, Tier.Perfect];
    const currentActivePtCard = context.PtCards[ptCardIndex].UserPredicts[0];
    const [selectedIndex, setSelectedIndex] = React.useState(currentActivePtCard.PredictedTier);

    const setSelectedIndexHandler = (index: number) => {
        setSelectedIndex(index);
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