import { PtCard, PtCardResultingTier } from './component'

export enum Position {
    'P' = 1,
    'C' = 2,
    '1B' = 3,
    '2B' = 4,
    '3B' = 5,
    'SS' = 6,
    'LF' = 7,
    'CF' = 8,
    'RF' = 9,
    'DH' = 10,
}

export enum Tier {
    'Iron' = 0,
    'Bronze' = 1,
    'Silver' = 2,
    'Gold' = 3,
    'Diamond' = 4,
    'Perfect' = 5
}

export enum Team {
    'Baltimore Orioles',
    'Boston Red Sox',
    'New York Yankees',
    'Tampa Bay Rays',
    'Toronto Blue Jays',
    'Chicago White Sox',
    'Cleveland Guardians',
    'Detroit Tigers',
    'Kansas City Royals',
    'Minnesota Twins',
    'Los Angeles Angels',
    'Athletics',
    'Seattle Mariners',
    'Texas Rangers',
    'Houston Astros',
    'Atlanta Braves',
    'Miami Marlins',
    'New York Mets',
    'Philadelphia Phillies',
    'Washington Nationals',
    'Chicago Cubs',
    'Cincinnati Reds',
    'Milwaukee Brewers',
    'Pittsburgh Pirates',
    'St. Louis Cardinals',
    'Arizona Diamondbacks',
    'Colorado Rockies',
    'Los Angeles Dodgers',
    'San Diego Padres',
    'San Francisco Giants',
}

export enum Division {
    'NL East',
    'NL Central',
    'NL West',
    'AL East',
    'AL Central',
    'AL West',
}

export enum League {
    'National League',
    'American League',
}

export enum PredictSearchType {
    "Tier",
    "Team",
    "Division",
    "League",
    "Rookies",
    "LastYearsAllstars",
    "LastYearsAwardWinners",
}

export interface SelectOption {
    label: string,
    value: string,
}

export interface AppData {
    loadedData: LoadedData,
    setLoadedData: React.Dispatch<React.SetStateAction<LoadedData>>, 
    ptCardFilters: PtCardFilters,
    setPtCardFilters: React.Dispatch<React.SetStateAction<PtCardFilters>>, 
    cardPage: CardPagination,
    setCardPage: React.Dispatch<React.SetStateAction<CardPagination>>,
    isLoading: boolean,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>, 
    currentLiveUpdateID: number,
    pageState: PageState,
    setPageState: React.Dispatch<React.SetStateAction<PageState>>,
}

export interface LoadedData {
    PtCards: PtCard[],
    PtCardCount: number,
    PtCardsResultingTier: PtCardResultingTier[],
    PtCardResultingTierCount: number,
}

export interface PtCardFilters {
    selectedTeam: SelectOption,
    selectedTier: SelectOption,
    enteredName: PtPlayerName,
}

export interface PtPlayerName {
    FirstName: string,
    LastName: string,
}

export enum CallServer {
    GetStandard,GetPaginated,None
}

export enum GridMode {
    PtCard,ResultingTier
}

export interface PageState {
    CallServer: CallServer,
    GridMode: GridMode,
}

export interface LiveUpdate {
    LiveUpdateID: number,
    EffectiveDate: string,
}

export interface GetPtCardPredictsRequest {
    TeamFilter: string,
    TierFilter: number,
    NameFilter: PtPlayerName,
    CardPagination: CardPagination,
    LiveUpdateID: number,
    NavigationDirection: null | "asc" | "desc",
    LastPtCardID: null | number,
    PageSize: number,
}

export interface GetPtCardPredictsResponse {
    PtCards: PtCard[],
    PtCardCount: number,
}

export interface GetPtCardResultingTierRequest {
    TeamFilter: string,
    TierFilter: number,
    NameFilter: PtPlayerName,
    CardPagination: CardPagination,
    LiveUpdateID: number,
    NavigationDirection: null | "asc" | "desc",
    LastPtCardID: null | number,
    PageSize: number,
}

export interface GetPtCardResultingTierResponse {
    PtCardsResultingTier: PtCardResultingTier[],
    PtCardCount: number,
}


export interface CardPagination {
    CurrentPage: number,
    PageSize: number,
    NavigationDirection: "asc" | "desc" | null,
}

export interface PostPtPredictRequest {
    PtCardID: number,
    PredictedTier: number,
}

export interface PostPtPredictResponse {
    RequestSucceeded: boolean,
}

export interface PostErrorLogRequest {
    ErrorType: string,
    ErrorMsg: string,
    ErrorStack: string,
    ErrorRequestBody: any,
}
