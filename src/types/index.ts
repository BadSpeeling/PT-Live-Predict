import {Option} from 'react-multi-select-component'

export interface PtCard {
    PtCardID: number,
    CardID: number,
    LiveUpdateID: number,
    CardTitle: string,
    CardValue: number,
    Position: Position,
    Team: string, 
    Tier: Tier,
}

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
    'Philadelphia Phillies',
    'Atlanta Braves',
    'Los Angeles Dodgers',
    'New York Yankees',
    'Cleveland Indians',
    'Seattle Mariners',
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

export interface AppData {
    activeUser: ActiveUser | null,
    setActiveUser: React.Dispatch<React.SetStateAction<ActiveUser>>, 
    ptCardsPredicts: PtCardPredict[],
    setPtCardsPredicts: React.Dispatch<React.SetStateAction<PtCardPredict[]>>, 
    selectedTier: Option[],
    setSelectedTier: React.Dispatch<React.SetStateAction<Option[]>>,
    selectedTeam: Option[],
    setSelectedTeam: React.Dispatch<React.SetStateAction<Option[]>>,
    selectedDivision: Option[],
    setSelectedDivision: React.Dispatch<React.SetStateAction<Option[]>>,
    selectedLeague: Option[],
    setSelectedLeague: React.Dispatch<React.SetStateAction<Option[]>>,
}

export interface LiveUpdate {
    LiveUpdateID: number,
    EffectiveDate: string,
}

export interface GetPtCardPredictsRequest {
    TierFilter: number[],
    TeamFilter: number[],
    DivisionFilter: number[],
    LeagueFilter: number[],
    OnlyRookiesFilter: boolean,
    OnlyLastYearsAllstars: boolean,
    OnlyLastYearsAwardWinners: boolean,
    SessionID: string,
    PageNumber: number,
    PageSize: number,
}

export interface GetPtCardPredictsResponse {
    UserCardPredicts: PtCardPredict[],
}

export interface GetPtCardPredictsQueryResult {
    PtCardPredictID: number,
    PtCardID: number,
    CardID: number,
    LiveUpdateID: number,
    CardTitle: string,
    CardValue: number,
    Position: Position,
    PredictedTier: number,
    UserID: number,
}

export interface PostPtCardPredictRequest {
    PtCardPredictID?: number,
    CardID: number,
    PtCardID: number,
    PredictedTier: Tier,
    SessionID: string
}

export interface PostPtCardPredictResponse {
    PtCardPredictID: number,
    PtCardID: number,
    CardID: number,
}

export interface PtCardPredict {
    CardID: number,
    UserPredicts: GetPtCardPredictsQueryResult[],
}

export interface Account {
    AccountID: number,
    AuthenticatedUserID: string,
    DisplayName: string,
}

export interface ActiveUser {
    DisplayName: string,
    SessionID: string,
}

export interface GetAccountResponse {
    DisplayName: string,
    SessionID: string,
}

export interface Session {
    SessionID: string,
}
