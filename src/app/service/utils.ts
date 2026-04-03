export function extractPositionFromCardTitle (cardTitle: string) {
    return cardTitle.match(/MLB\s\d{4}\sLive\s(\w{2}).*/)?.at(1) ?? "";
}