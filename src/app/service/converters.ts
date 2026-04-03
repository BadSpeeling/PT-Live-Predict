import { GetPtCardPredictsRequest, GetPtCardResultingTierRequest, PostPtPredictRequest } from '../../types/index'
import { GetPtCardRequest, PostPtPredictRequest as FirebasePostPtPredictRequest } from '../../types/firebase'

export const PtCardPredictsToPtCardRequest = (request: GetPtCardPredictsRequest) => {
    return {
        ...request
    } as GetPtCardRequest;
}

export const PtCardResultingTierToPtCardRequest = (request: GetPtCardResultingTierRequest) => {
    return {
        ...request
    } as GetPtCardRequest;
}

export const PtPredictRequestToFirebase = (request: PostPtPredictRequest) => {
    return {
        ...request
    } as FirebasePostPtPredictRequest;
}