'use client'

import * as React from "react";
import {
    ptPredictingSignupWithEmailAndPassword,
    ptPredictingSignInWithEmailAndPassword,
} from "../lib/firebase/auth.js";

type Account = {
    email: string,
    password: string,
}

export function AccountCreation() {

    const initAccount: () => Account = () => {
        return {
            email: "",
            password: "",
        } as Account
    }

    const [displayIndex, setDisplayIndex] = React.useState(0);
    const [newAccount, setNewAccount] = React.useState(initAccount());
    const [existingAccount, setExistingAccount] = React.useState(initAccount());

    return (
        <>
            { displayIndex === 0 && <div className="flex justify-center">
                <div>
                    <div>Sign-in</div>
                    <div className="my-1 ">
                        <div className="text-left inline-block w-[100px] mr-1">Email:</div><input value={existingAccount.email} type="email" onChange={e => setExistingAccount({email: e.target.value, password: existingAccount.password})} className="p-1 border rounded"/>
                    </div>
                    <div className="my-1">
                        <div className="text-left inline-block w-[100px] mr-1">Password:</div><input value={existingAccount.password} type="password" onChange={e => setExistingAccount({email: existingAccount.email, password: e.target.value})} className="p-1 border rounded"/>
                    </div>
                    <div className="my-1 text-left ">
                        <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 cursor-pointer" onClick={() => ptPredictingSignInWithEmailAndPassword(existingAccount.email, existingAccount.password)}>Submit</button>
                        <span onClick={_ => setDisplayIndex((displayIndex + 1) % 2)}>Or, create a new account</span>                    
                    </div>              
                </div>
            </div> }
            { displayIndex === 1 && <div className="flex justify-center">
                <div>
                    <div>Create account</div>                
                    <div className="my-1 ">
                        <div className="text-left inline-block w-[100px] mr-1">Email:</div><input value={newAccount.email} type="email" onChange={e => setNewAccount({email: e.target.value, password: newAccount.password})} className="p-1 border rounded"/>
                    </div>
                    <div className="my-1">
                        <div className="text-left inline-block w-[100px] mr-1">Password:</div><input value={newAccount.password} type="password" onChange={e => setNewAccount({email: newAccount.email, password: e.target.value})} className="p-1 border rounded"/>
                    </div>
                    <div className="my-1 text-left ">
                        <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 cursor-pointer" onClick={() => ptPredictingSignupWithEmailAndPassword(newAccount.email, newAccount.password)}>Submit</button>
                        <span onClick={_ => setDisplayIndex((displayIndex + 1) % 2)}>Or, signin with an existing account</span>                    
                    </div>
                </div>
            </div> }
        </>
    );
}
