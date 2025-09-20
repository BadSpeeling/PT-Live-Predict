export function isRequestToLocalhost (request: Request) {
    const host = request.headers.get('host');
    return (host ? (host.startsWith('localhost') || host === 'localhost') : false)
}