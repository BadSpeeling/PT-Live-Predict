'use client'

import * as React from "react";
import {
    signInWithGoogle,
    ptPredictingSignupWithEmailAndPassword,
    ptPredictingSigninWithEmailAndPassword,
    ptPredictingPasswordReset
} from "../lib/firebase/auth.js";

export function PtAccountSignIn() {

    const updateAccountDisplay = () => {
        setDisplayIndex((displayIndex + 1) % 2);
        setEmail('');
        setPassword('');
    }

    const onSubmit = () => {
        if (displayIndex === 0) {
            ptPredictingSigninWithEmailAndPassword(email, password);
        }
        else if (displayIndex === 1) {
            ptPredictingSignupWithEmailAndPassword(email, password);
        }
    }

    const handleGoogleSignIn = (event: any) => {
        event.preventDefault();
        signInWithGoogle();
    };

    const [displayIndex, setDisplayIndex] = React.useState(0);
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const toggleText = displayIndex === 0 ? "create a new account" : "signin with an existing account";
    const headerText = displayIndex === 0 ? "signin" : "create account";

    return (
        <div>
            <div className="flex justify-center mt-4">
                <a href="#" onClick={handleGoogleSignIn}>
                    <div className="flex items-center"><div className="mr-1"><img src="/Google__G__logo.svg" alt="A placeholder user image" /></div><div className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 cursor-pointer">Sign In with Google</div></div>
                </a>
            </div>
            <div className="flex justify-center mt-4">
                <div className="text-left">                    
                    <div className="text-center">Alternatively, {headerText} using an email and password</div>
                    <div className="my-1 ">
                        <label htmlFor="username" className="inline-block w-[100px] mr-1">Email:</label><input value={email} type="text" name="username" onChange={e => setEmail(e.target.value)} className="p-1 border rounded"/>
                    </div>
                    <div className="my-1">
                        <label htmlFor="password" className="inline-block w-[100px] mr-1">Password:</label><input value={password} type="password" name="password" onChange={e => setPassword(e.target.value)} className="p-1 border rounded"/>
                    </div>
                    <div className="my-1">
                        <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 cursor-pointer" onClick={onSubmit}>Submit</button>
                    </div>
                    {/* <div onClick={_ => ptPredictingPasswordReset(email)}>
                        Forgot your password?
                    </div> */}
                    <div>
                        <span className="text-blue-600 underline cursor-pointer hover:text-blue-800 active:text-blue-900 transition-colors" onClick={updateAccountDisplay}>Or, {toggleText}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

