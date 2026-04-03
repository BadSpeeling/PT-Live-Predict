import * as React from 'react';
import { AppContext } from './AppContext'
import { LiveUpdate } from '../types/data'
import { GridMode } from '@/types';
import { dateToString } from './lib/pt-card-helper'

type GridStatusProps = {
    hasDataFlag: boolean
    liveUpdate: LiveUpdate,
}

export const GridStatus = ({liveUpdate, hasDataFlag}: GridStatusProps) => {

    const context = React.useContext(AppContext);

    const getContent = () => {
        switch (context.pageState.GridMode) {
            case GridMode.PtCard:
                return (
                    <>
                        <span>{`Displaying Cards for the current Live Update, starting on ` + dateToString(liveUpdate.StartDate)}</span>
                    </>
                )
            case GridMode.ResultingTier:
                return (
                    <>
                       <span>{`Displaying results for the Live Update on ${dateToString(liveUpdate.EndDate!)}`}</span> 
                    </>
                )
        }
    }

    return (
        <div className="mt-4 text-center bolder text-xl">
            {hasDataFlag ? getContent() : <NoCardsFound />}
        </div>
    )

}

const NoCardsFound = () => {
  return (
    <div className="text-center bolder text-lg">
      <span>No cards were found! Check your filters.</span>
    </div>
  )
}