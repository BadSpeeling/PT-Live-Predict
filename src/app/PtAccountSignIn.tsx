'use client'

import * as React from "react";
import {
    signInWithGoogle,
    ptPredictingSignupWithEmailAndPassword,
    ptPredictingSigninWithEmailAndPassword,
    ptPredictingPasswordReset
} from "../lib/firebase/auth.js";

enum ComponentState {
    SIGNIN,SIGNUP,RESET_PASSWORD
}

export function PtAccountSignIn() {

    const toggleComponentState = () => {
        
        setSigninStatus("");
        setIsErrorFlag(false);

        if (componentState === ComponentState.SIGNIN) {
            setComponentState(ComponentState.SIGNUP);
        }
        else if (componentState === ComponentState.SIGNUP) {
            setComponentState(ComponentState.SIGNIN);
        }
        else if (componentState === ComponentState.RESET_PASSWORD) {
            setComponentState(ComponentState.SIGNIN);
        }

    }

    const onSubmit = () => {
        if (componentState === ComponentState.SIGNIN) {
            ptPredictingSigninWithEmailAndPassword(email, password)
                .catch(err => {
                    setIsErrorFlag(true);                    
                    if (err.message.includes("auth/invalid-credential")) {
                        setSigninStatus("The provided email/password was incorrect");
                    }
                    else {
                        setSigninStatus("There was an issue signing in");
                    }
                });
        }
        else if (componentState === ComponentState.SIGNUP) {
            ptPredictingSignupWithEmailAndPassword(email, password)
                .catch(_ => {
                    setIsErrorFlag(true);
                    setSigninStatus("There was an issue creating an account");
                });
        }
        else if (componentState === ComponentState.RESET_PASSWORD) {
            setIsLoading(true);
            ptPredictingPasswordReset(email)
                .then(_ => {
                    setIsErrorFlag(false);
                    setSigninStatus(`Password reset email sent to ${email}, if you do not see an email check your spam folder`);
                })
                .catch(_ => {
                    setIsErrorFlag(true);
                    setSigninStatus("There was an issue sending the password reset email")
                })
                .finally(() => {
                    setIsLoading(false);
                })
        }
    }

    const onPasswordResetClick = () => {
        setComponentState(ComponentState.RESET_PASSWORD);
    }

    const getToggleText = () => {
        switch (componentState) {
            case ComponentState.SIGNIN:
                return "Create a new account";
            case ComponentState.SIGNUP:
                return "Sign in with an existing account";
            case ComponentState.RESET_PASSWORD:
                return "Return to sign in";                
            default:
                return "";
        }
    }

    const getHeaderText = () => {
        switch (componentState) {
            case ComponentState.SIGNIN:
                return "Alternatively, sign in using an email and password";
            case ComponentState.SIGNUP:
                return "Alternatively, sign up using an email and password";
            case ComponentState.RESET_PASSWORD:
                return "Provide the email you used to sign up to receive a password reset link";
            default:
                return "";
        }
    }

    const handleGoogleSignIn = (event: any) => {
        event.preventDefault();
        signInWithGoogle();
    };

    const [componentState, setComponentState] = React.useState(ComponentState.SIGNIN);
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [signinStatus, setSigninStatus] = React.useState("");
    const [isErrorFlag, setIsErrorFlag] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    const toggleText = getToggleText();
    const headerText = getHeaderText();

    return (
        <div>
            <div className="flex justify-center my-4">
                <a href="#" onClick={handleGoogleSignIn}>
                    <div className="flex items-center"><div className="mr-1"><img src="/Google__G__logo.svg" alt="A placeholder user image" /></div><div className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 cursor-pointer">Sign In with Google</div></div>
                </a>
            </div>
            <hr/>
            <div className="flex justify-center mt-4">
                {isLoading && <div className="fixed loader-wrapper"><div className="inline-block loader"></div></div>}
                <div className="text-left">                    
                    <div className="text-center"><span>{headerText}</span></div>
                    {signinStatus && <small className={(isErrorFlag ? "text-red-500" : "text-green-500") + " font-small"}>{signinStatus}</small>}
                    <div className="my-1 ">
                        <label htmlFor="username" className="inline-block w-[100px] mr-1">Email:</label><input value={email} type="text" name="username" onChange={e => setEmail(e.target.value)} className="p-1 border rounded"/>
                    </div>
                    {componentState !== ComponentState.RESET_PASSWORD && <div className="my-1">
                        <label htmlFor="password" className="inline-block w-[100px] mr-1">Password:</label><input value={password} type="password" name="password" onChange={e => setPassword(e.target.value)} className="p-1 border rounded"/>
                    </div>}
                    <div className="my-2 text-center">
                        <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 cursor-pointer" onClick={onSubmit}>Submit</button>
                    </div>
                    <div>
                        <span className="text-blue-600 underline cursor-pointer hover:text-blue-800 active:text-blue-900 transition-colors" onClick={toggleComponentState}>{toggleText}</span>
                    </div>
                    {componentState !== ComponentState.RESET_PASSWORD && <div>
                        <span className="text-blue-600 underline cursor-pointer hover:text-blue-800 active:text-blue-900 transition-colors" onClick={onPasswordResetClick}>Forgot your password?</span>
                    </div>}
                </div>
            </div>
        </div>
    );
}

