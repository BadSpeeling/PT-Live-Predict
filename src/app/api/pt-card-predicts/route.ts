import { GetPtCardPredictsRequest } from '../../../types'
import { getPtPredictPlayers } from "../../service/pt-predict-players"
import { isRequestToLocalhost } from '../../../lib/utils'

export async function POST(request: Request) {
    
    try {

        const requestParameters = (await request.json()) as GetPtCardPredictsRequest
        const result = await getPtPredictPlayers(requestParameters, isRequestToLocalhost(request));

        return new Response(JSON.stringify(result), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    }
    catch (err) {
        console.log(err);
        return new Response(JSON.stringify({"message": "An error occured"}), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }

}