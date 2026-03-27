import * as React from 'react';
import { AppContext } from './AppContext'
import { liveUpdates } from '../types/data'
import { GridMode } from '@/types';
import { dateToString } from './lib/pt-card-helper'

export const GridStatus = () => {

    const context = React.useContext(AppContext);
    const queryLiveUpdate = context.loadedData.LiveUpdate; 

    const getContent = () => {
        switch (context.pageState.GridMode) {
            case GridMode.PtCard:
                return (
                    <>
                        <span>{`Displaying Cards for the current Live Update, starting on ` + dateToString(queryLiveUpdate.StartDate)}</span>
                    </>
                )
            case GridMode.ResultingTier:
                return (
                    <>
                       <span>{`Displaying results for the Live Update on ${dateToString(queryLiveUpdate.EndDate!)}`}</span> 
                    </>
                )
        }
    }

    return (
        <div className="mt-4 text-center bolder text-xl">
            {getContent()}
        </div>
    )

}

