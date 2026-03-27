import { GetPtCardResultingTierRequest } from '../../../types'
import { getPtCardsResultingTier } from "../../service/pt-predict-players"
import { writeErrorLog } from '../../service/base'
import { isRequestToLocalhost } from '../../../lib/utils'

export async function POST(request: Request) {

    const requestParameters = (await request.json()) as GetPtCardResultingTierRequest

    try {

        const result = await getPtCardsResultingTier(requestParameters, isRequestToLocalhost(request));

        return new Response(JSON.stringify(result), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    }
    catch (err) {
        writeErrorLog(err, "GetPtCardsResultingTier", requestParameters, isRequestToLocalhost(request));
        return new Response(JSON.stringify({"message": "An error occured"}), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }

}