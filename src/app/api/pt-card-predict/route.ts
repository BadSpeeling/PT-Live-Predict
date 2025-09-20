import { PostPtCardPredictRequest } from '../../../types'
import { postUserPredict } from "../../service/pt-predict-players"

export async function POST(request: Request) {

    const requestParameters = (await request.json()) as PostPtCardPredictRequest
    const result = await postUserPredict(requestParameters);

    return new Response(JSON.stringify(result), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });

}