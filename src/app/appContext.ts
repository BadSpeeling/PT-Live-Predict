import * as React from 'react'
import { AppData, PtCard, PtCardPredict, GetPtCardPredictsRequest, GetPtCardPredictsResponse } from '../types'
import { ptCardsData, liveUpdate } from './data'
import {Option} from 'react-multi-select-component'

const options = {
    method: "POST",
    headers: {
        'Content-Type':"application/json"
    },
    body: JSON.stringify({})
}

let ptCardPredicts = [] as PtCardPredict[]
const getPtCardPredictsResponseRaw = await fetch('/api/pt-card-predicts', options)

if (getPtCardPredictsResponseRaw.status === 200) {
    const getPtCardPredictsResponse = (await getPtCardPredictsResponseRaw.json()) as GetPtCardPredictsResponse
    ptCardPredicts = getPtCardPredictsResponse.UserCardPredicts;
}

const appData = {
    PtCards: ptCardPredicts,
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