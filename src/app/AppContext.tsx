'use client'

import * as React from 'react'
import { AppData, CallServer, CardPagination, SelectOption, PtCardFilters } from '../types'
import { PtCard } from '../types/component'

const appData = {
    ptCards: [] as PtCard[],
    setPtCards: (_: PtCard[]) => {},
    ptCardCount: 0 as number,
    setPtCardCount: (_: number) => {},
    ptCardFilters: {
        selectedTeam: {label:'', value:''} as SelectOption,
        selectedTier: {label:'', value:''} as SelectOption,
    },
    setPtCardFilters: (_: PtCardFilters) => {},
    cardPage: {
        CurrentPage: 1,
        PageSize: 10
    },
    setCardPage: (cardPage: CardPagination) => {},
    currentLiveUpdateID: 1,
    isLoading: false,
    setIsLoading: (isLoading: boolean) => {},
    callServer: CallServer.None,
    setCallServer: (callServer: CallServer) => {},
} as AppData

export const AppContext = React.createContext(appData);

export default function AppProvider({
    children
}: {
    children: React.ReactNode
}) {

    const cardPagination: CardPagination = {
        CurrentPage: 1,
        PageSize: 10,
        NavigationDirection: null, 
    };

    const currentLiveUpdateID = parseInt(process.env.NEXT_PUBLIC_CURRENTLIVEUPDATEID ?? "0")
    
    const selectedPtCardFilters = {
        selectedTeam: {label:'', value:''} as SelectOption,
        selectedTier: {label:'', value:''} as SelectOption,
    } as PtCardFilters

    const [ptCards, setPtCards] = React.useState([] as PtCard[])
    const [ptCardCount, setPtCardCount] = React.useState(0)
    const [ptCardFilters,setPtCardFilters] = React.useState(selectedPtCardFilters);
    const [cardPage, setCardPage] = React.useState(cardPagination);
    const [isLoading, setIsLoading] = React.useState(false);
    const [callServer, setCallServer] = React.useState(CallServer.None);

    const appData = {
        ptCards,
        setPtCards,
        ptCardCount,
        setPtCardCount,
        ptCardFilters,
        setPtCardFilters,
        cardPage,
        setCardPage,
        isLoading,
        setIsLoading,
        currentLiveUpdateID,
        callServer,
        setCallServer,
    } as AppData

    return <AppContext.Provider value={appData}>{children}</AppContext.Provider>
}