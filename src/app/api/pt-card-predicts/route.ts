import { GetPtCardPredictsRequest, PostPtCardPredictRequest } from '../../../types'
import { getUserPredicts, postUserPredict } from "../../service/user-predicts"

export async function POST(request: Request) {
    
    const requestParameters = (await request.json()) as GetPtCardPredictsRequest
    const result = getUserPredicts(requestParameters);

    return new Response(JSON.stringify(result), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
    
}