import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin, TokenResponse } from '@react-oauth/google';

export const Account = () => {
    const [ user, setUser ] = useState(null as TokenResponse | "error" | "error_description" | "error_uri" | null);
    const [ googleProfile, setGoogleProfile ] = useState(null);
    const [ ptPredictProfile, setPtPredictProfile ] = useState(null);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(
        () => {
            if (user != null && typeof user === 'object') {
                
                fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        return res.json();
                    })
                    .then((res) => {
                        setGoogleProfile(res);

                        if (res) {
                            return new Promise((resolve,reject) => {
                                fetch('/api/profile',{
                                    method:"POST",
                                    headers: {
                                        "Content-Type": "application/json"
                                    }
                                })
                            })
                        }
                        else {
                            throw Error('Google login failed');
                        }

                    })
                    .then((res) => {
                        //setPtPredictProfile(res);
                    })
                    .catch((err) => console.log(err));
            }
        },
        [ user ]
    );

    // log out function to log the user out of google and set the profile array to null
    const logOut = () => {
        googleLogout();
        setGoogleProfile(null);
    };

    return (
        <div>
            <h2>React Google Login</h2>
            <br />
            <br />
            {/* {googleProfile ? (
                <div>
                    <img src={googleProfile.picture} alt="user image" />
                    <h3>User Logged in</h3>
                    <p>Name: {googleProfile.name}</p>
                    <p>Email Address: {googleProfile.email}</p>
                    <br />
                    <br />
                    <button onClick={logOut}>Log out</button>
                </div>
            ) : (
                <button onClick={login}>Sign in with Google 🚀 </button>
            )} */}
        </div>
    );
}
export default Account;