import { ptCardsData } from '../../data'

export async function GET(request: Request) {
    // For example, fetch data from your DB here
    return new Response(JSON.stringify(ptCardsData), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}