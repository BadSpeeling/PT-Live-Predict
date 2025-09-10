'use client'

import * as React from "react";
import AppProvider from "./AppContext";
import { PtCard } from "./PtCard";
import { PtCardListFilter } from "./PtCardListFilter"
import { GetPtCardPredictsResponse } from '../types'

export default function Home() {

  // const cardsBody = cards.map((card, index) => {
  //   return (
  //     <PtCard card={card} key={index} index={index} /> 
  //   );
  // });

  React.useEffect(() => {
    //handleCardLoad();
  }, [])

  // const handleCardLoad = async () => {
  //   const options = {
  //     method: "POST",
  //     headers: {
  //         'Content-Type':"application/json"
  //     },
  //     body: JSON.stringify({})
  //   }
  //   const getPtCardPredictsResponseRaw = await fetch('/api/pt-card-predicts', options)
    
  //   if (getPtCardPredictsResponseRaw.status === 200) {
  //       const getPtCardPredictsResponse = (await getPtCardPredictsResponseRaw.json()) as GetPtCardPredictsResponse
  //       context.setPtCardsPredicts(getPtCardPredictsResponse.UserCardPredicts);
  //   }
  // }

  return (
      <AppProvider>
        <div>   
          <div className="rounded-md bg-white px-20 py-4 my-8 w-4/5 m-auto">
            <div className="font-serif">PT Live Predicting</div>
            <div>            
                <PtCardListFilter />
            </div>
          </div>
        </div>
      </AppProvider>
  );
}
