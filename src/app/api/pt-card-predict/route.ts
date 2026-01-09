import { PostPtPredictRequest } from '../../../types'
import { postUserPredict } from "../../service/pt-predict-players"
import { writeErrorLog } from '../../service/base'
import { isRequestToLocalhost } from '../../../lib/utils'

export async function POST(request: Request) {

    const requestParameters = (await request.json()) as PostPtPredictRequest

    try {
        
        await postUserPredict(requestParameters, isRequestToLocalhost(request));

        return new Response(null, {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    }
    catch (err) {
        writeErrorLog(err, "PostUserPredict", requestParameters, isRequestToLocalhost(request));
        return new Response(JSON.stringify({"message": "An error occured"}), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }


}