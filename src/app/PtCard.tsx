import * as React from 'react';
import { AppContext } from './appContext'
import { TierSelector } from "./TierSelector"

type PtCardProps = {
    index: number,
}

export const PtCard = ({ index }: PtCardProps) => {

    const context = React.useContext(AppContext);
    const ptCard = context.PtCards[index];
    const currentActivePtCard = ptCard.UserPredicts[0];

    return (
        <div className="my-4 card-list-row">
            <div>{currentActivePtCard.CardTitle}</div>
            <TierSelector ptCardIndex={index} />
        </div>
    )

}