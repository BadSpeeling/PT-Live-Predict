"use client";
import React, { useEffect } from "react";
import {
  signOut,
  onIdTokenChanged,
} from "../lib/firebase/auth.js";
import { setCookie, deleteCookie } from "cookies-next";

function useUserSession(initialUser: any) {
  useEffect(() => {
    return onIdTokenChanged(async (user: any) => {
      if (user) {
        const idToken = await user.getIdToken();
        await setCookie("__session", idToken);
      } else {
        await deleteCookie("__session");
      }
      if (initialUser?.uid === user?.uid) {
        return;
      }
      window.location.reload();
    });
  }, [initialUser]);

  return initialUser;
}

export function PtAccountNode({ initialUser }: any) {
  const user = useUserSession(initialUser);

  const handleSignOut = (event: any) => {
    event.preventDefault();
    signOut();
  };

  return (
    <>
      {user && (
        <div className="inline-block p-2 ml-2 mt-2 bg-white bord rounded">
          <div className="profile">
            <div className="menu">
              <ul>
                <li>Currently signed in as: </li>
                <li><small>{user.email}</small></li>
                <li>
                  <a className="mt-2 inline-block" href="#" onClick={handleSignOut}>
                    <span className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 cursor-pointer">Sign Out</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
