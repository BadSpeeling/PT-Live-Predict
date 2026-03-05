'use client'

import * as React from 'react'
import { AppData, CallServer, GridMode, PageState, CardPagination, SelectOption, PtCardFilters, PtPlayerName } from '../types'
import { PtCard } from '../types/component'

const appData = {
    ptCards: [] as PtCard[],
    setPtCards: (_: PtCard[]) => {},
    ptCardCount: 0 as number,
    setPtCardCount: (_: number) => {},
    ptCardFilters: {
        selectedTeam: {label:'', value:''} as SelectOption,
        selectedTier: {label:'', value:''} as SelectOption,
        enteredName: {FirstName: '', LastName: ''} as PtPlayerName,
    },
    setPtCardFilters: (_: PtCardFilters) => {},
    cardPage: {
        CurrentPage: 1,
        PageSize: 10,
        NavigationDirection: null,
    },
    setCardPage: (cardPage: CardPagination) => {},
    currentLiveUpdateID: 1,
    isLoading: false,
    setIsLoading: (isLoading: boolean) => {},
    pageState: { CallServer: CallServer.None, GridMode: GridMode.PtCard},
    setPageState: (pageState: PageState) => {},
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
        enteredName: {FirstName: '', LastName: ''} as PtPlayerName,
    } as PtCardFilters

    const [ptCards, setPtCards] = React.useState([] as PtCard[])
    const [ptCardCount, setPtCardCount] = React.useState(0)
    const [ptCardFilters,setPtCardFilters] = React.useState(selectedPtCardFilters);
    const [cardPage, setCardPage] = React.useState(cardPagination);
    const [isLoading, setIsLoading] = React.useState(false);
    const [pageState, setPageState] = React.useState({ CallServer: CallServer.None, GridMode: GridMode.PtCard});

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
        pageState,
        setPageState,
    } as AppData

    return <AppContext.Provider value={appData}>{children}</AppContext.Provider>
}