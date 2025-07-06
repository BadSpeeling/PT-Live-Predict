import React, { useState, useEffect } from 'react';
import { AppContext } from "./AppContext";
import { googleLogout, useGoogleLogin, TokenResponse, CredentialResponse } from '@react-oauth/google';
import { getCookie, setCookie } from './cookies'
import { GetAccountResponse } from '../types'

export const Account = () => {
    
    const context = React.useContext(AppContext)
    

    useEffect(() => {
        const cookieSessionID = getCookie('sessionID');
    
        const options = {
            method: "POST",
            headers: {
                'Content-Type':"application/json"
            },
            body: JSON.stringify({
                sessionID: cookieSessionID,
            })
        }

        new Promise(async (resolve: (value: GetAccountResponse) => void,reject) => {

            const accountResponse = await fetch('/api/account', options);
            const accountBody = await accountResponse.json() as GetAccountResponse;
            resolve(accountBody);

        })
        .then((res) => {
            context.setActiveUser({"DisplayName":res.DisplayName,SessionID:cookieSessionID});
        })

    }, [])

    const googleLogin = useGoogleLogin({
        flow: 'auth-code',
        onSuccess: async (codeResponse) => {
            console.log(codeResponse);
            const options = {
                method: "POST",
                headers: {
                    'Content-Type':"application/json"
                },
                body: JSON.stringify({
                    code: codeResponse.code,
                })
            }
            const authResponse = await fetch('/api/auth', options);
            const session = await authResponse.json() as GetAccountResponse;

            setCookie('sessionID', session.SessionID, 30);
            context.setActiveUser({"DisplayName":session.DisplayName,SessionID:session.SessionID});
        },
        onError: errorResponse => console.log(errorResponse),
    });

    // log out function to log the user out of google and set the profile array to null
    const logOut = () => {
        googleLogout();
    };    

    return (
        <div>
            <h2>React Google Login</h2>
            <br />
            <br />
            {context.activeUser ? (
                <div>
                    Current User: {context.activeUser.DisplayName}
                </div>
            ) : (
                <button onClick={googleLogin}>Sign in with Google 🚀 </button>
            )}
        </div>
    );
}
export default Account;