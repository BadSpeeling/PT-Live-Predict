import * as React from 'react';
import { AppContext } from './AppContext'
import { PtCardListFilter } from './PtCardListFilter'
import { PtCardPagination } from './PtCardPagination'
import { GetPtCardPredictsResponse } from '../types'
import { PtCard } from './PtCard'
import { sortPtCardList } from './lib/pt-card-helper'
import { toast, ToastContainer } from 'react-toastify';

export const PtPredictPanel = () => {

    const context = React.useContext(AppContext);

    React.useEffect(() => {
      if (context.selectedTeam.value) {
        handleCardLoad(true);
      }
    }, [context.selectedTeam])

    React.useEffect(() => {
        handleCardLoad(false);
    }, [context.cardPage])
    
    const getLastPtCardID = () => {
      if (context.ptCards.length === 0) {
        return null;
      }
      else {
        return context.cardPage.NavigationDirection === "asc" ? context.ptCards[0].PtCardID : context.ptCards[context.ptCards.length-1].PtCardID;
      }
    }

    const handleCardLoad = async (ignoreLastPtCardID: boolean) => {
        const options = {
          method: "POST",
          headers: {
              'Content-Type':"application/json"
          },
          body: JSON.stringify({
            TeamFilter: context.selectedTeam.value,
            LatestLiveUpdateID: context.currentLiveUpdateID,
            NavigationDirection: context.cardPage.NavigationDirection,
            LastPtCardID: !ignoreLastPtCardID ? getLastPtCardID() : null,
          })
        }
        context.setIsLoading(true);
        const getCardPredictions = await fetch('/api/pt-card-predicts', options)
        
        if (getCardPredictions.status === 200) {
            const getPtCardPredictsResponse = (await getCardPredictions.json()) as GetPtCardPredictsResponse

            if (getPtCardPredictsResponse.PtCards.length > 0) {
            
              //const sortedCardPredictions = sortPtCardList(getPtCardPredictsResponse.PtCards)
              context.setPtCards(getPtCardPredictsResponse.PtCards);
              context.setPtCardCount(getPtCardPredictsResponse.PtCardCount);

            }

        }
        else {
          toast('Could not load cards!');
        }
        context.setIsLoading(false);

    }

    const cardsBody = context.ptCards.map((ptCard) => {
      return (
        <PtCard ptCard={ptCard} key={ptCard.CardID} /> 
      );
    });

    const showPaginationFlag = true;//Math.ceil(context.ptCards.length / context.cardPage.PageSize) > 1

    return (
      <>
        { context.isLoading ? <div className="fixed loader-wrapper"><div className="loader"></div></div> : <></>}
        <ToastContainer />
        <WelcomePanel />   
        <PtCardListFilter />            
        <div>
          <div className="flex flex-wrap justify-around">
              {cardsBody}
          </div>
        </div>
        { showPaginationFlag && <PtCardPagination /> }
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