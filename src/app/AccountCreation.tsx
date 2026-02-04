'use client'

import * as React from "react";
import {
    createAccount
} from "../lib/firebase/auth.js";

export function AccountCreation() {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    return (
        <div className="flex justify-center">
            <div>
                <div className="my-1 ">
                    <div className="text-left inline-block w-[100px] mr-1">Email:</div><input value={email} type="email" onChange={e => setEmail(e.currentTarget.value)} className="p-1 border rounded"/>
                </div>
                <div className="my-1">
                    <div className="text-left inline-block w-[100px] mr-1">Password:</div><input value={password} type="password" onChange={e => setPassword(e.currentTarget.value)} className="p-1 border rounded"/>
                </div>
                <div className="my-1 text-left ">
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 cursor-pointer" onClick={() => createAccount(email, password)}>Submit</button>
                </div>
            </div>
        </div>
    );
}
