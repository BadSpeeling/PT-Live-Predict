'use client'

import * as React from 'react'
import { AppData, PtCard, PtCardPredict, GetPtCardPredictsRequest, GetPtCardPredictsResponse, ActiveUser } from '../types'
import { ptCardsData, liveUpdate } from './data'
import {Option} from 'react-multi-select-component'

const appData = {
    activeUser: null,
    setActiveUser: (val: null | ActiveUser) => {},
    ptCardsPredicts: [] as PtCardPredict[],
    setPtCardsPredicts: (val: PtCardPredict[]) => {},
    selectedTier: [] as Option[],
    setSelectedTier: (opt: Option[]) => {},
    selectedTeam: [] as Option[],
    setSelectedTeam: (opt: Option[]) => {},
    selectedDivision: [] as Option[],
    setSelectedDivision: (opt: Option[]) => {},
    selectedLeague: [] as Option[],
    setSelectedLeague: (opt: Option[]) => {},
} as AppData

export const AppContext = React.createContext(appData);

export default function AppProvider({
    children
}: {
    children: React.ReactNode
}) {

    const [activeUser, setActiveUser] = React.useState(null as null | ActiveUser)
    const [ptCardsPredicts, setPtCardsPredicts] = React.useState([] as PtCardPredict[])
    const [selectedTier,setSelectedTier] = React.useState([] as Option[]);
    const [selectedTeam,setSelectedTeam] = React.useState([] as Option[]);
    const [selectedDivision,setSelectedDivision] = React.useState([] as Option[]);
    const [selectedLeague,setSelectedLeague] = React.useState([] as Option[]);

    const appData = {
        activeUser,
        setActiveUser,
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