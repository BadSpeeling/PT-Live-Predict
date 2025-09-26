'use client'

import * as React from 'react'
import { AppData, CardPrediction } from '../types'
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
} as AppData

export const AppContext = React.createContext(appData);

export default function AppProvider({
    children
}: {
    children: React.ReactNode
}) {

    const [cardPredictions, setCardPredictions] = React.useState([] as CardPrediction[])
    const [selectedTier,setSelectedTier] = React.useState([] as Option[]);
    const [selectedTeam,setSelectedTeam] = React.useState([] as Option[]);
    const [selectedDivision,setSelectedDivision] = React.useState([] as Option[]);
    const [selectedLeague,setSelectedLeague] = React.useState([] as Option[]);

    const appData = {
        cardPredictions: cardPredictions,
        setCardPredictions: setCardPredictions,
        selectedTier,
        setSelectedTier,
        selectedTeam,
        setSelectedTeam,
        selectedDivision,
        setSelectedDivision,
        selectedLeague,
        setSelectedLeague,
    } as AppData

    return <AppContext.Provider value={appData}>{children}</AppContext.Provider>
}