'use client'

import * as React from 'react'
import { AppData, CardPrediction, CardPagination } from '../types'
import {Option} from 'react-multi-select-component'

const appData = {
    cardPredictions: [] as CardPrediction[],
    setCardPredictions: (_: CardPrediction[]) => {},
    selectedTier: [] as Option[],
    setSelectedTier: (_: Option[]) => {},
    selectedTeam: [] as Option[],
    setSelectedTeam: (_: Option[]) => {},
    selectedDivision: [] as Option[],
    setSelectedDivision: (_: Option[]) => {},
    selectedLeague: [] as Option[],
    setSelectedLeague: (_: Option[]) => {},
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
    const [selectedTier,setSelectedTier] = React.useState([] as Option[]);
    const [selectedTeam,setSelectedTeam] = React.useState([] as Option[]);
    const [selectedDivision,setSelectedDivision] = React.useState([] as Option[]);
    const [selectedLeague,setSelectedLeague] = React.useState([] as Option[]);
    const [cardPage, setCardPage] = React.useState(cardPagination);

    const appData = {
        cardPredictions,
        setCardPredictions,
        selectedTier,
        setSelectedTier,
        selectedTeam,
        setSelectedTeam,
        selectedDivision,
        setSelectedDivision,
        selectedLeague,
        setSelectedLeague,
        cardPage,
        setCardPage,
        currentLiveUpdateID,
    } as AppData

    return <AppContext.Provider value={appData}>{children}</AppContext.Provider>
}