'use client'

import * as React from 'react'
import { AppData, CallServer, GridMode, PageState, CardPagination, SelectOption, PtCardFilters, PtPlayerName, LoadedData } from '../types'
import { PtCardPrediction, PtCardResultingTier } from '../types/component'

const appData = {
    ptCardsPrediction: null,
    setPtCardsPrediction: (_: LoadedData<PtCardPrediction>) => {},
    ptCardsResultingTier: null,
    setPtCardsResultingTier: (_: LoadedData<PtCardResultingTier>) => {},
    ptCardFilters: {
        selectedTeam: {label:'', value:''} as SelectOption,
        selectedTier: {label:'', value:''} as SelectOption,
        enteredName: {FirstName: '', LastName: ''} as PtPlayerName,
        selectedLiveUpdate: {label:'', value:''} as SelectOption,
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
        selectedLiveUpdate: {label:'',value:''} as SelectOption,
    } as PtCardFilters

    const [ptCardsPrediction, setPtCardsPrediction] = React.useState(null as LoadedData<PtCardPrediction>|null);
    const [ptCardsResultingTier, setPtCardsResultingTier] = React.useState(null as LoadedData<PtCardResultingTier>|null);

    const [ptCardFilters,setPtCardFilters] = React.useState(selectedPtCardFilters);
    const [cardPage, setCardPage] = React.useState(cardPagination);
    const [isLoading, setIsLoading] = React.useState(false);
    const [pageState, setPageState] = React.useState({ CallServer: CallServer.None, GridMode: GridMode.PtCard});

    const appData = {
        ptCardsPrediction,
        setPtCardsPrediction,
        ptCardsResultingTier,
        setPtCardsResultingTier,
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