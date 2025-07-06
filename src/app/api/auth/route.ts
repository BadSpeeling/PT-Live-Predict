import { OAuth2Client } from 'google-auth-library'
import { getAccount, createAccount } from '../../service/account'
import { createSession } from '../../service/session';
import { GetAccountResponse } from '../../../types';

const oAuth2Client = new OAuth2Client(
  process.env.NEXT_PUBLIC_CLIENTID,
  process.env.CLIENTSECRET,
  'postmessage',
);

export async function POST (request: Request) {

    const requestBody = await request.json()
    const { tokens } = await oAuth2Client.getToken(requestBody.code); // exchange code for tokens

    if (tokens.id_token) {

        const ticket = await oAuth2Client.verifyIdToken({
            idToken: tokens.id_token,
            audience: process.env.NEXT_PUBLIC_CLIENTID,  // Specify the WEB_CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[WEB_CLIENT_ID_1, WEB_CLIENT_ID_2, WEB_CLIENT_ID_3]
        });
        const payload = ticket.getPayload();

        if (payload) {
            const userid = payload['sub'];
            // If the request specified a Google Workspace domain:
            // const domain = payload['hd'];

            let account = await getAccount(userid);

            if (!account) {
                account = await createAccount(userid);                
            }

            const sessionID = crypto.randomUUID()
            await createSession(sessionID, account.AccountID);

            return new Response(
                JSON.stringify({DisplayName: account.DisplayName, SessionID: sessionID} as GetAccountResponse),
                {
                    headers: { 'Content-Type': 'application/json' },
                },
            );

        }
    }
    
}
