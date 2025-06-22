'use client'

import Image from "next/image";
import * as React from "react";
import { AppContext } from "./AppContext";
import { PtCard } from "./PtCard";
import { Account } from './Account';
import { PtCardListFilter } from "./PtCardListFilter"
import { Option } from 'react-multi-select-component'
import { Tier, PtCardPredict, GetPtCardPredictsResponse } from '../types'

import ReactDOM from 'react-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';

export default function Home() {

  const context = React.useContext(AppContext)
  const cards = context.ptCardsPredict;

  const cardsBody = cards.map((card, index) => {
    return (
      <PtCard card={card} key={index} index={index} /> 
    );
  });

  const responseMessage = (response: any) => {
      console.log(response);
  };
  const errorMessage = (error: any) => {
      console.log(error);
  };

  React.useEffect(() => {
    handleCardLoad();
  }, [])

  const handleCardLoad = async () => {
    const options = {
      method: "POST",
      headers: {
          'Content-Type':"application/json"
      },
      body: JSON.stringify({})
    }
    const getPtCardPredictsResponseRaw = await fetch('/api/pt-card-predicts', options)
    
    if (getPtCardPredictsResponseRaw.status === 200) {
        const getPtCardPredictsResponse = (await getPtCardPredictsResponseRaw.json()) as GetPtCardPredictsResponse
        context.setPtCardsPredict(getPtCardPredictsResponse.UserCardPredicts);
    }
  }

  return (
    <GoogleOAuthProvider clientId="492138648450-a7vb6fufea0klv3cp08ihak29e4pp49r.apps.googleusercontent.com">
      <Account />
      
        <div className="rounded-md bg-white px-20 py-4 my-8 w-4/5 m-auto">
          <div className="font-serif">PT Live Predicting</div>
          <div>
            <PtCardListFilter />
          </div>
          <div>
            {cardsBody}
          </div>
        </div>
      
    </GoogleOAuthProvider>
  );
}
