export function isRequestToLocalhost (request: Request) {
    const host = request.headers.get('host');
    return (host ? (host.startsWith('localhost') || host === 'localhost') : false)
}

export function extractPositionFromCardTitle (cardTitle: string) {
    return cardTitle.match(/MLB\s\d{4}\sLive\s(\w{2}).*/)?.at(1) ?? "";
}