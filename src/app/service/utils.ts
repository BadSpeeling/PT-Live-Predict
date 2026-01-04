import { PostErrorLogRequest } from '../../types'

export function extractPositionFromCardTitle (cardTitle: string) {
    return cardTitle.match(/MLB\s\d{4}\sLive\s(\w{2}).*/)?.at(1) ?? "";
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