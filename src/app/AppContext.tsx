'use client'

import * as React from 'react'
import { AppData, CardPrediction, CardPagination, SelectOption } from '../types'

const appData = {
    cardPredictions: [] as CardPrediction[],
    setCardPredictions: (_: CardPrediction[]) => {},
    selectedTeam: {label:'', value:''} as SelectOption,
    setSelectedTeam: (_: SelectOption) => {},
    cardPage: {
        CurrentPage: 1,
        PageSize: 10
    },
    setCardPage: (cardPage: CardPagination) => {},
    currentLiveUpdateID: 1,
} as AppData

export const AppContext = React.createContext(appData);

export default function AppProvider({
    children
}: {
    children: React.ReactNode
}) {

    const cardPagination: CardPagination = {
        CurrentPage: 1,
        PageSize: 10
    };

    const currentLiveUpdateID = parseInt(process.env.NEXT_PUBLIC_CURRENTLIVEUPDATEID ?? "0")
    
    const [cardPredictions, setCardPredictions] = React.useState([] as CardPrediction[])
    const [selectedTeam,setSelectedTeam] = React.useState({label:'', value:''} as SelectOption);
    const [cardPage, setCardPage] = React.useState(cardPagination);

    const appData = {
        cardPredictions,
        setCardPredictions,
        selectedTeam,
        setSelectedTeam,
        cardPage,
        setCardPage,
        currentLiveUpdateID,
    } as AppData

    return <AppContext.Provider value={appData}>{children}</AppContext.Provider>
}