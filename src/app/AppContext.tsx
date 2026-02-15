'use client'

import * as React from 'react'
import { AppData, CardPagination, SelectOption } from '../types'
import { PtCard } from '../types/component'

const appData = {
    ptCards: [] as PtCard[],
    setPtCards: (_: PtCard[]) => {},
    ptCardCount: 0 as number,
    setPtCardCount: (_: number) => {},
    selectedTeam: {label:'', value:''} as SelectOption,
    setSelectedTeam: (_: SelectOption) => {},
    cardPage: {
        CurrentPage: 1,
        PageSize: 10
    },
    setCardPage: (cardPage: CardPagination) => {},
    currentLiveUpdateID: 1,
    isLoading: false,
    setIsLoading: (isLoading: boolean) => {},
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
    
    const [ptCards, setPtCards] = React.useState([] as PtCard[])
    const [ptCardCount, setPtCardCount] = React.useState(0)
    const [selectedTeam,setSelectedTeam] = React.useState({label:'', value:''} as SelectOption);
    const [cardPage, setCardPage] = React.useState(cardPagination);
    const [isLoading, setIsLoading] = React.useState(false);

    const appData = {
        ptCards,
        setPtCards,
        ptCardCount,
        setPtCardCount,
        selectedTeam,
        setSelectedTeam,
        cardPage,
        setCardPage,
        isLoading,
        setIsLoading,
        currentLiveUpdateID,
    } as AppData

    return <AppContext.Provider value={appData}>{children}</AppContext.Provider>
}