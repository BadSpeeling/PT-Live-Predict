'use client'

import Image from "next/image";
import * as React from "react";
import { AppContext } from "./appContext";
import { PtCard } from "./PtCard";
import { Account } from './Account';
import { PtCardListFilter } from "./PtCardListFilter"
import { Option } from 'react-multi-select-component'
import { Tier } from '../types'

import ReactDOM from 'react-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';

export default function Home() {

  const context = React.useContext(AppContext)
  const cards = context.PtCards;

  const cardsBody = cards.map((_, index) => {
    return (
      <PtCard key={index} index={index} /> 
    );
  });

  const [selectedTier,setSelectedTier] = React.useState([] as Option[]);
  const [selectedTeam,setSelectedTeam] = React.useState([] as Option[]);
  const [selectedDivision,setSelectedDivision] = React.useState([] as Option[]);
  const [selectedLeague,setSelectedLeague] = React.useState([] as Option[]);

  const value = {
    ...context,
    selectedTier,
    setSelectedTier,
    selectedTeam, 
    setSelectedTeam, 
    selectedDivision, 
    setSelectedDivision,
    selectedLeague, 
    setSelectedLeague
  }

  const responseMessage = (response: any) => {
      console.log(response);
  };
  const errorMessage = (error: any) => {
      console.log(error);
  };

  return (
    <GoogleOAuthProvider clientId="492138648450-a7vb6fufea0klv3cp08ihak29e4pp49r.apps.googleusercontent.com">
      <Account />
      <AppContext.Provider value={value}>
        <div className="rounded-md bg-white px-20 py-4 my-8 w-4/5 m-auto">
          <div className="font-serif">PT Live Predicting</div>
          <PtCardListFilter />
          <div>
            {selectedTier.map((o) => o.label)}
            {cardsBody}
          </div>
        </div>
      </AppContext.Provider>
    </GoogleOAuthProvider>
  );
}
