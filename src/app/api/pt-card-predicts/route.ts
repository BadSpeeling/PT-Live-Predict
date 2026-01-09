import { GetPtCardPredictsRequest } from '../../../types'
import { getPtPredictPlayers } from "../../service/pt-predict-players"
import { writeErrorLog } from '../../service/base'
import { isRequestToLocalhost } from '../../../lib/utils'

export async function POST(request: Request) {

    const requestParameters = (await request.json()) as GetPtCardPredictsRequest

    try {

        const result = await getPtPredictPlayers(requestParameters, isRequestToLocalhost(request));

        return new Response(JSON.stringify(result), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    }
    catch (err) {
        writeErrorLog(err, "GetPtCards", requestParameters, isRequestToLocalhost(request));
        return new Response(JSON.stringify({"message": "An error occured"}), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }

}