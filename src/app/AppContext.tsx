'use client'

import * as React from 'react'
import { AppData, PtCardPredict } from '../types'
import {Option} from 'react-multi-select-component'

const appData = {
    ptCardsPredicts: [] as PtCardPredict[],
    setPtCardsPredicts: (_: PtCardPredict[]) => {},
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

    const [ptCardsPredicts, setPtCardsPredicts] = React.useState([] as PtCardPredict[])
    const [selectedTier,setSelectedTier] = React.useState([] as Option[]);
    const [selectedTeam,setSelectedTeam] = React.useState([] as Option[]);
    const [selectedDivision,setSelectedDivision] = React.useState([] as Option[]);
    const [selectedLeague,setSelectedLeague] = React.useState([] as Option[]);

    const appData = {
        ptCardsPredicts,
        setPtCardsPredicts,
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