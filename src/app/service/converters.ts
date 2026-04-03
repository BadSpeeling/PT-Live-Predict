import { GetPtCardPredictsRequest, GetPtCardResultingTierRequest, Position, PostPtPredictRequest } from '../../types/index'
import { GetPtCardRequest, PostPtPredictRequest as FirebasePostPtPredictRequest, PostErrorLogRequest } from '../../types/firebase'
import { PtCard } from '@/types/data';
import { PtCardPrediction, PtCardResultingTier } from '@/types/component';
import { extractPositionFromCardTitle } from './utils';

export const ptCardPredictsToPtCardRequest = (request: GetPtCardPredictsRequest) => {
    return {
        ...request
    } as GetPtCardRequest;
}

export const ptCardResultingTierToPtCardRequest = (request: GetPtCardResultingTierRequest) => {
    return {
        ...request
    } as GetPtCardRequest;
}

export const ptPredictRequestToFirebase = (request: PostPtPredictRequest) => {
    return {
        ...request
    } as FirebasePostPtPredictRequest;
}

export const mapPtCards = (ptCards: PtCard[], userID: string) => {
    return ptCards.map(r => mapPtCard(r, userID));
}

const mapPtCard = (ptCard: PtCard, userID: string) => {
    
    const position = getPosition(ptCard);

    return {
        PtCardID: ptCard.PtCardID,
        CardID: ptCard.CardID,
        LiveUpdateID: ptCard.LiveUpdateID,
        CardTitle: `${position} ${ptCard.FirstName} ${ptCard.LastName} ${ptCard.Franchise}`,
        CardValue: ptCard.CardValue,
        Position: ptCard.Position,
        PredictedTier: ptCard.PtPredicts ? filterForUser(ptCard.PtPredicts, userID) : undefined,
    } as PtCardPrediction    

}

export const mapPtCardsResultingTier = (ptCards: PtCard[], userID: string) => {
    return ptCards.map(r => mapPtCardResultingTier(r, userID));
}

const mapPtCardResultingTier = (ptCard: PtCard, userID: string) => {
    
    const position = getPosition(ptCard);

    const getPredictedTiers = () => {
        if (ptCard.PtPredicts) {
            return Object.values(ptCard.PtPredicts);
        }
        else {
            return [] as number[];
        }
    }

    return {
        PtCardID: ptCard.PtCardID,
        CardID: ptCard.CardID,
        LiveUpdateID: ptCard.LiveUpdateID,
        CardTitle: `${position} ${ptCard.FirstName} ${ptCard.LastName} ${ptCard.Franchise}`,
        CardValue: ptCard.CardValue,
        Position: ptCard.Position,
        PredictedTiers: getPredictedTiers(),
        ResultingTier: ptCard.ResultingTier,
        ResultingCardValue: ptCard.ResultingCardValue,
        PreviousTier: ptCard.tier,
    } as PtCardResultingTier    
}

const getPosition = (ptCard: PtCard) => {
    if (ptCard.Position === 1) {        
        return extractPositionFromCardTitle(ptCard.CardTitle)
    }
    else {
        return Position[ptCard.Position];
    }
}

const filterForUser = (ptPredicts: {[key: string]: number}, userID: string) => {
    
    if (typeof ptPredicts[userID] !== 'undefined') {
        return ptPredicts[userID];
    }
    else {
        return undefined;
    }

}

export function getError (error: unknown, errorType: string, errorRequestBody: string): PostErrorLogRequest {

    if (error instanceof Error) {
        return {
            ErrorType: errorType,
            ErrorMsg: error.message,
            ErrorStack: error.stack ?? "No error stack",
            ErrorRequestBody: errorRequestBody,
        }        
    }
    else {
        return {
            ErrorType: errorType,
            ErrorMsg: "No error message",
            ErrorStack: "No error stack",
            ErrorRequestBody: errorRequestBody,
        }
    }

}

export function getErrorMessage (error: unknown) {
    if (error instanceof Error) {
        return error.message;    
    }
    else {
        return "No error message";
    }
}