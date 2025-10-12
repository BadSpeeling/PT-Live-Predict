"use client";
import React, { useEffect } from "react";
import {
  signInWithGoogle,
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

export function SignIn({ initialUser }: any) {
  const user = useUserSession(initialUser);

  const handleSignOut = (event: any) => {
    event.preventDefault();
    signOut();
  };

  const handleSignIn = (event: any) => {
    event.preventDefault();
    signInWithGoogle();
  };

  return (
    <div className="inline-block p-2 ml-2 mt-2 bg-white bord rounded">
      {user ? (
        <>
          <div className="profile">
            <p>
              <img
                className="profileImage"
                src={user.photoURL || "/profile.svg"}
                alt={user.email}
              />
            </p>

            <div className="menu">
              <ul>
                <li><small>{user.email}</small></li>

                <li>
                  <a href="#" onClick={handleSignOut}>
                    <span className="border rounded p-1">Sign Out</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </>
      ) : (
        <div className="profile">
          <a href="#" onClick={handleSignIn}>
            <div className="inline-flex items-center"><div><img src="/Google__G__logo.svg" alt="A placeholder user image" /></div><div>Sign In with Google</div></div>
          </a>
        </div>
      )}
    </div>
  );
}
