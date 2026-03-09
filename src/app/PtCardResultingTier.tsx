import * as React from 'react';
import { PtCardResultingTier as PtCardResultingTierValues } from '../types/component'
import { countTiers } from './lib/pt-card-helper'
import { Tier } from '../types/'

type PtCardResultingTierProps = {
    ptCardResultingTier: PtCardResultingTierValues,
}

export const PtCardResultingTier = ({ ptCardResultingTier }: PtCardResultingTierProps) => {

    const votingTiersResults = countTiers(ptCardResultingTier.PredictedTiers);
    const totalVotes = ptCardResultingTier.PredictedTiers.length;
    const tiers = [Tier.Iron, Tier.Bronze, Tier.Silver, Tier.Gold, Tier.Diamond, Tier.Perfect];

    const voteBars = tiers.map((tier, tierIndex) => {

        const tierVotes = votingTiersResults[tierIndex];

        if (tierVotes === 0) {
            return <></>
        }
        else {

            const tierVoteShare = Math.round((tierVotes / totalVotes) * 100);
            return (
                <div className="w-full">
                    <div className="text-xs w-1/3 inline-block">{Tier[tier].toString()} {`(${tierVotes})`}</div>
                    <div className="w-2/3 inline-block"><div style={{width: `${tierVoteShare}%`}} className={`h-[10px] ${Tier[tier].toString().toLowerCase()}`}></div></div>
                </div>
            )
        }
    })

    const getResultingCardValueColor = () => {

        const cardValueDelta = ptCardResultingTier.ResultingCardValue - ptCardResultingTier.CardValue;

        if (cardValueDelta === 0) {
            return "text-black";
        }
        else if (cardValueDelta > 0) {
            return "text-green-500";
        }
        else {
            return "text-red-500";
        }

    }

    return (
        <div className="border-2 rounded-xl inline-block pt-card p-4 my-4 size-fit">
            <div>{ptCardResultingTier.CardTitle}</div>
            <div>Rating Change: {ptCardResultingTier.CardValue} &rarr; <span className={getResultingCardValueColor()}>{ptCardResultingTier.ResultingCardValue}</span></div>
            <div className="mt-1">
                <div>Total Votes: {totalVotes}</div>
                {totalVotes !== 0 && <div className="border-1 p-1">{voteBars}</div>}
            </div>
        </div>
    )

}