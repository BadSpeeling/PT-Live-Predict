import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getAuthenticatedAppForUser } from '../lib/firebase/serverApp'
import { PtAccountNode } from './PtAccountNode';
import { headers } from 'next/headers';
import { PtAccountSignIn } from './PtAccountSignIn';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PT Live Predicting",
  description: "Predict Perfect Team Live Updates!",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const host = (await headers()).get('host');
  const isLocalhost = host?.startsWith('localhost') || host?.startsWith('127.0.0.1');

  const { currentUser } = await getAuthenticatedAppForUser(isLocalhost);
  const page = currentUser ? children : <NotSignedIn />

  return (
    <html className="h-auto bg-gray-500" lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="">
          <PtAccountNode initialUser={currentUser?.toJSON()} />
          <div className="page-wrapper rounded-md bg-white py-4 my-8 m-auto">            
            <div className="flex flex-col items-center"><div><img src="/logo-white.png" alt="Pt Live Predicting" width="400" height="200"/></div></div>
            { page }
          </div>  
        </div>
      </body>
    </html>
  );
}

function NotSignedIn () {
  return (
    <div className="mt-8 text-center">
      <div><span>You are not signed in.  Sign in below using a Google account or create an account using an email and password</span></div>
      <div className="mt-1"><span>NOTE: If you have trouble with signing in check if a popup blocker is preventing the sign-in popup</span></div>
      <PtAccountSignIn />
    </div>
  )
}
