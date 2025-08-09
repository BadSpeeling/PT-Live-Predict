import { GetPtCardPredictsRequest } from '../../../types'
import { getUserPredicts } from "../../service/user-predicts"

export async function POST(request: Request) {
    
    const requestParameters = (await request.json()) as GetPtCardPredictsRequest
    const result = await getUserPredicts(requestParameters);

    return new Response(JSON.stringify(result), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
    
}