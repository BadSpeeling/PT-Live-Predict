import { PtCard } from './component'

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
    'Iron',
    'Bronze',
    'Silver',
    'Gold',
    'Diamond',
    'Perfect'
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
    ptCards: PtCard[],
    setPtCards: React.Dispatch<React.SetStateAction<PtCard[]>>, 
    selectedTeam: SelectOption,
    setSelectedTeam: React.Dispatch<React.SetStateAction<SelectOption>>,
    cardPage: CardPagination,
    setCardPage: React.Dispatch<React.SetStateAction<CardPagination>>,
    isLoading: boolean,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>, 
    currentLiveUpdateID: number,
}

export interface LiveUpdate {
    LiveUpdateID: number,
    EffectiveDate: string,
}

export interface GetPtCardPredictsRequest {
    TeamFilter: string,
    CardPagination: CardPagination,
    LatestLiveUpdateID: number,
    NavigationDirection: null | "asc" | "desc",
    LastPtCardID: null | number,
}

export interface GetPtCardPredictsResponse {
    PtCards: PtCard[],
}

export interface CardPagination {
    CurrentPage: number,
    PageSize: number,
    NavigationDirection: "asc" | "desc" | null,
}

export interface PostPtPredictRequest {
    PtCardID: number,
    PredictedTier: Tier,
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

export interface PtPredict {
    PtPredictID: string,
    PtCardID: number,
    CardID: number,
    LiveUpdateID: number,
    PredictedTier: number,
    UserID: string,
}