import { getAccountBySession } from '../../service/account'

export async function POST(request: Request) {

    const requestBody = await request.json();
    const account = await getAccountBySession(requestBody.sessionID)

    // For example, fetch data from your DB here
    return new Response(JSON.stringify({...account, "sessionID": requestBody.sessionID}), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}