import * as React from 'react';
import { AppContext } from './AppContext'
import { PtCardListFilter } from './PtCardListFilter'
import { PtCardPagination } from './PtCardPagination'
import { GetPtCardPredictsRequest, GetPtCardPredictsResponse, GetPtCardResultingTierRequest, GetPtCardResultingTierResponse, CallServer, GridMode, Tier } from '../types'
import { PtCard } from './PtCard'
import { getActiveData, getActiveRecordCount } from './lib/pt-card-helper'
import { toast, ToastContainer } from 'react-toastify';

export const PtPredictPanel = () => {

    const context = React.useContext(AppContext);

    React.useEffect(() => {
      if (context.pageState.GridMode === GridMode.PtCard) {
        switch (context.pageState.CallServer) {
          case CallServer.GetStandard:        
            handleCardLoad(true);
            break;
          case CallServer.GetPaginated:
            handleCardLoad(false);
            break;
        }
      }
      else if (context.pageState.GridMode === GridMode.ResultingTier) {
        switch (context.pageState.CallServer) {
          case CallServer.GetStandard:        
            handlePtCardResultingTierLoad(true);
            break;
          case CallServer.GetPaginated:
            handlePtCardResultingTierLoad(false);
            break;
        }
      }
    }, [context.pageState.CallServer])
    
    const ptCards = getActiveData(context);
    const activeCount = getActiveRecordCount(context);

    const getLastPtCardID = () => {
      if (ptCards.length === 0) {
        return null;
      }
      else {
        return context.cardPage.NavigationDirection === "asc" ? ptCards[0].PtCardID : ptCards[ptCards.length-1].PtCardID;
      }
    }

    const getLiveUpdateID = () => {
      switch(context.pageState.GridMode) {
        case GridMode.PtCard:
          return context.currentLiveUpdateID;
        case GridMode.ResultingTier:
          return context.currentLiveUpdateID-1;
      }
    }

    const handleCardLoad = async (ignoreLastPtCardID: boolean) => {
        const options = {
          method: "POST",
          headers: {
              'Content-Type':"application/json"
          },
          body: JSON.stringify({
            TeamFilter: context.ptCardFilters.selectedTeam.value,
            TierFilter: Object.keys(Tier).indexOf(context.ptCardFilters.selectedTier.value),
            NameFilter: context.ptCardFilters.enteredName,
            LiveUpdateID: getLiveUpdateID(),
            NavigationDirection: context.cardPage.NavigationDirection,
            LastPtCardID: !ignoreLastPtCardID ? getLastPtCardID() : null,
            PageSize: context.cardPage.PageSize,
          } as GetPtCardPredictsRequest)
        }
        context.setIsLoading(true);
        const getCardPredictions = await fetch('/api/pt-card-predicts', options)
        
        if (getCardPredictions.status === 200) {
            const getPtCardPredictsResponse = (await getCardPredictions.json()) as GetPtCardPredictsResponse

            if (getPtCardPredictsResponse.PtCards.length > 0) {
            
              context.setLoadedData({
                ...context.loadedData,  
                PtCards: getPtCardPredictsResponse.PtCards,
                PtCardCount: getPtCardPredictsResponse.PtCardCount
              });  
              
            }

        }
        else {
          toast('Could not load cards!');
        }
        context.setIsLoading(false);
        context.setPageState({
          ...context.pageState,
          CallServer: CallServer.None,
        });

    }

    const handlePtCardResultingTierLoad = async (ignoreLastPtCardID: boolean) => {
        const options = {
          method: "POST",
          headers: {
              'Content-Type':"application/json"
          },
          body: JSON.stringify({
            TeamFilter: context.ptCardFilters.selectedTeam.value,
            TierFilter: Object.keys(Tier).indexOf(context.ptCardFilters.selectedTier.value),
            NameFilter: context.ptCardFilters.enteredName,
            LiveUpdateID: getLiveUpdateID(),
            NavigationDirection: context.cardPage.NavigationDirection,
            LastPtCardID: !ignoreLastPtCardID ? getLastPtCardID() : null,
            PageSize: context.cardPage.PageSize,
          } as GetPtCardResultingTierRequest)
        }
        context.setIsLoading(true);
        const getCardPredictions = await fetch('/api/pt-cards-resulting-tier', options)
        
        if (getCardPredictions.status === 200) {
            const getPtCardResultingTierResponse = (await getCardPredictions.json()) as GetPtCardResultingTierResponse

            if (getPtCardResultingTierResponse.PtCardsResultingTier.length > 0) {
            
              context.setLoadedData({
                ...context.loadedData,  
                PtCardsResultingTier: getPtCardResultingTierResponse.PtCardsResultingTier,
                PtCardResultingTierCount: getPtCardResultingTierResponse.PtCardCount
              });              
              
            }

        }
        else {
          toast('Could not load cards!');
        }
        context.setIsLoading(false);
        context.setPageState({
          ...context.pageState,
          CallServer: CallServer.None,
        });

    }

    const cardsBody = () => {
      return context.loadedData.PtCards.map((ptCard) => <PtCard ptCard={ptCard} key={ptCard.CardID} />)
    };

    const resultingTierBody = () => {
      return context.loadedData.PtCardsResultingTier.map((ptCard) => <div key={ptCard.PtCardID}>{ptCard.CardTitle + ',' + ptCard.CardValue + ',' + ptCard.ResultingTier + ',' + ptCard.PredictedTiers.join(',') + ';'}</div>)
    };

    const totalPages = Math.ceil(activeCount / context.cardPage.PageSize);

    return (
      <>
        { context.isLoading ? <div className="fixed loader-wrapper"><div className="loader"></div></div> : <></>}
        <ToastContainer />
        <WelcomePanel />   
        <PtCardListFilter />            
        <div>
          <div className="flex flex-wrap justify-around">
              {context.pageState.GridMode === GridMode.PtCard && cardsBody()}
              {context.pageState.GridMode === GridMode.ResultingTier && resultingTierBody()}
          </div>
        </div>
        { totalPages > 1 && <PtCardPagination totalPages={totalPages}/> }
      </>
    )

}

export const WelcomePanel = () => {

  return (
    <div className="welcome-text my-4">
      <p className="mb-2 text-xl">
        Welcome to PT Live Predicting!
      </p>
      <p className="mb-2">
        This is a website about predicting which Perfect Team cards will have their tier promoted or demoted in an upcoming Live Update.
      </p>
      <p className="mb-2">
        To get started, select a team to view their live cards.
      </p>
      <p className="mb-2">
        Once looking at a team navigate to a card for which you would like to make a prediction. Select the card tier under a card to which you think the card will be promoted or demoted. 
      </p>
    </div>
  )

}